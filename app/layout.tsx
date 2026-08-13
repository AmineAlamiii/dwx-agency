import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { headers } from "next/headers";
import "./globals.css";

const geist = Geist({ variable: "--font-geist", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-mono", subsets: ["latin"] });

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("host") ?? "nexora-it.example";
  const protocol = requestHeaders.get("x-forwarded-proto") ?? (host.includes("localhost") ? "http" : "https");
  const base = new URL(`${protocol}://${host}`);
  const socialImage = new URL("/og.png", base).toString();
  return {
    metadataBase: base,
    title: "NEXORA IT | Web, Software, Cloud, Cybersecurity & AI Agency",
    description: "NEXORA is a full-service IT agency delivering web development, custom software, cloud infrastructure, cybersecurity, AI solutions and managed IT services.",
    keywords: ["IT agency", "web development", "custom software", "cloud", "cybersecurity", "AI automation", "managed IT"],
    openGraph: {
      title: "NEXORA IT — We Build. We Secure. We Scale.",
      description: "One expert technology team for web, software, cloud, cybersecurity and AI.",
      type: "website",
      siteName: "NEXORA IT",
      images: [{ url: socialImage, width: 1736, height: 907, alt: "NEXORA IT — We Build. We Secure. We Scale." }],
    },
    twitter: { card: "summary_large_image", title: "NEXORA IT — We Build. We Secure. We Scale.", description: "One expert technology team for web, software, cloud, cybersecurity and AI.", images: [socialImage] },
    icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const schema = { "@context": "https://schema.org", "@type": "Organization", name: "NEXORA IT", description: "Full-service international technology agency", url: "https://nexora-it.example", knowsAbout: ["Web Development","Custom Software","Cloud Infrastructure","Cybersecurity","Artificial Intelligence","Managed IT Services"] };
  return <html lang="en"><body className={`${geist.variable} ${geistMono.variable}`}><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(schema)}}/>{children}</body></html>;
}
