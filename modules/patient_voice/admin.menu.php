<?php

/**
 * @Project NUKEVIET 4.x
 * @Module  patient_voice — Admin menu + permissions
 * @License GNU/GPL version 2 or any later version
 */

if (!defined('NV_ADMIN')) {
    die('Stop!!!');
}

/* Allow access to these admin ops */
$allow_func = ['admin_list', 'admin_form', 'admin_detail', 'admin_analytics', 'admin_setting', 'admin_del'];

/* Admin sidebar menu */
$submenu['admin_list']      = $lang_module['menu_dashboard'];
$submenu['admin_form']      = $lang_module['menu_new_ticket'];
$submenu['admin_analytics'] = $lang_module['menu_analytics'];
$submenu['admin_setting']   = $lang_module['menu_setting'];
