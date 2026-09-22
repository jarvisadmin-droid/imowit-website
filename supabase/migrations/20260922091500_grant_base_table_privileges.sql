-- The RLS policies in 20260922091200_row_level_security.sql are scoped
-- `to authenticated` / `to anon`, but Postgres checks table-level GRANTs
-- *before* RLS policies are ever evaluated. A project's Supabase dashboard
-- normally bootstraps these grants automatically the first time a table is
-- created there; a schema built entirely through CLI migrations against a
-- fresh project never gets that bootstrap, so every table -- including for
-- service_role -- was unreadable/unwritable via the API despite RLS being
-- correctly configured.
--
-- Scoped to what each role's policies actually use: `anon` gets read-only
-- access to the two public catalog tables (matching the `mower_models` /
-- `service_plans` policies -- see docs/DATABASE_SCHEMA.md), `authenticated`
-- gets full CRUD table-level access with RLS as the real row-level
-- boundary, and `service_role` (server-side only, bypasses RLS) gets full
-- access. Applies to future tables too via default privileges.

grant usage on schema public to anon, authenticated, service_role;

grant select on mower_models, service_plans to anon;

grant select, insert, update, delete on all tables in schema public to authenticated;
grant all on all tables in schema public to service_role;

grant usage, select on all sequences in schema public to authenticated, service_role;
grant execute on all functions in schema public to authenticated, service_role;

alter default privileges in schema public
  grant select, insert, update, delete on tables to authenticated;
alter default privileges in schema public
  grant all on tables to service_role;
alter default privileges in schema public
  grant usage, select on sequences to authenticated, service_role;
alter default privileges in schema public
  grant execute on functions to authenticated, service_role;
