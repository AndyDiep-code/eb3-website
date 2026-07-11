import { getVisaBulletinData } from "../../visa-bulletin/get-visa-bulletin-data";

// Edge-cache window: data updates at most ~daily (GH Actions cron), so a
// few minutes of edge caching avoids hammering KV reads on every page view
// without risking meaningfully stale data.
const CACHE_CONTROL = "public, max-age=300, s-maxage=300";

export async function GET() {
  const data = await getVisaBulletinData();
  return Response.json(data, {
    headers: { "Cache-Control": CACHE_CONTROL },
  });
}
