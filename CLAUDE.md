@AGENTS.md

# iMowiT Website — Project Instructions

These rules are permanent and apply to all work in this repository unless the user explicitly approves an exception.

1. Never delete this project, major directories, existing features, or large groups of files without explicit approval.
2. Never use destructive Git commands such as `git reset --hard`, `git clean`, force push, or history rewriting without explicit approval.
3. Git is our recovery system. Before substantial changes, check `git status` and understand the current working state.
4. Work on one logical feature or milestone at a time. Do not make unrelated changes.
5. Never overwrite working functionality simply to solve a smaller problem.
6. Never commit `.env` files, API keys, passwords, tokens, Supabase secrets, Stripe secrets, Cloudflare/Vercel tokens, or other credentials.
7. This application uses Next.js (App Router), TypeScript, and Tailwind, deployed on Vercel with DNS managed through Cloudflare. Do not replace the core stack without explicit approval.
8. Supabase will be the primary backend, database, authentication, and storage platform unless explicitly approved otherwise.
9. All Supabase tables must have Row Level Security (RLS) enabled before they hold real user data. Never rely on client-side checks alone for data access control.
10. Use separate Supabase and Stripe environments for development and production. Never test against production data or process test transactions through live payment credentials.
11. Never store raw payment card data. All payment processing goes through Stripe (or another explicitly approved processor) using their official SDKs — no custom card handling.
12. Before changing database schemas, authentication architecture, routing/subdomain architecture (e.g. the admin.imowit.com split), or other major architecture, explain the proposed change and get approval.
13. When this file requires "explicit approval," stop, describe the proposed change in plain language, and wait for a direct yes before proceeding. Do not proceed on silence, ambiguity, or assumed approval.
14. After implementing a feature, run appropriate TypeScript/build/lint checks before considering it complete.
15. Do not proceed to another major feature while the current feature has known errors.
16. Keep changes incremental and easy to review and revert.
17. Do not install unnecessary packages. Explain significant new dependencies before adding them.
18. Preserve Git history. Make a Git commit after every approved milestone, before starting the next one — not just at the end of a session.
19. Any approved destructive or significant action (schema change, dependency removal, file deletion) should be noted in the commit message explaining why it was done.
20. If an instruction could cause data loss or significant destruction, stop and ask first.
21. Do not modify the separate iMowiT mobile app. This repository is for the iMowiT marketing website and its admin dashboard (served at admin.imowit.com).
22. Keep the public marketing site and the admin dashboard cleanly separated by hostname routing, so admin work never risks marketing-site behavior.
23. Prioritize maintainable production-quality architecture that can eventually support thousands of customers, subcontractors, and administrators.
