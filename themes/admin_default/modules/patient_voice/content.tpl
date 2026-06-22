<!-- BEGIN: main -->
<style>
  .pv-form-card{background:#fff;border:1px solid #e2e8f0;border-radius:6px;padding:20px 24px;margin-bottom:16px}
  .pv-form-card h4{margin:0 0 16px;font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:.05em;color:#475569;border-bottom:1px solid #f1f5f9;padding-bottom:10px}
  .pv-form-card .form-group{margin-bottom:14px}
  .pv-form-card label{font-size:12px;font-weight:600;color:#334155;margin-bottom:4px}
  .pv-form-card .form-control{font-size:13px}
  .pv-form-card select.form-control{height:34px}

  .pv-required{color:#dc2626;margin-left:2px}

  .pv-ticket-badge{display:inline-block;background:#f0fdf4;border:1px solid #bbf7d0;color:#065f46;
    font-family:monospace;font-size:13px;font-weight:700;padding:4px 12px;border-radius:6px}

  .pv-type-select option[value="1"]::before{content:"⚠ "}
  .pv-type-select option[value="2"]::before{content:"♥ "}

  /* Priority select color hint */
  select[name=priority] option[value="1"]{color:#dc2626;font-weight:700}
  select[name=priority] option[value="2"]{color:#ea580c;font-weight:600}

  .pv-sidebar-label{font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.05em;color:#64748b;margin-bottom:4px;display:block}
  .pv-sidebar-field{margin-bottom:14px}
  .pv-sidebar-field select.form-control{height:34px;font-size:13px}

  .pv-actions{display:flex;gap:8px;align-items:center;padding-top:4px}
</style>

<div class="box-content">

  <!-- Page header -->
  <div class="clearfix" style="margin-bottom:16px">
    <!-- BEGIN: edit_badge -->
    <span class="pull-right pv-ticket-badge"># {DATA.ticket_no}</span>
    <!-- END: edit_badge -->
    <h3 style="margin:0;line-height:30px;font-size:18px">{PAGE_TITLE}</h3>
  </div>

  <!-- Error block -->
  <!-- BEGIN: error_block -->
  <div class="alert alert-danger" style="font-size:13px">
    <i class="fa fa-exclamation-circle"></i> {ERRORS}
  </div>
  <!-- END: error_block -->

  <form method="post" action="{FORM_ACTION}">
    <input type="hidden" name="{NV_LANG_VARIABLE}" value="{NV_LANG_DATA}" />
    <input type="hidden" name="{NV_NAME_VARIABLE}" value="{MODULE_NAME}" />
    <input type="hidden" name="{NV_OP_VARIABLE}"   value="content" />
    <input type="hidden" name="save" value="1" />
    <input type="hidden" name="id"   value="{DATA.id}" />

    <div class="row">

      <!-- ── Left column: main fields ── -->
      <div class="col-md-8">

        <!-- Subject -->
        <div class="pv-form-card">
          <div class="form-group" style="margin-bottom:0">
            <label for="pv_subject">{LANG.field_subject}<span class="pv-required">*</span></label>
            <textarea id="pv_subject" name="subject" class="form-control" rows="3"
              placeholder="Tóm tắt nội dung phản hồi của bệnh nhân…"
              style="resize:vertical">{DATA.subject}</textarea>
          </div>
        </div>

        <!-- Patient info -->
        <div class="pv-form-card">
          <h4><i class="fa fa-user-o" style="margin-right:6px"></i>{LANG.detail_patient_info}</h4>
          <div class="row">
            <div class="col-sm-4">
              <div class="form-group">
                <label for="pv_pname">{LANG.field_patient_name}</label>
                <input id="pv_pname" type="text" name="patient_name" class="form-control"
                  placeholder="Họ và tên" value="{DATA.patient_name}" />
              </div>
            </div>
            <div class="col-sm-4">
              <div class="form-group">
                <label for="pv_phone">{LANG.field_patient_phone}</label>
                <input id="pv_phone" type="text" name="patient_phone" class="form-control"
                  placeholder="0909 xxx xxx" value="{DATA.patient_phone}" />
              </div>
            </div>
            <div class="col-sm-4">
              <div class="form-group">
                <label for="pv_email">{LANG.field_patient_email}</label>
                <input id="pv_email" type="email" name="patient_email" class="form-control"
                  placeholder="email@example.com" value="{DATA.patient_email}" />
              </div>
            </div>
          </div>
        </div>

        <!-- Body -->
        <div class="pv-form-card">
          <div class="form-group" style="margin-bottom:0">
            <label for="pv_body">{LANG.field_body}</label>
            <textarea id="pv_body" name="body" class="form-control" rows="7"
              placeholder="Mô tả chi tiết nội dung phản hồi, hoàn cảnh xảy ra, yêu cầu của bệnh nhân…"
              style="resize:vertical">{DATA.body}</textarea>
          </div>
        </div>

      </div><!-- /.col-md-8 -->

      <!-- ── Right column: triage fields ── -->
      <div class="col-md-4">
        <div class="pv-form-card" style="position:sticky;top:60px">

          <div class="pv-sidebar-field">
            <span class="pv-sidebar-label">{LANG.field_dept}<span class="pv-required">*</span></span>
            <select name="dept_id" class="form-control">{DEPT_OPTS}</select>
          </div>

          <div class="pv-sidebar-field">
            <span class="pv-sidebar-label">{LANG.field_type}</span>
            <select name="feedback_type" class="form-control pv-type-select">{TYPE_OPTS}</select>
          </div>

          <div class="pv-sidebar-field">
            <span class="pv-sidebar-label">{LANG.field_priority}</span>
            <select name="priority" class="form-control">{PRIORITY_OPTS}</select>
          </div>

          <div class="pv-sidebar-field">
            <span class="pv-sidebar-label">{LANG.field_channel}</span>
            <select name="channel" class="form-control">{CHANNEL_OPTS}</select>
          </div>

          <div class="pv-sidebar-field">
            <span class="pv-sidebar-label">{LANG.field_assignee}</span>
            <select name="assignee_id" id="pv_assignee_id" class="form-control">{ASSIGNEE_OPTS}</select>
          </div>

          <!-- BEGIN: assignee_manual -->
          <div class="pv-sidebar-field" id="pv_manual_wrap">
            <span class="pv-sidebar-label" style="color:#94a3b8">Tên người xử lý (nhập tay)</span>
            <input type="text" name="assignee_name" class="form-control"
              placeholder="Họ tên người xử lý…" value="{DATA.assignee_name}" />
          </div>
          <!-- END: assignee_manual -->

          <hr style="margin:16px 0;border-color:#f1f5f9" />

          <!-- Actions -->
          <div class="pv-actions">
            <button type="submit" class="btn btn-primary" style="flex:1">
              <i class="fa fa-save"></i> {LANG.btn_save}
            </button>
            <a href="{URL_LIST}" class="btn btn-default">
              {LANG.btn_cancel}
            </a>
          </div>

        </div><!-- /.pv-form-card -->
      </div><!-- /.col-md-4 -->

    </div><!-- /.row -->
  </form>

</div><!-- /.box-content -->

<script>
(function () {
  /* When a system user is selected, hide the manual name field (if shown) */
  var sel = document.getElementById('pv_assignee_id');
  var wrap = document.getElementById('pv_manual_wrap');
  if (sel && wrap) {
    function syncManual() {
      wrap.style.display = sel.value > 0 ? 'none' : '';
    }
    sel.addEventListener('change', syncManual);
    syncManual();
  }
})();
</script>
<!-- END: main -->
