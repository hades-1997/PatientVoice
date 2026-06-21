<!-- BEGIN: main -->
<div class="navbar-container container-fluid">
    <ul class="nav-right">
        <li class="header-notification" id="mes" onclick="get_mes();">
            <a href="#">
                <i class="ti-bell"></i>
                <span class="badge bg-c-pink">{msg_new}</span>
            </a>
            <ul class="show-notification">
                <li>
                    <h6>{lang.title_thongbao}</h6>
					<a href="{viewall}">
                   <label class="label label-danger">{lang.viewall}</label>
					</a>
                </li>
				
				
				<!-- BEGIN: loop -->
				
                <li>
                    <div class="media">
                        <div class="col-sm-12 col-md-6 col-lg-4 col-xl-3 outer-ellipsis">
						<h1 class="d-flex align-self-center img-radius"><i class="ti-email"></i></h1></div>
                        <div class="media-body">
						<a href="{ROW.link_view}">
							{ROW.b1}<h5 class="notification-user">{ROW.nguoigui}</h5>
                            <p class="notification-msg">{ROW.tieude}</p>
                            <span class="notification-time">Thời gian:{ROW.tg_nhan}</span> {ROW.b2}
						</a>
                        </div>
                    </div>
                </li>
				<!-- END: loop -->
            </ul>
        </li>
        
        <li class="user-profile header-notification">
            <a href="#">
                <img src="{USER.photo}" class="img-radius" alt="image">
                <span>{USER.name}</span>
                <i class="ti-angle-down"></i>
            </a>
            <ul class="show-notification profile-notification">
                <li>
                    <a href="{link_user}">
                        <i class="ti-settings"></i> Cài đặt
                    </a>
                </li>              

                <li>
                    <a href="#" onclick="logout('{USER.link_out}')">
                    <i class="ti-layout-sidebar-left"></i> Thoát
                </a>
                </li>
            </ul>
        </li>
    </ul>
</div>
<script language="javascript">
	
</script>
<!-- END: main -->
