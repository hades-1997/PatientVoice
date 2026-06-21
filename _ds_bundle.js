/* @ds-bundle: {"format":3,"namespace":"PatientVoiceDesignSystem_16c56a","components":[{"name":"Avatar","sourcePath":"components/core/Avatar.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Card","sourcePath":"components/core/Card.jsx"},{"name":"IconButton","sourcePath":"components/core/IconButton.jsx"},{"name":"Input","sourcePath":"components/core/Input.jsx"},{"name":"Tabs","sourcePath":"components/core/Tabs.jsx"},{"name":"StatCard","sourcePath":"components/data/StatCard.jsx"},{"name":"ChannelBadge","sourcePath":"components/status/ChannelBadge.jsx"},{"name":"PriorityBadge","sourcePath":"components/status/PriorityBadge.jsx"},{"name":"SLABadge","sourcePath":"components/status/SLABadge.jsx"},{"name":"StatusBadge","sourcePath":"components/status/StatusBadge.jsx"}],"sourceHashes":{"components/core/Avatar.jsx":"654c02f19a01","components/core/Button.jsx":"22e0e4fce5f6","components/core/Card.jsx":"924fa005dd02","components/core/IconButton.jsx":"b171cc70cbf1","components/core/Input.jsx":"eaf794a88d03","components/core/Tabs.jsx":"8382dd8f8bce","components/data/StatCard.jsx":"77fd5158e74d","components/status/ChannelBadge.jsx":"d610e8b1aedd","components/status/PriorityBadge.jsx":"bf4babf4dc3c","components/status/SLABadge.jsx":"2eec29f1043d","components/status/StatusBadge.jsx":"030596973fb6","ui_kits/patientvoice/Analytics.jsx":"baf69ceb9974","ui_kits/patientvoice/AppShell.jsx":"bf3976ce7643","ui_kits/patientvoice/Dashboard.jsx":"fa3eb5980769","ui_kits/patientvoice/FeedbackDetail.jsx":"17c6c4240f7a","ui_kits/patientvoice/FeedbackList.jsx":"4acb00bbfb53","ui_kits/patientvoice/Intake.jsx":"6a7ce08ea85b","ui_kits/patientvoice/SLAMonitor.jsx":"a01eb40e77af","ui_kits/patientvoice/charts.jsx":"db024923557d","ui_kits/patientvoice/data.js":"fb6471fdecbf"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.PatientVoiceDesignSystem_16c56a = window.PatientVoiceDesignSystem_16c56a || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/core/Avatar.jsx
try { (() => {
const palette = [['#0e7490', '#cffafe'], ['#0d9488', '#ccfbf1'], ['#7c3aed', '#ede9fe'], ['#2563eb', '#dbeafe'], ['#ea580c', '#ffedd5'], ['#059669', '#d1fae5']];
function hashIndex(name = '') {
  let h = 0;
  for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) % palette.length;
  return h;
}
function initials(name = '') {
  const p = name.trim().split(/\s+/);
  return ((p[0]?.[0] || '') + (p[1]?.[0] || '')).toUpperCase() || '?';
}

/**
 * User avatar — initials or image, with optional presence dot.
 */
function Avatar({
  name = '',
  src,
  size = 32,
  status,
  style = {}
}) {
  const [fg, bg] = palette[hashIndex(name)];
  const statusColors = {
    online: 'var(--pv-success-500)',
    away: 'var(--pv-warning-500)',
    offline: 'var(--pv-neutral-400)'
  };
  return /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'relative',
      display: 'inline-flex',
      flex: 'none',
      width: size,
      height: size,
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: size,
      height: size,
      borderRadius: 'var(--pv-radius-pill)',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
      background: src ? 'var(--pv-neutral-200)' : bg,
      color: fg,
      fontFamily: 'var(--pv-font-sans)',
      fontWeight: 600,
      fontSize: Math.round(size * 0.4),
      boxShadow: 'inset 0 0 0 1px rgba(15,23,42,.06)'
    }
  }, src ? /*#__PURE__*/React.createElement("img", {
    src: src,
    alt: name,
    style: {
      width: '100%',
      height: '100%',
      objectFit: 'cover'
    }
  }) : initials(name)), status ? /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      right: -1,
      bottom: -1,
      width: Math.max(8, size * 0.28),
      height: Math.max(8, size * 0.28),
      borderRadius: '50%',
      background: statusColors[status] || statusColors.offline,
      border: '2px solid #fff'
    }
  }) : null);
}
Object.assign(__ds_scope, { Avatar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Avatar.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * PatientVoice primary button.
 * Variants: primary | secondary | outline | ghost | danger
 * Sizes: sm | md | lg
 */
function Button({
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
    sm: {
      height: 30,
      padding: '0 12px',
      fontSize: 13,
      gap: 6,
      radius: 'var(--pv-radius-sm)'
    },
    md: {
      height: 38,
      padding: '0 16px',
      fontSize: 14,
      gap: 8,
      radius: 'var(--pv-radius-md)'
    },
    lg: {
      height: 44,
      padding: '0 20px',
      fontSize: 15,
      gap: 8,
      radius: 'var(--pv-radius-md)'
    }
  };
  const s = sizes[size] || sizes.md;
  const variants = {
    primary: {
      background: 'var(--pv-primary-600)',
      color: '#fff',
      border: '1px solid var(--pv-primary-600)'
    },
    secondary: {
      background: 'var(--pv-secondary-500)',
      color: '#fff',
      border: '1px solid var(--pv-secondary-500)'
    },
    outline: {
      background: 'var(--pv-neutral-0)',
      color: 'var(--pv-primary-700)',
      border: '1px solid var(--pv-border-strong)'
    },
    ghost: {
      background: 'transparent',
      color: 'var(--pv-text-body)',
      border: '1px solid transparent'
    },
    danger: {
      background: 'var(--pv-critical-600)',
      color: '#fff',
      border: '1px solid var(--pv-critical-600)'
    }
  };
  const v = variants[variant] || variants.primary;
  return /*#__PURE__*/React.createElement("button", _extends({
    disabled: disabled,
    style: {
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
      ...style
    },
    onMouseEnter: e => {
      if (!disabled) e.currentTarget.style.filter = 'brightness(0.94)';
    },
    onMouseLeave: e => {
      e.currentTarget.style.filter = 'none';
    }
  }, rest), iconLeft ? /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      width: s.fontSize + 2,
      height: s.fontSize + 2
    }
  }, iconLeft) : null, children, iconRight ? /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      width: s.fontSize + 2,
      height: s.fontSize + 2
    }
  }, iconRight) : null);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/Card.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Surface container for grouped content (panels, widgets, list cards).
 */
function Card({
  title,
  action,
  padding = 16,
  interactive = false,
  style = {},
  bodyStyle = {},
  children,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      background: 'var(--pv-surface-card)',
      border: '1px solid var(--pv-border)',
      borderRadius: 'var(--pv-radius-lg)',
      boxShadow: 'var(--pv-shadow-sm)',
      transition: interactive ? 'box-shadow var(--pv-dur-base) var(--pv-ease), border-color var(--pv-dur-base) var(--pv-ease)' : 'none',
      ...style
    },
    onMouseEnter: interactive ? e => {
      e.currentTarget.style.boxShadow = 'var(--pv-shadow-md)';
      e.currentTarget.style.borderColor = 'var(--pv-border-strong)';
    } : undefined,
    onMouseLeave: interactive ? e => {
      e.currentTarget.style.boxShadow = 'var(--pv-shadow-sm)';
      e.currentTarget.style.borderColor = 'var(--pv-border)';
    } : undefined
  }, rest), title || action ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 12,
      padding: '14px 16px',
      borderBottom: '1px solid var(--pv-border)'
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: 0,
      fontSize: 'var(--pv-text-h3)',
      fontWeight: 600,
      color: 'var(--pv-text-strong)'
    }
  }, title), action) : null, /*#__PURE__*/React.createElement("div", {
    style: {
      padding,
      ...bodyStyle
    }
  }, children));
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Card.jsx", error: String((e && e.message) || e) }); }

// components/core/IconButton.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Square icon-only button (toolbars, table row actions, sidebar).
 * Pass a single icon node as children.
 */
function IconButton({
  size = 'md',
  variant = 'ghost',
  label,
  style = {},
  children,
  ...rest
}) {
  const sizes = {
    sm: 28,
    md: 34,
    lg: 40
  };
  const dim = sizes[size] || sizes.md;
  const variants = {
    ghost: {
      background: 'transparent',
      color: 'var(--pv-text-muted)',
      border: '1px solid transparent'
    },
    outline: {
      background: 'var(--pv-neutral-0)',
      color: 'var(--pv-text-body)',
      border: '1px solid var(--pv-border-strong)'
    },
    solid: {
      background: 'var(--pv-primary-600)',
      color: '#fff',
      border: '1px solid var(--pv-primary-600)'
    }
  };
  const v = variants[variant] || variants.ghost;
  return /*#__PURE__*/React.createElement("button", _extends({
    "aria-label": label,
    title: label,
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: dim,
      height: dim,
      flex: 'none',
      borderRadius: 'var(--pv-radius-sm)',
      cursor: 'pointer',
      transition: 'background var(--pv-dur-fast) var(--pv-ease), color var(--pv-dur-fast) var(--pv-ease)',
      ...v,
      ...style
    },
    onMouseEnter: e => {
      if (variant === 'ghost') e.currentTarget.style.background = 'var(--pv-neutral-100)';
    },
    onMouseLeave: e => {
      if (variant === 'ghost') e.currentTarget.style.background = 'transparent';
    }
  }, rest), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      width: Math.round(dim * 0.5),
      height: Math.round(dim * 0.5)
    }
  }, children));
}
Object.assign(__ds_scope, { IconButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/IconButton.jsx", error: String((e && e.message) || e) }); }

// components/core/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Text input with optional leading icon and label.
 */
function Input({
  label,
  leftIcon,
  hint,
  invalid = false,
  style = {},
  containerStyle = {},
  id,
  ...rest
}) {
  const inputId = id || (label ? `pv-in-${label.replace(/\s+/g, '-').toLowerCase()}` : undefined);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 6,
      ...containerStyle
    }
  }, label ? /*#__PURE__*/React.createElement("label", {
    htmlFor: inputId,
    style: {
      fontSize: 13,
      fontWeight: 600,
      color: 'var(--pv-text-body)'
    }
  }, label) : null, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      display: 'flex',
      alignItems: 'center'
    }
  }, leftIcon ? /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      left: 11,
      display: 'inline-flex',
      width: 16,
      height: 16,
      color: 'var(--pv-text-subtle)',
      pointerEvents: 'none'
    }
  }, leftIcon) : null, /*#__PURE__*/React.createElement("input", _extends({
    id: inputId,
    style: {
      width: '100%',
      boxSizing: 'border-box',
      height: 38,
      padding: leftIcon ? '0 12px 0 34px' : '0 12px',
      fontFamily: 'var(--pv-font-sans)',
      fontSize: 14,
      color: 'var(--pv-text-strong)',
      background: 'var(--pv-neutral-0)',
      border: `1px solid ${invalid ? 'var(--pv-critical-500)' : 'var(--pv-border-strong)'}`,
      borderRadius: 'var(--pv-radius-md)',
      outline: 'none',
      transition: 'border-color var(--pv-dur-fast) var(--pv-ease), box-shadow var(--pv-dur-fast) var(--pv-ease)',
      ...style
    },
    onFocus: e => {
      e.currentTarget.style.borderColor = 'var(--pv-border-focus)';
      e.currentTarget.style.boxShadow = 'var(--pv-shadow-focus)';
    },
    onBlur: e => {
      e.currentTarget.style.borderColor = invalid ? 'var(--pv-critical-500)' : 'var(--pv-border-strong)';
      e.currentTarget.style.boxShadow = 'none';
    }
  }, rest))), hint ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      color: invalid ? 'var(--pv-critical-600)' : 'var(--pv-text-muted)'
    }
  }, hint) : null);
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Input.jsx", error: String((e && e.message) || e) }); }

// components/core/Tabs.jsx
try { (() => {
/**
 * Underline tab bar for switching views (Kanban / Table / Timeline, etc.).
 */
function Tabs({
  tabs = [],
  value,
  onChange,
  style = {}
}) {
  return /*#__PURE__*/React.createElement("div", {
    role: "tablist",
    style: {
      display: 'flex',
      gap: 4,
      borderBottom: '1px solid var(--pv-border)',
      ...style
    }
  }, tabs.map(t => {
    const key = typeof t === 'string' ? t : t.value;
    const label = typeof t === 'string' ? t : t.label;
    const count = typeof t === 'object' ? t.count : undefined;
    const active = key === value;
    return /*#__PURE__*/React.createElement("button", {
      key: key,
      role: "tab",
      "aria-selected": active,
      onClick: () => onChange && onChange(key),
      style: {
        position: 'relative',
        display: 'inline-flex',
        alignItems: 'center',
        gap: 7,
        padding: '10px 12px',
        marginBottom: -1,
        background: 'transparent',
        cursor: 'pointer',
        fontFamily: 'var(--pv-font-sans)',
        fontSize: 14,
        fontWeight: 600,
        color: active ? 'var(--pv-primary-700)' : 'var(--pv-text-muted)',
        borderBottom: `2px solid ${active ? 'var(--pv-primary-600)' : 'transparent'}`,
        transition: 'color var(--pv-dur-fast) var(--pv-ease)'
      },
      onMouseEnter: e => {
        if (!active) e.currentTarget.style.color = 'var(--pv-text-body)';
      },
      onMouseLeave: e => {
        if (!active) e.currentTarget.style.color = 'var(--pv-text-muted)';
      }
    }, label, count != null ? /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: 'var(--pv-font-mono)',
        fontSize: 11,
        fontWeight: 600,
        padding: '1px 7px',
        borderRadius: 999,
        background: active ? 'var(--pv-primary-50)' : 'var(--pv-neutral-100)',
        color: active ? 'var(--pv-primary-700)' : 'var(--pv-text-muted)'
      }
    }, count) : null);
  }));
}
Object.assign(__ds_scope, { Tabs });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Tabs.jsx", error: String((e && e.message) || e) }); }

// components/data/StatCard.jsx
try { (() => {
/**
 * Dashboard KPI tile — label, big value, optional delta and icon.
 * `tone` tints the icon chip and delta. `delta` is a number (% or count);
 * positive shows up-trend, negative down-trend; pass `invertDelta` when
 * "down is good" (e.g. overdue tickets).
 */
const TONES = {
  primary: {
    fg: 'var(--pv-primary-700)',
    bg: 'var(--pv-primary-50)'
  },
  secondary: {
    fg: 'var(--pv-secondary-700)',
    bg: 'var(--pv-secondary-100)'
  },
  success: {
    fg: 'var(--pv-success-700)',
    bg: 'var(--pv-success-50)'
  },
  warning: {
    fg: 'var(--pv-warning-700)',
    bg: 'var(--pv-warning-50)'
  },
  critical: {
    fg: 'var(--pv-critical-700)',
    bg: 'var(--pv-critical-50)'
  },
  accent: {
    fg: 'var(--pv-accent-600)',
    bg: 'var(--pv-accent-50)'
  },
  neutral: {
    fg: 'var(--pv-neutral-700)',
    bg: 'var(--pv-neutral-100)'
  }
};
function StatCard({
  label,
  value,
  unit,
  delta,
  deltaLabel,
  invertDelta = false,
  icon,
  tone = 'primary',
  style = {}
}) {
  const t = TONES[tone] || TONES.primary;
  const hasDelta = delta != null;
  const up = hasDelta && delta >= 0;
  const good = hasDelta ? invertDelta ? !up : up : true;
  const deltaColor = good ? 'var(--pv-success-700)' : 'var(--pv-critical-600)';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--pv-surface-card)',
      border: '1px solid var(--pv-border)',
      borderRadius: 'var(--pv-radius-lg)',
      boxShadow: 'var(--pv-shadow-sm)',
      padding: 18,
      display: 'flex',
      flexDirection: 'column',
      gap: 12,
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      fontWeight: 600,
      color: 'var(--pv-text-muted)'
    }
  }, label), icon ? /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: 34,
      height: 34,
      borderRadius: 'var(--pv-radius-md)',
      background: t.bg,
      color: t.fg,
      flex: 'none'
    }
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": icon,
    style: {
      width: 18,
      height: 18
    }
  })) : null), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'baseline',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--pv-font-sans)',
      fontSize: 30,
      fontWeight: 700,
      letterSpacing: '-0.01em',
      color: 'var(--pv-text-strong)',
      fontVariantNumeric: 'tabular-nums',
      lineHeight: 1
    }
  }, value), unit ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14,
      fontWeight: 600,
      color: 'var(--pv-text-muted)'
    }
  }, unit) : null), hasDelta || deltaLabel ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 6,
      fontSize: 12
    }
  }, hasDelta ? /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 3,
      fontWeight: 700,
      color: deltaColor
    }
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": up ? 'arrow-up-right' : 'arrow-down-right',
    style: {
      width: 13,
      height: 13
    }
  }), Math.abs(delta), "%") : null, deltaLabel ? /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--pv-text-subtle)'
    }
  }, deltaLabel) : null) : null);
}
Object.assign(__ds_scope, { StatCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/StatCard.jsx", error: String((e && e.message) || e) }); }

// components/status/ChannelBadge.jsx
try { (() => {
/**
 * Intake channel chip. Renders a Lucide icon (host must load Lucide)
 * plus label, tinted per channel family.
 */
const CH = {
  front_desk: {
    label: 'Front Desk',
    icon: 'concierge-bell',
    color: 'var(--pv-primary-700)'
  },
  hotline: {
    label: 'Hotline',
    icon: 'phone',
    color: 'var(--pv-secondary-700)'
  },
  suggestion_box: {
    label: 'Suggestion Box',
    icon: 'inbox',
    color: 'var(--pv-accent-600)'
  },
  online_form: {
    label: 'Online Form',
    icon: 'clipboard-list',
    color: 'var(--pv-info-600)'
  },
  email: {
    label: 'Email',
    icon: 'mail',
    color: 'var(--pv-primary-600)'
  },
  social_media: {
    label: 'Social Media',
    icon: 'message-circle',
    color: 'var(--pv-accent-600)'
  },
  news_media: {
    label: 'News Media',
    icon: 'newspaper',
    color: 'var(--pv-warning-700)'
  }
};
function ChannelBadge({
  channel = 'front_desk',
  showLabel = true,
  style = {}
}) {
  const c = CH[channel] || CH.front_desk;
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      padding: showLabel ? '3px 10px 3px 8px' : 5,
      borderRadius: 'var(--pv-radius-pill)',
      fontFamily: 'var(--pv-font-sans)',
      fontSize: 12,
      fontWeight: 600,
      lineHeight: 1.4,
      color: c.color,
      background: 'var(--pv-neutral-100)',
      whiteSpace: 'nowrap',
      ...style
    }
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": c.icon,
    style: {
      width: 14,
      height: 14,
      display: 'inline-flex'
    }
  }), showLabel ? c.label : null);
}
Object.assign(__ds_scope, { ChannelBadge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/status/ChannelBadge.jsx", error: String((e && e.message) || e) }); }

// components/status/PriorityBadge.jsx
try { (() => {
/**
 * Triage priority badge — Urgent / High / Normal.
 */
const PRI = {
  urgent: {
    label: 'Urgent',
    color: 'var(--pv-critical-700)',
    bg: 'var(--pv-critical-50)',
    bar: 'var(--pv-critical-500)'
  },
  high: {
    label: 'High',
    color: 'var(--pv-warning-700)',
    bg: 'var(--pv-warning-50)',
    bar: 'var(--pv-warning-500)'
  },
  normal: {
    label: 'Normal',
    color: 'var(--pv-neutral-600)',
    bg: 'var(--pv-neutral-100)',
    bar: 'var(--pv-neutral-400)'
  }
};
function PriorityBadge({
  priority = 'normal',
  style = {}
}) {
  const p = PRI[priority] || PRI.normal;
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      padding: '3px 9px 3px 7px',
      borderRadius: 'var(--pv-radius-sm)',
      fontFamily: 'var(--pv-font-sans)',
      fontSize: 12,
      fontWeight: 600,
      lineHeight: 1.4,
      color: p.color,
      background: p.bg,
      whiteSpace: 'nowrap',
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 3,
      height: 12,
      borderRadius: 2,
      background: p.bar,
      flex: 'none'
    }
  }), p.label);
}
Object.assign(__ds_scope, { PriorityBadge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/status/PriorityBadge.jsx", error: String((e && e.message) || e) }); }

// components/status/SLABadge.jsx
try { (() => {
/**
 * SLA status indicator with countdown / consumed visualization.
 * State derives from `consumedPct`: <80 on-track (teal), 80–100 warning
 * (orange), >100 or breached (red). Pass `remaining` (e.g. "02:14:38")
 * for the timer label, or `breached` to force the breach state.
 */
function slaState(pct, breached) {
  if (breached || pct >= 100) return {
    key: 'breach',
    label: 'Breached',
    color: 'var(--pv-critical-600)',
    bg: 'var(--pv-critical-50)',
    icon: 'alarm-clock-off'
  };
  if (pct >= 80) return {
    key: 'warn',
    label: 'Due soon',
    color: 'var(--pv-warning-700)',
    bg: 'var(--pv-warning-50)',
    icon: 'alarm-clock'
  };
  return {
    key: 'ok',
    label: 'On track',
    color: 'var(--pv-success-700)',
    bg: 'var(--pv-success-50)',
    icon: 'clock'
  };
}
function SLABadge({
  consumedPct = 0,
  remaining,
  breached = false,
  variant = 'pill',
  style = {}
}) {
  const s = slaState(consumedPct, breached);
  const pct = Math.min(100, Math.max(0, consumedPct));
  if (variant === 'bar') {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        flexDirection: 'column',
        gap: 5,
        minWidth: 140,
        ...style
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: 5,
        fontSize: 12,
        fontWeight: 600,
        color: s.color
      }
    }, /*#__PURE__*/React.createElement("i", {
      "data-lucide": s.icon,
      style: {
        width: 13,
        height: 13
      }
    }), s.label), remaining ? /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: 'var(--pv-font-mono)',
        fontSize: 12,
        fontWeight: 600,
        color: s.color,
        fontVariantNumeric: 'tabular-nums'
      }
    }, remaining) : null), /*#__PURE__*/React.createElement("div", {
      style: {
        height: 6,
        borderRadius: 999,
        background: 'var(--pv-neutral-200)',
        overflow: 'hidden'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: `${pct}%`,
        height: '100%',
        borderRadius: 999,
        background: s.color,
        transition: 'width var(--pv-dur-slow) var(--pv-ease)'
      }
    })));
  }
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      padding: '3px 10px',
      borderRadius: 'var(--pv-radius-pill)',
      fontFamily: 'var(--pv-font-sans)',
      fontSize: 12,
      fontWeight: 600,
      lineHeight: 1.4,
      color: s.color,
      background: s.bg,
      boxShadow: `inset 0 0 0 1px ${s.color}26`,
      whiteSpace: 'nowrap',
      ...style
    }
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": s.icon,
    style: {
      width: 13,
      height: 13,
      display: 'inline-flex'
    }
  }), remaining ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--pv-font-mono)',
      fontVariantNumeric: 'tabular-nums'
    }
  }, remaining) : s.label);
}
Object.assign(__ds_scope, { SLABadge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/status/SLABadge.jsx", error: String((e && e.message) || e) }); }

// components/status/StatusBadge.jsx
try { (() => {
/**
 * Workflow status badge for feedback tickets.
 * Maps the 6 PatientVoice statuses to a consistent dot + tinted pill.
 */
const STATUS = {
  new: {
    label: 'New',
    color: 'var(--pv-info-600)',
    bg: 'var(--pv-info-50)'
  },
  assigned: {
    label: 'Assigned',
    color: 'var(--pv-accent-600)',
    bg: 'var(--pv-accent-50)'
  },
  in_progress: {
    label: 'In Progress',
    color: 'var(--pv-primary-600)',
    bg: 'var(--pv-primary-50)'
  },
  pending_confirmation: {
    label: 'Pending Confirmation',
    color: 'var(--pv-warning-600)',
    bg: 'var(--pv-warning-50)'
  },
  resolved: {
    label: 'Resolved',
    color: 'var(--pv-success-600)',
    bg: 'var(--pv-success-50)'
  },
  unresolved: {
    label: 'Unresolved',
    color: 'var(--pv-critical-600)',
    bg: 'var(--pv-critical-50)'
  }
};
function StatusBadge({
  status = 'new',
  size = 'md',
  style = {}
}) {
  const s = STATUS[status] || STATUS.new;
  const dim = size === 'sm' ? {
    fs: 11,
    pad: '2px 8px',
    dot: 6
  } : {
    fs: 12,
    pad: '3px 10px',
    dot: 7
  };
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      padding: dim.pad,
      borderRadius: 'var(--pv-radius-pill)',
      fontFamily: 'var(--pv-font-sans)',
      fontSize: dim.fs,
      fontWeight: 600,
      lineHeight: 1.4,
      whiteSpace: 'nowrap',
      color: s.color,
      background: s.bg,
      boxShadow: `inset 0 0 0 1px ${s.color}1f`,
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: dim.dot,
      height: dim.dot,
      borderRadius: '50%',
      background: s.color,
      flex: 'none'
    }
  }), s.label);
}
Object.assign(__ds_scope, { StatusBadge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/status/StatusBadge.jsx", error: String((e && e.message) || e) }); }

// ui_kits/patientvoice/Analytics.jsx
try { (() => {
// PatientVoice — Analytics & Reporting Center. window.PVAnalytics
(function () {
  function Analytics() {
    const D = window.PV_DATA;
    const {
      StatCard
    } = window.PatientVoiceDesignSystem_16c56a;
    const {
      TrendChart,
      Donut,
      RankList
    } = window.PVCharts;
    React.useEffect(() => {
      window.lucide && window.lucide.createIcons();
    });
    function Panel({
      title,
      action,
      children,
      pad = 16
    }) {
      return /*#__PURE__*/React.createElement("div", {
        style: {
          background: '#fff',
          border: '1px solid var(--pv-border)',
          borderRadius: 12,
          boxShadow: 'var(--pv-shadow-sm)'
        }
      }, title ? /*#__PURE__*/React.createElement("div", {
        style: {
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '12px 16px',
          borderBottom: '1px solid var(--pv-border)'
        }
      }, /*#__PURE__*/React.createElement("span", {
        style: {
          fontSize: 13.5,
          fontWeight: 700,
          color: 'var(--pv-text-strong)'
        }
      }, title), action) : null, /*#__PURE__*/React.createElement("div", {
        style: {
          padding: pad
        }
      }, children));
    }
    const ddl = /*#__PURE__*/React.createElement("span", {
      style: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        fontSize: 12.5,
        color: 'var(--pv-text-muted)',
        fontWeight: 600
      }
    }, "2026 YTD ", /*#__PURE__*/React.createElement("i", {
      "data-lucide": "chevron-down",
      style: {
        width: 14,
        height: 14
      }
    }));

    // Channel evaluation table
    const channels = [{
      ch: 'Hotline',
      vol: 892,
      sla: 96,
      res: 94,
      trend: 'up'
    }, {
      ch: 'Online Form',
      vol: 574,
      sla: 92,
      res: 90,
      trend: 'up'
    }, {
      ch: 'Front Desk',
      vol: 468,
      sla: 89,
      res: 88,
      trend: 'flat'
    }, {
      ch: 'Email',
      vol: 312,
      sla: 84,
      res: 82,
      trend: 'down'
    }, {
      ch: 'Social Media',
      vol: 233,
      sla: 78,
      res: 74,
      trend: 'down'
    }, {
      ch: 'Suggestion Box',
      vol: 129,
      sla: 91,
      res: 87,
      trend: 'up'
    }];
    const trendIcon = {
      up: ['trending-up', 'var(--pv-success-600)'],
      down: ['trending-down', 'var(--pv-critical-600)'],
      flat: ['minus', 'var(--pv-text-subtle)']
    };
    return /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
        maxWidth: 1440
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        flexWrap: 'wrap'
      }
    }, ['Feedback Trend', 'Complaint Trend', 'SLA Compliance', 'Channel Effectiveness', 'Department Ranking'].map((tab, i) => /*#__PURE__*/React.createElement("span", {
      key: tab,
      style: {
        padding: '7px 13px',
        borderRadius: 999,
        fontSize: 13,
        fontWeight: 600,
        cursor: 'pointer',
        background: i === 0 ? 'var(--pv-primary-600)' : '#fff',
        color: i === 0 ? '#fff' : 'var(--pv-text-muted)',
        border: `1px solid ${i === 0 ? 'var(--pv-primary-600)' : 'var(--pv-border)'}`
      }
    }, tab)), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1
      }
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: 7,
        padding: '7px 13px',
        borderRadius: 8,
        background: '#fff',
        border: '1px solid var(--pv-border)',
        fontSize: 13,
        fontWeight: 600,
        color: 'var(--pv-text-body)',
        cursor: 'pointer'
      }
    }, /*#__PURE__*/React.createElement("i", {
      "data-lucide": "file-down",
      style: {
        width: 15,
        height: 15
      }
    }), " Export report")), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: 14
      }
    }, /*#__PURE__*/React.createElement(StatCard, {
      label: "Total feedback",
      value: "2,608",
      delta: 14,
      icon: "messages-square",
      tone: "primary"
    }), /*#__PURE__*/React.createElement(StatCard, {
      label: "Resolution rate",
      value: "89.4",
      unit: "%",
      delta: 3,
      icon: "check-circle-2",
      tone: "success"
    }), /*#__PURE__*/React.createElement(StatCard, {
      label: "Avg. satisfaction",
      value: "4.3",
      unit: "/5",
      delta: 2,
      icon: "star",
      tone: "accent"
    }), /*#__PURE__*/React.createElement(StatCard, {
      label: "Repeat complaints",
      value: "112",
      delta: -6,
      invertDelta: true,
      icon: "repeat",
      tone: "warning"
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        gridTemplateColumns: '1.6fr 1fr',
        gap: 16
      }
    }, /*#__PURE__*/React.createElement(Panel, {
      title: "Feedback volume trend",
      action: ddl
    }, /*#__PURE__*/React.createElement(TrendChart, {
      data: D.trend,
      labels: D.trendLabels,
      color: "var(--pv-primary-600)",
      height: 200
    })), /*#__PURE__*/React.createElement(Panel, {
      title: "By channel"
    }, /*#__PURE__*/React.createElement(Donut, {
      data: D.channelDist
    }))), /*#__PURE__*/React.createElement(Panel, {
      title: "Annual channel evaluation",
      action: /*#__PURE__*/React.createElement("span", {
        style: {
          fontSize: 12,
          color: 'var(--pv-text-muted)'
        }
      }, "Supports quality accreditation"),
      pad: 0
    }, /*#__PURE__*/React.createElement("table", {
      style: {
        width: '100%',
        borderCollapse: 'collapse'
      }
    }, /*#__PURE__*/React.createElement("thead", {
      style: {
        background: 'var(--pv-neutral-50)'
      }
    }, /*#__PURE__*/React.createElement("tr", null, ['Channel', 'Volume', 'SLA %', 'Resolution %', 'YoY', 'Assessment'].map((h, i) => /*#__PURE__*/React.createElement("th", {
      key: h,
      style: {
        textAlign: i > 0 && i < 5 ? 'right' : 'left',
        fontSize: 11,
        fontWeight: 700,
        letterSpacing: '0.04em',
        textTransform: 'uppercase',
        color: 'var(--pv-text-subtle)',
        padding: '11px 16px'
      }
    }, h)))), /*#__PURE__*/React.createElement("tbody", null, channels.map(c => {
      const grade = c.sla >= 90 ? ['Strong', 'var(--pv-success-700)', 'var(--pv-success-50)'] : c.sla >= 84 ? ['Adequate', 'var(--pv-warning-700)', 'var(--pv-warning-50)'] : ['Needs work', 'var(--pv-critical-700)', 'var(--pv-critical-50)'];
      const [ti, tc] = trendIcon[c.trend];
      return /*#__PURE__*/React.createElement("tr", {
        key: c.ch
      }, /*#__PURE__*/React.createElement("td", {
        style: {
          padding: '12px 16px',
          borderTop: '1px solid var(--pv-border)',
          fontSize: 13.5,
          fontWeight: 600,
          color: 'var(--pv-text-strong)'
        }
      }, c.ch), /*#__PURE__*/React.createElement("td", {
        style: {
          padding: '12px 16px',
          borderTop: '1px solid var(--pv-border)',
          textAlign: 'right',
          fontFamily: 'var(--pv-font-mono)',
          fontSize: 13,
          color: 'var(--pv-text-body)'
        }
      }, c.vol), /*#__PURE__*/React.createElement("td", {
        style: {
          padding: '12px 16px',
          borderTop: '1px solid var(--pv-border)',
          textAlign: 'right',
          fontFamily: 'var(--pv-font-mono)',
          fontSize: 13,
          color: 'var(--pv-text-body)'
        }
      }, c.sla, "%"), /*#__PURE__*/React.createElement("td", {
        style: {
          padding: '12px 16px',
          borderTop: '1px solid var(--pv-border)',
          textAlign: 'right',
          fontFamily: 'var(--pv-font-mono)',
          fontSize: 13,
          color: 'var(--pv-text-body)'
        }
      }, c.res, "%"), /*#__PURE__*/React.createElement("td", {
        style: {
          padding: '12px 16px',
          borderTop: '1px solid var(--pv-border)',
          textAlign: 'right'
        }
      }, /*#__PURE__*/React.createElement("i", {
        "data-lucide": ti,
        style: {
          width: 16,
          height: 16,
          color: tc
        }
      })), /*#__PURE__*/React.createElement("td", {
        style: {
          padding: '12px 16px',
          borderTop: '1px solid var(--pv-border)'
        }
      }, /*#__PURE__*/React.createElement("span", {
        style: {
          fontSize: 12,
          fontWeight: 600,
          padding: '3px 9px',
          borderRadius: 999,
          color: grade[1],
          background: grade[2]
        }
      }, grade[0])));
    })))), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 16
      }
    }, /*#__PURE__*/React.createElement(Panel, {
      title: "Department praise ranking"
    }, /*#__PURE__*/React.createElement(RankList, {
      data: D.topPraised,
      color: "var(--pv-success-500)"
    })), /*#__PURE__*/React.createElement(Panel, {
      title: "Complaint hotspots"
    }, /*#__PURE__*/React.createElement(RankList, {
      data: D.topComplaints,
      color: "var(--pv-warning-500)"
    }))));
  }
  window.PVAnalytics = Analytics;
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/patientvoice/Analytics.jsx", error: String((e && e.message) || e) }); }

// ui_kits/patientvoice/AppShell.jsx
try { (() => {
// PatientVoice app shell — dark sidebar + top bar. Exposes window.PVShell.
(function () {
  const NAV = [{
    id: 'dashboard',
    label: 'Dashboard',
    icon: 'layout-dashboard'
  }, {
    group: 'Feedback Management'
  }, {
    id: 'feedback',
    label: 'All Feedback',
    icon: 'ticket',
    count: 318
  }, {
    id: 'overdue',
    label: 'Overdue',
    icon: 'alarm-clock-off',
    count: 7,
    badge: 'critical'
  }, {
    group: 'Operations'
  }, {
    id: 'sla',
    label: 'SLA Monitoring',
    icon: 'gauge'
  }, {
    id: 'intake',
    label: 'Multi-Channel Intake',
    icon: 'inbox'
  }, {
    id: 'hotline',
    label: 'Hotline Management',
    icon: 'headset'
  }, {
    group: 'Insight'
  }, {
    id: 'analytics',
    label: 'Analytics & Reports',
    icon: 'bar-chart-3'
  }, {
    id: 'admin',
    label: 'Administration',
    icon: 'settings'
  }];
  function Logo() {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        padding: '0 18px',
        height: 'var(--pv-topbar-h)',
        flex: 'none'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 32,
        height: 32,
        borderRadius: 9,
        background: 'linear-gradient(135deg, var(--pv-primary-500), var(--pv-secondary-500))',
        color: '#fff',
        flex: 'none'
      }
    }, /*#__PURE__*/React.createElement("i", {
      "data-lucide": "messages-square",
      style: {
        width: 18,
        height: 18
      }
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        lineHeight: 1.1
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontWeight: 700,
        fontSize: 15,
        color: '#fff',
        letterSpacing: '-0.01em'
      }
    }, "PatientVoice"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 10.5,
        color: '#7d93b2',
        fontWeight: 500
      }
    }, "Quality Management")));
  }
  function Sidebar({
    active,
    onNavigate
  }) {
    return /*#__PURE__*/React.createElement("aside", {
      className: "pv-scroll",
      style: {
        width: 'var(--pv-sidebar-w)',
        flex: 'none',
        background: 'var(--pv-surface-nav)',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        overflowY: 'auto',
        borderRight: '1px solid #1e2d45'
      }
    }, /*#__PURE__*/React.createElement(Logo, null), /*#__PURE__*/React.createElement("nav", {
      style: {
        padding: '8px 12px',
        display: 'flex',
        flexDirection: 'column',
        gap: 2
      }
    }, NAV.map((n, i) => {
      if (n.group) return /*#__PURE__*/React.createElement("div", {
        key: 'g' + i,
        style: {
          padding: '14px 10px 4px',
          fontSize: 10.5,
          fontWeight: 700,
          letterSpacing: '0.06em',
          textTransform: 'uppercase',
          color: '#5d6f8c'
        }
      }, n.group);
      const on = active === n.id;
      return /*#__PURE__*/React.createElement("button", {
        key: n.id,
        onClick: () => onNavigate(n.id),
        style: {
          display: 'flex',
          alignItems: 'center',
          gap: 11,
          padding: '9px 10px',
          borderRadius: 8,
          background: on ? 'rgba(20,184,166,0.14)' : 'transparent',
          cursor: 'pointer',
          width: '100%',
          color: on ? '#fff' : 'var(--pv-text-on-nav)',
          textAlign: 'left',
          boxShadow: on ? 'inset 2px 0 0 var(--pv-secondary-400)' : 'none',
          transition: 'background var(--pv-dur-fast) var(--pv-ease)'
        },
        onMouseEnter: e => {
          if (!on) e.currentTarget.style.background = 'var(--pv-surface-nav-2)';
        },
        onMouseLeave: e => {
          if (!on) e.currentTarget.style.background = 'transparent';
        }
      }, /*#__PURE__*/React.createElement("i", {
        "data-lucide": n.icon,
        style: {
          width: 17,
          height: 17,
          flex: 'none',
          color: on ? 'var(--pv-secondary-300)' : '#8499b5'
        }
      }), /*#__PURE__*/React.createElement("span", {
        style: {
          fontSize: 13.5,
          fontWeight: on ? 600 : 500,
          flex: 1
        }
      }, n.label), n.count != null ? /*#__PURE__*/React.createElement("span", {
        style: {
          fontFamily: 'var(--pv-font-mono)',
          fontSize: 11,
          fontWeight: 600,
          padding: '1px 7px',
          borderRadius: 999,
          background: n.badge === 'critical' ? 'var(--pv-critical-600)' : 'rgba(255,255,255,0.08)',
          color: n.badge === 'critical' ? '#fff' : '#9fb2cd'
        }
      }, n.count) : null);
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 'auto',
        padding: 14,
        borderTop: '1px solid #1e2d45',
        display: 'flex',
        alignItems: 'center',
        gap: 10
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        display: 'inline-flex',
        width: 32,
        height: 32,
        borderRadius: 999,
        background: 'linear-gradient(135deg,#0e7490,#14b8a6)',
        color: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 12,
        fontWeight: 700,
        flex: 'none'
      }
    }, "MT"), /*#__PURE__*/React.createElement("div", {
      style: {
        lineHeight: 1.2,
        flex: 1,
        minWidth: 0
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 12.5,
        fontWeight: 600,
        color: '#fff',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
      }
    }, "Mai Tran"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11,
        color: '#7d93b2'
      }
    }, "Quality Lead")), /*#__PURE__*/React.createElement("i", {
      "data-lucide": "chevrons-up-down",
      style: {
        width: 15,
        height: 15,
        color: '#7d93b2'
      }
    })));
  }
  function Topbar({
    title,
    subtitle,
    onNavigate
  }) {
    return /*#__PURE__*/React.createElement("header", {
      style: {
        height: 'var(--pv-topbar-h)',
        flex: 'none',
        background: '#fff',
        borderBottom: '1px solid var(--pv-border)',
        display: 'flex',
        alignItems: 'center',
        gap: 16,
        padding: '0 22px'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        minWidth: 0
      }
    }, /*#__PURE__*/React.createElement("h1", {
      style: {
        margin: 0,
        fontSize: 17,
        fontWeight: 700,
        color: 'var(--pv-text-strong)',
        letterSpacing: '-0.01em'
      }
    }, title), subtitle ? /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 12,
        color: 'var(--pv-text-muted)'
      }
    }, subtitle) : null), /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'relative',
        width: 280
      }
    }, /*#__PURE__*/React.createElement("i", {
      "data-lucide": "search",
      style: {
        position: 'absolute',
        left: 11,
        top: 9,
        width: 16,
        height: 16,
        color: 'var(--pv-text-subtle)'
      }
    }), /*#__PURE__*/React.createElement("input", {
      placeholder: "Search feedback, patients, IDs\u2026",
      style: {
        width: '100%',
        boxSizing: 'border-box',
        height: 34,
        padding: '0 12px 0 34px',
        fontSize: 13,
        fontFamily: 'var(--pv-font-sans)',
        color: 'var(--pv-text-strong)',
        background: 'var(--pv-neutral-50)',
        border: '1px solid var(--pv-border)',
        borderRadius: 8,
        outline: 'none'
      }
    })), /*#__PURE__*/React.createElement("button", {
      onClick: () => onNavigate && onNavigate('intake'),
      style: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: 7,
        height: 36,
        padding: '0 14px',
        borderRadius: 8,
        background: 'var(--pv-primary-600)',
        color: '#fff',
        fontWeight: 600,
        fontSize: 13.5,
        cursor: 'pointer',
        border: 'none',
        flex: 'none'
      }
    }, /*#__PURE__*/React.createElement("i", {
      "data-lucide": "plus",
      style: {
        width: 16,
        height: 16
      }
    }), " New feedback"), /*#__PURE__*/React.createElement("button", {
      style: {
        position: 'relative',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 36,
        height: 36,
        borderRadius: 8,
        background: 'var(--pv-neutral-50)',
        border: '1px solid var(--pv-border)',
        cursor: 'pointer',
        flex: 'none'
      }
    }, /*#__PURE__*/React.createElement("i", {
      "data-lucide": "bell",
      style: {
        width: 17,
        height: 17,
        color: 'var(--pv-text-muted)'
      }
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        position: 'absolute',
        top: 7,
        right: 8,
        width: 7,
        height: 7,
        borderRadius: 999,
        background: 'var(--pv-critical-500)',
        border: '1.5px solid #fff'
      }
    })));
  }
  function AppShell({
    active,
    onNavigate,
    title,
    subtitle,
    children
  }) {
    return /*#__PURE__*/React.createElement("div", {
      className: "pv-app",
      style: {
        display: 'flex',
        height: '100%',
        background: 'var(--pv-bg-app)'
      }
    }, /*#__PURE__*/React.createElement(Sidebar, {
      active: active,
      onNavigate: onNavigate
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        minWidth: 0,
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
      }
    }, /*#__PURE__*/React.createElement(Topbar, {
      title: title,
      subtitle: subtitle,
      onNavigate: onNavigate
    }), /*#__PURE__*/React.createElement("main", {
      className: "pv-scroll",
      style: {
        flex: 1,
        overflowY: 'auto',
        padding: 22
      }
    }, children)));
  }
  window.PVShell = {
    AppShell,
    Sidebar,
    Topbar,
    NAV
  };
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/patientvoice/AppShell.jsx", error: String((e && e.message) || e) }); }

// ui_kits/patientvoice/Dashboard.jsx
try { (() => {
// PatientVoice — Dashboard screen. window.PVDashboard
(function () {
  function Section({
    title,
    action,
    children,
    style
  }) {
    const {
      Card
    } = window.PatientVoiceDesignSystem_16c56a;
    return /*#__PURE__*/React.createElement(Card, {
      title: title,
      action: action,
      padding: 16,
      style: style
    }, children);
  }
  function NotifRow({
    n
  }) {
    const tones = {
      critical: ['var(--pv-critical-600)', 'var(--pv-critical-50)'],
      warning: ['var(--pv-warning-700)', 'var(--pv-warning-50)'],
      info: ['var(--pv-info-600)', 'var(--pv-info-50)'],
      primary: ['var(--pv-primary-700)', 'var(--pv-primary-50)'],
      accent: ['var(--pv-accent-600)', 'var(--pv-accent-50)']
    };
    const [fg, bg] = tones[n.tone] || tones.info;
    return /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        gap: 11,
        padding: '10px 4px',
        borderBottom: '1px solid var(--pv-neutral-100)'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 30,
        height: 30,
        borderRadius: 8,
        background: bg,
        color: fg,
        flex: 'none'
      }
    }, /*#__PURE__*/React.createElement("i", {
      "data-lucide": n.icon,
      style: {
        width: 15,
        height: 15
      }
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        minWidth: 0
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 12.5,
        color: 'var(--pv-text-body)',
        lineHeight: 1.35
      }
    }, n.text), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11,
        color: 'var(--pv-text-subtle)',
        marginTop: 2
      }
    }, n.time, " ago")));
  }
  function Dashboard() {
    const D = window.PV_DATA;
    const {
      StatCard
    } = window.PatientVoiceDesignSystem_16c56a;
    const {
      TrendChart,
      Donut,
      Gauge,
      RankList
    } = window.PVCharts;
    React.useEffect(() => {
      window.lucide && window.lucide.createIcons();
    });
    return /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
        maxWidth: 1440
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        gridTemplateColumns: 'repeat(5, 1fr)',
        gap: 14
      }
    }, /*#__PURE__*/React.createElement(StatCard, {
      label: "New today",
      value: D.kpis.newToday,
      delta: 12,
      deltaLabel: "vs yesterday",
      icon: "inbox",
      tone: "primary"
    }), /*#__PURE__*/React.createElement(StatCard, {
      label: "This week",
      value: D.kpis.week,
      delta: 6,
      deltaLabel: "vs last week",
      icon: "calendar-days",
      tone: "secondary"
    }), /*#__PURE__*/React.createElement(StatCard, {
      label: "SLA compliance",
      value: D.kpis.sla,
      unit: "%",
      delta: 1.8,
      deltaLabel: "vs last week",
      icon: "gauge",
      tone: "success"
    }), /*#__PURE__*/React.createElement(StatCard, {
      label: "Open tickets",
      value: D.kpis.open,
      delta: -4,
      invertDelta: true,
      deltaLabel: "vs last week",
      icon: "ticket",
      tone: "neutral"
    }), /*#__PURE__*/React.createElement(StatCard, {
      label: "Overdue",
      value: D.kpis.overdue,
      delta: 2,
      invertDelta: true,
      deltaLabel: "needs action",
      icon: "alarm-clock-off",
      tone: "critical"
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        gridTemplateColumns: '1.6fr 1fr',
        gap: 16
      }
    }, /*#__PURE__*/React.createElement(Section, {
      title: "Feedback trend",
      action: /*#__PURE__*/React.createElement("span", {
        style: {
          fontSize: 12,
          color: 'var(--pv-text-muted)'
        }
      }, "Last 12 months")
    }, /*#__PURE__*/React.createElement(TrendChart, {
      data: D.trend,
      labels: D.trendLabels
    })), /*#__PURE__*/React.createElement(Section, {
      title: "Channel distribution"
    }, /*#__PURE__*/React.createElement(Donut, {
      data: D.channelDist
    }))), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr',
        gap: 16
      }
    }, /*#__PURE__*/React.createElement(Section, {
      title: "Top complaint categories"
    }, /*#__PURE__*/React.createElement(RankList, {
      data: D.topComplaints,
      color: "var(--pv-warning-500)"
    })), /*#__PURE__*/React.createElement(Section, {
      title: "Top praised departments"
    }, /*#__PURE__*/React.createElement(RankList, {
      data: D.topPraised,
      color: "var(--pv-success-500)"
    })), /*#__PURE__*/React.createElement(Section, {
      title: "SLA performance"
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 10
      }
    }, /*#__PURE__*/React.createElement(Gauge, {
      value: 94
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        gap: 18
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        textAlign: 'center'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 18,
        fontWeight: 700,
        color: 'var(--pv-success-600)'
      }
    }, "289"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11,
        color: 'var(--pv-text-muted)'
      }
    }, "On track")), /*#__PURE__*/React.createElement("div", {
      style: {
        textAlign: 'center'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 18,
        fontWeight: 700,
        color: 'var(--pv-warning-600)'
      }
    }, "22"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11,
        color: 'var(--pv-text-muted)'
      }
    }, "At risk")), /*#__PURE__*/React.createElement("div", {
      style: {
        textAlign: 'center'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 18,
        fontWeight: 700,
        color: 'var(--pv-critical-600)'
      }
    }, "7"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11,
        color: 'var(--pv-text-muted)'
      }
    }, "Breached")))))), /*#__PURE__*/React.createElement(Section, {
      title: "Real-time notifications",
      action: /*#__PURE__*/React.createElement("a", {
        style: {
          fontSize: 12.5,
          color: 'var(--pv-text-link)',
          fontWeight: 600,
          textDecoration: 'none'
        }
      }, "View all")
    }, /*#__PURE__*/React.createElement("div", null, D.notifications.map((n, i) => /*#__PURE__*/React.createElement(NotifRow, {
      key: i,
      n: n
    })))));
  }
  window.PVDashboard = Dashboard;
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/patientvoice/Dashboard.jsx", error: String((e && e.message) || e) }); }

// ui_kits/patientvoice/FeedbackDetail.jsx
try { (() => {
// PatientVoice — Feedback Detail (3-column). window.PVDetail
(function () {
  function Field({
    label,
    children
  }) {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        flexDirection: 'column',
        gap: 4
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 11,
        fontWeight: 700,
        letterSpacing: '0.04em',
        textTransform: 'uppercase',
        color: 'var(--pv-text-subtle)'
      }
    }, label), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 13.5,
        color: 'var(--pv-text-strong)'
      }
    }, children));
  }
  function Panel({
    title,
    children,
    pad = 16
  }) {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        background: '#fff',
        border: '1px solid var(--pv-border)',
        borderRadius: 12,
        boxShadow: 'var(--pv-shadow-sm)'
      }
    }, title ? /*#__PURE__*/React.createElement("div", {
      style: {
        padding: '12px 16px',
        borderBottom: '1px solid var(--pv-border)',
        fontSize: 13.5,
        fontWeight: 700,
        color: 'var(--pv-text-strong)'
      }
    }, title) : null, /*#__PURE__*/React.createElement("div", {
      style: {
        padding: pad
      }
    }, children));
  }
  function Timeline() {
    const D = window.PV_DATA;
    const tones = {
      info: 'var(--pv-info-500)',
      primary: 'var(--pv-primary-500)',
      accent: 'var(--pv-accent-500)',
      neutral: 'var(--pv-neutral-400)',
      secondary: 'var(--pv-secondary-500)'
    };
    return /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        flexDirection: 'column'
      }
    }, D.timeline.map((e, i) => /*#__PURE__*/React.createElement("div", {
      key: i,
      style: {
        display: 'flex',
        gap: 12
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 30,
        height: 30,
        borderRadius: 999,
        background: '#fff',
        border: `2px solid ${tones[e.tone]}`,
        color: tones[e.tone],
        flex: 'none'
      }
    }, /*#__PURE__*/React.createElement("i", {
      "data-lucide": e.icon,
      style: {
        width: 14,
        height: 14
      }
    })), i < D.timeline.length - 1 ? /*#__PURE__*/React.createElement("span", {
      style: {
        width: 2,
        flex: 1,
        background: 'var(--pv-neutral-200)',
        minHeight: 14
      }
    }) : null), /*#__PURE__*/React.createElement("div", {
      style: {
        paddingBottom: 18,
        flex: 1
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        justifyContent: 'space-between',
        gap: 8
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 13.5,
        fontWeight: 600,
        color: 'var(--pv-text-strong)'
      }
    }, e.title), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 11.5,
        color: 'var(--pv-text-subtle)',
        whiteSpace: 'nowrap'
      }
    }, e.time)), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 12,
        color: 'var(--pv-text-muted)',
        marginTop: 1
      }
    }, e.who), e.body ? /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 13,
        color: 'var(--pv-text-body)',
        marginTop: 6,
        background: 'var(--pv-neutral-50)',
        border: '1px solid var(--pv-border)',
        borderRadius: 8,
        padding: '9px 11px'
      }
    }, e.body) : null))));
  }
  function Detail({
    ticketId,
    onBack
  }) {
    const D = window.PV_DATA;
    const t = D.tickets.find(x => x.id === ticketId) || D.tickets[0];
    const DS = window.PatientVoiceDesignSystem_16c56a;
    const {
      StatusBadge,
      PriorityBadge,
      ChannelBadge,
      SLABadge,
      Avatar,
      Button
    } = DS;
    const agent = D.agents.find(a => a.id === t.assignee);
    React.useEffect(() => {
      window.lucide && window.lucide.createIcons();
    });
    const actBtn = {
      display: 'flex',
      alignItems: 'center',
      gap: 9,
      width: '100%',
      padding: '9px 11px',
      borderRadius: 8,
      border: '1px solid var(--pv-border)',
      background: '#fff',
      cursor: 'pointer',
      fontSize: 13,
      fontWeight: 600,
      color: 'var(--pv-text-body)',
      textAlign: 'left'
    };
    return /*#__PURE__*/React.createElement("div", {
      style: {
        maxWidth: 1440
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        marginBottom: 14,
        flexWrap: 'wrap'
      }
    }, /*#__PURE__*/React.createElement("button", {
      onClick: onBack,
      style: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        fontSize: 13,
        fontWeight: 600,
        color: 'var(--pv-text-muted)',
        background: 'none',
        cursor: 'pointer',
        padding: '4px 0'
      }
    }, /*#__PURE__*/React.createElement("i", {
      "data-lucide": "arrow-left",
      style: {
        width: 16,
        height: 16
      }
    }), " All feedback"), /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: 'var(--pv-font-mono)',
        fontSize: 13,
        fontWeight: 600,
        color: 'var(--pv-text-subtle)'
      }
    }, "/ ", t.id), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1
      }
    }), /*#__PURE__*/React.createElement(SLABadge, {
      consumedPct: t.slaPct,
      remaining: t.slaRemaining,
      breached: t.breached,
      variant: "pill"
    })), /*#__PURE__*/React.createElement("div", {
      className: "pv-detail-grid"
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        flexDirection: 'column',
        gap: 14
      }
    }, /*#__PURE__*/React.createElement(Panel, {
      title: "Patient"
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 11,
        marginBottom: 14
      }
    }, /*#__PURE__*/React.createElement(Avatar, {
      name: t.patient === 'Anonymous' ? '? ?' : t.patient,
      size: 40
    }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        fontWeight: 600,
        color: 'var(--pv-text-strong)',
        fontSize: 14
      }
    }, t.patient), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 12,
        color: 'var(--pv-text-muted)'
      }
    }, "Outpatient \xB7 MRN 88421"))), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        flexDirection: 'column',
        gap: 12
      }
    }, /*#__PURE__*/React.createElement(Field, {
      label: "Contact"
    }, "+84 90 \u2022\u2022 \u2022\u2022231"), /*#__PURE__*/React.createElement(Field, {
      label: "Visit date"
    }, "12 Jun 2026"))), /*#__PURE__*/React.createElement(Panel, {
      title: "Ticket"
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        flexDirection: 'column',
        gap: 12
      }
    }, /*#__PURE__*/React.createElement(Field, {
      label: "Category"
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        textTransform: 'capitalize'
      }
    }, t.type)), /*#__PURE__*/React.createElement(Field, {
      label: "Channel"
    }, /*#__PURE__*/React.createElement(ChannelBadge, {
      channel: t.channel
    })), /*#__PURE__*/React.createElement(Field, {
      label: "Priority"
    }, /*#__PURE__*/React.createElement(PriorityBadge, {
      priority: t.priority
    })), /*#__PURE__*/React.createElement(Field, {
      label: "Department"
    }, t.dept), /*#__PURE__*/React.createElement(Field, {
      label: "Created"
    }, t.created)))), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        flexDirection: 'column',
        gap: 14,
        minWidth: 0
      }
    }, /*#__PURE__*/React.createElement(Panel, null, /*#__PURE__*/React.createElement("h2", {
      style: {
        margin: '0 0 10px',
        fontSize: 18,
        fontWeight: 700,
        color: 'var(--pv-text-strong)'
      }
    }, t.subject), /*#__PURE__*/React.createElement("p", {
      style: {
        margin: 0,
        fontSize: 14,
        lineHeight: 1.6,
        color: 'var(--pv-text-body)'
      }
    }, "The patient reported waiting more than 45 minutes at the ", t.dept, " front desk during the morning peak, with no clear queue information. They felt staff were not communicating expected wait times. Requesting review of front-desk staffing and a visible queue display."), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        gap: 10,
        marginTop: 16
      }
    }, ['intake-form.pdf', 'call-recording.mp3'].map(f => /*#__PURE__*/React.createElement("span", {
      key: f,
      style: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: 8,
        padding: '8px 12px',
        border: '1px solid var(--pv-border)',
        borderRadius: 8,
        fontSize: 12.5,
        color: 'var(--pv-text-body)',
        background: 'var(--pv-neutral-50)'
      }
    }, /*#__PURE__*/React.createElement("i", {
      "data-lucide": f.endsWith('pdf') ? 'file-text' : 'file-audio',
      style: {
        width: 15,
        height: 15,
        color: 'var(--pv-text-muted)'
      }
    }), f)))), /*#__PURE__*/React.createElement(Panel, {
      title: "Activity & internal notes"
    }, /*#__PURE__*/React.createElement(Timeline, null), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        gap: 10,
        marginTop: 6,
        alignItems: 'flex-start'
      }
    }, /*#__PURE__*/React.createElement(Avatar, {
      name: "Mai Tran",
      size: 30
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1
      }
    }, /*#__PURE__*/React.createElement("textarea", {
      placeholder: "Add an internal note\u2026",
      rows: 2,
      style: {
        width: '100%',
        boxSizing: 'border-box',
        resize: 'vertical',
        padding: 10,
        fontFamily: 'var(--pv-font-sans)',
        fontSize: 13,
        color: 'var(--pv-text-strong)',
        border: '1px solid var(--pv-border-strong)',
        borderRadius: 8,
        outline: 'none'
      }
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        justifyContent: 'flex-end',
        marginTop: 8
      }
    }, /*#__PURE__*/React.createElement(Button, {
      size: "sm",
      variant: "primary",
      iconLeft: /*#__PURE__*/React.createElement("i", {
        "data-lucide": "send"
      })
    }, "Post note")))))), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        flexDirection: 'column',
        gap: 14
      }
    }, /*#__PURE__*/React.createElement(Panel, {
      title: "Status"
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        flexDirection: 'column',
        gap: 14
      }
    }, /*#__PURE__*/React.createElement(Field, {
      label: "Current status"
    }, /*#__PURE__*/React.createElement(StatusBadge, {
      status: t.status
    })), /*#__PURE__*/React.createElement(Field, {
      label: "Assignee"
    }, agent ? /*#__PURE__*/React.createElement("span", {
      style: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: 8
      }
    }, /*#__PURE__*/React.createElement(Avatar, {
      name: agent.name,
      size: 26
    }), /*#__PURE__*/React.createElement("span", null, agent.name)) : 'Unassigned'), /*#__PURE__*/React.createElement(Field, {
      label: "Related department"
    }, t.dept), /*#__PURE__*/React.createElement(Field, {
      label: "SLA"
    }, /*#__PURE__*/React.createElement(SLABadge, {
      variant: "bar",
      consumedPct: t.slaPct,
      remaining: t.slaRemaining,
      breached: t.breached
    })))), /*#__PURE__*/React.createElement(Panel, {
      title: "Quick actions"
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        flexDirection: 'column',
        gap: 9
      }
    }, /*#__PURE__*/React.createElement("button", {
      style: actBtn
    }, /*#__PURE__*/React.createElement("i", {
      "data-lucide": "user-plus",
      style: {
        width: 16,
        height: 16,
        color: 'var(--pv-primary-600)'
      }
    }), "Reassign"), /*#__PURE__*/React.createElement("button", {
      style: actBtn
    }, /*#__PURE__*/React.createElement("i", {
      "data-lucide": "check-circle-2",
      style: {
        width: 16,
        height: 16,
        color: 'var(--pv-success-600)'
      }
    }), "Resolve ticket"), /*#__PURE__*/React.createElement("button", {
      style: actBtn
    }, /*#__PURE__*/React.createElement("i", {
      "data-lucide": "git-branch",
      style: {
        width: 16,
        height: 16,
        color: 'var(--pv-accent-600)'
      }
    }), "Root cause analysis"), /*#__PURE__*/React.createElement("button", {
      style: {
        ...actBtn,
        borderColor: 'var(--pv-critical-200)',
        color: 'var(--pv-critical-700)',
        background: 'var(--pv-critical-50)'
      }
    }, /*#__PURE__*/React.createElement("i", {
      "data-lucide": "arrow-up-circle",
      style: {
        width: 16,
        height: 16
      }
    }), "Escalate to manager"))))));
  }
  window.PVDetail = Detail;
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/patientvoice/FeedbackDetail.jsx", error: String((e && e.message) || e) }); }

// ui_kits/patientvoice/FeedbackList.jsx
try { (() => {
// PatientVoice — Feedback Management (Table + Kanban). window.PVFeedback
(function () {
  const TYPE_ICON = {
    complaint: 'frown',
    inquiry: 'help-circle',
    compliment: 'heart',
    suggestion: 'lightbulb',
    incident: 'shield-alert'
  };
  function agentName(id) {
    const a = window.PV_DATA.agents.find(x => x.id === id);
    return a ? a.name : null;
  }
  function Toolbar({
    view,
    setView,
    count
  }) {
    const {
      Tabs,
      Button
    } = window.PatientVoiceDesignSystem_16c56a;
    return /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        marginBottom: 14,
        flexWrap: 'wrap'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        minWidth: 240
      }
    }, /*#__PURE__*/React.createElement(Tabs, {
      value: view,
      onChange: setView,
      tabs: [{
        label: 'Table',
        value: 'table',
        count
      }, {
        label: 'Kanban',
        value: 'kanban'
      }, {
        label: 'Timeline',
        value: 'timeline'
      }]
    })), /*#__PURE__*/React.createElement(Button, {
      variant: "outline",
      size: "sm",
      iconLeft: /*#__PURE__*/React.createElement("i", {
        "data-lucide": "filter"
      })
    }, "Filters"), /*#__PURE__*/React.createElement(Button, {
      variant: "outline",
      size: "sm",
      iconLeft: /*#__PURE__*/React.createElement("i", {
        "data-lucide": "arrow-up-down"
      })
    }, "Sort"), /*#__PURE__*/React.createElement(Button, {
      variant: "outline",
      size: "sm",
      iconLeft: /*#__PURE__*/React.createElement("i", {
        "data-lucide": "download"
      })
    }, "Export"));
  }
  function FilterChips() {
    const chips = ['All channels', 'Urgent', 'Open', 'My team'];
    return /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        gap: 8,
        marginBottom: 12,
        flexWrap: 'wrap'
      }
    }, chips.map((c, i) => /*#__PURE__*/React.createElement("span", {
      key: c,
      style: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        padding: '5px 11px',
        borderRadius: 999,
        fontSize: 12.5,
        fontWeight: 600,
        background: i === 0 ? 'var(--pv-primary-50)' : '#fff',
        color: i === 0 ? 'var(--pv-primary-700)' : 'var(--pv-text-muted)',
        border: `1px solid ${i === 0 ? 'var(--pv-primary-200)' : 'var(--pv-border)'}`,
        cursor: 'pointer'
      }
    }, c, i === 0 ? null : /*#__PURE__*/React.createElement("i", {
      "data-lucide": "plus",
      style: {
        width: 13,
        height: 13
      }
    }))));
  }
  function TableView({
    onOpen
  }) {
    const D = window.PV_DATA;
    const {
      StatusBadge,
      PriorityBadge,
      ChannelBadge,
      SLABadge,
      Avatar
    } = window.PatientVoiceDesignSystem_16c56a;
    const th = {
      textAlign: 'left',
      fontSize: 11,
      fontWeight: 700,
      letterSpacing: '0.04em',
      textTransform: 'uppercase',
      color: 'var(--pv-text-subtle)',
      padding: '10px 14px',
      whiteSpace: 'nowrap'
    };
    const td = {
      padding: '12px 14px',
      borderTop: '1px solid var(--pv-border)',
      verticalAlign: 'middle'
    };
    return /*#__PURE__*/React.createElement("div", {
      style: {
        background: '#fff',
        border: '1px solid var(--pv-border)',
        borderRadius: 12,
        overflow: 'hidden',
        boxShadow: 'var(--pv-shadow-sm)'
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "pv-scroll",
      style: {
        overflowX: 'auto'
      }
    }, /*#__PURE__*/React.createElement("table", {
      style: {
        width: '100%',
        borderCollapse: 'collapse',
        minWidth: 920
      }
    }, /*#__PURE__*/React.createElement("thead", {
      style: {
        background: 'var(--pv-neutral-50)'
      }
    }, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", {
      style: {
        ...th,
        width: 36
      }
    }, /*#__PURE__*/React.createElement("input", {
      type: "checkbox"
    })), /*#__PURE__*/React.createElement("th", {
      style: {
        ...th,
        width: 96
      }
    }, "ID"), /*#__PURE__*/React.createElement("th", {
      style: th
    }, "Subject"), /*#__PURE__*/React.createElement("th", {
      style: th
    }, "Type"), /*#__PURE__*/React.createElement("th", {
      style: th
    }, "Priority"), /*#__PURE__*/React.createElement("th", {
      style: th
    }, "Status"), /*#__PURE__*/React.createElement("th", {
      style: th
    }, "Channel"), /*#__PURE__*/React.createElement("th", {
      style: th
    }, "Assignee"), /*#__PURE__*/React.createElement("th", {
      style: th
    }, "SLA"))), /*#__PURE__*/React.createElement("tbody", null, D.tickets.map(t => /*#__PURE__*/React.createElement("tr", {
      key: t.id,
      onClick: () => onOpen(t.id),
      style: {
        cursor: 'pointer',
        transition: 'background 120ms'
      },
      onMouseEnter: e => e.currentTarget.style.background = 'var(--pv-neutral-25)',
      onMouseLeave: e => e.currentTarget.style.background = 'transparent'
    }, /*#__PURE__*/React.createElement("td", {
      style: td,
      onClick: e => e.stopPropagation()
    }, /*#__PURE__*/React.createElement("input", {
      type: "checkbox"
    })), /*#__PURE__*/React.createElement("td", {
      style: {
        ...td,
        fontFamily: 'var(--pv-font-mono)',
        fontSize: 12.5,
        fontWeight: 600,
        color: 'var(--pv-text-link)'
      }
    }, t.id), /*#__PURE__*/React.createElement("td", {
      style: {
        ...td,
        maxWidth: 280
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 13.5,
        fontWeight: 600,
        color: 'var(--pv-text-strong)',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
      }
    }, t.subject), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11.5,
        color: 'var(--pv-text-muted)',
        marginTop: 2
      }
    }, t.patient, " \xB7 ", t.dept)), /*#__PURE__*/React.createElement("td", {
      style: td
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        fontSize: 12.5,
        color: 'var(--pv-text-body)',
        textTransform: 'capitalize'
      }
    }, /*#__PURE__*/React.createElement("i", {
      "data-lucide": TYPE_ICON[t.type],
      style: {
        width: 14,
        height: 14,
        color: 'var(--pv-text-muted)'
      }
    }), t.type)), /*#__PURE__*/React.createElement("td", {
      style: td
    }, /*#__PURE__*/React.createElement(PriorityBadge, {
      priority: t.priority
    })), /*#__PURE__*/React.createElement("td", {
      style: td
    }, /*#__PURE__*/React.createElement(StatusBadge, {
      status: t.status,
      size: "sm"
    })), /*#__PURE__*/React.createElement("td", {
      style: td
    }, /*#__PURE__*/React.createElement(ChannelBadge, {
      channel: t.channel
    })), /*#__PURE__*/React.createElement("td", {
      style: td
    }, t.assignee ? /*#__PURE__*/React.createElement("span", {
      style: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: 7
      }
    }, /*#__PURE__*/React.createElement(Avatar, {
      name: agentName(t.assignee),
      size: 24
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 12.5,
        color: 'var(--pv-text-body)'
      }
    }, agentName(t.assignee))) : /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 12.5,
        color: 'var(--pv-text-subtle)'
      }
    }, "Unassigned")), /*#__PURE__*/React.createElement("td", {
      style: td
    }, /*#__PURE__*/React.createElement(SLABadge, {
      consumedPct: t.slaPct,
      remaining: t.slaRemaining,
      breached: t.breached
    }))))))));
  }
  function KanbanView({
    onOpen
  }) {
    const D = window.PV_DATA;
    const {
      StatusBadge,
      PriorityBadge,
      ChannelBadge,
      SLABadge,
      Avatar
    } = window.PatientVoiceDesignSystem_16c56a;
    const cols = [{
      id: 'new',
      label: 'New'
    }, {
      id: 'assigned',
      label: 'Assigned'
    }, {
      id: 'in_progress',
      label: 'In Progress'
    }, {
      id: 'pending_confirmation',
      label: 'Pending'
    }, {
      id: 'resolved',
      label: 'Resolved'
    }];
    return /*#__PURE__*/React.createElement("div", {
      className: "pv-scroll",
      style: {
        display: 'flex',
        gap: 14,
        overflowX: 'auto',
        paddingBottom: 6
      }
    }, cols.map(c => {
      const items = D.tickets.filter(t => t.status === c.id);
      return /*#__PURE__*/React.createElement("div", {
        key: c.id,
        style: {
          flex: 'none',
          width: 280,
          background: 'var(--pv-neutral-100)',
          borderRadius: 12,
          padding: 10,
          display: 'flex',
          flexDirection: 'column',
          gap: 9
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '4px 6px'
        }
      }, /*#__PURE__*/React.createElement("span", {
        style: {
          display: 'inline-flex',
          alignItems: 'center',
          gap: 8
        }
      }, /*#__PURE__*/React.createElement(StatusBadge, {
        status: c.id,
        size: "sm"
      })), /*#__PURE__*/React.createElement("span", {
        style: {
          fontFamily: 'var(--pv-font-mono)',
          fontSize: 12,
          fontWeight: 600,
          color: 'var(--pv-text-muted)'
        }
      }, items.length)), items.map(t => /*#__PURE__*/React.createElement("div", {
        key: t.id,
        onClick: () => onOpen(t.id),
        style: {
          background: '#fff',
          border: '1px solid var(--pv-border)',
          borderRadius: 10,
          padding: 12,
          cursor: 'pointer',
          boxShadow: 'var(--pv-shadow-xs)',
          display: 'flex',
          flexDirection: 'column',
          gap: 9
        },
        onMouseEnter: e => e.currentTarget.style.boxShadow = 'var(--pv-shadow-md)',
        onMouseLeave: e => e.currentTarget.style.boxShadow = 'var(--pv-shadow-xs)'
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }
      }, /*#__PURE__*/React.createElement("span", {
        style: {
          fontFamily: 'var(--pv-font-mono)',
          fontSize: 11.5,
          fontWeight: 600,
          color: 'var(--pv-text-link)'
        }
      }, t.id), /*#__PURE__*/React.createElement(PriorityBadge, {
        priority: t.priority
      })), /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 13,
          fontWeight: 600,
          color: 'var(--pv-text-strong)',
          lineHeight: 1.35
        }
      }, t.subject), /*#__PURE__*/React.createElement("div", {
        style: {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 8
        }
      }, /*#__PURE__*/React.createElement(ChannelBadge, {
        channel: t.channel,
        showLabel: false
      }), /*#__PURE__*/React.createElement(SLABadge, {
        consumedPct: t.slaPct,
        remaining: t.slaRemaining,
        breached: t.breached
      })), /*#__PURE__*/React.createElement("div", {
        style: {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingTop: 8,
          borderTop: '1px solid var(--pv-neutral-100)'
        }
      }, /*#__PURE__*/React.createElement("span", {
        style: {
          fontSize: 11.5,
          color: 'var(--pv-text-muted)'
        }
      }, t.dept), t.assignee ? /*#__PURE__*/React.createElement(Avatar, {
        name: agentName(t.assignee),
        size: 22
      }) : /*#__PURE__*/React.createElement("span", {
        style: {
          fontSize: 11,
          color: 'var(--pv-text-subtle)'
        }
      }, "\u2014")))));
    }));
  }
  function Feedback({
    onOpen
  }) {
    const [view, setView] = React.useState('table');
    React.useEffect(() => {
      window.lucide && window.lucide.createIcons();
    });
    return /*#__PURE__*/React.createElement("div", {
      style: {
        maxWidth: 1440
      }
    }, /*#__PURE__*/React.createElement(Toolbar, {
      view: view,
      setView: setView,
      count: window.PV_DATA.tickets.length
    }), /*#__PURE__*/React.createElement(FilterChips, null), view === 'kanban' ? /*#__PURE__*/React.createElement(KanbanView, {
      onOpen: onOpen
    }) : /*#__PURE__*/React.createElement(TableView, {
      onOpen: onOpen
    }), view === 'timeline' ? null : null);
  }
  window.PVFeedback = Feedback;
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/patientvoice/FeedbackList.jsx", error: String((e && e.message) || e) }); }

// ui_kits/patientvoice/Intake.jsx
try { (() => {
// PatientVoice — Multi-Channel Intake quick entry. window.PVIntake
(function () {
  function Intake({
    onBack
  }) {
    const DS = window.PatientVoiceDesignSystem_16c56a;
    const {
      Input,
      Button
    } = DS;
    React.useEffect(() => {
      window.lucide && window.lucide.createIcons();
    });
    const channels = [{
      id: 'front_desk',
      label: 'Front Desk',
      icon: 'concierge-bell'
    }, {
      id: 'hotline',
      label: 'Hotline',
      icon: 'phone'
    }, {
      id: 'suggestion_box',
      label: 'Suggestion Box',
      icon: 'inbox'
    }, {
      id: 'online_form',
      label: 'Online Form',
      icon: 'clipboard-list'
    }, {
      id: 'email',
      label: 'Email',
      icon: 'mail'
    }, {
      id: 'social_media',
      label: 'Social Media',
      icon: 'message-circle'
    }];
    const types = ['Complaint', 'Inquiry', 'Compliment', 'Suggestion', 'Incident'];
    const [ch, setCh] = React.useState('hotline');
    const [ty, setTy] = React.useState('Complaint');
    const [pri, setPri] = React.useState('high');
    const label = {
      fontSize: 12.5,
      fontWeight: 600,
      color: 'var(--pv-text-body)',
      marginBottom: 6,
      display: 'block'
    };
    const fieldBox = {
      background: '#fff',
      border: '1px solid var(--pv-border-strong)',
      borderRadius: 8,
      padding: '0 12px',
      height: 38,
      display: 'flex',
      alignItems: 'center',
      fontSize: 14,
      color: 'var(--pv-text-strong)',
      width: '100%',
      boxSizing: 'border-box'
    };
    function Panel({
      title,
      children
    }) {
      return /*#__PURE__*/React.createElement("div", {
        style: {
          background: '#fff',
          border: '1px solid var(--pv-border)',
          borderRadius: 12,
          boxShadow: 'var(--pv-shadow-sm)'
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          padding: '12px 16px',
          borderBottom: '1px solid var(--pv-border)',
          fontSize: 13.5,
          fontWeight: 700,
          color: 'var(--pv-text-strong)'
        }
      }, title), /*#__PURE__*/React.createElement("div", {
        style: {
          padding: 18
        }
      }, children));
    }
    return /*#__PURE__*/React.createElement("div", {
      style: {
        maxWidth: 920,
        margin: '0 auto'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        marginBottom: 16
      }
    }, /*#__PURE__*/React.createElement("button", {
      onClick: onBack,
      style: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        fontSize: 13,
        fontWeight: 600,
        color: 'var(--pv-text-muted)',
        background: 'none',
        cursor: 'pointer'
      }
    }, /*#__PURE__*/React.createElement("i", {
      "data-lucide": "arrow-left",
      style: {
        width: 16,
        height: 16
      }
    }), " Back"), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1
      }
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        fontSize: 12.5,
        color: 'var(--pv-success-700)',
        background: 'var(--pv-success-50)',
        padding: '5px 11px',
        borderRadius: 999,
        fontWeight: 600
      }
    }, /*#__PURE__*/React.createElement("i", {
      "data-lucide": "timer",
      style: {
        width: 14,
        height: 14
      }
    }), " Quick entry \xB7 under 2 minutes")), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        flexDirection: 'column',
        gap: 14
      }
    }, /*#__PURE__*/React.createElement(Panel, {
      title: "Channel"
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: 10
      }
    }, channels.map(c => {
      const on = ch === c.id;
      return /*#__PURE__*/React.createElement("button", {
        key: c.id,
        onClick: () => setCh(c.id),
        style: {
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          padding: '11px 13px',
          borderRadius: 10,
          cursor: 'pointer',
          border: `1.5px solid ${on ? 'var(--pv-primary-500)' : 'var(--pv-border)'}`,
          background: on ? 'var(--pv-primary-50)' : '#fff'
        }
      }, /*#__PURE__*/React.createElement("i", {
        "data-lucide": c.icon,
        style: {
          width: 18,
          height: 18,
          color: on ? 'var(--pv-primary-600)' : 'var(--pv-text-muted)'
        }
      }), /*#__PURE__*/React.createElement("span", {
        style: {
          fontSize: 13.5,
          fontWeight: 600,
          color: on ? 'var(--pv-primary-700)' : 'var(--pv-text-body)'
        }
      }, c.label));
    }))), /*#__PURE__*/React.createElement(Panel, {
      title: "Classification"
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 16
      }
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
      style: label
    }, "Feedback type"), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        gap: 7,
        flexWrap: 'wrap'
      }
    }, types.map(t => /*#__PURE__*/React.createElement("button", {
      key: t,
      onClick: () => setTy(t),
      style: {
        padding: '7px 12px',
        borderRadius: 999,
        fontSize: 13,
        fontWeight: 600,
        cursor: 'pointer',
        border: `1px solid ${ty === t ? 'var(--pv-primary-500)' : 'var(--pv-border)'}`,
        background: ty === t ? 'var(--pv-primary-50)' : '#fff',
        color: ty === t ? 'var(--pv-primary-700)' : 'var(--pv-text-muted)'
      }
    }, t)))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
      style: label
    }, "Priority"), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        gap: 7
      }
    }, [['urgent', 'Urgent', 'var(--pv-critical-500)'], ['high', 'High', 'var(--pv-warning-500)'], ['normal', 'Normal', 'var(--pv-neutral-400)']].map(([id, l, c]) => /*#__PURE__*/React.createElement("button", {
      key: id,
      onClick: () => setPri(id),
      style: {
        flex: 1,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 7,
        padding: '8px 10px',
        borderRadius: 8,
        fontSize: 13,
        fontWeight: 600,
        cursor: 'pointer',
        border: `1px solid ${pri === id ? c : 'var(--pv-border)'}`,
        background: pri === id ? 'color-mix(in srgb,' + c + ' 10%, #fff)' : '#fff',
        color: pri === id ? 'var(--pv-text-strong)' : 'var(--pv-text-muted)'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 8,
        height: 8,
        borderRadius: 999,
        background: c
      }
    }), l)))))), /*#__PURE__*/React.createElement(Panel, {
      title: "Details"
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 16,
        marginBottom: 16
      }
    }, /*#__PURE__*/React.createElement(Input, {
      label: "Patient name",
      placeholder: "Full name"
    }), /*#__PURE__*/React.createElement(Input, {
      label: "Contact",
      placeholder: "Phone or email"
    }), /*#__PURE__*/React.createElement(Input, {
      label: "Related department",
      placeholder: "e.g. Radiology"
    }), /*#__PURE__*/React.createElement(Input, {
      label: "Related employee",
      placeholder: "Optional"
    })), /*#__PURE__*/React.createElement("span", {
      style: label
    }, "Description"), /*#__PURE__*/React.createElement("textarea", {
      rows: 4,
      placeholder: "Describe the feedback\u2026",
      style: {
        width: '100%',
        boxSizing: 'border-box',
        resize: 'vertical',
        padding: 11,
        fontFamily: 'var(--pv-font-sans)',
        fontSize: 14,
        color: 'var(--pv-text-strong)',
        border: '1px solid var(--pv-border-strong)',
        borderRadius: 8,
        outline: 'none'
      }
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 16,
        marginTop: 14,
        flexWrap: 'wrap'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: 8,
        padding: '9px 13px',
        border: '1.5px dashed var(--pv-border-strong)',
        borderRadius: 8,
        fontSize: 13,
        color: 'var(--pv-text-muted)',
        cursor: 'pointer'
      }
    }, /*#__PURE__*/React.createElement("i", {
      "data-lucide": "paperclip",
      style: {
        width: 15,
        height: 15
      }
    }), " Add attachment"), /*#__PURE__*/React.createElement("label", {
      style: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: 8,
        fontSize: 13.5,
        color: 'var(--pv-text-body)',
        cursor: 'pointer'
      }
    }, /*#__PURE__*/React.createElement("input", {
      type: "checkbox"
    }), " Anonymous submission"))), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        justifyContent: 'flex-end',
        gap: 10
      }
    }, /*#__PURE__*/React.createElement(Button, {
      variant: "ghost",
      onClick: onBack
    }, "Cancel"), /*#__PURE__*/React.createElement(Button, {
      variant: "outline"
    }, "Save draft"), /*#__PURE__*/React.createElement(Button, {
      variant: "primary",
      iconLeft: /*#__PURE__*/React.createElement("i", {
        "data-lucide": "check"
      }),
      onClick: onBack
    }, "Create feedback"))));
  }
  window.PVIntake = Intake;
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/patientvoice/Intake.jsx", error: String((e && e.message) || e) }); }

// ui_kits/patientvoice/SLAMonitor.jsx
try { (() => {
// PatientVoice — SLA Monitoring Center. window.PVSla
(function () {
  function SLAMonitor({
    onOpen
  }) {
    const D = window.PV_DATA;
    const {
      StatCard
    } = D ? window.PatientVoiceDesignSystem_16c56a : {};
    const DS = window.PatientVoiceDesignSystem_16c56a;
    const {
      SLABadge,
      PriorityBadge,
      Avatar,
      Button
    } = DS;
    const {
      Gauge
    } = window.PVCharts;
    React.useEffect(() => {
      window.lucide && window.lucide.createIcons();
    });
    const atRisk = D.tickets.filter(t => t.slaPct >= 80).sort((a, b) => b.slaPct - a.slaPct);
    const agentName = id => {
      const a = D.agents.find(x => x.id === id);
      return a ? a.name : 'Unassigned';
    };
    function Panel({
      title,
      action,
      children,
      pad = 16
    }) {
      return /*#__PURE__*/React.createElement("div", {
        style: {
          background: '#fff',
          border: '1px solid var(--pv-border)',
          borderRadius: 12,
          boxShadow: 'var(--pv-shadow-sm)'
        }
      }, title ? /*#__PURE__*/React.createElement("div", {
        style: {
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '12px 16px',
          borderBottom: '1px solid var(--pv-border)'
        }
      }, /*#__PURE__*/React.createElement("span", {
        style: {
          fontSize: 13.5,
          fontWeight: 700,
          color: 'var(--pv-text-strong)'
        }
      }, title), action) : null, /*#__PURE__*/React.createElement("div", {
        style: {
          padding: pad
        }
      }, children));
    }
    return /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
        maxWidth: 1440
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: 14
      }
    }, /*#__PURE__*/React.createElement(StatCard, {
      label: "SLA compliance",
      value: "94.2",
      unit: "%",
      delta: 1.8,
      icon: "gauge",
      tone: "success"
    }), /*#__PURE__*/React.createElement(StatCard, {
      label: "At risk (\u226580%)",
      value: atRisk.filter(t => !t.breached).length,
      icon: "alarm-clock",
      tone: "warning"
    }), /*#__PURE__*/React.createElement(StatCard, {
      label: "Breached",
      value: D.tickets.filter(t => t.breached).length,
      delta: 2,
      invertDelta: true,
      icon: "alarm-clock-off",
      tone: "critical"
    }), /*#__PURE__*/React.createElement(StatCard, {
      label: "Avg. resolution",
      value: "6.4",
      unit: "h",
      delta: -8,
      icon: "timer",
      tone: "primary"
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        gridTemplateColumns: '1fr 320px',
        gap: 16,
        alignItems: 'start'
      }
    }, /*#__PURE__*/React.createElement(Panel, {
      title: "SLA breach & escalation queue",
      action: /*#__PURE__*/React.createElement(Button, {
        size: "sm",
        variant: "outline",
        iconLeft: /*#__PURE__*/React.createElement("i", {
          "data-lucide": "bell-ring"
        })
      }, "Notify managers")
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        flexDirection: 'column',
        gap: 10
      }
    }, atRisk.map(t => /*#__PURE__*/React.createElement("div", {
      key: t.id,
      onClick: () => onOpen && onOpen(t.id),
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 14,
        padding: '12px 14px',
        border: `1px solid ${t.breached ? 'var(--pv-critical-200)' : 'var(--pv-warning-100)'}`,
        background: t.breached ? 'var(--pv-critical-50)' : 'var(--pv-warning-50)',
        borderRadius: 10,
        cursor: 'pointer'
      }
    }, /*#__PURE__*/React.createElement("i", {
      "data-lucide": t.breached ? 'alarm-clock-off' : 'alarm-clock',
      style: {
        width: 20,
        height: 20,
        color: t.breached ? 'var(--pv-critical-600)' : 'var(--pv-warning-600)',
        flex: 'none'
      }
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        minWidth: 0
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 8
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: 'var(--pv-font-mono)',
        fontSize: 12.5,
        fontWeight: 600,
        color: 'var(--pv-text-strong)'
      }
    }, t.id), /*#__PURE__*/React.createElement(PriorityBadge, {
      priority: t.priority
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 13,
        fontWeight: 600,
        color: 'var(--pv-text-strong)',
        marginTop: 3,
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
      }
    }, t.subject), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11.5,
        color: 'var(--pv-text-muted)',
        marginTop: 1
      }
    }, t.dept, " \xB7 ", agentName(t.assignee))), /*#__PURE__*/React.createElement("div", {
      style: {
        width: 150,
        flex: 'none'
      }
    }, /*#__PURE__*/React.createElement(SLABadge, {
      variant: "bar",
      consumedPct: t.slaPct,
      remaining: t.slaRemaining,
      breached: t.breached
    })))))), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        flexDirection: 'column',
        gap: 16
      }
    }, /*#__PURE__*/React.createElement(Panel, {
      title: "Compliance gauge"
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        justifyContent: 'center'
      }
    }, /*#__PURE__*/React.createElement(Gauge, {
      value: 94,
      label: "Last 30 days"
    }))), /*#__PURE__*/React.createElement(Panel, {
      title: "Escalation workflow"
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        flexDirection: 'column',
        gap: 0
      }
    }, [{
      t: '80% consumed',
      d: 'Warning to assignee',
      c: 'var(--pv-warning-500)'
    }, {
      t: '100% / breach',
      d: 'Alert to Dept. Manager',
      c: 'var(--pv-critical-500)'
    }, {
      t: '+2h overdue',
      d: 'Escalate to Quality Lead',
      c: 'var(--pv-accent-500)'
    }, {
      t: '+8h overdue',
      d: 'Director notification',
      c: 'var(--pv-neutral-700)'
    }].map((s, i, arr) => /*#__PURE__*/React.createElement("div", {
      key: i,
      style: {
        display: 'flex',
        gap: 11
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 12,
        height: 12,
        borderRadius: 999,
        background: s.c,
        flex: 'none',
        marginTop: 2
      }
    }), i < arr.length - 1 ? /*#__PURE__*/React.createElement("span", {
      style: {
        width: 2,
        flex: 1,
        background: 'var(--pv-neutral-200)',
        minHeight: 18
      }
    }) : null), /*#__PURE__*/React.createElement("div", {
      style: {
        paddingBottom: 16
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 13,
        fontWeight: 600,
        color: 'var(--pv-text-strong)'
      }
    }, s.t), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 12,
        color: 'var(--pv-text-muted)'
      }
    }, s.d)))))))));
  }
  window.PVSla = SLAMonitor;
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/patientvoice/SLAMonitor.jsx", error: String((e && e.message) || e) }); }

// ui_kits/patientvoice/charts.jsx
try { (() => {
// Lightweight CSS/SVG charts for the PatientVoice kit. window.PVCharts
(function () {
  // Vertical bar/area trend chart
  function TrendChart({
    data,
    labels,
    color = 'var(--pv-primary-600)',
    height = 180
  }) {
    const max = Math.max(...data) * 1.15;
    return /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'flex-end',
        gap: 8,
        height,
        padding: '8px 2px 0'
      }
    }, data.map((v, i) => /*#__PURE__*/React.createElement("div", {
      key: i,
      style: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 7,
        height: '100%',
        justifyContent: 'flex-end'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: '100%',
        maxWidth: 26,
        height: `${v / max * 100}%`,
        borderRadius: '5px 5px 2px 2px',
        background: `linear-gradient(180deg, ${color}, color-mix(in srgb, ${color} 55%, #fff))`,
        boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.15)'
      },
      title: v
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 10.5,
        color: 'var(--pv-text-subtle)',
        fontWeight: 500
      }
    }, labels[i]))));
  }

  // Donut / pie via conic-gradient
  function Donut({
    data,
    size = 150,
    thickness = 26
  }) {
    const total = data.reduce((s, d) => s + d.value, 0);
    let acc = 0;
    const stops = data.map(d => {
      const start = acc / total * 360;
      acc += d.value;
      const end = acc / total * 360;
      return `${d.color} ${start}deg ${end}deg`;
    }).join(', ');
    return /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 20
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'relative',
        width: size,
        height: size,
        flex: 'none'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: '100%',
        height: '100%',
        borderRadius: '50%',
        background: `conic-gradient(${stops})`
      }
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'absolute',
        inset: thickness,
        background: '#fff',
        borderRadius: '50%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 22,
        fontWeight: 700,
        color: 'var(--pv-text-strong)',
        fontVariantNumeric: 'tabular-nums'
      }
    }, total), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 11,
        color: 'var(--pv-text-muted)'
      }
    }, "this week"))), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
        flex: 1
      }
    }, data.map(d => /*#__PURE__*/React.createElement("div", {
      key: d.label,
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        fontSize: 12.5
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 10,
        height: 10,
        borderRadius: 3,
        background: d.color,
        flex: 'none'
      }
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        flex: 1,
        color: 'var(--pv-text-body)'
      }
    }, d.label), /*#__PURE__*/React.createElement("span", {
      style: {
        fontWeight: 600,
        color: 'var(--pv-text-strong)',
        fontVariantNumeric: 'tabular-nums'
      }
    }, d.value, "%")))));
  }

  // Semicircular SLA gauge
  function Gauge({
    value = 94,
    size = 180,
    label = 'SLA compliance'
  }) {
    const angle = value / 100 * 180;
    const color = value >= 90 ? 'var(--pv-success-500)' : value >= 75 ? 'var(--pv-warning-500)' : 'var(--pv-critical-500)';
    return /*#__PURE__*/React.createElement("div", {
      style: {
        width: size,
        textAlign: 'center'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'relative',
        width: size,
        height: size / 2,
        overflow: 'hidden',
        margin: '0 auto'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'absolute',
        width: size,
        height: size,
        borderRadius: '50%',
        background: `conic-gradient(from -90deg, ${color} ${angle}deg, var(--pv-neutral-200) ${angle}deg 180deg, transparent 180deg)`
      }
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'absolute',
        top: size * 0.16,
        left: size * 0.16,
        width: size * 0.68,
        height: size * 0.68,
        borderRadius: '50%',
        background: '#fff'
      }
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'absolute',
        bottom: 2,
        left: 0,
        right: 0,
        textAlign: 'center'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 30,
        fontWeight: 700,
        color: 'var(--pv-text-strong)',
        fontVariantNumeric: 'tabular-nums',
        lineHeight: 1
      }
    }, value, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 16,
        color: 'var(--pv-text-muted)'
      }
    }, "%")))), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 12,
        color: 'var(--pv-text-muted)',
        marginTop: 6
      }
    }, label));
  }

  // Horizontal ranked bars
  function RankList({
    data,
    color = 'var(--pv-primary-500)'
  }) {
    const max = Math.max(...data.map(d => d.value));
    return /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        flexDirection: 'column',
        gap: 11
      }
    }, data.map((d, i) => /*#__PURE__*/React.createElement("div", {
      key: d.label,
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 10
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 16,
        fontSize: 12,
        fontWeight: 700,
        color: 'var(--pv-text-subtle)',
        textAlign: 'right',
        fontVariantNumeric: 'tabular-nums'
      }
    }, i + 1), /*#__PURE__*/React.createElement("span", {
      style: {
        width: 130,
        fontSize: 12.5,
        color: 'var(--pv-text-body)',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        flex: 'none'
      }
    }, d.label), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        height: 8,
        borderRadius: 999,
        background: 'var(--pv-neutral-100)',
        overflow: 'hidden'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: `${d.value / max * 100}%`,
        height: '100%',
        borderRadius: 999,
        background: color
      }
    })), /*#__PURE__*/React.createElement("span", {
      style: {
        width: 28,
        fontSize: 12.5,
        fontWeight: 600,
        color: 'var(--pv-text-strong)',
        textAlign: 'right',
        fontVariantNumeric: 'tabular-nums'
      }
    }, d.value))));
  }
  window.PVCharts = {
    TrendChart,
    Donut,
    Gauge,
    RankList
  };
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/patientvoice/charts.jsx", error: String((e && e.message) || e) }); }

// ui_kits/patientvoice/data.js
try { (() => {
// PatientVoice — mock data for the UI kit (illustrative, not real patients).
window.PV_DATA = function () {
  const agents = [{
    id: 'u1',
    name: 'Mai Tran',
    role: 'Quality Lead'
  }, {
    id: 'u2',
    name: 'Quang Le',
    role: 'CS Officer'
  }, {
    id: 'u3',
    name: 'Hoa Pham',
    role: 'Dept. Manager'
  }, {
    id: 'u4',
    name: 'Linh Vo',
    role: 'Hotline Operator'
  }, {
    id: 'u5',
    name: 'Nam Do',
    role: 'CS Officer'
  }];
  const tickets = [{
    id: 'PV-10293',
    subject: 'Long wait at Radiology front desk',
    patient: 'Tran Thi B.',
    dept: 'Radiology',
    type: 'complaint',
    priority: 'urgent',
    status: 'in_progress',
    channel: 'hotline',
    assignee: 'u2',
    slaPct: 86,
    slaRemaining: '01:48:20',
    created: '2m ago',
    updated: '4m ago'
  }, {
    id: 'PV-10292',
    subject: 'Praise for caring ICU night nurse',
    patient: 'Anonymous',
    dept: 'ICU',
    type: 'compliment',
    priority: 'normal',
    status: 'new',
    channel: 'online_form',
    assignee: null,
    slaPct: 18,
    slaRemaining: '11:20:00',
    created: '14m ago',
    updated: '14m ago'
  }, {
    id: 'PV-10291',
    subject: 'Billing discrepancy after discharge',
    patient: 'Le Van C.',
    dept: 'Finance',
    type: 'inquiry',
    priority: 'high',
    status: 'assigned',
    channel: 'email',
    assignee: 'u5',
    slaPct: 52,
    slaRemaining: '05:02:11',
    created: '38m ago',
    updated: '20m ago'
  }, {
    id: 'PV-10290',
    subject: 'Suggest clearer signage to Lab 2',
    patient: 'Pham D.',
    dept: 'Facilities',
    type: 'suggestion',
    priority: 'normal',
    status: 'pending_confirmation',
    channel: 'suggestion_box',
    assignee: 'u3',
    slaPct: 64,
    slaRemaining: '03:40:00',
    created: '1h ago',
    updated: '32m ago'
  }, {
    id: 'PV-10289',
    subject: 'Rude reception at Outpatient clinic',
    patient: 'Nguyen E.',
    dept: 'Outpatient',
    type: 'complaint',
    priority: 'high',
    status: 'in_progress',
    channel: 'front_desk',
    assignee: 'u2',
    slaPct: 102,
    slaRemaining: '-00:24:10',
    created: '3h ago',
    updated: '1h ago',
    breached: true
  }, {
    id: 'PV-10288',
    subject: 'Medication handed without instructions',
    patient: 'Do Thi F.',
    dept: 'Pharmacy',
    type: 'incident',
    priority: 'urgent',
    status: 'assigned',
    channel: 'hotline',
    assignee: 'u1',
    slaPct: 78,
    slaRemaining: '00:52:40',
    created: '3h ago',
    updated: '40m ago'
  }, {
    id: 'PV-10287',
    subject: 'Thank you to physiotherapy team',
    patient: 'Vu G.',
    dept: 'Physiotherapy',
    type: 'compliment',
    priority: 'normal',
    status: 'resolved',
    channel: 'social_media',
    assignee: 'u4',
    slaPct: 40,
    slaRemaining: '—',
    created: '5h ago',
    updated: '2h ago'
  }, {
    id: 'PV-10286',
    subject: 'Parking gate fees unclear',
    patient: 'Hoang H.',
    dept: 'Facilities',
    type: 'inquiry',
    priority: 'normal',
    status: 'new',
    channel: 'news_media',
    assignee: null,
    slaPct: 12,
    slaRemaining: '13:10:00',
    created: '5h ago',
    updated: '5h ago'
  }, {
    id: 'PV-10285',
    subject: 'Delayed lab results communication',
    patient: 'Bui I.',
    dept: 'Laboratory',
    type: 'complaint',
    priority: 'high',
    status: 'unresolved',
    channel: 'email',
    assignee: 'u3',
    slaPct: 100,
    slaRemaining: '00:00:00',
    created: '8h ago',
    updated: '3h ago',
    breached: true
  }, {
    id: 'PV-10284',
    subject: 'Appreciation for ER triage speed',
    patient: 'Anonymous',
    dept: 'Emergency',
    type: 'compliment',
    priority: 'normal',
    status: 'resolved',
    channel: 'front_desk',
    assignee: 'u5',
    slaPct: 30,
    slaRemaining: '—',
    created: '1d ago',
    updated: '6h ago'
  }];
  const kpis = {
    newToday: 42,
    week: 263,
    sla: 94.2,
    open: 318,
    overdue: 7
  };
  const trend = [38, 44, 41, 52, 49, 58, 63, 55, 61, 70, 66, 74];
  const trendLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const channelDist = [{
    channel: 'hotline',
    label: 'Hotline',
    value: 34,
    color: '#0d9488'
  }, {
    channel: 'online_form',
    label: 'Online Form',
    value: 22,
    color: '#2563eb'
  }, {
    channel: 'front_desk',
    label: 'Front Desk',
    value: 18,
    color: '#0e7490'
  }, {
    channel: 'email',
    label: 'Email',
    value: 12,
    color: '#7c3aed'
  }, {
    channel: 'social_media',
    label: 'Social',
    value: 9,
    color: '#ea580c'
  }, {
    channel: 'suggestion_box',
    label: 'Suggestion',
    value: 5,
    color: '#94a3b8'
  }];
  const topComplaints = [{
    label: 'Waiting time',
    value: 84
  }, {
    label: 'Staff attitude',
    value: 61
  }, {
    label: 'Billing & fees',
    value: 47
  }, {
    label: 'Communication',
    value: 39
  }, {
    label: 'Facilities & cleanliness',
    value: 28
  }];
  const topPraised = [{
    label: 'Emergency Dept.',
    value: 72
  }, {
    label: 'ICU Nursing',
    value: 64
  }, {
    label: 'Physiotherapy',
    value: 51
  }, {
    label: 'Maternity',
    value: 43
  }, {
    label: 'Pharmacy',
    value: 31
  }];
  const notifications = [{
    icon: 'alarm-clock-off',
    tone: 'critical',
    text: 'SLA breached on PV-10289 — Outpatient complaint',
    time: '3m'
  }, {
    icon: 'alarm-clock',
    tone: 'warning',
    text: 'PV-10293 at 86% of SLA window',
    time: '4m'
  }, {
    icon: 'user-plus',
    tone: 'info',
    text: 'PV-10291 assigned to Nam Do',
    time: '20m'
  }, {
    icon: 'inbox',
    tone: 'primary',
    text: 'New compliment via Online Form — ICU',
    time: '14m'
  }, {
    icon: 'arrow-up-circle',
    tone: 'accent',
    text: 'PV-10285 escalated to Dept. Manager',
    time: '1h'
  }];
  const timeline = [{
    icon: 'inbox',
    tone: 'info',
    title: 'Ticket created',
    who: 'Hotline · Linh Vo',
    time: 'Today 09:02',
    body: 'Patient called the hotline reporting a long wait at the Radiology front desk.'
  }, {
    icon: 'tag',
    tone: 'primary',
    title: 'Classified as Complaint · Urgent',
    who: 'Auto-routing rule R-04',
    time: 'Today 09:02'
  }, {
    icon: 'user-plus',
    tone: 'accent',
    title: 'Assigned to Quang Le',
    who: 'Mai Tran',
    time: 'Today 09:08'
  }, {
    icon: 'message-square',
    tone: 'neutral',
    title: 'Internal note added',
    who: 'Quang Le',
    time: 'Today 09:31',
    body: 'Contacted Radiology supervisor; reviewing queue staffing for the 8–10am peak.'
  }, {
    icon: 'phone',
    tone: 'secondary',
    title: 'Patient contacted by phone',
    who: 'Quang Le',
    time: 'Today 10:15'
  }];
  return {
    agents,
    tickets,
    kpis,
    trend,
    trendLabels,
    channelDist,
    topComplaints,
    topPraised,
    notifications,
    timeline
  };
}();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/patientvoice/data.js", error: String((e && e.message) || e) }); }

__ds_ns.Avatar = __ds_scope.Avatar;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.IconButton = __ds_scope.IconButton;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.Tabs = __ds_scope.Tabs;

__ds_ns.StatCard = __ds_scope.StatCard;

__ds_ns.ChannelBadge = __ds_scope.ChannelBadge;

__ds_ns.PriorityBadge = __ds_scope.PriorityBadge;

__ds_ns.SLABadge = __ds_scope.SLABadge;

__ds_ns.StatusBadge = __ds_scope.StatusBadge;

})();
