"use client";

import { useEffect, useRef, useState } from "react";
import { AppImage } from "@/components/ui/app-image";
import { MediaSkeleton } from "@/components/ui/media-skeleton";
import { media } from "@/data/media";
import { imageUrl, videoPosterUrl, videoUrl } from "@/lib/cloudinary";
import { cn } from "@/lib/utils";

type HeroMediaProps = {
  className?: string;
};

/**
 * Hero campaign video with poster + skeleton until the first frame is ready.
 * Cloudinary serves the MP4 (CDN); Next.js has no built-in <Video> optimizer —
 * we follow the App Router video guide: native <video> + loading UI.
 */
export function HeroMedia({ className }: HeroMediaProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);
  const [posterFailed, setPosterFailed] = useState(false);

  const poster = posterFailed
    ? imageUrl(media.footer, { width: 1600, height: 900, gravity: "center" })
    : videoPosterUrl(media.heroVideo, { width: 1600, height: 900 });

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;

    const markReady = () => setReady(true);

    if (el.readyState >= 2) {
      markReady();
      return;
    }

    el.addEventListener("loadeddata", markReady);
    el.addEventListener("canplay", markReady);
    return () => {
      el.removeEventListener("loadeddata", markReady);
      el.removeEventListener("canplay", markReady);
    };
  }, []);

  return (
    <div
      className={cn(
        "relative aspect-[16/10] w-full overflow-hidden rounded-[20px] bg-surface-muted sm:aspect-[16/8]",
        className
      )}
    >
      {!ready && <MediaSkeleton label="Loading campaign film" />}

      <AppImage
        src={poster}
        alt=""
        fill
        priority
        fetchPriority="high"
        sizes="100vw"
        className={cn(
          "object-cover transition-opacity duration-500",
          ready ? "opacity-0" : "opacity-100"
        )}
        onError={() => setPosterFailed(true)}
      />

      <video
        ref={videoRef}
        className={cn(
          "absolute inset-0 h-full w-full object-cover transition-opacity duration-700",
          ready ? "opacity-100" : "opacity-0"
        )}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster={poster}
        aria-label="AURA campaign film"
      >
        <source src={videoUrl(media.heroVideo)} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}
