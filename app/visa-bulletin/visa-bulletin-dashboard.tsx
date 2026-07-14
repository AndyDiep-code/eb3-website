"use client";

// Client dashboard: fetches live FY2026+ data from /api/visa-bulletin (KV,
// fail-safe fallback to bundled static JSON already handled server-side by
// the route), then renders the 3 charts + summary banner. Charts must be
// client components (Recharts renders via React, not SSR-streamable the
// same way static markup is) — see phase-04 plan Requirement #3.

import { useEffect, useState } from "react";
import type { VisaBulletinData } from "./types";
import {
  buildFiscalYearIssuanceTotals,
  buildMonthlyDeltaData,
  buildMovementRate,
  buildMultiYearTrendData,
  buildPriorityDateTrendData,
  computeNetDelta,
  findLatestPublishedDates,
  formatIsoDateToDisplay,
} from "./data-transforms";
import { PriorityDateTrendChart } from "./charts/priority-date-trend-chart";
import { MonthlyDeltaChart } from "./charts/monthly-delta-chart";
import { FiscalYearIssuanceChart, type FiscalYearIssuanceBar } from "./charts/fiscal-year-issuance-chart";
import { HISTORICAL_FY_TABLES, HISTORICAL_ISSUANCE_ROWS } from "./historical-fy-data";
import { CurrentFyIssuanceRow } from "./current-fy-issuance-row";
import { PriorityDatePredictor } from "./priority-date-predictor";
import { PaceStat, SummaryStat } from "./summary-stat-cards";

type FetchState =
  | { status: "loading" }
  | { status: "error" }
  | { status: "ready"; data: VisaBulletinData };

function buildFiscalYearIssuanceSeries(current: VisaBulletinData): FiscalYearIssuanceBar[] {
  const pastFy = HISTORICAL_ISSUANCE_ROWS.map((row) => ({
    fiscalYear: row.fiscalYear,
    totalIssuances: row.subtotalVietnam,
    isCurrentFy: false,
  }));
  const [currentFyPoint] = buildFiscalYearIssuanceTotals(current.fy, current.months);
  return [
    ...pastFy,
    { fiscalYear: currentFyPoint.fiscalYear, totalIssuances: currentFyPoint.totalIssuances, isCurrentFy: true },
  ];
}

export function VisaBulletinDashboard() {
  const [state, setState] = useState<FetchState>({ status: "loading" });

  useEffect(() => {
    let isMounted = true;
    fetch("/api/visa-bulletin")
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json() as Promise<VisaBulletinData>;
      })
      .then((data) => {
        if (isMounted) setState({ status: "ready", data });
      })
      .catch((error) => {
        console.error("VisaBulletinDashboard: fetch failed", error);
        if (isMounted) setState({ status: "error" });
      });
    return () => {
      isMounted = false;
    };
  }, []);

  if (state.status === "loading") {
    return (
      <div className="rounded-card border border-border bg-bg p-4 text-sm text-text-muted">
        Đang tải dữ liệu Visa Bulletin...
      </div>
    );
  }

  if (state.status === "error") {
    return (
      <div className="rounded-card border border-secondary/40 bg-secondary/10 p-4 text-sm text-text">
        ⚠️ Không tải được dữ liệu mới nhất. Vui lòng tải lại trang hoặc xem
        trực tiếp tại{" "}
        <a
          href="https://travel.state.gov/content/travel/en/legal/visa-law0/visa-bulletin.html"
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary underline"
        >
          travel.state.gov
        </a>
        .
      </div>
    );
  }

  const { data } = state;
  const trendData = buildPriorityDateTrendData(data.months, data.carry_over);
  const multiYearData = buildMultiYearTrendData(HISTORICAL_FY_TABLES, data.months);
  const deltaData = buildMonthlyDeltaData(data.months, data.carry_over);
  const fyIssuanceData = buildFiscalYearIssuanceSeries(data);
  const { latestTableA, latestTableB } = findLatestPublishedDates(data.months);
  const movementRate = buildMovementRate(data.months);
  const netDeltaA = computeNetDelta(data.carry_over.table_a_prior_sep, latestTableA);
  const netDeltaB = computeNetDelta(data.carry_over.table_b_prior_sep, latestTableB);

  return (
    <div>
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4">
        <SummaryStat label={`FY${data.fy} — Bảng A mới nhất`} value={formatIsoDateToDisplay(latestTableA)} />
        <SummaryStat label={`FY${data.fy} Net Δ (Bảng A)`} value={netDeltaA} valueClassName="text-accent" />
        <SummaryStat label={`FY${data.fy} Net Δ (Bảng B)`} value={netDeltaB} valueClassName="text-accent" />
        <SummaryStat
          label="Tổng tiến từ đáy FY2022"
          value="+34 tháng"
          valueClassName="text-primary"
        />
      </div>

      {/* Historical pace stats — static reference figures (ported verbatim
          from visa-bulletin.html's "Historical pace" row), not derived from
          live API data since they reference fixed historical FYs/records. */}
      <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-4">
        <PaceStat label="FY2026 (pace)" value="~23 ngày" sublabel="trung bình/tháng" valueClassName="text-accent" />
        <PaceStat label="FY2024-25 (pace)" value="~18 ngày" sublabel="trung bình/tháng" valueClassName="text-secondary" />
        <PaceStat label="Kỷ lục đơn tháng" value="+390 ngày" sublabel="Oct-2022" valueClassName="text-primary" />
        <PaceStat label="Retrogress tệ nhất" value="-152 ngày" sublabel="Feb-2023" valueClassName="text-red-500" />
      </div>

      <section className="mt-6 rounded-card border border-primary/30 bg-primary/5 p-4">
        <h2 className="text-base font-semibold text-text">
          🗓️ Toàn Cảnh Priority Date — FY2022 đến Nay
        </h2>
        <p className="mt-1 text-xs text-text-muted">
          Biểu đồ đa năm: từ khi PD thoát khỏi "Current" (FY2022) đến tháng mới nhất. Thấy rõ xu hướng tổng thể, các lần retrogress lớn, và tốc độ tiến hiện tại.
        </p>
        <div className="mt-3">
          <PriorityDateTrendChart data={multiYearData} />
        </div>
      </section>

      <section className="mt-6 rounded-card border border-border bg-bg p-4">
        <h2 className="text-base font-semibold text-text">
          📈 Biểu Đồ Di Chuyển Priority Date — FY{data.fy} (Năm Hiện Tại)
        </h2>
        <p className="mt-1 text-xs text-text-muted">
          Trục Y = số ngày Priority Date (càng cao = càng gần hiện tại = càng
          tốt). Khoảng trống = tháng chưa công bố.
        </p>
        <div className="mt-3">
          <PriorityDateTrendChart data={trendData} />
        </div>
      </section>

      <section className="mt-6 rounded-card border border-border bg-bg p-4">
        <h2 className="text-base font-semibold text-text">
          📊 Tốc Độ Tiến/Lùi Hàng Tháng — Bảng A
        </h2>
        <p className="mt-1 text-xs text-text-muted">
          Cột xanh = PD tăng (tốt) · Cột đỏ = retrogress (xấu) · Số ngày thay
          đổi mỗi tháng Visa Bulletin.
        </p>
        <div className="mt-3">
          <MonthlyDeltaChart data={deltaData} />
        </div>
      </section>

      <section className="mt-6 rounded-card border border-border bg-bg p-4">
        <h2 className="text-base font-semibold text-text">
          🇻🇳 Visa EW Cấp Cho Việt Nam — FY{data.fy} (đang diễn ra)
        </h2>
        <p className="mt-1 text-xs text-text-muted">
          Dữ liệu hàng tháng FY{data.fy}, cập nhật khi DOS công bố trong báo
          cáo Monthly Immigrant Visa Issuances (xem "Additive" capability,
          field <code>ew_vietnam</code>).
        </p>
        <div className="mt-3">
          <CurrentFyIssuanceRow fiscalYear={data.fy} months={data.months} />
        </div>
      </section>

      <section className="mt-6 rounded-card border border-border bg-bg p-4">
        <h2 className="text-base font-semibold text-text">
          🆕 Tổng Visa EW Việt Nam Theo Năm Tài Chính
        </h2>
        <p className="mt-1 text-xs text-text-muted">
          Đề xuất biểu đồ mới, so sánh tổng số visa EW cấp cho Việt Nam giữa
          các năm tài chính (FY2021–FY{data.fy}, năm hiện tại tô vàng).
        </p>
        <div className="mt-3">
          <FiscalYearIssuanceChart data={fyIssuanceData} />
        </div>
      </section>

      <section className="mt-6 rounded-card border border-border bg-bg p-4">
        <h2 className="text-base font-semibold text-text">
          🔮 Dự Báo Priority Date — Khi Nào Đến Lượt Bạn?
        </h2>
        <p className="mt-1 text-xs text-text-muted">
          Nhập Priority Date của bạn để xem ước tính thời gian chờ theo 3
          kịch bản tốc độ khác nhau, dựa trên Bảng A/B mới nhất hiện tại.
        </p>
        <div className="mt-3">
          <PriorityDatePredictor
            latestTableAIso={latestTableA}
            latestTableBIso={latestTableB}
            actualRateDaysPerMonth={movementRate.avgDaysPerMonth}
          />
        </div>
      </section>
    </div>
  );
}
