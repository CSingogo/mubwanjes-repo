import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { AppImage } from "@/components/ui/app-image";
import type { Product } from "@/features/products/types";
import { imageUrl } from "@/lib/cloudinary";
import { formatPrice } from "@/lib/format";
import { site } from "@/lib/site";

function toTitle(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

export function ProductDetail({ product }: { product: Product }) {
  const gallery = product.gallery.length ? product.gallery : [product.imageId];
  const inquiry = `mailto:${site.email}?subject=${encodeURIComponent(
    `Inquiry: ${product.name}`
  )}&body=${encodeURIComponent(
    `Hi ${site.name}, I'm interested in the ${product.name}. Please share availability, sizing and lead time.`
  )}`;

  return (
    <div className="px-5 py-10 sm:px-8 sm:py-14">
      <Link
        href="/shop"
        className="text-xs font-semibold uppercase tracking-widest text-ink-muted transition-colors hover:text-ink"
      >
        ← Back to shop
      </Link>

      <div className="mt-6 grid gap-8 lg:grid-cols-2">
        {/* Gallery */}
        <div className="flex flex-col gap-3">
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[20px] bg-surface-muted">
            <AppImage
              src={imageUrl(gallery[0], { width: 900, height: 1125 })}
              alt={product.name}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          {gallery.length > 1 && (
            <div className="grid grid-cols-3 gap-3">
              {gallery.slice(1, 4).map((id) => (
                <div
                  key={id}
                  className="relative aspect-square overflow-hidden rounded-[14px] bg-surface-muted"
                >
                  <AppImage
                    src={imageUrl(id, { width: 400, height: 400 })}
                    alt={product.name}
                    fill
                    sizes="33vw"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div className="lg:sticky lg:top-6 lg:self-start">
          <p className="text-xs font-semibold uppercase tracking-widest text-ink-muted">
            {product.collection}
          </p>
          <h1 className="display mt-3 text-4xl text-ink sm:text-5xl">
            {product.name}
          </h1>
          <p className="mt-3 text-lg text-ink-muted">{product.tagline}</p>
          <p className="mt-6 text-2xl font-semibold text-ink">
            {formatPrice(product.price)}
          </p>

          <p className="mt-6 max-w-prose leading-relaxed text-ink">
            {product.description}
          </p>

          {/* Spec grid */}
          <dl className="mt-8 grid grid-cols-2 gap-4 border-y border-line py-6 text-sm">
            <div>
              <dt className="text-ink-muted">Weight</dt>
              <dd className="mt-1 font-medium text-ink">
                {product.weightGsm} GSM heavyweight
              </dd>
            </div>
            <div>
              <dt className="text-ink-muted">Finish</dt>
              <dd className="mt-1 font-medium text-ink">
                {product.printOptions.map(toTitle).join(" / ")}
              </dd>
            </div>
          </dl>

          {/* Colors */}
          <div className="mt-6">
            <p className="text-xs font-semibold uppercase tracking-widest text-ink-muted">
              Colours
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {product.colors.map((color) => (
                <span
                  key={color}
                  className="rounded-full border border-line px-3 py-1.5 text-sm text-ink"
                >
                  {color}
                </span>
              ))}
            </div>
          </div>

          {/* Sizes */}
          <div className="mt-6">
            <p className="text-xs font-semibold uppercase tracking-widest text-ink-muted">
              Sizes
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {product.sizes.map((size) => (
                <span
                  key={size}
                  className="flex h-10 min-w-10 items-center justify-center rounded-full border border-line px-3 text-sm text-ink"
                >
                  {size}
                </span>
              ))}
            </div>
          </div>

          {/* CTA — made-to-order, no cart */}
          <div className="mt-8 flex flex-col gap-3">
            <a
              href={inquiry}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-ink px-6 py-4 text-sm font-semibold uppercase tracking-widest text-surface transition-colors hover:bg-ink/85"
            >
              Send Inquiry
              <ArrowUpRight size={16} />
            </a>
            <p className="text-center text-xs text-ink-muted">
              Made to order · plain or custom printed · crafted per piece
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
