// ─── Timeline Estimator page (server component) ──────────────────────────────
// Passes static VB data as initialData so first render is instant.

import staticVbData from "../../data/visa-bulletin.json";
import type { VisaBulletinData } from "../visa-bulletin/types";
import { TimelineEstimator } from "../components/timeline-estimator";
import { Layout } from "../components/page-layout";
import { SIDEBAR_GROUPS } from "../components/sidebar-data";

export const metadata = { title: "Timeline Ước Tính — EB3VIET" };

export default function TimelineEstimatorPage() {
  return (
    <Layout sidebarGroups={SIDEBAR_GROUPS}>
      <div className="mx-auto w-full max-w-2xl">
        <TimelineEstimator initialData={staticVbData as VisaBulletinData} />
      </div>
    </Layout>
  );
}
