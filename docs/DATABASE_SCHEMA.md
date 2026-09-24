# iMowiT Database Schema

Source of truth: `supabase/migrations/`. This document explains what's there and why. If the two ever disagree, the migrations win — update this doc to match.

**Status:** all 19 migrations applied to the **iMowiT-Dev** Supabase project (latest: 2026-09-23). RLS confirmed enabled on all 28 public tables. Production project not yet created — see [README.md](../README.md#supabase-backend).

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
| `profiles` | 1:1 shadow of `auth.users`, created automatically by a trigger on signup. Base identity every role hangs off of. Also holds per-channel marketing consent: `marketing_email_opt_in` / `marketing_push_opt_in` (boolean, default `false`) with `marketing_email_opt_in_at` / `marketing_push_opt_in_at` (nullable `timestamptz`, when the opt-in was given). The `*_at` columns are set only by the `profiles_set_marketing_opt_in_timestamps` trigger — stamped on opt-in, cleared on opt-out, and any client-supplied value is ignored. |
| `admin_accounts` | Internal staff, with `admin_role` (`super_admin`, `support`, `operations`, `finance`). |
| `organizations` | One HOA or property-management company: one name, one primary contact, one primary address. |
| `customer_accounts` | `account_type` is `individual` or `organization`. `organization_id` is set only on the org's own billing account, and is the **only** link that grants access to an organization's private details and documents. `affiliated_organization_id` is a separate, optional tag a homeowner sets themselves (profile settings) to identify "which HOA I live in" — purely an association: no access, billing, approval or routing effect. Self-signed-up customers get their `individual` row automatically on email confirmation (see Business logic below). Only admins / trusted backend can set `account_type`, `organization_id`, `status` or `deleted_at`. `company_name` is the business name a self-signed-up business customer typed (on an `individual` account); it's customer-editable and required on the Business onboarding path. Once staff convert a business into an organization account, `organizations.name` is the official name for invoices and contracts, and `company_name` pre-fills it on conversion — deliberately **not** constrained to individual accounts so conversion isn't blocked. Don't add it to the protected-field list. |
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
| `properties` | Belongs to a `customer_account`. `property_type` is `residential` or `commercial` only — "HOA-managed" is never stored on the property itself, it's inferred from whichever `customer_account` owns it (an org-type account, or an individual account with `affiliated_organization_id` set — an inference for display/reporting only; affiliation grants no access). `location_name` is an optional site label for businesses with several locations ("Downtown store"). `place_id` is the Google place the address was picked from; a partial unique index (`properties_customer_place_id_key`) allows one live property per place per customer (not globally, since a house can change hands). Under Google's terms `place_id` may be stored indefinitely but Places coordinates and address content may not, so the address columns hold what the customer confirmed or corrected, and `latitude`/`longitude` stay null until staff set the position. |
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
| `quote_requests` | `status` flow: `pending` → `estimated` → `sent` → `accepted`/`declined`. An accepted quote links forward via `resulting_work_order_id`. `request_type` is `plan_assessment` (new-customer estimate for all plans, created at onboarding) or `service_quote` (one-off service; the default). |

### Financials

| Table | Purpose |
|---|---|
| `invoices` | One per `work_order`. `status`: `draft` → `sent` → `paid`/`overdue`/`void`. |
| `invoice_items` | Line items; `amount` is a generated column (`quantity * unit_price`). |
| `payments` | References `stripe_payment_intent_id` only — **no card data is stored anywhere in this schema.** |

### Support & communication

`complaints`, `messages`, `notifications` — straightforward, scoped to the profile/customer that owns them.

`inquiries` (`20260924090000_inquiries.sql`) — messages from the public website's "Get In Touch" form (`/inquire`) and subcontractor application (`/subcontractors`), from visitors who aren't signed in. `inquiry_type` is `residential`/`commercial`/`subcontractor`/`partnership`/`other`; `status` is `new`/`read`/`archived`. Admins can read and update (RLS); nobody else can read, and there is **no insert policy**. Rows are created only by `submit_inquiry(...)`, a security-definer function that inserts one `new` row and returns its id. It enforces at most 5 inquiries per email address per hour (error hint `rate_limited`). It is granted to **`service_role` only**: every function is exposed through the Data API and the anon key is public, so granting it to `anon` would let anyone bypass the website's Cloudflare Turnstile check. The website's Server Action (`src/app/(marketing)/inquiry-actions.ts`) checks a honeypot field and Turnstile, validates, calls `submit_inquiry()` with the service role (`src/lib/supabase/service.ts`, server-only), then emails `admin@imowit.com` via Resend with Reply-To set to the visitor. The row is kept even if the email fails. Staff see inquiries in the admin dashboard at `/inquiries`.

### Audit

`audit_logs` — populated by triggers (not written to directly) on `customer_accounts`, `contractor_accounts`, `admin_accounts`, `invoices`, `payments`, `work_orders`, and `job_assignments`.

## Shared enum types

Reused across tables wherever the value set is genuinely identical (`account_status` across `customer_accounts`/`organizations`/`admin_accounts`/`properties`; `service_type` across `service_requests`/`service_schedules`/`contractor_rates`/`work_orders`/`job_assignments`; `entity_type` across `messages`/`notifications`). Full list and values are in `supabase/migrations/20260922090000_extensions_and_enums.sql`.

## Business logic: invoice / work-order timing

1. `AFTER INSERT ON work_orders` → creates a matching `invoices` row (`status = 'draft'`) plus a matching `invoice_items` row, using `work_orders.price`.
2. `AFTER UPDATE OF status ON work_orders` → when the status transitions into `'completed'`, flips the linked invoice to `status = 'sent'` and stamps `sent_at`.
3. Both are database triggers, not application code — the rule holds no matter what path changes a work order's status (admin action, the scheduled job, a future API).

## Business logic: customer account on sign-up

`on_auth_user_verified` (`20260922091800_create_customer_account_on_email_confirm.sql`) creates an `individual`, `active` `customer_accounts` row when a user's `email_confirmed_at` goes from null to set (or when a user is inserted already confirmed). It's idempotent on `profile_id`, so clients never need to create the row. Clients also can't: `customer_accounts_insert` is `is_admin()` only (`20260922091900_customer_accounts_admin_only_insert.sql`). The trigger is security definer and the service role bypasses RLS, so both still insert.

- **Staff are skipped.** Admins and contractors never self-sign-up: an admin creates them server-side (service role) with `app_metadata.staff_role` set to `'admin'` or `'contractor'`, then sends the invite. `app_metadata` is only writable by the service role, so users can't set it; `user_metadata` must never be used for this.
- **Keyed on confirmation, not on insert,** so the staff role is guaranteed to be in place before the row is considered (the admin flow creates the user, then invites), and abandoned unconfirmed sign-ups don't become customers.
- The trigger is named to sort after `on_auth_user_created`: same-timing triggers fire in name order, and the profile must exist first.

## Business logic: property onboarding

- **`current_app_role()`** (`20260923090000_customer_onboarding_fields_and_app_role.sql`) returns `'admin'`, `'contractor'`, `'customer'` or null for the signed-in user, using the same checks as RLS (`is_admin()`/`is_contractor()`, then an active, non-deleted `customer_accounts` row), with precedence admin > contractor > customer. The mobile app routes on it. Null means no active account. `authenticated` only. `is_admin()`/`is_contractor()` check `status` but not `deleted_at`, so a soft-deleted staff member whose status is still `active` keeps their role here, exactly as in RLS.
- **`request_property_assessment(...)`** (`20260923090200_request_property_assessment.sql`) runs when the customer confirms their address: it creates (or reuses) the property and opens a `plan_assessment` quote request in one transaction. It is `SECURITY INVOKER`, so RLS and the guard triggers apply as if the customer wrote the rows. A Google place ID is required. On the `commercial` path a company name is required and saved to `customer_accounts.company_name`; `location_name` is kept only for commercial. The app passes latitude/longitude as null. A customer's live property for the same place is reused (e.g. after a declined estimate), but not while an assessment on it is `pending`/`estimated`/`sent`. Concurrent calls (a double tap) are serialized: a reused property is locked `FOR UPDATE`, and a race on a new property hits the unique index and is reported as in progress. Errors carry a stable `HINT` the app matches on: `no_customer_account`, `company_name_required`, `assessment_in_progress`. `authenticated` only.

## Row Level Security

RLS is enabled on **every** table. Approach:

- Helper functions (`is_admin()`, `is_contractor()`, `owns_customer_account(id)`, `owns_contractor_account(id)`) are `SECURITY DEFINER`, so they can check membership in `admin_accounts`/`customer_accounts`/`contractor_accounts` without recursing into those tables' own RLS policies.
- `is_admin()` keys off `auth.uid()`, so it is **false for service-role requests**. `is_trusted_backend()` is true for any request that isn't an end-user `authenticated`/`anon` JWT (service role, Supabase Auth, migrations, seed, SQL editor); guards that must let server-side code through check `is_admin() or is_trusted_backend()`.
- **Organizations** (and `owner_type = 'organization'` documents) are visible only to admins and to the organization's own billing account (`customer_accounts.organization_id`). `affiliated_organization_id` grants nothing.
- **Customers** see only rows scoped to their own `customer_account_id`.
- **Contractors** see only `job_assignments` (and the `work_orders`/`job_updates` those point to) where the assignment belongs to them — never another contractor's payout or a customer's full financial history. **Caveat:** today that includes the whole `work_orders` row, `price` included; see Known follow-ups.
- **Admins** get broad access via `is_admin()`-gated policies, enforced at the database level so it holds even if a client bypasses application-layer checks.
- `mower_models`/`service_plans` are the only tables readable by `anon` (needed to show plans pre-signup); everything else requires an authenticated, related row.
- Four tables needed an extra trigger-level guard beyond RLS, because RLS can't restrict a grant to specific columns: `customer_accounts` (a customer can edit their own contact details and HOA affiliation, but not `account_type`/`organization_id`/`status`/`deleted_at` — otherwise they could claim any organization or undo their own suspension; see `20260922091700_customer_accounts_field_protection_and_org_access.sql`), `job_assignments` (a contractor can update their own row to accept/decline/complete, but not silently inflate `base_rate_snapshot`/`markup_percentage_snapshot`), `work_orders` (a contractor can update status/notes, but not `price`/`customer_account_id`/etc.), and `quote_requests` (a customer can accept/decline, but not set their own `estimated_amount`, `request_type` or `requested_by`). See `20260922091300_protect_job_assignment_rate_snapshots.sql` and `20260922091400_protect_sensitive_fields.sql`. The `quote_requests` guard also runs on **insert** (`20260923090100_quote_requests_insert_guard.sql`): a customer may only create a `pending`, un-estimated request with `requested_by` = themselves, on their own property; admins and `is_trusted_backend()` are exempt.

## Scheduled work-order generation

`generate_scheduled_work_orders()` (in `20260922091100_scheduled_work_order_generation.sql`) scans `service_schedules` for due rows, creates the `appointment` + `work_order`, and advances `next_run_at`. It's registered with `pg_cron` to run hourly.

**Manual step required before this migration applies successfully:** `pg_cron` must be enabled for the project first, via Supabase Dashboard → Database → Extensions. If `create extension pg_cron` fails, enable it there and re-run the migration.

## Known follow-ups / open design calls

**Must fix before the stated milestone:**

- **Before any real contractor is onboarded:** add a `contractor_accounts` guard trigger (like `customer_accounts`) exempting `is_admin() or is_trusted_backend()` and locking `status`, `stripe_connect_account_id` and `deleted_at`. Today a contractor can lift their own suspension or redirect payouts.
- **Before the admin dashboard does any server-side (service-role) writes:** the `work_orders` and `job_assignments` guard triggers (`...091300`, `...091400`) exempt only `is_admin()`, which is false for the service role, so they'd block legitimate server-side writes. Add `or is_trusted_backend()`. (`quote_requests` already has it, since `...090100`.)
- **Before the contractor portal:** contractors must never see `work_orders.price`. `work_orders_select` currently lets an assigned contractor read the whole row. They should see only their own pay from `job_assignments`, through a contractor-only view or security-definer function, and `work_orders` access for contractors must be column-limited. They also need job-scoped read access to the job's property (address, access notes), which `properties_select` doesn't give them yet.
- **Phase 2 (admin quoting):** the spec wants an estimate for all four plans, but `quote_requests.estimated_amount` holds one amount — needs a per-plan table (e.g. `quote_request_options (quote_request_id, service_plan_id, monthly_price, …)`). The spec also allows plans without a price, but `service_plans.monthly_price` is `not null`. Staff set each property's real position/boundary when mapping (the source of permanent coordinates).
- **Phase 3:** the quote guard lets a customer set `accepted`/`declined` from any status, including `pending`. Restrict it to `sent → accepted | declined`.
- **Before any document upload ships:** create private Storage buckets and `storage.objects` policies that mirror the fixed `documents` rules (org files gated by `organization_id` only, never affiliation). None exist yet.

- **Before launch:** upgrade from the Google Cloud free trial to a full account and set per-API daily quota caps on Places API (New) and Maps Static API, plus a budget alert. Also set the Maps Static API **unsigned requests** quota to 0, so Google rejects requests that aren't URL-signed (the `satellite-image` function always signs, but until this quota is 0 a leaked key alone can still use Static Maps). The free trial doesn't allow editing quotas, so the `places-autocomplete`/`satellite-image` edge functions currently have no Google-side spending cap beyond the key's API restriction.

**Pending / deferred:**

- HOA picker for profile settings (approved in principle): a security-definer search returning only `id, name` of active HOAs, minimum 3 characters, max 20 results, `authenticated` only. Build with the profile settings screen, together with a function returning the caller's own affiliated HOA name.
- Two leftover dev accounts without a `customer_accounts` row are to be handled by hand.

- `job_assignments`/`contractor_rates` write access currently allows the owning contractor to edit their own rates and accept/decline/complete their own jobs. If rates should be admin-set only, tighten `contractor_rates_insert`/`contractor_rates_update` in the RLS migration to `is_admin()` only.
- `appointments` writes are admin-only in this version — contractors log progress through `job_updates` and drive billable status through `work_orders` instead. Direct contractor control over appointment status (e.g. marking "in progress" from the field) could be added later if needed.
- `messages` uses a simple sender/recipient model, not full thread/participant support. Fine for 1:1 admin↔customer or admin↔contractor messaging; would need a `message_threads`/participants table for group conversations.
- `contractor_service_areas` seed data is a best-effort real Minneapolis-metro zip list from general geographic knowledge, not a live geocoding lookup — verify against USPS/Census data before relying on it for anything beyond dev/testing.

## Generating types

`src/types/database.types.ts` is generated from the live iMowiT-Dev schema. Regenerate it after applying any new migration so it never drifts:

```
supabase gen types typescript --linked --schema public,graphql_public > src/types/database.types.ts
```
