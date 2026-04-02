import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-border bg-black">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-8 text-sm text-zinc-400 md:flex-row md:items-center md:justify-between md:px-6">
        <p>© {new Date().getFullYear()} Commando. All rights reserved.</p>
        <div className="grid grid-cols-3 gap-x-3 gap-y-2 text-xs sm:flex sm:gap-4 sm:text-sm">
          <Link href="/faq">FAQ</Link>
          <Link href="/rules">Rules</Link>
          <Link href="/contact">Contact</Link>
          <Link href="/terms">Terms</Link>
          <Link href="/privacy">Privacy</Link>
          <Link href="/media-policy">Media Policy</Link>
        </div>
      </div>
    </footer>
  );
}
