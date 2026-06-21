// PatientVoice — mock data for the UI kit (illustrative, not real patients).
window.PV_DATA = (function () {
  const agents = [
    { id: 'u1', name: 'Mai Tran', role: 'Quality Lead' },
    { id: 'u2', name: 'Quang Le', role: 'CS Officer' },
    { id: 'u3', name: 'Hoa Pham', role: 'Dept. Manager' },
    { id: 'u4', name: 'Linh Vo', role: 'Hotline Operator' },
    { id: 'u5', name: 'Nam Do', role: 'CS Officer' },
  ];

  const tickets = [
    { id: 'PV-10293', subject: 'Long wait at Radiology front desk', patient: 'Tran Thi B.', dept: 'Radiology', type: 'complaint', priority: 'urgent', status: 'in_progress', channel: 'hotline', assignee: 'u2', slaPct: 86, slaRemaining: '01:48:20', created: '2m ago', updated: '4m ago' },
    { id: 'PV-10292', subject: 'Praise for caring ICU night nurse', patient: 'Anonymous', dept: 'ICU', type: 'compliment', priority: 'normal', status: 'new', channel: 'online_form', assignee: null, slaPct: 18, slaRemaining: '11:20:00', created: '14m ago', updated: '14m ago' },
    { id: 'PV-10291', subject: 'Billing discrepancy after discharge', patient: 'Le Van C.', dept: 'Finance', type: 'inquiry', priority: 'high', status: 'assigned', channel: 'email', assignee: 'u5', slaPct: 52, slaRemaining: '05:02:11', created: '38m ago', updated: '20m ago' },
    { id: 'PV-10290', subject: 'Suggest clearer signage to Lab 2', patient: 'Pham D.', dept: 'Facilities', type: 'suggestion', priority: 'normal', status: 'pending_confirmation', channel: 'suggestion_box', assignee: 'u3', slaPct: 64, slaRemaining: '03:40:00', created: '1h ago', updated: '32m ago' },
    { id: 'PV-10289', subject: 'Rude reception at Outpatient clinic', patient: 'Nguyen E.', dept: 'Outpatient', type: 'complaint', priority: 'high', status: 'in_progress', channel: 'front_desk', assignee: 'u2', slaPct: 102, slaRemaining: '-00:24:10', created: '3h ago', updated: '1h ago', breached: true },
    { id: 'PV-10288', subject: 'Medication handed without instructions', patient: 'Do Thi F.', dept: 'Pharmacy', type: 'incident', priority: 'urgent', status: 'assigned', channel: 'hotline', assignee: 'u1', slaPct: 78, slaRemaining: '00:52:40', created: '3h ago', updated: '40m ago' },
    { id: 'PV-10287', subject: 'Thank you to physiotherapy team', patient: 'Vu G.', dept: 'Physiotherapy', type: 'compliment', priority: 'normal', status: 'resolved', channel: 'social_media', assignee: 'u4', slaPct: 40, slaRemaining: '—', created: '5h ago', updated: '2h ago' },
    { id: 'PV-10286', subject: 'Parking gate fees unclear', patient: 'Hoang H.', dept: 'Facilities', type: 'inquiry', priority: 'normal', status: 'new', channel: 'news_media', assignee: null, slaPct: 12, slaRemaining: '13:10:00', created: '5h ago', updated: '5h ago' },
    { id: 'PV-10285', subject: 'Delayed lab results communication', patient: 'Bui I.', dept: 'Laboratory', type: 'complaint', priority: 'high', status: 'unresolved', channel: 'email', assignee: 'u3', slaPct: 100, slaRemaining: '00:00:00', created: '8h ago', updated: '3h ago', breached: true },
    { id: 'PV-10284', subject: 'Appreciation for ER triage speed', patient: 'Anonymous', dept: 'Emergency', type: 'compliment', priority: 'normal', status: 'resolved', channel: 'front_desk', assignee: 'u5', slaPct: 30, slaRemaining: '—', created: '1d ago', updated: '6h ago' },
  ];

  const kpis = {
    newToday: 42, week: 263, sla: 94.2, open: 318, overdue: 7,
  };

  const trend = [38, 44, 41, 52, 49, 58, 63, 55, 61, 70, 66, 74];
  const trendLabels = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

  const channelDist = [
    { channel: 'hotline', label: 'Hotline', value: 34, color: '#0d9488' },
    { channel: 'online_form', label: 'Online Form', value: 22, color: '#2563eb' },
    { channel: 'front_desk', label: 'Front Desk', value: 18, color: '#0e7490' },
    { channel: 'email', label: 'Email', value: 12, color: '#7c3aed' },
    { channel: 'social_media', label: 'Social', value: 9, color: '#ea580c' },
    { channel: 'suggestion_box', label: 'Suggestion', value: 5, color: '#94a3b8' },
  ];

  const topComplaints = [
    { label: 'Waiting time', value: 84 },
    { label: 'Staff attitude', value: 61 },
    { label: 'Billing & fees', value: 47 },
    { label: 'Communication', value: 39 },
    { label: 'Facilities & cleanliness', value: 28 },
  ];

  const topPraised = [
    { label: 'Emergency Dept.', value: 72 },
    { label: 'ICU Nursing', value: 64 },
    { label: 'Physiotherapy', value: 51 },
    { label: 'Maternity', value: 43 },
    { label: 'Pharmacy', value: 31 },
  ];

  const notifications = [
    { icon: 'alarm-clock-off', tone: 'critical', text: 'SLA breached on PV-10289 — Outpatient complaint', time: '3m' },
    { icon: 'alarm-clock', tone: 'warning', text: 'PV-10293 at 86% of SLA window', time: '4m' },
    { icon: 'user-plus', tone: 'info', text: 'PV-10291 assigned to Nam Do', time: '20m' },
    { icon: 'inbox', tone: 'primary', text: 'New compliment via Online Form — ICU', time: '14m' },
    { icon: 'arrow-up-circle', tone: 'accent', text: 'PV-10285 escalated to Dept. Manager', time: '1h' },
  ];

  const timeline = [
    { icon: 'inbox', tone: 'info', title: 'Ticket created', who: 'Hotline · Linh Vo', time: 'Today 09:02', body: 'Patient called the hotline reporting a long wait at the Radiology front desk.' },
    { icon: 'tag', tone: 'primary', title: 'Classified as Complaint · Urgent', who: 'Auto-routing rule R-04', time: 'Today 09:02' },
    { icon: 'user-plus', tone: 'accent', title: 'Assigned to Quang Le', who: 'Mai Tran', time: 'Today 09:08' },
    { icon: 'message-square', tone: 'neutral', title: 'Internal note added', who: 'Quang Le', time: 'Today 09:31', body: 'Contacted Radiology supervisor; reviewing queue staffing for the 8–10am peak.' },
    { icon: 'phone', tone: 'secondary', title: 'Patient contacted by phone', who: 'Quang Le', time: 'Today 10:15' },
  ];

  return { agents, tickets, kpis, trend, trendLabels, channelDist, topComplaints, topPraised, notifications, timeline };
})();
