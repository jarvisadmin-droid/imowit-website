create table job_assignments (
  id uuid primary key default gen_random_uuid(),
  work_order_id uuid not null references work_orders (id) on delete cascade,
  contractor_account_id uuid not null references contractor_accounts (id) on delete restrict,
  service_type service_type not null,
  -- Snapshotted from contractor_rates at assignment time, so a later rate
  -- change never retroactively alters an already-assigned job's payout.
  base_rate_snapshot numeric(10, 2) not null,
  markup_percentage_snapshot numeric(5, 2) not null,
  payout_amount numeric(10, 2) generated always as (
    round(base_rate_snapshot * (1 + markup_percentage_snapshot / 100), 2)
  ) stored,
  status job_assignment_status not null default 'assigned',
  assigned_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (work_order_id, contractor_account_id)
);

create table job_updates (
  id uuid primary key default gen_random_uuid(),
  work_order_id uuid not null references work_orders (id) on delete cascade,
  job_assignment_id uuid references job_assignments (id) on delete set null,
  author_profile_id uuid not null references profiles (id),
  update_type job_update_type not null default 'note',
  message text,
  photo_url text,
  created_at timestamptz not null default now()
);

create table quote_requests (
  id uuid primary key default gen_random_uuid(),
  customer_account_id uuid not null references customer_accounts (id) on delete cascade,
  property_id uuid references properties (id) on delete set null,
  requested_by uuid not null references profiles (id),
  description text not null,
  status quote_status not null default 'pending',
  estimated_amount numeric(10, 2),
  estimated_by uuid references profiles (id),
  estimated_at timestamptz,
  sent_at timestamptz,
  responded_at timestamptz,
  decline_reason text,
  resulting_work_order_id uuid references work_orders (id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index idx_job_assignments_work_order_id on job_assignments (work_order_id);
create index idx_job_assignments_contractor_account_id on job_assignments (contractor_account_id);
create index idx_job_updates_work_order_id on job_updates (work_order_id);
create index idx_quote_requests_customer_account_id on quote_requests (customer_account_id);
create index idx_quote_requests_status on quote_requests (status);
