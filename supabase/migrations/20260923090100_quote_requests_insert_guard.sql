-- quote_requests_insert (RLS) only checks that the row is on the caller's own
-- customer account, and protect_quote_request_fields() ran on UPDATE only. A
-- customer could therefore INSERT a quote that was already estimated, sent or
-- accepted, name someone else as requested_by, or point at another customer's
-- property. Customers may now only create a pending request for their own
-- property.
--
-- Also (approved by the owner 2026-09-23):
--   * request_type and requested_by are now locked on update for customers.
--   * is_trusted_backend() (service-role server code, e.g. the Phase 2 admin
--     quoting dashboard) is exempt, since is_admin() can't recognise it. The
--     work_orders and job_assignments guards still need the same exemption.
create or replace function protect_quote_request_fields()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if is_admin() or is_trusted_backend() then
    return new;
  end if;

  if tg_op = 'INSERT' then
    if new.status <> 'pending'
       or new.estimated_amount is not null
       or new.estimated_by is not null
       or new.estimated_at is not null
       or new.sent_at is not null
       or new.responded_at is not null
       or new.decline_reason is not null
       or new.resulting_work_order_id is not null
       or new.requested_by is distinct from auth.uid()
       or (new.property_id is not null and not exists (
             select 1 from properties p
             where p.id = new.property_id
               and p.customer_account_id = new.customer_account_id
           ))
    then
      raise exception 'Customers can only create a pending quote request for their own property';
    end if;
    return new;
  end if;

  if new.estimated_amount is distinct from old.estimated_amount
     or new.estimated_by is distinct from old.estimated_by
     or new.estimated_at is distinct from old.estimated_at
     or new.sent_at is distinct from old.sent_at
     or new.resulting_work_order_id is distinct from old.resulting_work_order_id
     or new.customer_account_id is distinct from old.customer_account_id
     or new.property_id is distinct from old.property_id
     or new.description is distinct from old.description
     or new.request_type is distinct from old.request_type
     or new.requested_by is distinct from old.requested_by
     or (new.status is distinct from old.status and new.status not in ('accepted', 'declined'))
  then
    raise exception 'Only an admin can modify these quote_requests fields';
  end if;
  return new;
end;
$$;

drop trigger quote_requests_protect_sensitive_fields on quote_requests;
create trigger quote_requests_protect_sensitive_fields
  before insert or update on quote_requests
  for each row execute function protect_quote_request_fields();
