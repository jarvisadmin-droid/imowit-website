# iMowiT Database Schema

Source of truth: `supabase/migrations/`. This document explains what's there and why. If the two ever disagree, the migrations win — update this doc to match.

## Relationship diagram

```
auth.users ──1:1── profiles
                       │
        ┌──────────────┼───────────────────┐
        │               │                    │
   admin_accounts  customer_accounts   contractor_accounts
                        │  │                  │  │  │
        organizations ◄─┘  │                  │  │  └── contractor_insurance
        (org billing        │                  │  └── contractor_service_areas (zip codes)
         account, or        │                  └── contractor_rates (per service_type)
         affiliated-only     │
         for individuals)    │
                             ▼
                        properties
                        │    │    │
        customer_mowers │    │    └── service_requests (one-time)
        (via mower_models)   │             │
                             │        service_schedules (recurring) ─┐
                             │             │                          │
                    customer_subscriptions │                          │
                    (via service_plans)    ▼                          ▼
                                       appointments ────────────► work_orders ◄── quote_requests
                                                                    │   │            (accepted quote
                                                                    │   │             → resulting_work_order)
                                                          job_assignments  invoices (auto-created on
                                                          (→ contractor,    insert, status flips to
                                                           payout_amount)   'sent' when work_order
                                                                │           completes)
                                                          job_updates        │
                                                                        invoice_items
                                                                             │
                                                                          payments (Stripe refs only)

complaints, messages, notifications, documents  → reference the entities above by id
audit_logs                                      → populated by triggers on the sensitive tables
```

## Domains

### Identity & accounts

| Table | Purpose |
|---|---|
| `profiles` | 1:1 shadow of `auth.users`, created automatically by a trigger on signup. Base identity every role hangs off of. |
| `admin_accounts` | Internal staff, with `admin_role` (`super_admin`, `support`, `operations`, `finance`). |
| `organizations` | One HOA or property-management company: one name, one primary contact, one primary address. |
| `customer_accounts` | `account_type` is `individual` or `organization`. `organization_id` is set only on the org's own billing account. `affiliated_organization_id` is a separate, optional tag any individual account can set to identify "which HOA I live in" — purely informational, no billing/approval/routing effect. |
| `documents` | Polymorphic file metadata (insurance certs, contracts, photos). `owner_id` isn't a real foreign key since it can point at several different tables depending on `owner_type`; validated at the application layer. |

### Contractors

| Table | Purpose |
|---|---|
| `contractor_accounts` | `region` (general/primary area), `status` (`active`/`inactive`/`suspended`), optional `stripe_connect_account_id` for future payouts. |
| `contractor_rates` | One row per `(contractor_account_id, service_type)` — rates vary by service, not a single flat rate. This is what `job_assignments` snapshots from. |
| `contractor_service_areas` | Zip codes a contractor actually covers (can be many; separate from the single `region` on `contractor_accounts`). |
| `contractor_insurance` | Policy details + `verified`/`verified_by` for admin sign-off. |

### Catalog

| Table | Purpose |
|---|---|
| `mower_models` | Manufacturer/model catalog. Publicly readable (needed for signup/plan-selection flows). |
| `service_plans` | `plan_type` is `rental_no_ownership` or `rental_with_purchase_option`. The purchase option (unlock period, reduced price) is a property of the *plan*, enforced by a check constraint so the two plan types can't have inconsistent purchase-option fields. |

### Properties, subscriptions, mowers

| Table | Purpose |
|---|---|
| `properties` | Belongs to a `customer_account`. `property_type` is `residential` or `commercial` only — "HOA-managed" is never stored on the property itself, it's inferred from whichever `customer_account` owns it (an org-type account, or an individual account with `affiliated_organization_id` set). |
| `customer_subscriptions` | Links a `customer_account` + `property` to a `service_plan`. Tracks `purchase_option_eligible_at` and `purchased_at`. |
| `customer_mowers` | Individually tracked units, unique `serial_number`, linked to a `property` and (optionally) the `customer_subscription` that provisioned them. |

### Requests, schedules, appointments, work

| Table | Purpose |
|---|---|
| `service_requests` | One-time, customer-initiated work. |
| `service_schedules` | Recurring subcontractor services (e.g. monthly fertilization), distinct from one-time requests. Has a fixed `price` set at creation and a `next_run_at` that a scheduled job (see below) advances. |
| `appointments` | A scheduled visit, originating from either a `service_request` or a `service_schedule`. |
| `work_orders` | The unit of billable work. Carries its own `price` (from the schedule, an accepted quote, or set directly by admin) — **inserting a row here immediately creates a matching draft invoice** (see Business logic below). |
| `job_assignments` | Assigns a `work_order` to a `contractor_account`. Snapshots `base_rate_snapshot`/`markup_percentage_snapshot` from `contractor_rates` at assignment time; `payout_amount` is a generated column computed from those snapshots, so it can never drift out of sync. |
| `job_updates` | Append-only progress log (status changes, notes, photos) per work order/assignment. |
| `quote_requests` | `status` flow: `pending` → `estimated` → `sent` → `accepted`/`declined`. An accepted quote links forward via `resulting_work_order_id`. |

### Financials

| Table | Purpose |
|---|---|
| `invoices` | One per `work_order`. `status`: `draft` → `sent` → `paid`/`overdue`/`void`. |
| `invoice_items` | Line items; `amount` is a generated column (`quantity * unit_price`). |
| `payments` | References `stripe_payment_intent_id` only — **no card data is stored anywhere in this schema.** |

### Support & communication

`complaints`, `messages`, `notifications` — straightforward, scoped to the profile/customer that owns them.

### Audit

`audit_logs` — populated by triggers (not written to directly) on `customer_accounts`, `contractor_accounts`, `admin_accounts`, `invoices`, `payments`, `work_orders`, and `job_assignments`.

## Shared enum types

Reused across tables wherever the value set is genuinely identical (`account_status` across `customer_accounts`/`organizations`/`admin_accounts`/`properties`; `service_type` across `service_requests`/`service_schedules`/`contractor_rates`/`work_orders`/`job_assignments`; `entity_type` across `messages`/`notifications`). Full list and values are in `supabase/migrations/20260922090000_extensions_and_enums.sql`.

## Business logic: invoice / work-order timing

1. `AFTER INSERT ON work_orders` → creates a matching `invoices` row (`status = 'draft'`) plus a matching `invoice_items` row, using `work_orders.price`.
2. `AFTER UPDATE OF status ON work_orders` → when the status transitions into `'completed'`, flips the linked invoice to `status = 'sent'` and stamps `sent_at`.
3. Both are database triggers, not application code — the rule holds no matter what path changes a work order's status (admin action, the scheduled job, a future API).

## Row Level Security

RLS is enabled on **every** table. Approach:

- Helper functions (`is_admin()`, `is_contractor()`, `owns_customer_account(id)`, `owns_contractor_account(id)`) are `SECURITY DEFINER`, so they can check membership in `admin_accounts`/`customer_accounts`/`contractor_accounts` without recursing into those tables' own RLS policies.
- **Customers** see only rows scoped to their own `customer_account_id`.
- **Contractors** see only `job_assignments` (and the `work_orders`/`job_updates` those point to) where the assignment belongs to them — never another contractor's payout or a customer's full financial history.
- **Admins** get broad access via `is_admin()`-gated policies, enforced at the database level so it holds even if a client bypasses application-layer checks.
- `mower_models`/`service_plans` are the only tables readable by `anon` (needed to show plans pre-signup); everything else requires an authenticated, related row.
- Three tables needed an extra trigger-level guard beyond RLS, because RLS can't restrict a grant to specific columns: `job_assignments` (a contractor can update their own row to accept/decline/complete, but not silently inflate `base_rate_snapshot`/`markup_percentage_snapshot`), `work_orders` (a contractor can update status/notes, but not `price`/`customer_account_id`/etc.), and `quote_requests` (a customer can accept/decline, but not set their own `estimated_amount`). See `20260922091300_protect_job_assignment_rate_snapshots.sql` and `20260922091400_protect_sensitive_fields.sql`.

## Scheduled work-order generation

`generate_scheduled_work_orders()` (in `20260922091100_scheduled_work_order_generation.sql`) scans `service_schedules` for due rows, creates the `appointment` + `work_order`, and advances `next_run_at`. It's registered with `pg_cron` to run hourly.

**Manual step required before this migration applies successfully:** `pg_cron` must be enabled for the project first, via Supabase Dashboard → Database → Extensions. If `create extension pg_cron` fails, enable it there and re-run the migration.

## Known follow-ups / open design calls

- `job_assignments`/`contractor_rates` write access currently allows the owning contractor to edit their own rates and accept/decline/complete their own jobs. If rates should be admin-set only, tighten `contractor_rates_insert`/`contractor_rates_update` in the RLS migration to `is_admin()` only.
- `appointments` writes are admin-only in this version — contractors log progress through `job_updates` and drive billable status through `work_orders` instead. Direct contractor control over appointment status (e.g. marking "in progress" from the field) could be added later if needed.
- `messages` uses a simple sender/recipient model, not full thread/participant support. Fine for 1:1 admin↔customer or admin↔contractor messaging; would need a `message_threads`/participants table for group conversations.
- `contractor_service_areas` seed data is a best-effort real Minneapolis-metro zip list from general geographic knowledge, not a live geocoding lookup — verify against USPS/Census data before relying on it for anything beyond dev/testing.

## Generating types

`src/types/database.types.ts` is hand-written to match these migrations. Once they're applied to a real project, regenerate it from the live schema so it never drifts:

```
supabase gen types typescript --linked > src/types/database.types.ts
```
