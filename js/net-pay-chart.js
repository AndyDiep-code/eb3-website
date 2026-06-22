// Doughnut chart: paycheck breakdown (net-pay.html)
// Loaded as a plain (non-module) <script> AFTER the Chart.js CDN script.
let paycheckChartInstance = null;

function updatePaycheckChart(net, fed, ss, medicare, state) {
  const ctx = document.getElementById('paycheckChart');
  if (!ctx) return;

  const data = [net, fed, ss, medicare, state].map(v => Math.max(0, v));
  const labels = ['Net (thực nhận)', 'Thuế Liên Bang', 'Social Security', 'Medicare', 'Thuế Tiểu Bang'];
  const colors = ['#4ade80', '#ef4444', '#f59e0b', '#f97316', '#a855f7'];

  if (paycheckChartInstance) paycheckChartInstance.destroy();

  paycheckChartInstance = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: labels,
      datasets: [{ data: data, backgroundColor: colors, borderWidth: 0 }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { position: 'bottom', labels: { color: '#94a3b8' } }
      }
    }
  });
}
