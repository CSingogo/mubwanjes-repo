import type { Metadata } from "next";
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
      <Reveal className="max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-widest text-ink-muted">
          About {site.name}
        </p>
        <h1 className="display mt-4 text-4xl text-ink sm:text-6xl">
          Crafted in the image of God, for those who move different.
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-muted">
          {site.description}
        </p>
      </Reveal>

      <Reveal delay={0.1} className="relative mt-12 aspect-[16/9] w-full overflow-hidden rounded-[20px]">
        <AppImage
          src={imageUrl(media.about, { width: 1600, height: 900 })}
          alt="AURA campaign"
          fill
          sizes="100vw"
          className="object-cover"
        />
      </Reveal>

      <div className="mt-16 grid gap-8 md:grid-cols-3">
        {values.map((value, i) => (
          <Reveal key={value.title} delay={i * 0.08}>
            <h2 className="text-lg font-semibold text-ink">{value.title}</h2>
            <p className="mt-3 leading-relaxed text-ink-muted">{value.body}</p>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
