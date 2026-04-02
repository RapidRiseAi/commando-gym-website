import { Section } from "@/components/ui/section";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata("Privacy Policy", "How Commando handles submitted contact and booking information.", "/privacy");

export default function PrivacyPage() {
  return (
    <Section title="Privacy Policy" subtitle="We only collect the information needed to respond to your enquiry and assist your membership or booking request.">
      <div className="mobile-card space-y-4 text-zinc-300">
        <p>
          Commando collects contact and enquiry information you submit through our website forms so we can respond to
          your request and support membership or wellness bookings.
        </p>
        <p>
          We do not sell your personal information. Information is shared only with authorized staff and service providers
          used to manage enquiries and bookings.
        </p>
        <ul className="list-disc space-y-1 pl-5 text-sm md:text-base">
          <li>Used only for membership, booking, and support communication.</li>
          <li>Never sold to third parties.</li>
          <li>Handled by authorized staff and service providers only.</li>
        </ul>
        <p>For privacy-related requests, contact us via WhatsApp at +27 60 971 0050.</p>
      </div>
    </Section>
  );
}
