import { Section } from "@/components/ui/section";
import Image from "next/image";
import { mediaAssets, memberships } from "@/content/site-content";
import { buildMetadata } from "@/lib/seo";
import { ProductInterestModal } from "@/components/forms/product-interest-modal";

export const metadata = buildMetadata("Memberships & Pricing", "Daily, weekly, monthly, couples, and student gym pricing in Sabie.", "/memberships");

export default function MembershipsPage() {
  return (
    <Section title="Memberships & Access Options" subtitle="Choose the option that fits your routine. Standard pricing is listed in South African Rand (R).">
      <div className="mb-6 overflow-hidden rounded-2xl border border-border">
        <Image src={mediaAssets.memberships.src} alt={mediaAssets.memberships.alt} width={1400} height={600} className="h-52 w-full object-cover md:h-64" />
      </div>

      <div className="md:hidden">
        <div className="flex snap-x gap-4 overflow-x-auto pb-4">
          {memberships.map((plan) => (
            <article key={plan.name} className="min-w-[86%] snap-center rounded-2xl border border-border bg-surface p-5">
              <h3 className="text-2xl font-bold">{plan.name}</h3>
              <p className="text-zinc-400">{plan.price}</p>
              <p className="mt-2 text-sm text-zinc-300">{plan.description}</p>
              <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-zinc-300">{plan.includes.map((i) => <li key={i}>{i}</li>)}</ul>
              <p className="mt-2 text-xs text-zinc-400">{plan.spa}</p>
              <div className="mt-4">
                <ProductInterestModal optionType="membership" selectedOption={plan.name} triggerLabel="Choose this option" />
              </div>
            </article>
          ))}
        </div>
      </div>
      <div className="hidden gap-4 md:grid md:grid-cols-3">
        {memberships.map((plan) => (
          <article key={plan.name} className="rounded-2xl border border-border bg-surface p-6">
            <h3 className="text-2xl font-bold">{plan.name}</h3><p className="text-zinc-400">{plan.price}</p>
            <ul className="mt-3 space-y-2 text-sm text-zinc-300">{plan.includes.map((i) => <li key={i}>• {i}</li>)}</ul>
            <p className="mt-2 text-xs text-zinc-400">{plan.spa}</p>
            <div className="mt-4">
              <ProductInterestModal optionType="membership" selectedOption={plan.name} triggerLabel="Choose this option" />
            </div>
          </article>
        ))}
      </div>
      <div className="mt-6 rounded-xl border border-border bg-surface p-4 text-sm text-zinc-300">
        No sign-up fee and no fixed contract on standard options. Need help choosing? Message us on WhatsApp via the Contact page.
      </div>
      <div className="mt-6 rounded-xl border border-border bg-surface p-4 md:hidden">
        <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-zinc-400">Who it&apos;s for</h3>
        <div className="mt-3 space-y-2 text-sm text-zinc-200">
          <div className="grid grid-cols-[1fr_auto] gap-3 rounded-lg border border-border/60 p-3"><p>Daily Pass</p><p className="font-semibold">R50</p><p className="col-span-2 text-xs text-zinc-400">Visitors / flexible access</p></div>
          <div className="grid grid-cols-[1fr_auto] gap-3 rounded-lg border border-border/60 p-3"><p>Weekly Pass</p><p className="font-semibold">R150</p><p className="col-span-2 text-xs text-zinc-400">Short stays / trial week</p></div>
          <div className="grid grid-cols-[1fr_auto] gap-3 rounded-lg border border-border/60 p-3"><p>Monthly Membership</p><p className="font-semibold">R350</p><p className="col-span-2 text-xs text-zinc-400">Most consistent option</p></div>
          <div className="grid grid-cols-[1fr_auto] gap-3 rounded-lg border border-border/60 p-3"><p>Couples Membership</p><p className="font-semibold">R550</p><p className="col-span-2 text-xs text-zinc-400">Training with a partner</p></div>
          <div className="grid grid-cols-[1fr_auto] gap-3 rounded-lg border border-border/60 p-3"><p>Student Membership</p><p className="font-semibold">R250</p><p className="col-span-2 text-xs text-zinc-400">Budget-friendly routine building</p></div>
        </div>
      </div>
      <div className="mt-6 hidden overflow-x-auto rounded-xl border border-border bg-surface p-4 md:block">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead>
            <tr className="text-zinc-400">
              <th className="pb-2">Plan</th>
              <th className="pb-2">Price</th>
              <th className="pb-2">Best For</th>
            </tr>
          </thead>
          <tbody className="text-zinc-200">
            <tr className="border-t border-border"><td className="py-2">Daily Pass</td><td>R50</td><td>Visitors / flexible access</td></tr>
            <tr className="border-t border-border"><td className="py-2">Weekly Pass</td><td>R150</td><td>Short stays / trial week</td></tr>
            <tr className="border-t border-border"><td className="py-2">Monthly Membership</td><td>R350</td><td>Most consistent option</td></tr>
            <tr className="border-t border-border"><td className="py-2">Couples Membership</td><td>R550</td><td>Training with a partner</td></tr>
            <tr className="border-t border-border"><td className="py-2">Student Membership</td><td>R250</td><td>Budget-friendly routine building</td></tr>
          </tbody>
        </table>
      </div>
    </Section>
  );
}
