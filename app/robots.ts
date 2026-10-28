import type { MetadataRoute } from "next";
export default function robots(): MetadataRoute.Robots {
  const base = (process.env.NEXT_PUBLIC_SITE_URL || "https://dwx.agency").replace(/\/+$/, "");
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
  return { rules: { userAgent: "*", allow: `${basePath}/` }, sitemap: `${base}/sitemap.xml` };
}
