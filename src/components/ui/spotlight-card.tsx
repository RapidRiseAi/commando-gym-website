"use client";

import { useRef, type ElementType, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type Props = {
  as?: ElementType;
  className?: string;
  children: ReactNode;
};

/**
 * Card with a thin static border and a white highlight on the border that
 * tracks the cursor (brightest where the pointer is nearest the edge).
 * Pointer tracking is purely decorative; content renders without JS.
 */
export function SpotlightCard({ as, className, children }: Props) {
  const Tag = (as ?? "div") as ElementType;
  const ref = useRef<HTMLElement>(null);

  const handleMove = (event: React.MouseEvent<HTMLElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${event.clientX - rect.left}px`);
    el.style.setProperty("--my", `${event.clientY - rect.top}px`);
  };

  return (
    <Tag ref={ref} onMouseMove={handleMove} className={cn("spotlight-card", className)}>
      <span aria-hidden className="spotlight-card__border" />
      <div className="relative">{children}</div>
    </Tag>
  );
}
