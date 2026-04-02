import { ReactNode } from "react";

export function Section({ id, title, subtitle, children }: { id?: string; title: string; subtitle?: string; children: ReactNode }) {
  return (
    <section id={id} className="mx-auto w-full max-w-6xl px-4 py-10 md:px-6 md:py-20">
      <div className="mb-6 max-w-3xl md:mb-8">
        <h2 className="text-2xl font-bold tracking-tight md:text-4xl">{title}</h2>
        {subtitle && <p className="mt-2 text-sm text-zinc-300 md:mt-3 md:text-base">{subtitle}</p>}
      </div>
      {children}
    </section>
  );
}
