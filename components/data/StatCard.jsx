import React from 'react';

/**
 * Dashboard KPI tile — label, big value, optional delta and icon.
 * `tone` tints the icon chip and delta. `delta` is a number (% or count);
 * positive shows up-trend, negative down-trend; pass `invertDelta` when
 * "down is good" (e.g. overdue tickets).
 */
const TONES = {
  primary:  { fg: 'var(--pv-primary-700)',  bg: 'var(--pv-primary-50)' },
  secondary:{ fg: 'var(--pv-secondary-700)',bg: 'var(--pv-secondary-100)' },
  success:  { fg: 'var(--pv-success-700)',  bg: 'var(--pv-success-50)' },
  warning:  { fg: 'var(--pv-warning-700)',  bg: 'var(--pv-warning-50)' },
  critical: { fg: 'var(--pv-critical-700)', bg: 'var(--pv-critical-50)' },
  accent:   { fg: 'var(--pv-accent-600)',   bg: 'var(--pv-accent-50)' },
  neutral:  { fg: 'var(--pv-neutral-700)',  bg: 'var(--pv-neutral-100)' },
};

export function StatCard({ label, value, unit, delta, deltaLabel, invertDelta = false, icon, tone = 'primary', style = {} }) {
  const t = TONES[tone] || TONES.primary;
  const hasDelta = delta != null;
  const up = hasDelta && delta >= 0;
  const good = hasDelta ? (invertDelta ? !up : up) : true;
  const deltaColor = good ? 'var(--pv-success-700)' : 'var(--pv-critical-600)';
  return (
    <div style={{
      background: 'var(--pv-surface-card)', border: '1px solid var(--pv-border)',
      borderRadius: 'var(--pv-radius-lg)', boxShadow: 'var(--pv-shadow-sm)',
      padding: 18, display: 'flex', flexDirection: 'column', gap: 12, ...style,
    }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }}>
        <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--pv-text-muted)' }}>{label}</span>
        {icon ? (
          <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 34, height: 34, borderRadius: 'var(--pv-radius-md)', background: t.bg, color: t.fg, flex: 'none' }}>
            <i data-lucide={icon} style={{ width: 18, height: 18 }} />
          </span>
        ) : null}
      </div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
        <span style={{ fontFamily: 'var(--pv-font-sans)', fontSize: 30, fontWeight: 700, letterSpacing: '-0.01em', color: 'var(--pv-text-strong)', fontVariantNumeric: 'tabular-nums', lineHeight: 1 }}>{value}</span>
        {unit ? <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--pv-text-muted)' }}>{unit}</span> : null}
      </div>
      {(hasDelta || deltaLabel) ? (
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12 }}>
          {hasDelta ? (
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 3, fontWeight: 700, color: deltaColor }}>
              <i data-lucide={up ? 'arrow-up-right' : 'arrow-down-right'} style={{ width: 13, height: 13 }} />
              {Math.abs(delta)}%
            </span>
          ) : null}
          {deltaLabel ? <span style={{ color: 'var(--pv-text-subtle)' }}>{deltaLabel}</span> : null}
        </div>
      ) : null}
    </div>
  );
}
