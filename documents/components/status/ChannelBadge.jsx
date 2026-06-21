import React from 'react';

/**
 * Intake channel chip. Renders a Lucide icon (host must load Lucide)
 * plus label, tinted per channel family.
 */
const CH = {
  front_desk:    { label: 'Front Desk',    icon: 'concierge-bell', color: 'var(--pv-primary-700)' },
  hotline:       { label: 'Hotline',       icon: 'phone',          color: 'var(--pv-secondary-700)' },
  suggestion_box:{ label: 'Suggestion Box',icon: 'inbox',          color: 'var(--pv-accent-600)' },
  online_form:   { label: 'Online Form',   icon: 'clipboard-list', color: 'var(--pv-info-600)' },
  email:         { label: 'Email',         icon: 'mail',           color: 'var(--pv-primary-600)' },
  social_media:  { label: 'Social Media',  icon: 'message-circle', color: 'var(--pv-accent-600)' },
  news_media:    { label: 'News Media',    icon: 'newspaper',      color: 'var(--pv-warning-700)' },
};

export function ChannelBadge({ channel = 'front_desk', showLabel = true, style = {} }) {
  const c = CH[channel] || CH.front_desk;
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 6,
      padding: showLabel ? '3px 10px 3px 8px' : 5, borderRadius: 'var(--pv-radius-pill)',
      fontFamily: 'var(--pv-font-sans)', fontSize: 12, fontWeight: 600, lineHeight: 1.4,
      color: c.color, background: 'var(--pv-neutral-100)', whiteSpace: 'nowrap', ...style,
    }}>
      <i data-lucide={c.icon} style={{ width: 14, height: 14, display: 'inline-flex' }} />
      {showLabel ? c.label : null}
    </span>
  );
}
