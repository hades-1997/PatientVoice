// PatientVoice — SLA Monitoring Center. window.PVSla
(function () {
  function SLAMonitor({ onOpen }) {
    const D = window.PV_DATA;
    const { StatCard } = D ? window.PatientVoiceDesignSystem_16c56a : {};
    const DS = window.PatientVoiceDesignSystem_16c56a;
    const { SLABadge, PriorityBadge, Avatar, Button } = DS;
    const { Gauge } = window.PVCharts;
    React.useEffect(() => { window.lucide && window.lucide.createIcons(); });

    const atRisk = D.tickets.filter((t) => t.slaPct >= 80).sort((a, b) => b.slaPct - a.slaPct);
    const agentName = (id) => { const a = D.agents.find((x) => x.id === id); return a ? a.name : 'Unassigned'; };

    function Panel({ title, action, children, pad = 16 }) {
      return <div style={{ background: '#fff', border: '1px solid var(--pv-border)', borderRadius: 12, boxShadow: 'var(--pv-shadow-sm)' }}>
        {title ? <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', borderBottom: '1px solid var(--pv-border)' }}><span style={{ fontSize: 13.5, fontWeight: 700, color: 'var(--pv-text-strong)' }}>{title}</span>{action}</div> : null}
        <div style={{ padding: pad }}>{children}</div>
      </div>;
    }

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 1440 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14 }}>
          <StatCard label="SLA compliance" value="94.2" unit="%" delta={1.8} icon="gauge" tone="success" />
          <StatCard label="At risk (≥80%)" value={atRisk.filter(t => !t.breached).length} icon="alarm-clock" tone="warning" />
          <StatCard label="Breached" value={D.tickets.filter(t => t.breached).length} delta={2} invertDelta icon="alarm-clock-off" tone="critical" />
          <StatCard label="Avg. resolution" value="6.4" unit="h" delta={-8} icon="timer" tone="primary" />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 16, alignItems: 'start' }}>
          <Panel title="SLA breach & escalation queue" action={<Button size="sm" variant="outline" iconLeft={<i data-lucide="bell-ring" />}>Notify managers</Button>}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {atRisk.map((t) => (
                <div key={t.id} onClick={() => onOpen && onOpen(t.id)} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '12px 14px', border: `1px solid ${t.breached ? 'var(--pv-critical-200)' : 'var(--pv-warning-100)'}`, background: t.breached ? 'var(--pv-critical-50)' : 'var(--pv-warning-50)', borderRadius: 10, cursor: 'pointer' }}>
                  <i data-lucide={t.breached ? 'alarm-clock-off' : 'alarm-clock'} style={{ width: 20, height: 20, color: t.breached ? 'var(--pv-critical-600)' : 'var(--pv-warning-600)', flex: 'none' }} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ fontFamily: 'var(--pv-font-mono)', fontSize: 12.5, fontWeight: 600, color: 'var(--pv-text-strong)' }}>{t.id}</span>
                      <PriorityBadge priority={t.priority} />
                    </div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--pv-text-strong)', marginTop: 3, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{t.subject}</div>
                    <div style={{ fontSize: 11.5, color: 'var(--pv-text-muted)', marginTop: 1 }}>{t.dept} · {agentName(t.assignee)}</div>
                  </div>
                  <div style={{ width: 150, flex: 'none' }}><SLABadge variant="bar" consumedPct={t.slaPct} remaining={t.slaRemaining} breached={t.breached} /></div>
                </div>
              ))}
            </div>
          </Panel>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <Panel title="Compliance gauge">
              <div style={{ display: 'flex', justifyContent: 'center' }}><Gauge value={94} label="Last 30 days" /></div>
            </Panel>
            <Panel title="Escalation workflow">
              <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                {[
                  { t: '80% consumed', d: 'Warning to assignee', c: 'var(--pv-warning-500)' },
                  { t: '100% / breach', d: 'Alert to Dept. Manager', c: 'var(--pv-critical-500)' },
                  { t: '+2h overdue', d: 'Escalate to Quality Lead', c: 'var(--pv-accent-500)' },
                  { t: '+8h overdue', d: 'Director notification', c: 'var(--pv-neutral-700)' },
                ].map((s, i, arr) => (
                  <div key={i} style={{ display: 'flex', gap: 11 }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <span style={{ width: 12, height: 12, borderRadius: 999, background: s.c, flex: 'none', marginTop: 2 }} />
                      {i < arr.length - 1 ? <span style={{ width: 2, flex: 1, background: 'var(--pv-neutral-200)', minHeight: 18 }} /> : null}
                    </div>
                    <div style={{ paddingBottom: 16 }}>
                      <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--pv-text-strong)' }}>{s.t}</div>
                      <div style={{ fontSize: 12, color: 'var(--pv-text-muted)' }}>{s.d}</div>
                    </div>
                  </div>
                ))}
              </div>
            </Panel>
          </div>
        </div>
      </div>
    );
  }
  window.PVSla = SLAMonitor;
})();
