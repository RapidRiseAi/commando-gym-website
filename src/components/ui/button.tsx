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
  /** External target/rel for off-site links. */
  external?: boolean;
};

const variants = {
  primary: "btn-primary btn-sheen",
  secondary: "btn-secondary"
};

export function Button({ href, children, className, variant = "primary", type = "button", onClick, external }: Props) {
  const classes = cn("btn", variants[variant], className);

  if (href) {
    const externalProps = external ? { target: "_blank", rel: "noopener noreferrer" } : {};
    return (
      <Link href={href} className={classes} {...externalProps}>
        <span className="relative z-10 inline-flex items-center gap-2">{children}</span>
      </Link>
    );
  }

  return (
    <button type={type} className={classes} onClick={onClick}>
      <span className="relative z-10 inline-flex items-center gap-2">{children}</span>
    </button>
  );
}
