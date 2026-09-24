-- Customer portal Phase 1 (onboarding): business name, property labels and
-- Google place IDs, plan-assessment quote type, and current_app_role() for
-- role-based routing in the mobile app.

-- Business customers: company name lives on the account, since one business
-- can have many properties.
--   company_name is what a self-signed-up business customer typed (on an
--   individual account). Once staff convert a business into an organization
--   account, organizations.name is the official name for invoices and
--   contracts; company_name pre-fills it on conversion. Intentionally NOT
--   constrained to individual accounts, so that conversion isn't blocked.
--   Customer-editable: protect_customer_account_fields() only locks
--   account_type / organization_id / status / deleted_at. Don't add it there.
alter table customer_accounts
  add column company_name text,
  add constraint customer_accounts_company_name_check
    check (company_name is null or char_length(btrim(company_name)) between 1 and 200);

-- Optional site label for businesses with several locations ("Downtown store"),
-- and the Google place ID the address was picked from.
--   Google's terms allow storing place_id indefinitely, but not Places
--   coordinates (30-day cache limit) or Places address content. So the address
--   columns hold the address the customer confirmed or corrected in the app,
--   and latitude/longitude stay null until staff set the position themselves.
alter table properties
  add column location_name text,
  add column place_id text,
  add constraint properties_location_name_check
    check (location_name is null or char_length(btrim(location_name)) between 1 and 100),
  add constraint properties_place_id_check
    check (place_id is null or char_length(place_id) between 1 and 300);

-- One live property per Google place per customer. Not globally unique: a
-- house can change hands, and the new owner is a different customer.
create unique index properties_customer_place_id_key
  on properties (customer_account_id, place_id)
  where place_id is not null and deleted_at is null;

-- Plan assessments (new-customer estimates for all plans) vs one-off service
-- quotes, so staff can filter them in the admin dashboard.
create type quote_request_type as enum ('plan_assessment', 'service_quote');
alter table quote_requests
  add column request_type quote_request_type not null default 'service_quote';

-- Which portal the signed-in user belongs to. Uses the same checks as RLS
-- (is_admin / is_contractor), so routing matches what the user can actually
-- access. Precedence admin > contractor > customer. Null means no active
-- account: a non-active admin/contractor, a customer account that is not
-- active or is soft-deleted, or a user with no account row.
--   Note: is_admin()/is_contractor() check status only, not deleted_at, so a
--   soft-deleted staff member whose status is still 'active' keeps their role
--   here exactly as they do in RLS (see Known follow-ups).
create function current_app_role()
returns text
language sql
stable
security definer
set search_path = public
as $$
  select case
    when is_admin() then 'admin'
    when is_contractor() then 'contractor'
    when exists (
      select 1 from customer_accounts
      where profile_id = auth.uid() and status = 'active' and deleted_at is null
    ) then 'customer'
  end;
$$;

revoke execute on function current_app_role() from public, anon;
grant execute on function current_app_role() to authenticated;
