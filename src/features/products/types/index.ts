export type PrintOption = "plain" | "printed";

export type Product = {
  slug: string;
  name: string;
  /** Short editorial line shown under the name. */
  tagline: string;
  /** Longer description for the detail page. */
  description: string;
  /** Price in the smallest sensible unit for display (USD). */
  price: number;
  /** Fabric weight in grams per square metre. */
  weightGsm: number;
  /** Which finishes this piece is offered in. */
  printOptions: PrintOption[];
  colors: string[];
  sizes: string[];
  /** Cloudinary public id (currently mapped to a placeholder). */
  imageId: string;
  /** Extra gallery image ids. */
  gallery: string[];
  collection: string;
  featured?: boolean;
};
