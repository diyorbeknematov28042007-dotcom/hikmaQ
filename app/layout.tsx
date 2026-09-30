import type { Metadata } from "next";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "http://localhost:3000");

export const metadata: Metadata = {
  title: "HIKMA — Raqamli mahsulotlar studiyasi",
  description: "HIKMA biznes va g‘oyalarni zamonaviy veb-saytlar, web ilovalar, Telegram mahsulotlari, AI integratsiyalar va MVP’larga aylantiradi.",
  metadataBase: new URL(siteUrl),
  openGraph: {
    title: "HIKMA — Raqamli mahsulotlar studiyasi",
    description: "G‘oyani kuchli raqamli mahsulotga aylantiramiz.",
    url: "/",
    siteName: "HIKMA",
    locale: "uz_UZ",
    type: "website",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "HIKMA" }]
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="uz"><body>{children}</body></html>;
}
