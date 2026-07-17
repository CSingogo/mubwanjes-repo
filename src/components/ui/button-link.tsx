import Link from "next/link";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

type Variant = "solid" | "outline" | "ghost";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full text-sm font-medium uppercase tracking-wide transition-colors duration-200 disabled:opacity-50";

const variants: Record<Variant, string> = {
  solid: "bg-ink text-surface hover:bg-ink/85 px-6 py-3",
  outline:
    "border border-ink/20 text-ink hover:border-ink hover:bg-ink hover:text-surface px-6 py-3",
  ghost: "text-ink hover:text-ink-muted px-2 py-1",
};

type ButtonLinkProps = ComponentProps<typeof Link> & {
  variant?: Variant;
};

export function ButtonLink({
  variant = "solid",
  className,
  ...props
}: ButtonLinkProps) {
  return (
    <Link className={cn(base, variants[variant], className)} {...props} />
  );
}
