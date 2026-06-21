import React from 'react';

/**
 * Underline tab bar for switching views (Kanban / Table / Timeline, etc.).
 */
export function Tabs({ tabs = [], value, onChange, style = {} }) {
  return (
    <div role="tablist" style={{ display: 'flex', gap: 4, borderBottom: '1px solid var(--pv-border)', ...style }}>
      {tabs.map((t) => {
        const key = typeof t === 'string' ? t : t.value;
        const label = typeof t === 'string' ? t : t.label;
        const count = typeof t === 'object' ? t.count : undefined;
        const active = key === value;
        return (
          <button
            key={key}
            role="tab"
            aria-selected={active}
            onClick={() => onChange && onChange(key)}
            style={{
              position: 'relative', display: 'inline-flex', alignItems: 'center', gap: 7,
              padding: '10px 12px', marginBottom: -1, background: 'transparent', cursor: 'pointer',
              fontFamily: 'var(--pv-font-sans)', fontSize: 14, fontWeight: 600,
              color: active ? 'var(--pv-primary-700)' : 'var(--pv-text-muted)',
              borderBottom: `2px solid ${active ? 'var(--pv-primary-600)' : 'transparent'}`,
              transition: 'color var(--pv-dur-fast) var(--pv-ease)',
            }}
            onMouseEnter={(e) => { if (!active) e.currentTarget.style.color = 'var(--pv-text-body)'; }}
            onMouseLeave={(e) => { if (!active) e.currentTarget.style.color = 'var(--pv-text-muted)'; }}
          >
            {label}
            {count != null ? (
              <span style={{
                fontFamily: 'var(--pv-font-mono)', fontSize: 11, fontWeight: 600,
                padding: '1px 7px', borderRadius: 999,
                background: active ? 'var(--pv-primary-50)' : 'var(--pv-neutral-100)',
                color: active ? 'var(--pv-primary-700)' : 'var(--pv-text-muted)',
              }}>{count}</span>
            ) : null}
          </button>
        );
      })}
    </div>
  );
}
