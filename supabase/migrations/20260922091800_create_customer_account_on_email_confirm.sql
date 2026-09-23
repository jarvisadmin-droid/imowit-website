-- Every self-signed-up customer gets an individual customer_accounts row,
-- created by the database rather than client code, so it can't be skipped if
-- the app closes mid-sign-up and customers never need insert access.
--
-- Staff (admins, contractors) never self-sign-up: an admin creates them
-- server-side with app_metadata.staff_role set, and they are skipped here.
-- app_metadata is only writable by the service role, so users can't set it.
--
-- Keyed on email confirmation rather than on the auth.users insert: the admin
-- flow creates the user and then sends the invite, and the staff role is
-- guaranteed to be in place by the time anyone confirms. It also means
-- abandoned, unconfirmed sign-ups don't become customers.

create function create_customer_account_on_confirm()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if new.email_confirmed_at is null
     or (tg_op = 'UPDATE' and old.email_confirmed_at is not null)
     or coalesce(new.raw_app_meta_data ->> 'staff_role', '') in ('admin', 'contractor') then
    return new;
  end if;

  insert into public.customer_accounts (profile_id, account_type)
  values (new.id, 'individual')
  on conflict (profile_id) do nothing;
  return new;
end;
$$;

-- Fires on every update (not `update of email_confirmed_at`) so it doesn't
-- depend on which columns Supabase Auth lists when it confirms a user; the
-- null -> not null check above does the filtering.
--
-- Named to sort after on_auth_user_created: triggers with the same timing fire
-- in name order, and the profile (FK target) must exist first when a user is
-- inserted already confirmed.
create trigger on_auth_user_verified
  after insert or update on auth.users
  for each row execute function create_customer_account_on_confirm();
