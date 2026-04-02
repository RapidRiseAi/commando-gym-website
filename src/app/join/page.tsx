import { JoinForm } from "@/components/forms/join-form";
import { Section } from "@/components/ui/section";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata("Join Now", "Join Commando with 24/7 access and a supportive start.", "/join");

export default function JoinPage() {
  return (
    <Section title="Join Commando" subtitle="Start your training journey with 24/7 access and a supportive environment.">
      <JoinForm />
    </Section>
  );
}
