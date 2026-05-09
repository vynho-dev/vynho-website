# Contributing

## Quality gates
Run before merge:
1. `npm run typecheck`
2. `npm run lint`
3. `npm run build`

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
