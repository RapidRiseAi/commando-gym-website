import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata("Spa & Recovery", "Recovery services at Commando Gym Sabie for wellness and performance.", "/spa");

export default function SpaPage() {
  return (
    <Section title="Spa & Recovery" subtitle="Recover smarter so your training stays consistent.">
      <div className="grid gap-4 md:grid-cols-3">
        {["Athletes managing fatigue", "Busy professionals under stress", "Beginners handling soreness"].map((audience) => (
          <div key={audience} className="rounded-xl border border-border bg-surface p-4">{audience}</div>
        ))}
      </div>
      <div className="mt-6 rounded-xl border border-dashed border-border p-4 text-sm text-zinc-300">Treatment list and prices: [OWNER_CONFIRMATION_REQUIRED]</div>
      <div className="mt-4 flex gap-3"><Button href="/join">Join Gym + Spa Journey</Button><Button href="/contact" variant="secondary">Ask About Spa Access</Button></div>
    </Section>
  );
}
