"use client";

import { useState } from "react";

type TopicKey = "v1" | "v2" | "v3" | "v4" | "v5";

const TOPICS: Array<{ key: TopicKey; label: string }> = [
  { key: "v1", label: "🚗 Xe & Lái xe" },
  { key: "v2", label: "🚦 Đèn & Biển" },
  { key: "v3", label: "⚖️ Luật & Phạt" },
  { key: "v4", label: "🛣️ Đường & Làn" },
  { key: "v5", label: "👮 DMV & Giấy tờ" },
];

interface VocabRow {
  en: string;
  vi: string;
  note: string;
  hot?: boolean;
}

const V1: VocabRow[] = [
  { en: "Accelerator / Gas pedal", vi: "Bàn đạp ga", note: "Press the accelerator gently when starting." },
  { en: "Brake pedal", vi: "Bàn đạp phanh", note: "Apply brakes smoothly, not suddenly." },
  { en: "Steering wheel", vi: "Vô lăng", note: "Keep both hands on the steering wheel." },
  { en: "Turn signal / Blinker", vi: "Đèn xi nhan / Đèn chỉ hướng", note: "Always use your turn signal before changing lanes.", hot: true },
  { en: "Headlights", vi: "Đèn pha (đèn chiếu xa)", note: "Turn on headlights in rain and at dusk." },
  { en: "Hazard lights / Flashers", vi: "Đèn cảnh báo nguy hiểm", note: "Use hazard lights when stopped on the highway." },
  { en: "Rearview mirror / Side mirror", vi: "Gương chiếu hậu / Gương bên", note: "Check mirrors every 5–8 seconds." },
  { en: "Seatbelt / Safety belt", vi: "Dây an toàn", note: "All passengers must wear seatbelts — required in all 50 states.", hot: true },
  { en: "Blind spot", vi: "Điểm mù (khu vực không nhìn được qua gương)", note: "Always check blind spots before changing lanes." },
  { en: "Parallel parking", vi: "Đỗ xe song song (đỗ dọc theo lề đường)", note: "Required skill for the road test." },
  { en: "Right of way", vi: "Quyền ưu tiên đi trước", note: "Pedestrians always have the right of way at crosswalks.", hot: true },
  { en: "Yield", vi: "Nhường đường", note: "Yield sign = slow down and let others go first." },
  { en: "Merge", vi: "Nhập làn / Gộp vào dòng xe", note: "Use the zipper method when merging in construction zones." },
  { en: "U-turn", vi: "Quay đầu xe", note: "U-turns are not allowed at intersections with 'No U-Turn' signs." },
  { en: "Tailgating", vi: "Đi quá sát xe phía trước", note: "Tailgating is illegal and dangerous. Maintain 3-second following distance." },
];

const V2: VocabRow[] = [
  { en: "Traffic light / Signal", vi: "Đèn giao thông / Tín hiệu đèn", note: "Red = stop. Yellow = prepare to stop. Green = go." },
  { en: "Flashing red light", vi: "Đèn đỏ nhấp nháy", note: "Treat as STOP sign — stop completely, then proceed.", hot: true },
  { en: "Flashing yellow light", vi: "Đèn vàng nhấp nháy", note: "Slow down and proceed with caution — do NOT stop.", hot: true },
  { en: "Stop sign", vi: "Biển báo dừng (hình bát giác đỏ)", note: "Come to a COMPLETE stop. Count 3 seconds. Then proceed." },
  { en: "Yield sign", vi: "Biển báo nhường đường (hình tam giác đỏ)", note: "Slow down. Give way to traffic. Only stop if necessary." },
  { en: "Speed limit sign", vi: "Biển báo giới hạn tốc độ", note: "White rectangular sign with black numbers." },
  { en: "School zone sign", vi: "Biển báo khu vực trường học", note: "Speed limit typically 20–25 mph when children are present.", hot: true },
  { en: "Work zone / Construction zone sign", vi: "Biển báo khu vực công trình", note: "Orange signs. Fines doubled when workers are present.", hot: true },
  { en: "No passing zone", vi: "Khu vực cấm vượt", note: "Solid yellow line on your side = do not pass." },
  { en: "Do Not Enter sign", vi: "Biển cấm vào (hình tròn đỏ, gạch trắng)", note: "Wrong-way on one-way street. Never enter." },
  { en: "Wrong Way sign", vi: "Biển đi sai chiều (chữ trắng nền đỏ)", note: "You are going in the wrong direction. Stop immediately and turn around." },
  { en: "Railroad crossing sign", vi: "Biển báo đường sắt giao nhau (chữ X vàng)", note: "Slow down. Look both ways. Stop if train is coming." },
  { en: "Green arrow signal", vi: "Đèn mũi tên xanh", note: "Protected turn — you have right of way in that direction." },
];

const V3: VocabRow[] = [
  { en: "Speed limit", vi: "Giới hạn tốc độ", note: "Varies by state and road type. Always obey posted signs.", hot: true },
  { en: "DUI — Driving Under the Influence", vi: "Lái xe khi say rượu/ma túy", note: "BAC ≥ 0.08% = DUI/DWI. Penalty: arrest, license suspension, jail.", hot: true },
  { en: "Blood Alcohol Content (BAC)", vi: "Nồng độ cồn trong máu", note: "Legal limit: 0.08%. Under 21: 0.00%–0.02% depending on state." },
  { en: "Reckless driving", vi: "Lái xe ẩu / liều lĩnh", note: "Can result in license suspension or criminal charges." },
  { en: "Hit and run", vi: "Gây tai nạn rồi bỏ chạy", note: "Felony in all states. Must stop and exchange information." },
  { en: "Move Over Law", vi: "Luật nhường đường cho xe khẩn cấp", note: "Must move over OR slow down for stopped emergency vehicles.", hot: true },
  { en: "Right-of-way at 4-way stop", vi: "Quyền ưu tiên tại ngã tư 4 chiều", note: "First to arrive = first to go. Tie = yield to right.", hot: true },
  { en: "Following distance", vi: "Khoảng cách theo sau xe trước", note: "Normal: 3-second rule. Bad weather/construction: 4+ seconds.", hot: true },
  { en: "Implied consent law", vi: "Luật đồng ý ngầm (phải đồng ý test cồn khi bị yêu cầu)", note: "Refusing a breathalyzer = automatic license suspension." },
  { en: "Distracted driving", vi: "Lái xe mất tập trung (nhắn tin, gọi điện...)", note: "Texting while driving is illegal in most states. Significant fines.", hot: true },
];

const V4: VocabRow[] = [
  { en: "Lane", vi: "Làn đường", note: "Stay in your lane unless changing." },
  { en: "Solid yellow center line", vi: "Vạch vàng liền giữa đường", note: "Do NOT cross to pass.", hot: true },
  { en: "Broken yellow center line", vi: "Vạch vàng đứt đoạn", note: "May pass when safe and clear." },
  { en: "Double solid yellow line", vi: "Hai vạch vàng liền (song song)", note: "NEITHER direction may pass.", hot: true },
  { en: "Solid white line", vi: "Vạch trắng liền", note: "Separates same-direction lanes. Lane changes discouraged.", hot: true },
  { en: "Broken white line", vi: "Vạch trắng đứt đoạn", note: "Lane changes allowed when safe." },
  { en: "Crosswalk", vi: "Vạch sang đường cho người đi bộ", note: "Always yield to pedestrians in crosswalk." },
  { en: "Bike lane", vi: "Làn đường dành cho xe đạp", note: "Do NOT drive or park in bike lanes." },
  { en: "HOV lane", vi: "Làn xe nhiều người (≥2 người trong xe)", note: "High Occupancy Vehicle lane. Diamond symbol." },
  { en: "Median", vi: "Dải phân cách giữa đường", note: "Never drive on the median." },
  { en: "Shoulder / Road shoulder", vi: "Lề đường (phần cứng bên cạnh)", note: "Only use shoulder for emergencies." },
  { en: "Intersection", vi: "Ngã tư / Nơi giao nhau", note: "Most accidents happen at intersections." },
  { en: "On-ramp / Off-ramp", vi: "Đường dẫn vào / Đường dẫn ra (cao tốc)", note: "Accelerate on on-ramp to match highway speed." },
];

const V5: VocabRow[] = [
  { en: "Driver's license", vi: "Bằng lái xe", note: "Must carry at all times when driving." },
  { en: "Learner's permit", vi: "Giấy phép tập lái xe", note: "First step. Must drive with a licensed adult. Requirements vary by state." },
  { en: "Knowledge test / Written test", vi: "Bài thi lý thuyết", note: "Multiple-choice questions. Many states offer test in Vietnamese — ask at DMV/BMV." },
  { en: "Road test / Driving skills test", vi: "Bài thi lái xe thực hành", note: "With a DMV examiner. Typically ~20 minutes." },
  { en: "Vehicle registration", vi: "Đăng ký xe", note: "Annual renewal. Sticker on license plate." },
  { en: "Proof of insurance", vi: "Bằng chứng bảo hiểm xe", note: "Must carry in vehicle. Show to police if pulled over." },
  { en: "Proof of residency", vi: "Bằng chứng địa chỉ cư trú", note: "Utility bill, bank statement with your state address." },
  { en: "Green card / Permanent Resident Card", vi: "Thẻ xanh / Thẻ thường trú nhân", note: "Bring to DMV/BMV as proof of legal status." },
  { en: "SR-22 form", vi: "Biểu mẫu SR-22 (bảo hiểm bắt buộc sau vi phạm)", note: "Required after DUI or serious violations. Higher insurance cost." },
  { en: "License suspension / Revocation", vi: "Tạm đình chỉ / Thu hồi bằng lái", note: "Suspension = temporary. Revocation = permanent (can reapply)." },
];

const TOPIC_DATA: Record<TopicKey, VocabRow[]> = { v1: V1, v2: V2, v3: V3, v4: V4, v5: V5 };

export function BmvSharedVocab() {
  const [activeTopic, setActiveTopic] = useState<TopicKey>("v1");
  const rows = TOPIC_DATA[activeTopic];

  return (
    <div>
      <div className="mb-3 border-b border-border pb-2 text-base font-bold text-text">
        📖 Từ Vựng Lái Xe — Song Ngữ Anh–Việt
      </div>

      <div className="mb-4 flex flex-wrap gap-2">
        {TOPICS.map((t) => (
          <button
            key={t.key}
            type="button"
            onClick={() => setActiveTopic(t.key)}
            className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
              activeTopic === t.key
                ? "bg-primary text-white border-primary"
                : "border-border bg-bg text-text-muted hover:border-primary/50 hover:text-text"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="overflow-x-auto rounded-card border border-border">
        <table className="w-full text-xs">
          <thead>
            <tr className="bg-primary/10">
              <th className="px-3 py-2 text-left font-semibold text-primary">Tiếng Anh</th>
              <th className="px-3 py-2 text-left font-semibold text-primary">Tiếng Việt</th>
              <th className="px-3 py-2 text-left font-semibold text-primary">Ví dụ / Ghi chú</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={i} className={i % 2 === 0 ? "bg-bg" : "bg-bg-alt"}>
                <td className="px-3 py-2 align-top font-medium leading-relaxed text-text">
                  {row.en}
                </td>
                <td className="px-3 py-2 align-top italic leading-relaxed text-text-muted">
                  {row.vi}
                </td>
                <td className="px-3 py-2 align-top leading-relaxed text-text-muted">
                  {row.note}
                  {row.hot && (
                    <span className="ml-1 font-bold text-secondary">⚡ HAY THI</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
