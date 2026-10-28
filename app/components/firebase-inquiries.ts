"use client";
import config from "./firebase-public-config.json";
import type { Brief } from "./inquiry-form";

let client: Promise<{
  send: (data: Brief & { id: string; company: string }) => Promise<{ data: { id: string } }>;
  chat: (data: {messages: {role: "user" | "assistant"; text: string}[]}) => Promise<{data:{answer:string}}>;
}> | undefined;
async function getClient() {
  if (!config.backendReady) throw new Error("The enquiry service is being configured. Please email hello@dwx.agency.");
  if (!client) client = (async () => {
    const [{ initializeApp, getApps }, { initializeAppCheck, ReCaptchaEnterpriseProvider }, { getFunctions, httpsCallable }] = await Promise.all([
      import("firebase/app"), import("firebase/app-check"), import("firebase/functions"),
    ]);
    const app = getApps().find(app => app.name === "dwx-enquiries") ?? initializeApp(config.firebase, "dwx-enquiries");
    initializeAppCheck(app, { provider: new ReCaptchaEnterpriseProvider(config.recaptchaSiteKey), isTokenAutoRefreshEnabled: false });
    const send = httpsCallable<Brief & { id: string; company: string }, { id: string }>(getFunctions(app, "europe-west1"), "submitInquiry", { limitedUseAppCheckTokens: true, timeout: 25000 });
    const chat = httpsCallable<{messages: {role: "user" | "assistant"; text: string}[]}, {answer:string}>(getFunctions(app, "europe-west1"), "assistantChat", { limitedUseAppCheckTokens: true, timeout: 30000 });
    return { send, chat };
  })().catch(error => { client = undefined; throw error; });
  return client;
}
export async function askAssistant(messages: {role: "user" | "assistant"; text: string}[]) {
  const result = await (await getClient()).chat({messages});
  if (typeof result.data?.answer !== "string") throw new Error("invalid-response");
  return result.data.answer;
}
export async function sendInquiry(data: Brief & { id: string; company: string }) {
  try {
    const result = await (await getClient()).send(data);
    if (!result.data || result.data.id !== data.id) throw new Error("invalid-receipt");
    return result.data;
  } catch (error) {
    const code = (error as { code?: string })?.code;
    if (code === "functions/resource-exhausted") throw new Error("You’ve sent several enquiries recently. Please wait before trying again or email hello@dwx.agency.");
    if (code === "functions/invalid-argument") throw new Error("Please check your name, email and message (at least 10 characters). Use a full website address if supplied.");
    if (code === "functions/unauthenticated" || code === "functions/permission-denied" || code?.startsWith("appCheck/")) throw new Error("We couldn’t complete the security check. Please refresh the page and try again, or email hello@dwx.agency.");
    throw new Error("We couldn’t record your enquiry. Your details are still here. Please try again or email hello@dwx.agency.");
  }
}
