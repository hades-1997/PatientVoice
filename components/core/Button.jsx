import React from 'react';

/**
 * PatientVoice primary button.
 * Variants: primary | secondary | outline | ghost | danger
 * Sizes: sm | md | lg
 */
export function Button({
  variant = 'primary',
  size = 'md',
  iconLeft = null,
  iconRight = null,
  disabled = false,
  fullWidth = false,
  style = {},
  children,
  ...rest
}) {
  const sizes = {
    sm: { height: 30, padding: '0 12px', fontSize: 13, gap: 6, radius: 'var(--pv-radius-sm)' },
    md: { height: 38, padding: '0 16px', fontSize: 14, gap: 8, radius: 'var(--pv-radius-md)' },
    lg: { height: 44, padding: '0 20px', fontSize: 15, gap: 8, radius: 'var(--pv-radius-md)' },
  };
  const s = sizes[size] || sizes.md;

  const variants = {
    primary: { background: 'var(--pv-primary-600)', color: '#fff', border: '1px solid var(--pv-primary-600)' },
    secondary: { background: 'var(--pv-secondary-500)', color: '#fff', border: '1px solid var(--pv-secondary-500)' },
    outline: { background: 'var(--pv-neutral-0)', color: 'var(--pv-primary-700)', border: '1px solid var(--pv-border-strong)' },
    ghost: { background: 'transparent', color: 'var(--pv-text-body)', border: '1px solid transparent' },
    danger: { background: 'var(--pv-critical-600)', color: '#fff', border: '1px solid var(--pv-critical-600)' },
  };
  const v = variants[variant] || variants.primary;

  return (
    <button
      disabled={disabled}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: s.gap,
        height: s.height,
        padding: s.padding,
        width: fullWidth ? '100%' : 'auto',
        fontFamily: 'var(--pv-font-sans)',
        fontSize: s.fontSize,
        fontWeight: 600,
        lineHeight: 1,
        whiteSpace: 'nowrap',
        borderRadius: s.radius,
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.5 : 1,
        transition: 'filter var(--pv-dur-fast) var(--pv-ease), box-shadow var(--pv-dur-fast) var(--pv-ease)',
        ...v,
        ...style,
      }}
      onMouseEnter={(e) => { if (!disabled) e.currentTarget.style.filter = 'brightness(0.94)'; }}
      onMouseLeave={(e) => { e.currentTarget.style.filter = 'none'; }}
      {...rest}
    >
      {iconLeft ? <span style={{ display: 'inline-flex', width: s.fontSize + 2, height: s.fontSize + 2 }}>{iconLeft}</span> : null}
      {children}
      {iconRight ? <span style={{ display: 'inline-flex', width: s.fontSize + 2, height: s.fontSize + 2 }}>{iconRight}</span> : null}
    </button>
  );
}
