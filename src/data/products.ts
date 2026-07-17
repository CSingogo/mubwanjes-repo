import type { Product } from "@/features/products/types";
import { media } from "@/data/media";

/**
 * Catalogue mapped to Cloudinary assets in the `aura/` folder.
 */
export const products: Product[] = [
  {
    slug: "aura-black-tee",
    name: "The AURA Black Tee",
    tagline: "Our signature heavyweight in faded black.",
    description:
      "A dense, structured heavyweight tee milled from long-staple cotton. It holds its shape, drapes with weight, and softens with every wash. Cut boxy through the body with a ribbed collar built to resist stretching.",
    price: 68,
    weightGsm: 280,
    printOptions: ["plain", "printed"],
    colors: ["Faded Black"],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    imageId: media.shirtBlack,
    gallery: [media.shirtBlack, media.shirtGrey, media.shirtWhite],
    collection: "The Underground Symphony",
    featured: true,
  },
  {
    slug: "aura-white-tee",
    name: "The AURA White Tee",
    tagline: "Clean bone white, 280 GSM.",
    description:
      "The same heavyweight make in a crisp off-white. A canvas for prints or worn plain — quiet, structured, and built to last.",
    price: 68,
    weightGsm: 280,
    printOptions: ["plain", "printed"],
    colors: ["Bone", "Off-White"],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    imageId: media.shirtWhite,
    gallery: [media.shirtWhite, media.shirtWhite2, media.shirtBlack],
    collection: "Where The Tide Whispers",
    featured: true,
  },
  {
    slug: "aura-white-tee-ii",
    name: "The AURA White Tee II",
    tagline: "Second look — same weight, different cut.",
    description:
      "A companion white heavyweight with a slightly longer body. Same mill, same finish — made to order, plain or printed.",
    price: 68,
    weightGsm: 280,
    printOptions: ["plain", "printed"],
    colors: ["Bone"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    imageId: media.shirtWhite2,
    gallery: [media.shirtWhite2, media.shirtWhite, media.shirtGrey],
    collection: "Echoes From The North",
    featured: true,
  },
  {
    slug: "aura-grey-tee",
    name: "The AURA Grey Tee",
    tagline: "Garment-dyed charcoal grey.",
    description:
      "Heavyweight cotton dyed down to a lived-in grey. Soft from day one, structured through the wash — offered plain or custom printed.",
    price: 68,
    weightGsm: 280,
    printOptions: ["plain", "printed"],
    colors: ["Charcoal", "Slate"],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    imageId: media.shirtGrey,
    gallery: [media.shirtGrey, media.shirtBlack, media.shirtWhite],
    collection: "Radiance Across Silent Sands",
    featured: true,
  },
];

export function getAllProducts(): Product[] {
  return products;
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.featured);
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export const collections = Array.from(
  new Set(products.map((p) => p.collection))
);
