import type { MetadataRoute } from "next";
export default function sitemap(): MetadataRoute.Sitemap { return [{ url: "https://nexora-it.example", lastModified: new Date(), changeFrequency: "monthly", priority: 1 }]; }
