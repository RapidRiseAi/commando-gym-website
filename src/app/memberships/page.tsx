import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { ResponsiveImage } from "@/components/ui/responsive-image";
import { mediaAssets, memberships } from "@/content/site-content";
import { buildMetadata } from "@/lib/seo";
import { ProductInterestModal } from "@/components/forms/product-interest-modal";

export const metadata = buildMetadata("Memberships & Pricing", "Daily, weekly, monthly, couples, and student gym pricing in Sabie.", "/memberships");

export default function MembershipsPage() {
  return (
    <Section
      heading="h1"
      eyebrow="Pricing"
      title="Memberships & Access Options"
      subtitle="Choose the option that fits your routine. Standard pricing is listed in South African Rand (R)."
    >
      <div className="mb-8 overflow-hidden rounded-2xl border border-white/10">
        <ResponsiveImage
          name={mediaAssets.memberships.name}
          alt={mediaAssets.memberships.alt}
          sizes="(min-width: 1440px) 1408px, 100vw"
          className="h-52 w-full object-cover md:h-64"
        />
      </div>

      <div className="md:hidden">
        <div className="flex snap-x gap-4 overflow-x-auto pb-4">
          {memberships.map((plan) => (
            <SpotlightCard key={plan.name} as="article" className="min-w-[86%] snap-center p-5">
              <h3 className="font-display text-2xl font-bold">{plan.name}</h3>
              <p className="font-display text-xl text-zinc-400">{plan.price}</p>
              <p className="mobile-copy mt-2">{plan.description}</p>
              <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-zinc-300">
                {plan.includes.map((i) => (
                  <li key={i}>{i}</li>
                ))}
              </ul>
              <p className="mt-2 text-xs text-zinc-400">{plan.spa}</p>
              <div className="mt-4">
                <ProductInterestModal optionType="membership" selectedOption={plan.name} triggerLabel="Choose this option" />
              </div>
            </SpotlightCard>
          ))}
        </div>
      </div>

      <div className="hidden gap-5 md:grid md:grid-cols-3">
        {memberships.map((plan, index) => (
          <Reveal key={plan.name} delay={(index % 3) * 80}>
            <SpotlightCard as="article" className="flex h-full flex-col p-6">
              <div className="flex items-baseline justify-between gap-3">
                <h3 className="font-display text-2xl font-bold">{plan.name}</h3>
                <p className="font-display text-2xl font-bold text-white">{plan.price}</p>
              </div>
              <p className="mt-2 text-sm text-zinc-400">{plan.description}</p>
              <ul className="mt-4 space-y-2 text-sm text-zinc-300">
                {plan.includes.map((i) => (
                  <li key={i} className="flex gap-2">
                    <span aria-hidden className="text-white">
                      ✓
                    </span>
                    {i}
                  </li>
                ))}
              </ul>
              <p className="mt-3 text-xs text-zinc-400">{plan.spa}</p>
              <div className="mt-auto pt-5">
                <ProductInterestModal optionType="membership" selectedOption={plan.name} triggerLabel="Choose this option" />
              </div>
            </SpotlightCard>
          </Reveal>
        ))}
      </div>

      <div className="mt-8 rounded-2xl border border-white/10 bg-surface p-5 text-sm text-zinc-300 md:text-base">
        No sign-up fee and no fixed contract on standard options. Need help choosing? Message us on WhatsApp via the
        Contact page.
      </div>

      <div className="mt-6 md:hidden">
        <SpotlightCard className="p-5">
          <h3 className="font-display text-sm font-semibold uppercase tracking-[0.16em] text-zinc-400">Who it&apos;s for</h3>
          <div className="mt-3 space-y-2 text-sm text-zinc-200">
            <div className="grid grid-cols-[1fr_auto] gap-3 rounded-lg border border-white/10 p-3"><p>Daily Pass</p><p className="font-semibold">R50</p><p className="col-span-2 text-xs text-zinc-400">Visitors / flexible access</p></div>
            <div className="grid grid-cols-[1fr_auto] gap-3 rounded-lg border border-white/10 p-3"><p>Weekly Pass</p><p className="font-semibold">R150</p><p className="col-span-2 text-xs text-zinc-400">Short stays / trial week</p></div>
            <div className="grid grid-cols-[1fr_auto] gap-3 rounded-lg border border-white/10 p-3"><p>Monthly Membership</p><p className="font-semibold">R350</p><p className="col-span-2 text-xs text-zinc-400">Most consistent option</p></div>
            <div className="grid grid-cols-[1fr_auto] gap-3 rounded-lg border border-white/10 p-3"><p>Couples Membership</p><p className="font-semibold">R550</p><p className="col-span-2 text-xs text-zinc-400">Training with a partner</p></div>
            <div className="grid grid-cols-[1fr_auto] gap-3 rounded-lg border border-white/10 p-3"><p>Student Membership</p><p className="font-semibold">R250</p><p className="col-span-2 text-xs text-zinc-400">Budget-friendly routine building</p></div>
          </div>
        </SpotlightCard>
      </div>

      <div className="mt-6 hidden overflow-hidden rounded-2xl border border-white/10 bg-surface md:block">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-white/10 text-zinc-400">
              <th className="px-5 py-3 font-display uppercase tracking-wide">Plan</th>
              <th className="px-5 py-3 font-display uppercase tracking-wide">Price</th>
              <th className="px-5 py-3 font-display uppercase tracking-wide">Best For</th>
            </tr>
          </thead>
          <tbody className="text-zinc-200">
            <tr className="border-t border-white/5"><td className="px-5 py-3">Daily Pass</td><td className="px-5 py-3">R50</td><td className="px-5 py-3">Visitors / flexible access</td></tr>
            <tr className="border-t border-white/5"><td className="px-5 py-3">Weekly Pass</td><td className="px-5 py-3">R150</td><td className="px-5 py-3">Short stays / trial week</td></tr>
            <tr className="border-t border-white/5"><td className="px-5 py-3">Monthly Membership</td><td className="px-5 py-3">R350</td><td className="px-5 py-3">Most consistent option</td></tr>
            <tr className="border-t border-white/5"><td className="px-5 py-3">Couples Membership</td><td className="px-5 py-3">R550</td><td className="px-5 py-3">Training with a partner</td></tr>
            <tr className="border-t border-white/5"><td className="px-5 py-3">Student Membership</td><td className="px-5 py-3">R250</td><td className="px-5 py-3">Budget-friendly routine building</td></tr>
          </tbody>
        </table>
      </div>
    </Section>
  );
}
