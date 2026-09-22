-- Extensions
create extension if not exists pgcrypto with schema extensions;

-- Shared enum types, reused across tables wherever the same value set applies.

create type account_type as enum ('individual', 'organization');
create type organization_type as enum ('hoa', 'property_management', 'other');

-- Generic lifecycle status, shared by customer_accounts, organizations,
-- admin_accounts, and properties.
create type account_status as enum ('active', 'inactive', 'archived');

create type contractor_status as enum ('active', 'inactive', 'suspended');
create type admin_role as enum ('super_admin', 'support', 'operations', 'finance');

create type property_type as enum ('residential', 'commercial');
create type mower_status as enum ('active', 'maintenance', 'retired', 'returned');

create type plan_type as enum ('rental_no_ownership', 'rental_with_purchase_option');
create type subscription_status as enum ('active', 'paused', 'cancelled', 'pending_purchase');

-- Shared across service_requests, service_schedules, contractor_rates,
-- work_orders, and job_assignments.
create type service_type as enum (
  'mowing',
  'fertilization',
  'fall_cleanup',
  'shrub_trim',
  'aeration',
  'other'
);

create type rate_type as enum ('hourly', 'per_job', 'per_visit');
create type schedule_frequency as enum ('weekly', 'biweekly', 'monthly', 'quarterly', 'annually');

create type service_request_status as enum ('open', 'scheduled', 'in_progress', 'completed', 'cancelled');
create type appointment_status as enum ('scheduled', 'confirmed', 'in_progress', 'completed', 'cancelled', 'no_show');
create type work_order_status as enum ('pending', 'assigned', 'in_progress', 'completed', 'cancelled');
create type job_assignment_status as enum ('assigned', 'accepted', 'declined', 'completed');
create type job_update_type as enum ('status_change', 'note', 'photo', 'issue');
create type quote_status as enum ('pending', 'estimated', 'sent', 'accepted', 'declined');
create type invoice_status as enum ('draft', 'sent', 'paid', 'overdue', 'void');
create type payment_status as enum ('pending', 'succeeded', 'failed', 'refunded');
create type complaint_status as enum ('open', 'investigating', 'resolved', 'closed');

-- Shared by messages.related_entity_type and notifications.related_entity_type.
create type entity_type as enum (
  'service_request',
  'service_schedule',
  'appointment',
  'work_order',
  'quote_request',
  'invoice',
  'complaint',
  'general'
);

create type document_owner_type as enum (
  'customer_account',
  'contractor_account',
  'property',
  'organization',
  'work_order'
);
