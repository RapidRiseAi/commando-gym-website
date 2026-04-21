import Link from "next/link";
import { Section } from "@/components/ui/section";
import { GOOGLE_REVIEWS_FALLBACK } from "@/content/google-reviews-fallback";
import { GoogleReviewsData } from "@/lib/google-reviews";

const FALLBACK_GOOGLE_URL = "https://share.google/OnVMnLfG7aw2Ngj3z";

function ReviewStars({ value }: { value: number }) {
  const clampedValue = Math.max(0, Math.min(5, Math.round(value)));

  return (
    <div aria-label={`${clampedValue} out of 5 stars`} className="flex items-center gap-0.5 text-yellow-400">
      {Array.from({ length: 5 }).map((_, index) => (
        <span key={index} aria-hidden="true" className={index < clampedValue ? "opacity-100" : "opacity-40"}>
          ★
        </span>
      ))}
    </div>
  );
}

export function GoogleReviewsSection({ data }: { data: GoogleReviewsData | null }) {
  const hasLiveReviews = Boolean(data?.reviews?.length);
  const reviews = hasLiveReviews ? data?.reviews ?? [] : GOOGLE_REVIEWS_FALLBACK;

  const businessProfileUrl = process.env.GOOGLE_BUSINESS_PROFILE_URL;
  const seeMoreReviewsUrl = data?.googleMapsUri || businessProfileUrl || FALLBACK_GOOGLE_URL;
  const leaveReviewUrl = data?.writeReviewUri || businessProfileUrl || FALLBACK_GOOGLE_URL;

  const subtitle = data?.rating && data?.userRatingCount
    ? `${data.rating.toFixed(1)} average rating from ${data.userRatingCount} Google reviews.`
    : "Real feedback from Google reviews shared by Commando members and visitors.";

  return (
    <Section title="Google reviews" subtitle={subtitle}>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {reviews.map((review, index) => (
          <article key={`${review.authorName}-${index}`} className="mobile-card flex h-full flex-col md:p-5">
            <p className="text-sm font-bold text-zinc-100">{review.authorName}</p>
            <p className="mt-1 text-xs text-zinc-400">{review.reviewerMeta ?? "Google review"}</p>
            <div className="mt-3 flex items-center justify-between gap-3">
              <ReviewStars value={review.rating} />
              <p className="text-xs text-zinc-400">{review.relativePublishTimeDescription}</p>
            </div>
            <p className="mt-3 text-sm text-zinc-200">{review.text}</p>
          </article>
        ))}
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <Link
          href={seeMoreReviewsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-10 items-center justify-center rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-black transition hover:bg-zinc-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 md:min-h-11 md:px-5 md:py-3"
        >
          See more reviews on Google
        </Link>
        <Link
          href={leaveReviewUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-10 items-center justify-center rounded-xl border border-border bg-surface px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-zinc-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 md:min-h-11 md:px-5 md:py-3"
        >
          Leave a review on Google
        </Link>
      </div>
    </Section>
  );
}
