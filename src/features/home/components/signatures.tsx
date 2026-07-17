import Link from "next/link";
import { AppImage } from "@/components/ui/app-image";
import { Reveal } from "@/components/ui/reveal";
import { imageUrl } from "@/lib/cloudinary";
import { getFeaturedProducts } from "@/data/products";

export function Signatures() {
  const items = getFeaturedProducts().slice(0, 4);

  return (
    <section className="px-5 pb-8 sm:px-8">
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {items.map((product, i) => (
          <Reveal key={product.slug} delay={i * 0.08}>
            <Link
              href={`/product/${product.slug}`}
              className="group block overflow-hidden rounded-[16px]"
            >
              <div className="relative aspect-[3/4] w-full overflow-hidden">
                <AppImage
                  src={imageUrl(product.imageId, { width: 600, height: 800 })}
                  alt={product.name}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="flex items-center justify-between pt-3 pb-1">
                <span className="text-sm font-medium text-ink">
                  {product.name}
                </span>
                <span className="text-sm text-ink-muted">
                  ${product.price}
                </span>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>

      <div className="flex justify-center pt-10">
        <Link
          href="/shop"
          className="text-xs font-semibold uppercase tracking-widest text-ink underline-offset-4 hover:underline"
        >
          View All
        </Link>
      </div>
    </section>
  );
}
