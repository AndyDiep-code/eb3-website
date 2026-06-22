// ─── Visa Bulletin Dynamic Data Renderer ────────────────────────────────────
// Fetches data/visa-bulletin.json on DOMContentLoaded and:
//   1. Writes FY2026 Table A / Table B / issuance cells (data-month/data-table attrs)
//   2. Updates Latest / Net-Δ summary cells
//   3. Appends new months to the chart base arrays, then renders both charts
//   4. Updates predictPD() FAD constants + banner DOM elements (defensive no-op
//      if the target ids don't exist yet — added by a later phase)
// Falls back to static base arrays + renders charts even if fetch fails.

const EPOCH = Date.UTC(2018, 0, 1);
const MONTH_NAMES = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

// ─── Static base arrays (Oct-21..Jun-26, 57 entries) — verbatim copy of the
// arrays previously inline in visa-bulletin.html. Used as chart fallback and
// as the base onto which genuinely new FY2026 months are appended.
const BASE_DELTA_LABELS = ['Oct-21', 'Nov-21', 'Dec-21', 'Jan-22', 'Feb-22', 'Mar-22', 'Apr-22', 'May-22', 'Jun-22', 'Jul-22', 'Aug-22', 'Sep-22', 'Oct-22', 'Nov-22', 'Dec-22', 'Jan-23', 'Feb-23', 'Mar-23', 'Apr-23', 'May-23', 'Jun-23', 'Jul-23', 'Aug-23', 'Sep-23', 'Oct-23', 'Nov-23', 'Dec-23', 'Jan-24', 'Feb-24', 'Mar-24', 'Apr-24', 'May-24', 'Jun-24', 'Jul-24', 'Aug-24', 'Sep-24', 'Oct-24', 'Nov-24', 'Dec-24', 'Jan-25', 'Feb-25', 'Mar-25', 'Apr-25', 'May-25', 'Jun-25', 'Jul-25', 'Aug-25', 'Sep-25', 'Oct-25', 'Nov-25', 'Dec-25', 'Jan-26', 'Feb-26', 'Mar-26', 'Apr-26', 'May-26', 'Jun-26'];
const BASE_DELTA_DATA = [null, null, null, null, null, null, 0, 0, 0, 0, 0, 0, 390, 0, 0, 0, -152, 0, 0, 0, 0, 0, 121, 0, 92, 0, 0, 31, 0, 7, 30, 0, 0, 85, 0, -31, 0, 0, 0, 7, 0, 55, 110, 0, 31, 16, 0, 0, 7, 0, 17, 31, 0, 61, 0, 92, 0];
const BASE_VB_LABELS = ["Oct-21","Nov-21","Dec-21","Jan-22","Feb-22","Mar-22","Apr-22","May-22","Jun-22","Jul-22","Aug-22","Sep-22","Oct-22","Nov-22","Dec-22","Jan-23","Feb-23","Mar-23","Apr-23","May-23","Jun-23","Jul-23","Aug-23","Sep-23","Oct-23","Nov-23","Dec-23","Jan-24","Feb-24","Mar-24","Apr-24","May-24","Jun-24","Jul-24","Aug-24","Sep-24","Oct-24","Nov-24","Dec-24","Jan-25","Feb-25","Mar-25","Apr-25","May-25","Jun-25","Jul-25","Aug-25","Sep-25","Oct-25","Nov-25","Dec-25","Jan-26","Feb-26","Mar-26","Apr-26","May-26","Jun-26"];
const BASE_VB_A = [null,null,null,null,null,492,492,492,492,492,492,492,882,882,882,882,730,730,730,730,730,730,851,851,943,943,943,974,974,981,1011,1011,1011,1096,1096,1065,1065,1065,1065,1072,1072,1127,1237,1237,1268,1284,1284,1284,1291,1291,1308,1339,1339,1400,1400,1492,1492];
const BASE_VB_B = [null,null,null,null,null,null,null,null,null,null,null,null,1711,1711,1711,1711,761,761,761,761,761,761,882,882,1079,1079,1079,1079,1079,1079,1079,1079,1079,1103,1103,1103,1237,1237,1237,1237,1237,1268,1268,1298,1298,1298,1298,1298,1430,1430,1430,1430,1430,1633,1673,1673,1673];
const BASE_VB_A_DATES = ["Current","Current","Current","Current","Current","2019-05-08","2019-05-08","2019-05-08","2019-05-08","2019-05-08","2019-05-08","2019-05-08","2020-06-01","2020-06-01","2020-06-01","2020-06-01","2020-01-01","2020-01-01","2020-01-01","2020-01-01","2020-01-01","2020-01-01","2020-05-01","2020-05-01","2020-08-01","2020-08-01","2020-08-01","2020-09-01","2020-09-01","2020-09-08","2020-10-08","2020-10-08","2020-10-08","2021-01-01","2021-01-01","2020-12-01","2020-12-01","2020-12-01","2020-12-01","2020-12-08","2020-12-08","2021-02-01","2021-05-22","2021-05-22","2021-06-22","2021-07-08","2021-07-08","2021-07-08","2021-07-15","2021-07-15","2021-08-01","2021-09-01","2021-09-01","2021-11-01","2021-11-01","2022-02-01","2022-02-01"];
const BASE_VB_B_DATES = ["Current","Current","Current","Current","Current","Current","Current","Current","Current","Current","Current","Current","2022-09-08","2022-09-08","2022-09-08","2022-09-08","2020-02-01","2020-02-01","2020-02-01","2020-02-01","2020-02-01","2020-02-01","2020-06-01","2020-06-01","2020-12-15","2020-12-15","2020-12-15","2020-12-15","2020-12-15","2020-12-15","2020-12-15","2020-12-15","2020-12-15","2021-01-08","2021-01-08","2021-01-08","2021-05-22","2021-05-22","2021-05-22","2021-05-22","2021-05-22","2021-06-22","2021-06-22","2021-07-22","2021-07-22","2021-07-22","2021-07-22","2021-07-22","2021-12-01","2021-12-01","2021-12-01","2021-12-01","2021-12-01","2022-06-22","2022-08-01","2022-08-01","2022-08-01"];

// ─── Helpers ─────────────────────────────────────────────────────────────────

// "2021-07-15" -> "15-Jul-2021"; "Current" -> "Current"; null -> "—"
function fmtISOToDisplay(iso) {
  if (iso === null) return '—';
  if (iso === 'Current') return 'Current';
  const [y, m, d] = iso.split('-').map(Number);
  return `${d}-${MONTH_NAMES[m - 1]}-${y}`;
}

// ISO date -> integer days since EPOCH (2018-01-01); "Current"/null -> null
function daysFromEpoch(iso) {
  if (iso === null || iso === 'Current') return null;
  const [y, m, d] = iso.split('-').map(Number);
  return Math.round((Date.UTC(y, m - 1, d) - EPOCH) / 86400000);
}

// Cell color class based on current vs previous month's value
function cellClass(curr, prev) {
  if (curr === null) return 'c-empty';
  if (curr === 'Current') return 'c-curr';
  if (prev === null || prev === 'Current') return 'c-norm';
  if (curr > prev) return 'c-up';
  if (curr < prev) return 'c-dn';
  return 'c-norm';
}

// Net Δ between two ISO dates as "+Xm Yd"; "N/A" if either is "Current"/null
function computeNetDelta(firstISO, latestISO) {
  if (!firstISO || !latestISO || firstISO === 'Current' || latestISO === 'Current') return 'N/A';
  const [fy, fm, fd] = firstISO.split('-').map(Number);
  const [ly, lm, ld] = latestISO.split('-').map(Number);
  let months = (ly - fy) * 12 + (lm - fm);
  let days = ld - fd;
  if (days < 0) {
    months -= 1;
    const prevMonth = lm - 1 || 12;
    const prevYear = lm > 1 ? ly : ly - 1;
    days += new Date(Date.UTC(prevYear, prevMonth, 0)).getUTCDate();
  }
  return `+${months}m ${days}d`;
}

// Month label "Oct-25" -> data-month slug "oct25"
function labelToSlug(label) {
  return label.toLowerCase().replace('-', '');
}

// Defensive DOM text write — no-op if element missing
function setText(id, text) {
  const el = document.getElementById(id);
  if (el) el.textContent = text;
}

// ─── Cell rendering ──────────────────────────────────────────────────────────

function renderTableCells(months, carryOver) {
  let prevA = carryOver.table_a_prior_sep;
  let prevB = carryOver.table_b_prior_sep;
  let lastA = null, lastB = null;
  let issSubtotal = 0;

  months.forEach(entry => {
    const slug = labelToSlug(entry.label);

    const cellA = document.querySelector(`#a26 td[data-month="${slug}"][data-table="a"]`);
    if (cellA) {
      cellA.textContent = fmtISOToDisplay(entry.table_a);
      cellA.className = cellClass(entry.table_a, prevA);
    }
    if (entry.table_a !== null) { prevA = entry.table_a; lastA = entry.table_a; }

    const cellB = document.querySelector(`#b26 td[data-month="${slug}"][data-table="b"]`);
    if (cellB) {
      cellB.textContent = fmtISOToDisplay(entry.table_b);
      cellB.className = cellClass(entry.table_b, prevB);
    }
    if (entry.table_b !== null) { prevB = entry.table_b; lastB = entry.table_b; }

    if (entry.ew_vietnam !== null) {
      issSubtotal += entry.ew_vietnam;
      const cellIss = document.querySelector(`.iss-wrap td[data-month="${slug}"][data-table="iss"]`);
      if (cellIss) cellIss.textContent = String(entry.ew_vietnam);
    }
  });

  const issSubtotalCell = document.querySelector('[data-cell="iss-subtotal"]');
  if (issSubtotalCell) issSubtotalCell.textContent = String(issSubtotal);

  return { lastA, lastB };
}

function renderSummaryCells(carryOver, lastA, lastB) {
  const latestADisplay = fmtISOToDisplay(lastA);
  const latestBDisplay = fmtISOToDisplay(lastB);
  const netA = computeNetDelta(carryOver.table_a_prior_sep, lastA);
  const netB = computeNetDelta(carryOver.table_b_prior_sep, lastB);

  const latestACell = document.querySelector('[data-cell="latest-a"]');
  if (latestACell) latestACell.textContent = latestADisplay;
  const netACell = document.querySelector('[data-cell="net-a"]');
  if (netACell) netACell.textContent = netA;

  const latestBCell = document.querySelector('[data-cell="latest-b"]');
  if (latestBCell) latestBCell.textContent = latestBDisplay;
  const netBCell = document.querySelector('[data-cell="net-b"]');
  if (netBCell) netBCell.textContent = netB;

  return { latestADisplay, latestBDisplay, netA, netB };
}

// ─── Chart array append ──────────────────────────────────────────────────────

function appendDynamicMonths(months, carryOver) {
  const newStartIndex = BASE_VB_LABELS.length - carryOver.delta_base_index;
  for (let i = newStartIndex; i < months.length; i++) {
    const entry = months[i];
    if (entry.table_a === null && entry.table_b === null) continue; // unpublished month

    const dA = daysFromEpoch(entry.table_a);
    const dB = daysFromEpoch(entry.table_b);
    const prevA = BASE_VB_A[BASE_VB_A.length - 1];

    BASE_VB_LABELS.push(entry.label);
    BASE_VB_A.push(dA);
    BASE_VB_B.push(dB);
    BASE_VB_A_DATES.push(entry.table_a === null ? 'Current' : entry.table_a);
    BASE_VB_B_DATES.push(entry.table_b === null ? 'Current' : entry.table_b);

    BASE_DELTA_LABELS.push(entry.label);
    BASE_DELTA_DATA.push((dA == null || prevA == null) ? null : dA - prevA);
  }
}

// ─── Banner + predictor updates ─────────────────────────────────────────────

function renderBanner(months, summary) {
  const lastFilled = [...months].reverse().find(m => m.table_a !== null || m.table_b !== null);
  const monthLabel = lastFilled
    ? `Tháng ${Number(lastFilled.month.split('-')[1])}/${lastFilled.month.split('-')[0]}`
    : '';
  const monthLabelEn = lastFilled
    ? `${MONTH_NAMES[Number(lastFilled.month.split('-')[1]) - 1]}-${lastFilled.month.split('-')[0]}`
    : '';

  setText('banner-latest-a', summary.latestADisplay);
  setText('banner-net-a', summary.netA);
  setText('banner-net-b', summary.netB);
  setText('banner-vb-month-label', monthLabelEn);
  setText('banner-latest-month', monthLabel);
  setText('banner-pred-a', summary.latestADisplay);
  setText('banner-pred-b', summary.latestBDisplay);
}

function updatePredictorConstants(lastA, lastB) {
  if (lastA && lastA !== 'Current') {
    const [y, m, d] = lastA.split('-').map(Number);
    CURRENT_FAD_A = new Date(Date.UTC(y, m - 1, d));
  }
  if (lastB && lastB !== 'Current') {
    const [y, m, d] = lastB.split('-').map(Number);
    CURRENT_FAD_B = new Date(Date.UTC(y, m - 1, d));
  }
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  try {
    const res = await fetch('data/visa-bulletin.json?v=' + Date.now());
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    const { months, carry_over: carryOver } = data;
    // months[] grows past 12 entries once FY2027 data starts appending (see
    // fetch-visa-bulletin.py); the #a26/#b26/.iss-wrap tables and FY2026
    // banner cells only cover FY2026 (Oct-25..Sep-26), so cap rendering to
    // the first 12 entries while charts (appendDynamicMonths) keep using all.
    const fy2026Months = months.slice(0, 12);

    if (BASE_VB_LABELS[carryOver.delta_base_index] !== 'Oct-25') {
      console.error('visa-bulletin-data: delta_base_index mismatch, skipping dynamic appends');
    } else {
      appendDynamicMonths(months, carryOver);
    }

    const { lastA, lastB } = renderTableCells(fy2026Months, carryOver);
    const summary = renderSummaryCells(carryOver, lastA, lastB);
    renderBanner(fy2026Months, summary);
    updatePredictorConstants(lastA, lastB);
  } catch (err) {
    console.warn('visa-bulletin-data: failed to load dynamic data', err);
  }

  initDeltaChart(BASE_DELTA_LABELS, BASE_DELTA_DATA);
  initPdChart(BASE_VB_LABELS, BASE_VB_A, BASE_VB_B, BASE_VB_A_DATES, BASE_VB_B_DATES);
}

document.addEventListener('DOMContentLoaded', main);
