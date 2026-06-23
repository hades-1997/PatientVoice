<?php

/**
 * @Project NUKEVIET 4.x
 * @Module  patient_voice — Admin: dashboard / feedback list
 * @License GNU/GPL version 2 or any later version
 */

if (!defined('NV_IS_FILE_ADMIN')) {
    die('Stop!!!');
}

$page_title = $lang_module['dash_title'];

/* ── Filters ─────────────────────────────────────────────── */
$filters = [
    'status'        => $nv_Request->get_int('status',        'get', 0),
    'priority'      => $nv_Request->get_int('priority',      'get', 0),
    'feedback_type' => $nv_Request->get_int('feedback_type', 'get', 0),
    'channel'       => $nv_Request->get_int('channel',       'get', 0),
    'dept_id'       => $nv_Request->get_int('dept_id',       'get', 0),
    'q'             => $nv_Request->get_string('q',          'get', ''),
];
$page     = max(1, $nv_Request->get_int('page', 'get', 1));
$per_page = (int) pv_config('per_page', 20);

/* ── Data ────────────────────────────────────────────────── */
$kpis  = pv_kpis();
$depts = pv_dept_list();

$active_filters = array_filter($filters, function ($v) { return $v !== 0 && $v !== ''; });
$result = pv_list_feedback($active_filters, $page, $per_page);

$total_pages = ($per_page > 0 && $result['total'] > 0) ? (int) ceil($result['total'] / $per_page) : 1;

/* ── Filter query string ─────────────────────────────────── */
$filter_qs = '';
foreach ($filters as $k => $v) {
    if ($v !== 0 && $v !== '') {
        $filter_qs .= '&' . $k . '=' . urlencode($v);
    }
}

/* ── Label maps ──────────────────────────────────────────── */
$status_labels = [
    PV_STATUS_NEW             => $lang_module['status_new'],
    PV_STATUS_ASSIGNED        => $lang_module['status_assigned'],
    PV_STATUS_IN_PROGRESS     => $lang_module['status_in_progress'],
    PV_STATUS_PENDING_CONFIRM => $lang_module['status_pending_confirm'],
    PV_STATUS_RESOLVED        => $lang_module['status_resolved'],
    PV_STATUS_UNRESOLVED      => $lang_module['status_unresolved'],
];
$priority_labels = [
    PV_PRIORITY_URGENT => $lang_module['priority_urgent'],
    PV_PRIORITY_HIGH   => $lang_module['priority_high'],
    PV_PRIORITY_NORMAL => $lang_module['priority_normal'],
];
$type_labels = [
    PV_TYPE_COMPLAINT  => $lang_module['type_complaint'],
    PV_TYPE_COMPLIMENT => $lang_module['type_compliment'],
    PV_TYPE_INQUIRY    => $lang_module['type_inquiry'],
    PV_TYPE_SUGGESTION => $lang_module['type_suggestion'],
    PV_TYPE_INCIDENT   => $lang_module['type_incident'],
];
$channel_labels = [
    PV_CHANNEL_HOTLINE        => $lang_module['channel_hotline'],
    PV_CHANNEL_ONLINE_FORM    => $lang_module['channel_online_form'],
    PV_CHANNEL_FRONT_DESK     => $lang_module['channel_front_desk'],
    PV_CHANNEL_EMAIL          => $lang_module['channel_email'],
    PV_CHANNEL_SOCIAL_MEDIA   => $lang_module['channel_social_media'],
    PV_CHANNEL_SUGGESTION_BOX => $lang_module['channel_suggestion_box'],
    PV_CHANNEL_NEWS_MEDIA     => $lang_module['channel_news_media'],
];

/* ── Dropdown HTML ───────────────────────────────────────── */
$status_opts = '<option value="0">' . $lang_module['filter_all_status'] . '</option>';
foreach ($status_labels as $val => $label) {
    $sel = ($filters['status'] == $val) ? ' selected' : '';
    $status_opts .= '<option value="' . $val . '"' . $sel . '>' . $label . '</option>';
}

$priority_opts = '<option value="0">' . $lang_module['filter_all_priority'] . '</option>';
foreach ($priority_labels as $val => $label) {
    $sel = ($filters['priority'] == $val) ? ' selected' : '';
    $priority_opts .= '<option value="' . $val . '"' . $sel . '>' . $label . '</option>';
}

$type_opts = '<option value="0">' . $lang_module['filter_all_type'] . '</option>';
foreach ($type_labels as $val => $label) {
    $sel = ($filters['feedback_type'] == $val) ? ' selected' : '';
    $type_opts .= '<option value="' . $val . '"' . $sel . '>' . $label . '</option>';
}

$channel_opts = '<option value="0">' . $lang_module['filter_all_channel'] . '</option>';
foreach ($channel_labels as $val => $label) {
    $sel = ($filters['channel'] == $val) ? ' selected' : '';
    $channel_opts .= '<option value="' . $val . '"' . $sel . '>' . $label . '</option>';
}

$dept_opts = '<option value="0">' . $lang_module['filter_all_dept'] . '</option>';
foreach ($depts as $dept) {
    $sel = ($filters['dept_id'] == $dept['id']) ? ' selected' : '';
    $dept_opts .= '<option value="' . $dept['id'] . '"' . $sel . '>'
               . htmlspecialchars($dept['name']) . '</option>';
}

/* ── XTemplate ───────────────────────────────────────────── */
$xtpl = new XTemplate('main.tpl', NV_ROOTDIR . '/themes/' . $global_config['module_theme'] . '/modules/' . $module_file);

$xtpl->assign('LANG',             $lang_module);
$xtpl->assign('NV_BASE_ADMINURL', NV_BASE_ADMINURL);
$xtpl->assign('NV_NAME_VARIABLE', NV_NAME_VARIABLE);
$xtpl->assign('NV_OP_VARIABLE',   NV_OP_VARIABLE);
$xtpl->assign('NV_LANG_VARIABLE', NV_LANG_VARIABLE);
$xtpl->assign('NV_LANG_DATA',     NV_LANG_DATA);
$xtpl->assign('MODULE_NAME',      $module_name);
$xtpl->assign('URL_NEW',          htmlspecialchars(pv_admin_url('admin_form')));
$xtpl->assign('URL_RESET',        htmlspecialchars(pv_admin_url('admin_list')));
$xtpl->assign('OP_LIST',          'admin_list');
$xtpl->assign('F_Q',              htmlspecialchars($filters['q']));
$xtpl->assign('STATUS_OPTS',      $status_opts);
$xtpl->assign('PRIORITY_OPTS',    $priority_opts);
$xtpl->assign('TYPE_OPTS',        $type_opts);
$xtpl->assign('CHANNEL_OPTS',     $channel_opts);
$xtpl->assign('DEPT_OPTS',        $dept_opts);

$xtpl->assign('KPI_NEW_TODAY', $kpis['new_today']);
$xtpl->assign('KPI_OPEN',      $kpis['open']);
$xtpl->assign('KPI_WEEK',      $kpis['week']);
$xtpl->assign('KPI_OVERDUE',   $kpis['overdue']);
$xtpl->assign('KPI_SLA_PCT',   $kpis['sla_pct']);

$page_start = $result['total'] > 0 ? ($page - 1) * $per_page + 1 : 0;
$page_end   = min($page * $per_page, $result['total']);
$xtpl->assign('TOTAL',      $result['total']);
$xtpl->assign('PAGE_START', $page_start);
$xtpl->assign('PAGE_END',   $page_end);

if (empty($result['rows'])) {
    $xtpl->parse('main.no_rows');
} else {
    foreach ($result['rows'] as $row) {
        [, $status_slug]           = pv_status_label($row['status']);
        [, $priority_slug]         = pv_priority_label($row['priority']);
        [, $type_icon, $type_slug] = pv_type_label($row['feedback_type']);

        $subject = $row['subject'];
        if (mb_strlen($subject) > 80) {
            $subject = mb_substr($subject, 0, 78) . '…';
        }

        if ($row['sla_deadline'] == 0) {
            $row['sla_remaining'] = '—';
            $row['sla_cls']       = '';
        } elseif (in_array((int)$row['status'], [PV_STATUS_RESOLVED, PV_STATUS_UNRESOLVED])) {
            $row['sla_remaining'] = $row['sla_breached'] ? '!' : '✓';
            $row['sla_cls']       = $row['sla_breached'] ? 'sla-breached' : 'sla-ok';
        } else {
            $row['sla_cls'] = $row['sla_breached']
                ? 'sla-breached'
                : ($row['sla_pct'] >= 80 ? 'sla-warning' : 'sla-ok');
        }

        $row['status_label']   = $status_labels[(int)$row['status']]     ?? '';
        $row['status_slug']    = $status_slug;
        $row['priority_label'] = $priority_labels[(int)$row['priority']] ?? '';
        $row['priority_slug']  = $priority_slug;
        $row['type_label']     = $type_labels[(int)$row['feedback_type']] ?? '';
        $row['type_icon']      = $type_icon;
        $row['dept_name']      = htmlspecialchars($row['dept_name'] ?? '—');
        $row['assignee_name']  = $row['assignee_name'] ? htmlspecialchars($row['assignee_name']) : '—';
        $row['subject']        = htmlspecialchars($subject);
        $row['patient_name']   = htmlspecialchars($row['patient_name']);
        $row['addtime_fmt']    = date('d/m/Y H:i', $row['addtime']);
        $row['url_detail']     = htmlspecialchars(pv_admin_url('admin_detail', 'id=' . (int)$row['id']));

        $xtpl->assign('ROW', $row);
        $xtpl->parse('main.loop_rows');
    }
}

if ($total_pages > 1) {
    $xtpl->assign('PREV_URL', htmlspecialchars(pv_admin_url('admin_list', 'page=' . max(1, $page - 1) . $filter_qs)));
    $xtpl->assign('NEXT_URL', htmlspecialchars(pv_admin_url('admin_list', 'page=' . min($total_pages, $page + 1) . $filter_qs)));
    $xtpl->assign('PREV_DIS', ($page <= 1) ? 'disabled' : '');
    $xtpl->assign('NEXT_DIS', ($page >= $total_pages) ? 'disabled' : '');

    $p_from = max(1, $page - 2);
    $p_to   = min($total_pages, $page + 2);
    for ($i = $p_from; $i <= $p_to; $i++) {
        $xtpl->assign('PAGER', [
            'num'    => $i,
            'active' => ($i == $page) ? 'active' : '',
            'url'    => htmlspecialchars(pv_admin_url('admin_list', 'page=' . $i . $filter_qs)),
        ]);
        $xtpl->parse('main.pagination.loop_pages');
    }
    $xtpl->parse('main.pagination');
}

$xtpl->parse('main');
$contents = $xtpl->text('main');

include NV_ROOTDIR . '/includes/header.php';
echo nv_admin_theme($contents);
include NV_ROOTDIR . '/includes/footer.php';
