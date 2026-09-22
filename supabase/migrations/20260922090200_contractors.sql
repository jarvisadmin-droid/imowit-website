create table contractor_accounts (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null unique references profiles (id) on delete cascade,
  business_name text,
  region text,
  status contractor_status not null default 'active',
  stripe_connect_account_id text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz
);

-- Per-service rate: a contractor can charge a different base rate and
-- markup for each service_type they perform. job_assignments snapshots
-- from here at assignment time.
create table contractor_rates (
  id uuid primary key default gen_random_uuid(),
  contractor_account_id uuid not null references contractor_accounts (id) on delete cascade,
  service_type service_type not null,
  base_rate numeric(10, 2) not null,
  rate_type rate_type not null default 'per_job',
  markup_percentage numeric(5, 2) not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (contractor_account_id, service_type)
);

create table contractor_service_areas (
  id uuid primary key default gen_random_uuid(),
  contractor_account_id uuid not null references contractor_accounts (id) on delete cascade,
  zip_code text not null,
  created_at timestamptz not null default now(),
  unique (contractor_account_id, zip_code)
);

create table contractor_insurance (
  id uuid primary key default gen_random_uuid(),
  contractor_account_id uuid not null references contractor_accounts (id) on delete cascade,
  provider_name text not null,
  policy_number text not null,
  coverage_amount numeric(12, 2),
  effective_date date,
  expiration_date date,
  document_id uuid references documents (id) on delete set null,
  verified boolean not null default false,
  verified_by uuid references profiles (id),
  verified_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index idx_contractor_accounts_profile_id on contractor_accounts (profile_id);
create index idx_contractor_rates_contractor_account_id on contractor_rates (contractor_account_id);
create index idx_contractor_service_areas_contractor_account_id on contractor_service_areas (contractor_account_id);
create index idx_contractor_service_areas_zip_code on contractor_service_areas (zip_code);
create index idx_contractor_insurance_contractor_account_id on contractor_insurance (contractor_account_id);
