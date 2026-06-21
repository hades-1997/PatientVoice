<?php

/**
 * @Project NUKEVIET 4.x
 * @Author VINADES.,JSC (contact@vinades.vn)
 * @Copyright (C) 2014 VINADES.,JSC. All rights reserved
 * @License GNU/GPL version 2 or any later version
 * @Createdate 3-31-2010 0:33
 */

if (! defined('NV_IS_MOD_DAOTAO')) {
    die('Stop_main!!!');
}

nv_redirect_location(MODULE_LINK . '&' . NV_OP_VARIABLE . '=baocao_daotao');
if (empty($user_info)){	$url = MODULE_LINK . '&' . NV_OP_VARIABLE . '=login';nv_redirect_location($url); exit();}
	$thongke=array();
	$xtpl = new XTemplate('main.tpl', NV_ROOTDIR . '/themes/' . $module_info['template'] . '/modules/' . $module_info['module_theme']);
    $xtpl->assign('BASE_URL', NV_BASE_SITEURL);
	$xtpl->assign('URL_THEMES', NV_BASE_SITEURL.'themes/cpanel');
	$xtpl->assign('thoigian', date('H:i d/m/Y'));
	
	$xtpl->assign('link', MODULE_LINK . '&' . NV_OP_VARIABLE . '='.$op. '&sta=get_info');
	
	$xtpl->parse('main');
    $contents = $xtpl->text('main');

include NV_ROOTDIR . '/includes/header.php';
echo nv_site_theme($contents);
include NV_ROOTDIR . '/includes/footer.php';
