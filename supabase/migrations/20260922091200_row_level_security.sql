-- Additional RLS helper functions (security definer, same rationale as
-- is_admin()/is_contractor() in the previous migration: avoids policy
-- recursion when checking ownership of an account row).

create function owns_customer_account(target_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from customer_accounts
    where id = target_id and profile_id = auth.uid()
  );
$$;

create function owns_contractor_account(target_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from contractor_accounts
    where id = target_id and profile_id = auth.uid()
  );
$$;

-- ---------------------------------------------------------------------------
-- Enable RLS everywhere. No table holding user data is exempt.
-- ---------------------------------------------------------------------------

alter table profiles enable row level security;
alter table admin_accounts enable row level security;
alter table organizations enable row level security;
alter table customer_accounts enable row level security;
alter table contractor_accounts enable row level security;
alter table contractor_rates enable row level security;
alter table contractor_service_areas enable row level security;
alter table contractor_insurance enable row level security;
alter table mower_models enable row level security;
alter table service_plans enable row level security;
alter table properties enable row level security;
alter table customer_subscriptions enable row level security;
alter table customer_mowers enable row level security;
alter table service_requests enable row level security;
alter table service_schedules enable row level security;
alter table appointments enable row level security;
alter table work_orders enable row level security;
alter table job_assignments enable row level security;
alter table job_updates enable row level security;
alter table quote_requests enable row level security;
alter table invoices enable row level security;
alter table invoice_items enable row level security;
alter table payments enable row level security;
alter table complaints enable row level security;
alter table messages enable row level security;
alter table notifications enable row level security;
alter table documents enable row level security;
alter table audit_logs enable row level security;

-- ---------------------------------------------------------------------------
-- profiles
-- ---------------------------------------------------------------------------

create policy profiles_select on profiles for select
  using (id = auth.uid() or is_admin());

create policy profiles_update on profiles for update
  using (id = auth.uid() or is_admin());

-- ---------------------------------------------------------------------------
-- admin_accounts (managed by existing admins / service role only)
-- ---------------------------------------------------------------------------

create policy admin_accounts_select on admin_accounts for select
  using (is_admin());

-- ---------------------------------------------------------------------------
-- organizations
-- ---------------------------------------------------------------------------

create policy organizations_select on organizations for select
  using (
    is_admin()
    or id in (select organization_id from customer_accounts where profile_id = auth.uid())
    or id in (select affiliated_organization_id from customer_accounts where profile_id = auth.uid())
  );

create policy organizations_insert on organizations for insert
  with check (is_admin());

create policy organizations_update on organizations for update
  using (is_admin());

-- ---------------------------------------------------------------------------
-- customer_accounts
-- ---------------------------------------------------------------------------

create policy customer_accounts_select on customer_accounts for select
  using (profile_id = auth.uid() or is_admin());

create policy customer_accounts_insert on customer_accounts for insert
  with check (profile_id = auth.uid() or is_admin());

create policy customer_accounts_update on customer_accounts for update
  using (profile_id = auth.uid() or is_admin());

-- ---------------------------------------------------------------------------
-- contractor_accounts
-- ---------------------------------------------------------------------------

create policy contractor_accounts_select on contractor_accounts for select
  using (profile_id = auth.uid() or is_admin());

create policy contractor_accounts_insert on contractor_accounts for insert
  with check (profile_id = auth.uid() or is_admin());

create policy contractor_accounts_update on contractor_accounts for update
  using (profile_id = auth.uid() or is_admin());

-- ---------------------------------------------------------------------------
-- contractor_rates / contractor_service_areas / contractor_insurance
-- ---------------------------------------------------------------------------

create policy contractor_rates_select on contractor_rates for select
  using (is_admin() or owns_contractor_account(contractor_account_id));

create policy contractor_rates_insert on contractor_rates for insert
  with check (is_admin() or owns_contractor_account(contractor_account_id));

create policy contractor_rates_update on contractor_rates for update
  using (is_admin() or owns_contractor_account(contractor_account_id));

create policy contractor_service_areas_select on contractor_service_areas for select
  using (is_admin() or owns_contractor_account(contractor_account_id));

create policy contractor_service_areas_insert on contractor_service_areas for insert
  with check (is_admin() or owns_contractor_account(contractor_account_id));

create policy contractor_service_areas_update on contractor_service_areas for update
  using (is_admin() or owns_contractor_account(contractor_account_id));

create policy contractor_service_areas_delete on contractor_service_areas for delete
  using (is_admin() or owns_contractor_account(contractor_account_id));

create policy contractor_insurance_select on contractor_insurance for select
  using (is_admin() or owns_contractor_account(contractor_account_id));

create policy contractor_insurance_insert on contractor_insurance for insert
  with check (is_admin() or owns_contractor_account(contractor_account_id));

create policy contractor_insurance_update on contractor_insurance for update
  using (is_admin() or owns_contractor_account(contractor_account_id));

-- ---------------------------------------------------------------------------
-- mower_models / service_plans: public catalog, admin-managed
-- ---------------------------------------------------------------------------

create policy mower_models_select on mower_models for select
  to authenticated, anon
  using (true);

create policy mower_models_write on mower_models for all
  using (is_admin())
  with check (is_admin());

create policy service_plans_select on service_plans for select
  to authenticated, anon
  using (true);

create policy service_plans_write on service_plans for all
  using (is_admin())
  with check (is_admin());

-- ---------------------------------------------------------------------------
-- properties
-- ---------------------------------------------------------------------------

create policy properties_select on properties for select
  using (is_admin() or owns_customer_account(customer_account_id));

create policy properties_insert on properties for insert
  with check (is_admin() or owns_customer_account(customer_account_id));

create policy properties_update on properties for update
  using (is_admin() or owns_customer_account(customer_account_id));

-- ---------------------------------------------------------------------------
-- customer_subscriptions / customer_mowers
-- ---------------------------------------------------------------------------

create policy customer_subscriptions_select on customer_subscriptions for select
  using (is_admin() or owns_customer_account(customer_account_id));

create policy customer_subscriptions_insert on customer_subscriptions for insert
  with check (is_admin() or owns_customer_account(customer_account_id));

create policy customer_subscriptions_update on customer_subscriptions for update
  using (is_admin());

create policy customer_mowers_select on customer_mowers for select
  using (
    is_admin()
    or property_id in (
      select id from properties where owns_customer_account(customer_account_id)
    )
  );

create policy customer_mowers_write on customer_mowers for all
  using (is_admin())
  with check (is_admin());

-- ---------------------------------------------------------------------------
-- service_requests
-- ---------------------------------------------------------------------------

create policy service_requests_select on service_requests for select
  using (is_admin() or owns_customer_account(customer_account_id));

create policy service_requests_insert on service_requests for insert
  with check (is_admin() or owns_customer_account(customer_account_id));

create policy service_requests_update on service_requests for update
  using (is_admin() or owns_customer_account(customer_account_id));

-- ---------------------------------------------------------------------------
-- service_schedules (admin/ops managed)
-- ---------------------------------------------------------------------------

create policy service_schedules_select on service_schedules for select
  using (is_admin() or owns_customer_account(customer_account_id));

create policy service_schedules_write on service_schedules for all
  using (is_admin())
  with check (is_admin());

-- ---------------------------------------------------------------------------
-- appointments
-- ---------------------------------------------------------------------------

create policy appointments_select on appointments for select
  using (
    is_admin()
    or owns_customer_account(customer_account_id)
    or id in (
      select wo.appointment_id from work_orders wo
      join job_assignments ja on ja.work_order_id = wo.id
      where wo.appointment_id is not null and owns_contractor_account(ja.contractor_account_id)
    )
  );

create policy appointments_write on appointments for all
  using (is_admin())
  with check (is_admin());

-- ---------------------------------------------------------------------------
-- work_orders
-- ---------------------------------------------------------------------------

create policy work_orders_select on work_orders for select
  using (
    is_admin()
    or owns_customer_account(customer_account_id)
    or id in (
      select work_order_id from job_assignments where owns_contractor_account(contractor_account_id)
    )
  );

create policy work_orders_insert on work_orders for insert
  with check (is_admin());

create policy work_orders_update on work_orders for update
  using (
    is_admin()
    or id in (
      select work_order_id from job_assignments where owns_contractor_account(contractor_account_id)
    )
  );

-- ---------------------------------------------------------------------------
-- job_assignments (payout data — admin and the assigned contractor only;
-- not exposed to customers at the table level)
-- ---------------------------------------------------------------------------

create policy job_assignments_select on job_assignments for select
  using (is_admin() or owns_contractor_account(contractor_account_id));

create policy job_assignments_insert on job_assignments for insert
  with check (is_admin());

create policy job_assignments_update on job_assignments for update
  using (is_admin() or owns_contractor_account(contractor_account_id));

-- ---------------------------------------------------------------------------
-- job_updates (progress notes/photos — visible to admin, the assigned
-- contractor, and the customer who owns the work order)
-- ---------------------------------------------------------------------------

create policy job_updates_select on job_updates for select
  using (
    is_admin()
    or job_assignment_id in (
      select id from job_assignments where owns_contractor_account(contractor_account_id)
    )
    or work_order_id in (
      select id from work_orders where owns_customer_account(customer_account_id)
    )
  );

create policy job_updates_insert on job_updates for insert
  with check (
    is_admin()
    or job_assignment_id in (
      select id from job_assignments where owns_contractor_account(contractor_account_id)
    )
  );

-- ---------------------------------------------------------------------------
-- quote_requests
-- ---------------------------------------------------------------------------

create policy quote_requests_select on quote_requests for select
  using (is_admin() or owns_customer_account(customer_account_id));

create policy quote_requests_insert on quote_requests for insert
  with check (is_admin() or owns_customer_account(customer_account_id));

create policy quote_requests_update on quote_requests for update
  using (is_admin() or owns_customer_account(customer_account_id));

-- ---------------------------------------------------------------------------
-- invoices / invoice_items / payments
-- ---------------------------------------------------------------------------

create policy invoices_select on invoices for select
  using (is_admin() or owns_customer_account(customer_account_id));

create policy invoices_write on invoices for all
  using (is_admin())
  with check (is_admin());

create policy invoice_items_select on invoice_items for select
  using (
    is_admin()
    or invoice_id in (
      select id from invoices where owns_customer_account(customer_account_id)
    )
  );

create policy invoice_items_write on invoice_items for all
  using (is_admin())
  with check (is_admin());

create policy payments_select on payments for select
  using (is_admin() or owns_customer_account(customer_account_id));

create policy payments_write on payments for all
  using (is_admin())
  with check (is_admin());

-- ---------------------------------------------------------------------------
-- complaints
-- ---------------------------------------------------------------------------

create policy complaints_select on complaints for select
  using (is_admin() or owns_customer_account(customer_account_id));

create policy complaints_insert on complaints for insert
  with check (is_admin() or owns_customer_account(customer_account_id));

create policy complaints_update on complaints for update
  using (is_admin());

-- ---------------------------------------------------------------------------
-- messages / notifications
-- ---------------------------------------------------------------------------

create policy messages_select on messages for select
  using (is_admin() or auth.uid() in (sender_profile_id, recipient_profile_id));

create policy messages_insert on messages for insert
  with check (sender_profile_id = auth.uid());

create policy messages_update on messages for update
  using (is_admin() or auth.uid() in (sender_profile_id, recipient_profile_id));

create policy notifications_select on notifications for select
  using (profile_id = auth.uid() or is_admin());

create policy notifications_insert on notifications for insert
  with check (is_admin());

create policy notifications_update on notifications for update
  using (profile_id = auth.uid() or is_admin());

-- ---------------------------------------------------------------------------
-- documents (polymorphic ownership)
-- ---------------------------------------------------------------------------

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
      union
      select affiliated_organization_id from customer_accounts where profile_id = auth.uid()
    ))
    or (owner_type = 'work_order' and (
      owner_id in (select id from work_orders where owns_customer_account(customer_account_id))
      or owner_id in (
        select work_order_id from job_assignments where owns_contractor_account(contractor_account_id)
      )
    ))
  );

create policy documents_insert on documents for insert
  with check (
    is_admin()
    or (owner_type = 'customer_account' and owns_customer_account(owner_id))
    or (owner_type = 'contractor_account' and owns_contractor_account(owner_id))
  );

-- ---------------------------------------------------------------------------
-- audit_logs (admin read-only; writes happen only via the security definer
-- trigger function, which bypasses RLS)
-- ---------------------------------------------------------------------------

create policy audit_logs_select on audit_logs for select
  using (is_admin());
