import * as React from 'react';

export interface PriorityBadgeProps {
  /** @default "normal" */
  priority?: 'urgent' | 'high' | 'normal';
  style?: React.CSSProperties;
}

/** Triage priority badge (Urgent / High / Normal) with color bar. */
export function PriorityBadge(props: PriorityBadgeProps): JSX.Element;
