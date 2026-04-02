import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import { buildMetadata } from "@/lib/seo";
import { businessFacts, faqGroups, homeContent } from "@/content/site-content";

export const metadata = buildMetadata(
  "Gym in Sabie | Train & Recover",
  "Commando Gym Sabie is a motivating gym and spa destination for beginners and committed athletes.",
  "/"
);

export default function HomePage() {
  const localBusinessLd = {
    "@context": "https://schema.org",
    "@type": "SportsActivityLocation",
    name: "Commando Gym (Sabie)",
    address: "[OWNER_CONFIRMATION_REQUIRED]",
    telephone: "[OWNER_CONFIRMATION_REQUIRED]",
    url: "https://www.commandogym.co.za",
    areaServed: "Sabie"
  };

  return (
    <>
      <section className="border-b border-border bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.14),transparent_45%)]">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-16 md:grid-cols-2 md:px-6 md:py-24">
          <div>
            <p className="mb-3 text-xs uppercase tracking-[0.2em] text-zinc-400">Gym + Spa in Sabie</p>
            <h1 className="text-4xl font-black leading-tight md:text-6xl">{homeContent.hero.headline}</h1>
            <p className="mt-4 max-w-xl text-zinc-300">{homeContent.hero.subheadline}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button href={homeContent.hero.primaryCta.href}>{homeContent.hero.primaryCta.label}</Button>
              <Button href={homeContent.hero.secondaryCta.href} variant="secondary">{homeContent.hero.secondaryCta.label}</Button>
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-3 md:grid-cols-1">
            {businessFacts.socialProof.map((item) => (
              <div key={item.label} className="rounded-2xl border border-border bg-surface p-4 shadow-glow">
                <p className="text-2xl font-bold">{item.value}</p>
                <p className="text-sm text-zinc-400">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Section title={homeContent.motivation.title} subtitle={homeContent.motivation.body}>
        <div className="grid gap-4 md:grid-cols-3">
          {["Strength with structure", "Support without judgment", "Recovery built in"].map((item) => (
            <article key={item} className="rounded-2xl border border-border bg-surface p-5">{item}</article>
          ))}
        </div>
      </Section>

      <Section title="Spa & recovery" subtitle="Pair your training with recovery so you can stay consistent, reduce stress, and feel better week after week.">
        <div className="rounded-2xl border border-border bg-surface p-6">
          <p className="text-zinc-300">Spa services and package details are available, with exact treatment list marked for owner confirmation.</p>
          <div className="mt-4 flex gap-3"><Button href="/spa">Explore Spa</Button><Button href="/join" variant="secondary">Join Gym + Spa Journey</Button></div>
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

      <Section title="Your next rep starts now." subtitle="No perfect moment required.">
        <div className="flex flex-wrap gap-3">
          <Button href="/join">Join Commando Gym</Button>
          <Button href="/contact" variant="secondary">Contact the Team</Button>
          <Link href="/memberships" className="inline-flex min-h-11 items-center px-3 text-zinc-300 underline">Explore membership options</Link>
        </div>
      </Section>
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessLd) }} />
    </>
  );
}
