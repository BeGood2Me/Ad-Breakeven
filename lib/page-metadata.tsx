import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema, softwareApplicationSchema } from "@/lib/schema";
import { openGraphForPage } from "@/lib/site";

export function buildPageMetadata(options: {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  publishedTime?: string;
  modifiedTime?: string;
  ogType?: "website" | "article";
}): Metadata {
  const openGraph = {
    ...openGraphForPage(options),
    ...(options.ogType ? { type: options.ogType } : {}),
    ...(options.publishedTime ? { publishedTime: options.publishedTime } : {}),
    ...(options.modifiedTime ? { modifiedTime: options.modifiedTime } : {}),
  };

  return {
    title: options.title,
    description: options.description,
    ...(options.keywords?.length ? { keywords: options.keywords } : {}),
    alternates: { canonical: options.path },
    openGraph,
    twitter: {
      card: "summary_large_image",
      title: options.title,
      description: options.description,
    },
  };
}

interface CalculatorJsonLdProps {
  title: string;
  description: string;
  path: string;
  parent?: { name: string; path: string };
}

export function CalculatorJsonLd({
  title,
  description,
  path,
  parent,
}: CalculatorJsonLdProps) {
  const crumbs = [
    { name: "Home", path: "/" },
    ...(parent ? [parent] : []),
    { name: title, path },
  ];

  return (
    <>
      <JsonLd data={breadcrumbSchema(crumbs)} />
      <JsonLd
        data={softwareApplicationSchema({ name: title, description, path })}
      />
    </>
  );
}
