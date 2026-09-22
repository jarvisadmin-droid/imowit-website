create table mower_models (
  id uuid primary key default gen_random_uuid(),
  manufacturer text not null,
  model_name text not null,
  model_year int,
  cutting_width_inches numeric(5, 2),
  battery_type text,
  msrp numeric(10, 2),
  specs jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (manufacturer, model_name, model_year)
);

create table service_plans (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  plan_type plan_type not null,
  monthly_price numeric(10, 2) not null,
  purchase_option_enabled boolean not null default false,
  purchase_option_unlock_months int,
  purchase_option_price numeric(10, 2),
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint service_plans_purchase_option_check check (
    (
      plan_type = 'rental_no_ownership'
      and purchase_option_enabled = false
      and purchase_option_unlock_months is null
      and purchase_option_price is null
    )
    or (
      plan_type = 'rental_with_purchase_option'
      and purchase_option_enabled = true
      and purchase_option_unlock_months is not null
      and purchase_option_price is not null
    )
  )
);
