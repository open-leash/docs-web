import type { Metadata } from "next";
import "./styles.css";
import { docsDescription, docsOgImage, docsTitle, docsUrl } from "./seo";

export const metadata: Metadata = {
  metadataBase: new URL(docsUrl),
  title: {
    default: docsTitle,
    template: "%s - Leash Docs"
  },
  description: docsDescription,
  alternates: { canonical: "/" },
  openGraph: {
    title: docsTitle,
    description: docsDescription,
    url: docsUrl,
    siteName: docsTitle,
    type: "website",
    images: [{ url: docsOgImage, width: 1024, height: 1024, alt: "Leash Docs" }]
  },
  twitter: {
    card: "summary_large_image",
    title: docsTitle,
    description: docsDescription,
    images: [docsOgImage]
  },
  robots: {
    index: true,
    follow: true
  },
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/openleash-icon.png"
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  );
}
