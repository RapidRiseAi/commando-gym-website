export type GoogleReview = {
  authorName: string;
  reviewerMeta?: string;
  rating: number;
  relativePublishTimeDescription: string;
  text: string;
};

export type GoogleReviewsData = {
  rating?: number;
  userRatingCount?: number;
  googleMapsUri?: string;
  writeReviewUri?: string;
  reviews?: GoogleReview[];
};

type PlaceDetailsResponse = {
  rating?: number;
  userRatingCount?: number;
  googleMapsUri?: string;
  reviews?: Array<{
    rating?: number;
    relativePublishTimeDescription?: string;
    text?: { text?: string };
    originalText?: { text?: string };
    authorAttribution?: {
      displayName?: string;
      uri?: string;
    };
  }>;
};

const PLACES_FIELDS = "rating,userRatingCount,googleMapsUri,reviews";

export async function getGoogleReviewsData(): Promise<GoogleReviewsData | null> {
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;

  if (!apiKey || !placeId) {
    return null;
  }

  try {
    const response = await fetch(`https://places.googleapis.com/v1/places/${placeId}`, {
      headers: {
        "X-Goog-Api-Key": apiKey,
        "X-Goog-FieldMask": PLACES_FIELDS
      },
      cache: "no-store"
    });

    if (!response.ok) {
      return null;
    }

    const payload = (await response.json()) as PlaceDetailsResponse;

    return {
      rating: payload.rating,
      userRatingCount: payload.userRatingCount,
      googleMapsUri: payload.googleMapsUri,
      writeReviewUri: placeId ? `https://search.google.com/local/writereview?placeid=${placeId}` : undefined,
      reviews: payload.reviews?.map((review) => ({
        authorName: review.authorAttribution?.displayName ?? "Google user",
        rating: review.rating ?? 5,
        relativePublishTimeDescription: review.relativePublishTimeDescription ?? "",
        text: review.text?.text ?? review.originalText?.text ?? "",
        reviewerMeta: undefined
      }))
    };
  } catch {
    return null;
  }
}
