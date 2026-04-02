import Link from "next/link";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

type Props = {
  href?: string;
  children: ReactNode;
  className?: string;
  variant?: "primary" | "secondary";
  type?: "button" | "submit";
  onClick?: () => void;
};

const styles = {
  primary: "bg-white text-black hover:bg-zinc-200",
  secondary: "border border-border bg-surface text-white hover:bg-zinc-900"
};

export function Button({ href, children, className, variant = "primary", type = "button", onClick }: Props) {
  const base = cn(
    "inline-flex min-h-11 items-center justify-center rounded-xl px-5 py-3 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70",
    styles[variant],
    className
  );

  if (href) {
    return (
      <Link href={href} className={base}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={base} onClick={onClick}>
      {children}
    </button>
  );
}
