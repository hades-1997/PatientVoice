import React from 'react';

/**
 * SLA status indicator with countdown / consumed visualization.
 * State derives from `consumedPct`: <80 on-track (teal), 80–100 warning
 * (orange), >100 or breached (red). Pass `remaining` (e.g. "02:14:38")
 * for the timer label, or `breached` to force the breach state.
 */
function slaState(pct, breached) {
  if (breached || pct >= 100) return { key: 'breach', label: 'Breached', color: 'var(--pv-critical-600)', bg: 'var(--pv-critical-50)', icon: 'alarm-clock-off' };
  if (pct >= 80) return { key: 'warn', label: 'Due soon', color: 'var(--pv-warning-700)', bg: 'var(--pv-warning-50)', icon: 'alarm-clock' };
  return { key: 'ok', label: 'On track', color: 'var(--pv-success-700)', bg: 'var(--pv-success-50)', icon: 'clock' };
}

export function SLABadge({ consumedPct = 0, remaining, breached = false, variant = 'pill', style = {} }) {
  const s = slaState(consumedPct, breached);
  const pct = Math.min(100, Math.max(0, consumedPct));

  if (variant === 'bar') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 5, minWidth: 140, ...style }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: 12, fontWeight: 600, color: s.color }}>
            <i data-lucide={s.icon} style={{ width: 13, height: 13 }} />{s.label}
          </span>
          {remaining ? <span style={{ fontFamily: 'var(--pv-font-mono)', fontSize: 12, fontWeight: 600, color: s.color, fontVariantNumeric: 'tabular-nums' }}>{remaining}</span> : null}
        </div>
        <div style={{ height: 6, borderRadius: 999, background: 'var(--pv-neutral-200)', overflow: 'hidden' }}>
          <div style={{ width: `${pct}%`, height: '100%', borderRadius: 999, background: s.color, transition: 'width var(--pv-dur-slow) var(--pv-ease)' }} />
        </div>
      </div>
    );
  }

  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 6,
      padding: '3px 10px', borderRadius: 'var(--pv-radius-pill)',
      fontFamily: 'var(--pv-font-sans)', fontSize: 12, fontWeight: 600, lineHeight: 1.4,
      color: s.color, background: s.bg, boxShadow: `inset 0 0 0 1px ${s.color}26`, whiteSpace: 'nowrap', ...style,
    }}>
      <i data-lucide={s.icon} style={{ width: 13, height: 13, display: 'inline-flex' }} />
      {remaining ? <span style={{ fontFamily: 'var(--pv-font-mono)', fontVariantNumeric: 'tabular-nums' }}>{remaining}</span> : s.label}
    </span>
  );
}
