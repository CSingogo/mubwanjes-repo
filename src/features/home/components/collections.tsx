import Link from "next/link";
import { Reveal } from "@/components/ui/reveal";
import { collections } from "@/data/products";

export function Collections() {
  return (
    <section
      id="collections"
      className="scroll-mt-24 px-5 py-24 text-center sm:px-8 sm:py-32"
    >
      <Reveal className="flex flex-col items-center gap-6">
        <span className="h-16 w-px bg-line" />
        <p className="text-sm font-semibold uppercase tracking-widest text-ink">
          Discover Our Collections
        </p>
      </Reveal>

      <div className="mx-auto mt-12 flex max-w-3xl flex-col gap-2">
        {collections.map((name, i) => (
          <Reveal key={name} delay={i * 0.06}>
            <Link
              href="/shop"
              className="display block text-3xl leading-tight text-ink transition-colors hover:text-ink-muted sm:text-5xl"
            >
              {name}
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
