import Link from "next/link";
import Image from "next/image";
import commandoLogo from "../../../commando-logo.png";

export function Footer() {
  return (
    <footer className="border-t border-border bg-black">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-8 text-sm text-zinc-400 md:flex-row md:items-center md:justify-between md:px-6">
        <div className="flex items-center gap-3">
          <Image src={commandoLogo} alt="Commando gym logo" width={300} height={300} className="h-20 w-20 object-contain invert" />
          <p>© {new Date().getFullYear()} Commando. All rights reserved.</p>
        </div>
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
