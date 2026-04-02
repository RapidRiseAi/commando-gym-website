import { JoinForm } from "@/components/forms/join-form";
import { Section } from "@/components/ui/section";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata("Join Now", "Join Commando Gym Sabie with a guided onboarding process.", "/join");

export default function JoinPage() {
  return (
    <Section title="Join Commando Gym" subtitle="Take your first step. We’ll guide the rest.">
      <JoinForm />
    </Section>
  );
}
