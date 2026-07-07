import type { Metadata } from "next";
import { Layout } from "../components/page-layout";
import { SIDEBAR_GROUPS } from "../components/sidebar-data";
import { FamilyPetitionContent } from "./family-petition-content";

export const metadata: Metadata = {
  title: "Bảo Lãnh Vợ/Chồng Và Con | EB3VIET",
  description:
    "Hướng dẫn bảo lãnh gia đình cho người đi diện EB-3: derivative beneficiary, Form I-130, quy trình, chi phí, timeline, và các tình huống đặc biệt như con trên 21 tuổi (CSPA).",
  alternates: {
    canonical: "https://eb3viet.com/family-petition",
  },
  openGraph: {
    title: "Bảo Lãnh Vợ/Chồng Và Con | EB3VIET",
    description:
      "Hướng dẫn bảo lãnh gia đình cho người đi diện EB-3: derivative beneficiary, Form I-130, quy trình, chi phí, timeline, và các tình huống đặc biệt như con trên 21 tuổi (CSPA).",
    url: "https://eb3viet.com/family-petition",
    siteName: "EB3VIET",
    images: ["https://eb3viet.com/og-image.png"],
    locale: "vi_VN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bảo Lãnh Vợ/Chồng Và Con | EB3VIET",
    description:
      "Hướng dẫn bảo lãnh gia đình cho người đi diện EB-3: derivative beneficiary, Form I-130, quy trình, chi phí, timeline, và các tình huống đặc biệt như con trên 21 tuổi (CSPA).",
    images: ["https://eb3viet.com/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function FamilyPetitionPage() {
  return (
    <Layout sidebarGroups={SIDEBAR_GROUPS}>
      <div className="w-full">
        <h1 className="text-2xl font-bold text-text">
          👨‍👩‍👧 Bảo Lãnh Vợ/Chồng Và Con
        </h1>
        <p className="mt-2 text-text-muted">
          Derivative beneficiary · Form I-130 · Quy trình &amp; chi phí ·
          CSPA cho con trên 21 tuổi
        </p>

        <FamilyPetitionContent />
      </div>
    </Layout>
  );
}
