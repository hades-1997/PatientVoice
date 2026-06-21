<?php

/**
 * @Project NUKEVIET 4.x
 * @Module  patient_voice — Frontend display functions
 * @License GNU/GPL version 2 or any later version
 */

if (!defined('NV_IS_MOD_PATIENT_VOICE')) {
    die('Stop!!!');
}



/**
 * export_spreadsheet()
 *
 * @param mixed $array_cat
 * @param mixed $array_cat_content
 * @return
 */
function export_spreadsheet($array_data,$link_submit,$r_search, $status)
{
    global $site_mods, $module_name, $module_upload, $lang_module, $module_config, $module_info, $global_array_cat, $global_array_cat, $catid, $page,$user_info;

    $xtpl = new XTemplate('export_spreadsheet.tpl', NV_ROOTDIR . '/themes/' . $module_info['template'] . '/modules/' . $module_info['module_theme']);
    $xtpl->assign('LANG', $lang_module);
	 $xtpl->assign('BASE_URL', NV_BASE_SITEURL);
	 $xtpl->assign('URL_THEMES', NV_BASE_SITEURL.'themes/cpanel');
    $xtpl->assign('SUBMIT', $link_submit);
	$trinhdo = select_group_qlnl('trinhdo');
	$nghenghiep = select_group_qlnl('nghenghiep');
	$kp_id = list_khoaphong();
	
	$c_year = 2024;
	$c_5year = $c_year + 4;

	$array_year = [];
	for($i=0;$i<4;$i++) {
		$array_year[] = $c_year . '-' . $c_5year;
		$c_year = $c_year + 1;
		$c_5year = $c_5year + 4;
	}
	
	$xtpl->assign('SEARCH', $r_search);
	
	$chucvu = [
		'Giám đốc',
		'Phó Giám đốc',
		'Trưởng khoa',
		'Trưởng phòng',
		'Phụ trách khoa',
		'Phụ trách phòng',
		'Phó trưởng khoa',
		'Phó trưởng phòng',
		'Điều dưỡng trưởng',
		'Hộ sinh trưởng',
		'Kỹ thuật viên trưởng',
		'Điều dưỡng hành chính',
		'Viên chức',
		'Người lao động'
	];
	
	$quyen = check_quyen($user_info);
	$tk_khoa=check_khoaphong($user_info['username']);

	
	if(!empty($chucvu)) {
		foreach($chucvu as $val) {
			$xtpl->assign('CV', array(
				'id' =>$val,
				'name' => $val,
				'select' => ($r_search['chucvu'] == $val) ? ' selected="selected"' : ''
			));
			$xtpl->parse('main.chucvu');
		}
	}
	
	$td_id=0;
	foreach($trinhdo as $item) {
		$xtpl->assign('TD', array(
			'id' => $item['select_name'],
			'name' => $item['select_name'],
			'select' => ($r_search['trinhdo'] == $item['select_name']) ? ' selected="selected"' : ''
		));
		$xtpl->parse('main.trinhdo');
	}
	
	$tinhtrang = [
		'Đã hoàn thành',
		'Chưa hoàn thiện'
	];
	
	if(!empty($tinhtrang )) {
		
		foreach($tinhtrang as $val) {
			$xtpl->assign('TR', array(
				'id' =>$val,
				'name' => $val,
				'select' => ($r_search['tinhtrang'] == $val) ? ' selected="selected"' : ''
			));
			$xtpl->parse('main.tinhtrang');
		}
	}
	
	foreach($array_year as $year) {
		$xtpl->assign('YEAR', array(
			'id' => $year,
			'name' => $year,
			'select' => ($r_search['year'] == $year) ? ' selected="selected"' : ''
		));
		$xtpl->parse('main.year');
	}
	
	if(!empty($nghenghiep)) {
		
		$kp_new = [
			"select_code" => 'BS-YS-DD-HS-KTV',
			"select_name" => 'BS-YS-DD-HS-KTV'
		];
		
		array_unshift($nghenghiep, $kp_new);
		
		foreach($nghenghiep as $val) {
			$xtpl->assign('NP', array(
				'id' => $val['select_code'],
				'name' => $val['select_name'],
				'select' => ($r_search["nghenghiep"] == $val['select_name']) ? ' selected="selected"' : ''
			));
			
			$xtpl->parse('main.nghenghiep');
		}
	}

	

	if(!empty($kp_id )) {
		if($quyen >= 100){
			foreach($kp_id as $val) {
				$xtpl->assign('KP', array(
					'id' => $val['id'],
					'name' => $val['tenkhoa'],
					'select' => ($r_search["id_khoaphong"] == $val['id']) ? ' selected="selected"' : ''
				));
				$xtpl->parse('main.khoaphong');
				
			}
			if(!empty($status['err'])) {
				$xtpl->assign('MESSAGE', $status['err']);
				$xtpl->parse('main.notifi');
			}
			if(!empty($status['data'])) {
				$xtpl->assign('MESSAGE', $status['data']);
				
				$xtpl->assign('GDRIVE_LINK', $array_data['link_drive']);
				$xtpl->assign('GDRIVE_FILENAME', 'Google Sheet - SCYK Export');
				$xtpl->parse('main.notifi');
				$xtpl->parse('main.gdrive_result');
			}
			$xtpl->parse('main.open');
			$xtpl->parse('main.power');
		}else {
			
			$id_khoa = $tk_khoa - 1;
			$xtpl->assign('KP', array(
				'id' => $tk_khoa,
				'name' => $kp_id[$id_khoa]["tenkhoa"],
				'select' => ' selected="selected"'
			));
			$xtpl->parse('main.khoaphong');
		}
		
	}

	$currentTime = Date('Y');
	if(!empty($r_search['tungay'])) {
	}else {
		$r_search['tungay'] = '01/01/' . $currentTime;
	}

	if( !empty($r_search['denngay'])){
	}else {
		$r_search['denngay'] = '31/12/' .$currentTime;
	}
	$xtpl->assign('SEARCH', $r_search);
	
    $xtpl->parse('main');
    return $xtpl->text('main');
}

