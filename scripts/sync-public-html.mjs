// Mirrors every root-level *.html file into public/ so Next.js bundles them
// into the OpenNext build (public/ is the only directory Next.js auto-copies
// into its static output). Runs fresh before every build/preview/deploy —
// public/ is a generated artifact (gitignored), never hand-edited, so the
// root .html files (still the live source of truth until each page migrates
// to a real Next.js route in Phase 6) can never silently drift out of sync.
import { readdirSync, copyFileSync, mkdirSync, rmSync } from "node:fs";
import { join } from "node:path";

const ROOT = process.cwd();
const PUBLIC_DIR = join(ROOT, "public");

// Non-.html root files that also need to be served at the domain root
// (AdSense's ads.txt validator and search-engine sitemap discovery both
// require these at the exact root path, not under /public/ in source).
const EXTRA_ROOT_FILES = ["sitemap.xml", "ads.txt"];

rmSync(PUBLIC_DIR, { recursive: true, force: true });
mkdirSync(PUBLIC_DIR);

const htmlFiles = readdirSync(ROOT).filter((name) => name.endsWith(".html"));

for (const name of htmlFiles) {
  copyFileSync(join(ROOT, name), join(PUBLIC_DIR, name));
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

console.log(`sync-public-html: mirrored ${htmlFiles.length} .html files + ${extraCount} extra files into public/`);
