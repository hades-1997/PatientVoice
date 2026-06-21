// PatientVoice app shell — dark sidebar + top bar. Exposes window.PVShell.
(function () {
  const NAV = [
    { id: 'dashboard', label: 'Dashboard', icon: 'layout-dashboard' },
    { group: 'Feedback Management' },
    { id: 'feedback', label: 'All Feedback', icon: 'ticket', count: 318 },
    { id: 'overdue', label: 'Overdue', icon: 'alarm-clock-off', count: 7, badge: 'critical' },
    { group: 'Operations' },
    { id: 'sla', label: 'SLA Monitoring', icon: 'gauge' },
    { id: 'intake', label: 'Multi-Channel Intake', icon: 'inbox' },
    { id: 'hotline', label: 'Hotline Management', icon: 'headset' },
    { group: 'Insight' },
    { id: 'analytics', label: 'Analytics & Reports', icon: 'bar-chart-3' },
    { id: 'admin', label: 'Administration', icon: 'settings' },
  ];

  function Logo() {
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '0 18px', height: 'var(--pv-topbar-h)', flex: 'none' }}>
        <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 32, height: 32, borderRadius: 9, background: 'linear-gradient(135deg, var(--pv-primary-500), var(--pv-secondary-500))', color: '#fff', flex: 'none' }}>
          <i data-lucide="messages-square" style={{ width: 18, height: 18 }} />
        </span>
        <div style={{ lineHeight: 1.1 }}>
          <div style={{ fontWeight: 700, fontSize: 15, color: '#fff', letterSpacing: '-0.01em' }}>PatientVoice</div>
          <div style={{ fontSize: 10.5, color: '#7d93b2', fontWeight: 500 }}>Quality Management</div>
        </div>
      </div>
    );
  }

  function Sidebar({ active, onNavigate }) {
    return (
      <aside className="pv-scroll" style={{
        width: 'var(--pv-sidebar-w)', flex: 'none', background: 'var(--pv-surface-nav)',
        display: 'flex', flexDirection: 'column', height: '100%', overflowY: 'auto',
        borderRight: '1px solid #1e2d45',
      }}>
        <Logo />
        <nav style={{ padding: '8px 12px', display: 'flex', flexDirection: 'column', gap: 2 }}>
          {NAV.map((n, i) => {
            if (n.group) return (
              <div key={'g' + i} style={{ padding: '14px 10px 4px', fontSize: 10.5, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#5d6f8c' }}>{n.group}</div>
            );
            const on = active === n.id;
            return (
              <button key={n.id} onClick={() => onNavigate(n.id)} style={{
                display: 'flex', alignItems: 'center', gap: 11, padding: '9px 10px', borderRadius: 8,
                background: on ? 'rgba(20,184,166,0.14)' : 'transparent', cursor: 'pointer', width: '100%',
                color: on ? '#fff' : 'var(--pv-text-on-nav)', textAlign: 'left',
                boxShadow: on ? 'inset 2px 0 0 var(--pv-secondary-400)' : 'none',
                transition: 'background var(--pv-dur-fast) var(--pv-ease)',
              }}
                onMouseEnter={(e) => { if (!on) e.currentTarget.style.background = 'var(--pv-surface-nav-2)'; }}
                onMouseLeave={(e) => { if (!on) e.currentTarget.style.background = 'transparent'; }}>
                <i data-lucide={n.icon} style={{ width: 17, height: 17, flex: 'none', color: on ? 'var(--pv-secondary-300)' : '#8499b5' }} />
                <span style={{ fontSize: 13.5, fontWeight: on ? 600 : 500, flex: 1 }}>{n.label}</span>
                {n.count != null ? (
                  <span style={{ fontFamily: 'var(--pv-font-mono)', fontSize: 11, fontWeight: 600, padding: '1px 7px', borderRadius: 999,
                    background: n.badge === 'critical' ? 'var(--pv-critical-600)' : 'rgba(255,255,255,0.08)',
                    color: n.badge === 'critical' ? '#fff' : '#9fb2cd' }}>{n.count}</span>
                ) : null}
              </button>
            );
          })}
        </nav>
        <div style={{ marginTop: 'auto', padding: 14, borderTop: '1px solid #1e2d45', display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ display: 'inline-flex', width: 32, height: 32, borderRadius: 999, background: 'linear-gradient(135deg,#0e7490,#14b8a6)', color: '#fff', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, flex: 'none' }}>MT</span>
          <div style={{ lineHeight: 1.2, flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 12.5, fontWeight: 600, color: '#fff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Mai Tran</div>
            <div style={{ fontSize: 11, color: '#7d93b2' }}>Quality Lead</div>
          </div>
          <i data-lucide="chevrons-up-down" style={{ width: 15, height: 15, color: '#7d93b2' }} />
        </div>
      </aside>
    );
  }

  function Topbar({ title, subtitle, onNavigate }) {
    return (
      <header style={{
        height: 'var(--pv-topbar-h)', flex: 'none', background: '#fff', borderBottom: '1px solid var(--pv-border)',
        display: 'flex', alignItems: 'center', gap: 16, padding: '0 22px',
      }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <h1 style={{ margin: 0, fontSize: 17, fontWeight: 700, color: 'var(--pv-text-strong)', letterSpacing: '-0.01em' }}>{title}</h1>
          {subtitle ? <div style={{ fontSize: 12, color: 'var(--pv-text-muted)' }}>{subtitle}</div> : null}
        </div>
        <div style={{ position: 'relative', width: 280 }}>
          <i data-lucide="search" style={{ position: 'absolute', left: 11, top: 9, width: 16, height: 16, color: 'var(--pv-text-subtle)' }} />
          <input placeholder="Search feedback, patients, IDs…" style={{
            width: '100%', boxSizing: 'border-box', height: 34, padding: '0 12px 0 34px', fontSize: 13,
            fontFamily: 'var(--pv-font-sans)', color: 'var(--pv-text-strong)', background: 'var(--pv-neutral-50)',
            border: '1px solid var(--pv-border)', borderRadius: 8, outline: 'none',
          }} />
        </div>
        <button onClick={() => onNavigate && onNavigate('intake')} style={{
          display: 'inline-flex', alignItems: 'center', gap: 7, height: 36, padding: '0 14px', borderRadius: 8,
          background: 'var(--pv-primary-600)', color: '#fff', fontWeight: 600, fontSize: 13.5, cursor: 'pointer', border: 'none', flex: 'none',
        }}>
          <i data-lucide="plus" style={{ width: 16, height: 16 }} /> New feedback
        </button>
        <button style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 36, height: 36, borderRadius: 8, background: 'var(--pv-neutral-50)', border: '1px solid var(--pv-border)', cursor: 'pointer', flex: 'none' }}>
          <i data-lucide="bell" style={{ width: 17, height: 17, color: 'var(--pv-text-muted)' }} />
          <span style={{ position: 'absolute', top: 7, right: 8, width: 7, height: 7, borderRadius: 999, background: 'var(--pv-critical-500)', border: '1.5px solid #fff' }} />
        </button>
      </header>
    );
  }

  function AppShell({ active, onNavigate, title, subtitle, children }) {
    return (
      <div className="pv-app" style={{ display: 'flex', height: '100%', background: 'var(--pv-bg-app)' }}>
        <Sidebar active={active} onNavigate={onNavigate} />
        <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', height: '100%' }}>
          <Topbar title={title} subtitle={subtitle} onNavigate={onNavigate} />
          <main className="pv-scroll" style={{ flex: 1, overflowY: 'auto', padding: 22 }}>{children}</main>
        </div>
      </div>
    );
  }

  window.PVShell = { AppShell, Sidebar, Topbar, NAV };
})();
