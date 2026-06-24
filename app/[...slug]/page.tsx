import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { pages, RenderDocPage } from "../docs-content";
import { docsOgImage } from "../seo";

export function generateStaticParams() {
  return Object.keys(pages).map((slug) => ({ slug: slug.split("/") }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string[] }> }): Promise<Metadata> {
  const { slug } = await params;
  const path = slug.join("/");
  const page = pages[path];
  if (!page) return {};
  const canonicalPath = page.slug !== path && pages[page.slug] ? page.slug : path;
  return {
    title: page.title,
    description: page.description,
    alternates: { canonical: `/${canonicalPath}` },
    openGraph: {
      title: `${page.title} - OpenLeash Docs`,
      description: page.description,
      url: `/${canonicalPath}`,
      type: "article",
      images: [{ url: docsOgImage, width: 512, height: 512, alt: "OpenLeash Docs" }]
    },
    twitter: {
      card: "summary_large_image",
      title: `${page.title} - OpenLeash Docs`,
      description: page.description,
      images: [docsOgImage]
    }
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params;
  const path = slug.join("/");
  const page = pages[path];
  if (!page) notFound();
  return <RenderDocPage page={page} activePath={path} />;
}
