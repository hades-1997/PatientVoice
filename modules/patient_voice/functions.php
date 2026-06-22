<?php

/**
 * @Project NUKEVIET 4.x
 * @Module  patient_voice — Frontend init / routing
 * @License GNU/GPL version 2 or any later version
 */

if (!defined('NV_SYSTEM')) {
    die('Stop!!!');
}

define('NV_IS_MOD_PATIENT_VOICE', true);

require_once NV_ROOTDIR . '/modules/' . $module_file . '/global.functions.php';

/* ── Route ── */
$op = $nv_Request->get_string('op', 'get', 'main');
if (!in_array($op, ['main', 'detail', 'search'], true)) {
    $op = 'main';
}

$page_title = $module_info['site_title'];
$contents   = '';

include NV_ROOTDIR . '/modules/' . $module_file . '/theme.php';
include NV_ROOTDIR . '/modules/' . $module_file . '/funcs/' . $op . '.php';
