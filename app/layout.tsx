import type { Metadata } from "next";
import { Be_Vietnam_Pro } from "next/font/google";
import "./globals.css";

// Be Vietnam Pro ships as static weights only (no variable font axis),
// so explicit weights must be listed. 400/500/600/700 cover body copy,
// emphasis, subheadings, and headings used across the site.
const beVietnamPro = Be_Vietnam_Pro({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-be-vietnam-pro",
  display: "swap",
});

export const metadata: Metadata = {
  title: "EB3 Vietnam",
  description: "EB-3 visa guidance and resources for Vietnamese workers.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={beVietnamPro.variable}>
      <body className="font-sans bg-bg text-text">{children}</body>
    </html>
  );
}
