<!-- BEGIN: main -->
<style>
  .pv-wrap{max-width:720px;margin:24px auto;padding:0 16px}
  .pv-card{background:#fff;border:1px solid #e2e8f0;border-radius:8px;padding:28px 32px;margin-bottom:20px}
  .pv-title{font-size:20px;font-weight:700;color:#0e7490;margin:0 0 6px}
  .pv-intro{font-size:13px;color:#64748b;margin:0 0 24px}
  .pv-label{display:block;font-size:12px;font-weight:600;color:#374151;margin-bottom:5px}
  .pv-required{color:#dc2626;margin-left:2px}
  .pv-input,.pv-select,.pv-textarea{width:100%;border:1px solid #cbd5e1;border-radius:5px;
    padding:8px 12px;font-size:13px;color:#0f172a;box-sizing:border-box;
    transition:border-color .15s}
  .pv-input:focus,.pv-select:focus,.pv-textarea:focus{border-color:#0e7490;outline:none;
    box-shadow:0 0 0 3px rgba(14,116,144,.12)}
  .pv-textarea{resize:vertical;min-height:120px;line-height:1.6}
  .pv-form-row{display:flex;gap:16px;flex-wrap:wrap}
  .pv-form-row .pv-col{flex:1;min-width:180px}
  .pv-form-group{margin-bottom:16px}
  .pv-hint{font-size:11px;color:#94a3b8;margin-top:4px}
  .pv-btn-primary{background:#0e7490;color:#fff;border:none;border-radius:5px;
    padding:10px 24px;font-size:14px;font-weight:600;cursor:pointer;
    transition:background .15s}
  .pv-btn-primary:hover{background:#0c6680}
  .pv-btn-link{color:#0e7490;font-size:13px;text-decoration:none;font-weight:500}
  .pv-btn-link:hover{text-decoration:underline}
  .pv-alert-ok{background:#ecfdf5;border:1px solid #6ee7b7;color:#065f46;
    border-radius:7px;padding:18px 20px;margin-bottom:20px}
  .pv-alert-ok strong{font-size:15px;display:block;margin-bottom:6px}
  .pv-alert-err{background:#fef2f2;border:1px solid #fca5a5;color:#991b1b;
    border-radius:7px;padding:14px 18px;margin-bottom:16px}
  .pv-alert-err ul{margin:6px 0 0 16px;padding:0}
  .pv-alert-err li{font-size:13px;margin-bottom:3px}
  .pv-divider{border:none;border-top:1px solid #f1f5f9;margin:24px 0}
  .pv-lookup-bar{display:flex;align-items:center;gap:12px;flex-wrap:wrap}
  @media(max-width:480px){.pv-form-row{flex-direction:column}.pv-lookup-bar{flex-direction:column;align-items:flex-start}}
</style>

<div class="pv-wrap">

  <!-- ── Success message (shown after successful submit) ── -->
  <!-- BEGIN: submit_ok -->
  <div class="pv-alert-ok">
    <strong>&#10003; {LANG.submit_ok}</strong>
    {SUCCESS_MSG}
    <div style="margin-top:12px">
      <a href="{LOOKUP_URL}" class="pv-btn-link">&rarr; {LANG.btn_check_status}</a>
    </div>
  </div>
  <!-- END: submit_ok -->

  <!-- ── Submission form ── -->
  <!-- BEGIN: form_block -->
  <div class="pv-card">
    <h2 class="pv-title">{LANG.main_title}</h2>
    <p class="pv-intro">{LANG.main_intro}</p>

    <!-- BEGIN: error_list -->
    <div class="pv-alert-err">
      <ul>
        <!-- BEGIN: error_item -->
        <li>{ERR}</li>
        <!-- END: error_item -->
      </ul>
    </div>
    <!-- END: error_list -->

    <form method="post" action="{FORM_ACTION}" novalidate>
      <input type="hidden" name="submit" value="1" />

      <div class="pv-form-group">
        <label class="pv-label">{LANG.field_subject} <span class="pv-required">*</span></label>
        <input type="text" name="subject" class="pv-input"
          value="{DATA.subject}" placeholder="{LANG.field_subject_ph}" maxlength="255" />
      </div>

      <div class="pv-form-row">
        <div class="pv-col">
          <div class="pv-form-group">
            <label class="pv-label">{LANG.field_type}</label>
            <select name="feedback_type" class="pv-select">{TYPE_OPTS}</select>
          </div>
        </div>
        <div class="pv-col">
          <div class="pv-form-group">
            <label class="pv-label">{LANG.field_dept} <span class="pv-required">*</span></label>
            <select name="dept_id" class="pv-select">{DEPT_OPTS}</select>
          </div>
        </div>
      </div>

      <div class="pv-form-group">
        <label class="pv-label">{LANG.field_body}</label>
        <textarea name="body" class="pv-textarea"
          placeholder="{LANG.field_body_ph}">{DATA.body}</textarea>
      </div>

      <hr class="pv-divider" />

      <div class="pv-form-row">
        <div class="pv-col">
          <div class="pv-form-group">
            <label class="pv-label">{LANG.field_name} <span class="pv-required">*</span></label>
            <input type="text" name="patient_name" class="pv-input"
              value="{DATA.patient_name}" maxlength="128" />
          </div>
        </div>
        <div class="pv-col">
          <div class="pv-form-group">
            <label class="pv-label">{LANG.field_phone} <span class="pv-required">*</span></label>
            <input type="tel" name="patient_phone" class="pv-input"
              value="{DATA.patient_phone}" maxlength="20" />
          </div>
        </div>
      </div>

      <div class="pv-form-group">
        <label class="pv-label">{LANG.field_email}</label>
        <input type="email" name="patient_email" class="pv-input"
          value="{DATA.patient_email}" maxlength="128" />
        <div class="pv-hint">{LANG.required_note}</div>
      </div>

      <div style="display:flex;align-items:center;gap:20px;flex-wrap:wrap;margin-top:8px">
        <button type="submit" class="pv-btn-primary">{LANG.btn_submit}</button>
        <a href="{LOOKUP_URL}" class="pv-btn-link">{LANG.btn_check_status} &rarr;</a>
      </div>

    </form>
  </div>
  <!-- END: form_block -->

</div>
<!-- END: main -->
