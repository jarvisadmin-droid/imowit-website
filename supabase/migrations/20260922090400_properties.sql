create table properties (
  id uuid primary key default gen_random_uuid(),
  customer_account_id uuid not null references customer_accounts (id) on delete cascade,
  property_type property_type not null default 'residential',
  address_line1 text not null,
  address_line2 text,
  city text not null,
  state text not null,
  postal_code text not null,
  latitude numeric(9, 6),
  longitude numeric(9, 6),
  access_notes text,
  status account_status not null default 'active',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz
);

create index idx_properties_customer_account_id on properties (customer_account_id);
create index idx_properties_postal_code on properties (postal_code);
