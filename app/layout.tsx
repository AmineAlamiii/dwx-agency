import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { headers } from "next/headers";
import "./globals.css";
import "./components/conversion.css";

const geist = Geist({ variable: "--font-dwx", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-mono", subsets: ["latin"] });

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = process.env.DWX_FIREBASE_HOSTING === "1" ? new Headers() : await headers();
  const host = requestHeaders.get("host") ?? "dwx.agency";
  const protocol = requestHeaders.get("x-forwarded-proto") ?? (host.includes("localhost") ? "http" : "https");
  const base = new URL(process.env.NEXT_PUBLIC_SITE_URL || `${protocol}://${host}`);
  const socialImage = new URL("/og.png", base).toString();
  return {
    metadataBase: base,
    title: "Dwx Agency | Websites, Software & Business Automation",
    description: "Dwx builds business websites, online stores, custom software and useful AI automation. Based in Casablanca, working worldwide.",
    keywords: ["digital product agency", "product design", "software engineering", "AI automation", "web development", "Morocco agency"],
    openGraph: {
      title: "Dwx Agency — Digital products that perform.",
      description: "Websites, online stores and software that help businesses attract customers and simplify work.",
      type: "website",
      siteName: "Dwx Agency",
      images: [{ url: socialImage, width: 1736, height: 907, alt: "Dwx Agency — Digital products that perform." }],
    },
    twitter: { card: "summary_large_image", title: "Dwx Agency — Digital products that perform.", description: "Websites, online stores and software that help businesses attract customers and simplify work.", images: [socialImage] },
    icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const schema = { "@context": "https://schema.org", "@type": "Organization", name: "Dwx Agency", description: "Digital product agency for strategy, design, engineering and AI", url: process.env.NEXT_PUBLIC_SITE_URL || "https://dwx.agency", knowsAbout: ["Product Strategy","Product Design","Software Engineering","Cloud Infrastructure","Artificial Intelligence","Digital Transformation"] };
  return <html lang="en"><body className={`${geist.variable} ${geistMono.variable}`}><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(schema)}}/>{children}</body></html>;
}
