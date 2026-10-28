import type { MetadataRoute } from "next";
export default function sitemap(): MetadataRoute.Sitemap {
  const base = (process.env.NEXT_PUBLIC_SITE_URL || "https://dwx.agency").replace(/\/+$/, "");
  const privacyPath = process.env.NEXT_PUBLIC_BASE_PATH ? "/privacy.html" : "/privacy";
  return [
    {
      url: process.env.NEXT_PUBLIC_BASE_PATH ? `${base}/` : base,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${base}${privacyPath}`,
      changeFrequency: "yearly",
      priority: 0.2,
    },
  ];
}
