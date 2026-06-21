// PatientVoice — Dashboard screen. window.PVDashboard
(function () {
  function Section({ title, action, children, style }) {
    const { Card } = window.PatientVoiceDesignSystem_16c56a;
    return <Card title={title} action={action} padding={16} style={style}>{children}</Card>;
  }

  function NotifRow({ n }) {
    const tones = {
      critical: ['var(--pv-critical-600)', 'var(--pv-critical-50)'],
      warning: ['var(--pv-warning-700)', 'var(--pv-warning-50)'],
      info: ['var(--pv-info-600)', 'var(--pv-info-50)'],
      primary: ['var(--pv-primary-700)', 'var(--pv-primary-50)'],
      accent: ['var(--pv-accent-600)', 'var(--pv-accent-50)'],
    };
    const [fg, bg] = tones[n.tone] || tones.info;
    return (
      <div style={{ display: 'flex', gap: 11, padding: '10px 4px', borderBottom: '1px solid var(--pv-neutral-100)' }}>
        <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 30, height: 30, borderRadius: 8, background: bg, color: fg, flex: 'none' }}>
          <i data-lucide={n.icon} style={{ width: 15, height: 15 }} />
        </span>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 12.5, color: 'var(--pv-text-body)', lineHeight: 1.35 }}>{n.text}</div>
          <div style={{ fontSize: 11, color: 'var(--pv-text-subtle)', marginTop: 2 }}>{n.time} ago</div>
        </div>
      </div>
    );
  }

  function Dashboard() {
    const D = window.PV_DATA;
    const { StatCard } = window.PatientVoiceDesignSystem_16c56a;
    const { TrendChart, Donut, Gauge, RankList } = window.PVCharts;
    React.useEffect(() => { window.lucide && window.lucide.createIcons(); });

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 1440 }}>
        {/* KPI row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 14 }}>
          <StatCard label="New today" value={D.kpis.newToday} delta={12} deltaLabel="vs yesterday" icon="inbox" tone="primary" />
          <StatCard label="This week" value={D.kpis.week} delta={6} deltaLabel="vs last week" icon="calendar-days" tone="secondary" />
          <StatCard label="SLA compliance" value={D.kpis.sla} unit="%" delta={1.8} deltaLabel="vs last week" icon="gauge" tone="success" />
          <StatCard label="Open tickets" value={D.kpis.open} delta={-4} invertDelta deltaLabel="vs last week" icon="ticket" tone="neutral" />
          <StatCard label="Overdue" value={D.kpis.overdue} delta={2} invertDelta deltaLabel="needs action" icon="alarm-clock-off" tone="critical" />
        </div>

        {/* Trend + channel + notifications */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: 16 }}>
          <Section title="Feedback trend" action={<span style={{ fontSize: 12, color: 'var(--pv-text-muted)' }}>Last 12 months</span>}>
            <TrendChart data={D.trend} labels={D.trendLabels} />
          </Section>
          <Section title="Channel distribution">
            <Donut data={D.channelDist} />
          </Section>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
          <Section title="Top complaint categories">
            <RankList data={D.topComplaints} color="var(--pv-warning-500)" />
          </Section>
          <Section title="Top praised departments">
            <RankList data={D.topPraised} color="var(--pv-success-500)" />
          </Section>
          <Section title="SLA performance">
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
              <Gauge value={94} />
              <div style={{ display: 'flex', gap: 18 }}>
                <div style={{ textAlign: 'center' }}><div style={{ fontSize: 18, fontWeight: 700, color: 'var(--pv-success-600)' }}>289</div><div style={{ fontSize: 11, color: 'var(--pv-text-muted)' }}>On track</div></div>
                <div style={{ textAlign: 'center' }}><div style={{ fontSize: 18, fontWeight: 700, color: 'var(--pv-warning-600)' }}>22</div><div style={{ fontSize: 11, color: 'var(--pv-text-muted)' }}>At risk</div></div>
                <div style={{ textAlign: 'center' }}><div style={{ fontSize: 18, fontWeight: 700, color: 'var(--pv-critical-600)' }}>7</div><div style={{ fontSize: 11, color: 'var(--pv-text-muted)' }}>Breached</div></div>
              </div>
            </div>
          </Section>
        </div>

        <Section title="Real-time notifications" action={<a style={{ fontSize: 12.5, color: 'var(--pv-text-link)', fontWeight: 600, textDecoration: 'none' }}>View all</a>}>
          <div>{D.notifications.map((n, i) => <NotifRow key={i} n={n} />)}</div>
        </Section>
      </div>
    );
  }

  window.PVDashboard = Dashboard;
})();
