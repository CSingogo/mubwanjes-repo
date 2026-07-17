/**
 * Prefix a public/ path with the GitHub Pages basePath when needed.
 * Locally base is "" → "/logo.png"
 * On Pages → "/mubwanjes-repo/logo.png"
 */
export function withBasePath(path: string): string {
  const base = process.env.NEXT_PUBLIC_BASE_PATH?.replace(/\/$/, "") ?? "";
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${base}${normalized}`;
}
