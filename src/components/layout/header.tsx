import Link from "next/link";
import { navItems } from "@/content/site-content";
import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-black/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:px-6">
        <Link href="/" className="text-sm font-black uppercase tracking-[0.25em]">Commando Gym</Link>
        <nav className="hidden gap-6 md:flex">
          {navItems.slice(0, -1).map((item) => (
            <Link key={item.href} href={item.href} className="text-sm text-zinc-200 hover:text-white">
              {item.label}
            </Link>
          ))}
        </nav>
        <Button href="/join" className="hidden md:inline-flex">Join Now</Button>
      </div>
    </header>
  );
}
