import { Button } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import { businessFacts } from "@/content/site-content";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata("Contact & Location", "Contact Commando Gym Sabie, view map and operating details.", "/contact");

export default function ContactPage() {
  return (
    <Section title="Contact & Location" subtitle="Visit us in Sabie or reach out for a guided start.">
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-3 rounded-2xl border border-border bg-surface p-5 text-zinc-300">
          <p><strong>Address:</strong> {businessFacts.address}</p>
          <p><strong>Phone:</strong> {businessFacts.phone}</p>
          <p><strong>WhatsApp:</strong> {businessFacts.whatsapp}</p>
          <p><strong>Email:</strong> {businessFacts.email}</p>
          <p><strong>Hours:</strong> {businessFacts.hours}</p>
          <p><strong>Parking:</strong> [OWNER_CONFIRMATION_REQUIRED]</p>
        </div>
        <div className="rounded-2xl border border-border bg-surface p-5">
          <p className="mb-3 text-zinc-300">Map link:</p>
          <a className="underline" href={businessFacts.mapLink} target="_blank">Open map</a>
          <div className="mt-5 flex flex-wrap gap-3">
            <Button href="/join">Join now</Button>
            <Button href="#" variant="secondary">Call now</Button>
            <Button href="#" variant="secondary">WhatsApp now</Button>
          </div>
        </div>
      </div>
    </Section>
  );
}
