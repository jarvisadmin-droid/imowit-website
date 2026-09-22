-- work_orders_update (RLS) lets an assigned contractor update their work
-- order's status. Without this guard they could also change price,
-- customer_account_id, property_id, or which schedule/request it came from.
-- Non-admins may only touch status, notes, and completed_at.

create function protect_work_order_fields()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if not is_admin() and (
    new.price is distinct from old.price
    or new.customer_account_id is distinct from old.customer_account_id
    or new.property_id is distinct from old.property_id
    or new.appointment_id is distinct from old.appointment_id
    or new.service_request_id is distinct from old.service_request_id
    or new.service_schedule_id is distinct from old.service_schedule_id
    or new.service_type is distinct from old.service_type
    or new.scheduled_date is distinct from old.scheduled_date
  ) then
    raise exception 'Only an admin can modify these work_orders fields';
  end if;
  return new;
end;
$$;

create trigger work_orders_protect_sensitive_fields
  before update on work_orders
  for each row execute function protect_work_order_fields();

-- quote_requests_update (RLS) lets the owning customer update their quote
-- request so they can accept/decline it. Without this guard they could also
-- set their own estimated_amount or move the status straight to 'sent'.
-- Non-admins may only touch status (to accepted/declined), responded_at,
-- and decline_reason.

create function protect_quote_request_fields()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if not is_admin() and (
    new.estimated_amount is distinct from old.estimated_amount
    or new.estimated_by is distinct from old.estimated_by
    or new.estimated_at is distinct from old.estimated_at
    or new.sent_at is distinct from old.sent_at
    or new.resulting_work_order_id is distinct from old.resulting_work_order_id
    or new.customer_account_id is distinct from old.customer_account_id
    or new.property_id is distinct from old.property_id
    or new.description is distinct from old.description
    or (new.status is distinct from old.status and new.status not in ('accepted', 'declined'))
  ) then
    raise exception 'Only an admin can modify these quote_requests fields';
  end if;
  return new;
end;
$$;

create trigger quote_requests_protect_sensitive_fields
  before update on quote_requests
  for each row execute function protect_quote_request_fields();
