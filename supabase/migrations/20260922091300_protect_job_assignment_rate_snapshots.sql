-- job_assignments_update (RLS) intentionally lets a contractor update their
-- own assignment row so they can change status (assigned -> accepted ->
-- completed, or decline). RLS alone can't restrict that permission to a
-- single column, so this trigger blocks non-admins from touching the
-- snapshotted rate fields after the row is created.

create function protect_job_assignment_rate_snapshots()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if not is_admin() and (
    new.base_rate_snapshot is distinct from old.base_rate_snapshot
    or new.markup_percentage_snapshot is distinct from old.markup_percentage_snapshot
  ) then
    raise exception 'Only an admin can modify job_assignments rate fields';
  end if;
  return new;
end;
$$;

create trigger job_assignments_protect_rate_snapshots
  before update on job_assignments
  for each row execute function protect_job_assignment_rate_snapshots();
