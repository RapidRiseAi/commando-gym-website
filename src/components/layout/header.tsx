"use client";

import Link from "next/link";
import Image from "next/image";
import { navItems } from "@/content/site-content";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import commandoLogo from "../../../commando-logo.png";

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const closeMobileMenu = () => setMobileOpen(false);

  useEffect(() => {
    if (!mobileOpen) {
      document.body.style.overflow = "";
      return;
    }

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <header className="sticky top-0 z-[1000] border-b border-border/70 bg-black/95">
      <div className="relative mx-auto flex h-16 max-w-7xl items-center justify-center px-4 md:px-6">
        <Link href="/" className="absolute left-4 inline-flex items-center md:left-6">
          <Image src={commandoLogo} alt="Commando gym logo" width={360} height={360} className="h-20 w-20 object-contain invert md:h-24 md:w-24" priority />
        </Link>
        <nav className="hidden gap-6 md:flex">
          {navItems.slice(0, -1).map((item) => (
            <Link key={item.href} href={item.href} className="text-sm text-zinc-200 hover:text-white">
              {item.label}
            </Link>
          ))}
        </nav>
        <Button href="/memberships" className="absolute right-6 hidden md:inline-flex">
          Join Now
        </Button>
        <button
          type="button"
          className="absolute right-4 inline-flex min-h-10 min-w-10 items-center justify-center rounded-lg border border-white/20 bg-white/5 px-3 text-sm font-semibold text-white md:hidden"
          onClick={() => setMobileOpen((prev) => !prev)}
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav-menu"
          aria-label="Toggle navigation menu"
        >
          Menu
        </button>
      </div>

      {mobileOpen && (
        <div id="mobile-nav-menu" className="fixed inset-0 z-[1100] bg-black md:hidden" role="dialog" aria-modal="true">
          <div className="flex h-16 items-center justify-between border-b border-white/10 px-4">
            <Link href="/" className="inline-flex items-center" onClick={closeMobileMenu}>
              <Image src={commandoLogo} alt="Commando gym logo" width={360} height={360} className="h-20 w-20 object-contain invert" priority />
            </Link>
            <button
              type="button"
              onClick={closeMobileMenu}
              className="inline-flex min-h-10 min-w-10 items-center justify-center rounded-lg border border-white/20 bg-white/5 px-3 text-sm font-semibold text-white"
            >
              Close
            </button>
          </div>

          <nav className="h-[calc(100vh-4rem)] overflow-y-auto bg-black px-4 pb-32 pt-4">
            <div className="grid gap-3">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={closeMobileMenu}
                  className="rounded-xl border border-white/10 bg-zinc-950 px-4 py-4 text-lg font-medium text-zinc-100"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
