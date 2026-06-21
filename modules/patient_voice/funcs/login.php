<?php

/**
 * @Project NUKEVIET 4.x
 * @Author VINADES.,JSC (contact@vinades.vn)
 * @Copyright (C) 2014 VINADES.,JSC. All rights reserved
 * @License GNU/GPL version 2 or any later version
 * @Createdate 3-31-2010 0:33
 */
$link=NV_BASE_SITEURL . 'index.php?' . NV_LANG_VARIABLE . '=' . NV_LANG_DATA ;
if (empty($user_info)){$url = $link . '&' . NV_NAME_VARIABLE . '=expmodule';}
else {$url = $link . '&' . NV_NAME_VARIABLE .'='.$module_data;}
Header('Location: ' . nv_url_rewrite($url, true)); 
exit();
