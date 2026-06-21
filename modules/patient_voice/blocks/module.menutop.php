<?php

/**
 * @Project NUKEVIET 4.x
 * @Author VINADES.,JSC (contact@vinades.vn)
 * @Copyright (C) 2017 VINADES.,JSC. All rights reserved
 * @License GNU/GPL version 2 or any later version
 * @Createdate 10 April 2017 17:00
 */

if (! defined('NV_IS_MOD_DAOTAO')) {
    die('Stop!!!');
}


if (! nv_function_exists('nv_qlnl_menutop')) {
    function nv_qlnl_menutop()
    {
        global $lang_module,$module_info,$module_data,$db,$user_info;

        $xtpl = new XTemplate('block_menutop.tpl', NV_ROOTDIR . '/themes/' . $module_info['template'] . '/modules/' . $module_info['module_theme']);
        $xtpl->assign('NV_BASE_SITEURL', NV_BASE_SITEURL);
        $xtpl->assign('link_user', MODULE_LINK . '&' . NV_OP_VARIABLE . '=usersetting');
		
		$user=array(); 
		$user=userinfo($user_info['userid']);
		if ($user['photo']==''){$user['photo']=NV_BASE_SITEURL . "uploads/noimage.jpg";}
		else $user['photo']=NV_BASE_SITEURL .$user['photo'];
		$user['link_out']=NV_BASE_SITEURL . 'index.php?' . NV_LANG_VARIABLE . '=' . NV_LANG_DATA . '&' . NV_NAME_VARIABLE . '=users&' . NV_OP_VARIABLE . '=logout';
        $user['name']= empty($user['last_name'])?$user['username']:$user['last_name'];
		$xtpl->assign('USER', $user);
        $msg=0;	
		$sql = 'SELECT count(id) as sl FROM ' . TABLE. "_notification WHERE status = 1 and nguoinhan like '".$user_info['username']."' and viewed=0";
		$_msg= $db->query($sql)->fetch();
		$msg_total =$_msg['sl'];
		$sql = 'SELECT * FROM ' . TABLE. "_notification WHERE status = 1 and nguoinhan like '".$user_info['username']."' ORDER BY tg_gui desc limit 0,5";
		$result = $db->query($sql);
		
		 while ($row = $result->fetch()) {
			//$row['tg_nhan']=nv_date('d/m/Y h:m',$row['ngaynhan']);
			$row['link_view']=MODULE_LINK . '&' . NV_OP_VARIABLE . '=notification';
			$row['tg_nhan']=$row['ngaynhan'];$row['b1']='';$row['b2']='';
			if ($row['viewed']==0) {++$msg; $row['b1']='<b>';$row['b2']='</b>';}
			$xtpl->assign('ROW', $row);
			$xtpl->parse('main.loop');
        }
		$xtpl->assign('reload', MODULE_LINK . '&' . NV_OP_VARIABLE . '=getthongtin&sta=get_notification');
		$xtpl->assign('viewall', MODULE_LINK . '&' . NV_OP_VARIABLE . '=notification');
		$xtpl->assign('msg_new', $msg_total>0?$msg_total:'');
		$xtpl->assign('lang', $lang_module);
		
		$xtpl->parse('main');
        return $xtpl->text('main');
    }

}

$content = nv_qlnl_menutop();
