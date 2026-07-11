import { getCloudflareContext } from "@opennextjs/cloudflare";

declare global {
  interface CloudflareEnv {
    EMAIL_SUBSCRIBERS: {
      get(key: string): Promise<string | null>;
      put(key: string, value: string): Promise<void>;
    };
    VB_ALERT_SECRET: string;
  }
}

interface Subscriber {
  email: string;
  token: string;
  subscribedAt: string;
}

async function hmacToken(email: string, secret: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const sig = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(email));
  return Array.from(new Uint8Array(sig))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export async function POST(request: Request) {
  let email: string;
  try {
    const body = (await request.json()) as { email?: string };
    email = (body.email ?? "").trim().toLowerCase();
  } catch {
    return Response.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return Response.json({ error: "Email không hợp lệ" }, { status: 400 });
  }

  const { env } = await getCloudflareContext({ async: true });

  const subsRaw = await env.EMAIL_SUBSCRIBERS.get("subscribers");
  const subscribers: Subscriber[] = subsRaw ? (JSON.parse(subsRaw) as Subscriber[]) : [];

  if (subscribers.some((s) => s.email === email)) {
    return Response.json({ ok: true, alreadySubscribed: true });
  }

  const token = await hmacToken(email, env.VB_ALERT_SECRET);
  subscribers.push({ email, token, subscribedAt: new Date().toISOString() });

  await env.EMAIL_SUBSCRIBERS.put("subscribers", JSON.stringify(subscribers));
  return Response.json({ ok: true });
}
