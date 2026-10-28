import { initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { onCall, HttpsError } from "firebase-functions/v2/https";
import { defineSecret } from "firebase-functions/params";
import { logger } from "firebase-functions";
import { validateInquiry, SubmissionError, networkIdentity } from "./security.js";
import { storeInquiry } from "./store.js";

initializeApp();
export { assistantChat } from "./chat.js";
const hmacKey = defineSecret("INQUIRY_HMAC_KEY");
const origins = ["https://dwx.agency", "https://www.dwx.agency", "https://dwx-agency-leads.web.app", "https://dwx-agency-leads.firebaseapp.com"];
const emulator = process.env.FUNCTIONS_EMULATOR === "true";
if (emulator) origins.push("http://localhost:3000", "http://127.0.0.1:3000");

export const submitInquiry = onCall({
  region: "europe-west1", memory: "256MiB", cpu: "gcf_gen1", concurrency: 1,
  minInstances: 0, maxInstances: 2, timeoutSeconds: 20,
  serviceAccount: "dwx-inquiries@dwx-agency-leads.iam.gserviceaccount.com",
  enforceAppCheck: true, consumeAppCheckToken: true,
  cors: origins, secrets: [hmacKey],
}, async request => {
  request.rawRequest.res?.set({ "Cache-Control": "no-store", "X-Content-Type-Options": "nosniff" });
  // CORS controls browsers; this explicit check also rejects disallowed origins in direct calls.
  if (!origins.includes(request.rawRequest.get("origin") ?? "")) throw new HttpsError("permission-denied", "Request not allowed.");
  if (!request.app || request.app.appId !== "1:216254759943:web:5900435f3a1b0275cf96a2" || request.app.alreadyConsumed) throw new HttpsError("unauthenticated", "Please refresh the page and try again.");
  if (request.rawRequest.rawBody.byteLength > 18000) throw new HttpsError("invalid-argument", "Your enquiry is too large.");
  try {
    return await storeInquiry(getFirestore(), validateInquiry(request.data), networkIdentity(request.rawRequest.get("x-forwarded-for")), hmacKey.value(), request.rawRequest.get("x-firebase-appcheck") ?? "");
  } catch (error) {
    if (error instanceof SubmissionError) {
      if (error.code === "resource-exhausted") request.rawRequest.res?.set("Retry-After", "3600");
      throw new HttpsError(error.code, error.message);
    }
    // Do not log names, email addresses, messages, request bodies or bearer tokens.
    logger.error("inquiry_store_failed");
    throw new HttpsError("unavailable", "We couldn’t record your enquiry. Please try again or email hello@dwx.agency.");
  }
});
