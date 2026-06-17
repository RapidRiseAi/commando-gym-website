import Link from "next/link";
import { Section } from "@/components/ui/section";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { businessFacts } from "@/content/site-content";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata(
  "Privacy Policy",
  "How Commando collects, uses, and protects your personal information under South Africa's POPIA.",
  "/privacy"
);

const LAST_UPDATED = "17 June 2026";

export default function PrivacyPage() {
  return (
    <Section
      heading="h1"
      eyebrow="Your privacy"
      title="Privacy Policy"
      subtitle="This policy explains how Commando collects, uses, shares, and protects your personal information in line with South Africa's Protection of Personal Information Act, 2013 (POPIA)."
    >
      <SpotlightCard className="space-y-8 p-5 text-sm leading-7 text-zinc-300 md:p-8 md:text-base">
        <p className="text-xs uppercase tracking-[0.18em] text-zinc-500">Last updated: {LAST_UPDATED}</p>

        <section className="space-y-3">
          <h3 className="font-display text-lg font-bold text-white md:text-xl">1. Who we are (Responsible Party)</h3>
          <p>
            Commando (&ldquo;Commando&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;) operates a 24/7 gym and an onsite
            wellness studio at {businessFacts.address}. For the purposes of POPIA, Commando is the responsible party for
            the personal information processed through this website. The owner/manager of Commando acts as the
            Information Officer. You can reach us about any privacy matter on WhatsApp at {businessFacts.whatsapp}.
          </p>
        </section>

        <section className="space-y-3">
          <h3 className="font-display text-lg font-bold text-white md:text-xl">2. Personal information we collect</h3>
          <p>We only collect what you choose to submit through our website forms. Depending on the form, this includes:</p>
          <ul className="list-disc space-y-1 pl-5">
            <li>Your name.</li>
            <li>Your contact details (phone or WhatsApp number, and email address where provided).</li>
            <li>Your preferred contact method and, for bookings, a preferred date.</li>
            <li>Membership or wellness service preferences, fitness goal, and fitness level.</li>
            <li>Any message or notes you add, and your consent selection.</li>
            <li>Basic technical submission metadata (such as the date and time of submission).</li>
          </ul>
          <p>
            We do not run advertising or analytics trackers on this site, and we do not use non-essential cookies to
            profile you.
          </p>
        </section>

        <section className="space-y-3">
          <h3 className="font-display text-lg font-bold text-white md:text-xl">3. Why we process it, and our lawful basis</h3>
          <ul className="list-disc space-y-1 pl-5">
            <li>To respond to your enquiry and contact you on your preferred channel (based on your consent).</li>
            <li>To assist with a membership or wellness booking you request (to take steps toward a contract with you).</li>
            <li>To keep a basic record of requests so we can follow up and provide support (our legitimate interest).</li>
          </ul>
          <p>
            We do not sell your personal information, and we do not use it for unrelated marketing without your consent.
          </p>
        </section>

        <section className="space-y-3">
          <h3 className="font-display text-lg font-bold text-white md:text-xl">4. Who we share it with (Operators)</h3>
          <p>Your information is handled only by authorised Commando staff and the service providers that help us run the site and respond to you:</p>
          <ul className="list-disc space-y-1 pl-5">
            <li>Our website hosting and content delivery provider (Cloudflare), which serves this site.</li>
            <li>
              Our form and booking routing provider (Google Workspace, via Google Apps Script), which receives form
              submissions so our team can action them.
            </li>
            <li>WhatsApp (Meta) if you choose to contact us, or ask us to contact you, on WhatsApp.</li>
          </ul>
          <p>
            These providers process information on our behalf as operators and are required to keep it secure. Some of
            them may store or process information outside South Africa. Where that happens, we rely on the provider
            offering protection comparable to POPIA, as permitted under section 72 of POPIA.
          </p>
        </section>

        <section className="space-y-3">
          <h3 className="font-display text-lg font-bold text-white md:text-xl">5. How long we keep it</h3>
          <p>
            We keep enquiry and booking information only for as long as needed to respond to you and to maintain a
            reasonable business record, after which it is deleted or anonymised. You may ask us to delete your
            information sooner (see your rights below).
          </p>
        </section>

        <section className="space-y-3">
          <h3 className="font-display text-lg font-bold text-white md:text-xl">6. How we protect it</h3>
          <p>
            The site is served over HTTPS, and submissions are transmitted to our routing provider over encrypted
            connections. We limit access to authorised staff and apply reasonable technical and organisational
            safeguards. No method of transmission or storage is perfectly secure, but we take reasonable steps to
            protect your information.
          </p>
        </section>

        <section className="space-y-3">
          <h3 className="font-display text-lg font-bold text-white md:text-xl">7. Children</h3>
          <p>
            People under 18 may only join or be processed with the consent of a parent or legal guardian. Please do not
            submit a minor&rsquo;s details without that approval.
          </p>
        </section>

        <section className="space-y-3">
          <h3 className="font-display text-lg font-bold text-white md:text-xl">8. Your rights under POPIA</h3>
          <p>Subject to POPIA, you have the right to:</p>
          <ul className="list-disc space-y-1 pl-5">
            <li>Ask what personal information we hold about you and request access to it.</li>
            <li>Ask us to correct or update inaccurate information.</li>
            <li>Ask us to delete or destroy your information where we no longer have a lawful reason to keep it.</li>
            <li>Withdraw your consent at any time (this will not affect processing already carried out).</li>
            <li>Object to processing in certain circumstances.</li>
            <li>Lodge a complaint with the Information Regulator.</li>
          </ul>
          <p>To exercise any of these rights, contact us on WhatsApp at {businessFacts.whatsapp}.</p>
        </section>

        <section className="space-y-3">
          <h3 className="font-display text-lg font-bold text-white md:text-xl">9. Contact and complaints</h3>
          <p>
            For any privacy request, contact Commando on WhatsApp at {businessFacts.whatsapp}. If you are not satisfied
            with our response, you may contact the Information Regulator (South Africa):
          </p>
          <ul className="list-disc space-y-1 pl-5">
            <li>Website: inforegulator.org.za</li>
            <li>Email: enquiries@inforegulator.org.za (general) or POPIAComplaints@inforegulator.org.za (complaints)</li>
          </ul>
        </section>

        <p className="text-sm text-zinc-400">
          See also our{" "}
          <Link href="/terms" className="text-white underline underline-offset-4">
            Terms &amp; Waiver
          </Link>{" "}
          and{" "}
          <Link href="/media-policy" className="text-white underline underline-offset-4">
            Media Policy
          </Link>
          .
        </p>
      </SpotlightCard>
    </Section>
  );
}
