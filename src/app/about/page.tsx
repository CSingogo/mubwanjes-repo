import type { Metadata } from "next";
import Image from "next/image";
import { AppImage } from "@/components/ui/app-image";
import { Reveal } from "@/components/ui/reveal";
import { media } from "@/data/media";
import { imageUrl } from "@/lib/cloudinary";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description: site.description,
};

const values = [
  {
    title: "Made to order",
    body: "Nothing sits in a warehouse. Each tee is cut and finished once you order it — plain or printed to your spec.",
  },
  {
    title: "Heavyweight only",
    body: "We work exclusively in dense 240–300 GSM cottons. Structure you can feel, built to outlast trends.",
  },
  {
    title: "Quietly genderless",
    body: "Refined, restrained silhouettes designed to be worn by anyone, without labels.",
  },
];

export default function AboutPage() {
  return (
    <div className="px-5 py-14 sm:px-8 sm:py-20">
      <Reveal className="flex flex-col items-center text-center">
        <div className="relative size-28 overflow-hidden rounded-full border-2 border-accent/50 sm:size-36 md:size-44">
          <Image
            src={site.logoSrc}
            alt={site.name}
            fill
            sizes="(max-width: 640px) 112px, (max-width: 768px) 144px, 176px"
            className="object-cover"
            priority
          />
        </div>
        <p className="mt-6 text-xs font-semibold uppercase tracking-[0.3em] text-accent">
          {site.shortName}
        </p>
        <p className="mt-2 text-sm font-medium tracking-wide text-ink">
          {site.tagline}
        </p>
      </Reveal>

      <Reveal delay={0.08} className="mx-auto mt-14 max-w-3xl text-center sm:mt-20">
        <h1 className="display text-4xl text-ink sm:text-6xl">
          Crafted in the{" "}
          <span className="text-accent">image of God</span>
          , for those who move different.
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-ink-muted">
          {site.description}
        </p>
      </Reveal>

      <Reveal
        delay={0.12}
        className="relative mt-14 aspect-[16/9] w-full overflow-hidden rounded-[20px] sm:mt-16"
      >
        <AppImage
          src={imageUrl(media.about, {
            width: 1600,
            height: 900,
            gravity: "center",
          })}
          alt="AURA campaign"
          fill
          sizes="100vw"
          className="object-cover"
        />
      </Reveal>

      <div className="mt-16 grid gap-8 md:grid-cols-3">
        {values.map((value, i) => (
          <Reveal key={value.title} delay={i * 0.08}>
            <h2 className="text-lg font-semibold text-ink">
              <span className="text-accent">—</span> {value.title}
            </h2>
            <p className="mt-3 leading-relaxed text-ink-muted">{value.body}</p>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
