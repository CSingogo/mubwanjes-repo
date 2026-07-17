/**
 * Cloudinary delivery helpers.
 * Requires NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME in .env.local (cloud name only).
 */

export type ImageOptions = {
  width?: number;
  height?: number;
  /** Crop mode — fill is best for editorial crops. */
  crop?: "fill" | "limit" | "fit";
  /**
   * Cloudinary gravity. Omit or `"auto"` for face-aware crops (good on products).
   * Use `"center"` for wide group shots so g_auto doesn't zoom into heads only.
   */
  gravity?: "auto" | "center" | "north" | "south";
};

function cloudName(): string {
  const name = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  if (!name) {
    throw new Error(
      "Missing NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME in .env.local"
    );
  }
  return name;
}

/**
 * Cloudinary already serves f_auto/q_auto optimized bytes — skip Next's
 * image optimizer to avoid double-processing and fetch timeouts.
 */
export const SKIP_NEXT_IMAGE_OPTIMIZER = true;

/** Build an optimized image delivery URL. */
export function imageUrl(publicId: string, opts: ImageOptions = {}): string {
  const {
    width = 800,
    height = 1000,
    crop = "fill",
    gravity = "auto",
  } = opts;

  const transforms = [
    "f_auto",
    "q_auto",
    `c_${crop}`,
    `w_${width}`,
    `h_${height}`,
    `g_${gravity}`,
  ].join(",");

  return `https://res.cloudinary.com/${cloudName()}/image/upload/${transforms}/${publicId}`;
}

/** Build an optimized video delivery URL (mp4). */
export function videoUrl(publicId: string): string {
  return `https://res.cloudinary.com/${cloudName()}/video/upload/f_auto,q_auto/${publicId}`;
}

/** Poster / still frame from a video asset. */
export function videoPosterUrl(
  publicId: string,
  opts: ImageOptions = {}
): string {
  const { width = 1600, height = 900 } = opts;
  return `https://res.cloudinary.com/${cloudName()}/video/upload/so_0,f_auto,q_auto,c_fill,w_${width},h_${height}/${publicId}.jpg`;
}
