<?php

/**
 * @Project NUKEVIET 4.x
 * @Module  patient_voice — Frontend display functions
 * @License GNU/GPL version 2 or any later version
 */

if (!defined('NV_IS_MOD_PATIENT_VOICE')) {
    die('Stop!!!');
}

function pv_theme_main($d)
{
    global $module_file, $module_info, $lang_module;

    $xtpl = new XTemplate('main.tpl', NV_ROOTDIR . '/themes/' . $module_info['template'] . '/modules/' . $module_info['module_theme']);
    $xtpl->assign('LANG',        $lang_module);
    $xtpl->assign('FORM_ACTION', $d['form_action']);
    $xtpl->assign('DEPT_OPTS',   $d['dept_opts']);
    $xtpl->assign('TYPE_OPTS',   $d['type_opts']);
    $xtpl->assign('DATA',        $d['form_data']);
    $xtpl->assign('LOOKUP_URL',  $d['lookup_url']);

    if (!empty($d['success'])) {
        $xtpl->assign('SUCCESS_MSG', sprintf($lang_module['submit_ok_body'], htmlspecialchars($d['ticket_no'])));
        $xtpl->assign('LOOKUP_URL',  $d['lookup_url']);
        $xtpl->parse('main.submit_ok');
    } else {
        if (!empty($d['errors'])) {
            foreach ($d['errors'] as $err) {
                $xtpl->assign('ERR', htmlspecialchars($err));
                $xtpl->parse('main.form_block.error_list.error_item');
            }
            $xtpl->parse('main.form_block.error_list');
        }
        $xtpl->parse('main.form_block');
    }

    $xtpl->parse('main');
    return $xtpl->text('main');
}

function pv_theme_detail($d)
{
    global $module_file, $module_info, $lang_module;

    $xtpl = new XTemplate('detail.tpl', NV_ROOTDIR . '/themes/' . $module_info['template'] . '/modules/' . $module_info['module_theme']);
    $xtpl->assign('LANG',        $lang_module);
    $xtpl->assign('FORM_ACTION', $d['form_action']);
    $xtpl->assign('QUERY', [
        'ticket' => htmlspecialchars($d['q_ticket']),
        'phone'  => htmlspecialchars($d['q_phone']),
    ]);

    if (!empty($d['not_found'])) {
        $xtpl->parse('main.not_found');
    }

    if (!empty($d['row'])) {
        $xtpl->assign('ROW', $d['row']);

        if (empty($d['timeline'])) {
            $xtpl->parse('main.result_block.no_timeline');
        } else {
            foreach ($d['timeline'] as $t) {
                $xtpl->assign('TLINE', $t);
                if (!empty($t['body'])) {
                    $xtpl->parse('main.result_block.loop_timeline.tline_has_body');
                }
                $xtpl->parse('main.result_block.loop_timeline');
            }
        }
        $xtpl->parse('main.result_block');
    }

    /* Always show lookup form (above or below result) */
    $xtpl->parse('main.lookup_form');

    $xtpl->parse('main');
    return $xtpl->text('main');
}
