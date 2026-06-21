<?php

/**
 * @Project NUKEVIET 4.x
 * @Author VINADES.,JSC (contact@vinades.vn)
 * @Copyright (C) 2014 VINADES.,JSC. All rights reserved
 * @License GNU/GPL version 2 or any later version
 * @Createdate 3-31-2010 0:33
 */

if (! defined('NV_IS_MOD_DAOTAO')) {
    die('Stop!!!');
}

if (empty($user_info)){	$url = MODULE_LINK . '&' . NV_OP_VARIABLE . '=login';nv_redirect_location($url); exit();}

	$thongke=array();
	$xtpl = new XTemplate('frm_notification.tpl', NV_ROOTDIR . '/themes/' . $module_info['template'] . '/modules/' . $module_info['module_theme']);
    $xtpl->assign('BASE_URL', NV_BASE_SITEURL);
    $xtpl->assign('URL_THEMES', NV_BASE_SITEURL. 'themes/' . $module_info['template']);
	$xtpl->assign('lang', $lang_module);
	
	$quyen = check_quyen($user_info);
	$tk_khoa=check_khoaphong($user_info['username']);
	
	
	$sta =$nv_Request->get_title('sta', 'get,post', '');
if ($sta=='dstinnhan')	
{
	//nguoinhan
	
	$stt=0;	

	$sql = 'SELECT * FROM ' . TABLE. "_notification WHERE status = 1 and nguoinhan like '".$user_info['username']."' ORDER BY tg_gui desc";

 	

	$result = $db->query($sql);
    while ($row = $result->fetch()) {
		//$row['tg_nhan']=nv_date('d/m/Y h:m',$row['ngaynhan']);
		$row['stt']=++$stt;$row['new']='';
		$row['trangthai']=$lang_module['trangthai'.$row['step']];
		$row['tg_nhan']=$row['ngaynhan'];
		$row['color_tt']=$lang_module['label'.$row['step']];;
		$row['link_view']=MODULE_LINK . '&' . NV_OP_VARIABLE . '='.$op.'&sta=detail_daotao&code_pro='.$row['code_pro'];
		$row['link_del']=MODULE_LINK . '&' . NV_OP_VARIABLE . '='.$op.'&sta=del_msg';
		if ($row['viewed']==0) {++$msg; $row['new']='font-weight: bold;';}

		if ($row['step']==1 and $user_info['username']=='dieuduong')
		{$xtpl->parse($sta.'.loop.admin'); }
		
		$xtpl->assign('ROW', $row);
		$xtpl->parse($sta.'.loop');
    }
	$xtpl->assign('viewall', MODULE_LINK . '&' . NV_OP_VARIABLE . '=notification');
	$xtpl->assign('link_del', MODULE_LINK . '&' . NV_OP_VARIABLE . '='.$op.'&sta=del_msg');
	$xtpl->parse($sta);
	$ketqua = $xtpl->text($sta);
	echo $ketqua; exit;
	
}

if ($sta=='detail_daotao')	
{
	$code=$nv_Request->get_title('code_pro', 'get,post', '');
	$stt=0;	
	$sql = 'SELECT * FROM ' . TABLE. "_notification WHERE status = 1 and code_pro like '".$code."'";
	$result = $db->query($sql)->fetch();
	if (!empty($result))
	{
		
		$sql = 'Update ' . TABLE. "_notification SET viewed=viewed+1 WHERE code_pro like '".$code."' and nguoinhan='".$user_info['username']."'";
		$stmt = $db->prepare($sql);
		$row_id=$stmt->execute();
		$result['tg_gui'] = nv_date('d/m/Y',$result['tg_gui']);
		
		if($result['step'] == 1) {
			//$_sql = 'SELECT ';
			$id = explode('_',$code);
			$token=md5($client_info['session_id'] . $global_config['sitekey']);
			$result['link_ena'] = NV_BASE_SITEURL . 'index.php?' . NV_LANG_VARIABLE . '=' . NV_LANG_DATA . '&amp;' . NV_NAME_VARIABLE . '=quanlynhanluc&' . NV_OP_VARIABLE . '=chitietdieuduong&token='.$id[0].'_'.$token;
			$result['btn_name'] = 'Duyệt khoá học';
		}else {
			$result['btn_name'] = 'Khoá học đã duyệt thành công !';
		}

		$xtpl->assign('link_frm', MODULE_LINK . '&' . NV_OP_VARIABLE . '=quanlynhanluc');
		$xtpl->assign('viewall', MODULE_LINK . '&' . NV_OP_VARIABLE . '=notification');
		$xtpl->assign('link_del', MODULE_LINK . '&' . NV_OP_VARIABLE . '='.$op.'&sta=del_msg');
		$xtpl->assign('CHECKSESS', md5($client_info['session_id'] . $global_config['sitekey']));
		$xtpl->assign('DATA', $result);	
		if($result['step'] == 1) {
			$xtpl->parse($sta.'.ena');
		}
		
		$sql = 'SELECT * FROM ' . TABLE. "_notification WHERE code_pro like '".$code."' and nguoinhan like '".$user_info['username']."'";
		$msg = $db->query($sql)->fetch();
	}
	
	$xtpl->parse($sta);
	$ketqua = $xtpl->text($sta);
	echo $ketqua; exit;
}
if ($sta=='del_msg')	
{
	$code=$nv_Request->get_title('code_pro', 'get,post', '');
	$sql = 'Update ' . TABLE. "_notification SET status=0, deleted=1, delete_by=:delete_by, 
	delete_date=:delete_date  WHERE code_pro like '".$code."'";
	$stmt = $db->prepare($sql);

	$stmt->bindParam(':delete_by', $user_info['username'], PDO::PARAM_STR);
	$stmt->bindParam(':delete_date', date('Y/m/d H:m'), PDO::PARAM_STR);
	$row_id=$stmt->execute();
	if ($row_id>0) $ketqua='OK_'.$row_id;
	else $ketqua='ERR_'.$lang_module['update_err'];
	echo $ketqua; exit;
}


	$sql="SELECT * from ".NV_PREFIXLANG. "_quanlynhanluc_khoaphong where account ='".$user_info['username']."'";
	$phong=$db->query($sql)->fetch();
	$xtpl->assign('phong', $phong);
	$link=array();
	$link['link_del']=MODULE_LINK . '&' . NV_OP_VARIABLE . '='.$op.'&sta=del_msg';
	$link['tinnhan']=MODULE_LINK . '&' . NV_OP_VARIABLE . '='.$op.'&sta=dstinnhan';
	$xtpl->assign('link', $link);
	$js=$link['tinnhan'];
	$code=$nv_Request->get_title('code_pro', 'get,post', '');
	if ($sta=='viewdetail' and !empty($code))	
	{
		$js=MODULE_LINK . '&' . NV_OP_VARIABLE . '='.$op.'&sta=detail_daotao&code_pro='.$code;
	}
	$xtpl->assign('JS',"<script>setValue('".$js."','panel_chitiet');</script>");
	$xtpl->parse('main');
    $contents = $xtpl->text('main');

include NV_ROOTDIR . '/includes/header.php';
echo nv_site_theme($contents);
include NV_ROOTDIR . '/includes/footer.php';
