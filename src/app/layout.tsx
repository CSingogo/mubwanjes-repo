import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/widgets/navbar";
import { Footer } from "@/widgets/footer";
import { site } from "@/lib/site";
import { imageUrl } from "@/lib/cloudinary";
import { media } from "@/data/media";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const ogImage = imageUrl(media.footer, {
  width: 1200,
  height: 630,
  gravity: "center",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com"
  ),
  title: {
    default: site.name,
    template: `%s — ${site.shortName}`,
  },
  description: site.description,
  applicationName: site.shortName,
  keywords: [
    "AURA",
    "image of God",
    "heavyweight tee",
    "made to order",
    "streetwear",
    "premium t-shirt",
  ],
  authors: [{ name: site.shortName }],
  creator: site.shortName,
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: site.name,
    title: site.name,
    description: site.description,
    images: [
      {
        url: ogImage,
        width: 1200,
        height: 630,
        alt: `${site.shortName} campaign`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: site.name,
    description: site.description,
    images: [ogImage],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-surface text-ink">
        <ThemeProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
