import type { Product } from "@/features/products/types";
import { Reveal } from "@/components/ui/reveal";
import { ProductCard } from "./product-card";

export function ProductGrid({ products }: { products: Product[] }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product, i) => (
        <Reveal key={product.slug} delay={(i % 3) * 0.08}>
          <ProductCard product={product} />
        </Reveal>
      ))}
    </div>
  );
}
