import { site } from "@/lib/site";

type InquiryOptions = {
  subject?: string;
  body?: string;
};

/** ASCII-safe mailto — special dashes/colons can break some mobile mail handlers. */
export function inquiryMailto(opts: InquiryOptions = {}): string {
  const subject = opts.subject ?? "Inquiry - AURA image of God";
  const params = new URLSearchParams();
  params.set("subject", subject);
  if (opts.body) params.set("body", opts.body);
  return `mailto:${site.email}?${params.toString()}`;
}

/** Opens Gmail compose in the browser when no desktop mail app is configured. */
export function inquiryGmail(opts: InquiryOptions = {}): string {
  const subject = opts.subject ?? "Inquiry - AURA image of God";
  const params = new URLSearchParams({
    view: "cm",
    fs: "1",
    to: site.email,
    su: subject,
  });
  if (opts.body) params.set("body", opts.body);
  return `https://mail.google.com/mail/?${params.toString()}`;
}
