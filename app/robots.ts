import type { MetadataRoute } from "next";
import { absoluteDocsUrl, docsUrl } from "./seo";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/"
    },
    sitemap: absoluteDocsUrl("/sitemap.xml"),
    host: docsUrl
  };
}
