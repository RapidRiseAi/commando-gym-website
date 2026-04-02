import { Section } from "@/components/ui/section";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata("About", "Learn about Commando’s 24/7 training culture and onsite wellness support in Sabie.", "/about");

export default function AboutPage() {
  return (
    <Section title="About Commando" subtitle="A 24/7 gym and wellness space built for Sabie.">
      <div className="space-y-4 rounded-2xl border border-border bg-surface p-6 text-zinc-300">
        <p>Commando exists to make consistent training possible for everyone in Sabie.</p>
        <p>We are open 24/7 with secure access, and we keep the environment family-friendly, inspirational, welcoming, and focused on progress.</p>
        <p>Our Onsite Wellness Studio adds practical recovery and self-care support so members and visitors can feel and perform better over time.</p>
      </div>
    </Section>
  );
}
