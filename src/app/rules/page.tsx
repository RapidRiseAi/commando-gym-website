import Link from "next/link";
import { Section } from "@/components/ui/section";
import { ruleGroups } from "@/content/site-content";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata("Gym Rules", "Community and safety rules for Commando Gym Sabie.", "/rules");

export default function RulesPage() {
  return (
    <Section title="Gym Rules" subtitle="Why these rules matter: they protect safety, respect, and progress for everyone.">
      <div className="grid gap-4 md:grid-cols-2">
        {ruleGroups.map((group) => (
          <article key={group.title} className="rounded-2xl border border-border bg-surface p-5">
            <h3 className="text-lg font-semibold">{group.title}</h3>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-zinc-300">
              {group.rules.map((rule) => <li key={rule}>{rule}</li>)}
            </ul>
          </article>
        ))}
      </div>
      <p className="mt-6 text-sm text-zinc-300">Questions about a rule? <Link href="/contact" className="underline">Contact the team</Link> or review <Link href="/faq" className="underline">FAQ</Link>.</p>
    </Section>
  );
}
