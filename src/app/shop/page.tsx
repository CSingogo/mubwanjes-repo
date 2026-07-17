import type { Metadata } from "next";
import { getAllProducts } from "@/data/products";
import { ProductGrid } from "@/features/products/components/product-grid";

export const metadata: Metadata = {
  title: "Shop",
  description: "Heavyweight tees, made to order — plain or custom printed.",
};

export default function ShopPage() {
  const products = getAllProducts();

  return (
    <div className="px-5 py-12 sm:px-8 sm:py-16">
      <header className="mb-10 max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-widest text-accent">
          The Collection
        </p>
        <h1 className="display mt-3 text-4xl text-ink sm:text-5xl">
          Heavyweight <span className="text-accent">essentials</span>.
        </h1>
        <p className="mt-4 text-ink-muted">
          Every piece is made to order in premium heavyweight cotton — offered
          plain or custom printed.
        </p>
      </header>

      <ProductGrid products={products} />
    </div>
  );
}
