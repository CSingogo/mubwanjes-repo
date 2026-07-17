"use client";

import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { inquiryGmail, inquiryMailto } from "@/lib/inquiry";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

type InquiryLinkProps = Omit<ComponentPropsWithoutRef<"a">, "href"> & {
  children: ReactNode;
  subject?: string;
  body?: string;
  /** Prefer Gmail web compose (more reliable when no mail app is installed). */
  preferGmail?: boolean;
};

/**
 * Contact link that works without a backend.
 * Uses mailto first; if the browser has no mail handler, falls back to Gmail web.
 */
export function InquiryLink({
  children,
  className,
  subject,
  body,
  preferGmail = false,
  onClick,
  ...props
}: InquiryLinkProps) {
  const mailto = inquiryMailto({ subject, body });
  const gmail = inquiryGmail({ subject, body });

  return (
    <a
      href={preferGmail ? gmail : mailto}
      title={`Email ${site.email}`}
      className={cn(className)}
      onClick={(e) => {
        onClick?.(e);
        if (e.defaultPrevented) return;

        if (preferGmail) {
          // Let the browser open Gmail in a new tab
          e.preventDefault();
          window.open(gmail, "_blank", "noopener,noreferrer");
          return;
        }

        // Try native mail app; if nothing handles it, open Gmail after a short wait
        e.preventDefault();
        window.location.href = mailto;
        window.setTimeout(() => {
          // If the page is still focused, mail app likely didn't take over
          if (document.hasFocus()) {
            window.open(gmail, "_blank", "noopener,noreferrer");
          }
        }, 600);
      }}
      {...props}
    >
      {children}
    </a>
  );
}
