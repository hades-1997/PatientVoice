// PatientVoice — Multi-Channel Intake quick entry. window.PVIntake
(function () {
  function Intake({ onBack }) {
    const DS = window.PatientVoiceDesignSystem_16c56a;
    const { Input, Button } = DS;
    React.useEffect(() => { window.lucide && window.lucide.createIcons(); });

    const channels = [
      { id: 'front_desk', label: 'Front Desk', icon: 'concierge-bell' },
      { id: 'hotline', label: 'Hotline', icon: 'phone' },
      { id: 'suggestion_box', label: 'Suggestion Box', icon: 'inbox' },
      { id: 'online_form', label: 'Online Form', icon: 'clipboard-list' },
      { id: 'email', label: 'Email', icon: 'mail' },
      { id: 'social_media', label: 'Social Media', icon: 'message-circle' },
    ];
    const types = ['Complaint', 'Inquiry', 'Compliment', 'Suggestion', 'Incident'];
    const [ch, setCh] = React.useState('hotline');
    const [ty, setTy] = React.useState('Complaint');
    const [pri, setPri] = React.useState('high');

    const label = { fontSize: 12.5, fontWeight: 600, color: 'var(--pv-text-body)', marginBottom: 6, display: 'block' };
    const fieldBox = { background: '#fff', border: '1px solid var(--pv-border-strong)', borderRadius: 8, padding: '0 12px', height: 38, display: 'flex', alignItems: 'center', fontSize: 14, color: 'var(--pv-text-strong)', width: '100%', boxSizing: 'border-box' };

    function Panel({ title, children }) {
      return <div style={{ background: '#fff', border: '1px solid var(--pv-border)', borderRadius: 12, boxShadow: 'var(--pv-shadow-sm)' }}>
        <div style={{ padding: '12px 16px', borderBottom: '1px solid var(--pv-border)', fontSize: 13.5, fontWeight: 700, color: 'var(--pv-text-strong)' }}>{title}</div>
        <div style={{ padding: 18 }}>{children}</div>
      </div>;
    }

    return (
      <div style={{ maxWidth: 920, margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
          <button onClick={onBack} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 13, fontWeight: 600, color: 'var(--pv-text-muted)', background: 'none', cursor: 'pointer' }}>
            <i data-lucide="arrow-left" style={{ width: 16, height: 16 }} /> Back
          </button>
          <div style={{ flex: 1 }} />
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 12.5, color: 'var(--pv-success-700)', background: 'var(--pv-success-50)', padding: '5px 11px', borderRadius: 999, fontWeight: 600 }}>
            <i data-lucide="timer" style={{ width: 14, height: 14 }} /> Quick entry · under 2 minutes
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <Panel title="Channel">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
              {channels.map((c) => {
                const on = ch === c.id;
                return (
                  <button key={c.id} onClick={() => setCh(c.id)} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '11px 13px', borderRadius: 10, cursor: 'pointer',
                    border: `1.5px solid ${on ? 'var(--pv-primary-500)' : 'var(--pv-border)'}`, background: on ? 'var(--pv-primary-50)' : '#fff' }}>
                    <i data-lucide={c.icon} style={{ width: 18, height: 18, color: on ? 'var(--pv-primary-600)' : 'var(--pv-text-muted)' }} />
                    <span style={{ fontSize: 13.5, fontWeight: 600, color: on ? 'var(--pv-primary-700)' : 'var(--pv-text-body)' }}>{c.label}</span>
                  </button>
                );
              })}
            </div>
          </Panel>

          <Panel title="Classification">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <div>
                <span style={label}>Feedback type</span>
                <div style={{ display: 'flex', gap: 7, flexWrap: 'wrap' }}>
                  {types.map((t) => (
                    <button key={t} onClick={() => setTy(t)} style={{ padding: '7px 12px', borderRadius: 999, fontSize: 13, fontWeight: 600, cursor: 'pointer',
                      border: `1px solid ${ty === t ? 'var(--pv-primary-500)' : 'var(--pv-border)'}`, background: ty === t ? 'var(--pv-primary-50)' : '#fff', color: ty === t ? 'var(--pv-primary-700)' : 'var(--pv-text-muted)' }}>{t}</button>
                  ))}
                </div>
              </div>
              <div>
                <span style={label}>Priority</span>
                <div style={{ display: 'flex', gap: 7 }}>
                  {[['urgent', 'Urgent', 'var(--pv-critical-500)'], ['high', 'High', 'var(--pv-warning-500)'], ['normal', 'Normal', 'var(--pv-neutral-400)']].map(([id, l, c]) => (
                    <button key={id} onClick={() => setPri(id)} style={{ flex: 1, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 7, padding: '8px 10px', borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: 'pointer',
                      border: `1px solid ${pri === id ? c : 'var(--pv-border)'}`, background: pri === id ? 'color-mix(in srgb,' + c + ' 10%, #fff)' : '#fff', color: pri === id ? 'var(--pv-text-strong)' : 'var(--pv-text-muted)' }}>
                      <span style={{ width: 8, height: 8, borderRadius: 999, background: c }} />{l}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </Panel>

          <Panel title="Details">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
              <Input label="Patient name" placeholder="Full name" />
              <Input label="Contact" placeholder="Phone or email" />
              <Input label="Related department" placeholder="e.g. Radiology" />
              <Input label="Related employee" placeholder="Optional" />
            </div>
            <span style={label}>Description</span>
            <textarea rows={4} placeholder="Describe the feedback…" style={{ width: '100%', boxSizing: 'border-box', resize: 'vertical', padding: 11, fontFamily: 'var(--pv-font-sans)', fontSize: 14, color: 'var(--pv-text-strong)', border: '1px solid var(--pv-border-strong)', borderRadius: 8, outline: 'none' }} />
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginTop: 14, flexWrap: 'wrap' }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '9px 13px', border: '1.5px dashed var(--pv-border-strong)', borderRadius: 8, fontSize: 13, color: 'var(--pv-text-muted)', cursor: 'pointer' }}>
                <i data-lucide="paperclip" style={{ width: 15, height: 15 }} /> Add attachment
              </span>
              <label style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 13.5, color: 'var(--pv-text-body)', cursor: 'pointer' }}>
                <input type="checkbox" /> Anonymous submission
              </label>
            </div>
          </Panel>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
            <Button variant="ghost" onClick={onBack}>Cancel</Button>
            <Button variant="outline">Save draft</Button>
            <Button variant="primary" iconLeft={<i data-lucide="check" />} onClick={onBack}>Create feedback</Button>
          </div>
        </div>
      </div>
    );
  }
  window.PVIntake = Intake;
})();
