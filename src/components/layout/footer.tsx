import Link from "next/link";
import { ResponsiveImage } from "@/components/ui/responsive-image";
import { businessFacts } from "@/content/site-content";

const legalLinks = [
  { href: "/faq", label: "FAQ" },
  { href: "/rules", label: "Rules" },
  { href: "/contact", label: "Contact" },
  { href: "/terms", label: "Terms" },
  { href: "/privacy", label: "Privacy" },
  { href: "/media-policy", label: "Media Policy" }
];

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black">
      <div className="mx-auto max-w-[90rem] px-4 py-10 md:px-6 md:py-12">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <Link href="/" className="inline-flex items-center" aria-label="Commando home">
              <ResponsiveImage
                name="commando-logo"
                alt="Commando gym logo"
                sizes="80px"
                blur={false}
                className="h-20 w-20 object-contain invert"
              />
            </Link>
            <p className="mt-3 text-sm leading-6 text-zinc-400">
              24/7 gym and onsite wellness studio in Sabie. Train with consistency, recover with purpose.
            </p>
          </div>
          <div className="grid gap-2 text-sm text-zinc-400">
            <p className="font-display text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">Visit</p>
            <p>{businessFacts.address}</p>
            <p>WhatsApp: {businessFacts.whatsapp}</p>
            <p>{businessFacts.hours}</p>
          </div>
          <nav className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm sm:grid-cols-3 md:grid-cols-2">
            {legalLinks.map((link) => (
              <Link key={link.href} href={link.href} className="text-zinc-400 underline-offset-4 hover:text-white hover:underline">
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="hairline my-8" />
        <p className="text-xs text-zinc-500">© {new Date().getFullYear()} Commando. All rights reserved.</p>
      </div>
    </footer>
  );
}
