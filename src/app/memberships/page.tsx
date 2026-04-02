import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { mediaAssets, memberships } from "@/content/site-content";
import { buildMetadata } from "@/lib/seo";

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
              <Button href="/join" className="mt-4 w-full">Join with this option</Button>
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
            <Button href="/join" className="mt-4 w-full">Join with this option</Button>
          </article>
        ))}
      </div>
      <div className="mt-6 rounded-xl border border-border bg-surface p-4 text-sm text-zinc-300">
        No sign-up fee and no fixed contract on standard options. Need help choosing? Message us on WhatsApp via the Contact page.
      </div>
      <div className="mt-6 overflow-x-auto rounded-xl border border-border bg-surface p-4">
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
