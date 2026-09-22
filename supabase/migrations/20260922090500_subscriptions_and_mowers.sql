create table customer_subscriptions (
  id uuid primary key default gen_random_uuid(),
  customer_account_id uuid not null references customer_accounts (id) on delete cascade,
  property_id uuid not null references properties (id) on delete cascade,
  service_plan_id uuid not null references service_plans (id) on delete restrict,
  status subscription_status not null default 'active',
  start_date date not null default current_date,
  -- Derived from start_date + service_plans.purchase_option_unlock_months
  -- at creation time; kept as a plain column (not generated) so it survives
  -- unaffected if the underlying plan is edited later.
  purchase_option_eligible_at date,
  purchased_at timestamptz,
  stripe_subscription_id text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz
);

create table customer_mowers (
  id uuid primary key default gen_random_uuid(),
  mower_model_id uuid not null references mower_models (id) on delete restrict,
  property_id uuid not null references properties (id) on delete cascade,
  customer_subscription_id uuid references customer_subscriptions (id) on delete set null,
  serial_number text not null unique,
  status mower_status not null default 'active',
  installed_at date,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz
);

create index idx_customer_subscriptions_customer_account_id on customer_subscriptions (customer_account_id);
create index idx_customer_subscriptions_property_id on customer_subscriptions (property_id);
create index idx_customer_subscriptions_service_plan_id on customer_subscriptions (service_plan_id);
create index idx_customer_mowers_property_id on customer_mowers (property_id);
create index idx_customer_mowers_customer_subscription_id on customer_mowers (customer_subscription_id);
