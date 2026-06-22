<?php

/**
 * @Project NUKEVIET 4.x
 * @Module  patient_voice — Feedback detail: view + timeline + status change + assign + note
 * @License GNU/GPL version 2 or any later version
 */

if (!defined('NV_IS_FILE_ADMIN')) {
    die('Stop!!!');
}

$id = $nv_Request->get_int('id', 'get,post', 0);
if ($id <= 0) {
    nv_redirect_location(pv_admin_url('main'));
    exit();
}

$page_title = $lang_module['detail_title'];

/* ── Label maps (needed before POST handling for timeline messages) ── */
$status_labels = [
    PV_STATUS_NEW             => $lang_module['status_new'],
    PV_STATUS_ASSIGNED        => $lang_module['status_assigned'],
    PV_STATUS_IN_PROGRESS     => $lang_module['status_in_progress'],
    PV_STATUS_PENDING_CONFIRM => $lang_module['status_pending_confirm'],
    PV_STATUS_RESOLVED        => $lang_module['status_resolved'],
    PV_STATUS_UNRESOLVED      => $lang_module['status_unresolved'],
];
$type_labels = [
    PV_TYPE_COMPLAINT  => $lang_module['type_complaint'],
    PV_TYPE_COMPLIMENT => $lang_module['type_compliment'],
    PV_TYPE_INQUIRY    => $lang_module['type_inquiry'],
    PV_TYPE_SUGGESTION => $lang_module['type_suggestion'],
    PV_TYPE_INCIDENT   => $lang_module['type_incident'],
];
$priority_labels = [
    PV_PRIORITY_URGENT => $lang_module['priority_urgent'],
    PV_PRIORITY_HIGH   => $lang_module['priority_high'],
    PV_PRIORITY_NORMAL => $lang_module['priority_normal'],
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

/* ── Load record ────────────────────────────────────────────── */
$row = pv_get_feedback($id);
if (!$row) {
    nv_redirect_location(pv_admin_url('main'));
    exit();
}

/* ── POST action handlers ───────────────────────────────────── */
$action = $nv_Request->get_string('action', 'post', '');

if ($action === 'add_note') {
    $note_body   = $nv_Request->get_string('note_body',  'post', '');
    $is_internal = $nv_Request->get_int('is_internal', 'post', 1);
    if (!empty(trim($note_body))) {
        pv_add_timeline($id, 'note', 'Ghi chú', $note_body, $is_internal ? 1 : 0);
    }
    nv_redirect_location(pv_admin_url('detail', 'id=' . $id));
    exit();
}

if ($action === 'change_status') {
    $new_status   = $nv_Request->get_int('new_status', 'post', 0);
    $valid_states = [PV_STATUS_NEW, PV_STATUS_ASSIGNED, PV_STATUS_IN_PROGRESS,
                     PV_STATUS_PENDING_CONFIRM, PV_STATUS_RESOLVED, PV_STATUS_UNRESOLVED];

    if (in_array($new_status, $valid_states, true) && $new_status !== (int)$row['status']) {
        $T = NV_PREFIXLANG . '_' . $module_data;

        $extra_sql = '';
        if (in_array($new_status, [PV_STATUS_RESOLVED, PV_STATUS_UNRESOLVED], true)) {
            $extra_sql = ', resolved_by=' . (int)$admin_info['userid']
                       . ', resolved_at=' . NV_CURRENTTIME;
        }
        $db->exec("UPDATE {$T}_feedback
                   SET status=$new_status$extra_sql, edittime=" . NV_CURRENTTIME
                . " WHERE id=$id");

        $old_label = $status_labels[(int)$row['status']] ?? '?';
        $new_label = $status_labels[$new_status] ?? '?';
        pv_add_timeline($id, 'status_change',
            'Đổi trạng thái: ' . $old_label . ' → ' . $new_label);
        $nv_Cache->delMod($module_name);
    }
    nv_redirect_location(pv_admin_url('detail', 'id=' . $id));
    exit();
}

if ($action === 'assign') {
    $new_aid   = $nv_Request->get_int('assignee_id',   'post', 0);
    $new_aname = '';

    if ($new_aid > 0) {
        try {
            $ur = $db->query(
                "SELECT username, full_name FROM " . NV_USERS_GLOBALTABLE
                . " WHERE userid=" . intval($new_aid)
            )->fetch();
            if ($ur) {
                $new_aname = $ur['full_name'] ?: $ur['username'];
            }
        } catch (Exception $e) {}
    } else {
        $new_aname = $nv_Request->get_title('assignee_name', 'post', '');
    }

    $T          = NV_PREFIXLANG . '_' . $module_data;
    $new_status = ($new_aid > 0 && (int)$row['status'] === PV_STATUS_NEW)
                ? PV_STATUS_ASSIGNED : (int)$row['status'];

    $db->exec("UPDATE {$T}_feedback
               SET assignee_id=$new_aid,
                   assignee_name=" . $db->quote($new_aname) . ",
                   status=$new_status,
                   edittime=" . NV_CURRENTTIME
             . " WHERE id=$id");

    pv_add_timeline($id, 'assigned',
        $new_aname ? 'Phân công cho: ' . $new_aname : 'Hủy phân công');
    $nv_Cache->delMod($module_name);
    nv_redirect_location(pv_admin_url('detail', 'id=' . $id));
    exit();
}

/* ── Reload (picks up any changes from above) ───────────────── */
$row      = pv_get_feedback($id);
$timeline = pv_get_timeline($id);

/* ── SLA display ────────────────────────────────────────────── */
$sla_has      = ($row['sla_deadline'] > 0);
$sla_pct      = $sla_has ? pv_sla_pct($row['addtime'], $row['sla_deadline']) : 0;
$sla_breached = $sla_has && NV_CURRENTTIME > $row['sla_deadline'];
$is_closed    = in_array((int)$row['status'], [PV_STATUS_RESOLVED, PV_STATUS_UNRESOLVED], true);
$closed_ontime = ($is_closed && $row['sla_deadline'] > 0 && $row['resolved_at'] > 0
               && $row['resolved_at'] <= $row['sla_deadline']);

/* ── Status transition buttons HTML ────────────────────────── */
$status_transitions = [
    PV_STATUS_NEW             => [PV_STATUS_IN_PROGRESS, PV_STATUS_RESOLVED, PV_STATUS_UNRESOLVED],
    PV_STATUS_ASSIGNED        => [PV_STATUS_IN_PROGRESS, PV_STATUS_RESOLVED, PV_STATUS_UNRESOLVED],
    PV_STATUS_IN_PROGRESS     => [PV_STATUS_PENDING_CONFIRM, PV_STATUS_RESOLVED, PV_STATUS_UNRESOLVED],
    PV_STATUS_PENDING_CONFIRM => [PV_STATUS_RESOLVED, PV_STATUS_UNRESOLVED, PV_STATUS_IN_PROGRESS],
    PV_STATUS_RESOLVED        => [PV_STATUS_IN_PROGRESS],
    PV_STATUS_UNRESOLVED      => [PV_STATUS_IN_PROGRESS],
];
$status_btn_class = [
    PV_STATUS_NEW             => 'btn-default',
    PV_STATUS_ASSIGNED        => 'btn-primary',
    PV_STATUS_IN_PROGRESS     => 'btn-warning',
    PV_STATUS_PENDING_CONFIRM => 'btn-info',
    PV_STATUS_RESOLVED        => 'btn-success',
    PV_STATUS_UNRESOLVED      => 'btn-danger',
];
$detail_action_url = htmlspecialchars(pv_admin_url('detail', 'id=' . $id));

$status_btns_html = '';
foreach ($status_transitions[(int)$row['status']] ?? [] as $next) {
    $cls = $status_btn_class[$next] ?? 'btn-default';
    $lbl = $status_labels[$next] ?? '?';
    $status_btns_html .=
        '<form method="post" action="' . $detail_action_url . '" style="margin-bottom:5px">'
      . '<input type="hidden" name="' . NV_LANG_VARIABLE . '" value="' . NV_LANG_DATA . '">'
      . '<input type="hidden" name="' . NV_NAME_VARIABLE . '" value="' . $module_name . '">'
      . '<input type="hidden" name="' . NV_OP_VARIABLE   . '" value="detail">'
      . '<input type="hidden" name="action" value="change_status">'
      . '<input type="hidden" name="new_status" value="' . $next . '">'
      . '<button type="submit" class="btn ' . $cls . ' btn-sm btn-block">' . $lbl . '</button>'
      . '</form>';
}

/* ── Assignee dropdown for the reassign form ────────────────── */
$assignee_opts  = '<option value="0">' . $lang_module['field_unassigned'] . '</option>';
$has_sys_users  = false;
try {
    $sys_users = $db->query(
        "SELECT userid, username, full_name FROM " . NV_USERS_GLOBALTABLE
        . " WHERE level >= 2 ORDER BY full_name, username ASC"
    )->fetchAll();
    foreach ($sys_users as $u) {
        $name = $u['full_name'] ?: $u['username'];
        $sel  = ($row['assignee_id'] == $u['userid']) ? ' selected' : '';
        $assignee_opts .= '<option value="' . $u['userid'] . '"' . $sel . '>'
                       . htmlspecialchars($name) . '</option>';
        $has_sys_users = true;
    }
} catch (Exception $e) {}

/* ── Current labels ─────────────────────────────────────────── */
[, $status_slug]          = pv_status_label($row['status']);
[, $priority_slug]        = pv_priority_label($row['priority']);
[, $type_icon, $type_slug] = pv_type_label($row['feedback_type']);
[, $channel_icon]          = pv_channel_label($row['channel']);

/* ── Timeline event meta (icon, CSS class per event type) ────── */
$tline_meta = [
    'created'       => ['plus-circle',    'tline-created'],
    'edit'          => ['pencil',         'tline-edit'],
    'assigned'      => ['user-check',     'tline-assigned'],
    'status_change' => ['refresh-cw',     'tline-status'],
    'note'          => ['message-square', 'tline-note'],
    'escalated'     => ['alert-triangle', 'tline-danger'],
];

/* ── XTemplate ───────────────────────────────────────────────── */
$xtpl = new XTemplate('detail.tpl', NV_ROOTDIR . '/themes/' . $global_config['module_theme'] . '/modules/' . $module_file);

$xtpl->assign('LANG',             $lang_module);
$xtpl->assign('NV_BASE_ADMINURL', NV_BASE_ADMINURL);
$xtpl->assign('NV_NAME_VARIABLE', NV_NAME_VARIABLE);
$xtpl->assign('NV_OP_VARIABLE',   NV_OP_VARIABLE);
$xtpl->assign('NV_LANG_VARIABLE', NV_LANG_VARIABLE);
$xtpl->assign('NV_LANG_DATA',     NV_LANG_DATA);
$xtpl->assign('MODULE_NAME',      $module_name);
$xtpl->assign('FORM_ACTION',      $detail_action_url);
$xtpl->assign('URL_LIST',         htmlspecialchars(pv_admin_url('main')));
$xtpl->assign('URL_EDIT',         htmlspecialchars(pv_admin_url('content', 'id=' . $id)));
$xtpl->assign('FEEDBACK_ID',      $id);

/* Ticket header */
$xtpl->assign('TICKET_NO',      htmlspecialchars($row['ticket_no']));
$xtpl->assign('STATUS_LABEL',   $status_labels[(int)$row['status']] ?? '');
$xtpl->assign('STATUS_SLUG',    $status_slug);
$xtpl->assign('PRIORITY_LABEL', $priority_labels[(int)$row['priority']] ?? '');
$xtpl->assign('PRIORITY_SLUG',  $priority_slug);
$xtpl->assign('TYPE_LABEL',     $type_labels[(int)$row['feedback_type']] ?? '');
$xtpl->assign('TYPE_ICON',      $type_icon);
$xtpl->assign('CHANNEL_LABEL',  $channel_labels[(int)$row['channel']] ?? '');
$xtpl->assign('CHANNEL_ICON',   $channel_icon);
$xtpl->assign('DEPT_NAME',      htmlspecialchars($row['dept_name'] ?? '—'));
$xtpl->assign('SUBJECT',        htmlspecialchars($row['subject']));
$xtpl->assign('ADDTIME',        date('d/m/Y H:i', $row['addtime']));
$xtpl->assign('EDITTIME',       $row['edittime'] ? date('d/m/Y H:i', $row['edittime']) : '—');

/* Patient */
$xtpl->assign('PATIENT_NAME',  htmlspecialchars($row['patient_name'] ?: '—'));
$xtpl->assign('PATIENT_PHONE', htmlspecialchars($row['patient_phone'] ?: '—'));
$xtpl->assign('PATIENT_EMAIL', htmlspecialchars($row['patient_email'] ?: '—'));

/* Assignee */
$xtpl->assign('ASSIGNEE_NAME',  htmlspecialchars($row['assignee_name'] ?: $lang_module['field_unassigned']));
$xtpl->assign('ASSIGNEE_OPTS',  $assignee_opts);

/* Status buttons */
$xtpl->assign('STATUS_BTNS', $status_btns_html);
if (!$has_sys_users) {
    $xtpl->parse('main.assign_manual_input');
}

/* Body */
if (!empty(trim((string)$row['body']))) {
    $xtpl->assign('BODY_HTML', nl2br(htmlspecialchars($row['body'])));
    $xtpl->parse('main.has_body');
} else {
    $xtpl->parse('main.no_body');
}

/* SLA */
if (!$sla_has) {
    $xtpl->parse('main.sla_none');
} elseif ($is_closed) {
    $xtpl->assign('SLA_CLOSED_TEXT', $closed_ontime
        ? $lang_module['detail_on_track']
        : $lang_module['detail_sla_breached']);
    $xtpl->assign('SLA_CLOSED_CLS', $closed_ontime ? 'text-success' : 'text-danger');
    $xtpl->parse('main.sla_closed');
} else {
    $bar_class = $sla_pct >= 100 ? 'danger' : ($sla_pct >= 80 ? 'warning' : 'success');
    $xtpl->assign('SLA_PCT',         $sla_pct);
    $xtpl->assign('SLA_WIDTH',       min($sla_pct, 100));
    $xtpl->assign('SLA_REMAINING',   pv_sla_remaining($row['sla_deadline']));
    $xtpl->assign('SLA_BAR_CLASS',   $bar_class);
    $xtpl->assign('SLA_STATUS_TEXT', $sla_pct >= 100
        ? $lang_module['detail_sla_breached']
        : ($sla_pct >= 80 ? $lang_module['detail_due_soon'] : $lang_module['detail_on_track']));
    $xtpl->parse('main.sla_bar');
}

/* Timeline */
if (empty($timeline)) {
    $xtpl->parse('main.no_timeline');
} else {
    foreach ($timeline as $ev) {
        [$icon, $cls] = $tline_meta[$ev['event_type']] ?? ['circle', 'tline-note'];
        $tline = [
            'icon'        => $icon,
            'css'         => $cls,
            'title'       => htmlspecialchars($ev['title']),
            'actor'       => htmlspecialchars($ev['actor_name'] ?: 'System'),
            'addtime_fmt' => date('d/m/Y H:i', $ev['addtime']),
            'body'        => nl2br(htmlspecialchars($ev['body'] ?? '')),
            'internal_cls'=> $ev['is_internal'] ? 'pv-tline-internal' : '',
        ];
        $xtpl->assign('TLINE', $tline);
        if (!empty(trim($ev['body'] ?? ''))) {
            $xtpl->parse('main.loop_timeline.tline_has_body');
        }
        if ($ev['is_internal']) {
            $xtpl->parse('main.loop_timeline.tline_internal_badge');
        }
        $xtpl->parse('main.loop_timeline');
    }
}

$xtpl->parse('main');
$contents = $xtpl->text('main');

include NV_ROOTDIR . '/includes/header.php';
echo nv_admin_theme($contents);
include NV_ROOTDIR . '/includes/footer.php';
