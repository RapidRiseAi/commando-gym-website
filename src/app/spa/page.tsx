import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { ResponsiveImage } from "@/components/ui/responsive-image";
import { mediaAssets, wellnessStudio } from "@/content/site-content";
import { buildMetadata } from "@/lib/seo";
import { ProductInterestModal } from "@/components/forms/product-interest-modal";

export const metadata = buildMetadata("Onsite Wellness Studio", "Appointment-only wellness treatments in Sabie, including massage, waxing, and recovery services.", "/spa");

export default function SpaPage() {
  return (
    <Section heading="h1" eyebrow="Recovery & self-care" title={wellnessStudio.title} subtitle={wellnessStudio.intro}>
      <div className="mb-6 overflow-hidden rounded-2xl border border-white/10">
        <ResponsiveImage
          name={mediaAssets.wellness.name}
          alt={mediaAssets.wellness.alt}
          sizes="(min-width: 1440px) 1408px, 100vw"
          className="h-56 w-full object-cover md:h-72"
        />
      </div>

      <SpotlightCard className="p-5 text-sm text-zinc-200 md:text-base">
        <div className="grid gap-2 md:grid-cols-3">
          <p><strong className="font-display text-zinc-400">Hours</strong><br />{wellnessStudio.hours}</p>
          <p><strong className="font-display text-zinc-400">Booking</strong><br />{wellnessStudio.bookingLine}</p>
          <p><strong className="font-display text-zinc-400">Member benefit</strong><br />{wellnessStudio.memberBenefit}</p>
        </div>
      </SpotlightCard>

      <div className="mt-5 flex flex-wrap gap-2">
        {wellnessStudio.categories.map((category) => (
          <a
            key={category.name}
            href={`#${category.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
            className="rounded-full border border-white/10 bg-surface px-3 py-1.5 text-xs text-zinc-300 transition hover:border-white/30 hover:text-white"
          >
            {category.name}
          </a>
        ))}
      </div>

      <div className="mt-6 space-y-5">
        {wellnessStudio.categories.map((category, index) => (
          <Reveal key={category.name} delay={(index % 3) * 60}>
            <SpotlightCard
              as="article"
              className="scroll-mt-24 p-5 md:p-6"
            >
              <span id={category.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")} className="absolute -top-24" aria-hidden />
              <h3 className="font-display text-lg font-bold md:text-xl">{category.name}</h3>
              <div className="mt-3 space-y-2.5">
                {category.items.map((item) => (
                  <div key={`${item.service}-${item.duration}-${item.price}`} className="rounded-xl border border-white/10 p-3 md:p-4">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <p className="font-semibold">{item.service}</p>
                        <ProductInterestModal
                          optionType="wellness"
                          selectedOption={`${category.name} · ${item.service}`}
                          triggerLabel="Choose this option"
                          triggerClassName="hidden min-h-8 rounded-lg px-3 py-1 text-xs md:inline-flex"
                        />
                      </div>
                      <p className="font-display font-bold">{item.price}</p>
                    </div>
                    {item.duration && <p className="text-xs text-zinc-300 md:text-sm">{item.duration}</p>}
                    {item.note && <p className="text-xs text-zinc-400">{item.note}</p>}
                  </div>
                ))}
              </div>
              <div className="mt-3 md:hidden">
                <ProductInterestModal
                  optionType="wellness"
                  selectedOption={category.name}
                  selectionOptions={category.items.map((item) => `${category.name} · ${item.service}${item.duration ? ` (${item.duration})` : ""} · ${item.price}`)}
                  triggerLabel={`Request ${category.name}`}
                  triggerClassName="w-full"
                />
              </div>
            </SpotlightCard>
          </Reveal>
        ))}
      </div>

      <div className="mt-6 hidden flex-wrap gap-3 md:flex">
        <Button href="/contact">Book via WhatsApp</Button>
        <Button href="/memberships" variant="secondary">Join Commando</Button>
      </div>
    </Section>
  );
}
