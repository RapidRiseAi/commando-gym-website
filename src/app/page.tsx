import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import { buildMetadata } from "@/lib/seo";
import { businessFacts, faqGroups, homeContent, mediaAssets, testimonials } from "@/content/site-content";

export const metadata = buildMetadata(
  "24/7 Gym & Onsite Wellness Studio in Sabie",
  "Commando offers 24/7 gym access in Sabie plus an appointment-only Onsite Wellness Studio.",
  "/"
);

export default function HomePage() {
  const localBusinessLd = {
    "@context": "https://schema.org",
    "@type": "SportsActivityLocation",
    name: "Commando",
    address: businessFacts.address,
    telephone: businessFacts.phone,
    url: "https://www.commandogym.co.za",
    areaServed: "Sabie",
    priceRange: "R50-R850"
  };

  return (
    <>
      <section className="border-b border-border bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.14),transparent_45%)]">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-16 md:grid-cols-2 md:px-6 md:py-24">
          <div>
            <p className="mb-3 text-xs uppercase tracking-[0.2em] text-zinc-400">Gym + Wellness Studio in Sabie</p>
            <h1 className="text-4xl font-black leading-tight md:text-6xl">{homeContent.hero.headline}</h1>
            <p className="mt-4 max-w-xl text-zinc-300">{homeContent.hero.subheadline}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button href={homeContent.hero.primaryCta.href}>{homeContent.hero.primaryCta.label}</Button>
              <Button href={homeContent.hero.secondaryCta.href} variant="secondary">{homeContent.hero.secondaryCta.label}</Button>
            </div>
          </div>
          <div className="relative">
            <div className="overflow-hidden rounded-3xl border border-border shadow-glow">
              <Image
                src={mediaAssets.hero.src}
                alt={mediaAssets.hero.alt}
                width={1200}
                height={900}
                className="h-full w-full object-cover"
                priority
              />
            </div>
            <div className="absolute inset-x-4 bottom-4 grid gap-3 rounded-2xl border border-white/20 bg-black/60 p-4 backdrop-blur">
              {businessFacts.socialProof.map((item) => (
                <div key={item.label}>
                  <p className="text-2xl font-bold">{item.value}</p>
                  <p className="text-sm text-zinc-300">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Section title={homeContent.motivation.title} subtitle={homeContent.motivation.body}>
        <div className="grid gap-4 md:grid-cols-3">
          {mediaAssets.highlights.map((item) => (
            <article key={item.title} className="overflow-hidden rounded-2xl border border-border bg-surface">
              <Image src={item.src} alt={item.alt} width={900} height={650} className="h-44 w-full object-cover" />
              <div className="p-5">
                <h3 className="text-lg font-bold">{item.title}</h3>
                <p className="mt-2 text-sm text-zinc-300">{item.body}</p>
              </div>
            </article>
          ))}
        </div>
      </Section>

      <Section title="Onsite Wellness Studio" subtitle="From massage and lymph drainage to facials and waxing, wellness services are available by appointment.">
        <div className="rounded-2xl border border-border bg-surface p-6">
          <p className="text-zinc-300">Open 08:00–16:00, appointment only. Non-members can book, and gym members get 20% discount on health treatments.</p>
          <div className="mt-4 flex gap-3"><Button href="/spa">View Wellness Pricing</Button><Button href="/join" variant="secondary">Join Commando</Button></div>
        </div>
      </Section>

      <Section title="Real member momentum" subtitle="Built around consistency, support, and local community progress.">
        <div className="grid gap-4 md:grid-cols-3">
          {testimonials.map((item) => (
            <article key={item.quote} className="rounded-2xl border border-border bg-surface p-5">
              <p className="text-zinc-200">“{item.quote}”</p>
              <p className="mt-4 text-sm font-semibold">{item.name}</p>
              <p className="text-xs text-zinc-400">{item.context}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section title="FAQ preview" subtitle="Quick answers to top concerns.">
        <div className="grid gap-3 md:grid-cols-2">
          {faqGroups.flatMap((g) => g.items).slice(0, 5).map((item) => (
            <details key={item.q} className="rounded-xl border border-border bg-surface p-4">
              <summary className="cursor-pointer font-semibold">{item.q}</summary>
              <p className="mt-2 text-sm text-zinc-300">{item.a}</p>
            </details>
          ))}
        </div>
      </Section>

      <Section title="Start where you are." subtitle="No contracts. No unnecessary barriers. Just a clear path to train and improve.">
        <div className="flex flex-wrap gap-3">
          <Button href="/join">Join Now</Button>
          <Button href="/contact" variant="secondary">Contact the Team</Button>
          <Link href="/memberships" className="inline-flex min-h-11 items-center px-3 text-zinc-300 underline">Explore membership options</Link>
        </div>
      </Section>
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessLd) }} />
    </>
  );
}
