import { Section } from "@/components/ui/section";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { ResponsiveImage } from "@/components/ui/responsive-image";
import { mediaAssets } from "@/content/site-content";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata("About", "Learn about Commando’s 24/7 training culture and onsite wellness support in Sabie.", "/about");

export default function AboutPage() {
  return (
    <Section heading="h1" eyebrow="Our story" title="About Commando" subtitle="A 24/7 gym and wellness space built for Sabie.">
      <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
        <SpotlightCard as="figure" className="order-1 overflow-hidden lg:order-2">
          <ResponsiveImage
            name={mediaAssets.aboutBuilding.name}
            alt={mediaAssets.aboutBuilding.alt}
            sizes="(min-width: 1024px) 40vw, 100vw"
            className="h-72 w-full object-cover md:h-80 lg:h-[26rem]"
          />
          <figcaption className="border-t border-white/10 px-4 py-3 text-sm text-zinc-300">
            Commando Gym building in Sabie. Your 24/7 training base and wellness support space.
          </figcaption>
        </SpotlightCard>

        <div className="order-2 space-y-4 text-zinc-300 lg:order-1">
          <p>
            Commando was built for people who refuse to quit on themselves. Whether you are taking your first step into fitness or returning
            after a long break, our mission is to give you a space where progress feels possible every single day.
          </p>
          <p>
            We are open 24/7 with secure access so your training can match your life, not the other way around. Early mornings, late nights,
            or in-between shifts, your routine has a home here.
          </p>
          <p>
            Our community is family-friendly, welcoming, and focused on growth. You will find people at different stages of their journey,
            all working toward one shared goal: becoming stronger in body, mind, and discipline.
          </p>
          <p>
            Beyond training, our Onsite Wellness Studio provides recovery and self-care support to help you stay consistent over time. From
            massage and treatment options to intentional recovery, we believe real results come from balancing effort with restoration.
          </p>
          <p className="font-display text-base font-semibold text-white md:text-lg">
            At Commando, we do not just build workouts. We build confidence, commitment, and a lifestyle you can sustain.
          </p>
        </div>
      </div>
    </Section>
  );
}
