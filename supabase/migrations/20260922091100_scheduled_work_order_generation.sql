-- Generates future work_orders (and appointments) from active
-- service_schedules, and advances each schedule's next_run_at.
--
-- NOTE: pg_cron must be enabled for this project before this migration can
-- run (Supabase Dashboard -> Database -> Extensions -> pg_cron), since it
-- isn't always grantable through a plain migration on hosted projects. If
-- `create extension` below fails, enable it in the dashboard first and
-- re-run this migration.

create extension if not exists pg_cron with schema extensions;

create function generate_scheduled_work_orders()
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  s record;
  new_appointment_id uuid;
  next_run timestamptz;
begin
  for s in
    select * from service_schedules
    where is_active and next_run_at <= now() and deleted_at is null
  loop
    insert into appointments (
      customer_account_id, property_id, service_schedule_id,
      scheduled_start, status
    )
    values (s.customer_account_id, s.property_id, s.id, s.next_run_at, 'scheduled')
    returning id into new_appointment_id;

    insert into work_orders (
      customer_account_id, property_id, appointment_id, service_schedule_id,
      service_type, price, status, scheduled_date
    )
    values (
      s.customer_account_id, s.property_id, new_appointment_id, s.id,
      s.service_type, s.price, 'pending', s.next_run_at::date
    );

    next_run := case s.frequency
      when 'weekly' then s.next_run_at + (s.interval_count || ' weeks')::interval
      when 'biweekly' then s.next_run_at + (s.interval_count * 2 || ' weeks')::interval
      when 'monthly' then s.next_run_at + (s.interval_count || ' months')::interval
      when 'quarterly' then s.next_run_at + (s.interval_count * 3 || ' months')::interval
      when 'annually' then s.next_run_at + (s.interval_count || ' years')::interval
    end;

    if s.end_date is not null and next_run::date > s.end_date then
      update service_schedules set is_active = false where id = s.id;
    else
      update service_schedules set next_run_at = next_run where id = s.id;
    end if;
  end loop;
end;
$$;

select cron.schedule(
  'generate-scheduled-work-orders',
  '0 * * * *',
  $$select generate_scheduled_work_orders();$$
);
