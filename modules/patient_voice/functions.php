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

$page_title = $module_info['site_title'];

/* ── Route op ──────────────────────────────────────────── */
if (empty($op) || $op === 'main') {
    $op = 'main';
}
