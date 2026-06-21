// Lightweight CSS/SVG charts for the PatientVoice kit. window.PVCharts
(function () {
  // Vertical bar/area trend chart
  function TrendChart({ data, labels, color = 'var(--pv-primary-600)', height = 180 }) {
    const max = Math.max(...data) * 1.15;
    return (
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8, height, padding: '8px 2px 0' }}>
        {data.map((v, i) => (
          <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 7, height: '100%', justifyContent: 'flex-end' }}>
            <div style={{ width: '100%', maxWidth: 26, height: `${(v / max) * 100}%`, borderRadius: '5px 5px 2px 2px',
              background: `linear-gradient(180deg, ${color}, color-mix(in srgb, ${color} 55%, #fff))`,
              boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.15)' }} title={v} />
            <span style={{ fontSize: 10.5, color: 'var(--pv-text-subtle)', fontWeight: 500 }}>{labels[i]}</span>
          </div>
        ))}
      </div>
    );
  }

  // Donut / pie via conic-gradient
  function Donut({ data, size = 150, thickness = 26 }) {
    const total = data.reduce((s, d) => s + d.value, 0);
    let acc = 0;
    const stops = data.map((d) => {
      const start = (acc / total) * 360; acc += d.value;
      const end = (acc / total) * 360;
      return `${d.color} ${start}deg ${end}deg`;
    }).join(', ');
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
        <div style={{ position: 'relative', width: size, height: size, flex: 'none' }}>
          <div style={{ width: '100%', height: '100%', borderRadius: '50%', background: `conic-gradient(${stops})` }} />
          <div style={{ position: 'absolute', inset: thickness, background: '#fff', borderRadius: '50%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontSize: 22, fontWeight: 700, color: 'var(--pv-text-strong)', fontVariantNumeric: 'tabular-nums' }}>{total}</span>
            <span style={{ fontSize: 11, color: 'var(--pv-text-muted)' }}>this week</span>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, flex: 1 }}>
          {data.map((d) => (
            <div key={d.label} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12.5 }}>
              <span style={{ width: 10, height: 10, borderRadius: 3, background: d.color, flex: 'none' }} />
              <span style={{ flex: 1, color: 'var(--pv-text-body)' }}>{d.label}</span>
              <span style={{ fontWeight: 600, color: 'var(--pv-text-strong)', fontVariantNumeric: 'tabular-nums' }}>{d.value}%</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Semicircular SLA gauge
  function Gauge({ value = 94, size = 180, label = 'SLA compliance' }) {
    const angle = (value / 100) * 180;
    const color = value >= 90 ? 'var(--pv-success-500)' : value >= 75 ? 'var(--pv-warning-500)' : 'var(--pv-critical-500)';
    return (
      <div style={{ width: size, textAlign: 'center' }}>
        <div style={{ position: 'relative', width: size, height: size / 2, overflow: 'hidden', margin: '0 auto' }}>
          <div style={{ position: 'absolute', width: size, height: size, borderRadius: '50%',
            background: `conic-gradient(from -90deg, ${color} ${angle}deg, var(--pv-neutral-200) ${angle}deg 180deg, transparent 180deg)` }} />
          <div style={{ position: 'absolute', top: size * 0.16, left: size * 0.16, width: size * 0.68, height: size * 0.68, borderRadius: '50%', background: '#fff' }} />
          <div style={{ position: 'absolute', bottom: 2, left: 0, right: 0, textAlign: 'center' }}>
            <div style={{ fontSize: 30, fontWeight: 700, color: 'var(--pv-text-strong)', fontVariantNumeric: 'tabular-nums', lineHeight: 1 }}>{value}<span style={{ fontSize: 16, color: 'var(--pv-text-muted)' }}>%</span></div>
          </div>
        </div>
        <div style={{ fontSize: 12, color: 'var(--pv-text-muted)', marginTop: 6 }}>{label}</div>
      </div>
    );
  }

  // Horizontal ranked bars
  function RankList({ data, color = 'var(--pv-primary-500)' }) {
    const max = Math.max(...data.map((d) => d.value));
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 11 }}>
        {data.map((d, i) => (
          <div key={d.label} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ width: 16, fontSize: 12, fontWeight: 700, color: 'var(--pv-text-subtle)', textAlign: 'right', fontVariantNumeric: 'tabular-nums' }}>{i + 1}</span>
            <span style={{ width: 130, fontSize: 12.5, color: 'var(--pv-text-body)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', flex: 'none' }}>{d.label}</span>
            <div style={{ flex: 1, height: 8, borderRadius: 999, background: 'var(--pv-neutral-100)', overflow: 'hidden' }}>
              <div style={{ width: `${(d.value / max) * 100}%`, height: '100%', borderRadius: 999, background: color }} />
            </div>
            <span style={{ width: 28, fontSize: 12.5, fontWeight: 600, color: 'var(--pv-text-strong)', textAlign: 'right', fontVariantNumeric: 'tabular-nums' }}>{d.value}</span>
          </div>
        ))}
      </div>
    );
  }

  window.PVCharts = { TrendChart, Donut, Gauge, RankList };
})();
