import Link from "next/link";
import { relocation } from "@/content/relocation";

export function RelocationBanner() {
  return (
    <aside className="relative z-[1001] overflow-hidden border-b border-white/10 bg-surface-2 text-white" aria-label="Commando relocation announcement">
      <div aria-hidden className="absolute inset-y-0 left-1/2 w-2/3 -translate-x-1/2 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.07),transparent_70%)]" />
      <div className="relative mx-auto flex max-w-[90rem] flex-col items-center justify-center gap-1 px-4 py-2.5 text-center sm:flex-row sm:gap-3 md:px-6">
        <p className="text-xs leading-5 text-zinc-300 sm:text-sm">
          <strong className="font-display uppercase tracking-[0.14em] text-white">{relocation.banner.lead}</strong>
          <span aria-hidden className="mx-1.5 text-zinc-600">—</span><span>{relocation.banner.message}</span>
        </p>
        <Link href={`/#${relocation.anchor}`} className="inline-flex min-h-8 shrink-0 items-center rounded-md px-2 text-xs font-bold uppercase tracking-[0.14em] text-white underline decoration-white/30 underline-offset-4 transition hover:bg-white/10 hover:decoration-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-surface-2">
          {relocation.banner.cta} <span aria-hidden>→</span>
        </Link>
      </div>
    </aside>
  );
}
