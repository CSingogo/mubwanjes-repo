"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { ThemeTogglerButton } from "@/components/animate-ui/components/buttons/theme-toggler";
import { InquiryLink } from "@/components/ui/inquiry-link";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

function Logo({
  className,
  withWordmark = false,
}: {
  className?: string;
  withWordmark?: boolean;
}) {
  return (
    <Link
      href="/"
      aria-label={`${site.name} home`}
      className={cn("flex shrink-0 items-center gap-2.5", className)}
    >
      <span className="relative flex size-10 shrink-0 overflow-hidden rounded-full border border-line bg-surface sm:size-11">
        <Image
          src={site.logoSrc}
          alt={site.shortName}
          width={44}
          height={44}
          className="object-cover"
          priority
        />
      </span>
      {withWordmark && (
        <span className="flex flex-col leading-none">
          <span className="text-sm font-extrabold uppercase tracking-[0.3em] text-ink">
            AURA
          </span>
          <span className="mt-1 text-[0.55rem] font-semibold uppercase tracking-[0.24em] text-accent">
            Image of God
          </span>
        </span>
      )}
    </Link>
  );
}

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="relative z-20 border-b border-line">
      <nav className="flex items-center justify-between gap-3 px-5 py-4 sm:px-8">
        <div className="flex flex-1 items-center gap-3 md:hidden">
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={open}
            className="flex items-center justify-center text-ink"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
          <Logo withWordmark />
        </div>

        <div className="hidden flex-1 items-center gap-7 md:flex">
          {site.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-xs font-semibold uppercase tracking-widest text-ink transition-colors hover:text-ink-muted"
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="hidden flex-1 justify-center md:flex">
          <Logo withWordmark />
        </div>

        <div className="flex flex-1 items-center justify-end gap-3 sm:gap-5">
          <InquiryLink
            preferGmail
            className="hidden text-xs font-semibold uppercase tracking-widest text-ink transition-colors hover:text-ink-muted sm:inline"
          >
            Send Inquiry
          </InquiryLink>
          <ThemeTogglerButton
            variant="outline"
            size="default"
            direction="ltr"
            modes={["light", "dark", "system"]}
          />
        </div>
      </nav>

      <div
        className={cn(
          "grid overflow-hidden border-t border-line transition-all duration-300 md:hidden",
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr] border-t-transparent"
        )}
      >
        <div className="min-h-0">
          <div className="flex flex-col gap-1 px-5 py-3">
            {site.nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="py-2 text-sm font-semibold uppercase tracking-widest text-ink"
              >
                {item.label}
              </Link>
            ))}
            <InquiryLink
              preferGmail
              onClick={() => setOpen(false)}
              className="py-2 text-sm font-semibold uppercase tracking-widest text-ink"
            >
              Send Inquiry
            </InquiryLink>
          </div>
        </div>
      </div>
    </header>
  );
}
