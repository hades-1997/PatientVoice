<?php

/**
 * @Project NUKEVIET 4.x
 * @Module  patient_voice — Public feedback submission form
 * @License GNU/GPL version 2 or any later version
 */

if (!defined('NV_IS_MOD_PATIENT_VOICE')) {
    die('Stop!!!');
}

$errors        = [];
$success       = false;
$new_ticket_no = '';

/* ── Default form data ───────────────────────── */
$fdata = [
    'subject'       => '',
    'patient_name'  => '',
    'patient_phone' => '',
    'patient_email' => '',
    'feedback_type' => PV_TYPE_COMPLAINT,
    'dept_id'       => 0,
    'body'          => '',
];

/* ── POST handler ────────────────────────────── */
if ($nv_Request->get_int('submit', 'post', 0)) {

    $fdata = [
        'subject'       => $nv_Request->get_title('subject',        'post', ''),
        'patient_name'  => $nv_Request->get_title('patient_name',   'post', ''),
        'patient_phone' => $nv_Request->get_string('patient_phone', 'post', ''),
        'patient_email' => $nv_Request->get_string('patient_email', 'post', ''),
        'feedback_type' => $nv_Request->get_int('feedback_type',    'post', PV_TYPE_COMPLAINT),
        'dept_id'       => $nv_Request->get_int('dept_id',          'post', 0),
        'body'          => $nv_Request->get_string('body',          'post', ''),
    ];

    /* Validate */
    if (trim($fdata['subject']) === '')      { $errors[] = $lang_module['err_subject']; }
    if ($fdata['dept_id'] <= 0)              { $errors[] = $lang_module['err_dept']; }
    if (trim($fdata['patient_name']) === '') { $errors[] = $lang_module['err_name']; }
    if (trim($fdata['patient_phone']) === '') { $errors[] = $lang_module['err_phone']; }

    if (empty($errors)) {
        $T = NV_PREFIXLANG . '_' . $module_data;

        try {
            $db->beginTransaction();

            $ticket_no    = pv_next_ticket_no();
            $sla_deadline = pv_sla_deadline(PV_PRIORITY_NORMAL, NV_CURRENTTIME);

            $sth = $db->prepare(
                "INSERT INTO {$T}_feedback
                 (ticket_no, subject, feedback_type, priority, channel, dept_id, status,
                  patient_name, patient_phone, patient_email, sla_deadline, addtime, edittime)
                 VALUES (:tn,:sub,:ft,:pri,:ch,:di,:st,:pn,:pp,:pe,:sl,:at,:et)"
            );
            $sth->execute([
                ':tn'  => $ticket_no,
                ':sub' => $fdata['subject'],
                ':ft'  => $fdata['feedback_type'],
                ':pri' => PV_PRIORITY_NORMAL,
                ':ch'  => PV_CHANNEL_ONLINE_FORM,
                ':di'  => $fdata['dept_id'],
                ':st'  => PV_STATUS_NEW,
                ':pn'  => $fdata['patient_name'],
                ':pp'  => $fdata['patient_phone'],
                ':pe'  => $fdata['patient_email'],
                ':sl'  => $sla_deadline,
                ':at'  => NV_CURRENTTIME,
                ':et'  => NV_CURRENTTIME,
            ]);
            $feedback_id = (int) $db->lastInsertId();

            if (trim($fdata['body']) !== '') {
                $sth2 = $db->prepare(
                    "INSERT INTO {$T}_feedback_detail (feedback_id, body) VALUES (:fi,:b)"
                );
                $sth2->execute([':fi' => $feedback_id, ':b' => $fdata['body']]);
            }

            pv_add_timeline(
                $feedback_id,
                'created',
                'Phiếu được tạo qua kênh trực tuyến',
                $fdata['patient_name'] . ' đã gửi phản hồi qua website.',
                0
            );

            $db->commit();
            $nv_Cache->delMod($module_name);

            $new_ticket_no = $ticket_no;
            $success       = true;
            $fdata         = array_fill_keys(array_keys($fdata), '');
            $fdata['feedback_type'] = PV_TYPE_COMPLAINT;

        } catch (Exception $e) {
            $db->rollBack();
            $errors[] = $lang_module['submit_err'];
        }
    }
}

/* ── Build dropdown HTML ─────────────────────── */
$depts     = pv_dept_list();
$dept_opts = '<option value="0">' . htmlspecialchars($lang_module['dept_placeholder']) . '</option>';
foreach ($depts as $dept) {
    $sel       = ((int)$dept['id'] === (int)$fdata['dept_id']) ? ' selected' : '';
    $dept_opts .= '<option value="' . $dept['id'] . '"' . $sel . '>' . htmlspecialchars($dept['name']) . '</option>';
}

$type_map = [
    PV_TYPE_COMPLAINT  => $lang_module['type_1'],
    PV_TYPE_COMPLIMENT => $lang_module['type_2'],
    PV_TYPE_INQUIRY    => $lang_module['type_3'],
    PV_TYPE_SUGGESTION => $lang_module['type_4'],
    PV_TYPE_INCIDENT   => $lang_module['type_5'],
];
$type_opts = '<option value="0">' . htmlspecialchars($lang_module['type_placeholder']) . '</option>';
foreach ($type_map as $val => $label) {
    $sel       = ($val === (int)$fdata['feedback_type']) ? ' selected' : '';
    $type_opts .= '<option value="' . $val . '"' . $sel . '>' . htmlspecialchars($label) . '</option>';
}

/* ── URLs ────────────────────────────────────── */
$_qbase      = NV_BASE_SITEURL . 'index.php?' . NV_LANG_VARIABLE . '=' . NV_LANG_DATA . '&' . NV_NAME_VARIABLE . '=' . $module_name;
$form_action = htmlspecialchars($_qbase . '&' . NV_OP_VARIABLE . '=main');
$lookup_url  = htmlspecialchars($_qbase . '&' . NV_OP_VARIABLE . '=detail');

/* ── Render ─────────────────────────────────── */
$page_title = $lang_module['main_title'];
$contents   = pv_theme_main([
    'form_action' => $form_action,
    'dept_opts'   => $dept_opts,
    'type_opts'   => $type_opts,
    'form_data'   => [
        'subject'       => htmlspecialchars($fdata['subject']),
        'patient_name'  => htmlspecialchars($fdata['patient_name']),
        'patient_phone' => htmlspecialchars($fdata['patient_phone']),
        'patient_email' => htmlspecialchars($fdata['patient_email']),
        'body'          => htmlspecialchars($fdata['body']),
    ],
    'success'    => $success,
    'ticket_no'  => $new_ticket_no,
    'errors'     => $errors,
    'lookup_url' => $lookup_url,
]);

include NV_ROOTDIR . '/includes/header.php';
echo nv_site_theme($contents);
include NV_ROOTDIR . '/includes/footer.php';
