import React from 'react';

/**
 * Surface container for grouped content (panels, widgets, list cards).
 */
export function Card({ title, action, padding = 16, interactive = false, style = {}, bodyStyle = {}, children, ...rest }) {
  return (
    <div
      style={{
        background: 'var(--pv-surface-card)',
        border: '1px solid var(--pv-border)',
        borderRadius: 'var(--pv-radius-lg)',
        boxShadow: 'var(--pv-shadow-sm)',
        transition: interactive ? 'box-shadow var(--pv-dur-base) var(--pv-ease), border-color var(--pv-dur-base) var(--pv-ease)' : 'none',
        ...style,
      }}
      onMouseEnter={interactive ? (e) => { e.currentTarget.style.boxShadow = 'var(--pv-shadow-md)'; e.currentTarget.style.borderColor = 'var(--pv-border-strong)'; } : undefined}
      onMouseLeave={interactive ? (e) => { e.currentTarget.style.boxShadow = 'var(--pv-shadow-sm)'; e.currentTarget.style.borderColor = 'var(--pv-border)'; } : undefined}
      {...rest}
    >
      {(title || action) ? (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, padding: '14px 16px', borderBottom: '1px solid var(--pv-border)' }}>
          <h3 style={{ margin: 0, fontSize: 'var(--pv-text-h3)', fontWeight: 600, color: 'var(--pv-text-strong)' }}>{title}</h3>
          {action}
        </div>
      ) : null}
      <div style={{ padding, ...bodyStyle }}>{children}</div>
    </div>
  );
}
