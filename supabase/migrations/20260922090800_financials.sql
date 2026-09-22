create table invoices (
  id uuid primary key default gen_random_uuid(),
  customer_account_id uuid not null references customer_accounts (id) on delete cascade,
  -- One invoice per work order. Nullable to leave room for a future
  -- non-work-order invoice type, but always set in the current flow.
  work_order_id uuid unique references work_orders (id) on delete set null,
  status invoice_status not null default 'draft',
  subtotal numeric(10, 2) not null default 0,
  tax_amount numeric(10, 2) not null default 0,
  total_amount numeric(10, 2) not null default 0,
  currency text not null default 'usd',
  due_date date,
  sent_at timestamptz,
  paid_at timestamptz,
  stripe_invoice_id text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table invoice_items (
  id uuid primary key default gen_random_uuid(),
  invoice_id uuid not null references invoices (id) on delete cascade,
  description text not null,
  quantity numeric(10, 2) not null default 1,
  unit_price numeric(10, 2) not null,
  amount numeric(10, 2) generated always as (round(quantity * unit_price, 2)) stored,
  created_at timestamptz not null default now()
);

-- No card data is ever stored here or anywhere else in this schema.
-- Payments are tracked only via Stripe's own identifiers.
create table payments (
  id uuid primary key default gen_random_uuid(),
  invoice_id uuid not null references invoices (id) on delete cascade,
  customer_account_id uuid not null references customer_accounts (id) on delete cascade,
  amount numeric(10, 2) not null,
  currency text not null default 'usd',
  status payment_status not null default 'pending',
  stripe_payment_intent_id text unique,
  paid_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index idx_invoices_customer_account_id on invoices (customer_account_id);
create index idx_invoices_status on invoices (status);
create index idx_invoice_items_invoice_id on invoice_items (invoice_id);
create index idx_payments_invoice_id on payments (invoice_id);
create index idx_payments_customer_account_id on payments (customer_account_id);
