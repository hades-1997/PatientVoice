KPI tile for dashboards and monitoring headers. Shows a label, large tabular value, optional unit, trend delta and a tinted Lucide icon chip.

```jsx
<StatCard label="New feedback today" value="42" delta={12} deltaLabel="vs yesterday" icon="inbox" tone="primary" />
<StatCard label="Overdue tickets" value="7" delta={-3} invertDelta icon="alarm-clock-off" tone="critical" />
<StatCard label="SLA compliance" value="94.2" unit="%" delta={1.8} icon="gauge" tone="success" />
```

Use `invertDelta` when a downward trend is positive (overdue, breaches). `tone` controls the icon chip color. Requires Lucide loaded on the host page.
