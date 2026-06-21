import * as React from 'react';

export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'ghost' | 'outline' | 'solid';
  /** Accessible label / tooltip */
  label?: string;
  children?: React.ReactNode;
}

/** Square icon-only button for toolbars and row actions. */
export function IconButton(props: IconButtonProps): JSX.Element;
