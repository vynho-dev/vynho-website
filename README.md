# vynho-website

Vynho company website built with React + Vite + Tailwind CSS.

## Stack

- React 19 + TypeScript
- Vite 6
- Tailwind CSS 3 + PostCSS
- shadcn/ui-ready setup

## Local development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Deployment

This repo is configured to deploy to GitHub Pages from `main` via:

- `.github/workflows/deploy.yml`

The custom domain is preserved through:

- `public/CNAME` (`vynho.com`)

Keep your GitHub Pages custom domain set to `vynho.com` in repository settings.

## Asset drop locations

Place brand/design assets here:

- `public/assets/brand` (wordmark, v-mark SVG/PNG exports)
- `public/assets/icons` (brand icon set)
- `public/assets/images` (website imagery)

Any files under `public/` are copied as-is to production.

Current canonical brand filenames:

- `public/assets/brand/wordmark-primary.svg`
- `public/assets/brand/wordmark-black.svg`
- `public/assets/brand/wordmark-white.svg`
- `public/assets/brand/wordmark-monochrome.svg`
- `public/assets/brand/wordmark-white-alt.svg`
- `public/assets/brand/wordmark-black-transparent.svg`
- `public/assets/brand/wordmark-white-transparent.svg`
- `public/assets/icons/vmark-black.svg`
- `public/assets/icons/vmark-white.svg`
- `public/assets/icons/vmark-monochrome.svg`
- `public/assets/icons/vmark-monochrome-white.svg`
- `public/assets/icons/vmark-gradient-black.svg`
- `public/assets/icons/vmark-gradient-white.svg`
- `public/assets/icons/vmark-transparent-black.svg`
- `public/assets/icons/vmark-transparent-white.svg`
