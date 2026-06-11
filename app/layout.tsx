import type { Metadata } from "next";
import "./styles.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:9306";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "OpenLeash Docs",
    template: "%s - OpenLeash Docs"
  },
  description: "Install, configure, and operate OpenLeash for AI agents.",
  openGraph: {
    title: "OpenLeash Docs",
    description: "Documentation for the open-source control plane for AI agents.",
    url: siteUrl,
    siteName: "OpenLeash Docs",
    type: "website"
  },
  robots: {
    index: true,
    follow: true
  },
  icons: {
    icon: "/favicon.png"
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  );
}
