/** @type {import('next').NextConfig} */
const nextConfig = {};

module.exports = nextConfig;

// Only run in local dev — calling this during `next build` (NODE_ENV=production)
// causes miniflare to scan wrangler.jsonc's assets directory (set to "."),
// hitting the 112 MiB webpack cache file and crashing the CI build.
if (process.env.NODE_ENV !== "production") {
  const { initOpenNextCloudflareForDev } = require("@opennextjs/cloudflare");
  initOpenNextCloudflareForDev();
}
