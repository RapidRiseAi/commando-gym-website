"use client";

import Link from "next/link";
import Image from "next/image";
import { navItems } from "@/content/site-content";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import commandoLogo from "../../../commando-logo.png";

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const closeMobileMenu = () => setMobileOpen(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-black/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:px-6">
        <Link href="/" className="inline-flex items-center">
          <Image src={commandoLogo} alt="Commando gym logo" width={360} height={360} className="h-24 w-24 object-contain invert md:h-28 md:w-28" priority />
        </Link>
        <nav className="hidden gap-6 md:flex">
          {navItems.slice(0, -1).map((item) => (
            <Link key={item.href} href={item.href} className="text-sm text-zinc-200 hover:text-white">
              {item.label}
            </Link>
          ))}
        </nav>
        <Button href="/memberships" className="hidden md:inline-flex">
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
        <div id="mobile-nav-menu" className="fixed inset-0 z-[100] bg-black px-4 pb-6 pt-20 md:hidden">
          <nav className="grid gap-3">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={closeMobileMenu}
                className="rounded-xl border border-border bg-surface px-4 py-4 text-lg font-medium text-zinc-100"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <button
            type="button"
            onClick={closeMobileMenu}
            className="mt-4 w-full rounded-xl border border-white/20 bg-white/5 px-4 py-3 text-base font-semibold text-white"
          >
            Close Menu
          </button>
        </div>
      )}
    </header>
  );
}
