import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { memberships } from "@/content/site-content";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata("Memberships & Pricing", "Flexible gym and spa membership options in Sabie.", "/memberships");

export default function MembershipsPage() {
  return (
    <Section title="Memberships & Pricing" subtitle="Choose your path. Upgrade as your goals evolve.">
      <div className="md:hidden">
        <div className="flex snap-x gap-4 overflow-x-auto pb-4">
          {memberships.map((plan) => (
            <article key={plan.name} className="min-w-[86%] snap-center rounded-2xl border border-border bg-surface p-5">
              <h3 className="text-2xl font-bold">{plan.name}</h3>
              <p className="text-zinc-400">{plan.price}</p>
              <p className="mt-2 text-sm text-zinc-300">{plan.description}</p>
              <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-zinc-300">{plan.includes.map((i) => <li key={i}>{i}</li>)}</ul>
              <p className="mt-2 text-xs text-zinc-400">{plan.spa}</p>
              <Button href="/join" className="mt-4 w-full">Choose Plan</Button>
            </article>
          ))}
        </div>
      </div>
      <div className="hidden gap-4 md:grid md:grid-cols-3">
        {memberships.map((plan) => (
          <article key={plan.name} className="rounded-2xl border border-border bg-surface p-6">
            <h3 className="text-2xl font-bold">{plan.name}</h3><p className="text-zinc-400">{plan.price}</p>
            <ul className="mt-3 space-y-2 text-sm text-zinc-300">{plan.includes.map((i) => <li key={i}>• {i}</li>)}</ul>
            <p className="mt-2 text-xs text-zinc-400">{plan.spa}</p>
            <Button href="/join" className="mt-4 w-full">Choose Plan</Button>
          </article>
        ))}
      </div>
    </Section>
  );
}
