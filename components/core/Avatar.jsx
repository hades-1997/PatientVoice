import React from 'react';

const palette = [
  ['#0e7490', '#cffafe'], ['#0d9488', '#ccfbf1'], ['#7c3aed', '#ede9fe'],
  ['#2563eb', '#dbeafe'], ['#ea580c', '#ffedd5'], ['#059669', '#d1fae5'],
];
function hashIndex(name = '') {
  let h = 0; for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) % palette.length;
  return h;
}
function initials(name = '') {
  const p = name.trim().split(/\s+/);
  return ((p[0]?.[0] || '') + (p[1]?.[0] || '')).toUpperCase() || '?';
}

/**
 * User avatar — initials or image, with optional presence dot.
 */
export function Avatar({ name = '', src, size = 32, status, style = {} }) {
  const [fg, bg] = palette[hashIndex(name)];
  const statusColors = { online: 'var(--pv-success-500)', away: 'var(--pv-warning-500)', offline: 'var(--pv-neutral-400)' };
  return (
    <span style={{ position: 'relative', display: 'inline-flex', flex: 'none', width: size, height: size, ...style }}>
      <span style={{
        width: size, height: size, borderRadius: 'var(--pv-radius-pill)',
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden',
        background: src ? 'var(--pv-neutral-200)' : bg, color: fg,
        fontFamily: 'var(--pv-font-sans)', fontWeight: 600, fontSize: Math.round(size * 0.4),
        boxShadow: 'inset 0 0 0 1px rgba(15,23,42,.06)',
      }}>
        {src ? <img src={src} alt={name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : initials(name)}
      </span>
      {status ? (
        <span style={{
          position: 'absolute', right: -1, bottom: -1, width: Math.max(8, size * 0.28), height: Math.max(8, size * 0.28),
          borderRadius: '50%', background: statusColors[status] || statusColors.offline, border: '2px solid #fff',
        }} />
      ) : null}
    </span>
  );
}
