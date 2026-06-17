import { Section } from "@/components/ui/section";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata("Media Policy", "Photo and video policy for Commando members and visitors.", "/media-policy");

export default function MediaPolicyPage() {
  return (
    <Section heading="h1" eyebrow="Photos & video" title="Media Policy" subtitle="Photo and video use in the gym and wellness environment.">
      <SpotlightCard className="space-y-4 p-5 text-zinc-300 md:p-8">
        <p>
          By entering and using Commando facilities, members and visitors acknowledge that photos and videos may be
          captured by Commando for promotional and community purposes.
        </p>
        <ul className="list-disc space-y-1 pl-5 text-sm md:text-base">
          <li>Personal media is allowed if it does not disrupt safety or training flow.</li>
          <li>Please respect other members’ comfort and privacy at all times.</li>
          <li>Ask staff if you are unsure whether filming is appropriate in a space.</li>
        </ul>
      </SpotlightCard>
    </Section>
  );
}
