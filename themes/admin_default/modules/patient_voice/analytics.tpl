<!-- BEGIN: main -->
<style>
  /* ── Shared tokens ── */
  :root{--pv-primary:#0e7490;--pv-green:#059669;--pv-red:#dc2626;--pv-orange:#ea580c}
  .pv-kpi{background:#fff;border:1px solid #e2e8f0;border-radius:6px;padding:14px 16px;
    border-left:4px solid var(--pv-primary)}
  .pv-kpi-val{font-size:28px;font-weight:800;color:#0f172a;line-height:1.1}
  .pv-kpi-lbl{font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:.05em;
    color:#64748b;margin-top:4px}
  .pv-kpi.green{border-left-color:var(--pv-green)}.pv-kpi.green .pv-kpi-val{color:var(--pv-green)}
  .pv-kpi.red  {border-left-color:var(--pv-red)}.pv-kpi.red   .pv-kpi-val{color:var(--pv-red)}
  .pv-kpi.orange{border-left-color:var(--pv-orange)}.pv-kpi.orange .pv-kpi-val{color:var(--pv-orange)}

  .pv-chart-card{background:#fff;border:1px solid #e2e8f0;border-radius:6px;padding:18px 20px;
    margin-bottom:16px;height:100%;box-sizing:border-box}
  .pv-chart-title{font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.05em;
    color:#475569;margin-bottom:14px;padding-bottom:8px;border-bottom:1px solid #f1f5f9}

  /* ── Dept bars ── */
  .pv-dept-bar-bg{background:#f1f5f9;border-radius:4px;height:8px;flex:1}
  .pv-dept-bar-fill{background:#0e7490;height:100%;border-radius:4px;transition:width .4s}
  .pv-dept-row{display:flex;align-items:center;gap:10px;padding:5px 0;font-size:12px}
  .pv-dept-name{width:160px;color:#334155;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
  .pv-dept-cnt{width:28px;text-align:right;font-weight:700;color:#0f172a;font-size:12px}

  /* ── Breach table ── */
  .pv-breach-table{width:100%;border-collapse:collapse;font-size:12px}
  .pv-breach-table th{background:#f8fafc;padding:7px 10px;text-align:left;font-weight:700;
    font-size:11px;text-transform:uppercase;letter-spacing:.04em;color:#475569;
    border-bottom:2px solid #e2e8f0}
  .pv-breach-table td{padding:8px 10px;border-bottom:1px solid #f1f5f9;vertical-align:top}
  .pv-breach-table tr:hover td{background:#fff8f8}
  .pv-overdue-badge{background:#fee2e2;color:#991b1b;font-weight:700;font-size:11px;
    padding:2px 7px;border-radius:9999px;white-space:nowrap}
</style>

<div class="box-content">

  <!-- Page header + period tabs -->
  <div class="clearfix" style="margin-bottom:18px">
    <h3 class="pull-left" style="margin:0;font-size:17px">{PAGE_TITLE}</h3>
    <ul class="nav nav-pills pull-right" style="margin:0">
      {PERIOD_TABS}
    </ul>
  </div>

  <!-- KPI row -->
  <div class="row" style="margin-bottom:16px">
    <div class="col-sm-4 col-md" style="margin-bottom:10px">
      <div class="pv-kpi">
        <div class="pv-kpi-val">{KPI.new_today}</div>
        <div class="pv-kpi-lbl">{LANG.kpi_new_today}</div>
      </div>
    </div>
    <div class="col-sm-4 col-md" style="margin-bottom:10px">
      <div class="pv-kpi" style="border-left-color:#3b82f6">
        <div class="pv-kpi-val" style="color:#3b82f6">{KPI.open}</div>
        <div class="pv-kpi-lbl">{LANG.kpi_open}</div>
      </div>
    </div>
    <div class="col-sm-4 col-md" style="margin-bottom:10px">
      <div class="pv-kpi" style="border-left-color:#8b5cf6">
        <div class="pv-kpi-val" style="color:#8b5cf6">{KPI.week}</div>
        <div class="pv-kpi-lbl">{LANG.kpi_week}</div>
      </div>
    </div>
    <div class="col-sm-6 col-md" style="margin-bottom:10px">
      <div class="pv-kpi red">
        <div class="pv-kpi-val">{KPI.overdue}</div>
        <div class="pv-kpi-lbl">{LANG.kpi_overdue}</div>
      </div>
    </div>
    <div class="col-sm-6 col-md" style="margin-bottom:10px">
      <div class="pv-kpi green">
        <div class="pv-kpi-val">{KPI.sla_pct}%</div>
        <div class="pv-kpi-lbl">{LANG.analytics_sla_gauge}</div>
      </div>
    </div>
  </div>

  <!-- Row: Trend + Channel -->
  <div class="row">
    <div class="col-md-8" style="margin-bottom:16px">
      <div class="pv-chart-card">
        <div class="pv-chart-title">{LANG.analytics_trend}</div>
        <canvas id="pvChartTrend" height="80"></canvas>
      </div>
    </div>
    <div class="col-md-4" style="margin-bottom:16px">
      <div class="pv-chart-card">
        <div class="pv-chart-title">{LANG.analytics_channel}</div>
        <canvas id="pvChartChannel" height="200"></canvas>
      </div>
    </div>
  </div>

  <!-- Row: Type + Status -->
  <div class="row">
    <div class="col-md-6" style="margin-bottom:16px">
      <div class="pv-chart-card">
        <div class="pv-chart-title">Phân bổ loại phản hồi</div>
        <canvas id="pvChartType" height="140"></canvas>
      </div>
    </div>
    <div class="col-md-6" style="margin-bottom:16px">
      <div class="pv-chart-card">
        <div class="pv-chart-title">Phân bổ trạng thái</div>
        <canvas id="pvChartStatus" height="140"></canvas>
      </div>
    </div>
  </div>

  <!-- Row: Top depts + Breach queue -->
  <div class="row">

    <!-- Top departments -->
    <div class="col-md-5" style="margin-bottom:16px">
      <div class="pv-chart-card">
        <div class="pv-chart-title">{LANG.analytics_top_complaints}</div>
        <!-- BEGIN: loop_top_depts -->
        <div class="pv-dept-row">
          <div class="pv-dept-name" title="{DEPT.name}">{DEPT.name}</div>
          <div class="pv-dept-bar-bg">
            <div class="pv-dept-bar-fill" style="width:{DEPT.pct}%"></div>
          </div>
          <div class="pv-dept-cnt">{DEPT.cnt}</div>
        </div>
        <!-- END: loop_top_depts -->
      </div>
    </div>

    <!-- SLA breach queue -->
    <div class="col-md-7" style="margin-bottom:16px">
      <div class="pv-chart-card">
        <div class="pv-chart-title">{LANG.analytics_breached_queue}</div>

        <!-- BEGIN: no_breach -->
        <div style="font-size:12px;color:#059669;font-style:italic">
          <i class="fa fa-check-circle"></i> {LANG.analytics_no_breach}
        </div>
        <!-- END: no_breach -->

        <table class="pv-breach-table">
          <!-- BEGIN: loop_breach -->
          <tr>
            <td style="width:90px">
              <a href="{BREACH.url_detail}" style="font-family:monospace;font-weight:700;
                color:#0e7490;font-size:11px">{BREACH.ticket_no}</a>
            </td>
            <td>
              <div style="color:#0f172a;font-size:12px">{BREACH.subject}</div>
              <div style="color:#64748b;font-size:11px">{BREACH.dept_name}</div>
            </td>
            <td style="width:80px;text-align:right">
              <span class="pv-overdue-badge">+{BREACH.overdue_fmt}</span>
            </td>
          </tr>
          <!-- END: loop_breach -->
        </table>

      </div>
    </div>

  </div><!-- /.row -->

</div><!-- /.box-content -->

<!-- Chart.js -->
<script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js"></script>
<script>
(function () {
  Chart.defaults.font.family = "'Segoe UI', sans-serif";
  Chart.defaults.font.size   = 11;

  var TEAL    = '#0e7490';
  var TEAL_A  = 'rgba(14,116,144,.15)';
  var COLORS6 = ['#0e7490','#059669','#3b82f6','#8b5cf6','#ea580c','#dc2626'];
  var COLORS5 = ['#dc2626','#059669','#3b82f6','#f59e0b','#6366f1'];

  /* Trend bar chart */
  new Chart(document.getElementById('pvChartTrend'), {
    type: 'bar',
    data: {
      labels: {CHART.trend_labels},
      datasets: [{
        label: 'Phản hồi',
        data:  {CHART.trend_data},
        backgroundColor: TEAL_A,
        borderColor: TEAL,
        borderWidth: 2,
        borderRadius: 4
      }]
    },
    options: {
      responsive: true,
      plugins: { legend: { display: false } },
      scales: {
        y: { beginAtZero: true, ticks: { stepSize: 1, precision: 0 } }
      }
    }
  });

  /* Channel doughnut */
  new Chart(document.getElementById('pvChartChannel'), {
    type: 'doughnut',
    data: {
      labels:   {CHART.channel_labels},
      datasets: [{ data: {CHART.channel_data}, backgroundColor: COLORS6, hoverOffset: 6 }]
    },
    options: {
      responsive: true,
      cutout: '60%',
      plugins: {
        legend: { position: 'bottom', labels: { boxWidth: 10, padding: 8 } }
      }
    }
  });

  /* Type bar chart (horizontal) */
  new Chart(document.getElementById('pvChartType'), {
    type: 'bar',
    data: {
      labels:   {CHART.type_labels},
      datasets: [{
        label: 'Số phiếu',
        data:  {CHART.type_data},
        backgroundColor: COLORS5,
        borderRadius: 3
      }]
    },
    options: {
      indexAxis: 'y',
      responsive: true,
      plugins: { legend: { display: false } },
      scales: { x: { beginAtZero: true, ticks: { precision: 0 } } }
    }
  });

  /* Status doughnut */
  new Chart(document.getElementById('pvChartStatus'), {
    type: 'doughnut',
    data: {
      labels:   {CHART.status_labels},
      datasets: [{
        data:            {CHART.status_data},
        backgroundColor: ['#3b82f6','#8b5cf6','#f59e0b','#ea580c','#059669','#dc2626'],
        hoverOffset: 6
      }]
    },
    options: {
      responsive: true,
      cutout: '55%',
      plugins: {
        legend: { position: 'bottom', labels: { boxWidth: 10, padding: 8 } }
      }
    }
  });
})();
</script>
<!-- END: main -->
