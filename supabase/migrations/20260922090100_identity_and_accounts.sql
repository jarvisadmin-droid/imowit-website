-- profiles: 1:1 shadow of auth.users. Base identity for every role.
create table profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  full_name text,
  phone text,
  avatar_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table admin_accounts (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null unique references profiles (id) on delete cascade,
  admin_role admin_role not null default 'support',
  status account_status not null default 'active',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz
);

create table organizations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  organization_type organization_type not null default 'hoa',
  contact_name text,
  contact_email text,
  contact_phone text,
  address_line1 text,
  address_line2 text,
  city text,
  state text,
  postal_code text,
  status account_status not null default 'active',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz
);

create table customer_accounts (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null unique references profiles (id) on delete cascade,
  account_type account_type not null default 'individual',
  -- The organization's own billing account (set only when account_type = 'organization').
  organization_id uuid references organizations (id) on delete restrict,
  -- Association-only tag for an individual customer's HOA, no billing/approval implications.
  affiliated_organization_id uuid references organizations (id) on delete set null,
  billing_email text,
  phone text,
  status account_status not null default 'active',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz,
  constraint customer_accounts_org_billing_check check (
    (account_type = 'organization' and organization_id is not null)
    or (account_type = 'individual' and organization_id is null)
  ),
  constraint customer_accounts_affiliation_check check (
    account_type = 'individual' or affiliated_organization_id is null
  )
);

create index idx_admin_accounts_profile_id on admin_accounts (profile_id);
create index idx_customer_accounts_profile_id on customer_accounts (profile_id);
create index idx_customer_accounts_organization_id on customer_accounts (organization_id);
create index idx_customer_accounts_affiliated_organization_id on customer_accounts (affiliated_organization_id);

-- documents: polymorphic file/record metadata (files live in Supabase Storage).
-- owner_id is intentionally not a foreign key since it can reference several
-- different tables depending on owner_type.
create table documents (
  id uuid primary key default gen_random_uuid(),
  owner_type document_owner_type not null,
  owner_id uuid not null,
  document_type text not null,
  file_path text not null,
  uploaded_by uuid references profiles (id),
  created_at timestamptz not null default now(),
  deleted_at timestamptz
);

create index idx_documents_owner on documents (owner_type, owner_id);
