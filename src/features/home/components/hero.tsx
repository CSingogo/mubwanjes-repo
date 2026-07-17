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
      <h1 className="display max-w-4xl text-[clamp(2rem,8.5vw,5.25rem)] leading-[1] text-ink">
        <span className="block">Sculpted for those</span>
        <RotatingText words={ROTATING} className="block text-accent" />
      </h1>

      <div className="mt-8 sm:mt-12">
        <Suspense fallback={<HeroMediaFallback />}>
          <HeroMedia />
        </Suspense>
      </div>
    </section>
  );
}
