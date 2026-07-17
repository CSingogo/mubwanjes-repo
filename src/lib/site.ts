export const site = {
  /** Full brand name — use everywhere public-facing. */
  name: "AURA: image of God",
  /** Short label for tight UI (product names, etc.). */
  shortName: "AURA",
  /** Local logo in /public (not Cloudinary). */
  logoSrc: "/logo.png",
  tagline: "Image of God.",
  description:
    "AURA: image of God is an independent label crafting heavyweight, made-to-order tees rooted in restraint and quiet strength. Every piece is genderless, built to last, and offered plain or printed.",
  email: "hello@aura.studio",
  nav: [
    { label: "Home", href: "/" },
    { label: "Shop", href: "/shop" },
    { label: "Collection", href: "/#collections" },
    { label: "About", href: "/about" },
  ],
  social: [
    { label: "Instagram", href: "https://instagram.com" },
    { label: "TikTok", href: "https://tiktok.com" },
    { label: "Pinterest", href: "https://pinterest.com" },
  ],
} as const;
