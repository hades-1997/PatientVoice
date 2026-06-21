// PatientVoice — Analytics & Reporting Center. window.PVAnalytics
(function () {
  function Analytics() {
    const D = window.PV_DATA;
    const { StatCard } = window.PatientVoiceDesignSystem_16c56a;
    const { TrendChart, Donut, RankList } = window.PVCharts;
    React.useEffect(() => { window.lucide && window.lucide.createIcons(); });

    function Panel({ title, action, children, pad = 16 }) {
      return <div style={{ background: '#fff', border: '1px solid var(--pv-border)', borderRadius: 12, boxShadow: 'var(--pv-shadow-sm)' }}>
        {title ? <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', borderBottom: '1px solid var(--pv-border)' }}><span style={{ fontSize: 13.5, fontWeight: 700, color: 'var(--pv-text-strong)' }}>{title}</span>{action}</div> : null}
        <div style={{ padding: pad }}>{children}</div>
      </div>;
    }

    const ddl = <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 12.5, color: 'var(--pv-text-muted)', fontWeight: 600 }}>2026 YTD <i data-lucide="chevron-down" style={{ width: 14, height: 14 }} /></span>;

    // Channel evaluation table
    const channels = [
      { ch: 'Hotline', vol: 892, sla: 96, res: 94, trend: 'up' },
      { ch: 'Online Form', vol: 574, sla: 92, res: 90, trend: 'up' },
      { ch: 'Front Desk', vol: 468, sla: 89, res: 88, trend: 'flat' },
      { ch: 'Email', vol: 312, sla: 84, res: 82, trend: 'down' },
      { ch: 'Social Media', vol: 233, sla: 78, res: 74, trend: 'down' },
      { ch: 'Suggestion Box', vol: 129, sla: 91, res: 87, trend: 'up' },
    ];
    const trendIcon = { up: ['trending-up', 'var(--pv-success-600)'], down: ['trending-down', 'var(--pv-critical-600)'], flat: ['minus', 'var(--pv-text-subtle)'] };

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 1440 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
          {['Feedback Trend', 'Complaint Trend', 'SLA Compliance', 'Channel Effectiveness', 'Department Ranking'].map((tab, i) => (
            <span key={tab} style={{ padding: '7px 13px', borderRadius: 999, fontSize: 13, fontWeight: 600, cursor: 'pointer',
              background: i === 0 ? 'var(--pv-primary-600)' : '#fff', color: i === 0 ? '#fff' : 'var(--pv-text-muted)', border: `1px solid ${i === 0 ? 'var(--pv-primary-600)' : 'var(--pv-border)'}` }}>{tab}</span>
          ))}
          <div style={{ flex: 1 }} />
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 7, padding: '7px 13px', borderRadius: 8, background: '#fff', border: '1px solid var(--pv-border)', fontSize: 13, fontWeight: 600, color: 'var(--pv-text-body)', cursor: 'pointer' }}>
            <i data-lucide="file-down" style={{ width: 15, height: 15 }} /> Export report
          </span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14 }}>
          <StatCard label="Total feedback" value="2,608" delta={14} icon="messages-square" tone="primary" />
          <StatCard label="Resolution rate" value="89.4" unit="%" delta={3} icon="check-circle-2" tone="success" />
          <StatCard label="Avg. satisfaction" value="4.3" unit="/5" delta={2} icon="star" tone="accent" />
          <StatCard label="Repeat complaints" value="112" delta={-6} invertDelta icon="repeat" tone="warning" />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: 16 }}>
          <Panel title="Feedback volume trend" action={ddl}><TrendChart data={D.trend} labels={D.trendLabels} color="var(--pv-primary-600)" height={200} /></Panel>
          <Panel title="By channel"><Donut data={D.channelDist} /></Panel>
        </div>

        <Panel title="Annual channel evaluation" action={<span style={{ fontSize: 12, color: 'var(--pv-text-muted)' }}>Supports quality accreditation</span>} pad={0}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead style={{ background: 'var(--pv-neutral-50)' }}>
              <tr>{['Channel', 'Volume', 'SLA %', 'Resolution %', 'YoY', 'Assessment'].map((h, i) => (
                <th key={h} style={{ textAlign: i > 0 && i < 5 ? 'right' : 'left', fontSize: 11, fontWeight: 700, letterSpacing: '0.04em', textTransform: 'uppercase', color: 'var(--pv-text-subtle)', padding: '11px 16px' }}>{h}</th>
              ))}</tr>
            </thead>
            <tbody>
              {channels.map((c) => {
                const grade = c.sla >= 90 ? ['Strong', 'var(--pv-success-700)', 'var(--pv-success-50)'] : c.sla >= 84 ? ['Adequate', 'var(--pv-warning-700)', 'var(--pv-warning-50)'] : ['Needs work', 'var(--pv-critical-700)', 'var(--pv-critical-50)'];
                const [ti, tc] = trendIcon[c.trend];
                return (
                  <tr key={c.ch}>
                    <td style={{ padding: '12px 16px', borderTop: '1px solid var(--pv-border)', fontSize: 13.5, fontWeight: 600, color: 'var(--pv-text-strong)' }}>{c.ch}</td>
                    <td style={{ padding: '12px 16px', borderTop: '1px solid var(--pv-border)', textAlign: 'right', fontFamily: 'var(--pv-font-mono)', fontSize: 13, color: 'var(--pv-text-body)' }}>{c.vol}</td>
                    <td style={{ padding: '12px 16px', borderTop: '1px solid var(--pv-border)', textAlign: 'right', fontFamily: 'var(--pv-font-mono)', fontSize: 13, color: 'var(--pv-text-body)' }}>{c.sla}%</td>
                    <td style={{ padding: '12px 16px', borderTop: '1px solid var(--pv-border)', textAlign: 'right', fontFamily: 'var(--pv-font-mono)', fontSize: 13, color: 'var(--pv-text-body)' }}>{c.res}%</td>
                    <td style={{ padding: '12px 16px', borderTop: '1px solid var(--pv-border)', textAlign: 'right' }}><i data-lucide={ti} style={{ width: 16, height: 16, color: tc }} /></td>
                    <td style={{ padding: '12px 16px', borderTop: '1px solid var(--pv-border)' }}><span style={{ fontSize: 12, fontWeight: 600, padding: '3px 9px', borderRadius: 999, color: grade[1], background: grade[2] }}>{grade[0]}</span></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Panel>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <Panel title="Department praise ranking"><RankList data={D.topPraised} color="var(--pv-success-500)" /></Panel>
          <Panel title="Complaint hotspots"><RankList data={D.topComplaints} color="var(--pv-warning-500)" /></Panel>
        </div>
      </div>
    );
  }
  window.PVAnalytics = Analytics;
})();
