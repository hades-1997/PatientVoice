<?php

/**
 * @Project NUKEVIET 4.x
 * @Module  patient_voice — Quản lý ý kiến bệnh nhân (PatientVoice)
 * @License GNU/GPL version 2 or any later version
 */

if (!defined('NV_ADMIN') or !defined('NV_MAINFILE')) {
    die('Stop!!!');
}

$module_version = [
    'name'         => 'PatientVoice',
    'modfuncs'     => 'main,detail,search',
    'submenu'      => 'content,analytics,setting',
    'is_sysmod'    => 0,
    'virtual'      => 1,
    'version'      => '1.0.00',
    'date'         => 'Sat, 21 Jun 2026 07:00:00 GMT',
    'author'       => 'Hospital Quality Dept.',
    'note'         => 'Hospital patient feedback management system',
    'uploads_dir'  => [$module_upload, $module_upload . '/attachments'],
    'files_dir'    => [],
];
