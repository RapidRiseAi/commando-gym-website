import { Section } from "@/components/ui/section";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata("Terms & Waiver", "Read Commando terms, participation waiver, and member responsibilities.", "/terms");

export default function TermsPage() {
  return (
    <Section heading="h1" eyebrow="The fine print" title="Terms & Waiver" subtitle="Please read these terms before using Commando facilities and services.">
      <SpotlightCard className="space-y-4 p-5 text-zinc-300 md:p-8">
        <p>
          All training and use of Commando facilities and services are undertaken at the member’s or visitor’s own risk.
          Commando, its owners, staff, and representatives are not liable for injuries, loss, or damages arising from
          participation in gym or wellness activities.
        </p>
        <ul className="list-disc space-y-1 pl-5 text-sm md:text-base">
          <li>Under 18s require parental or legal guardian approval.</li>
          <li>Members must follow safety, hygiene, and conduct rules at all times.</li>
          <li>Wellness services are appointment-based and subject to availability.</li>
        </ul>
      </SpotlightCard>
    </Section>
  );
}
