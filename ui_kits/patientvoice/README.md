# PatientVoice UI Kit

High-fidelity recreation of the **PatientVoice** hospital patient-feedback management app — a Salesforce/Zendesk-class enterprise SaaS for hospital Quality Management departments.

## Files
- `index.html` — interactive shell. Dark sidebar + top bar; click between Dashboard, Feedback Management (table + kanban), SLA Monitoring, Analytics, and New Feedback (intake). Click any ticket row/card to open the 3-column Feedback Detail.
- `AppShell.jsx` — sidebar nav + top bar (`window.PVShell`).
- `Dashboard.jsx` — KPIs, feedback trend, channel donut, top-5 ranks, SLA gauge, notifications.
- `FeedbackList.jsx` — ticket table + kanban board with status/priority/channel/SLA badges.
- `FeedbackDetail.jsx` — left (patient/ticket), center (content/attachments/timeline/notes), right (status/assignee/quick actions/escalation).
- `SLAMonitor.jsx` — breach & escalation queue, compliance gauge, escalation workflow.
- `Analytics.jsx` — BI dashboard + annual channel-evaluation table.
- `Intake.jsx` — under-2-minute multi-channel quick-entry form.
- `charts.jsx` — lightweight CSS/SVG charts (`window.PVCharts`): TrendChart, Donut, Gauge, RankList.
- `data.js` — illustrative mock data (`window.PV_DATA`). No real patient data.

## How it composes the system
Screens import primitives from the compiled bundle (`window.PatientVoiceDesignSystem_16c56a`): `StatCard`, `StatusBadge`, `PriorityBadge`, `ChannelBadge`, `SLABadge`, `Avatar`, `Button`, `Input`, `Tabs`, `Card`. Icons are Lucide (CDN). Charts are hand-built with CSS/conic-gradient — no chart library.

> This is a UI recreation for prototyping, not production code. Functional shortcuts are intentional.
