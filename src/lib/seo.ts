import { Metadata } from "next";
import { siteConfig } from "./config";

export const buildMetadata = (title: string, description: string, path = ""): Metadata => ({
  title,
  description,
  metadataBase: new URL(siteConfig.baseUrl),
  alternates: { canonical: path || "/" },
  openGraph: {
    title,
    description,
    url: `${siteConfig.baseUrl}${path}`,
    siteName: siteConfig.name,
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title,
    description
  }
});
