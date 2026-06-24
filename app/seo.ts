export const docsUrl = (process.env.NEXT_PUBLIC_DOCS_SITE_URL ?? process.env.NEXT_PUBLIC_SITE_URL ?? "https://docs.openleash.com").replace(/\/+$/, "");
export const mainSiteUrl = (process.env.NEXT_PUBLIC_MAIN_SITE_URL ?? "https://openleash.com").replace(/\/+$/, "");
export const docsTitle = "OpenLeash Docs";
export const docsDescription = "Install, configure, deploy, and operate OpenLeash for AI coding agents.";
export const docsOgImage = "/openleash-icon.png";

export function absoluteDocsUrl(path = "/") {
  return new URL(path, `${docsUrl}/`).toString();
}
