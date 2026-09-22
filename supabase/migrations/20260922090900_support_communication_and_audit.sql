create table complaints (
  id uuid primary key default gen_random_uuid(),
  customer_account_id uuid not null references customer_accounts (id) on delete cascade,
  property_id uuid references properties (id) on delete set null,
  work_order_id uuid references work_orders (id) on delete set null,
  submitted_by uuid not null references profiles (id),
  subject text not null,
  description text not null,
  status complaint_status not null default 'open',
  resolution_notes text,
  resolved_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table messages (
  id uuid primary key default gen_random_uuid(),
  related_entity_type entity_type,
  related_entity_id uuid,
  sender_profile_id uuid not null references profiles (id),
  recipient_profile_id uuid references profiles (id),
  body text not null,
  read_at timestamptz,
  created_at timestamptz not null default now()
);

create table notifications (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references profiles (id) on delete cascade,
  notification_type text not null,
  title text not null,
  body text,
  related_entity_type entity_type,
  related_entity_id uuid,
  read_at timestamptz,
  created_at timestamptz not null default now()
);

-- Populated by triggers on the tables that matter most (see
-- 20260922091100_functions_and_triggers.sql), not written to directly
-- by application code.
create table audit_logs (
  id uuid primary key default gen_random_uuid(),
  actor_profile_id uuid references profiles (id),
  action text not null,
  table_name text not null,
  record_id uuid,
  old_values jsonb,
  new_values jsonb,
  created_at timestamptz not null default now()
);

create index idx_complaints_customer_account_id on complaints (customer_account_id);
create index idx_complaints_status on complaints (status);
create index idx_messages_sender_profile_id on messages (sender_profile_id);
create index idx_messages_recipient_profile_id on messages (recipient_profile_id);
create index idx_messages_related_entity on messages (related_entity_type, related_entity_id);
create index idx_notifications_profile_id on notifications (profile_id);
create index idx_notifications_read_at on notifications (read_at);
create index idx_audit_logs_table_record on audit_logs (table_name, record_id);
create index idx_audit_logs_created_at on audit_logs (created_at);
