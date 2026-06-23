<?php

/**
 * @Project NUKEVIET 4.x
 * @Module  patient_voice — Admin: intake form (create / edit)
 * @License GNU/GPL version 2 or any later version
 */

if (!defined('NV_IS_FILE_ADMIN')) {
    die('Stop!!!');
}

$id      = $nv_Request->get_int('id', 'get,post', 0);
$is_edit = ($id > 0);
$page_title = $is_edit ? $lang_module['intake_edit_title'] : $lang_module['intake_title'];

$data = [
    'id'            => 0,
    'ticket_no'     => '',
    'subject'       => '',
    'patient_name'  => '',
    'patient_phone' => '',
    'patient_email' => '',
    'dept_id'       => 0,
    'feedback_type' => PV_TYPE_COMPLAINT,
    'priority'      => PV_PRIORITY_NORMAL,
    'status'        => PV_STATUS_NEW,
    'channel'       => PV_CHANNEL_FRONT_DESK,
    'assignee_id'   => 0,
    'assignee_name' => '',
    'body'          => '',
    'addtime'       => 0,
];
$errors = [];

if ($is_edit) {
    $row = pv_get_feedback($id);
    if (!$row) {
        nv_redirect_location(pv_admin_url('admin_list'));
        exit();
    }
    foreach ($data as $k => $default) {
        if (isset($row[$k])) { $data[$k] = $row[$k]; }
    }
    $data['body'] = $row['body'] ?? '';
}

if ($nv_Request->get_int('save', 'post', 0)) {

    $post_id       = $nv_Request->get_int('id',            'post', 0);
    $subject       = $nv_Request->get_title('subject',      'post', '');
    $patient_name  = $nv_Request->get_title('patient_name', 'post', '');
    $patient_phone = $nv_Request->get_title('patient_phone','post', '');
    $patient_email = $nv_Request->get_title('patient_email','post', '');
    $dept_id       = $nv_Request->get_int('dept_id',        'post', 0);
    $feedback_type = $nv_Request->get_int('feedback_type',  'post', PV_TYPE_COMPLAINT);
    $priority      = $nv_Request->get_int('priority',       'post', PV_PRIORITY_NORMAL);
    $channel       = $nv_Request->get_int('channel',        'post', PV_CHANNEL_FRONT_DESK);
    $assignee_id   = $nv_Request->get_int('assignee_id',    'post', 0);
    $assignee_name = $nv_Request->get_title('assignee_name','post', '');
    $body          = $nv_Request->get_string('body',         'post', '');

    if (empty(trim($subject))) { $errors[] = $lang_module['error_subject']; }
    if ($dept_id <= 0)         { $errors[] = $lang_module['error_dept']; }

    if (empty($errors)) {
        if ($assignee_id > 0) {
            try {
                $urow = $db->query(
                    "SELECT username, full_name FROM " . NV_USERS_GLOBALTABLE
                    . " WHERE userid = " . intval($assignee_id)
                )->fetch();
                if ($urow) {
                    $assignee_name = $urow['full_name'] ?: $urow['username'];
                }
            } catch (Exception $e) {}
        }

        $T = NV_PREFIXLANG . '_' . $module_data;

        if ($post_id > 0) {
            $stmt = $db->prepare("UPDATE {$T}_feedback SET
                subject=:subject, patient_name=:pname, patient_phone=:pphone,
                patient_email=:pemail, dept_id=:dept, feedback_type=:ftype,
                priority=:priority, channel=:channel, assignee_id=:aid,
                assignee_name=:aname, sla_deadline=:sla, edittime=:now
                WHERE id=:id");
            $stmt->bindValue(':subject',  $subject);
            $stmt->bindValue(':pname',    $patient_name);
            $stmt->bindValue(':pphone',   $patient_phone);
            $stmt->bindValue(':pemail',   $patient_email);
            $stmt->bindValue(':dept',     $dept_id,       PDO::PARAM_INT);
            $stmt->bindValue(':ftype',    $feedback_type, PDO::PARAM_INT);
            $stmt->bindValue(':priority', $priority,      PDO::PARAM_INT);
            $stmt->bindValue(':channel',  $channel,       PDO::PARAM_INT);
            $stmt->bindValue(':aid',      $assignee_id,   PDO::PARAM_INT);
            $stmt->bindValue(':aname',    $assignee_name);
            $stmt->bindValue(':sla',      pv_sla_deadline($priority, $data['addtime'] ?: NV_CURRENTTIME), PDO::PARAM_INT);
            $stmt->bindValue(':now',      NV_CURRENTTIME, PDO::PARAM_INT);
            $stmt->bindValue(':id',       $post_id,       PDO::PARAM_INT);

            if ($stmt->execute()) {
                $db->prepare("INSERT INTO {$T}_feedback_detail (feedback_id, body)
                              VALUES (:fid,:body)
                              ON DUPLICATE KEY UPDATE body=:body2")
                   ->execute([':fid' => $post_id, ':body' => $body, ':body2' => $body]);

                pv_add_timeline($post_id, 'edit', 'Cập nhật thông tin phản hồi');
                $nv_Cache->delMod($module_name);
                nv_redirect_location(pv_admin_url('admin_detail', 'id=' . $post_id));
                exit();
            }
            $errors[] = $lang_module['save_error'];

        } else {
            $ticket_no  = pv_next_ticket_no();
            $sla        = pv_sla_deadline($priority);
            $new_status = ($assignee_id > 0) ? PV_STATUS_ASSIGNED : PV_STATUS_NEW;

            $stmt = $db->prepare("INSERT INTO {$T}_feedback
                (ticket_no, subject, patient_name, patient_phone, patient_email,
                 dept_id, feedback_type, priority, status, channel,
                 assignee_id, assignee_name, sla_deadline, created_by, addtime, edittime)
                VALUES
                (:tno,:subject,:pname,:pphone,:pemail,
                 :dept,:ftype,:priority,:status,:channel,
                 :aid,:aname,:sla,:cby,:now,:now)");
            $stmt->bindValue(':tno',      $ticket_no);
            $stmt->bindValue(':subject',  $subject);
            $stmt->bindValue(':pname',    $patient_name);
            $stmt->bindValue(':pphone',   $patient_phone);
            $stmt->bindValue(':pemail',   $patient_email);
            $stmt->bindValue(':dept',     $dept_id,       PDO::PARAM_INT);
            $stmt->bindValue(':ftype',    $feedback_type, PDO::PARAM_INT);
            $stmt->bindValue(':priority', $priority,      PDO::PARAM_INT);
            $stmt->bindValue(':status',   $new_status,    PDO::PARAM_INT);
            $stmt->bindValue(':channel',  $channel,       PDO::PARAM_INT);
            $stmt->bindValue(':aid',      $assignee_id,   PDO::PARAM_INT);
            $stmt->bindValue(':aname',    $assignee_name);
            $stmt->bindValue(':sla',      $sla,           PDO::PARAM_INT);
            $stmt->bindValue(':cby',      (int)$admin_info['userid'], PDO::PARAM_INT);
            $stmt->bindValue(':now',      NV_CURRENTTIME, PDO::PARAM_INT);

            if ($stmt->execute()) {
                $new_id = (int) $db->lastInsertId();
                if (!empty(trim($body))) {
                    $db->prepare("INSERT INTO {$T}_feedback_detail (feedback_id,body) VALUES (:fid,:body)")
                       ->execute([':fid' => $new_id, ':body' => $body]);
                }
                pv_add_timeline($new_id, 'created', 'Tiếp nhận phản hồi: ' . $ticket_no);
                if ($assignee_id > 0) {
                    pv_add_timeline($new_id, 'assigned', 'Phân công cho: ' . $assignee_name);
                }
                $nv_Cache->delMod($module_name);
                nv_redirect_location(pv_admin_url('admin_detail', 'id=' . $new_id));
                exit();
            }
            $errors[] = $lang_module['save_error'];
        }
    }

    $data = array_merge($data, [
        'id'            => $post_id,
        'subject'       => $subject,
        'patient_name'  => $patient_name,
        'patient_phone' => $patient_phone,
        'patient_email' => $patient_email,
        'dept_id'       => $dept_id,
        'feedback_type' => $feedback_type,
        'priority'      => $priority,
        'channel'       => $channel,
        'assignee_id'   => $assignee_id,
        'assignee_name' => $assignee_name,
        'body'          => $body,
    ]);
}

/* ── Dropdown HTML ───────────────────────────────────────── */
$depts     = pv_dept_list();
$dept_opts = '<option value="0">— ' . $lang_module['field_dept'] . ' —</option>';
foreach ($depts as $d) {
    $sel = ($data['dept_id'] == $d['id']) ? ' selected' : '';
    $dept_opts .= '<option value="' . $d['id'] . '"' . $sel . '>'
               . htmlspecialchars($d['name']) . '</option>';
}

$type_opts = '';
foreach ([
    PV_TYPE_COMPLAINT  => $lang_module['type_complaint'],
    PV_TYPE_COMPLIMENT => $lang_module['type_compliment'],
    PV_TYPE_INQUIRY    => $lang_module['type_inquiry'],
    PV_TYPE_SUGGESTION => $lang_module['type_suggestion'],
    PV_TYPE_INCIDENT   => $lang_module['type_incident'],
] as $val => $label) {
    $sel = ($data['feedback_type'] == $val) ? ' selected' : '';
    $type_opts .= '<option value="' . $val . '"' . $sel . '>' . $label . '</option>';
}

$priority_opts = '';
foreach ([
    PV_PRIORITY_URGENT => $lang_module['priority_urgent'],
    PV_PRIORITY_HIGH   => $lang_module['priority_high'],
    PV_PRIORITY_NORMAL => $lang_module['priority_normal'],
] as $val => $label) {
    $sel = ($data['priority'] == $val) ? ' selected' : '';
    $priority_opts .= '<option value="' . $val . '"' . $sel . '>' . $label . '</option>';
}

$channel_opts = '';
foreach ([
    PV_CHANNEL_HOTLINE        => $lang_module['channel_hotline'],
    PV_CHANNEL_ONLINE_FORM    => $lang_module['channel_online_form'],
    PV_CHANNEL_FRONT_DESK     => $lang_module['channel_front_desk'],
    PV_CHANNEL_EMAIL          => $lang_module['channel_email'],
    PV_CHANNEL_SOCIAL_MEDIA   => $lang_module['channel_social_media'],
    PV_CHANNEL_SUGGESTION_BOX => $lang_module['channel_suggestion_box'],
    PV_CHANNEL_NEWS_MEDIA     => $lang_module['channel_news_media'],
] as $val => $label) {
    $sel = ($data['channel'] == $val) ? ' selected' : '';
    $channel_opts .= '<option value="' . $val . '"' . $sel . '>' . $label . '</option>';
}

$assignee_opts = '<option value="0">' . $lang_module['field_unassigned'] . '</option>';
$has_sys_users = false;
try {
    $sys_users = $db->query(
        "SELECT userid, username, full_name FROM " . NV_USERS_GLOBALTABLE
        . " WHERE level >= 2 ORDER BY full_name, username ASC"
    )->fetchAll();
    foreach ($sys_users as $u) {
        $name = $u['full_name'] ?: $u['username'];
        $sel  = ($data['assignee_id'] == $u['userid']) ? ' selected' : '';
        $assignee_opts .= '<option value="' . $u['userid'] . '"' . $sel . '>'
                       . htmlspecialchars($name) . '</option>';
        $has_sys_users = true;
    }
} catch (Exception $e) {}

/* ── XTemplate ───────────────────────────────────────────── */
$xtpl = new XTemplate('content.tpl', NV_ROOTDIR . '/themes/' . $global_config['module_theme'] . '/modules/' . $module_file);

$xtpl->assign('LANG',             $lang_module);
$xtpl->assign('NV_BASE_ADMINURL', NV_BASE_ADMINURL);
$xtpl->assign('NV_NAME_VARIABLE', NV_NAME_VARIABLE);
$xtpl->assign('NV_OP_VARIABLE',   NV_OP_VARIABLE);
$xtpl->assign('NV_LANG_VARIABLE', NV_LANG_VARIABLE);
$xtpl->assign('NV_LANG_DATA',     NV_LANG_DATA);
$xtpl->assign('MODULE_NAME',      $module_name);
$xtpl->assign('PAGE_TITLE',       $page_title);
$xtpl->assign('FORM_ACTION',      htmlspecialchars($is_edit
    ? pv_admin_url('admin_form', 'id=' . $id)
    : pv_admin_url('admin_form')));
$xtpl->assign('URL_LIST',         htmlspecialchars(pv_admin_url('admin_list')));
$xtpl->assign('DEPT_OPTS',        $dept_opts);
$xtpl->assign('TYPE_OPTS',        $type_opts);
$xtpl->assign('PRIORITY_OPTS',    $priority_opts);
$xtpl->assign('CHANNEL_OPTS',     $channel_opts);
$xtpl->assign('ASSIGNEE_OPTS',    $assignee_opts);
$xtpl->assign('DATA', [
    'id'            => (int)$data['id'],
    'ticket_no'     => htmlspecialchars($data['ticket_no']),
    'subject'       => htmlspecialchars($data['subject']),
    'patient_name'  => htmlspecialchars($data['patient_name']),
    'patient_phone' => htmlspecialchars($data['patient_phone']),
    'patient_email' => htmlspecialchars($data['patient_email']),
    'assignee_name' => htmlspecialchars($data['assignee_name']),
    'body'          => htmlspecialchars($data['body']),
]);

if ($is_edit) { $xtpl->parse('main.edit_badge'); }
if (!$has_sys_users) { $xtpl->parse('main.assignee_manual'); }
if (!empty($errors)) {
    $xtpl->assign('ERRORS', implode('<br>', $errors));
    $xtpl->parse('main.error_block');
}

$xtpl->parse('main');
$contents = $xtpl->text('main');

include NV_ROOTDIR . '/includes/header.php';
echo nv_admin_theme($contents);
include NV_ROOTDIR . '/includes/footer.php';
