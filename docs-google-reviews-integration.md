# Google Reviews integration plan (Commando Gym website)

This repo is a Next.js App Router project, so the safest production approach is:

1. Fetch Google reviews on the **server** through a Next.js API route.
2. Expose only the normalized fields your UI needs.
3. Render reviews in a server component (or fetch from client) using that internal API route.
4. Respect Google attribution and caching requirements.

## Recommended data source

Use **Google Places API (Place Details - New)** with your gym's `placeId`.

Why:
- It is designed for public place details on websites (ratings + reviews).
- You can request only specific fields using field masks.
- Attribution guidance is documented in Maps Platform docs.

Google Business Profile API (`accounts.locations.reviews`) is useful when you are building owner-management workflows (for example, review moderation/replies across owned locations), but for public website display, Places API is usually the simpler integration path.

## What to implement in this repo

### 1) Add environment variables

In `.env.local`:

```bash
# Server-only key (do not prefix with NEXT_PUBLIC_)
GOOGLE_MAPS_API_KEY=...
GOOGLE_PLACE_ID=...
# Optional: 6h cache for route responses
GOOGLE_REVIEWS_REVALIDATE_SECONDS=21600
```

### 2) Create internal API route

Create `src/app/api/google-reviews/route.ts`:

- Call Place Details (New):
  - `GET https://places.googleapis.com/v1/places/{PLACE_ID}`
- Headers:
  - `X-Goog-Api-Key: ...`
  - `X-Goog-FieldMask: rating,userRatingCount,reviews,googleMapsUri`
- Normalize output to a stable local type:
  - `rating`, `userRatingCount`, `googleMapsUri`
  - `reviews[]` with `author`, `rating`, `text`, `publishTime`, `relativePublishTimeDescription`
- Return JSON with a conservative fallback (`reviews: []`) if upstream data is missing.

### 3) Add cache policy

Use Next.js route-level caching:

- `export const revalidate = Number(process.env.GOOGLE_REVIEWS_REVALIDATE_SECONDS ?? 21600)`

This reduces API cost and keeps data reasonably fresh.

### 4) Render on the website

Add a `GoogleReviewsSection` component that calls `/api/google-reviews` and renders:

- Overall rating + count.
- Top 3–5 recent reviews.
- A "View all on Google" link to `googleMapsUri`.

### 5) Compliance items

- Keep required attribution visible when showing Google review content.
- Do not modify review text in misleading ways.
- Do not expose server API keys in client bundle.

## Suggested rollout sequence

1. Implement API route + normalization.
2. Verify with Postman/curl using production placeId.
3. Add UI section on home page.
4. Measure latency/error rate.
5. Add fallback UI for quota/temporary API failures.

## Operational guidance

- Start with 6-hour cache and adjust based on traffic + quota.
- Add lightweight logging around upstream response status.
- If rate limits become an issue, persist normalized reviews in your DB/edge cache on a schedule.

## References (official docs)

- Business Profile reviews resource: https://developers.google.com/my-business/reference/rest/v4/accounts.locations.reviews
- Business Profile review data guide: https://developers.google.com/my-business/content/review-data
- Places API Place Details (New): https://developers.google.com/maps/documentation/places/web-service/place-details
- Maps attribution/policies (includes reviews guidance): https://developers.google.com/maps/documentation/javascript/policies
