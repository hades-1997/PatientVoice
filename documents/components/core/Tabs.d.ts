import * as React from 'react';

export interface TabItem {
  label: string;
  value: string;
  count?: number;
}

export interface TabsProps {
  /** Array of strings or { label, value, count } */
  tabs: (string | TabItem)[];
  /** Active tab value */
  value: string;
  onChange?: (value: string) => void;
  style?: React.CSSProperties;
}

/** Underline tab bar with optional counts for switching views. */
export function Tabs(props: TabsProps): JSX.Element;
