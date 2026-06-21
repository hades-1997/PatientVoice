import React from 'react';

/**
 * Workflow status badge for feedback tickets.
 * Maps the 6 PatientVoice statuses to a consistent dot + tinted pill.
 */
const STATUS = {
  new:                 { label: 'New',                 color: 'var(--pv-info-600)',    bg: 'var(--pv-info-50)' },
  assigned:            { label: 'Assigned',            color: 'var(--pv-accent-600)',  bg: 'var(--pv-accent-50)' },
  in_progress:         { label: 'In Progress',         color: 'var(--pv-primary-600)', bg: 'var(--pv-primary-50)' },
  pending_confirmation:{ label: 'Pending Confirmation',color: 'var(--pv-warning-600)', bg: 'var(--pv-warning-50)' },
  resolved:            { label: 'Resolved',            color: 'var(--pv-success-600)', bg: 'var(--pv-success-50)' },
  unresolved:          { label: 'Unresolved',          color: 'var(--pv-critical-600)',bg: 'var(--pv-critical-50)' },
};

export function StatusBadge({ status = 'new', size = 'md', style = {} }) {
  const s = STATUS[status] || STATUS.new;
  const dim = size === 'sm' ? { fs: 11, pad: '2px 8px', dot: 6 } : { fs: 12, pad: '3px 10px', dot: 7 };
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 6,
      padding: dim.pad, borderRadius: 'var(--pv-radius-pill)',
      fontFamily: 'var(--pv-font-sans)', fontSize: dim.fs, fontWeight: 600, lineHeight: 1.4,
      whiteSpace: 'nowrap', color: s.color, background: s.bg,
      boxShadow: `inset 0 0 0 1px ${s.color}1f`, ...style,
    }}>
      <span style={{ width: dim.dot, height: dim.dot, borderRadius: '50%', background: s.color, flex: 'none' }} />
      {s.label}
    </span>
  );
}
