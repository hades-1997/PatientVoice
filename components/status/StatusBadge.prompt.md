Status, priority, channel and SLA badges — the core triage vocabulary used across tables, kanban cards and the feedback detail screen.

```jsx
<StatusBadge status="in_progress" />
<PriorityBadge priority="urgent" />
<ChannelBadge channel="hotline" />
<SLABadge consumedPct={86} remaining="02:14:38" />
<SLABadge variant="bar" consumedPct={45} remaining="06:12:00" />
```

`StatusBadge` covers the 6 workflow statuses (`new`, `assigned`, `in_progress`, `pending_confirmation`, `resolved`, `unresolved`). `SLABadge` auto-colors: <80% on-track (green), 80–100% warning (orange), ≥100%/`breached` red. `ChannelBadge` renders a Lucide icon — ensure Lucide is loaded and `lucide.createIcons()` runs.
