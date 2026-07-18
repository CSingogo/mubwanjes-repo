import { Suspense } from "react";
import { MediaSkeleton } from "@/components/ui/media-skeleton";
import { RotatingText } from "@/components/ui/rotating-text";
import { HeroMedia } from "@/features/home/components/hero-media";

const ROTATING = [
  "brave at heart.",
  "quietly rebellious.",
  "fiercely unique.",
  "built different.",
];

function HeroMediaFallback() {
  return (
    <div className="relative mt-8 aspect-[16/10] w-full overflow-hidden rounded-[20px] sm:mt-12 sm:aspect-[16/8]">
      <MediaSkeleton label="Loading campaign film" />
    </div>
  );
}

export function Hero() {
  return (
    <section className="overflow-x-clip px-5 pt-10 pb-4 sm:px-8 sm:pt-16">
      <h1 className="display text-ink">
        <span className="block text-[clamp(3.5rem,14vw,9.5rem)]">AURA</span>
        <span className="mt-3 block text-[clamp(0.7rem,1.6vw,1rem)] font-semibold uppercase tracking-[0.4em] text-accent">
          Image of God
        </span>
      </h1>

      <p className="display mt-6 max-w-4xl text-[clamp(1.375rem,4.5vw,2.5rem)] text-ink sm:mt-8">
        Sculpted for those{" "}
        <RotatingText words={ROTATING} className="text-accent" />
      </p>

      <div className="mt-8 sm:mt-12">
        <Suspense fallback={<HeroMediaFallback />}>
          <HeroMedia />
        </Suspense>
      </div>
    </section>
  );
}
