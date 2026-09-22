-- Marketing consent on profiles, tracked separately per channel (email vs.
-- push). Both default to opted out; the *_opt_in_at columns record when the
-- current opt-in was given and stay null until then.

alter table profiles
  add column marketing_email_opt_in boolean not null default false,
  add column marketing_email_opt_in_at timestamptz,
  add column marketing_push_opt_in boolean not null default false,
  add column marketing_push_opt_in_at timestamptz;

-- The *_opt_in_at columns are server-controlled so they can serve as a
-- consent record: stamped with now() when the flag turns on, cleared when it
-- turns off, and otherwise pinned to their previous value. Any value a client
-- sends for them directly is ignored.

create function set_marketing_opt_in_timestamps()
returns trigger
language plpgsql
as $$
begin
  if tg_op = 'INSERT' then
    new.marketing_email_opt_in_at = case when new.marketing_email_opt_in then now() end;
    new.marketing_push_opt_in_at = case when new.marketing_push_opt_in then now() end;
    return new;
  end if;

  if new.marketing_email_opt_in is distinct from old.marketing_email_opt_in then
    new.marketing_email_opt_in_at = case when new.marketing_email_opt_in then now() end;
  else
    new.marketing_email_opt_in_at = old.marketing_email_opt_in_at;
  end if;

  if new.marketing_push_opt_in is distinct from old.marketing_push_opt_in then
    new.marketing_push_opt_in_at = case when new.marketing_push_opt_in then now() end;
  else
    new.marketing_push_opt_in_at = old.marketing_push_opt_in_at;
  end if;

  return new;
end;
$$;

create trigger profiles_set_marketing_opt_in_timestamps
  before insert or update on profiles
  for each row execute function set_marketing_opt_in_timestamps();
