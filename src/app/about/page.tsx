import { Section } from "@/components/ui/section";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata("About", "Learn about the Commando Gym Sabie training culture and mission.", "/about");

export default function AboutPage() {
  return (
    <Section title="Our Story" subtitle="Built for disciplined training, open to every starting point.">
      <div className="space-y-4 rounded-2xl border border-border bg-surface p-6 text-zinc-300">
        <p>Commando Gym serves Sabie with a no-excuses training mindset and a welcoming community culture.</p>
        <p>Founding history and timeline: [OWNER_CONFIRMATION_REQUIRED].</p>
      </div>
    </Section>
  );
}
