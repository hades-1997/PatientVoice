<?php

/**
 * @Project NUKEVIET 4.x
 * @Module  patient_voice — Admin: analytics & reporting
 * @License GNU/GPL version 2 or any later version
 */

if (!defined('NV_IS_FILE_ADMIN')) {
    die('Stop!!!');
}

$page_title = $lang_module['analytics_title'];

/* ── Period filter ───────────────────────────────── */
$period = $nv_Request->get_string('period', 'get', '30d');
if (!in_array($period, ['30d', '90d', 'ytd'], true)) {
    $period = '30d';
}

switch ($period) {
    case '90d': $days = 90; break;
    case 'ytd': $days = (int)ceil((NV_CURRENTTIME - mktime(0, 0, 0, 1, 1, date('Y'))) / 86400) + 1; break;
    default:    $days = 30;
}

$from = NV_CURRENTTIME - ($days * 86400);
$T    = NV_PREFIXLANG . '_' . $module_data;

/* ── KPIs ────────────────────────────────────────── */
$kpis = pv_kpis();

/* ── Monthly trend ───────────────────────────────── */
$trend_raw    = pv_monthly_trend();
$trend_labels = [];
$trend_data   = [];
foreach ($trend_raw as $r) {
    $parts          = explode('-', $r['ym']);
    $trend_labels[] = date('m/Y', mktime(0, 0, 0, (int)$parts[1], 1, (int)$parts[0]));
    $trend_data[]   = (int)$r['cnt'];
}

/* ── Channel distribution ────────────────────────── */
$channel_raw       = pv_channel_dist($days);
$channel_label_map = [
    PV_CHANNEL_HOTLINE        => $lang_module['channel_hotline'],
    PV_CHANNEL_ONLINE_FORM    => $lang_module['channel_online_form'],
    PV_CHANNEL_FRONT_DESK     => $lang_module['channel_front_desk'],
    PV_CHANNEL_EMAIL          => $lang_module['channel_email'],
    PV_CHANNEL_SOCIAL_MEDIA   => $lang_module['channel_social_media'],
    PV_CHANNEL_SUGGESTION_BOX => $lang_module['channel_suggestion_box'],
    PV_CHANNEL_NEWS_MEDIA     => $lang_module['channel_news_media'],
];
$channel_labels = [];
$channel_data   = [];
foreach ($channel_raw as $r) {
    $channel_labels[] = $channel_label_map[(int)$r['channel']] ?? 'Khác';
    $channel_data[]   = (int)$r['cnt'];
}

/* ── Type distribution ───────────────────────────── */
$type_raw  = $db->query(
    "SELECT feedback_type, COUNT(*) AS cnt FROM {$T}_feedback
     WHERE addtime >= {$from} GROUP BY feedback_type"
)->fetchAll(PDO::FETCH_ASSOC);

$type_keys  = [PV_TYPE_COMPLAINT, PV_TYPE_COMPLIMENT, PV_TYPE_INQUIRY, PV_TYPE_SUGGESTION, PV_TYPE_INCIDENT];
$type_names = ['Khiếu nại', 'Khen ngợi', 'Thắc mắc', 'Đề xuất', 'Sự cố'];
$type_data  = array_fill(0, count($type_keys), 0);
foreach ($type_raw as $r) {
    $idx = array_search((int)$r['feedback_type'], $type_keys);
    if ($idx !== false) { $type_data[$idx] = (int)$r['cnt']; }
}

/* ── Status distribution ─────────────────────────── */
$status_raw   = $db->query(
    "SELECT status, COUNT(*) AS cnt FROM {$T}_feedback
     WHERE addtime >= {$from} GROUP BY status"
)->fetchAll(PDO::FETCH_ASSOC);

$status_keys  = [PV_STATUS_NEW, PV_STATUS_ASSIGNED, PV_STATUS_IN_PROGRESS,
                 PV_STATUS_PENDING_CONFIRM, PV_STATUS_RESOLVED, PV_STATUS_UNRESOLVED];
$status_names = ['Mới', 'Phân công', 'Đang xử lý', 'Chờ xác nhận', 'Đã giải quyết', 'Không giải quyết'];
$status_data  = array_fill(0, count($status_keys), 0);
foreach ($status_raw as $r) {
    $idx = array_search((int)$r['status'], $status_keys);
    if ($idx !== false) { $status_data[$idx] = (int)$r['cnt']; }
}

/* ── Top departments ─────────────────────────────── */
$top_depts    = pv_top_dept_complaints(10);
$max_dept_cnt = 1;
foreach ($top_depts as $d) {
    if ((int)$d['cnt'] > $max_dept_cnt) { $max_dept_cnt = (int)$d['cnt']; }
}

/* ── Breach queue ────────────────────────────────── */
$now      = NV_CURRENTTIME;
$breached = $db->query(
    "SELECT f.id, f.ticket_no, f.subject, f.sla_deadline, f.addtime, d.name AS dept_name
     FROM {$T}_feedback f
     LEFT JOIN {$T}_dept d ON d.id = f.dept_id
     WHERE f.sla_deadline > 0 AND f.sla_deadline < {$now}
       AND f.status NOT IN (5,6)
     ORDER BY f.sla_deadline ASC LIMIT 10"
)->fetchAll(PDO::FETCH_ASSOC);

/* ── Period tabs ─────────────────────────────────── */
$period_tabs = '';
foreach ([
    '30d' => $lang_module['analytics_30d'],
    '90d' => $lang_module['analytics_90d'],
    'ytd' => $lang_module['analytics_ytd'],
] as $p => $plabel) {
    $active       = ($p === $period) ? ' class="active"' : '';
    $url          = htmlspecialchars(pv_admin_url('admin_analytics', 'period=' . $p));
    $period_tabs .= '<li' . $active . '><a href="' . $url . '">' . $plabel . '</a></li>';
}

/* ── XTemplate ───────────────────────────────────── */
$xtpl = new XTemplate('analytics.tpl', NV_ROOTDIR . '/themes/' . $global_config['module_theme'] . '/modules/' . $module_file);

$xtpl->assign('LANG',        $lang_module);
$xtpl->assign('PAGE_TITLE',  $lang_module['analytics_title']);
$xtpl->assign('PERIOD_TABS', $period_tabs);
$xtpl->assign('KPI', [
    'new_today' => number_format($kpis['new_today']),
    'open'      => number_format($kpis['open']),
    'week'      => number_format($kpis['week']),
    'overdue'   => number_format($kpis['overdue']),
    'sla_pct'   => number_format($kpis['sla_pct'], 1),
]);
$xtpl->assign('CHART', [
    'trend_labels'   => json_encode($trend_labels, JSON_UNESCAPED_UNICODE),
    'trend_data'     => json_encode($trend_data),
    'channel_labels' => json_encode($channel_labels, JSON_UNESCAPED_UNICODE),
    'channel_data'   => json_encode($channel_data),
    'type_labels'    => json_encode($type_names, JSON_UNESCAPED_UNICODE),
    'type_data'      => json_encode($type_data),
    'status_labels'  => json_encode($status_names, JSON_UNESCAPED_UNICODE),
    'status_data'    => json_encode($status_data),
]);

foreach ($top_depts as $d) {
    $pct = $max_dept_cnt > 0 ? round(((int)$d['cnt'] / $max_dept_cnt) * 100) : 0;
    $xtpl->assign('DEPT', [
        'name' => htmlspecialchars($d['name']),
        'cnt'  => (int)$d['cnt'],
        'pct'  => $pct,
    ]);
    $xtpl->parse('main.loop_top_depts');
}

if (empty($breached)) {
    $xtpl->parse('main.no_breach');
} else {
    foreach ($breached as $b) {
        $overdue_min = (int)round(($now - $b['sla_deadline']) / 60);
        $xtpl->assign('BREACH', [
            'ticket_no'   => htmlspecialchars($b['ticket_no']),
            'subject'     => htmlspecialchars($b['subject']),
            'dept_name'   => htmlspecialchars($b['dept_name'] ?? '—'),
            'overdue_fmt' => $overdue_min < 60
                ? $overdue_min . ' phút'
                : round($overdue_min / 60, 1) . ' giờ',
            'url_detail'  => htmlspecialchars(pv_admin_url('admin_detail', 'id=' . (int)$b['id'])),
        ]);
        $xtpl->parse('main.loop_breach');
    }
}

$xtpl->parse('main');
$contents = $xtpl->text('main');

include NV_ROOTDIR . '/includes/header.php';
echo nv_admin_theme($contents);
include NV_ROOTDIR . '/includes/footer.php';
