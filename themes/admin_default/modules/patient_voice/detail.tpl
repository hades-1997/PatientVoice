<!-- BEGIN: main -->
<style>
  /* ── Shared badges (reused from main.tpl) ── */
  .pv-badge{display:inline-block;padding:2px 8px;border-radius:9999px;font-size:11px;font-weight:600;white-space:nowrap}
  .pv-badge-new{background:#dbeafe;color:#1d4ed8}
  .pv-badge-assigned{background:#ede9fe;color:#5b21b6}
  .pv-badge-in-progress{background:#fef3c7;color:#92400e}
  .pv-badge-pending{background:#ffedd5;color:#9a3412}
  .pv-badge-resolved{background:#d1fae5;color:#065f46}
  .pv-badge-unresolved{background:#fee2e2;color:#991b1b}
  .pv-pri-urgent{color:#dc2626;font-weight:700}
  .pv-pri-high{color:#ea580c;font-weight:600}
  .pv-pri-normal{color:#64748b}

  /* ── Layout ── */
  .pv-card{background:#fff;border:1px solid #e2e8f0;border-radius:6px;padding:18px 20px;margin-bottom:14px}
  .pv-card-title{font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.05em;
    color:#475569;margin:0 0 12px;padding-bottom:8px;border-bottom:1px solid #f1f5f9}

  /* ── Timeline ── */
  .pv-timeline{position:relative;padding-left:42px}
  .pv-timeline::before{content:'';position:absolute;left:15px;top:4px;bottom:0;width:2px;background:#e2e8f0}
  .pv-tline-item{position:relative;margin-bottom:14px}
  .pv-tline-icon{position:absolute;left:-42px;top:2px;width:32px;height:32px;border-radius:50%;
    background:#fff;border:2px solid #e2e8f0;display:flex;align-items:center;justify-content:center;z-index:1}
  .pv-tline-icon i{width:14px;height:14px}
  .pv-tline-content{background:#f8fafc;border:1px solid #e2e8f0;border-radius:6px;padding:10px 12px}
  .pv-tline-title{font-size:13px;font-weight:500;color:#0f172a;margin-bottom:3px}
  .pv-tline-meta{font-size:11px;color:#64748b}
  .pv-tline-body{font-size:12px;color:#334155;margin-top:8px;padding-top:8px;border-top:1px solid #e2e8f0;
    white-space:pre-wrap;line-height:1.6}
  .pv-tline-internal .pv-tline-content{border-style:dashed;border-color:#93c5fd;background:#eff6ff}

  .tline-created .pv-tline-icon{border-color:#6ee7b7;color:#059669}
  .tline-edit    .pv-tline-icon{border-color:#93c5fd;color:#2563eb}
  .tline-assigned .pv-tline-icon{border-color:#fdba74;color:#ea580c}
  .tline-status  .pv-tline-icon{border-color:#c4b5fd;color:#7c3aed}
  .tline-note    .pv-tline-icon{border-color:#cbd5e1;color:#475569}
  .tline-danger  .pv-tline-icon{border-color:#fca5a5;color:#dc2626}

  /* ── Sidebar ── */
  .pv-sidebar-lbl{font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.05em;
    color:#64748b;display:block;margin-bottom:4px}
  .pv-sidebar-val{font-size:13px;color:#0f172a;margin-bottom:12px}
  .pv-sidebar-val.muted{color:#64748b}

  /* ── SLA bar ── */
  .pv-sla-bar{height:8px;border-radius:4px;background:#e2e8f0;overflow:hidden;margin:6px 0}
  .pv-sla-fill{height:100%;border-radius:4px;transition:width .3s}
  .pv-sla-fill.success{background:#059669}
  .pv-sla-fill.warning{background:#ea580c}
  .pv-sla-fill.danger{background:#dc2626}
  .pv-sla-remaining{font-size:12px;font-weight:600;font-variant-numeric:tabular-nums}
  .pv-sla-remaining.danger{color:#dc2626}
  .pv-sla-remaining.warning{color:#ea580c}
  .pv-sla-remaining.success{color:#059669}

  /* ── Note form ── */
  .pv-note-form{background:#f8fafc;border:1px solid #e2e8f0;border-radius:6px;padding:14px 16px;margin-top:12px}
  .pv-note-form textarea{resize:vertical;font-size:13px}
</style>

<div class="box-content">

  <!-- Page header -->
  <div class="clearfix" style="margin-bottom:16px">
    <a href="{URL_LIST}" class="pull-left" style="font-size:12px;color:#64748b;margin-top:2px;display:inline-block">
      <i class="fa fa-arrow-left"></i> {LANG.detail_back}
    </a>
    <div class="pull-right">
      <a href="{URL_EDIT}" class="btn btn-default btn-sm">
        <i class="fa fa-pencil"></i> {LANG.detail_edit}
      </a>
      <button type="button" class="btn btn-danger btn-sm" onclick="pvConfirmDelete()">
        <i class="fa fa-trash"></i> {LANG.detail_delete}
      </button>
    </div>
  </div>

  <!-- Ticket badge + subject -->
  <div style="margin-bottom:16px">
    <span style="font-family:monospace;font-size:12px;font-weight:700;color:#0e7490;margin-right:10px">{TICKET_NO}</span>
    <span class="pv-badge pv-badge-{STATUS_SLUG}">{STATUS_LABEL}</span>
    <span class="pv-pri pv-pri-{PRIORITY_SLUG}" style="margin-left:8px;font-size:12px;font-weight:600">{PRIORITY_LABEL}</span>
    <h3 style="margin:8px 0 0;font-size:17px;color:#0f172a">{SUBJECT}</h3>
  </div>

  <div class="row">

    <!-- ── Left column: body + timeline + note ── -->
    <div class="col-md-8">

      <!-- Body -->
      <div class="pv-card">
        <div class="pv-card-title">{LANG.detail_body}</div>

        <!-- BEGIN: has_body -->
        <div style="font-size:13px;line-height:1.7;color:#334155;white-space:pre-wrap">{BODY_HTML}</div>
        <!-- END: has_body -->

        <!-- BEGIN: no_body -->
        <div style="font-size:12px;color:#94a3b8;font-style:italic">Không có nội dung chi tiết.</div>
        <!-- END: no_body -->

      </div>

      <!-- Timeline -->
      <div class="pv-card">
        <div class="pv-card-title">{LANG.detail_timeline}</div>

        <!-- BEGIN: no_timeline -->
        <div style="font-size:12px;color:#94a3b8;font-style:italic">Chưa có hoạt động nào.</div>
        <!-- END: no_timeline -->

        <div class="pv-timeline">

          <!-- BEGIN: loop_timeline -->
          <div class="pv-tline-item {TLINE.internal_cls} {TLINE.css}">
            <div class="pv-tline-icon">
              <i data-lucide="{TLINE.icon}"></i>
            </div>
            <div class="pv-tline-content">
              <div class="pv-tline-title">
                {TLINE.title}
                <!-- BEGIN: tline_internal_badge -->
                <span class="label label-info" style="font-size:10px;margin-left:4px">Nội bộ</span>
                <!-- END: tline_internal_badge -->
              </div>
              <div class="pv-tline-meta">{TLINE.actor} &middot; {TLINE.addtime_fmt}</div>
              <!-- BEGIN: tline_has_body -->
              <div class="pv-tline-body">{TLINE.body}</div>
              <!-- END: tline_has_body -->
            </div>
          </div>
          <!-- END: loop_timeline -->

        </div>
      </div>

      <!-- Add note form -->
      <div class="pv-note-form">
        <div class="pv-card-title" style="border-bottom:0;margin-bottom:10px">{LANG.detail_add_note}</div>
        <form method="post" action="{FORM_ACTION}">
          <input type="hidden" name="{NV_LANG_VARIABLE}" value="{NV_LANG_DATA}" />
          <input type="hidden" name="{NV_NAME_VARIABLE}" value="{MODULE_NAME}" />
          <input type="hidden" name="{NV_OP_VARIABLE}"   value="detail" />
          <input type="hidden" name="action" value="add_note" />
          <input type="hidden" name="id"     value="{FEEDBACK_ID}" />
          <textarea name="note_body" class="form-control" rows="3"
            placeholder="{LANG.detail_note_ph}" style="margin-bottom:8px"></textarea>
          <div class="clearfix">
            <div class="pull-left">
              <label style="font-size:12px;font-weight:400;color:#475569">
                <input type="checkbox" name="is_internal" value="1" checked />
                Ghi chú nội bộ (không hiện với bệnh nhân)
              </label>
            </div>
            <div class="pull-right">
              <button type="submit" class="btn btn-default btn-sm">
                <i class="fa fa-paper-plane-o"></i> {LANG.detail_post_note}
              </button>
            </div>
          </div>
        </form>
      </div>

    </div><!-- /.col-md-8 -->

    <!-- ── Right sidebar ── -->
    <div class="col-md-4">

      <!-- Change status -->
      <div class="pv-card">
        <div class="pv-card-title">{LANG.detail_change_status}</div>
        {STATUS_BTNS}
      </div>

      <!-- Assignee -->
      <div class="pv-card">
        <div class="pv-card-title">{LANG.detail_assignee}</div>
        <div style="font-size:13px;color:#0f172a;margin-bottom:10px">{ASSIGNEE_NAME}</div>
        <button type="button" class="btn btn-default btn-sm btn-block"
          onclick="document.getElementById('pv_assign_form').style.display=document.getElementById('pv_assign_form').style.display==='none'?'':'none'">
          <i class="fa fa-user-plus"></i> {LANG.detail_assign_btn}
        </button>
        <div id="pv_assign_form" style="display:none;margin-top:10px">
          <form method="post" action="{FORM_ACTION}">
            <input type="hidden" name="{NV_LANG_VARIABLE}" value="{NV_LANG_DATA}" />
            <input type="hidden" name="{NV_NAME_VARIABLE}" value="{MODULE_NAME}" />
            <input type="hidden" name="{NV_OP_VARIABLE}"   value="detail" />
            <input type="hidden" name="action" value="assign" />
            <input type="hidden" name="id"     value="{FEEDBACK_ID}" />
            <select name="assignee_id" class="form-control" style="margin-bottom:6px;font-size:13px">
              {ASSIGNEE_OPTS}
            </select>
            <!-- BEGIN: assign_manual_input -->
            <input type="text" name="assignee_name" class="form-control"
              placeholder="Tên người xử lý…"
              style="margin-bottom:6px;font-size:13px" />
            <!-- END: assign_manual_input -->
            <button type="submit" class="btn btn-primary btn-sm btn-block">
              {LANG.detail_assign_btn}
            </button>
          </form>
        </div>
      </div>

      <!-- SLA -->
      <div class="pv-card">
        <div class="pv-card-title">{LANG.detail_sla_status}</div>

        <!-- BEGIN: sla_bar -->
        <div class="pv-sla-bar">
          <div class="pv-sla-fill {SLA_BAR_CLASS}" style="width:{SLA_WIDTH}%"></div>
        </div>
        <div class="clearfix" style="margin-top:4px">
          <span class="pv-sla-remaining {SLA_BAR_CLASS} pull-left">{SLA_REMAINING}</span>
          <span style="font-size:11px;color:#64748b;pull-right">{SLA_STATUS_TEXT} · {SLA_PCT}%</span>
        </div>
        <!-- END: sla_bar -->

        <!-- BEGIN: sla_closed -->
        <div class="{SLA_CLOSED_CLS}" style="font-size:12px;font-weight:600">
          <i class="fa fa-check-circle"></i> {SLA_CLOSED_TEXT}
        </div>
        <!-- END: sla_closed -->

        <!-- BEGIN: sla_none -->
        <div style="font-size:12px;color:#94a3b8">Không có deadline SLA</div>
        <!-- END: sla_none -->

      </div>

      <!-- Ticket meta -->
      <div class="pv-card">
        <div class="pv-card-title">{LANG.detail_ticket_info}</div>

        <span class="pv-sidebar-lbl">{LANG.col_type}</span>
        <div class="pv-sidebar-val">
          <i data-lucide="{TYPE_ICON}" style="width:13px;height:13px;vertical-align:middle;margin-right:3px"></i>
          {TYPE_LABEL}
        </div>

        <span class="pv-sidebar-lbl">{LANG.col_channel}</span>
        <div class="pv-sidebar-val">
          <i data-lucide="{CHANNEL_ICON}" style="width:13px;height:13px;vertical-align:middle;margin-right:3px"></i>
          {CHANNEL_LABEL}
        </div>

        <span class="pv-sidebar-lbl">{LANG.col_dept}</span>
        <div class="pv-sidebar-val">{DEPT_NAME}</div>

        <span class="pv-sidebar-lbl">{LANG.col_created}</span>
        <div class="pv-sidebar-val muted">{ADDTIME}</div>

        <span class="pv-sidebar-lbl">Cập nhật</span>
        <div class="pv-sidebar-val muted">{EDITTIME}</div>
      </div>

      <!-- Patient info -->
      <div class="pv-card">
        <div class="pv-card-title">{LANG.detail_patient_info}</div>

        <span class="pv-sidebar-lbl">{LANG.field_patient_name}</span>
        <div class="pv-sidebar-val">{PATIENT_NAME}</div>

        <span class="pv-sidebar-lbl">{LANG.field_patient_phone}</span>
        <div class="pv-sidebar-val">
          <a href="tel:{PATIENT_PHONE}" style="color:#0e7490">{PATIENT_PHONE}</a>
        </div>

        <span class="pv-sidebar-lbl">{LANG.field_patient_email}</span>
        <div class="pv-sidebar-val">
          <a href="mailto:{PATIENT_EMAIL}" style="color:#0e7490">{PATIENT_EMAIL}</a>
        </div>
      </div>

    </div><!-- /.col-md-4 -->
  </div><!-- /.row -->

</div><!-- /.box-content -->

<!-- Delete confirm form (hidden) -->
<form id="pv_delete_form" method="post"
  action="{NV_BASE_ADMINURL}index.php?{NV_LANG_VARIABLE}={NV_LANG_DATA}&amp;{NV_NAME_VARIABLE}={MODULE_NAME}&amp;{NV_OP_VARIABLE}=del_feedback"
  style="display:none">
  <input type="hidden" name="id" value="{FEEDBACK_ID}" />
</form>

<script>
(function () {
  if (window.lucide) { lucide.createIcons(); }

  window.pvConfirmDelete = function () {
    if (confirm('{LANG.confirm_delete}')) {
      document.getElementById('pv_delete_form').submit();
    }
  };
})();
</script>
<!-- END: main -->
