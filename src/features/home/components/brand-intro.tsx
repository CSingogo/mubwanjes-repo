import { Reveal } from "@/components/ui/reveal";
import { site } from "@/lib/site";

export function BrandIntro() {
  return (
    <section className="px-5 py-20 text-center sm:px-8 sm:py-28">
      <Reveal>
        <p className="mx-auto max-w-2xl text-lg font-medium leading-relaxed text-ink sm:text-xl">
          {site.description}
        </p>
      </Reveal>

      <Reveal delay={0.1} className="mt-16 flex flex-col items-center gap-6">
        <span className="h-16 w-px bg-line" />
        <h2 className="display text-2xl text-ink sm:text-3xl">
          Explore Our Signatures
        </h2>
      </Reveal>
    </section>
  );
}
