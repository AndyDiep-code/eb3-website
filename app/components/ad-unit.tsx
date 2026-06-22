"use client";

import { useEffect, useState } from "react";

const ADSENSE_CLIENT_ID = "ca-pub-7593939544196063";

/**
 * Renders the AdSense <ins> unit only after the component has mounted
 * client-side (post-hydration). Avoids the SSR/hydration-mismatch issue
 * where AdSense mutates the <ins> DOM node before React's hydration pass
 * completes (see phase-01 plan's Key Insights — deniapps.com, emile.sh,
 * Next.js scripts guide).
 */
export function AdUnit({ slot }: { slot: string }) {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return null;
  }

  return (
    <ins
      className="adsbygoogle"
      style={{ display: "block" }}
      data-ad-client={ADSENSE_CLIENT_ID}
      data-ad-slot={slot}
      data-ad-format="auto"
      data-full-width-responsive="true"
    />
  );
}
