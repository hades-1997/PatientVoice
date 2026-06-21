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

$id = $nv_Request->get_int('id','get,post',0);
$savekp = $nv_Request->get_int('savekp','get,post',0);

if($id  > 0) {
    $sql = 'SELECT id,tenkhoa,account FROM '. NV_PREFIXLANG . '_' . $module_data . '_khoaphong WHERE id = '.$id;
    $res = $db->query($sql)->fetch();
}  

if($savekp >0) {
         
    $account = $nv_Request->get_title('account','get,post','');
    $tenkhoa = $nv_Request->get_title('tenkhoa','get,post','');
    if($id > 0 ) {
        $sth = $db->prepare('UPDATE '. NV_PREFIXLANG . '_' . $module_data . '_khoaphong SET account= :account,tenkhoa=:tenkhoa,status=1,_show=1,STT=1,edit_time='.NV_CURRENTTIME.' WHERE id = '.$id);
    }else {
        $sth = $db->prepare('INSERT INTO '. NV_PREFIXLANG . '_' . $module_data . '_khoaphong (account, tenkhoa, status, _show, STT, add_time, edit_time) VALUES (:account, :tenkhoa, 1, 1, 1, '.NV_CURRENTTIME.', '.NV_CURRENTTIME.')');
    }
    $sth->bindParam(':account', $account, PDO::PARAM_STR);
    $sth->bindParam(':tenkhoa', $tenkhoa, PDO::PARAM_STR);
    $sth->execute();
    nv_redirect_location(NV_BASE_ADMINURL . 'index.php?' . NV_LANG_VARIABLE . '=' . NV_LANG_DATA . '&amp;' . NV_NAME_VARIABLE . '=' . $module_name . '&amp;' . NV_OP_VARIABLE . '=khoaphong');
}


$xtpl = new XTemplate('add_groupuser.tpl', NV_ROOTDIR . '/themes/' . $global_config['module_theme'] . '/modules/' . $module_file);
$xtpl->assign('LANG', $lang_module);
$xtpl->assign('NV_BASE_ADMINURL', NV_BASE_ADMINURL);
$xtpl->assign('NV_NAME_VARIABLE', NV_NAME_VARIABLE);
$xtpl->assign('MODULE_NAME', $module_name);
$xtpl->assign('NV_OP_VARIABLE', NV_OP_VARIABLE);
$xtpl->assign('OP', $op);
$xtpl->assign('id', $id );
$xtpl->assign('DATA', $res);


$xtpl->parse('main');
$contents .= $xtpl->text('main');

include NV_ROOTDIR . '/includes/header.php';
echo nv_admin_theme($contents);
include NV_ROOTDIR . '/includes/footer.php';

