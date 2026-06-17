import Link from "next/link";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { ruleGroups } from "@/content/site-content";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata("Gym Rules", "Community, safety, minors, and media rules for Commando.", "/rules");

export default function RulesPage() {
  return (
    <Section heading="h1" eyebrow="House rules" title="Gym Rules" subtitle="Why these rules matter: they protect safety, respect, and progress for everyone.">
      <div className="grid gap-5 md:grid-cols-2">
        {ruleGroups.map((group, index) => (
          <Reveal key={group.title} delay={(index % 2) * 80}>
            <SpotlightCard as="article" className="h-full p-5 md:p-6">
              <h3 className="font-display text-lg font-semibold">{group.title}</h3>
              <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-zinc-300">
                {group.rules.map((rule) => (
                  <li key={rule}>{rule}</li>
                ))}
              </ul>
            </SpotlightCard>
          </Reveal>
        ))}
      </div>
      <p className="mt-7 text-sm text-zinc-300">
        Questions about a rule?{" "}
        <Link href="/contact" className="text-white underline underline-offset-4">
          Contact the team
        </Link>{" "}
        or review{" "}
        <Link href="/faq" className="text-white underline underline-offset-4">
          FAQ
        </Link>
        .
      </p>
    </Section>
  );
}
