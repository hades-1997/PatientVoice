// PatientVoice — Feedback Detail (3-column). window.PVDetail
(function () {
  function Field({ label, children }) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.04em', textTransform: 'uppercase', color: 'var(--pv-text-subtle)' }}>{label}</span>
        <div style={{ fontSize: 13.5, color: 'var(--pv-text-strong)' }}>{children}</div>
      </div>
    );
  }
  function Panel({ title, children, pad = 16 }) {
    return (
      <div style={{ background: '#fff', border: '1px solid var(--pv-border)', borderRadius: 12, boxShadow: 'var(--pv-shadow-sm)' }}>
        {title ? <div style={{ padding: '12px 16px', borderBottom: '1px solid var(--pv-border)', fontSize: 13.5, fontWeight: 700, color: 'var(--pv-text-strong)' }}>{title}</div> : null}
        <div style={{ padding: pad }}>{children}</div>
      </div>
    );
  }

  function Timeline() {
    const D = window.PV_DATA;
    const tones = { info: 'var(--pv-info-500)', primary: 'var(--pv-primary-500)', accent: 'var(--pv-accent-500)', neutral: 'var(--pv-neutral-400)', secondary: 'var(--pv-secondary-500)' };
    return (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {D.timeline.map((e, i) => (
          <div key={i} style={{ display: 'flex', gap: 12 }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 30, height: 30, borderRadius: 999, background: '#fff', border: `2px solid ${tones[e.tone]}`, color: tones[e.tone], flex: 'none' }}>
                <i data-lucide={e.icon} style={{ width: 14, height: 14 }} />
              </span>
              {i < D.timeline.length - 1 ? <span style={{ width: 2, flex: 1, background: 'var(--pv-neutral-200)', minHeight: 14 }} /> : null}
            </div>
            <div style={{ paddingBottom: 18, flex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8 }}>
                <span style={{ fontSize: 13.5, fontWeight: 600, color: 'var(--pv-text-strong)' }}>{e.title}</span>
                <span style={{ fontSize: 11.5, color: 'var(--pv-text-subtle)', whiteSpace: 'nowrap' }}>{e.time}</span>
              </div>
              <div style={{ fontSize: 12, color: 'var(--pv-text-muted)', marginTop: 1 }}>{e.who}</div>
              {e.body ? <div style={{ fontSize: 13, color: 'var(--pv-text-body)', marginTop: 6, background: 'var(--pv-neutral-50)', border: '1px solid var(--pv-border)', borderRadius: 8, padding: '9px 11px' }}>{e.body}</div> : null}
            </div>
          </div>
        ))}
      </div>
    );
  }

  function Detail({ ticketId, onBack }) {
    const D = window.PV_DATA;
    const t = D.tickets.find((x) => x.id === ticketId) || D.tickets[0];
    const DS = window.PatientVoiceDesignSystem_16c56a;
    const { StatusBadge, PriorityBadge, ChannelBadge, SLABadge, Avatar, Button } = DS;
    const agent = D.agents.find((a) => a.id === t.assignee);
    React.useEffect(() => { window.lucide && window.lucide.createIcons(); });

    const actBtn = { display: 'flex', alignItems: 'center', gap: 9, width: '100%', padding: '9px 11px', borderRadius: 8, border: '1px solid var(--pv-border)', background: '#fff', cursor: 'pointer', fontSize: 13, fontWeight: 600, color: 'var(--pv-text-body)', textAlign: 'left' };

    return (
      <div style={{ maxWidth: 1440 }}>
        {/* breadcrumb / header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14, flexWrap: 'wrap' }}>
          <button onClick={onBack} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 13, fontWeight: 600, color: 'var(--pv-text-muted)', background: 'none', cursor: 'pointer', padding: '4px 0' }}>
            <i data-lucide="arrow-left" style={{ width: 16, height: 16 }} /> All feedback
          </button>
          <span style={{ fontFamily: 'var(--pv-font-mono)', fontSize: 13, fontWeight: 600, color: 'var(--pv-text-subtle)' }}>/ {t.id}</span>
          <div style={{ flex: 1 }} />
          <SLABadge consumedPct={t.slaPct} remaining={t.slaRemaining} breached={t.breached} variant="pill" />
        </div>

        <div className="pv-detail-grid">
          {/* LEFT */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <Panel title="Patient">
              <div style={{ display: 'flex', alignItems: 'center', gap: 11, marginBottom: 14 }}>
                <Avatar name={t.patient === 'Anonymous' ? '? ?' : t.patient} size={40} />
                <div><div style={{ fontWeight: 600, color: 'var(--pv-text-strong)', fontSize: 14 }}>{t.patient}</div><div style={{ fontSize: 12, color: 'var(--pv-text-muted)' }}>Outpatient · MRN 88421</div></div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <Field label="Contact">+84 90 •• ••231</Field>
                <Field label="Visit date">12 Jun 2026</Field>
              </div>
            </Panel>
            <Panel title="Ticket">
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <Field label="Category"><span style={{ textTransform: 'capitalize' }}>{t.type}</span></Field>
                <Field label="Channel"><ChannelBadge channel={t.channel} /></Field>
                <Field label="Priority"><PriorityBadge priority={t.priority} /></Field>
                <Field label="Department">{t.dept}</Field>
                <Field label="Created">{t.created}</Field>
              </div>
            </Panel>
          </div>

          {/* CENTER */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14, minWidth: 0 }}>
            <Panel>
              <h2 style={{ margin: '0 0 10px', fontSize: 18, fontWeight: 700, color: 'var(--pv-text-strong)' }}>{t.subject}</h2>
              <p style={{ margin: 0, fontSize: 14, lineHeight: 1.6, color: 'var(--pv-text-body)' }}>
                The patient reported waiting more than 45 minutes at the {t.dept} front desk during the morning peak, with
                no clear queue information. They felt staff were not communicating expected wait times. Requesting review of
                front-desk staffing and a visible queue display.
              </p>
              <div style={{ display: 'flex', gap: 10, marginTop: 16 }}>
                {['intake-form.pdf', 'call-recording.mp3'].map((f) => (
                  <span key={f} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '8px 12px', border: '1px solid var(--pv-border)', borderRadius: 8, fontSize: 12.5, color: 'var(--pv-text-body)', background: 'var(--pv-neutral-50)' }}>
                    <i data-lucide={f.endsWith('pdf') ? 'file-text' : 'file-audio'} style={{ width: 15, height: 15, color: 'var(--pv-text-muted)' }} />{f}
                  </span>
                ))}
              </div>
            </Panel>

            <Panel title="Activity & internal notes">
              <Timeline />
              <div style={{ display: 'flex', gap: 10, marginTop: 6, alignItems: 'flex-start' }}>
                <Avatar name="Mai Tran" size={30} />
                <div style={{ flex: 1 }}>
                  <textarea placeholder="Add an internal note…" rows={2} style={{ width: '100%', boxSizing: 'border-box', resize: 'vertical', padding: 10, fontFamily: 'var(--pv-font-sans)', fontSize: 13, color: 'var(--pv-text-strong)', border: '1px solid var(--pv-border-strong)', borderRadius: 8, outline: 'none' }} />
                  <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 8 }}>
                    <Button size="sm" variant="primary" iconLeft={<i data-lucide="send" />}>Post note</Button>
                  </div>
                </div>
              </div>
            </Panel>
          </div>

          {/* RIGHT */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <Panel title="Status">
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                <Field label="Current status"><StatusBadge status={t.status} /></Field>
                <Field label="Assignee">
                  {agent ? <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}><Avatar name={agent.name} size={26} /><span>{agent.name}</span></span> : 'Unassigned'}
                </Field>
                <Field label="Related department">{t.dept}</Field>
                <Field label="SLA"><SLABadge variant="bar" consumedPct={t.slaPct} remaining={t.slaRemaining} breached={t.breached} /></Field>
              </div>
            </Panel>
            <Panel title="Quick actions">
              <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
                <button style={actBtn}><i data-lucide="user-plus" style={{ width: 16, height: 16, color: 'var(--pv-primary-600)' }} />Reassign</button>
                <button style={actBtn}><i data-lucide="check-circle-2" style={{ width: 16, height: 16, color: 'var(--pv-success-600)' }} />Resolve ticket</button>
                <button style={actBtn}><i data-lucide="git-branch" style={{ width: 16, height: 16, color: 'var(--pv-accent-600)' }} />Root cause analysis</button>
                <button style={{ ...actBtn, borderColor: 'var(--pv-critical-200)', color: 'var(--pv-critical-700)', background: 'var(--pv-critical-50)' }}><i data-lucide="arrow-up-circle" style={{ width: 16, height: 16 }} />Escalate to manager</button>
              </div>
            </Panel>
          </div>
        </div>
      </div>
    );
  }

  window.PVDetail = Detail;
})();
