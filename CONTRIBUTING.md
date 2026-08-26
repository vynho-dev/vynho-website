# Contributing

## Workflow
1. Create a focused branch from `main` (`feat/…`, `fix/…`, `chore/…`, or `docs/…`).
2. Use small, imperative commits such as `feat(services): add an industry detail page`.
3. Open a pull request using the repository template; do not push directly to `main`.
4. Address all review comments and keep the branch current with `main` before merge.
5. Squash merge only after required checks and approval pass. Confirm the GitHub Pages deployment and the affected live route afterward.

Keep unrelated formatting, refactors, generated files, credentials, and personal editor configuration out of a PR.

## Quality gates
Run before merge:
1. `npm run typecheck`
2. `npm run lint`
3. `npm run test:run`
4. `npm run build`
5. `npm run perf:check`

## Code placement
- New route composition: `src/pages`.
- Shared UI: `src/components`.
- Shared logic/utilities: `src/lib`.
- Static content/config: `src/content`.

## Import boundaries
- `components` cannot import from `app` or `pages`.
- `lib` cannot import from `app`, `pages`, or `components`.
- `pages` should not import from other `pages`.

## TypeScript
- Keep strict typing; avoid `any`.
- Prefer narrowing over casting.
- Keep catch variables explicitly narrowed (`unknown` by default).

## CSS
- Add selectors in the owner file for that page prefix.
- Use tokens before hard-coded values.
- Treat `compat.css` as migration-only.

## Design consistency checklist
1. Reuse existing shared primitives in `src/components/patterns` before creating page-specific variants.
2. Keep section copy/cards/metrics in typed content maps under `src/content`.
3. Keep page classes prefix-scoped (`.vh-*`, `.vwk-*`, `.vsv-*`, `.vabt-*`, `.vct-*`).
4. Add new legacy bridge rules to `compat.css` only when blocking migration, then create a follow-up removal task.
5. Validate desktop + mobile layout and run quality gates before merge.

## Review expectations
- Include desktop and mobile screenshots or a short recording for UI changes.
- Check keyboard use, focus, contrast, text alternatives, and reduced-motion behavior when relevant.
- Call out any SEO, analytics, consent, privacy, or deployment impact in the pull request.
- Changes to GitHub workflows, deployment, dependency manifests, security policy, or contribution policy require repository-owner review.
