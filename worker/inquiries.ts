interface Statement {
  bind(...values: unknown[]): Statement;
  first<T>(): Promise<T | null>;
  run(): Promise<unknown>;
}
export interface LeadEnvironment {
  DB?: { prepare(sql: string): Statement };
}
const events = new Set([
  "page_view",
  "contact_clicked",
  "form_started",
  "inquiry_error",
]);
const sources = new Set([
  "general",
  "navigation",
  "top",
  "growth",
  "services",
  "work",
  "about",
  "review",
  "process",
  "engagement",
  "contact",
]);
const json = (body: unknown, status = 200) =>
  Response.json(body, {
    status,
    headers: {
      "Cache-Control": "no-store",
      "X-Content-Type-Options": "nosniff",
    },
  });

async function readJSON(request: Request): Promise<Record<string, unknown>> {
  const reader = request.body?.getReader();
  if (!reader) throw new Error("empty");
  const chunks: Uint8Array[] = [];
  let length = 0;
  while (true) {
    const { value, done } = await reader.read();
    if (done) break;
    length += value.length;
    if (length > 16000) {
      await reader.cancel();
      throw new Error("large");
    }
    chunks.push(value);
  }
  const buffer = new Uint8Array(length);
  let offset = 0;
  for (const chunk of chunks) {
    buffer.set(chunk, offset);
    offset += chunk.length;
  }
  const body = JSON.parse(new TextDecoder().decode(buffer));
  if (!body || typeof body !== "object" || Array.isArray(body))
    throw new Error("invalid");
  return body;
}

function permitted(request: Request): Response | null {
  if (request.method !== "POST")
    return json({ error: "Method not allowed." }, 405);
  const origin = request.headers.get("origin");
  if (origin && origin !== new URL(request.url).origin)
    return json({ error: "Request not allowed." }, 403);
  if (!request.headers.get("content-type")?.startsWith("application/json"))
    return json({ error: "Use a JSON request." }, 415);
  return null;
}

// Retired: an unprotected legacy path must never bypass Firebase App Check or rate limits.
export async function handleInquiry(): Promise<Response> {
  return json({ error: "This endpoint has been retired. Please use the website contact form." }, 410);
}

export async function handleEvent(
  request: Request,
  env: LeadEnvironment,
): Promise<Response> {
  const blocked = permitted(request);
  if (blocked) return blocked;
  try {
    const body = await readJSON(request);
    const event = String(body.event || "");
    const source = String(body.source || "general");
    if (!events.has(event) || !sources.has(source))
      return json({ error: "Unknown event." }, 400);
    if (env.DB)
      await env.DB.prepare(
        "INSERT INTO conversion_daily (day, event, source, count) VALUES (?, ?, ?, 1) ON CONFLICT(day, event, source) DO UPDATE SET count = count + 1",
      )
        .bind(new Date().toISOString().slice(0, 10), event, source)
        .run();
    return new Response(null, {
      status: 204,
      headers: { "Cache-Control": "no-store" },
    });
  } catch {
    return new Response(null, { status: 503 });
  }
}
