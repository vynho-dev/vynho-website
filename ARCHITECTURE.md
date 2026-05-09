# Architecture

## Layers
- `src/app`: app bootstrap, router composition, global providers.
- `src/pages`: route-level page composition only.
- `src/components`: reusable UI/page sections.
- `src/lib`: pure helpers, hooks, shared logic (no UI imports).
- `src/content`: static data/content maps.
- `src/styles`: CSS modules and ownership-based style files.

Dependency direction:
- `app -> pages -> components -> lib/content`
- `lib` must not import from `components/pages/app`.

## Style ownership
- `globals.css`: foundation/base + imports.
- `home.css`: `.vh-*`
- `work.css`: `.vwk-*`
- `services.css`: `.vsv-*`
- `about.css`: `.vabt-*`
- `contact.css`: `.vct-*`
- `compat.css`: temporary mixed legacy overrides for non-home pages only; avoid adding new rules.

Migration rule:
- If a rule targets a single page prefix, move it out of `compat.css` into that page stylesheet.
- If a rule is cross-page and stable, promote it into a neutral shared pattern/style file.

## Engineering constraints
- Keep components focused and side-effect minimal.
- Prefer explicit typed props and small data contracts.
- Keep async/side-effect logic near page or dedicated hooks in `lib`.
