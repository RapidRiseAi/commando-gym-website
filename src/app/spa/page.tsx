import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { wellnessStudio } from "@/content/site-content";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata("Onsite Wellness Studio", "Appointment-only wellness treatments in Sabie, including massage, facials, waxing, and more.", "/spa");

export default function SpaPage() {
  return (
    <Section title={wellnessStudio.title} subtitle={wellnessStudio.intro}>
      <div className="rounded-xl border border-border bg-surface p-4 text-sm text-zinc-200">
        <p><strong>Hours:</strong> {wellnessStudio.hours}</p>
        <p><strong>Booking:</strong> {wellnessStudio.bookingLine}</p>
        <p><strong>Member benefit:</strong> {wellnessStudio.memberBenefit}</p>
      </div>

      <div className="mt-6 space-y-5">
        {wellnessStudio.categories.map((category) => (
          <article key={category.name} className="rounded-2xl border border-border bg-surface p-5">
            <h3 className="text-xl font-bold">{category.name}</h3>
            <div className="mt-3 space-y-2">
              {category.items.map((item) => (
                <div key={`${item.service}-${item.duration}-${item.price}`} className="rounded-lg border border-border/70 p-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="font-semibold">{item.service}</p>
                    <p className="font-bold">{item.price}</p>
                  </div>
                  {item.duration && <p className="text-sm text-zinc-300">{item.duration}</p>}
                  {item.note && <p className="text-xs text-zinc-400">{item.note}</p>}
                </div>
              ))}
            </div>
          </article>
        ))}
      </div>

      <div className="mt-4 flex flex-wrap gap-3">
        <Button href="/contact">Book via WhatsApp</Button>
        <Button href="/join" variant="secondary">Join Commando</Button>
      </div>
    </Section>
  );
}
