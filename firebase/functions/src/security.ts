import { createHmac } from "node:crypto";
import ipaddr from "ipaddr.js";

export class SubmissionError extends Error {
  constructor(public code: "invalid-argument" | "resource-exhausted" | "already-exists" | "unauthenticated", message: string) { super(message); }
}
export type Inquiry = { id: string; name: string; email: string; focus: string; website: string; message: string };
const focuses = new Set(["A new product", "A better website", "Engineering", "AI & automation", "Something else"]);
const fields = new Set(["id", "name", "email", "focus", "website", "message", "company"]);
const invalid = () => new SubmissionError("invalid-argument", "Please enter your name, a valid email and a short description of your goal.");
export function validateInquiry(input: unknown): Inquiry {
  if (!input || typeof input !== "object" || Array.isArray(input)) throw invalid();
  const body = input as Record<string, unknown>;
  if (Buffer.byteLength(JSON.stringify(body), "utf8") > 16000 || Object.keys(body).some(key => !fields.has(key))) throw invalid();
  for (const key of fields) if (body[key] !== undefined && typeof body[key] !== "string") throw invalid();
  const value = (key: string) => String(body[key] ?? "").normalize("NFC").trim();
  const lead = { id: value("id"), name: value("name"), email: value("email").toLowerCase(), focus: value("focus"), website: value("website"), message: value("message") };
  if (value("company") || !/^[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89ab][a-f0-9]{3}-[a-f0-9]{12}$/i.test(lead.id) ||
      lead.name.length < 2 || lead.name.length > 100 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(lead.email) || lead.email.length > 254 ||
      !focuses.has(lead.focus) || lead.message.length < 10 || lead.message.length > 4000 || lead.website.length > 500 ||
      /[\u0000-\u001f\u007f]/.test(lead.name + lead.email + lead.website) || /[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/.test(lead.message)) throw invalid();
  if (lead.website) {
    try { const url = new URL(lead.website); if (!["http:", "https:"].includes(url.protocol) || url.username || url.password) throw invalid(); }
    catch { throw new SubmissionError("invalid-argument", "Please use a complete website address, such as https://example.com."); }
  }
  return lead;
}
export function digest(secret: string, scope: string, value: string): string {
  return createHmac("sha256", secret).update(`${scope}\0${value}`).digest("hex");
}
export function limitsFor(secret: string, email: string, ip: string, now: number) {
  return [
    { key: digest(secret, "ip-short", ip), span: 600_000, limit: 5 },
    { key: digest(secret, "ip-day", ip), span: 86_400_000, limit: 20 },
    { key: digest(secret, "email-hour", email), span: 3_600_000, limit: 3 },
    { key: "global-day", span: 86_400_000, limit: 100 },
  ].map(item => ({ ...item, window: Math.floor(now / item.span) }));
}

// This endpoint is reached directly through Google's managed Cloud Run ingress.
// Its final forwarded hop is appended by that ingress. Never trust a caller's
// prepended X-Forwarded-For values or Express's unrestricted trust-proxy result.
// Revisit this hop contract before introducing a separate load balancer or CDN.
export function networkIdentity(forwarded: string | undefined): string {
  const address = forwarded?.split(",").at(-1)?.trim();
  if (!address || !ipaddr.isValid(address)) throw new Error("Missing managed ingress address");
  const parsed = ipaddr.process(address);
  if (parsed.kind() === "ipv6") return parsed.toNormalizedString().split(":").slice(0, 4).join(":") + "::/64";
  return parsed.toString();
}
