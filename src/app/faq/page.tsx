import { Section } from "@/components/ui/section";
import { FaqSearch } from "@/components/sections/faq-search";
import { faqGroups } from "@/content/site-content";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata("FAQ", "Frequently asked questions for Commando gym access and Wellness Studio services.", "/faq");

export default function FaqPage() {
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqGroups.flatMap((group) => group.items).map((item) => ({ "@type": "Question", name: item.q, acceptedAnswer: { "@type": "Answer", text: item.a } }))
  };

  return (
    <Section title="Frequently Asked Questions" subtitle="Search common concerns and get quick clarity.">
      <FaqSearch />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
    </Section>
  );
}
