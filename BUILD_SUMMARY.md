# BUILD SUMMARY

## Architecture
- Next.js App Router with route-based pages in `src/app/*`.
- Reusable component system across `src/components/ui`, `src/components/layout`, `src/components/forms`, and `src/components/sections`.
- Centralized content in `src/content/site-content.ts` for copy, FAQs, memberships, rules, and business details.
- Shared utilities/validation/SEO in `src/lib/*`.

## Mobile/desktop strategy
- Mobile sticky CTA bar with bottom safe-area support.
- Mobile-friendly snap-scrolling plan cards and touch targets (`min-h-11`).
- Desktop multi-column layouts and richer hero composition.
- Sticky header + smooth anchor behavior + reduced-motion fallback.

## Conversion strategy
- Repeated CTAs at hero, mid-page sections, and final CTA blocks.
- Dedicated Join page with robust client+server validation.
- Beginner-friendly microcopy and low-friction form flow.
- FAQ search and quick escalation paths to Contact/Join.

## Unresolved items requiring owner confirmation
- Address, hours, and all direct contact details.
- Membership pricing and formal terms.
- Spa service catalog and package inclusions.
- Verified social proof numbers and testimonials.
- Turnstile/anti-spam production credentials and submission destination integration.
