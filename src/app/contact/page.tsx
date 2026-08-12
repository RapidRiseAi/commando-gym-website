import { Button } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { ContactForm } from "@/components/forms/contact-form";
import { businessFacts } from "@/content/site-content";
import { buildMetadata } from "@/lib/seo";
import { relocation } from "@/content/relocation";

export const metadata = buildMetadata("Contact", "Contact Commando in Sabie for gym access and wellness bookings.", "/contact");

export default function ContactPage() {
  const waLink = "https://wa.me/27609710050";
  const telLink = "tel:+27609710050";
  return (
    <Section heading="h1" eyebrow="Get in touch" title="Contact Commando" subtitle="Reach us directly on WhatsApp for memberships and wellness bookings.">
      <div className="grid gap-6 md:grid-cols-2">
        <SpotlightCard className="space-y-3 p-5 text-zinc-300 md:p-6">
          <div className="mb-5 rounded-xl border border-white/10 bg-white/[0.025] p-4">
            <div className="flex items-center justify-between gap-3"><p className="eyebrow">Current location</p><span className="rounded-full bg-white px-2.5 py-1 text-[0.65rem] font-bold uppercase tracking-wider text-black">Open now</span></div>
            <h2 className="mt-3 font-display text-xl font-bold text-white">Until {relocation.currentUntil}</h2>
            <p className="mt-1">{relocation.currentAddress}</p>
            <div className="mt-4"><Button href={businessFacts.mapLink} variant="secondary" external>Get directions</Button></div>
          </div>
          <div className="mb-5 rounded-xl border border-white/10 bg-black/20 p-4">
            <p className="eyebrow">New location</p>
            <h2 className="mt-3 font-display text-xl font-bold text-white">Opening {relocation.reopeningDate}</h2>
            <p className="mt-1">{relocation.newAddress}<br />{relocation.newLandmark}</p>
            <p className="mt-3 text-sm font-semibold text-white">We’re moving forward. Come experience the next chapter of Commando from 27 August.</p>
          </div>
          <p><strong className="font-display text-zinc-400">Phone:</strong> {businessFacts.phone}</p>
          <p><strong className="font-display text-zinc-400">WhatsApp:</strong> {businessFacts.whatsapp}</p>
          <p><strong className="font-display text-zinc-400">Email:</strong> {businessFacts.email}</p>
          <p><strong className="font-display text-zinc-400">Gym hours:</strong> {businessFacts.hours}</p>
          <p><strong className="font-display text-zinc-400">Wellness Studio:</strong> 08:00 to 16:00, appointment only.</p>
        </SpotlightCard>
        <SpotlightCard className="p-5 md:p-6">
          <p className="mb-3 text-zinc-300">Need help or want to get in touch?</p>
          <div className="mt-5 hidden flex-wrap gap-3 md:flex">
            <Button href={waLink} external>WhatsApp now</Button>
            <Button href={telLink} variant="secondary">Call now</Button>
          </div>
          <div className="mt-5 grid grid-cols-1 gap-2 md:hidden">
            <Button href={waLink} external>WhatsApp us directly</Button>
            <Button href={telLink} variant="secondary">Call the team</Button>
          </div>
          <p className="mt-4 text-sm text-zinc-300">
            If the online form fails to submit, contact Chantelle on WhatsApp and we will assist as soon as possible.
          </p>
        </SpotlightCard>
      </div>
      <div className="mt-6">
        <ContactForm />
      </div>
    </Section>
  );
}
