import Link from "next/link";
import { relocation } from "@/content/relocation";

export function RelocationBanner() {
  return (
    <aside className="relative z-[1001] border-b border-white/15 bg-white text-black" aria-label="Commando relocation announcement">
      <div className="mx-auto flex max-w-[90rem] flex-col items-center justify-center gap-1 px-4 py-2.5 text-center sm:flex-row sm:gap-3 md:px-6">
        <p className="text-xs leading-5 sm:text-sm">
          <strong className="font-display uppercase tracking-[0.12em]">{relocation.banner.lead}</strong>
          <span aria-hidden className="mx-1.5">—</span><span>{relocation.banner.message}</span>
        </p>
        <Link href={`/#${relocation.anchor}`} className="inline-flex min-h-8 shrink-0 items-center rounded-md px-2 text-xs font-bold uppercase tracking-[0.12em] underline decoration-black/40 underline-offset-4 transition hover:bg-black hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2">
          {relocation.banner.cta} <span aria-hidden>→</span>
        </Link>
      </div>
    </aside>
  );
}
