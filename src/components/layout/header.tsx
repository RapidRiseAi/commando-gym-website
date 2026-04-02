"use client";

import Link from "next/link";
import { navItems } from "@/content/site-content";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const closeMobileMenu = () => setMobileOpen(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-black/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:px-6">
        <Link href="/" className="text-sm font-black uppercase tracking-[0.25em]">
          Commando
        </Link>
        <nav className="hidden gap-6 md:flex">
          {navItems.slice(0, -1).map((item) => (
            <Link key={item.href} href={item.href} className="text-sm text-zinc-200 hover:text-white">
              {item.label}
            </Link>
          ))}
        </nav>
        <Button href="/join" className="hidden md:inline-flex">
          Join Now
        </Button>
        <button
          type="button"
          className="inline-flex min-h-10 min-w-10 items-center justify-center rounded-lg border border-white/20 bg-white/5 text-sm font-semibold text-white md:hidden"
          onClick={() => setMobileOpen((prev) => !prev)}
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav-menu"
          aria-label="Toggle navigation menu"
        >
          Menu
        </button>
      </div>

      {mobileOpen && (
        <div id="mobile-nav-menu" className="border-t border-border/70 bg-black/95 px-4 pb-4 pt-3 md:hidden">
          <nav className="grid gap-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={closeMobileMenu}
                className="rounded-lg border border-border bg-surface px-3 py-2.5 text-sm font-medium text-zinc-100"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
            <Link href="/faq" onClick={closeMobileMenu} className="rounded-md px-2 py-1.5 text-center text-zinc-300 underline">
              FAQ
            </Link>
            <Link href="/terms" onClick={closeMobileMenu} className="rounded-md px-2 py-1.5 text-center text-zinc-300 underline">
              Terms
            </Link>
            <Link href="/privacy" onClick={closeMobileMenu} className="rounded-md px-2 py-1.5 text-center text-zinc-300 underline">
              Privacy
            </Link>
            <Link href="/media-policy" onClick={closeMobileMenu} className="rounded-md px-2 py-1.5 text-center text-zinc-300 underline">
              Media Policy
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
