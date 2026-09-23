-- customer_accounts rows are created by create_customer_account_on_confirm()
-- (and by admins), so customers no longer need to insert them. The mobile app
-- stopped inserting its own row in imowit-app b85ed44.
--
-- The service role bypasses RLS, so server-side admin code is unaffected, and
-- the confirm trigger is security definer (runs as the table owner).
drop policy customer_accounts_insert on customer_accounts;
create policy customer_accounts_insert on customer_accounts for insert
  with check (is_admin());
