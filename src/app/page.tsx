import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { ResponsiveImage, getImageMeta } from "@/components/ui/responsive-image";
import { buildMetadata } from "@/lib/seo";
import { getGoogleReviewsData } from "@/lib/google-reviews";
import { GymGallery } from "@/components/home/gym-gallery";
import { GoogleReviewsSection } from "@/components/home/google-reviews-section";
import { businessFacts, faqGroups, homeContent, mediaAssets } from "@/content/site-content";

export const metadata = buildMetadata(
  "24/7 Gym + Fitness & Wellness Studio in Sabie",
  "Commando offers 24/7 gym access plus appointment-based fitness and wellness services in Sabie.",
  "/"
);

const HERO_SIZES = "(min-width: 768px) 640px, 100vw";

export default async function HomePage() {
  const googleReviewsData = await getGoogleReviewsData();

  const hero = getImageMeta(mediaAssets.hero.name);
  const heroLargest = hero.widths[hero.widths.length - 1];
  const heroSrcSet = hero.widths.map((w) => `/img/${mediaAssets.hero.name}-${w}.webp ${w}w`).join(", ");

  const localBusinessLd = {
    "@context": "https://schema.org",
    "@type": "SportsActivityLocation",
    name: "Commando",
    address: businessFacts.address,
    telephone: businessFacts.phone,
    url: "https://www.commandoonline.co.za",
    areaServed: "Sabie",
    priceRange: "R50-R850"
  };

  return (
    <>
      {/* Preload the LCP hero image at high priority. */}
      <link
        rel="preload"
        as="image"
        href={`/img/${mediaAssets.hero.name}-${heroLargest}.webp`}
        imageSrcSet={heroSrcSet}
        imageSizes={HERO_SIZES}
        fetchPriority="high"
      />

      {/* HERO — single shared image, distinct mobile (editorial) and desktop (split) layouts. */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="mx-auto grid max-w-[90rem] gap-6 px-4 pb-8 pt-6 md:grid-cols-2 md:items-center md:gap-12 md:px-6 md:py-24">
          {/* Desktop text column */}
          <div className="hidden md:order-1 md:block">
            <Reveal>
              <p className="eyebrow mb-5">24/7 Gym &amp; Wellness · Sabie</p>
              <h1 className="font-display text-6xl font-bold leading-[0.98] tracking-tight xl:text-7xl">
                {homeContent.hero.headline}
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-8 text-zinc-300">{homeContent.hero.subheadline}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button href={homeContent.hero.primaryCta.href}>{homeContent.hero.primaryCta.label}</Button>
                <Button href={homeContent.hero.secondaryCta.href} variant="secondary">
                  {homeContent.hero.secondaryCta.label}
                </Button>
              </div>
              <dl className="mt-10 flex flex-wrap gap-x-10 gap-y-4">
                {businessFacts.socialProof.map((item) => (
                  <div key={item.label}>
                    <dt className="font-display text-2xl font-bold">{item.value}</dt>
                    <dd className="text-sm text-zinc-400">{item.label}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>

          {/* Image card (rendered once for both breakpoints) */}
          <Reveal className="md:order-2" delay={120}>
            <SpotlightCard className="overflow-hidden rounded-[1.75rem] md:rounded-3xl">
              <div className="relative">
                <ResponsiveImage
                  name={mediaAssets.hero.name}
                  alt={mediaAssets.hero.alt}
                  sizes={HERO_SIZES}
                  priority
                  className="h-[64vh] min-h-[26rem] w-full object-cover md:h-[34rem] md:min-h-0"
                />
                {/* Mobile-only overlaid editorial headline */}
                <div className="absolute inset-0 flex flex-col justify-between bg-gradient-to-t from-black/85 via-black/15 to-black/35 p-5 md:hidden">
                  <span className="inline-flex w-fit rounded-full border border-white/25 bg-black/50 px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-zinc-100 backdrop-blur">
                    24/7 Gym &amp; Wellness · Sabie
                  </span>
                  <div>
                    <h1 className="font-display text-4xl font-bold leading-[1.02] tracking-tight">
                      {homeContent.hero.headline}
                    </h1>
                  </div>
                </div>
                {/* Desktop floating stat panel */}
                <div className="absolute inset-x-4 bottom-4 hidden gap-3 rounded-2xl border border-white/15 bg-black/70 p-4 backdrop-blur md:grid">
                  <p className="text-sm text-zinc-200">
                    Sports massage · Swedish massage · Hot stone · Waxing &amp; recovery
                  </p>
                </div>
              </div>
            </SpotlightCard>
          </Reveal>

          {/* Mobile-only supporting copy + stat chips */}
          <div className="md:hidden">
            <p className="mobile-copy">{homeContent.hero.subheadline}</p>
            <div className="mt-4 grid grid-cols-2 gap-3">
              {businessFacts.socialProof.map((item) => (
                <div key={item.label} className="mobile-card-compact border-border">
                  <p className="font-display text-base font-bold leading-tight">{item.value}</p>
                  <p className="mt-1 text-xs text-zinc-400">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Section eyebrow="Why Commando" title={homeContent.motivation.title} subtitle={homeContent.motivation.body}>
        <div className="grid gap-5 md:grid-cols-3">
          {mediaAssets.highlights.map((item, index) => (
            <Reveal key={item.title} delay={index * 90}>
              <SpotlightCard as="article" className="h-full overflow-hidden">
                <ResponsiveImage
                  name={item.name}
                  alt={item.alt}
                  sizes="(min-width: 768px) 30vw, 100vw"
                  className="h-48 w-full rounded-t-2xl object-cover"
                />
                <div className="p-5">
                  <h3 className="font-display text-lg font-bold md:text-xl">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-zinc-300">{item.body}</p>
                </div>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section
        eyebrow="The space"
        title="Gym gallery"
        subtitle="Take a look at the actual Commando training spaces and equipment."
      >
        <GymGallery images={mediaAssets.gallery} />
      </Section>

      <Section
        eyebrow="Recovery"
        title="Onsite Wellness Studio"
        subtitle="From massage and lymph drainage to waxing, wellness services are available by appointment."
      >
        <div className="grid gap-5 lg:grid-cols-[1.4fr_1fr]">
          <SpotlightCard className="overflow-hidden">
            <ResponsiveImage
              name={mediaAssets.wellness.name}
              alt={mediaAssets.wellness.alt}
              sizes="(min-width: 1024px) 55vw, 100vw"
              className="h-60 w-full rounded-2xl object-cover md:h-80"
            />
          </SpotlightCard>
          <SpotlightCard className="flex flex-col justify-center p-6 md:p-8">
            <p className="mobile-copy">
              Open 08:00 to 16:00, appointment only. Non-members can book, and gym members get 20% discount on health
              treatments.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Button href="/spa">View Wellness Pricing</Button>
              <Button href="/memberships" variant="secondary" className="hidden md:inline-flex">
                Join Commando
              </Button>
            </div>
          </SpotlightCard>
        </div>
      </Section>

      <Section eyebrow="Location" title="Find us in Sabie" subtitle={`Visit us at ${businessFacts.address}.`}>
        <SpotlightCard className="flex flex-col gap-4 p-5 md:flex-row md:items-center md:justify-between md:p-6">
          <p className="mobile-copy text-zinc-200">{businessFacts.address}</p>
          <Button href={businessFacts.mapLink} external>
            Get directions
          </Button>
        </SpotlightCard>
      </Section>

      <GoogleReviewsSection data={googleReviewsData} />

      <Section eyebrow="Good to know" title="FAQ preview" subtitle="Quick answers to top concerns.">
        <div className="grid gap-3 md:grid-cols-2">
          {faqGroups
            .flatMap((g) => g.items)
            .slice(0, 5)
            .map((item, index) => (
              <Reveal key={item.q} delay={index * 60}>
                <details className="spotlight-card group p-4">
                  <span aria-hidden className="spotlight-card__border" />
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-3 font-semibold">
                    {item.q}
                    <span className="text-zinc-500 transition-transform group-open:rotate-45">+</span>
                  </summary>
                  <p className="mt-2 text-sm text-zinc-300">{item.a}</p>
                </details>
              </Reveal>
            ))}
        </div>
      </Section>

      <Section
        eyebrow="Get started"
        title="Start where you are."
        subtitle="No contracts. No unnecessary barriers. Just a clear path to train and improve."
      >
        <div className="hidden flex-wrap items-center gap-3 md:flex">
          <Button href="/memberships">Join Now</Button>
          <Button href="/contact" variant="secondary">
            Contact the Team
          </Button>
          <Link
            href="/memberships"
            className="inline-flex min-h-11 items-center px-3 text-sm text-zinc-300 underline-offset-4 hover:text-white hover:underline"
          >
            Explore membership options
          </Link>
        </div>
        <div className="md:hidden">
          <Link href="/memberships" className="inline-flex min-h-10 items-center text-sm text-zinc-300 underline">
            Explore membership options
          </Link>
        </div>
      </Section>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessLd) }} />
    </>
  );
}
