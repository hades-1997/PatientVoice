import React from 'react';

/**
 * Square icon-only button (toolbars, table row actions, sidebar).
 * Pass a single icon node as children.
 */
export function IconButton({ size = 'md', variant = 'ghost', label, style = {}, children, ...rest }) {
  const sizes = { sm: 28, md: 34, lg: 40 };
  const dim = sizes[size] || sizes.md;
  const variants = {
    ghost: { background: 'transparent', color: 'var(--pv-text-muted)', border: '1px solid transparent' },
    outline: { background: 'var(--pv-neutral-0)', color: 'var(--pv-text-body)', border: '1px solid var(--pv-border-strong)' },
    solid: { background: 'var(--pv-primary-600)', color: '#fff', border: '1px solid var(--pv-primary-600)' },
  };
  const v = variants[variant] || variants.ghost;
  return (
    <button
      aria-label={label}
      title={label}
      style={{
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        width: dim, height: dim, flex: 'none',
        borderRadius: 'var(--pv-radius-sm)', cursor: 'pointer',
        transition: 'background var(--pv-dur-fast) var(--pv-ease), color var(--pv-dur-fast) var(--pv-ease)',
        ...v, ...style,
      }}
      onMouseEnter={(e) => { if (variant === 'ghost') e.currentTarget.style.background = 'var(--pv-neutral-100)'; }}
      onMouseLeave={(e) => { if (variant === 'ghost') e.currentTarget.style.background = 'transparent'; }}
      {...rest}
    >
      <span style={{ display: 'inline-flex', width: Math.round(dim * 0.5), height: Math.round(dim * 0.5) }}>{children}</span>
    </button>
  );
}
