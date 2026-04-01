import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/config";

const routes = ["", "/about", "/memberships", "/spa", "/rules", "/faq", "/contact", "/join"];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({ url: `${siteConfig.baseUrl}${route}`, lastModified: new Date() }));
}
