import React from 'react';

/**
 * Triage priority badge — Urgent / High / Normal.
 */
const PRI = {
  urgent: { label: 'Urgent', color: 'var(--pv-critical-700)', bg: 'var(--pv-critical-50)', bar: 'var(--pv-critical-500)' },
  high:   { label: 'High',   color: 'var(--pv-warning-700)',  bg: 'var(--pv-warning-50)',  bar: 'var(--pv-warning-500)' },
  normal: { label: 'Normal', color: 'var(--pv-neutral-600)',  bg: 'var(--pv-neutral-100)', bar: 'var(--pv-neutral-400)' },
};

export function PriorityBadge({ priority = 'normal', style = {} }) {
  const p = PRI[priority] || PRI.normal;
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 6,
      padding: '3px 9px 3px 7px', borderRadius: 'var(--pv-radius-sm)',
      fontFamily: 'var(--pv-font-sans)', fontSize: 12, fontWeight: 600, lineHeight: 1.4,
      color: p.color, background: p.bg, whiteSpace: 'nowrap', ...style,
    }}>
      <span style={{ width: 3, height: 12, borderRadius: 2, background: p.bar, flex: 'none' }} />
      {p.label}
    </span>
  );
}
