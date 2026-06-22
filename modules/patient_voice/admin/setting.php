<?php

/**
 * @Project NUKEVIET 4.x
 * @Module  patient_voice — Module settings
 * @License GNU/GPL version 2 or any later version
 */

if (!defined('NV_IS_FILE_ADMIN')) {
    die('Stop!!!');
}

$page_title = $lang_module['setting_title'];

/* ── Config keys with defaults ───────────────────────────── */
$defaults = [
    'sla_urgent'     => 4,
    'sla_high'       => 24,
    'sla_normal'     => 72,
    'per_page'       => 20,
    'ticket_prefix'  => 'PV',
    'hospital_name'  => 'Bệnh viện',
    'enable_sla'     => 1,
];

/* Load current values */
$config = [];
foreach ($defaults as $key => $default) {
    $config[$key] = pv_config($key, $default);
}

$saved      = false;
$save_error = false;

/* ── POST: save ──────────────────────────────────────────── */
if ($nv_Request->get_int('save', 'post', 0)) {

    $prefix = strtoupper(
        preg_replace('/[^A-Z0-9]/i', '',
            $nv_Request->get_string('ticket_prefix', 'post', 'PV'))
    );

    $new = [
        'sla_urgent'    => max(1, $nv_Request->get_int('sla_urgent',    'post', 4)),
        'sla_high'      => max(1, $nv_Request->get_int('sla_high',      'post', 24)),
        'sla_normal'    => max(1, $nv_Request->get_int('sla_normal',    'post', 72)),
        'per_page'      => max(5, min(200, $nv_Request->get_int('per_page', 'post', 20))),
        'ticket_prefix' => empty($prefix) ? 'PV' : substr($prefix, 0, 10),
        'hospital_name' => $nv_Request->get_title('hospital_name', 'post', 'Bệnh viện'),
        'enable_sla'    => $nv_Request->get_int('enable_sla', 'post', 0) ? 1 : 0,
    ];

    $T   = NV_PREFIXLANG . '_' . $module_data;
    $sth = $db->prepare(
        "INSERT INTO {$T}_config (name, value) VALUES (:name, :val)
         ON DUPLICATE KEY UPDATE value = :val2"
    );

    $ok = true;
    foreach ($new as $name => $val) {
        if (!$sth->execute([':name' => $name, ':val' => $val, ':val2' => $val])) {
            $ok = false;
        }
    }

    if ($ok) {
        $nv_Cache->delMod($module_name);
        nv_insert_logs(NV_LANG_DATA, $module_name, $lang_module['setting_saved'], '', $admin_info['userid']);
        $saved  = true;
        $config = $new;
    } else {
        $save_error = true;
    }
}

/* ── XTemplate ───────────────────────────────────────────── */
$xtpl = new XTemplate('setting.tpl', NV_ROOTDIR . '/themes/' . $global_config['module_theme'] . '/modules/' . $module_file);

$xtpl->assign('LANG',             $lang_module);
$xtpl->assign('NV_NAME_VARIABLE', NV_NAME_VARIABLE);
$xtpl->assign('NV_OP_VARIABLE',   NV_OP_VARIABLE);
$xtpl->assign('NV_LANG_VARIABLE', NV_LANG_VARIABLE);
$xtpl->assign('NV_LANG_DATA',     NV_LANG_DATA);
$xtpl->assign('MODULE_NAME',      $module_name);
$xtpl->assign('FORM_ACTION',      htmlspecialchars(pv_admin_url('setting')));
$xtpl->assign('CONFIG', [
    'sla_urgent'     => (int)$config['sla_urgent'],
    'sla_high'       => (int)$config['sla_high'],
    'sla_normal'     => (int)$config['sla_normal'],
    'per_page'       => (int)$config['per_page'],
    'ticket_prefix'  => htmlspecialchars($config['ticket_prefix']),
    'hospital_name'  => htmlspecialchars($config['hospital_name']),
    'enable_sla_chk' => $config['enable_sla'] ? ' checked' : '',
]);

if ($saved) {
    $xtpl->parse('main.saved_msg');
}
if ($save_error) {
    $xtpl->parse('main.error_msg');
}

$xtpl->parse('main');
$contents = $xtpl->text('main');

include NV_ROOTDIR . '/includes/header.php';
echo nv_admin_theme($contents);
include NV_ROOTDIR . '/includes/footer.php';
