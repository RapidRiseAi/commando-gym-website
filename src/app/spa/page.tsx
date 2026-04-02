import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { mediaAssets, wellnessStudio } from "@/content/site-content";
import { buildMetadata } from "@/lib/seo";
import { ProductInterestModal } from "@/components/forms/product-interest-modal";

export const metadata = buildMetadata("Onsite Wellness Studio", "Appointment-only wellness treatments in Sabie, including massage, facials, waxing, and more.", "/spa");

export default function SpaPage() {
  return (
    <Section title={wellnessStudio.title} subtitle={wellnessStudio.intro}>
      <div className="mb-6 overflow-hidden rounded-2xl border border-border">
        <Image src={mediaAssets.wellness.src} alt={mediaAssets.wellness.alt} width={1400} height={700} className="h-56 w-full object-cover md:h-72" />
      </div>

      <div className="mobile-card text-sm text-zinc-200 md:p-4 md:text-base">
        <p><strong>Hours:</strong> {wellnessStudio.hours}</p>
        <p><strong>Booking:</strong> {wellnessStudio.bookingLine}</p>
        <p><strong>Member benefit:</strong> {wellnessStudio.memberBenefit}</p>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {wellnessStudio.categories.map((category) => (
          <a
            key={category.name}
            href={`#${category.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
            className="rounded-full border border-border bg-surface px-3 py-1 text-xs text-zinc-300 hover:bg-zinc-900"
          >
            {category.name}
          </a>
        ))}
      </div>

      <div className="mt-6 space-y-5">
        {wellnessStudio.categories.map((category) => (
          <article id={category.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")} key={category.name} className="mobile-card scroll-mt-24 md:p-5">
            <h3 className="text-lg font-bold md:text-xl">{category.name}</h3>
            <div className="mt-3 space-y-2.5">
              {category.items.map((item) => (
                <div key={`${item.service}-${item.duration}-${item.price}`} className="mobile-card-compact">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <p className="font-semibold">{item.service}</p>
                      <ProductInterestModal
                        optionType="wellness"
                        selectedOption={`${category.name} - ${item.service}`}
                        triggerLabel="Choose this option"
                        triggerClassName="hidden min-h-8 rounded-lg px-3 py-1 text-xs md:inline-flex"
                      />
                    </div>
                    <p className="font-bold">{item.price}</p>
                  </div>
                  {item.duration && <p className="text-xs text-zinc-300 md:text-sm">{item.duration}</p>}
                  {item.note && <p className="text-xs text-zinc-400">{item.note}</p>}
                </div>
              ))}
            </div>
            <div className="mt-3 md:hidden">
              <ProductInterestModal optionType="wellness" selectedOption={category.name} triggerLabel={`Request ${category.name}`} triggerClassName="w-full" />
            </div>
          </article>
        ))}
      </div>

      <div className="mt-4 hidden flex-wrap gap-3 md:flex">
        <Button href="/contact">Book via WhatsApp</Button>
        <Button href="/join" variant="secondary">Join Commando</Button>
      </div>
    </Section>
  );
}
