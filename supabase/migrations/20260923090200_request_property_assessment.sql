-- Onboarding step 4: the customer confirmed their address. Creates (or reuses)
-- the property and opens a plan-assessment quote request, atomically, so a
-- failure can't leave a property with no request.
-- SECURITY INVOKER: RLS and the protect triggers apply exactly as if the
-- customer had written the rows themselves.
--
-- The address fields are the address the customer confirmed or corrected in
-- the app (not stored Google content). The app passes latitude/longitude as
-- null: Google's terms allow caching Places coordinates for 30 days only.
--
-- Errors carry a stable HINT the app matches on:
--   no_customer_account | company_name_required | assessment_in_progress
-- A missing place ID can only come from an app bug, so it has no hint.
create function request_property_assessment(
  p_property_type property_type,
  p_address_line1 text,
  p_address_line2 text,
  p_city text,
  p_state text,
  p_postal_code text,
  p_latitude numeric,
  p_longitude numeric,
  p_place_id text,
  p_company_name text default null,
  p_location_name text default null,
  p_access_notes text default null
)
returns table (out_property_id uuid, out_quote_request_id uuid)
language plpgsql
security invoker
set search_path = public
as $$
declare
  v_account_id uuid;
  v_property_id uuid;
  v_quote_id uuid;
begin
  select id into v_account_id
  from customer_accounts
  where profile_id = auth.uid() and status = 'active' and deleted_at is null;

  if v_account_id is null then
    raise exception 'No active customer account' using hint = 'no_customer_account';
  end if;

  -- Without a place ID the one-property-per-place check can't work.
  if nullif(btrim(p_place_id), '') is null then
    raise exception 'A Google place ID is required';
  end if;

  if p_property_type = 'commercial' then
    if nullif(btrim(p_company_name), '') is null then
      raise exception 'Company name is required for a business property'
        using hint = 'company_name_required';
    end if;
    update customer_accounts set company_name = btrim(p_company_name)
    where id = v_account_id;
  end if;

  -- Reuse the customer's live property for this place (e.g. re-requesting
  -- after a declined estimate), but not while an assessment is still open.
  -- FOR UPDATE serialises concurrent calls (e.g. a double tap) on a reused
  -- property: the second waits for the first to commit, then sees its open
  -- request below and gets assessment_in_progress instead of a duplicate.
  select id into v_property_id
  from properties
  where customer_account_id = v_account_id
    and place_id = p_place_id
    and deleted_at is null
  for update;

  if v_property_id is not null and exists (
    select 1 from quote_requests
    where property_id = v_property_id
      and request_type = 'plan_assessment'
      and status in ('pending', 'estimated', 'sent')
  ) then
    raise exception 'An assessment for this address is already in progress'
      using hint = 'assessment_in_progress';
  end if;

  if v_property_id is null then
    begin
      insert into properties (
        customer_account_id, property_type, address_line1, address_line2,
        city, state, postal_code, latitude, longitude, place_id,
        location_name, access_notes
      ) values (
        v_account_id, p_property_type, btrim(p_address_line1), nullif(btrim(p_address_line2), ''),
        btrim(p_city), btrim(p_state), btrim(p_postal_code), p_latitude, p_longitude, p_place_id,
        case when p_property_type = 'commercial' then nullif(btrim(p_location_name), '') end,
        nullif(btrim(p_access_notes), '')
      )
      returning id into v_property_id;
    exception when unique_violation then
      -- A concurrent call (e.g. a double tap) created this property first,
      -- together with its assessment request.
      raise exception 'An assessment for this address is already in progress'
        using hint = 'assessment_in_progress';
    end;
  end if;

  insert into quote_requests (
    customer_account_id, property_id, requested_by, description, request_type
  ) values (
    v_account_id, v_property_id, auth.uid(),
    'New customer property assessment: estimates for all plans', 'plan_assessment'
  )
  returning id into v_quote_id;

  return query select v_property_id, v_quote_id;
end;
$$;

revoke execute on function request_property_assessment(
  property_type, text, text, text, text, text, numeric, numeric, text, text, text, text
) from public, anon;
grant execute on function request_property_assessment(
  property_type, text, text, text, text, text, numeric, numeric, text, text, text, text
) to authenticated;
