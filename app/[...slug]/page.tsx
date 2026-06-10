import { notFound } from "next/navigation";
import { pages, RenderDocPage } from "../docs-content";

export function generateStaticParams() {
  return Object.keys(pages).map((slug) => ({ slug: slug.split("/") }));
}

export default async function Page({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params;
  const path = slug.join("/");
  const page = pages[path];
  if (!page) notFound();
  return <RenderDocPage page={page} activePath={path} />;
}
