import { cn } from "@/lib/utils";

type MediaSkeletonProps = {
  className?: string;
  /** Soft label for screen readers */
  label?: string;
};

/**
 * Pulsing placeholder that matches media aspect boxes (hero, cards, etc.).
 */
export function MediaSkeleton({
  className,
  label = "Loading media",
}: MediaSkeletonProps) {
  return (
    <div
      role="status"
      aria-label={label}
      className={cn(
        "absolute inset-0 animate-pulse bg-gradient-to-br from-surface-muted via-line/40 to-surface-muted",
        className
      )}
    >
      <span className="sr-only">{label}</span>
    </div>
  );
}
