import type { MetadataRoute } from "next";
import { pages } from "./docs-content";
import { absoluteDocsUrl } from "./seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const uniqueRoutes = Object.keys(pages).filter((slug) => !(pages[slug].slug !== slug && pages[pages[slug].slug]));
  return [
    {
      url: absoluteDocsUrl("/"),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1
    },
    ...uniqueRoutes.map((slug) => ({
      url: absoluteDocsUrl(`/${slug}`),
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: slug.startsWith("getting-started") ? 0.85 : 0.7
    }))
  ];
}
