import { Timestamp, type Firestore } from "firebase-admin/firestore";
import { digest, limitsFor, SubmissionError, type Inquiry } from "./security.js";

export async function storeInquiry(db: Firestore, lead: Inquiry, ip: string, secret: string, token: string, now = Date.now()) {
  if (secret.length < 32 || !ip || !token) throw new Error("Missing secure server configuration");
  const receipt = digest(secret, "receipt", `${lead.email}\0${lead.id}`);
  const fingerprint = digest(secret, "payload", JSON.stringify(lead));
  const record = db.collection("inquiries").doc(receipt);
  const usedToken = db.collection("usedTokens").doc(digest(secret, "appcheck-token", token));
  const tokenExpiry = { expiresAt: Timestamp.fromMillis(now + 86_400_000) };
  const limits = limitsFor(secret, lead.email, ip, now);
  return db.runTransaction(async transaction => {
    const [previous, consumed] = await transaction.getAll(record, usedToken);
    if (consumed.exists) throw new SubmissionError("unauthenticated", "Please refresh the page and try again.");
    if (previous.exists) {
      if (previous.get("fingerprint") !== fingerprint) throw new SubmissionError("already-exists", "Please send this changed enquiry with a new reference.");
      transaction.create(usedToken, tokenExpiry);
      return { id: lead.id };
    }
    const references = limits.map(item => db.collection("rateLimits").doc(`${item.key}-${item.window}`));
    const counters = await transaction.getAll(...references);
    if (counters.some((snapshot, i) => Number(snapshot.get("count") || 0) >= limits[i].limit))
      throw new SubmissionError("resource-exhausted", "You’ve sent several enquiries recently. Please wait before trying again or email hello@dwx.agency.");
    counters.forEach((snapshot, i) => transaction.set(references[i], {
      count: Number(snapshot.get("count") || 0) + 1,
      expiresAt: Timestamp.fromMillis((limits[i].window + 1) * limits[i].span + 86_400_000),
    }));
    transaction.create(usedToken, tokenExpiry);
    transaction.create(record, {
      ...lead, fingerprint, status: "new", createdAt: Timestamp.fromMillis(now),
      expiresAt: Timestamp.fromMillis(now + 180 * 86_400_000),
    });
    return { id: lead.id };
  });
}
