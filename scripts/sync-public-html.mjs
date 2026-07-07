// Mirrors root-level *.html files into public/ so Next.js bundles them.
// Skips any HTML file that has a corresponding app/<name>/page.tsx —
// those routes are served by Next.js and the static file would shadow them
// (Cloudflare assets html_handling serves about.html at /about, which
// takes priority over the worker unless listed in run_worker_first).
import { readdirSync, copyFileSync, mkdirSync, rmSync, existsSync } from "node:fs";
import { join } from "node:path";

const ROOT = process.cwd();
const PUBLIC_DIR = join(ROOT, "public");

const EXTRA_ROOT_FILES = ["sitemap.xml", "ads.txt"];

rmSync(PUBLIC_DIR, { recursive: true, force: true });
mkdirSync(PUBLIC_DIR);

const htmlFiles = readdirSync(ROOT).filter((name) => name.endsWith(".html"));

let copied = 0;
let skipped = 0;
for (const name of htmlFiles) {
  const basename = name.replace(/\.html$/, "");
  // index.html maps to / which is served by app/page.tsx (not app/index/page.tsx)
  const isIndexPage = basename === "index" && existsSync(join(ROOT, "app", "page.tsx"));
  if (isIndexPage || existsSync(join(ROOT, "app", basename, "page.tsx"))) {
    skipped++;
    continue; // Next.js route owns this URL — don't shadow it
  }
  copyFileSync(join(ROOT, name), join(PUBLIC_DIR, name));
  copied++;
}

let extraCount = 0;
for (const name of EXTRA_ROOT_FILES) {
  try {
    copyFileSync(join(ROOT, name), join(PUBLIC_DIR, name));
    extraCount++;
  } catch {
    console.warn(`sync-public-html: WARN ${name} not found at repo root, skipped`);
  }
}

console.log(`sync-public-html: copied ${copied} html files, skipped ${skipped} (have Next.js route), +${extraCount} extra`);
