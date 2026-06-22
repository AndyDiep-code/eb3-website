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

rmSync(PUBLIC_DIR, { recursive: true, force: true });
mkdirSync(PUBLIC_DIR);

const htmlFiles = readdirSync(ROOT).filter((name) => name.endsWith(".html"));

for (const name of htmlFiles) {
  copyFileSync(join(ROOT, name), join(PUBLIC_DIR, name));
}

console.log(`sync-public-html: mirrored ${htmlFiles.length} .html files into public/`);
