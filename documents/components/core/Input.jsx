import React from 'react';

/**
 * Text input with optional leading icon and label.
 */
export function Input({ label, leftIcon, hint, invalid = false, style = {}, containerStyle = {}, id, ...rest }) {
  const inputId = id || (label ? `pv-in-${label.replace(/\s+/g, '-').toLowerCase()}` : undefined);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6, ...containerStyle }}>
      {label ? (
        <label htmlFor={inputId} style={{ fontSize: 13, fontWeight: 600, color: 'var(--pv-text-body)' }}>{label}</label>
      ) : null}
      <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
        {leftIcon ? (
          <span style={{ position: 'absolute', left: 11, display: 'inline-flex', width: 16, height: 16, color: 'var(--pv-text-subtle)', pointerEvents: 'none' }}>{leftIcon}</span>
        ) : null}
        <input
          id={inputId}
          style={{
            width: '100%', boxSizing: 'border-box', height: 38,
            padding: leftIcon ? '0 12px 0 34px' : '0 12px',
            fontFamily: 'var(--pv-font-sans)', fontSize: 14, color: 'var(--pv-text-strong)',
            background: 'var(--pv-neutral-0)',
            border: `1px solid ${invalid ? 'var(--pv-critical-500)' : 'var(--pv-border-strong)'}`,
            borderRadius: 'var(--pv-radius-md)', outline: 'none',
            transition: 'border-color var(--pv-dur-fast) var(--pv-ease), box-shadow var(--pv-dur-fast) var(--pv-ease)',
            ...style,
          }}
          onFocus={(e) => { e.currentTarget.style.borderColor = 'var(--pv-border-focus)'; e.currentTarget.style.boxShadow = 'var(--pv-shadow-focus)'; }}
          onBlur={(e) => { e.currentTarget.style.borderColor = invalid ? 'var(--pv-critical-500)' : 'var(--pv-border-strong)'; e.currentTarget.style.boxShadow = 'none'; }}
          {...rest}
        />
      </div>
      {hint ? <span style={{ fontSize: 12, color: invalid ? 'var(--pv-critical-600)' : 'var(--pv-text-muted)' }}>{hint}</span> : null}
    </div>
  );
}
