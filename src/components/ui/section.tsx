import { ReactNode } from "react";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";

type Props = {
  id?: string;
  title: string;
  subtitle?: string;
  /** Short uppercase label shown above the title. */
  eyebrow?: string;
  /** Heading level for the title. Use "h1" for the primary page heading. */
  heading?: "h1" | "h2";
  className?: string;
  children: ReactNode;
};

export function Section({ id, title, subtitle, eyebrow, heading = "h2", className, children }: Props) {
  const Heading = heading;
  return (
    <section id={id} className={cn("mx-auto w-full max-w-[90rem] px-4 py-12 md:px-6 md:py-20", className)}>
      <Reveal className="mb-7 max-w-3xl md:mb-10">
        {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
        <Heading className="font-display text-3xl font-bold leading-[1.05] tracking-tight md:text-5xl">{title}</Heading>
        {subtitle && <p className="mt-3 text-sm text-zinc-300 md:mt-4 md:text-lg md:leading-8">{subtitle}</p>}
        <div className="hairline mt-6 max-w-[10rem]" />
      </Reveal>
      {children}
    </section>
  );
}
