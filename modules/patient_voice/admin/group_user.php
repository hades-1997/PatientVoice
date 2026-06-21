<?php

/**
 * @Project NUKEVIET 4.x
 * @Author VINADES.,JSC (contact@vinades.vn)
 * @Copyright (C) 2017 VINADES.,JSC. All rights reserved
 * @License GNU/GPL version 2 or any later version
 * @Createdate 10 April 2017 17:00
 */

if (! defined('NV_IS_FILE_ADMIN')) {
    die('Stop!!!');
}

$error = '';

$sql = 'SELECT * FROM '. NV_PREFIXLANG . '_' . $module_data . '_groupuser WHERE status = 1 ORDER BY id ASC';
$res = $db->query($sql)->fetchAll();
 $destroy = $nv_Request->get_int('destroy', 'get,post', 0);
 
 if($destroy > 0){
    $id = $nv_Request->get_int('id', 'get,post', 0);
   
    if($id > 0){
        $db->query('DELETE FROM '. NV_PREFIXLANG . '_' . $module_data . '_groupuser WHERE id = ' . $id);
       echo 'OK';
       die();
        // nv_redirect_location(NV_BASE_ADMINURL . 'index.php?' . NV_LANG_VARIABLE . '=' . NV_LANG_DATA . '&amp;' . NV_NAME_VARIABLE . '=' . $module_name . '&amp;' . NV_OP_VARIABLE . '=group_user');
    } else {
       echo 'Không thể xóa tài khoản';
       die();
    }
 }
$xtpl = new XTemplate('group_user.tpl', NV_ROOTDIR . '/themes/' . $global_config['module_theme'] . '/modules/' . $module_file);
$xtpl->assign('LANG', $lang_module);
$xtpl->assign('NV_BASE_ADMINURL', NV_BASE_ADMINURL);
$xtpl->assign('NV_NAME_VARIABLE', NV_NAME_VARIABLE);
$xtpl->assign('MODULE_NAME', $module_name);
$xtpl->assign('NV_OP_VARIABLE', NV_OP_VARIABLE);
$xtpl->assign('OP', $op);
$xtpl->assign('PATH', NV_UPLOADS_DIR . '/' . $module_upload);
$xtpl->assign('ADD_KP', NV_BASE_ADMINURL . 'index.php?' . NV_LANG_VARIABLE . '=' . NV_LANG_DATA . '&amp;' . NV_NAME_VARIABLE . '=' . $module_name . '&amp;' . NV_OP_VARIABLE . '=add_account');
$xtpl->assign('MODULE_URL', NV_BASE_ADMINURL . 'index.php?' . NV_LANG_VARIABLE . '=' . NV_LANG_DATA . '&amp;' . NV_NAME_VARIABLE . '=' . $module_name . '&amp;' . NV_OP_VARIABLE . '=group_user');
if(!empty($res)) {
    $stt = 0;
    foreach($res as $row) {
        ++$stt;
        if($row['id_nhomquyen'] == 101 || $row['id_nhomquyen'] == 102) {
            $row['id_nhomquyen'] = 'Full Quyền';
        }else {
            $row['id_nhomquyen'] = 'Nhân Viên';
        }
        $row['edit'] = NV_BASE_ADMINURL . 'index.php?' . NV_LANG_VARIABLE . '=' . NV_LANG_DATA . '&amp;' . NV_NAME_VARIABLE . '=' . $module_name . '&amp;' . NV_OP_VARIABLE . '=add_account&id='.$row['id'];
        $row['destroy'] = NV_BASE_ADMINURL . 'index.php?' . NV_LANG_VARIABLE . '=' . NV_LANG_DATA . '&amp;' . NV_NAME_VARIABLE . '=' . $module_name . '&amp;' . NV_OP_VARIABLE . '=group_user&id='.$row['id'].'&destroy=1';
        $xtpl->assign('DATA', $row);
        $xtpl->assign('STT', $stt);
        $xtpl->parse('main.loop');
    }
}

if (! empty($error)) {
    $xtpl->assign('error', $error);
    $xtpl->parse('main.error');
}

$xtpl->parse('main');
$contents .= $xtpl->text('main');

include NV_ROOTDIR . '/includes/header.php';
echo nv_admin_theme($contents);
include NV_ROOTDIR . '/includes/footer.php';
