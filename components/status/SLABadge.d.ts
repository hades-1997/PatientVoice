import * as React from 'react';

export interface SLABadgeProps {
  /** Percent of SLA window consumed (0–100+). Drives color state. */
  consumedPct?: number;
  /** Countdown label, e.g. "02:14:38" */
  remaining?: string;
  /** Force breached state */
  breached?: boolean;
  /** "pill" (compact) or "bar" (label + progress) @default "pill" */
  variant?: 'pill' | 'bar';
  style?: React.CSSProperties;
}

/** SLA countdown / consumption indicator with on-track→warning→breach color. */
export function SLABadge(props: SLABadgeProps): JSX.Element;
