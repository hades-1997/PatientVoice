<?php

/**
 * @Project NUKEVIET 4.x
 * @Author DACLOI.JSC (saka.dacloi@gmail.com)
 * @Copyright (C) 2017 VINADES.,JSC. All rights reserved
 * @License GNU/GPL version 2 or any later version
 * @Createdate 10 April 2017 17:00
 */

if (! defined('NV_IS_MOD_DAOTAO')) {
    die('Stop!!!');
}


if (! nv_function_exists('nv_qlnl_menu')) {
    function nv_qlnl_menu()
    {
        global $module_info,$module_data,$db,$op,$user_info, $client_info;
        $xtpl = new XTemplate('block_menu.tpl', NV_ROOTDIR . '/themes/' . $module_info['template'] . '/modules/' . $module_info['module_theme']);
        $xtpl->assign('NV_BASE_SITEURL', NV_BASE_SITEURL);
		$xtpl->assign('HOME', MODULE_LINK);
		$dsmenu =menu_phanquyen($user_info['username']);
		foreach ($dsmenu as $row){
			$row['link']='';
			if (!empty($row['func']))
			{
				if (strpos($row['func'], 'https') !== false) {
					$row['target']='_blank';
					$row['link']= $row['func'];
				} else {
					$row['link']=MODULE_LINK.'&' . NV_OP_VARIABLE . '='. $row['func'];
				}

				
				$row['active']=($row['func']==$op)?' active ':'';
				$sub=has_sub($row['mnid']);$row['SUB']='';
				if (!empty($sub))
				{
					$row['link']='#';
					$row['has_sub']=' pcoded-hasmenu ';
					foreach ($sub as $item)
					if ($item['func']==($op)) $row['active']=' active pcoded-trigger';
					$submenu=show_sub($sub);
					$xtpl->assign('SUB', $submenu);
                    $xtpl->parse('main.loop.sub');
				}
			}
			$xtpl->assign('ROW', $row);
			$xtpl->parse('main.loop');
        }	
		
		$xtpl->assign('active', $active);
		//$xtpl->parse('main.chitieu');
		$xtpl->parse('main');
        return $xtpl->text('main');
    }

}

$content = nv_qlnl_menu();

function has_sub($mnid=0) 
{
	global $module_info,$module_data,$db,$op,$user_info;
	$sub =array();
	$sql = 'SELECT * FROM ' . TABLE . '_menu WHERE status = 1 and parent_mnid='.$mnid.' ORDER BY stt asc';
	$sub = $db->query($sql)->fetchAll();

	
	
	return $sub ;
}

function show_sub($sub=array()) 
{
		global $module_info,$module_data,$db,$op,$user_info,$client_info,$global_config;
        $xtpl = new XTemplate('block_menu.tpl', NV_ROOTDIR . '/themes/' . $module_info['template'] . '/modules/' . $module_info['module_theme']);
        $xtpl->assign('HOME', MODULE_LINK);
		foreach ($sub as $item)
		{
			// $item['link']=MODULE_LINK.'&' . NV_OP_VARIABLE . '='. $item['func'];
			// $_curr_url = NV_BASE_SITEURL . str_replace($global_config['site_url'] . '/', '', $client_info['selfurl']); //$client_info['selfurl'];
			// $url =  nv_url_rewrite($item['link']);
			if (strpos($item['func'], 'https') !== false) {
				$item['target']='_blank';
				$item['link']= $item['func'];
			} else {
				$item['link']=MODULE_LINK.'&' . NV_OP_VARIABLE . '='. $item['func'];
				$_curr_url = NV_BASE_SITEURL . str_replace($global_config['site_url'] . '/', '', $client_info['selfurl']); //$client_info['selfurl'];
				$url =  nv_url_rewrite($item['link']);
			}
		if ($item['func']==($op)) {
			//$row['active']=' active pcoded-trigger';
			$item['active']=' active ';
			} 
		else $item['active']='';
			$xtpl->assign('ITEM', $item);
			$xtpl->parse('sub.item'); 
		}
		$xtpl->parse('sub'); 
		$submenu=$xtpl->text('sub');
	return $submenu ;
}

