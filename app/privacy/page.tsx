import type { Metadata } from "next";
import { sitePath } from "../site-path";
export const metadata: Metadata = {
  title: "Privacy information | Dwx Agency",
  description:
    "How Dwx uses business enquiries and anonymous website activity counts.",
};
export default function Privacy() {
  return (
    <main className="privacy-page shell">
      <a className="inline-link" href={sitePath("/")}>
        ← Back to Dwx Agency
      </a>
      <span className="eyebrow">PRIVACY INFORMATION</span>
      <h1>
        Your enquiry.
        <br />
        Your information.
      </h1>
      <h2>When you contact us</h2>
      <p>
        We collect the name, email address, project goal and optional website
        address you submit. We store your enquiry so Dwx can review it, contact
        you and discuss a possible project. When email notifications are
        enabled, the enquiry is also sent to Dwx’s configured business inbox
        through our email delivery provider.
      </p>
      <h2>Storage and security checks</h2>
      <p>
        Enquiries are stored privately in Google Firebase in Belgium and are
        scheduled for deletion after 180 days. Automatic deletion may take
        additional time to complete. Only authorised Dwx operators can access
        them. We use Google reCAPTCHA Enterprise and Firebase App Check to
        help prevent spam and automated abuse. Google processes browser and
        device signals for these checks under its privacy policy and terms.
      </p>
      <p>
        Our server uses temporary, keyed hashes of network addresses and email
        addresses to limit repeated submissions. Raw network addresses are not
        stored in enquiry records. Rate-limit records are scheduled for deletion
        within two days. Hosting providers may separately retain security logs.
        See Google’s <a href="https://policies.google.com/privacy">privacy policy</a>
        {" "}and <a href="https://policies.google.com/terms">terms</a>.
      </p>
      <h2>When you use the AI assistant</h2>
      <p>The assistant is AI, not a human operator. Your messages and recent conversation context are sent to Google Vertex AI to generate a reply. This uses Google’s global model endpoint and is separate from enquiry storage in Belgium. Dwx does not store chat transcripts; the conversation stays in page memory until you reset or reload it. Google may process service and security data under its own terms. Do not enter passwords, payment details or sensitive personal information.</p>
      <p>Chat requests use the same browser security checks, temporary keyed network hashes and token replay protection as enquiries, with separate request limits. Replies may be inaccurate and do not create a booking, submit an enquiry or commit either party to a project. Use the contact form or email for a conversation with our team.</p>
      <h2>Website activity</h2>
      <p>
        When aggregate activity measurement is enabled, we count page visits, contact-link clicks, form starts and failed
        submissions to understand which parts of the website help visitors
        contact us. These counts are grouped by day and section. We do not put
        your name, email, message, IP address or a visitor identifier in these
        activity records, and this measurement does not use cookies. The
        browser’s Do Not Track preference disables these activity requests.
      </p>
      <h2>Questions about your information</h2>
      <p>
        Email <a href="mailto:hello@dwx.agency">hello@dwx.agency</a> to ask
        about your enquiry or request correction or deletion of your submitted
        details. We use enquiry information for project discussions; submitting
        the form does not subscribe you to a newsletter.
      </p>
    </main>
  );
}
