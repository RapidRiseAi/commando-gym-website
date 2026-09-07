import { relocation } from "@/content/relocation";
import { Reveal } from "@/components/ui/reveal";

const timeline = [
  {
    step: "01",
    date: "Completed",
    title: "We said goodbye to our old gym",
    body: `Training at ${relocation.currentAddress} ended before the move.`
  },
  {
    step: "02",
    date: relocation.moveDatesCompact,
    title: "The move was completed",
    body: "Our team moved, set up and prepared the new space over these two days."
  },
  {
    step: "03",
    date: `Open since ${relocation.reopeningShort}`,
    title: "Our new home is open",
    body: `Train from 5 AM to 9 PM at ${relocation.newAddress}. ${relocation.newLandmark}.`
  }
];

export function RelocationSection() {
  return (
    <section
      id={relocation.anchor}
      className="relative scroll-mt-24 overflow-hidden border-b border-white/10 bg-surface"
    >
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(circle_at_78%_18%,rgba(255,255,255,0.07),transparent_30%),linear-gradient(135deg,rgba(255,255,255,0.025),transparent_45%)]"
      />
      <div aria-hidden className="absolute -right-8 top-8 font-display text-[11rem] font-bold leading-none text-white/[0.025] md:right-4 md:text-[22rem]">
        27
      </div>

      <div className="relative mx-auto max-w-[90rem] px-4 py-14 md:px-6 md:py-24">
        <Reveal className="grid gap-8 lg:grid-cols-[1.25fr_0.75fr] lg:items-end">
          <div>
            <p className="eyebrow">{relocation.phaseLabel}</p>
            <h2 className="mt-5 max-w-4xl font-display text-4xl font-bold uppercase leading-[0.95] tracking-tight sm:text-5xl md:text-7xl">
              We’ve moved.<br className="hidden sm:block" /> We’re open.
            </h2>
          </div>
          <div className="border-l border-white/15 pl-5 text-sm leading-6 text-zinc-300 md:pl-7 md:text-base md:leading-7">
            <p>Commando’s next chapter is here.</p>
            <p className="mt-3">
              We’re now open daily from 5 AM to 9 PM at <strong className="text-white">{relocation.newAddress} — directly across from Hlatini.</strong> Please use our new address for every training visit.
            </p>
            <p className="mt-4 font-display text-lg font-semibold text-white">Same Commando. New home. A stronger chapter starts now.</p>
          </div>
        </Reveal>

        <div className="relative mt-12 grid gap-3 md:mt-16 md:grid-cols-3 md:gap-0">
          <div aria-hidden className="absolute left-0 right-0 top-[2.2rem] hidden h-px bg-gradient-to-r from-white/40 via-white/20 to-white/5 md:block" />
          {timeline.map((item, index) => (
            <Reveal key={item.date} delay={index * 90} className="group relative rounded-2xl border border-white/10 bg-black/30 p-5 md:rounded-none md:border-0 md:bg-transparent md:px-6 md:py-0 md:first:pl-0">
              <div className="relative flex items-center justify-between md:h-[4.5rem] md:items-start">
                <p className="font-display text-sm font-bold uppercase tracking-[0.2em] text-zinc-200">{item.date}</p>
                <span className="font-display text-xs tracking-[0.2em] text-zinc-600 md:hidden">{item.step}</span>
                <span aria-hidden className="absolute -bottom-px left-0 hidden h-3 w-3 rounded-full border-2 border-zinc-900 bg-white shadow-[0_0_0_5px_rgba(255,255,255,0.08)] md:block" />
              </div>
              <div className="mt-4 md:mt-6">
                <p className="hidden font-display text-xs tracking-[0.2em] text-zinc-600 md:block">{item.step}</p>
                <h3 className="mt-2 font-display text-xl font-bold leading-tight md:text-2xl">{item.title}</h3>
                <p className="mt-3 max-w-sm text-sm leading-6 text-zinc-400">{item.body}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-10 border-t border-white/10 pt-7 md:mt-14 md:flex md:items-center md:justify-between md:gap-8">
          <p className="max-w-3xl font-display text-xl font-semibold leading-snug text-zinc-100 md:text-2xl">
            The doors are open. Come train, reconnect with the community and experience our new home.
          </p>
          <p className="mt-4 shrink-0 font-display text-xs font-semibold uppercase tracking-[0.22em] text-zinc-500 md:mt-0">
            Welcome home
          </p>
        </Reveal>
      </div>
    </section>
  );
}
