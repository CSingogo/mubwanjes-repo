import Link from "next/link";
import { AppImage } from "@/components/ui/app-image";
import type { Product } from "@/features/products/types";
import { imageUrl } from "@/lib/cloudinary";
import { formatPrice } from "@/lib/format";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/product/${product.slug}`}
      className="group block overflow-hidden rounded-[18px] bg-surface-muted"
    >
      <div className="relative aspect-[4/5] w-full overflow-hidden">
        <AppImage
          src={imageUrl(product.imageId, { width: 700, height: 875 })}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <span className="absolute left-3 top-3 rounded-full bg-surface/90 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-ink">
          {product.weightGsm} GSM
        </span>
      </div>
      <div className="flex flex-col gap-1 p-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-ink">{product.name}</h3>
          <span className="text-sm text-ink">{formatPrice(product.price)}</span>
        </div>
        <p className="text-xs text-ink-muted">{product.tagline}</p>
      </div>
    </Link>
  );
}
