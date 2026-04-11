import { Button } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import { ContactForm } from "@/components/forms/contact-form";
import { businessFacts } from "@/content/site-content";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata("Contact", "Contact Commando in Sabie for gym access and wellness bookings.", "/contact");

export default function ContactPage() {
  const waLink = "https://wa.me/27609710050";
  const telLink = "tel:+27609710050";
  return (
    <Section title="Contact Commando" subtitle="Reach us directly on WhatsApp for memberships and wellness bookings.">
      <div className="grid gap-6 md:grid-cols-2">
        <div className="mobile-card space-y-3 text-zinc-300 md:p-5">
          <p><strong>Address:</strong> {businessFacts.address}</p>
          <p><strong>Phone:</strong> {businessFacts.phone}</p>
          <p><strong>WhatsApp:</strong> {businessFacts.whatsapp}</p>
          <p><strong>Email:</strong> {businessFacts.email}</p>
          <p><strong>Gym hours:</strong> {businessFacts.hours}</p>
          <p><strong>Wellness Studio:</strong> 08:00–16:00, appointment only.</p>
        </div>
        <div className="mobile-card md:p-5">
          <p className="mb-3 text-zinc-300">Need help finding us?</p>
          <Button href={businessFacts.mapLink} variant="secondary">Get directions</Button>
          <div className="mt-5 hidden flex-wrap gap-3 md:flex">
            <Button href={waLink}>WhatsApp now</Button>
            <Button href={telLink} variant="secondary">Call now</Button>
          </div>
          <div className="mt-5 grid grid-cols-1 gap-2 md:hidden">
            <Button href={waLink}>WhatsApp us directly</Button>
            <Button href={telLink} variant="secondary">Call the team</Button>
            <Button href={businessFacts.mapLink} variant="secondary">Get directions</Button>
          </div>
          <p className="mt-4 text-sm text-zinc-300">
            If the online form fails to submit, contact Chantelle on WhatsApp and we will assist as soon as possible.
          </p>
        </div>
      </div>
      <div className="mt-6">
        <ContactForm />
      </div>
    </Section>
  );
}
