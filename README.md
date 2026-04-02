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
- CI command `npx wrangler versions upload` should now compile OpenNext output and upload the worker+assets bundle instead of returning 404.
- For Cloudflare/OpenNext builds, keep `autoprefixer` + `postcss` installed in `devDependencies` because `src/app/globals.css` is compiled through PostCSS during `next build`.

## Notes
- Business details and pricing in `src/content/site-content.ts` are configured for Commando in Sabie.
- See `RESEARCH_NOTES.md` and `BUILD_SUMMARY.md` for implementation context.
