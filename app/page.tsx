import type { Metadata } from "next";
import { HomePage } from "./docs-content";
import { docsDescription, docsOgImage, docsTitle } from "./seo";

export const metadata: Metadata = {
  title: docsTitle,
  description: docsDescription,
  alternates: { canonical: "/" },
  openGraph: {
    title: docsTitle,
    description: docsDescription,
    url: "/",
    type: "website",
    images: [{ url: docsOgImage, width: 512, height: 512, alt: "OpenLeash Docs" }]
  },
  twitter: {
    card: "summary_large_image",
    title: docsTitle,
    description: docsDescription,
    images: [docsOgImage]
  }
};

export default function Page() {
  return <HomePage />;
}
