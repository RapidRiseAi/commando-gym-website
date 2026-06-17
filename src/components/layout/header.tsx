"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navItems } from "@/content/site-content";
import { Button } from "@/components/ui/button";
import { ResponsiveImage } from "@/components/ui/responsive-image";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

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
    <header className="sticky top-0 z-[1000] border-b border-white/10 bg-black/80 backdrop-blur-md supports-[backdrop-filter]:bg-black/65">
      <div className="relative mx-auto flex h-16 max-w-[90rem] items-center justify-center px-4 md:px-6">
        <Link href="/" className="absolute left-4 inline-flex items-center md:left-6" aria-label="Commando home">
          <ResponsiveImage
            name="commando-logo"
            alt="Commando gym logo"
            sizes="96px"
            blur={false}
            className="h-16 w-16 object-contain invert md:h-20 md:w-20"
          />
        </Link>
        <nav className="hidden gap-7 md:flex">
          {navItems.slice(0, -1).map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.label}
                href={item.href}
                className={cn(
                  "group relative text-sm font-medium text-zinc-300 transition hover:text-white",
                  active && "text-white"
                )}
              >
                {item.label}
                <span
                  className={cn(
                    "absolute -bottom-1.5 left-0 h-px w-full origin-left scale-x-0 bg-white transition-transform duration-300 group-hover:scale-x-100",
                    active && "scale-x-100"
                  )}
                />
              </Link>
            );
          })}
        </nav>
        <Button href="/memberships" className="absolute right-6 hidden md:inline-flex">
          Join Now
        </Button>
        <button
          type="button"
          className="absolute right-4 inline-flex min-h-10 min-w-10 items-center justify-center rounded-lg border border-white/20 bg-white/5 px-3 text-sm font-semibold text-white transition hover:bg-white/10 md:hidden"
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
            <Link href="/" className="inline-flex items-center" onClick={closeMobileMenu} aria-label="Commando home">
              <ResponsiveImage
                name="commando-logo"
                alt="Commando gym logo"
                sizes="64px"
                blur={false}
                className="h-16 w-16 object-contain invert"
              />
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
                  key={item.label}
                  href={item.href}
                  onClick={closeMobileMenu}
                  className="rounded-xl border border-white/10 bg-surface px-4 py-4 text-lg font-medium text-zinc-100 transition active:scale-[0.99]"
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
