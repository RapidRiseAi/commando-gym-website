import { ReactNode } from "react";

export function Section({ id, title, subtitle, children }: { id?: string; title: string; subtitle?: string; children: ReactNode }) {
  return (
    <section id={id} className="mx-auto w-full max-w-6xl px-4 py-12 md:px-6 md:py-20">
      <div className="mb-8 max-w-3xl">
        <h2 className="text-3xl font-bold tracking-tight md:text-4xl">{title}</h2>
        {subtitle && <p className="mt-3 text-zinc-300">{subtitle}</p>}
      </div>
      {children}
    </section>
  );
}
