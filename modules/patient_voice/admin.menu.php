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
$allow_func = ['main', 'content', 'detail', 'analytics', 'setting'];

/* Admin sidebar menu */
$submenu['main']      = $lang_module['menu_dashboard'];
$submenu['content']   = $lang_module['menu_new_ticket'];
$submenu['analytics'] = $lang_module['menu_analytics'];
$submenu['setting']   = $lang_module['menu_setting'];
