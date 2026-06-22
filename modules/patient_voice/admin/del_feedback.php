<?php

/**
 * @Project NUKEVIET 4.x
 * @Module  patient_voice — Delete feedback (POST action, redirects after)
 * @License GNU/GPL version 2 or any later version
 */

if (!defined('NV_IS_FILE_ADMIN')) {
    die('Stop!!!');
}

$id = $nv_Request->get_int('id', 'post', 0);
if ($id <= 0) {
    nv_redirect_location(pv_admin_url('main'));
    exit();
}

$T = NV_PREFIXLANG . '_' . $module_data;

/* Delete child rows first to avoid FK constraint issues */
$db->exec("DELETE FROM {$T}_feedback_timeline WHERE feedback_id=" . $id);
$db->exec("DELETE FROM {$T}_feedback_detail   WHERE feedback_id=" . $id);
$deleted = $db->exec("DELETE FROM {$T}_feedback WHERE id=" . $id);

if ($deleted) {
    $nv_Cache->delMod($module_name);
    nv_insert_logs(NV_LANG_DATA, $module_name, $lang_module['delete_ok'], 'Feedback ID: ' . $id, $admin_info['userid']);
}

nv_redirect_location(pv_admin_url('main'));
exit();
