"use client";

import { useRef, useState, type FormEvent } from "react";
import { ArrowUpRight, Check, LoaderCircle } from "lucide-react";
import { trackConversion } from "./lead-tracking";
import { sendInquiry } from "./firebase-inquiries";
import { privacyPagePath } from "../site-path";

export type Brief = {
  name: string;
  email: string;
  focus: string;
  message: string;
  website: string;
};

export function InquiryForm({ initial }: { initial: Brief }) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [receipt, setReceipt] = useState<string | null>(null);
  const [saved, setSaved] = useState(initial);
  const submissionId = useRef<string | null>(null);
  const previousPayload = useRef<string | null>(null);
  const started = useRef(false);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy) return;
    const data = new FormData(event.currentTarget);
    const values = {
      name: String(data.get("name") || ""),
      email: String(data.get("email") || ""),
      focus: String(data.get("focus") || ""),
      message: String(data.get("message") || ""),
      website: String(data.get("website") || ""),
    };
    setSaved(values);
    setBusy(true);
    setError("");
    const payload = JSON.stringify(values);
    if (previousPayload.current !== payload) {
      submissionId.current = crypto.randomUUID();
      previousPayload.current = payload;
    }
    try {
      const result = await sendInquiry({
        ...values,
        id: submissionId.current!,
        company: String(data.get("company") || ""),
      });
      setReceipt(result.id);
    } catch (caught) {
      setError(
        caught instanceof Error
          ? caught.message
          : "Please try again or email hello@dwx.agency.",
      );
      trackConversion("inquiry_error");
    } finally {
      setBusy(false);
    }
  }
  if (receipt)
    return (
      <div className="inquiry-receipt" role="status">
        <span className="receipt-check">
          <Check size={24} />
        </span>
        <span className="eyebrow">ENQUIRY RECEIVED</span>
        <h3>A good next step.</h3>
        <p>
          Thank you, {saved.name.split(" ")[0]}. Your enquiry has been recorded.
          We’ll review your goals and contact you at{" "}
          <strong>{saved.email}</strong> to discuss the next step.
        </p>
        <div className="receipt-next">
          <span>WHAT HAPPENS NEXT</span>
          <ol>
            <li>We review what you want to improve.</li>
            <li>We discuss the right scope together.</li>
            <li>You receive a proposal before committing.</li>
          </ol>
        </div>
        <small>Reference: {receipt.slice(0, 8).toUpperCase()}</small>
        <a className="inline-link" href="#work">
          Explore what we can build
          <ArrowUpRight size={16} />
        </a>
      </div>
    );
  return (
    <form
      method="post"
      action="/api/inquiries"
      onSubmit={submit}
      onFocus={() => {
        if (!started.current) {
          started.current = true;
          trackConversion("form_started");
        }
      }}
      aria-label="Business enquiry"
    >
      <div className="form-row">
        <label htmlFor="contact-name">
          Your name
          <input
            id="contact-name"
            name="name"
            autoComplete="name"
            defaultValue={initial.name}
            required
            maxLength={100}
            minLength={2}
            placeholder="Full name"
          />
        </label>
        <label htmlFor="contact-email">
          Email address
          <input
            id="contact-email"
            name="email"
            autoComplete="email"
            defaultValue={initial.email}
            type="email"
            required
            maxLength={254}
            placeholder="you@company.com"
          />
        </label>
      </div>
      <fieldset>
        <legend>What would you like to do?</legend>
        <div className="focus-options">
          {[
            "A new product",
            "A better website",
            "Engineering",
            "AI & automation",
            "Something else",
          ].map((x) => (
            <label key={x}>
              <input
                type="radio"
                name="focus"
                value={x}
                defaultChecked={x === initial.focus}
              />
              <span>
                {(
                  {
                    Engineering: "Custom software",
                    "AI & automation": "Less manual work",
                    "Something else": "Not sure yet",
                  } as Record<string, string>
                )[x] || x}
              </span>
            </label>
          ))}
        </div>
      </fieldset>
      <label htmlFor="contact-message">
        What would make a difference?
        <textarea
          id="contact-message"
          name="message"
          defaultValue={initial.message}
          required
          maxLength={4000}
          minLength={10}
          rows={4}
          placeholder="More enquiries? Easier bookings? Less admin? Tell us what you want to change."
        />
      </label>
      <details className="inquiry-optional" open={Boolean(initial.website)}>
        <summary>
          Add your current website <span>Optional</span>
        </summary>
        <label htmlFor="contact-website">
          <span>
            Your website <small className="optional-label">Optional</small>
          </span>
          <input
            id="contact-website"
            name="website"
            type="url"
            defaultValue={initial.website}
            maxLength={500}
            placeholder="https://yourbusiness.com"
            autoComplete="url"
          />
        </label>
      </details>
      <div className="form-honeypot" aria-hidden="true">
        <label>
          Company
          <input name="company" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      {error && (
        <div className="inquiry-error" role="alert">
          <p>{error}</p>
          <a href="mailto:hello@dwx.agency">
            Email Dwx instead
            <ArrowUpRight size={14} />
          </a>
        </div>
      )}
      <div className="form-bottom">
        <button type="submit" className="pill" disabled={busy}>
          {busy ? "Sending your enquiry…" : "Send my enquiry"}
          {busy ? (
            <LoaderCircle className="sending-spin" size={16} />
          ) : (
            <ArrowUpRight size={16} />
          )}
        </button>
        <small>
          No detailed brief needed.
          <br />
          No commitment to start a project.
        </small>
      </div>
      <p className="form-privacy">
        We use your details to review and respond to your enquiry.{" "}
        <a href={privacyPagePath()}>Privacy information</a>
        <br />
        Protected by Google reCAPTCHA. Google’s{" "}
        <a href="https://policies.google.com/privacy">Privacy Policy</a> and{" "}
        <a href="https://policies.google.com/terms">Terms of Service</a> apply.
      </p>
    </form>
  );
}
