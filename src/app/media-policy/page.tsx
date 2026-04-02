import { Section } from "@/components/ui/section";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata("Media Policy", "Photo and video policy for Commando members and visitors.", "/media-policy");

export default function MediaPolicyPage() {
  return (
    <Section title="Media Policy" subtitle="Photo and video use in the gym and wellness environment.">
      <div className="space-y-4 rounded-2xl border border-border bg-surface p-6 text-zinc-300">
        <p>
          By entering and using Commando facilities, members and visitors acknowledge that photos and videos may be
          captured by Commando for promotional and community purposes.
        </p>
        <p>
          Members may capture their own photos or videos, provided they do not interfere with safety, training flow,
          or the privacy and comfort of others.
        </p>
      </div>
    </Section>
  );
}
