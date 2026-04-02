import { Section } from "@/components/ui/section";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata("Terms & Waiver", "Read Commando terms, participation waiver, and member responsibilities.", "/terms");

export default function TermsPage() {
  return (
    <Section title="Terms & Waiver" subtitle="Please read these terms before using Commando facilities and services.">
      <div className="space-y-4 rounded-2xl border border-border bg-surface p-6 text-zinc-300">
        <p>
          All training and use of Commando facilities and services are undertaken at the member’s or visitor’s own risk.
          Commando, its owners, staff, and representatives are not liable for injuries, loss, or damages arising from
          participation in gym or wellness activities.
        </p>
        <p>
          Any person under 18 may only join or use services with parental or legal guardian approval.
        </p>
        <p>
          Members are expected to follow posted safety, hygiene, and respectful conduct rules at all times.
        </p>
      </div>
    </Section>
  );
}
