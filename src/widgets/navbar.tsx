"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { ThemeTogglerButton } from "@/components/animate-ui/components/buttons/theme-toggler";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

function Logo() {
  return (
    <Link
      href="/"
      aria-label={`${site.name} home`}
      className="relative flex size-10 shrink-0 overflow-hidden rounded-full border border-line bg-surface"
    >
      <Image
        src={site.logoSrc}
        alt={site.shortName}
        width={40}
        height={40}
        className="object-cover"
        priority
      />
    </Link>
  );
}

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="relative z-20 border-b border-line">
      <nav className="flex items-center justify-between px-5 py-4 sm:px-8">
        {/* Left: desktop links */}
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

        {/* Left: mobile toggle */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={open}
          className="flex items-center justify-center text-ink md:hidden"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>

        {/* Center: logo */}
        <div className="flex flex-1 justify-center">
          <Logo />
        </div>

        {/* Right: inquiry + theme toggle */}
        <div className="flex flex-1 items-center justify-end gap-3 sm:gap-5">
          <a
            href={`mailto:${site.email}?subject=${encodeURIComponent("Inquiry — AURA: image of God")}`}
            className="hidden text-xs font-semibold uppercase tracking-widest text-ink transition-colors hover:text-ink-muted sm:inline"
          >
            Send Inquiry
          </a>
          <ThemeTogglerButton
            variant="outline"
            size="default"
            direction="ltr"
            modes={["light", "dark", "system"]}
          />
        </div>
      </nav>

      {/* Mobile drawer */}
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
            <a
              href={`mailto:${site.email}?subject=${encodeURIComponent("Inquiry — AURA: image of God")}`}
              onClick={() => setOpen(false)}
              className="py-2 text-sm font-semibold uppercase tracking-widest text-ink sm:hidden"
            >
              Send Inquiry
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
