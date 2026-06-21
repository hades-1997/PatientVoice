import * as React from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  leftIcon?: React.ReactNode;
  hint?: string;
  invalid?: boolean;
  containerStyle?: React.CSSProperties;
}

/** Labeled text input with optional leading icon, hint and error state. */
export function Input(props: InputProps): JSX.Element;
