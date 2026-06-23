<!-- BEGIN: main -->
<style>
  .pv-kpi-row{display:flex;gap:12px;margin-bottom:20px;flex-wrap:wrap}
  .pv-kpi{flex:1;min-width:140px;background:#fff;border-radius:6px;padding:14px 16px;box-shadow:0 1px 3px rgba(0,0,0,.08);border-left:4px solid #0e7490}
  .pv-kpi.kpi-open{border-color:#14b8a6}
  .pv-kpi.kpi-week{border-color:#2563eb}
  .pv-kpi.kpi-overdue{border-color:#dc2626}
  .pv-kpi.kpi-sla{border-color:#059669}
  .pv-kpi-value{font-size:26px;font-weight:700;line-height:1;color:#0f172a}
  .pv-kpi.kpi-overdue .pv-kpi-value{color:#dc2626}
  .pv-kpi-label{font-size:11px;color:#64748b;text-transform:uppercase;letter-spacing:.05em;margin-top:4px}

  .pv-badge{display:inline-block;padding:2px 8px;border-radius:9999px;font-size:11px;font-weight:600;white-space:nowrap}
  .pv-badge-new{background:#dbeafe;color:#1d4ed8}
  .pv-badge-assigned{background:#ede9fe;color:#5b21b6}
  .pv-badge-in-progress{background:#fef3c7;color:#92400e}
  .pv-badge-pending{background:#ffedd5;color:#9a3412}
  .pv-badge-resolved{background:#d1fae5;color:#065f46}
  .pv-badge-unresolved{background:#fee2e2;color:#991b1b}

  .pv-pri{font-size:12px;font-weight:600}
  .pv-pri-urgent{color:#dc2626}
  .pv-pri-high{color:#ea580c}
  .pv-pri-normal{color:#64748b}

  .pv-sla{font-size:12px;font-weight:600;font-variant-numeric:tabular-nums}
  .sla-ok{color:#059669}
  .sla-warning{color:#ea580c}
  .sla-breached{color:#dc2626}

  .pv-filter-bar{background:#f8fafc;border:1px solid #e2e8f0;border-radius:6px;padding:12px 14px;margin-bottom:16px}
  .pv-filter-bar select,.pv-filter-bar input[type=text]{height:32px;padding:4px 8px;font-size:13px}

  .pv-ticket-no{font-family:monospace;font-size:12px;font-weight:700;color:#0e7490}
  .pv-subject{font-size:13px;color:#0f172a;font-weight:500}
  .pv-patient-meta{font-size:11px;color:#64748b;margin-top:2px}

  .table-pv th{background:#f1f5f9;font-size:11px;text-transform:uppercase;letter-spacing:.04em;color:#475569;font-weight:600;white-space:nowrap}
  .table-pv td{vertical-align:middle;font-size:13px}
  .table-pv tbody tr:hover{background:#f8fafc}
</style>

<div class="box-content">

  <!-- Page header -->
  <div class="clearfix" style="margin-bottom:16px">
    <h3 class="pull-left" style="margin:0;line-height:34px">{LANG.dash_title}</h3>
    <a href="{URL_NEW}" class="btn btn-primary btn-sm pull-right">
      <i class="fa fa-plus"></i> {LANG.menu_new_ticket}
    </a>
  </div>

  <!-- KPI cards -->
  <div class="pv-kpi-row">
    <div class="pv-kpi">
      <div class="pv-kpi-value">{KPI_NEW_TODAY}</div>
      <div class="pv-kpi-label">{LANG.dash_new_today}</div>
    </div>
    <div class="pv-kpi kpi-open">
      <div class="pv-kpi-value">{KPI_OPEN}</div>
      <div class="pv-kpi-label">{LANG.dash_open}</div>
    </div>
    <div class="pv-kpi kpi-week">
      <div class="pv-kpi-value">{KPI_WEEK}</div>
      <div class="pv-kpi-label">{LANG.dash_week}</div>
    </div>
    <div class="pv-kpi kpi-overdue">
      <div class="pv-kpi-value">{KPI_OVERDUE}</div>
      <div class="pv-kpi-label">{LANG.dash_overdue}</div>
    </div>
    <div class="pv-kpi kpi-sla">
      <div class="pv-kpi-value">{KPI_SLA_PCT}%</div>
      <div class="pv-kpi-label">{LANG.dash_sla}</div>
    </div>
  </div>

  <!-- Filter bar -->
  <form method="get" action="{NV_BASE_ADMINURL}index.php" class="pv-filter-bar">
    <input type="hidden" name="{NV_LANG_VARIABLE}" value="{NV_LANG_DATA}" />
    <input type="hidden" name="{NV_NAME_VARIABLE}" value="{MODULE_NAME}" />
    <input type="hidden" name="{NV_OP_VARIABLE}"   value="admin_list" />
    <div class="row" style="margin:0">
      <div class="col-sm-3" style="padding:0 4px 6px 0">
        <input type="text" name="q" class="form-control" placeholder="{LANG.filter_search_ph}" value="{F_Q}" />
      </div>
      <div class="col-sm-2" style="padding:0 4px 6px 0">
        <select name="status" class="form-control">{STATUS_OPTS}</select>
      </div>
      <div class="col-sm-2" style="padding:0 4px 6px 0">
        <select name="priority" class="form-control">{PRIORITY_OPTS}</select>
      </div>
      <div class="col-sm-2" style="padding:0 4px 6px 0">
        <select name="feedback_type" class="form-control">{TYPE_OPTS}</select>
      </div>
      <div class="col-sm-2" style="padding:0 4px 6px 0">
        <select name="dept_id" class="form-control">{DEPT_OPTS}</select>
      </div>
      <div class="col-sm-1" style="padding:0">
        <button type="submit" class="btn btn-default btn-block" style="height:32px;padding:4px 8px">
          <i class="fa fa-search"></i>
        </button>
      </div>
    </div>
    <div style="margin-top:2px">
      <a href="{URL_RESET}" style="font-size:11px;color:#64748b">{LANG.filter_reset}</a>
    </div>
  </form>

  <!-- Feedback table -->
  <div class="table-responsive">
    <table class="table table-bordered table-hover table-pv" style="margin-bottom:0">
      <thead>
        <tr>
          <th style="width:110px">{LANG.col_ticket}</th>
          <th>{LANG.col_subject}</th>
          <th style="width:100px">{LANG.col_type}</th>
          <th style="width:80px">{LANG.col_priority}</th>
          <th style="width:130px">{LANG.col_status}</th>
          <th style="width:140px">{LANG.col_dept}</th>
          <th style="width:120px">{LANG.col_assignee}</th>
          <th style="width:90px">{LANG.col_sla}</th>
          <th style="width:110px">{LANG.col_created}</th>
          <th style="width:50px" class="text-center">{LANG.col_actions}</th>
        </tr>
      </thead>
      <tbody>

        <!-- BEGIN: no_rows -->
        <tr>
          <td colspan="10" class="text-center" style="padding:40px 0;color:#94a3b8">
            <i class="fa fa-inbox fa-2x" style="display:block;margin-bottom:10px;opacity:.5"></i>
            {LANG.no_rows}
          </td>
        </tr>
        <!-- END: no_rows -->

        <!-- BEGIN: loop_rows -->
        <tr>
          <td>
            <a href="{ROW.url_detail}" class="pv-ticket-no">{ROW.ticket_no}</a>
          </td>
          <td>
            <div class="pv-subject">{ROW.subject}</div>
            <div class="pv-patient-meta">{ROW.patient_name}</div>
          </td>
          <td>
            <i data-lucide="{ROW.type_icon}" style="width:13px;height:13px;vertical-align:middle;margin-right:3px"></i>{ROW.type_label}
          </td>
          <td>
            <span class="pv-pri pv-pri-{ROW.priority_slug}">{ROW.priority_label}</span>
          </td>
          <td>
            <span class="pv-badge pv-badge-{ROW.status_slug}">{ROW.status_label}</span>
          </td>
          <td style="font-size:12px;color:#334155">{ROW.dept_name}</td>
          <td style="font-size:12px;color:#475569">{ROW.assignee_name}</td>
          <td>
            <span class="pv-sla {ROW.sla_cls}">{ROW.sla_remaining}</span>
          </td>
          <td style="font-size:12px;color:#64748b;white-space:nowrap">{ROW.addtime_fmt}</td>
          <td class="text-center">
            <a href="{ROW.url_detail}" class="btn btn-xs btn-default" title="{LANG.detail_title}">
              <i class="fa fa-eye"></i>
            </a>
          </td>
        </tr>
        <!-- END: loop_rows -->

      </tbody>
    </table>
  </div>

  <!-- Footer: count + pagination -->
  <div class="clearfix" style="margin-top:10px;min-height:32px">
    <div class="pull-left" style="font-size:12px;color:#64748b;line-height:32px">
      {PAGE_START}–{PAGE_END} {LANG.pagination_of} {TOTAL} {LANG.pagination_items}
    </div>

    <!-- BEGIN: pagination -->
    <ul class="pagination pagination-sm pull-right" style="margin:0">
      <li class="{PREV_DIS}"><a href="{PREV_URL}">&laquo;</a></li>
      <!-- BEGIN: loop_pages -->
      <li class="{PAGER.active}"><a href="{PAGER.url}">{PAGER.num}</a></li>
      <!-- END: loop_pages -->
      <li class="{NEXT_DIS}"><a href="{NEXT_URL}">&raquo;</a></li>
    </ul>
    <!-- END: pagination -->
  </div>

</div><!-- /.box-content -->

<script>
(function () {
  if (window.lucide) { lucide.createIcons(); }
})();
</script>
<!-- END: main -->
