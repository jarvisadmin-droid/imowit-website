-- customer_accounts_insert / customer_accounts_update (RLS) only check that the
-- row is the caller's own (profile_id = auth.uid()). They don't limit which
-- columns can be set, and access to an organization's private details and
-- documents was decided by two columns in that same row. A signed-in customer
-- could therefore set organization_id (or affiliated_organization_id) to any
-- organization and read its contact details and documents, or undo an admin's
-- status / deleted_at change on their own account.
--
-- Fix:
--   1. A protective trigger (like work_orders / quote_requests) so only admins
--      and trusted backend callers can set account_type, organization_id,
--      status and deleted_at.
--   2. affiliated_organization_id stays customer-editable -- homeowners set it
--      in profile settings as a pure association -- but no longer grants any
--      access. Only organization_id (the org's own billing account) does.

-- Requests that don't carry an end-user JWT: service_role (admin dashboard
-- server code), Supabase Auth itself, migrations, seed, SQL editor.
-- is_admin() can't recognise these because it keys off auth.uid().
create function is_trusted_backend()
returns boolean
language sql
stable
as $$
  select coalesce(auth.role(), '') not in ('authenticated', 'anon');
$$;

create function protect_customer_account_fields()
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
    if new.account_type <> 'individual'
       or new.organization_id is not null
       or new.status <> 'active'
       or new.deleted_at is not null then
      raise exception 'Customers can only create an active individual account';
    end if;
  elsif new.account_type is distinct from old.account_type
     or new.organization_id is distinct from old.organization_id
     or new.status is distinct from old.status
     or new.deleted_at is distinct from old.deleted_at then
    raise exception 'Only an admin can modify these customer_accounts fields';
  end if;
  return new;
end;
$$;

create trigger customer_accounts_protect_sensitive_fields
  before insert or update on customer_accounts
  for each row execute function protect_customer_account_fields();

-- Same as the original policies minus the affiliated_organization_id branches.
drop policy organizations_select on organizations;
create policy organizations_select on organizations for select
  using (
    is_admin()
    or id in (select organization_id from customer_accounts where profile_id = auth.uid())
  );

drop policy documents_select on documents;
create policy documents_select on documents for select
  using (
    is_admin()
    or (owner_type = 'customer_account' and owns_customer_account(owner_id))
    or (owner_type = 'contractor_account' and owns_contractor_account(owner_id))
    or (owner_type = 'property' and owner_id in (
      select id from properties where owns_customer_account(customer_account_id)
    ))
    or (owner_type = 'organization' and owner_id in (
      select organization_id from customer_accounts where profile_id = auth.uid()
    ))
    or (owner_type = 'work_order' and (
      owner_id in (select id from work_orders where owns_customer_account(customer_account_id))
      or owner_id in (
        select work_order_id from job_assignments where owns_contractor_account(contractor_account_id)
      )
    ))
  );
