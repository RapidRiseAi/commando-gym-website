import Link from "next/link";
import { Section } from "@/components/ui/section";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { GOOGLE_REVIEWS_FALLBACK } from "@/content/google-reviews-fallback";
import { GoogleReviewsData } from "@/lib/google-reviews";

const FALLBACK_GOOGLE_URL = "https://share.google/OnVMnLfG7aw2Ngj3z";

function ReviewStars({ value }: { value: number }) {
  const clampedValue = Math.max(0, Math.min(5, Math.round(value)));

  return (
    <div aria-label={`${clampedValue} out of 5 stars`} className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, index) => (
        <span key={index} aria-hidden="true" className={index < clampedValue ? "text-white" : "text-zinc-700"}>
          ★
        </span>
      ))}
    </div>
  );
}

function ReviewCard({
  authorName,
  reviewerMeta,
  rating,
  relativePublishTimeDescription,
  text
}: {
  authorName: string;
  reviewerMeta?: string;
  rating: number;
  relativePublishTimeDescription: string;
  text: string;
}) {
  return (
    <SpotlightCard as="article" className="flex h-full flex-col p-5">
      <p className="text-sm font-bold text-zinc-100">{authorName}</p>
      <p className="mt-1 text-xs text-zinc-400">{reviewerMeta ?? "Google review"}</p>
      <div className="mt-3 flex items-center justify-between gap-3">
        <ReviewStars value={rating} />
        <p className="text-xs text-zinc-400">{relativePublishTimeDescription}</p>
      </div>
      <p className="mt-3 text-sm leading-6 text-zinc-200">{text}</p>
    </SpotlightCard>
  );
}

export function GoogleReviewsSection({ data }: { data: GoogleReviewsData | null }) {
  const hasLiveReviews = Boolean(data?.reviews?.length);
  const reviews = hasLiveReviews ? data?.reviews ?? [] : GOOGLE_REVIEWS_FALLBACK;
  const firstThreeDesktopReviews = reviews.slice(0, 3);
  const remainingDesktopReviews = reviews.slice(3);

  const businessProfileUrl = process.env.GOOGLE_BUSINESS_PROFILE_URL;
  const seeMoreReviewsUrl = data?.googleMapsUri || businessProfileUrl || FALLBACK_GOOGLE_URL;
  const leaveReviewUrl = data?.writeReviewUri || businessProfileUrl || FALLBACK_GOOGLE_URL;

  const subtitle = data?.rating && data?.userRatingCount
    ? `${data.rating.toFixed(1)} average rating from ${data.userRatingCount} Google reviews.`
    : "Real feedback from Google reviews shared by Commando members and visitors.";

  return (
    <Section eyebrow="Reviews" title="Google reviews" subtitle={subtitle}>
      <div className="flex snap-x gap-4 overflow-x-auto pb-4 md:hidden">
        {reviews.map((review, index) => (
          <div key={`${review.authorName}-${index}`} className="min-w-[86%] snap-center">
            <ReviewCard {...review} />
          </div>
        ))}
      </div>

      <div className="hidden gap-4 md:grid md:grid-cols-3">
        {firstThreeDesktopReviews.map((review, index) => (
          <ReviewCard key={`${review.authorName}-${index}`} {...review} />
        ))}
      </div>

      {remainingDesktopReviews.length > 0 && (
        <details className="mt-4 hidden md:block group">
          <summary className="inline-flex cursor-pointer list-none items-center justify-center rounded-xl border border-border bg-surface px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-zinc-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70">
            <span className="group-open:hidden">See more</span>
            <span className="hidden group-open:inline">Show less</span>
          </summary>
          <div className="mt-4 grid gap-4 md:grid-cols-3">
            {remainingDesktopReviews.map((review, index) => (
              <ReviewCard key={`${review.authorName}-more-${index}`} {...review} />
            ))}
          </div>
        </details>
      )}

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
