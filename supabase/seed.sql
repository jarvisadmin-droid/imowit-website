-- Local development / testing seed data ONLY. Never run against production.
-- Loaded automatically by `supabase db reset` when using the Supabase CLI.

-- ---------------------------------------------------------------------------
-- auth.users (profiles are created automatically by the on_auth_user_created
-- trigger). This pattern — inserting directly into auth.users — is standard
-- for local Supabase CLI dev seeding (`supabase start` + `supabase db reset`)
-- but is NOT how real users are created in the app (that goes through
-- Supabase Auth sign-up). Password for every seed user below: "password123".
-- ---------------------------------------------------------------------------

insert into auth.users (
  instance_id, id, aud, role, email, encrypted_password, email_confirmed_at,
  raw_app_meta_data, raw_user_meta_data, created_at, updated_at,
  confirmation_token, email_change, email_change_token_new, recovery_token
) values
  ('00000000-0000-0000-0000-000000000000', '10000000-0000-0000-0000-000000000001', 'authenticated', 'authenticated', 'admin@imowit.dev', crypt('password123', gen_salt('bf')), now(), '{"provider":"email","providers":["email"]}', '{"full_name":"Alex Admin"}', now(), now(), '', '', '', ''),
  ('00000000-0000-0000-0000-000000000000', '10000000-0000-0000-0000-000000000002', 'authenticated', 'authenticated', 'homeowner1@imowit.dev', crypt('password123', gen_salt('bf')), now(), '{"provider":"email","providers":["email"]}', '{"full_name":"Jamie Homeowner"}', now(), now(), '', '', '', ''),
  ('00000000-0000-0000-0000-000000000000', '10000000-0000-0000-0000-000000000003', 'authenticated', 'authenticated', 'homeowner2@imowit.dev', crypt('password123', gen_salt('bf')), now(), '{"provider":"email","providers":["email"]}', '{"full_name":"Sam Resident"}', now(), now(), '', '', '', ''),
  ('00000000-0000-0000-0000-000000000000', '10000000-0000-0000-0000-000000000004', 'authenticated', 'authenticated', 'hoa_manager@imowit.dev', crypt('password123', gen_salt('bf')), now(), '{"provider":"email","providers":["email"]}', '{"full_name":"Morgan Manager"}', now(), now(), '', '', '', ''),
  ('00000000-0000-0000-0000-000000000000', '10000000-0000-0000-0000-000000000005', 'authenticated', 'authenticated', 'contractor1@imowit.dev', crypt('password123', gen_salt('bf')), now(), '{"provider":"email","providers":["email"]}', '{"full_name":"Casey Contractor"}', now(), now(), '', '', '', ''),
  ('00000000-0000-0000-0000-000000000000', '10000000-0000-0000-0000-000000000006', 'authenticated', 'authenticated', 'contractor2@imowit.dev', crypt('password123', gen_salt('bf')), now(), '{"provider":"email","providers":["email"]}', '{"full_name":"Riley Rodriguez"}', now(), now(), '', '', '', '');

-- ---------------------------------------------------------------------------
-- Organization (HOA)
-- ---------------------------------------------------------------------------

insert into organizations (id, name, organization_type, contact_name, contact_email, contact_phone, address_line1, city, state, postal_code)
values ('20000000-0000-0000-0000-000000000001', 'Maple Grove HOA', 'hoa', 'Morgan Manager', 'hoa_manager@imowit.dev', '763-555-0100', '1 Maple Grove Cir', 'Maple Grove', 'MN', '55369');

-- ---------------------------------------------------------------------------
-- Accounts
-- ---------------------------------------------------------------------------

insert into admin_accounts (profile_id, admin_role)
values ('10000000-0000-0000-0000-000000000001', 'super_admin');

insert into customer_accounts (id, profile_id, account_type, billing_email)
values
  ('30000000-0000-0000-0000-000000000001', '10000000-0000-0000-0000-000000000002', 'individual', 'homeowner1@imowit.dev'),
  ('30000000-0000-0000-0000-000000000002', '10000000-0000-0000-0000-000000000003', 'individual', 'homeowner2@imowit.dev');

update customer_accounts set affiliated_organization_id = '20000000-0000-0000-0000-000000000001'
where id = '30000000-0000-0000-0000-000000000002';

insert into customer_accounts (id, profile_id, account_type, organization_id, billing_email)
values ('30000000-0000-0000-0000-000000000003', '10000000-0000-0000-0000-000000000004', 'organization', '20000000-0000-0000-0000-000000000001', 'hoa_manager@imowit.dev');

insert into contractor_accounts (id, profile_id, business_name, region)
values
  ('40000000-0000-0000-0000-000000000001', '10000000-0000-0000-0000-000000000005', 'GreenScape Lawn Co', 'Twin Cities Metro'),
  ('40000000-0000-0000-0000-000000000002', '10000000-0000-0000-0000-000000000006', 'Twin Cities Mow Pros', 'Twin Cities Metro');

-- ---------------------------------------------------------------------------
-- Catalog: mower models, service plans
-- ---------------------------------------------------------------------------

insert into mower_models (id, manufacturer, model_name, model_year, cutting_width_inches, battery_type, msrp)
values
  ('50000000-0000-0000-0000-000000000001', 'Husqvarna', 'Automower 415X', 2025, 8.7, 'Li-ion', 2999.00),
  ('50000000-0000-0000-0000-000000000002', 'Worx', 'Landroid Vision', 2025, 7.0, 'Li-ion', 1399.00);

insert into service_plans (id, name, description, plan_type, monthly_price, purchase_option_enabled, purchase_option_unlock_months, purchase_option_price)
values
  ('60000000-0000-0000-0000-000000000001', 'Basic Rental', 'Pure rental, no ownership path.', 'rental_no_ownership', 89.00, false, null, null),
  ('60000000-0000-0000-0000-000000000002', 'Rental with Buyout', 'Rental with a purchase option unlocking after 3 years.', 'rental_with_purchase_option', 129.00, true, 36, 899.00);

-- ---------------------------------------------------------------------------
-- Properties
-- ---------------------------------------------------------------------------

insert into properties (id, customer_account_id, property_type, address_line1, city, state, postal_code)
values
  ('70000000-0000-0000-0000-000000000001', '30000000-0000-0000-0000-000000000001', 'residential', '123 Elm St', 'Minneapolis', 'MN', '55408'),
  ('70000000-0000-0000-0000-000000000002', '30000000-0000-0000-0000-000000000002', 'residential', '45 Maple Grove Cir, Unit 7', 'Maple Grove', 'MN', '55369'),
  ('70000000-0000-0000-0000-000000000003', '30000000-0000-0000-0000-000000000003', 'commercial', '1 Maple Grove Cir', 'Maple Grove', 'MN', '55369');

-- ---------------------------------------------------------------------------
-- Subscriptions and mowers
-- ---------------------------------------------------------------------------

insert into customer_subscriptions (id, customer_account_id, property_id, service_plan_id, start_date, purchase_option_eligible_at)
values
  ('80000000-0000-0000-0000-000000000001', '30000000-0000-0000-0000-000000000001', '70000000-0000-0000-0000-000000000001', '60000000-0000-0000-0000-000000000002', current_date - interval '6 months', current_date - interval '6 months' + interval '36 months'),
  ('80000000-0000-0000-0000-000000000002', '30000000-0000-0000-0000-000000000002', '70000000-0000-0000-0000-000000000002', '60000000-0000-0000-0000-000000000001', current_date - interval '2 months', null);

insert into customer_mowers (mower_model_id, property_id, customer_subscription_id, serial_number, status, installed_at)
values
  ('50000000-0000-0000-0000-000000000001', '70000000-0000-0000-0000-000000000001', '80000000-0000-0000-0000-000000000001', 'HUS-2025-0001', 'active', current_date - interval '6 months'),
  ('50000000-0000-0000-0000-000000000002', '70000000-0000-0000-0000-000000000002', '80000000-0000-0000-0000-000000000002', 'WRX-2025-0002', 'active', current_date - interval '2 months');

-- ---------------------------------------------------------------------------
-- Contractor rates, service areas, insurance
-- ---------------------------------------------------------------------------

insert into contractor_rates (contractor_account_id, service_type, base_rate, rate_type, markup_percentage)
values
  ('40000000-0000-0000-0000-000000000001', 'mowing', 40.00, 'per_visit', 20),
  ('40000000-0000-0000-0000-000000000001', 'fall_cleanup', 150.00, 'per_job', 20),
  ('40000000-0000-0000-0000-000000000002', 'mowing', 35.00, 'per_visit', 25),
  ('40000000-0000-0000-0000-000000000002', 'fertilization', 60.00, 'per_visit', 15);

insert into contractor_insurance (contractor_account_id, provider_name, policy_number, coverage_amount, effective_date, expiration_date, verified)
values ('40000000-0000-0000-0000-000000000001', 'Twin Cities Business Insurance', 'TCB-100234', 1000000.00, current_date - interval '3 months', current_date + interval '9 months', true);

-- Approximate real zip codes within roughly 30 miles of downtown Minneapolis,
-- MN, compiled from general geographic knowledge (not a live geocoding
-- lookup) -- good enough for dev/test seeding, but verify against
-- USPS/Census data before relying on this list for anything production-facing.
insert into contractor_service_areas (contractor_account_id, zip_code)
select '40000000-0000-0000-0000-000000000001', zip from unnest(array[
  '55401','55402','55403','55404','55405','55406','55407','55408','55409','55410',
  '55411','55412','55413','55414','55415','55416','55417','55418','55419','55420',
  '55421','55422','55423','55424','55425','55426','55427','55428','55429','55430',
  '55431','55432','55433','55434','55435','55436','55437','55438','55439','55441',
  '55442','55443','55444','55445','55446','55447','55448','55449',
  '55343','55345','55346','55347','55305','55391','55318',
  '55337','55306','55372','55379','55124','55123','55122','55068',
  '55118','55107','55106','55117','55119','55109','55112','55113','55126','55127',
  '55014','55303','55304','55075','55076'
]) as zip;

insert into contractor_service_areas (contractor_account_id, zip_code)
select '40000000-0000-0000-0000-000000000002', zip from unnest(array[
  '55401','55402','55403','55404','55405','55406','55407','55408','55409','55410',
  '55411','55412','55413','55414','55415','55416','55418','55419',
  '55422','55426','55427','55416'
]) as zip
on conflict (contractor_account_id, zip_code) do nothing;

-- ---------------------------------------------------------------------------
-- Requests, schedules, work
-- ---------------------------------------------------------------------------

insert into service_requests (customer_account_id, property_id, requested_by, service_type, description, status)
values ('30000000-0000-0000-0000-000000000001', '70000000-0000-0000-0000-000000000001', '10000000-0000-0000-0000-000000000002', 'mowing', 'Extra trim needed near the back fence line.', 'open');

insert into service_schedules (id, customer_account_id, property_id, service_type, price, frequency, start_date, next_run_at)
values ('90000000-0000-0000-0000-000000000001', '30000000-0000-0000-0000-000000000003', '70000000-0000-0000-0000-000000000003', 'fertilization', 150.00, 'monthly', current_date, now() + interval '3 days');

insert into quote_requests (customer_account_id, property_id, requested_by, description, status)
values ('30000000-0000-0000-0000-000000000002', '70000000-0000-0000-0000-000000000002', '10000000-0000-0000-0000-000000000003', 'Interested in an aeration service for fall.', 'pending');

-- Inserting this work_order fires the create_draft_invoice_for_work_order
-- trigger, which creates a matching draft invoice + invoice_item automatically.
insert into work_orders (id, customer_account_id, property_id, service_type, price, status, scheduled_date)
values ('a0000000-0000-0000-0000-000000000001', '30000000-0000-0000-0000-000000000001', '70000000-0000-0000-0000-000000000001', 'mowing', 40.00, 'assigned', current_date + interval '2 days');

insert into job_assignments (work_order_id, contractor_account_id, service_type, base_rate_snapshot, markup_percentage_snapshot)
values ('a0000000-0000-0000-0000-000000000001', '40000000-0000-0000-0000-000000000001', 'mowing', 40.00, 20);

-- ---------------------------------------------------------------------------
-- Support / communication
-- ---------------------------------------------------------------------------

insert into complaints (customer_account_id, property_id, submitted_by, subject, description, status)
values ('30000000-0000-0000-0000-000000000002', '70000000-0000-0000-0000-000000000002', '10000000-0000-0000-0000-000000000003', 'Missed visit', 'The scheduled visit last week did not happen.', 'open');

insert into notifications (profile_id, notification_type, title, body)
values ('10000000-0000-0000-0000-000000000002', 'appointment_reminder', 'Upcoming mowing visit', 'Your mowing service is scheduled in 2 days.');
