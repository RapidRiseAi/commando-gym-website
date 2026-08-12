import { relocation } from "@/content/relocation";
import { Reveal } from "@/components/ui/reveal";

const timeline = [
  { date: "Now", title: "Train with us at our current home", body: relocation.currentAddress },
  { date: relocation.moveDatesCompact, title: "The move begins", body: "The gym will close for two days while we move, set up and prepare for what’s next." },
  { date: relocation.reopeningShort, title: "The new chapter begins", body: `Training resumes at our new home: ${relocation.newAddress}. ${relocation.newLandmark}.` }
];

export function RelocationSection() {
  return (
    <section id={relocation.anchor} className="scroll-mt-24 overflow-hidden border-b border-white/10 bg-white text-black">
      <div className="relative mx-auto max-w-[90rem] px-4 py-14 md:px-6 md:py-24">
        <div aria-hidden className="absolute -right-4 top-0 font-display text-[9rem] font-bold leading-none text-black/[0.035] md:text-[18rem]">27</div>
        <Reveal className="relative max-w-4xl">
          <p className="font-display text-xs font-semibold uppercase tracking-[0.3em] text-zinc-600">The next chapter</p>
          <h2 className="mt-4 font-display text-4xl font-bold uppercase leading-[0.95] tracking-tight sm:text-5xl md:text-7xl">Something bigger is coming.</h2>
          <div className="mt-6 max-w-2xl space-y-3 text-sm leading-6 text-zinc-700 md:text-lg md:leading-8">
            <p>Commando is moving to a new home.</p>
            <p>On <strong className="text-black">27 August</strong>, a new chapter begins at <strong className="text-black">{relocation.newAddress} — directly across from Hlatini.</strong></p>
            <p className="font-semibold text-black">Same Commando. New home. Bigger possibilities.</p>
          </div>
        </Reveal>
        <div className="relative mt-10 grid border-y border-black/20 md:mt-14 md:grid-cols-3">
          {timeline.map((item, index) => (
            <Reveal key={item.date} delay={index * 80} className="border-b border-black/20 py-6 last:border-b-0 md:border-b-0 md:border-r md:px-6 md:first:pl-0 md:last:border-r-0">
              <p className="font-display text-sm font-bold uppercase tracking-[0.2em] text-zinc-500">{item.date}</p>
              <h3 className="mt-3 font-display text-xl font-bold md:text-2xl">{item.title}</h3>
              <p className="mt-2 text-sm leading-6 text-zinc-700">{item.body}</p>
            </Reveal>
          ))}
        </div>
        <Reveal className="relative mt-8 md:mt-10"><p className="max-w-3xl font-display text-xl font-semibold leading-snug md:text-3xl">We’re not simply changing location. We’re preparing Commando for what comes next.</p></Reveal>
      </div>
    </section>
  );
}
