"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

/**
 * Replays a short enter animation on each route change. Keyed by pathname so the
 * page subtree remounts and the animation runs. The animation is gated in CSS
 * behind scripting + reduced-motion media queries, so content is fully visible
 * without JS and for reduced-motion users.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  return (
    <div key={pathname} className="page-enter">
      {children}
    </div>
  );
}
