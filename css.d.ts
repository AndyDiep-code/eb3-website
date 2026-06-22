// Ambient module declaration for plain (non-CSS-Module) side-effect CSS
// imports, e.g. `import "./globals.css"` in app/layout.tsx. Next.js's own
// next-env.d.ts only declares `*.module.css`; this covers the global-CSS
// case, which TypeScript 6.x's stricter side-effect-import resolution
// otherwise flags (see microsoft/TypeScript#63181).
declare module "*.css";
