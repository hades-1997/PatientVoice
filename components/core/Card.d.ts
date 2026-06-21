import * as React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Optional header title (renders header row when set) */
  title?: React.ReactNode;
  /** Right-aligned header action node */
  action?: React.ReactNode;
  /** Body padding in px @default 16 */
  padding?: number;
  /** Adds hover elevation */
  interactive?: boolean;
  bodyStyle?: React.CSSProperties;
  children?: React.ReactNode;
}

/** Surface container with optional header for panels and dashboard widgets. */
export function Card(props: CardProps): JSX.Element;
