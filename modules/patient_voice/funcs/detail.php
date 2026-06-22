<?php

/**
 * @Project NUKEVIET 4.x
 * @Module  patient_voice — Public status lookup by ticket_no + phone
 * @License GNU/GPL version 2 or any later version
 */

if (!defined('NV_IS_MOD_PATIENT_VOICE')) {
    die('Stop!!!');
}

$q_ticket  = trim($nv_Request->get_string('ticket', 'get,post', ''));
$q_phone   = trim($nv_Request->get_string('phone',  'get,post', ''));
$not_found = false;
$row       = null;
$timeline  = [];

/* ── Lookup ──────────────────────────────────── */
if ($q_ticket !== '' && $q_phone !== '') {

    $T = NV_PREFIXLANG . '_' . $module_data;

    $sth = $db->prepare(
        "SELECT f.id, f.ticket_no, f.subject, f.status, f.feedback_type, f.addtime,
                d.name AS dept_name
         FROM {$T}_feedback f
         LEFT JOIN {$T}_dept d ON d.id = f.dept_id
         WHERE f.ticket_no = :tn AND f.patient_phone = :ph
         LIMIT 1"
    );
    $sth->execute([':tn' => $q_ticket, ':ph' => $q_phone]);
    $row = $sth->fetch(PDO::FETCH_ASSOC);

    if ($row) {
        /* Status label — public-friendly */
        $status_key_map = [
            PV_STATUS_NEW             => 'status_new',
            PV_STATUS_ASSIGNED        => 'status_assigned',
            PV_STATUS_IN_PROGRESS     => 'status_in_progress',
            PV_STATUS_PENDING_CONFIRM => 'status_pending_confirm',
            PV_STATUS_RESOLVED        => 'status_resolved',
            PV_STATUS_UNRESOLVED      => 'status_unresolved',
        ];
        $status_slug_map = [
            PV_STATUS_NEW             => 'new',
            PV_STATUS_ASSIGNED        => 'assigned',
            PV_STATUS_IN_PROGRESS     => 'in-progress',
            PV_STATUS_PENDING_CONFIRM => 'pending',
            PV_STATUS_RESOLVED        => 'resolved',
            PV_STATUS_UNRESOLVED      => 'unresolved',
        ];

        $row['status_label'] = $lang_module[$status_key_map[$row['status']] ?? 'status_new'];
        $row['status_slug']  = $status_slug_map[$row['status']] ?? 'new';
        $row['addtime_fmt']  = date('d/m/Y H:i', $row['addtime']);
        $row['subject']      = htmlspecialchars($row['subject']);
        $row['dept_name']    = htmlspecialchars($row['dept_name'] ?? '—');

        /* Type label */
        $type_map = [
            PV_TYPE_COMPLAINT  => $lang_module['type_1'],
            PV_TYPE_COMPLIMENT => $lang_module['type_2'],
            PV_TYPE_INQUIRY    => $lang_module['type_3'],
            PV_TYPE_SUGGESTION => $lang_module['type_4'],
            PV_TYPE_INCIDENT   => $lang_module['type_5'],
        ];
        $row['type_label'] = htmlspecialchars($type_map[$row['feedback_type']] ?? '—');

        /* Public timeline (is_internal = 0 only) */
        $sth2 = $db->prepare(
            "SELECT title, body, addtime FROM {$T}_feedback_timeline
             WHERE feedback_id = :fi AND is_internal = 0
             ORDER BY addtime ASC"
        );
        $sth2->execute([':fi' => $row['id']]);
        $raw = $sth2->fetchAll(PDO::FETCH_ASSOC);

        foreach ($raw as $t) {
            $timeline[] = [
                'title'       => htmlspecialchars($t['title']),
                'body'        => htmlspecialchars($t['body']),
                'addtime_fmt' => date('d/m/Y H:i', $t['addtime']),
            ];
        }

    } else {
        $not_found = true;
    }
}

/* ── URL ─────────────────────────────────────── */
$_qbase      = NV_BASE_SITEURL . 'index.php?' . NV_LANG_VARIABLE . '=' . NV_LANG_DATA . '&' . NV_NAME_VARIABLE . '=' . $module_name;
$form_action = htmlspecialchars($_qbase . '&' . NV_OP_VARIABLE . '=detail');

/* ── Render ─────────────────────────────────── */
$page_title = $lang_module['lookup_title'];
$contents   = pv_theme_detail([
    'form_action' => $form_action,
    'q_ticket'    => $q_ticket,
    'q_phone'     => $q_phone,
    'not_found'   => $not_found,
    'row'         => $row,
    'timeline'    => $timeline,
]);

include NV_ROOTDIR . '/includes/header.php';
echo nv_site_theme($contents);
include NV_ROOTDIR . '/includes/footer.php';
