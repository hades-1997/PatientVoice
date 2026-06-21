import * as React from 'react';

export type Channel =
  | 'front_desk' | 'hotline' | 'suggestion_box' | 'online_form'
  | 'email' | 'social_media' | 'news_media';

export interface ChannelBadgeProps {
  /** @default "front_desk" */
  channel?: Channel;
  /** Show text label beside the icon @default true */
  showLabel?: boolean;
  style?: React.CSSProperties;
}

/** Intake-channel chip with Lucide icon (host must load Lucide). */
export function ChannelBadge(props: ChannelBadgeProps): JSX.Element;
