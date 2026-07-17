import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { AppImage } from "@/components/ui/app-image";
import { media } from "@/data/media";
import { site } from "@/lib/site";
import { imageUrl } from "@/lib/cloudinary";

/**
 * Photo footer always uses fixed light-on-dark colors so theme tokens
 * (surface/ink) do not invert the text when dark mode is on.
 */
export function Footer() {
  return (
    <footer className="relative mt-0 min-h-[32rem] overflow-hidden sm:min-h-[36rem] lg:min-h-[40rem]">
      <div className="absolute inset-0">
        <AppImage
          src={imageUrl(media.footer, {
            width: 1920,
            height: 1280,
            gravity: "center",
          })}
          alt=""
          fill
          sizes="100vw"
          loading="lazy"
          className="object-cover object-[center_58%] sm:object-[center_55%] lg:object-[center_50%]"
        />
        {/* Fixed dark scrim — not theme-linked */}
        <div className="absolute inset-0 bg-black/65" />
      </div>

      <div className="relative grid min-h-[32rem] gap-10 px-6 py-16 text-white sm:min-h-[36rem] sm:px-10 md:grid-cols-3 md:items-center lg:min-h-[40rem]">
        {/* Left: nav */}
        <nav className="flex flex-col gap-2 text-xs font-semibold uppercase tracking-widest">
          {site.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="transition-opacity hover:opacity-70"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href={`mailto:${site.email}`}
            className="transition-opacity hover:opacity-70"
          >
            Send Inquiry
          </Link>
        </nav>

        {/* Center: newsletter */}
        <div className="flex flex-col items-center gap-4 text-center">
          <span className="flex size-9 items-center justify-center rounded-full border border-white/70 text-[13px] font-semibold">
            {site.mark}
          </span>
          <p className="max-w-xs text-lg font-semibold leading-tight text-white">
            Stay tuned for curated updates, timeless pieces.
          </p>
          <form className="flex w-full max-w-xs items-center gap-2 border-b border-white/40 pb-2">
            <input
              type="email"
              required
              placeholder="Enter your email"
              className="w-full bg-transparent text-sm text-white placeholder:text-white/60 focus:outline-none"
            />
            <button
              type="submit"
              aria-label="Subscribe"
              className="text-white transition-transform hover:translate-x-0.5"
            >
              <ArrowRight size={18} />
            </button>
          </form>
        </div>

        {/* Right: social */}
        <nav className="flex flex-col gap-2 text-xs font-semibold uppercase tracking-widest md:items-end">
          {site.social.map((item) => (
            <a
              key={item.label}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-opacity hover:opacity-70"
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>

      <div className="relative flex flex-col gap-2 border-t border-white/15 px-6 py-5 text-[11px] uppercase tracking-widest text-white/70 sm:flex-row sm:items-center sm:justify-between sm:px-10">
        <span>
          © {new Date().getFullYear()} {site.name}. All rights reserved.
        </span>
        <div className="flex gap-5">
          <Link href="/about" className="hover:text-white">
            Terms &amp; Conditions
          </Link>
          <Link href="/about" className="hover:text-white">
            Shipping &amp; Returns
          </Link>
        </div>
      </div>
    </footer>
  );
}
