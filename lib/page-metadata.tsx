import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema, softwareApplicationSchema } from "@/lib/schema";
import { openGraphForPage } from "@/lib/site";

export function buildPageMetadata(options: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  return {
    title: options.title,
    description: options.description,
    alternates: { canonical: options.path },
    openGraph: openGraphForPage(options),
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
