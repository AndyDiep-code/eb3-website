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

export async function GET(request: Request) {
  const url = new URL(request.url);
  const email = url.searchParams.get("email") ?? "";
  const token = url.searchParams.get("token") ?? "";

  if (!email || !token) {
    return new Response("Link hủy đăng ký không hợp lệ.", { status: 400 });
  }

  const { env } = await getCloudflareContext({ async: true });

  const expected = await hmacToken(email, env.VB_ALERT_SECRET);
  if (token !== expected) {
    return new Response("Token không hợp lệ.", { status: 403 });
  }

  const subsRaw = await env.EMAIL_SUBSCRIBERS.get("subscribers");
  const subscribers: Subscriber[] = subsRaw ? (JSON.parse(subsRaw) as Subscriber[]) : [];
  const filtered = subscribers.filter((s) => s.email !== email);

  await env.EMAIL_SUBSCRIBERS.put("subscribers", JSON.stringify(filtered));

  return new Response(
    `<!DOCTYPE html><html lang="vi"><head><meta charset="UTF-8"><title>Đã hủy đăng ký</title><meta http-equiv="refresh" content="3;url=https://eb3viet.com/visa-bulletin"></head><body style="font-family:sans-serif;text-align:center;padding:60px 20px;"><h2>Đã hủy đăng ký thành công.</h2><p>Bạn sẽ không còn nhận email thông báo Visa Bulletin nữa.</p><p><a href="https://eb3viet.com/visa-bulletin">← Về Visa Bulletin</a></p></body></html>`,
    { headers: { "Content-Type": "text/html;charset=UTF-8" } },
  );
}
