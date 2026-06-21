import * as React from 'react';

export type TicketStatus =
  | 'new' | 'assigned' | 'in_progress'
  | 'pending_confirmation' | 'resolved' | 'unresolved';

/**
 * @startingPoint section="Status" subtitle="Status, priority, channel & SLA badges" viewport="700x150"
 */
export interface StatusBadgeProps {
  /** One of the 6 PatientVoice workflow statuses @default "new" */
  status?: TicketStatus;
  size?: 'sm' | 'md';
  style?: React.CSSProperties;
}

/**
 * Workflow status pill (New → Resolved/Unresolved) with status dot.
 */
export function StatusBadge(props: StatusBadgeProps): JSX.Element;
