import { getCloudflareContext } from "@opennextjs/cloudflare";
import type { VisaBulletinData } from "../../visa-bulletin/types";

const RESEND_BATCH_URL = "https://api.resend.com/emails/batch";
const FROM = "EB3VIET <noreply@eb3viet.com>";

declare global {
  interface CloudflareEnv {
    EMAIL_SUBSCRIBERS: {
      get(key: string): Promise<string | null>;
      put(key: string, value: string): Promise<void>;
    };
    RESEND_API_KEY: string;
    VB_ALERT_SECRET: string;
  }
}

interface Subscriber {
  email: string;
  token: string;
  subscribedAt: string;
}

interface LastSentState {
  month: string;
  tableA: string | null;
  tableB: string | null;
}

function formatDate(iso: string | null): string {
  if (!iso) return "—";
  if (iso === "Current") return "Current";
  try {
    const d = new Date(iso);
    const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    return `${d.getUTCDate().toString().padStart(2,"0")} ${months[d.getUTCMonth()]} ${d.getUTCFullYear()}`;
  } catch {
    return iso;
  }
}

function buildEmailHtml(
  monthLabel: string,
  tableA: string | null,
  tableB: string | null,
  prevTableA: string | null,
  prevTableB: string | null,
  email: string,
  token: string,
): string {
  const unsubUrl = `https://eb3viet.com/api/unsubscribe?email=${encodeURIComponent(email)}&token=${encodeURIComponent(token)}`;
  const aChanged = tableA !== prevTableA;
  const bChanged = tableB !== prevTableB;

  return `<!DOCTYPE html>
<html lang="vi">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f5f5f5;font-family:Arial,sans-serif;">
<div style="max-width:600px;margin:24px auto;background:#fff;border-radius:8px;overflow:hidden;border:1px solid #e5e7eb;">
  <div style="background:#1e40af;padding:20px 24px;">
    <h1 style="margin:0;color:#fff;font-size:18px;font-weight:700;">&#128197; Visa Bulletin C&#7853;p Nh&#7853;t</h1>
    <p style="margin:4px 0 0;color:#bfdbfe;font-size:13px;">EB-3 Other Workers (EW) &mdash; ROW &middot; ${monthLabel}</p>
  </div>
  <div style="padding:24px;">
    <table style="width:100%;border-collapse:collapse;font-size:14px;">
      <thead>
        <tr style="background:#f9fafb;">
          <th style="padding:10px;text-align:left;border:1px solid #e5e7eb;color:#374151;">B&#7843;ng</th>
          <th style="padding:10px;text-align:center;border:1px solid #e5e7eb;color:#6b7280;font-weight:400;">Th&aacute;ng Tr&#432;&#7899;c</th>
          <th style="padding:10px;text-align:center;border:1px solid #e5e7eb;color:#1e40af;font-weight:700;">Th&aacute;ng N&agrave;y</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style="padding:10px;border:1px solid #e5e7eb;font-weight:600;color:#374151;">B&#7843;ng A (Final Action)</td>
          <td style="padding:10px;text-align:center;border:1px solid #e5e7eb;color:#6b7280;">${formatDate(prevTableA)}</td>
          <td style="padding:10px;text-align:center;border:1px solid #e5e7eb;font-weight:700;color:${aChanged ? "#1e40af" : "#374151"};">${formatDate(tableA)}${aChanged ? " &#x2728;" : ""}</td>
        </tr>
        <tr style="background:#f9fafb;">
          <td style="padding:10px;border:1px solid #e5e7eb;font-weight:600;color:#374151;">B&#7843;ng B (Dates for Filing)</td>
          <td style="padding:10px;text-align:center;border:1px solid #e5e7eb;color:#6b7280;">${formatDate(prevTableB)}</td>
          <td style="padding:10px;text-align:center;border:1px solid #e5e7eb;font-weight:700;color:${bChanged ? "#1e40af" : "#374151"};">${formatDate(tableB)}${bChanged ? " &#x2728;" : ""}</td>
        </tr>
      </tbody>
    </table>
    <div style="margin-top:20px;text-align:center;">
      <a href="https://eb3viet.com/visa-bulletin" style="display:inline-block;background:#1e40af;color:#fff;padding:10px 24px;border-radius:6px;text-decoration:none;font-size:14px;font-weight:600;">
        Xem Chi Ti&#7871;t Visa Bulletin &rarr;
      </a>
    </div>
  </div>
  <div style="padding:16px 24px;border-top:1px solid #e5e7eb;background:#f9fafb;">
    <p style="margin:0;font-size:11px;color:#9ca3af;text-align:center;">
      EB3VIET &middot; eb3viet.com &middot;
      <a href="${unsubUrl}" style="color:#9ca3af;">H&#7911;y &#273;&#259;ng k&yacute;</a>
    </p>
  </div>
</div>
</body>
</html>`;
}

export async function POST(request: Request) {
  const { env } = await getCloudflareContext({ async: true });

  const authHeader = request.headers.get("Authorization");
  if (!authHeader || authHeader !== `Bearer ${env.VB_ALERT_SECRET}`) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const raw = await env.VISA_BULLETIN.get("visa-bulletin-data");
  if (!raw) {
    return Response.json({ error: "No VB data in KV" }, { status: 500 });
  }

  const vb = JSON.parse(raw) as VisaBulletinData;
  const latestMonth = [...vb.months].reverse().find(
    (m) => m.table_a !== null || m.table_b !== null,
  );
  if (!latestMonth) {
    return Response.json({ skipped: true, reason: "No published VB data" });
  }

  const lastSentRaw = await env.EMAIL_SUBSCRIBERS.get("vb-alert-last-sent");
  const lastSent: LastSentState | null = lastSentRaw
    ? (JSON.parse(lastSentRaw) as LastSentState)
    : null;

  const noChange =
    lastSent &&
    lastSent.month === latestMonth.month &&
    lastSent.tableA === latestMonth.table_a &&
    lastSent.tableB === latestMonth.table_b;

  if (noChange) {
    return Response.json({ skipped: true, reason: "No change since last alert" });
  }

  const subsRaw = await env.EMAIL_SUBSCRIBERS.get("subscribers");
  const subscribers: Subscriber[] = subsRaw ? (JSON.parse(subsRaw) as Subscriber[]) : [];

  const newState: LastSentState = {
    month: latestMonth.month,
    tableA: latestMonth.table_a,
    tableB: latestMonth.table_b,
  };

  if (subscribers.length === 0) {
    await env.EMAIL_SUBSCRIBERS.put("vb-alert-last-sent", JSON.stringify(newState));
    return Response.json({ sent: 0, reason: "No subscribers" });
  }

  const emails = subscribers.map((sub) => ({
    from: FROM,
    to: [sub.email],
    subject: `Visa Bulletin EB-3 EW (ROW) — ${latestMonth.label}`,
    html: buildEmailHtml(
      latestMonth.label,
      latestMonth.table_a,
      latestMonth.table_b,
      lastSent?.tableA ?? null,
      lastSent?.tableB ?? null,
      sub.email,
      sub.token,
    ),
  }));

  let totalSent = 0;
  for (let i = 0; i < emails.length; i += 100) {
    const batch = emails.slice(i, i + 100);
    const res = await fetch(RESEND_BATCH_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
        "User-Agent": "eb3viet/1.0",
      },
      body: JSON.stringify(batch),
    });
    if (res.ok) {
      totalSent += batch.length;
    } else {
      const err = await res.text();
      console.error("Resend batch error:", res.status, err);
    }
  }

  await env.EMAIL_SUBSCRIBERS.put("vb-alert-last-sent", JSON.stringify(newState));
  return Response.json({ sent: totalSent, month: latestMonth.label });
}
