-- One-time, customer-initiated work.
create table service_requests (
  id uuid primary key default gen_random_uuid(),
  customer_account_id uuid not null references customer_accounts (id) on delete cascade,
  property_id uuid not null references properties (id) on delete cascade,
  requested_by uuid not null references profiles (id),
  service_type service_type,
  description text not null,
  status service_request_status not null default 'open',
  priority text not null default 'normal',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Recurring subcontractor services (e.g. monthly fertilization). A scheduled
-- job (see 20260922091200_scheduled_jobs.sql) reads next_run_at and
-- generates future work_orders/appointments from these.
create table service_schedules (
  id uuid primary key default gen_random_uuid(),
  customer_account_id uuid not null references customer_accounts (id) on delete cascade,
  property_id uuid not null references properties (id) on delete cascade,
  service_type service_type not null,
  -- Fixed price set at creation; every work_order generated from this
  -- schedule inherits it directly (drives the auto-created draft invoice).
  price numeric(10, 2) not null,
  frequency schedule_frequency not null,
  interval_count int not null default 1,
  start_date date not null,
  end_date date,
  next_run_at timestamptz not null,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz
);

create table appointments (
  id uuid primary key default gen_random_uuid(),
  customer_account_id uuid not null references customer_accounts (id) on delete cascade,
  property_id uuid not null references properties (id) on delete cascade,
  service_request_id uuid references service_requests (id) on delete set null,
  service_schedule_id uuid references service_schedules (id) on delete set null,
  scheduled_start timestamptz not null,
  scheduled_end timestamptz,
  status appointment_status not null default 'scheduled',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- The unit of billable work. A draft invoice is created automatically
-- whenever a row is inserted here (see 20260922091100_functions_and_triggers.sql).
create table work_orders (
  id uuid primary key default gen_random_uuid(),
  customer_account_id uuid not null references customer_accounts (id) on delete cascade,
  property_id uuid not null references properties (id) on delete cascade,
  appointment_id uuid references appointments (id) on delete set null,
  service_request_id uuid references service_requests (id) on delete set null,
  service_schedule_id uuid references service_schedules (id) on delete set null,
  service_type service_type not null,
  -- Source of the draft invoice amount: service_schedules.price for
  -- schedule-driven work, quote_requests.estimated_amount for quote-driven
  -- work, or set directly by an admin for ad hoc work.
  price numeric(10, 2) not null,
  status work_order_status not null default 'pending',
  scheduled_date date,
  completed_at timestamptz,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index idx_service_requests_customer_account_id on service_requests (customer_account_id);
create index idx_service_requests_property_id on service_requests (property_id);
create index idx_service_requests_status on service_requests (status);

create index idx_service_schedules_customer_account_id on service_schedules (customer_account_id);
create index idx_service_schedules_property_id on service_schedules (property_id);
create index idx_service_schedules_next_run_at on service_schedules (next_run_at) where is_active;

create index idx_appointments_property_id on appointments (property_id);
create index idx_appointments_scheduled_start on appointments (scheduled_start);
create index idx_appointments_status on appointments (status);

create index idx_work_orders_customer_account_id on work_orders (customer_account_id);
create index idx_work_orders_property_status_date on work_orders (property_id, status, scheduled_date);
