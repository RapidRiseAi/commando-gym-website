# Commando Gym Website (Sabie)

Production-grade Next.js website implementation for Commando Gym with gym + spa positioning, conversion-focused UX, and owner-editable content configs.

## Stack
- Next.js (App Router)
- React + TypeScript
- Tailwind CSS
- Zod validation

## Project structure
- `src/app/*`: routes, layout, API endpoints, sitemap/robots
- `src/components/*`: layout, UI primitives, sections, and form components
- `src/content/*`: centralized copy/facts/configured content
- `src/lib/*`: utility helpers, SEO metadata helpers, runtime config, validation

## Setup
```bash
npm install
npm run dev
```

## Environment variables
Create `.env.local`:
```bash
NEXT_PUBLIC_SITE_URL=https://www.commandogym.co.za
# Optional integration targets for /api/join wiring:
# JOIN_WEBHOOK_URL= # Google Apps Script or webhook endpoint for lead notifications
# PRODUCT_WEBHOOK_URL= # Optional dedicated webhook for membership/wellness option modal requests
```

## Commands
```bash
npm run dev      # local development
npm run lint     # lint checks
npm run build    # production build
npm run start    # run built app
```

## Deployment
- Works on Vercel or any Node runtime supporting Next.js App Router.
- Configure env vars in deployment platform.
- Cloudflare Workers deployment is configured with `@opennextjs/cloudflare`.
- `wrangler.jsonc` points to `.open-next/worker.js` and `.open-next/assets`, and runs `npx @opennextjs/cloudflare build` before upload.
- In Cloudflare build settings, set the deploy command to `npm run deploy` (or `npm run cf:deploy`) **instead of** `npx wrangler deploy`.
- For CI/Cloudflare, run build first, then deploy:
  - `npm run cf:build`
  - `npx wrangler deploy`
  - or one command: `npm run cf:deploy`
- If deploy logs show `Could not find compiled Open Next config`, it means deploy was triggered before OpenNext build completed.
- Why this can happen in production but not preview:
  - `npx wrangler deploy` can invoke `opennextjs-cloudflare deploy` directly, which expects OpenNext output to already exist.
  - Preview flows often run an explicit build step first, so the `.open-next` output is present.
- Hardening added in this repo:
  - Build is not forced in `postinstall`, preventing preview installs from failing during dependency installation.
  - Deploy scripts and Wrangler custom build both use the same OpenNext build command, so `.open-next/worker.js` is generated before upload.
- For Cloudflare/OpenNext builds, keep `autoprefixer` + `postcss` installed in `devDependencies` because `src/app/globals.css` is compiled through PostCSS during `next build`.

## Notes
- Business details and pricing in `src/content/site-content.ts` are configured for Commando in Sabie.
- Motivational visuals are configured via remote image URLs in content/code so PRs do not require binary image files.
- See `RESEARCH_NOTES.md` and `BUILD_SUMMARY.md` for implementation context.
