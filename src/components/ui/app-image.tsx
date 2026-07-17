import type { ImageProps } from "next/image";
import Image from "next/image";
import { SKIP_NEXT_IMAGE_OPTIMIZER } from "@/lib/cloudinary";

/**
 * App-wide image component. Cloudinary URLs are already optimized
 * (f_auto, q_auto), so we skip Next's optimizer by default.
 */
export function AppImage(props: ImageProps) {
  return <Image unoptimized={SKIP_NEXT_IMAGE_OPTIMIZER} {...props} />;
}
