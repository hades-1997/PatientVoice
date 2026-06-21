import * as React from 'react';

export interface AvatarProps {
  /** Full name — drives initials and deterministic color */
  name?: string;
  /** Optional image URL */
  src?: string;
  /** Pixel diameter @default 32 */
  size?: number;
  /** Presence dot */
  status?: 'online' | 'away' | 'offline';
  style?: React.CSSProperties;
}

/** Initials/image avatar with deterministic color and presence dot. */
export function Avatar(props: AvatarProps): JSX.Element;
