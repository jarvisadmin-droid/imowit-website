-- Website inquiries: the "Get In Touch" form (/inquire) and the subcontractor
-- application form (/subcontractors). Visitors aren't signed in, so they can't
-- touch the table directly: anon has no table grants and there is no insert
-- policy. The only way in is submit_inquiry() below (service role only), which
-- can insert a new row and nothing else. Staff read and triage inquiries in the admin dashboard.

create type inquiry_type as enum ('residential', 'commercial', 'subcontractor', 'partnership', 'other');
create type inquiry_status as enum ('new', 'read', 'archived');

create table inquiries (
  id uuid primary key default gen_random_uuid(),
  inquiry_type inquiry_type not null,
  first_name text not null,
  last_name text not null,
  email text not null,
  phone text,
  message text,
  zip_code text,
  experience text,
  source_page text not null,
  status inquiry_status not null default 'new',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint inquiries_first_name_check check (char_length(btrim(first_name)) between 1 and 100),
  constraint inquiries_last_name_check check (char_length(btrim(last_name)) between 1 and 100),
  constraint inquiries_email_check
    check (char_length(email) <= 254 and email ~ '^[^@\s]+@[^@\s]+\.[^@\s]+$'),
  constraint inquiries_phone_check check (phone is null or char_length(phone) between 1 and 40),
  constraint inquiries_message_check check (message is null or char_length(message) between 1 and 5000),
  constraint inquiries_zip_code_check check (zip_code is null or zip_code ~ '^\d{5}(-\d{4})?$'),
  constraint inquiries_experience_check
    check (experience is null or char_length(experience) between 1 and 2000),
  constraint inquiries_source_page_check check (source_page in ('inquire', 'subcontractors'))
);

create index idx_inquiries_status_created_at on inquiries (status, created_at desc);
-- For the per-email rate limit in submit_inquiry().
create index idx_inquiries_email_created_at on inquiries (lower(email), created_at desc);

create trigger set_updated_at before update on inquiries
  for each row execute function set_updated_at();

alter table inquiries enable row level security;

create policy inquiries_select on inquiries for select
  using (is_admin());

create policy inquiries_update on inquiries for update
  using (is_admin())
  with check (is_admin());

-- Called only by the website's Server Action, server-side with the service
-- role, after it has checked Cloudflare Turnstile and the honeypot. NOT granted
-- to anon/authenticated: every function is exposed through the Data API and the
-- anon key is public, so granting it would let anyone skip Turnstile.
-- Inserts one 'new' inquiry and returns only its id.
-- Errors carry a HINT the website matches on: rate_limited.
create function submit_inquiry(
  p_inquiry_type inquiry_type,
  p_first_name text,
  p_last_name text,
  p_email text,
  p_source_page text,
  p_phone text default null,
  p_message text default null,
  p_zip_code text default null,
  p_experience text default null
)
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  v_email text := lower(btrim(p_email));
  v_id uuid;
begin
  -- At most 5 inquiries per email address per hour.
  if (
    select count(*) from inquiries
    where lower(email) = v_email and created_at > now() - interval '1 hour'
  ) >= 5 then
    raise exception 'Too many inquiries from this email address' using hint = 'rate_limited';
  end if;

  insert into inquiries (
    inquiry_type, first_name, last_name, email, phone, message, zip_code, experience, source_page
  ) values (
    p_inquiry_type, btrim(p_first_name), btrim(p_last_name), v_email,
    nullif(btrim(p_phone), ''), nullif(btrim(p_message), ''), nullif(btrim(p_zip_code), ''),
    nullif(btrim(p_experience), ''), p_source_page
  )
  returning id into v_id;

  return v_id;
end;
$$;

revoke execute on function submit_inquiry(
  inquiry_type, text, text, text, text, text, text, text, text
) from public, anon, authenticated;
grant execute on function submit_inquiry(
  inquiry_type, text, text, text, text, text, text, text, text
) to service_role;
