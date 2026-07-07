import type { Metadata } from "next";
import { Layout } from "../components/page-layout";
import { SIDEBAR_GROUPS } from "../components/sidebar-data";
import { DocumentsContent } from "./documents-content";

export const metadata: Metadata = {
  title: "Checklist Hồ Sơ EB-3 — PERM, I-140, NVC, Phỏng Vấn | EB3VIET",
  description:
    "Checklist giấy tờ cần chuẩn bị cho từng giai đoạn EB-3: PERM/LC, I-140, NVC/DS-260, Phỏng vấn. Hạn sử dụng, định dạng file, bước chuẩn bị. Lưu tiến độ tự động.",
  alternates: {
    canonical: "https://eb3viet.com/documents",
  },
  openGraph: {
    type: "website",
    siteName: "EB3VIET",
    title: "Checklist Hồ Sơ EB-3 — PERM, I-140, NVC, Phỏng Vấn | EB3VIET",
    description:
      "Checklist giấy tờ cần chuẩn bị cho từng giai đoạn EB-3: hạn sử dụng, định dạng file, bước chuẩn bị. Lưu tiến độ tự động.",
    url: "https://eb3viet.com/documents",
  },
  twitter: {
    card: "summary",
    title: "Checklist Hồ Sơ EB-3 | EB3VIET",
    description:
      "Checklist giấy tờ cần chuẩn bị cho từng giai đoạn EB-3: PERM/LC, I-140, NVC/DS-260, Phỏng vấn.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function DocumentsPage() {
  return (
    <Layout sidebarGroups={SIDEBAR_GROUPS}>
      <div className="w-full">
        <h1 className="text-2xl font-bold text-text">
          📑 Checklist Hồ Sơ EB-3
        </h1>
        <p className="mt-2 text-text-muted">
          PERM → I-140 → NVC/DS-260 → Phỏng vấn · Hạn dùng, định dạng file,
          bước chuẩn bị · Lưu tiến độ tự động
        </p>

        <div className="mt-3 rounded-card border border-primary/40 bg-primary/10 p-3 text-sm leading-relaxed text-primary">
          <b>💡 Cách dùng:</b> Click vào từng giấy tờ để đánh dấu đã chuẩn
          bị. ⏳ = hạn sử dụng · 📐 = định dạng/kích thước file · 🛠 = bước
          cần làm trước khi nộp.
        </div>

        <div className="mt-4">
          <DocumentsContent />
        </div>

        <div className="mt-4 rounded-card border border-primary/40 bg-primary/10 p-3.5 text-sm leading-relaxed text-text">
          <b className="text-primary">
            📜 Hợp Pháp Hóa Lãnh Sự Giấy Tờ Việt Nam (Consular Legalization)
          </b>
          <br />
          <br />
          <b>Khi nào cần:</b> Một số giấy tờ dân sự Việt Nam — giấy khai
          sinh, giấy đăng ký kết hôn/quyết định ly hôn, lý lịch tư pháp,
          giấy xác nhận tình trạng hôn nhân... — khi dùng cho hồ sơ NVC
          hoặc mang đến phỏng vấn tại Lãnh sự quán Mỹ thường cần được{" "}
          <b>dịch thuật công chứng sang tiếng Anh</b> và/hoặc{" "}
          <b>hợp pháp hóa lãnh sự (chứng nhận lãnh sự)</b> trước khi nộp.
          <br />
          <br />
          <b>Quy trình thường gặp:</b>
          <br />
          1️⃣ Dịch thuật công chứng tại văn phòng dịch thuật/công ty dịch
          thuật được công nhận (UBND/Phòng Tư pháp hoặc văn phòng công
          chứng).
          <br />
          2️⃣ Nộp hồ sơ chứng nhận/hợp pháp hóa lãnh sự tại{" "}
          <b>
            Sở Ngoại Vụ TP.HCM (Cục Lãnh sự — Bộ Ngoại giao, cơ quan đại diện
            tại TP.HCM)
          </b>
          , địa chỉ: <b>184 bis Pasteur, Phường Bến Nghé, Quận 1, TP.HCM</b>{" "}
          (còn gọi là 6 Alexandre de Rhodes). Nộp trực tiếp hoặc qua đường
          bưu điện, các ngày làm việc trong tuần.
          <br />
          3️⃣ Mang/nộp kèm bản đã hợp pháp hóa theo yêu cầu của hồ sơ NVC
          hoặc khi phỏng vấn tại Lãnh sự quán Mỹ.
          <br />
          <br />
          <b>⏳ Thời gian xử lý:</b> Thông thường khoảng{" "}
          <b>1 ngày làm việc</b> cho hồ sơ dưới 10 trang; có thể lên đến{" "}
          <b>5 ngày làm việc</b> nếu hồ sơ từ 10 trang trở lên, hoặc{" "}
          <b>tới 10 ngày làm việc</b> nếu nộp qua đường bưu điện. Mùa cao
          điểm (tuyển dụng lao động, nhập học...) có thể lâu hơn.
          <br />
          <br />
          <b>⚠️ Lưu ý quan trọng:</b> Yêu cầu cụ thể khác nhau theo từng loại
          giấy tờ và theo hướng dẫn hiện hành của NVC/Lãnh sự quán — không
          phải giấy tờ nào cũng cần hợp pháp hóa. Luôn xác nhận trực tiếp
          với NVC, agency, hoặc luật sư di trú trước khi thực hiện vì quy
          trình có thể thay đổi.
        </div>

        <div className="mt-4 rounded-card border border-border bg-bg p-3 text-xs leading-relaxed text-text-muted">
          ⚠️ <b className="text-text">Lưu ý:</b> Danh sách giấy tờ mang tính
          tham khảo tổng quát dựa trên quy trình EB-3 phổ biến. Yêu cầu cụ
          thể có thể thay đổi theo từng case, lãnh sự quán, và hướng dẫn của
          NVC. Luôn xác nhận với agency/luật sư di trú trước khi nộp hồ sơ.
        </div>

        <div className="mt-3 rounded-card border border-border bg-bg p-3 text-xs leading-relaxed text-text-muted">
          <b className="text-text">📚 Nguồn tham khảo chính thức:</b>
          <br />
          <a
            href="https://www.uscis.gov/forms"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            USCIS — Forms
          </a>
          : tải các mẫu đơn chính thức (I-485, I-130, I-693...) và hướng dẫn
          điền form mới nhất.
          <br />
          <a
            href="https://vn.usembassy.gov/immigrant-visas/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            Đại sứ quán/Lãnh sự quán Mỹ tại Việt Nam — Immigrant Visas
          </a>
          : thông tin về quy trình visa định cư (immigrant visa), giấy tờ
          cần chuẩn bị, và yêu cầu hồ sơ cho phỏng vấn diện EB-3 tại Lãnh sự
          quán Mỹ ở TP.HCM.
          <br />
          <a
            href="http://www.mofahcm.gov.vn/vi/congtac_ls/nr050712145517/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            Sở Ngoại Vụ TP.HCM — Thủ tục hợp pháp hóa lãnh sự, chứng nhận
            lãnh sự
          </a>
          : hướng dẫn chính thức về thủ tục, hồ sơ, và địa điểm nộp hợp pháp
          hóa lãnh sự giấy tờ.
          <br />
          <a
            href="https://thaonco.com/translation-times/legal/consular-legalization/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            Consular Legalization: What It Is, Procedures, and Timeline
          </a>
          : hướng dẫn tiếng Anh về quy trình, hồ sơ cần thiết và thời gian
          xử lý hợp pháp hóa lãnh sự.
        </div>
      </div>
    </Layout>
  );
}
