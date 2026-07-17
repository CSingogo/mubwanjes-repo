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
 * Hero campaign video with mobile-aware playback:
 * - Poster always shows first (fast paint / LCP)
 * - Skip video when reduced-motion, Save-Data, or slow connection
 * - On small screens: still allow muted playsInline autoplay (iOS-safe),
 *   but pause when off-screen to save battery/data
 */
export function HeroMedia({ className }: HeroMediaProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);
  const [posterFailed, setPosterFailed] = useState(false);
  const [allowVideo, setAllowVideo] = useState(false);

  const poster = posterFailed
    ? imageUrl(media.footer, { width: 1200, height: 900, gravity: "center" })
    : videoPosterUrl(media.heroVideo, { width: 1200, height: 900 });

  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    type NetworkInformation = {
      saveData?: boolean;
      effectiveType?: string;
    };
    const connection = (
      navigator as Navigator & { connection?: NetworkInformation }
    ).connection;

    const saveData = Boolean(connection?.saveData);
    const slowNet =
      connection?.effectiveType === "slow-2g" ||
      connection?.effectiveType === "2g";

    // Poster-only when motion/data would hurt; otherwise load the film.
    setAllowVideo(!reduceMotion && !saveData && !slowNet);
  }, []);

  useEffect(() => {
    const el = videoRef.current;
    if (!el || !allowVideo) return;

    const markReady = () => setReady(true);

    if (el.readyState >= 2) markReady();
    el.addEventListener("loadeddata", markReady);
    el.addEventListener("canplay", markReady);

    // Pause when scrolled away — big win on mobile battery/data.
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return;
        if (entry.isIntersecting) {
          void el.play().catch(() => {
            // Autoplay blocked — poster stays visible.
          });
        } else {
          el.pause();
        }
      },
      { threshold: 0.25 }
    );
    io.observe(el);

    return () => {
      el.removeEventListener("loadeddata", markReady);
      el.removeEventListener("canplay", markReady);
      io.disconnect();
    };
  }, [allowVideo]);

  return (
    <div
      className={cn(
        "relative aspect-[4/5] w-full overflow-hidden rounded-[20px] bg-surface-muted sm:aspect-[16/10] md:aspect-[16/8]",
        className
      )}
    >
      {!ready && allowVideo && (
        <MediaSkeleton label="Loading campaign film" />
      )}

      <AppImage
        src={poster}
        alt="AURA campaign"
        fill
        priority
        fetchPriority="high"
        sizes="100vw"
        className={cn(
          "object-cover transition-opacity duration-500",
          allowVideo && ready ? "opacity-0" : "opacity-100"
        )}
        onError={() => setPosterFailed(true)}
      />

      {allowVideo && (
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
          {/* Cloudinary can serve a lighter transform on narrow viewports via CSS isn't enough —
              delivery URL is shared; CDN + metadata preload keeps first bytes small. */}
          <source src={videoUrl(media.heroVideo)} type="video/mp4" />
        </video>
      )}
    </div>
  );
}
