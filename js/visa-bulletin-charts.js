// ─── Visa Bulletin Chart Renderers ──────────────────────────────────────────
// Extracted from visa-bulletin.html inline <script> (deltaChart + pdChart).
// Loaded as a plain (non-module) <script> AFTER the Chart.js CDN script.
// Functions take data arrays as params so visa-bulletin-data.js can append
// dynamic FY2026 months before chart creation.

// Y-axis: days from 2018-01-01 → formatted date (pdChart)
const Y_TICKS = {365:'Jan-2019',516:'Jun-2019',730:'Jan-2020',882:'Jun-2020',1096:'Jan-2021',1247:'Jun-2021',1461:'Jan-2022',1612:'Jun-2022',1826:'Jan-2023'};

// Detect retrogression points for point coloring
function pointColor(data, i, baseColor, badColor) {
  if (data[i] == null) return 'transparent';
  if (i > 0 && data[i-1] != null && data[i] < data[i-1]) return badColor;
  return baseColor;
}

// Monthly advance rate chart (bar chart of day-deltas between consecutive months)
function initDeltaChart(labels, data) {
  const ctxD = document.getElementById('deltaChart');
  if (!ctxD) return;
  const deltaColors = data.map(v => v === null ? 'transparent' : v > 0 ? '#22c55e' : v < 0 ? '#ef4444' : '#374151');
  new Chart(ctxD, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [{
        data: data,
        backgroundColor: deltaColors,
        borderWidth: 0,
        borderRadius: 2,
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: '#1e2d42',
          titleColor: '#93c5fd',
          bodyColor: '#e2e8f0',
          borderColor: '#2d3f55',
          borderWidth: 1,
          callbacks: {
            title: ctx => 'VB Tháng: ' + ctx[0].label,
            label: ctx => {
              const v = ctx.raw;
              if (v === null) return 'Tháng Current';
              if (v > 0) return `+${v} ngày ⬆ (khoảng ${Math.round(v/30*10)/10} tháng)`;
              if (v < 0) return `${v} ngày ⬇ RETROGRESS`;
              return 'Không đổi';
            }
          }
        }
      },
      scales: {
        x: {
          ticks: { color:'#64748b', font:{size:9}, maxRotation:45,
            callback: (val,i) => i%4===0 ? labels[i] : '' },
          grid: { display: false }
        },
        y: {
          ticks: { color:'#64748b', font:{size:10},
            callback: v => v > 0 ? `+${v}d` : `${v}d` },
          grid: { color:'rgba(45,63,85,0.5)' },
          zero: true
        }
      }
    }
  });
}

// Priority Date Movement Chart (line chart of Table A / Table B over time)
function initPdChart(labels, vbA, vbB, vbADates, vbBDates) {
  const ctxPD = document.getElementById('pdChart');
  if (!ctxPD) return;
  new Chart(ctxPD, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [
        {
          label: 'Bảng A — Final Action Date',
          data: vbA,
          borderColor: '#3b82f6',
          backgroundColor: 'rgba(59,130,246,0.08)',
          borderWidth: 2.5,
          pointRadius: vbA.map((v,i) => v != null ? 4 : 0),
          pointBackgroundColor: vbA.map((v,i) => pointColor(vbA,i,'#3b82f6','#ef4444')),
          pointBorderColor: vbA.map((v,i) => pointColor(vbA,i,'#3b82f6','#ef4444')),
          tension: 0.2,
          spanGaps: false,
          fill: true,
        },
        {
          label: 'Bảng B — Dates for Filing',
          data: vbB,
          borderColor: '#8b5cf6',
          backgroundColor: 'transparent',
          borderWidth: 2,
          borderDash: [5,4],
          pointRadius: vbB.map((v,i) => v != null ? 3 : 0),
          pointBackgroundColor: vbB.map((v,i) => pointColor(vbB,i,'#8b5cf6','#ef4444')),
          tension: 0.2,
          spanGaps: false,
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: { mode:'index', intersect:false },
      plugins: {
        legend: { display:false },
        tooltip: {
          backgroundColor:'#1e2d42',
          titleColor:'#93c5fd',
          bodyColor:'#e2e8f0',
          borderColor:'#2d3f55',
          borderWidth:1,
          callbacks: {
            title: ctx => 'VB Tháng: ' + ctx[0].label,
            label: ctx => {
              const i = ctx.dataIndex;
              const d = ctx.datasetIndex === 0 ? vbADates[i] : vbBDates[i];
              const lbl = ctx.datasetIndex === 0 ? 'Bảng A' : 'Bảng B';
              if (d === 'Current') return lbl + ': Current (không giới hạn)';
              // detect retrogress
              const arr = ctx.datasetIndex === 0 ? vbA : vbB;
              const prev = i > 0 ? arr[i-1] : null;
              const arrow = (prev != null && arr[i] != null && arr[i] < prev) ? ' ⬇ Retrogress!' : '';
              return lbl + ': ' + d + arrow;
            }
          }
        }
      },
      scales: {
        x: {
          ticks: { color:'#64748b', font:{size:10}, maxRotation:45,
            callback: (val,i) => i%3===0 ? labels[i] : '' },
          grid: { color:'rgba(45,63,85,0.5)' }
        },
        y: {
          min: 400,
          ticks: {
            color:'#64748b', font:{size:10},
            callback: v => {
              const near = Object.keys(Y_TICKS).find(k => Math.abs(k-v) < 20);
              return near ? Y_TICKS[near] : '';
            }
          },
          grid: { color:'rgba(45,63,85,0.5)' }
        }
      }
    }
  });
}
