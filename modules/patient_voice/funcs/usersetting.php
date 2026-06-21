<?php

/**
 * @Project NUKEVIET 4.x
 * @Author VINADES.,JSC (contact@vinades.vn)
 * @Copyright (C) 2014 VINADES.,JSC. All rights reserved
 * @License GNU/GPL version 2 or any later version
 * @Createdate 3-31-2010 0:33
 */

if (! defined('NV_IS_MOD_QLCL')) {
    die('Stop!!!');
}

if (empty($user_info))
{
		$url = NV_BASE_SITEURL . 'index.php?' . NV_LANG_VARIABLE . '=' . NV_LANG_DATA . '&' . NV_NAME_VARIABLE . '=users&' . NV_OP_VARIABLE . '=login';
        Header('Location: ' . nv_url_rewrite($url, true));
        exit();
}

//$id = $user_info['username'];
//$sta =$nv_Request->get_title('sta', 'get,post', '');



if ($nv_Request->get_int('changepass', 'post,get')==1)
{
	$checkss =$nv_Request->get_title('checkss', 'get,post', '');
	$key=md5($client_info['session_id'] . $global_config['sitekey']);
	if ($checkss!=$key) {die('stop!!!');}
	$data['username'] = $user_info['username'];
	//$data['old_pass'] = $nv_Request->get_title('old_pass', 'post');
	$data['new_pass'] = $nv_Request->get_title('new_pass', 'post');
	$data['renew_pass'] = $nv_Request->get_title('renew_pass', 'post');
	$er=0;$thongbao='';
	if (empty($data['new_pass']) or empty($data['renew_pass'])) $thongbao .= ++$er.'. Bạn phải nhập đầy đủ mật khẩu cần thay đổi.';
	if (($data['new_pass'])!=($data['renew_pass'])) $thongbao .= ++$er.'. Bạn phải nhập mật khẩu giống nhau.';

	if ($er==0)
	{
		    $password = $crypt->hash_password($data['new_pass'], $global_config['hashprefix']);
			
			$stmt = $db->prepare('Update ' . NV_USERS_GLOBALTABLE. ' set 
			password=:password where username like \''.$data['username'].'\'');
			$stmt->bindParam(':password', $password, PDO::PARAM_STR);
			$row_id=$stmt->execute();
			if ($row_id>0){
			$ketqua['status']='ok';
			$ketqua['url']=MODULE_LINK . '&' . NV_OP_VARIABLE . '='.$op;
			}
			$ketqua['mess']= $row_id==1?$lang_module['update_ok']:$lang_module['capnhat_err'];
	}
	else $ketqua['mess']=$thongbao;		
	nv_jsonOutput($ketqua); exit;

}	
	

	$xtpl = new XTemplate($op.'.tpl', NV_ROOTDIR . '/themes/' . $module_info['template'] . '/modules/' . $module_info['module_theme']);
	$user=array(); 
	$user=userinfo($user_info['userid']);
	if ($user['photo']==''){$user['photo']=NV_BASE_SITEURL . "uploads/" . $module_data . "/noimage.jpg";}
	else $user['photo']=NV_BASE_SITEURL .$user['photo'];
	$user['link_out']=NV_BASE_SITEURL . 'index.php?' . NV_LANG_VARIABLE . '=' . NV_LANG_DATA . '&' . NV_NAME_VARIABLE . '=users&' . NV_OP_VARIABLE . '=logout';
    $user['name']= empty($user['last_name'])?$user['username']:$user['last_name'];
    $user['link_avatar']=NV_BASE_SITEURL .'users/avatar/upd/';
	$xtpl->assign('CHECKSESS', md5($client_info['session_id'] . $global_config['sitekey']));
	
	$xtpl->assign('BASE_URL', NV_BASE_SITEURL);
	$xtpl->assign('FORM_ACTION', MODULE_LINK . '&' . NV_OP_VARIABLE . '='.$op);
	$xtpl->assign('USER', $user);
	$xtpl->parse('main');
    $contents = $xtpl->text('main');
include NV_ROOTDIR . '/includes/header.php';
echo nv_site_theme($contents);
include NV_ROOTDIR . '/includes/footer.php';