import * as React from 'react';

/**
 * @startingPoint section="Data" subtitle="KPI stat tiles for dashboards" viewport="700x150"
 */
export interface StatCardProps {
  label: string;
  value: React.ReactNode;
  unit?: string;
  /** Trend percentage; sign sets up/down arrow */
  delta?: number;
  /** Caption beside the delta, e.g. "vs last week" */
  deltaLabel?: string;
  /** When true, a negative delta is treated as good (e.g. overdue ↓) */
  invertDelta?: boolean;
  /** Lucide icon name */
  icon?: string;
  tone?: 'primary' | 'secondary' | 'success' | 'warning' | 'critical' | 'accent' | 'neutral';
  style?: React.CSSProperties;
}

/**
 * Dashboard KPI tile with value, trend delta and tinted icon chip.
 */
export function StatCard(props: StatCardProps): JSX.Element;
