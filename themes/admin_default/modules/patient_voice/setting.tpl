<!-- BEGIN: main -->
<style>
  .pv-setting-panel{background:#fff;border:1px solid #e2e8f0;border-radius:6px;margin-bottom:16px;overflow:hidden}
  .pv-setting-panel-head{background:#f8fafc;padding:12px 18px;border-bottom:1px solid #e2e8f0;
    font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:.05em;color:#475569}
  .pv-setting-panel-body{padding:18px 20px}
  .pv-setting-panel-body .form-group{margin-bottom:14px}
  .pv-setting-panel-body label{font-size:12px;font-weight:600;color:#334155;margin-bottom:4px}
  .pv-setting-panel-body .form-control{font-size:13px;height:34px}
  .pv-setting-panel-body .help-block{font-size:11px;color:#64748b;margin-top:3px}
  .pv-sla-preview{display:inline-block;margin-left:8px;font-size:11px;color:#64748b;
    background:#f1f5f9;padding:2px 8px;border-radius:4px;vertical-align:middle}
</style>

<div class="box-content">
  <div class="clearfix" style="margin-bottom:16px">
    <h3 style="margin:0">{LANG.setting_title}</h3>
  </div>

  <!-- BEGIN: saved_msg -->
  <div class="alert alert-success">
    <i class="fa fa-check-circle"></i> {LANG.setting_saved}
  </div>
  <!-- END: saved_msg -->

  <!-- BEGIN: error_msg -->
  <div class="alert alert-danger">
    <i class="fa fa-exclamation-circle"></i> {LANG.setting_error}
  </div>
  <!-- END: error_msg -->

  <form method="post" action="{FORM_ACTION}">
    <input type="hidden" name="{NV_LANG_VARIABLE}" value="{NV_LANG_DATA}" />
    <input type="hidden" name="{NV_NAME_VARIABLE}" value="{MODULE_NAME}" />
    <input type="hidden" name="{NV_OP_VARIABLE}"   value="setting" />
    <input type="hidden" name="save" value="1" />

    <!-- SLA settings -->
    <div class="pv-setting-panel">
      <div class="pv-setting-panel-head">
        <i class="fa fa-clock-o" style="margin-right:6px"></i>{LANG.setting_sla}
      </div>
      <div class="pv-setting-panel-body">
        <div class="checkbox" style="margin-bottom:14px">
          <label style="font-size:13px;font-weight:400">
            <input type="checkbox" name="enable_sla" value="1"{CONFIG.enable_sla_chk} />
            Bật theo dõi SLA (deadline xử lý)
          </label>
        </div>
        <div class="row">
          <div class="col-sm-4">
            <div class="form-group">
              <label>
                <span style="color:#dc2626">&#9679;</span> {LANG.setting_sla_urgent}
              </label>
              <div class="input-group" style="max-width:180px">
                <input type="number" name="sla_urgent" class="form-control"
                  value="{CONFIG.sla_urgent}" min="1" max="168" />
                <span class="input-group-addon">giờ</span>
              </div>
            </div>
          </div>
          <div class="col-sm-4">
            <div class="form-group">
              <label>
                <span style="color:#ea580c">&#9679;</span> {LANG.setting_sla_high}
              </label>
              <div class="input-group" style="max-width:180px">
                <input type="number" name="sla_high" class="form-control"
                  value="{CONFIG.sla_high}" min="1" max="720" />
                <span class="input-group-addon">giờ</span>
              </div>
            </div>
          </div>
          <div class="col-sm-4">
            <div class="form-group">
              <label>
                <span style="color:#64748b">&#9679;</span> {LANG.setting_sla_normal}
              </label>
              <div class="input-group" style="max-width:180px">
                <input type="number" name="sla_normal" class="form-control"
                  value="{CONFIG.sla_normal}" min="1" max="720" />
                <span class="input-group-addon">giờ</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- General settings -->
    <div class="pv-setting-panel">
      <div class="pv-setting-panel-head">
        <i class="fa fa-cog" style="margin-right:6px"></i>Cài đặt chung
      </div>
      <div class="pv-setting-panel-body">
        <div class="row">
          <div class="col-sm-4">
            <div class="form-group">
              <label>{LANG.setting_ticket_prefix}</label>
              <input type="text" name="ticket_prefix" class="form-control"
                value="{CONFIG.ticket_prefix}" maxlength="10"
                style="font-family:monospace;font-weight:700;letter-spacing:.1em;text-transform:uppercase" />
              <span class="help-block">Chữ in hoa, không dấu. VD: <code>PV</code>, <code>FB</code>, <code>YK</code></span>
            </div>
          </div>
          <div class="col-sm-4">
            <div class="form-group">
              <label>{LANG.setting_per_page}</label>
              <input type="number" name="per_page" class="form-control"
                value="{CONFIG.per_page}" min="5" max="200" />
              <span class="help-block">Số phiếu hiển thị mỗi trang (5–200)</span>
            </div>
          </div>
        </div>
        <div class="form-group">
          <label>{LANG.setting_hospital_name}</label>
          <input type="text" name="hospital_name" class="form-control"
            value="{CONFIG.hospital_name}" maxlength="255"
            style="max-width:480px" />
          <span class="help-block">Tên cơ sở y tế, dùng trong tiêu đề phiếu và báo cáo</span>
        </div>
      </div>
    </div>

    <button type="submit" class="btn btn-primary">
      <i class="fa fa-save"></i> {LANG.setting_save}
    </button>

  </form>
</div>
<!-- END: main -->
