// PatientVoice — Feedback Management (Table + Kanban). window.PVFeedback
(function () {
  const TYPE_ICON = { complaint: 'frown', inquiry: 'help-circle', compliment: 'heart', suggestion: 'lightbulb', incident: 'shield-alert' };

  function agentName(id) {
    const a = (window.PV_DATA.agents.find((x) => x.id === id));
    return a ? a.name : null;
  }

  function Toolbar({ view, setView, count }) {
    const { Tabs, Button } = window.PatientVoiceDesignSystem_16c56a;
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14, flexWrap: 'wrap' }}>
        <div style={{ flex: 1, minWidth: 240 }}>
          <Tabs value={view} onChange={setView} tabs={[
            { label: 'Table', value: 'table', count },
            { label: 'Kanban', value: 'kanban' },
            { label: 'Timeline', value: 'timeline' },
          ]} />
        </div>
        <Button variant="outline" size="sm" iconLeft={<i data-lucide="filter" />}>Filters</Button>
        <Button variant="outline" size="sm" iconLeft={<i data-lucide="arrow-up-down" />}>Sort</Button>
        <Button variant="outline" size="sm" iconLeft={<i data-lucide="download" />}>Export</Button>
      </div>
    );
  }

  function FilterChips() {
    const chips = ['All channels', 'Urgent', 'Open', 'My team'];
    return (
      <div style={{ display: 'flex', gap: 8, marginBottom: 12, flexWrap: 'wrap' }}>
        {chips.map((c, i) => (
          <span key={c} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '5px 11px', borderRadius: 999, fontSize: 12.5, fontWeight: 600,
            background: i === 0 ? 'var(--pv-primary-50)' : '#fff', color: i === 0 ? 'var(--pv-primary-700)' : 'var(--pv-text-muted)',
            border: `1px solid ${i === 0 ? 'var(--pv-primary-200)' : 'var(--pv-border)'}`, cursor: 'pointer' }}>
            {c}{i === 0 ? null : <i data-lucide="plus" style={{ width: 13, height: 13 }} />}
          </span>
        ))}
      </div>
    );
  }

  function TableView({ onOpen }) {
    const D = window.PV_DATA;
    const { StatusBadge, PriorityBadge, ChannelBadge, SLABadge, Avatar } = window.PatientVoiceDesignSystem_16c56a;
    const th = { textAlign: 'left', fontSize: 11, fontWeight: 700, letterSpacing: '0.04em', textTransform: 'uppercase', color: 'var(--pv-text-subtle)', padding: '10px 14px', whiteSpace: 'nowrap' };
    const td = { padding: '12px 14px', borderTop: '1px solid var(--pv-border)', verticalAlign: 'middle' };
    return (
      <div style={{ background: '#fff', border: '1px solid var(--pv-border)', borderRadius: 12, overflow: 'hidden', boxShadow: 'var(--pv-shadow-sm)' }}>
        <div className="pv-scroll" style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 920 }}>
            <thead style={{ background: 'var(--pv-neutral-50)' }}>
              <tr>
                <th style={{ ...th, width: 36 }}><input type="checkbox" /></th>
                <th style={{ ...th, width: 96 }}>ID</th>
                <th style={th}>Subject</th>
                <th style={th}>Type</th>
                <th style={th}>Priority</th>
                <th style={th}>Status</th>
                <th style={th}>Channel</th>
                <th style={th}>Assignee</th>
                <th style={th}>SLA</th>
              </tr>
            </thead>
            <tbody>
              {D.tickets.map((t) => (
                <tr key={t.id} onClick={() => onOpen(t.id)} style={{ cursor: 'pointer', transition: 'background 120ms' }}
                  onMouseEnter={(e) => e.currentTarget.style.background = 'var(--pv-neutral-25)'}
                  onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}>
                  <td style={td} onClick={(e) => e.stopPropagation()}><input type="checkbox" /></td>
                  <td style={{ ...td, fontFamily: 'var(--pv-font-mono)', fontSize: 12.5, fontWeight: 600, color: 'var(--pv-text-link)' }}>{t.id}</td>
                  <td style={{ ...td, maxWidth: 280 }}>
                    <div style={{ fontSize: 13.5, fontWeight: 600, color: 'var(--pv-text-strong)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{t.subject}</div>
                    <div style={{ fontSize: 11.5, color: 'var(--pv-text-muted)', marginTop: 2 }}>{t.patient} · {t.dept}</div>
                  </td>
                  <td style={td}><span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 12.5, color: 'var(--pv-text-body)', textTransform: 'capitalize' }}><i data-lucide={TYPE_ICON[t.type]} style={{ width: 14, height: 14, color: 'var(--pv-text-muted)' }} />{t.type}</span></td>
                  <td style={td}><PriorityBadge priority={t.priority} /></td>
                  <td style={td}><StatusBadge status={t.status} size="sm" /></td>
                  <td style={td}><ChannelBadge channel={t.channel} /></td>
                  <td style={td}>{t.assignee ? <span style={{ display: 'inline-flex', alignItems: 'center', gap: 7 }}><Avatar name={agentName(t.assignee)} size={24} /><span style={{ fontSize: 12.5, color: 'var(--pv-text-body)' }}>{agentName(t.assignee)}</span></span> : <span style={{ fontSize: 12.5, color: 'var(--pv-text-subtle)' }}>Unassigned</span>}</td>
                  <td style={td}><SLABadge consumedPct={t.slaPct} remaining={t.slaRemaining} breached={t.breached} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  function KanbanView({ onOpen }) {
    const D = window.PV_DATA;
    const { StatusBadge, PriorityBadge, ChannelBadge, SLABadge, Avatar } = window.PatientVoiceDesignSystem_16c56a;
    const cols = [
      { id: 'new', label: 'New' }, { id: 'assigned', label: 'Assigned' }, { id: 'in_progress', label: 'In Progress' },
      { id: 'pending_confirmation', label: 'Pending' }, { id: 'resolved', label: 'Resolved' },
    ];
    return (
      <div className="pv-scroll" style={{ display: 'flex', gap: 14, overflowX: 'auto', paddingBottom: 6 }}>
        {cols.map((c) => {
          const items = D.tickets.filter((t) => t.status === c.id);
          return (
            <div key={c.id} style={{ flex: 'none', width: 280, background: 'var(--pv-neutral-100)', borderRadius: 12, padding: 10, display: 'flex', flexDirection: 'column', gap: 9 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '4px 6px' }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}><StatusBadge status={c.id} size="sm" /></span>
                <span style={{ fontFamily: 'var(--pv-font-mono)', fontSize: 12, fontWeight: 600, color: 'var(--pv-text-muted)' }}>{items.length}</span>
              </div>
              {items.map((t) => (
                <div key={t.id} onClick={() => onOpen(t.id)} style={{ background: '#fff', border: '1px solid var(--pv-border)', borderRadius: 10, padding: 12, cursor: 'pointer', boxShadow: 'var(--pv-shadow-xs)', display: 'flex', flexDirection: 'column', gap: 9 }}
                  onMouseEnter={(e) => e.currentTarget.style.boxShadow = 'var(--pv-shadow-md)'}
                  onMouseLeave={(e) => e.currentTarget.style.boxShadow = 'var(--pv-shadow-xs)'}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontFamily: 'var(--pv-font-mono)', fontSize: 11.5, fontWeight: 600, color: 'var(--pv-text-link)' }}>{t.id}</span>
                    <PriorityBadge priority={t.priority} />
                  </div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--pv-text-strong)', lineHeight: 1.35 }}>{t.subject}</div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
                    <ChannelBadge channel={t.channel} showLabel={false} />
                    <SLABadge consumedPct={t.slaPct} remaining={t.slaRemaining} breached={t.breached} />
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 8, borderTop: '1px solid var(--pv-neutral-100)' }}>
                    <span style={{ fontSize: 11.5, color: 'var(--pv-text-muted)' }}>{t.dept}</span>
                    {t.assignee ? <Avatar name={agentName(t.assignee)} size={22} /> : <span style={{ fontSize: 11, color: 'var(--pv-text-subtle)' }}>—</span>}
                  </div>
                </div>
              ))}
            </div>
          );
        })}
      </div>
    );
  }

  function Feedback({ onOpen }) {
    const [view, setView] = React.useState('table');
    React.useEffect(() => { window.lucide && window.lucide.createIcons(); });
    return (
      <div style={{ maxWidth: 1440 }}>
        <Toolbar view={view} setView={setView} count={window.PV_DATA.tickets.length} />
        <FilterChips />
        {view === 'kanban' ? <KanbanView onOpen={onOpen} /> : <TableView onOpen={onOpen} />}
        {view === 'timeline' ? null : null}
      </div>
    );
  }

  window.PVFeedback = Feedback;
})();
