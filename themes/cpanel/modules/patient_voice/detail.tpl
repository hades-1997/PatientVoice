<!-- BEGIN: main -->
<style>
  .pv-wrap{max-width:720px;margin:24px auto;padding:0 16px}
  .pv-card{background:#fff;border:1px solid #e2e8f0;border-radius:8px;padding:24px 28px;margin-bottom:16px}
  .pv-title{font-size:20px;font-weight:700;color:#0e7490;margin:0 0 6px}
  .pv-intro{font-size:13px;color:#64748b;margin:0 0 20px}
  .pv-label{display:block;font-size:12px;font-weight:600;color:#374151;margin-bottom:4px}
  .pv-input,.pv-select{width:100%;border:1px solid #cbd5e1;border-radius:5px;
    padding:8px 12px;font-size:13px;color:#0f172a;box-sizing:border-box}
  .pv-input:focus,.pv-select:focus{border-color:#0e7490;outline:none}
  .pv-form-row{display:flex;gap:12px;flex-wrap:wrap;align-items:flex-end}
  .pv-form-row .pv-col{flex:1;min-width:160px}
  .pv-form-group{margin-bottom:0}
  .pv-btn-primary{background:#0e7490;color:#fff;border:none;border-radius:5px;
    padding:9px 20px;font-size:13px;font-weight:600;cursor:pointer;white-space:nowrap}
  .pv-btn-link{color:#0e7490;font-size:13px;text-decoration:none}
  .pv-btn-link:hover{text-decoration:underline}

  /* Status badges */
  .pv-badge{display:inline-block;padding:3px 10px;border-radius:20px;font-size:12px;font-weight:600}
  .pv-badge-new{background:#dbeafe;color:#1d4ed8}
  .pv-badge-assigned{background:#ede9fe;color:#5b21b6}
  .pv-badge-in-progress{background:#fef3c7;color:#92400e}
  .pv-badge-pending{background:#ffedd5;color:#9a3412}
  .pv-badge-resolved{background:#d1fae5;color:#065f46}
  .pv-badge-unresolved{background:#fee2e2;color:#991b1b}

  /* Result meta grid */
  .pv-meta{display:grid;grid-template-columns:1fr 1fr;gap:12px 24px;margin-bottom:16px}
  .pv-meta-item{}
  .pv-meta-lbl{font-size:11px;text-transform:uppercase;letter-spacing:.04em;color:#64748b;font-weight:700;margin-bottom:3px}
  .pv-meta-val{font-size:13px;color:#0f172a}

  /* Timeline */
  .pv-timeline{position:relative;padding-left:28px;margin-top:16px}
  .pv-timeline::before{content:'';position:absolute;left:7px;top:6px;bottom:0;width:2px;background:#e2e8f0}
  .pv-tline-item{position:relative;margin-bottom:14px}
  .pv-tline-dot{position:absolute;left:-28px;top:4px;width:16px;height:16px;border-radius:50%;
    background:#0e7490;border:3px solid #fff;box-shadow:0 0 0 2px #0e7490}
  .pv-tline-content{background:#f8fafc;border:1px solid #e2e8f0;border-radius:6px;padding:10px 14px}
  .pv-tline-title{font-size:13px;font-weight:500;color:#0f172a}
  .pv-tline-meta{font-size:11px;color:#64748b;margin-top:2px}
  .pv-tline-body{font-size:12px;color:#475569;margin-top:8px;padding-top:8px;
    border-top:1px solid #e2e8f0;line-height:1.6;white-space:pre-wrap}

  .pv-alert-warn{background:#fef9ec;border:1px solid #fcd34d;color:#78350f;
    border-radius:7px;padding:14px 18px;margin-bottom:16px;font-size:13px}
  @media(max-width:480px){.pv-meta{grid-template-columns:1fr}.pv-form-row{flex-direction:column}}
</style>

<div class="pv-wrap">

  <!-- ── Not found message ── -->
  <!-- BEGIN: not_found -->
  <div class="pv-alert-warn">
    &#9888; {LANG.lookup_not_found}
  </div>
  <!-- END: not_found -->

  <!-- ── Result block ── -->
  <!-- BEGIN: result_block -->
  <div class="pv-card" style="margin-bottom:16px">
    <div style="display:flex;align-items:center;gap:10px;margin-bottom:16px;flex-wrap:wrap">
      <span style="font-family:monospace;font-size:14px;font-weight:700;color:#0e7490">{ROW.ticket_no}</span>
      <span class="pv-badge pv-badge-{ROW.status_slug}">{ROW.status_label}</span>
    </div>
    <div style="font-size:16px;font-weight:600;color:#0f172a;margin-bottom:16px">{ROW.subject}</div>

    <div class="pv-meta">
      <div class="pv-meta-item">
        <div class="pv-meta-lbl">{LANG.detail_dept}</div>
        <div class="pv-meta-val">{ROW.dept_name}</div>
      </div>
      <div class="pv-meta-item">
        <div class="pv-meta-lbl">{LANG.detail_type}</div>
        <div class="pv-meta-val">{ROW.type_label}</div>
      </div>
      <div class="pv-meta-item">
        <div class="pv-meta-lbl">{LANG.detail_created}</div>
        <div class="pv-meta-val">{ROW.addtime_fmt}</div>
      </div>
    </div>

    <div style="font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:.04em;
      color:#475569;padding-top:14px;border-top:1px solid #f1f5f9;margin-bottom:10px">
      {LANG.detail_timeline}
    </div>

    <!-- BEGIN: no_timeline -->
    <div style="font-size:12px;color:#94a3b8;font-style:italic">{LANG.no_timeline}</div>
    <!-- END: no_timeline -->

    <div class="pv-timeline">
      <!-- BEGIN: loop_timeline -->
      <div class="pv-tline-item">
        <div class="pv-tline-dot"></div>
        <div class="pv-tline-content">
          <div class="pv-tline-title">{TLINE.title}</div>
          <div class="pv-tline-meta">{TLINE.addtime_fmt}</div>
          <!-- BEGIN: tline_has_body -->
          <div class="pv-tline-body">{TLINE.body}</div>
          <!-- END: tline_has_body -->
        </div>
      </div>
      <!-- END: loop_timeline -->
    </div>

  </div>
  <!-- END: result_block -->

  <!-- ── Lookup form ── -->
  <!-- BEGIN: lookup_form -->
  <div class="pv-card">
    <h2 class="pv-title">{LANG.lookup_title}</h2>
    <p class="pv-intro">{LANG.lookup_intro}</p>

    <form method="get" action="{FORM_ACTION}">

      <div class="pv-form-row">
        <div class="pv-col">
          <div class="pv-form-group">
            <label class="pv-label">{LANG.lookup_ticket}</label>
            <input type="text" name="ticket" class="pv-input"
              value="{QUERY.ticket}" placeholder="{LANG.lookup_ticket_ph}"
              style="font-family:monospace;font-weight:700" />
          </div>
        </div>
        <div class="pv-col">
          <div class="pv-form-group">
            <label class="pv-label">{LANG.lookup_phone}</label>
            <input type="tel" name="phone" class="pv-input"
              value="{QUERY.phone}" placeholder="{LANG.lookup_phone_ph}" />
          </div>
        </div>
        <div style="padding-bottom:1px">
          <button type="submit" class="pv-btn-primary">{LANG.btn_lookup}</button>
        </div>
      </div>

    </form>
  </div>
  <!-- END: lookup_form -->

</div>
<!-- END: main -->
