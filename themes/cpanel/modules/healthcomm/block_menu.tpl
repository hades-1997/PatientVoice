<!-- BEGIN: sub -->
<ul class="pcoded-submenu">
	<!-- BEGIN: item -->
    <li class="{ITEM.active}">
        <a href="{ITEM.link}">
            <span class="pcoded-micon"><i class="ti-angle-right"></i></span>
            <span class="pcoded-mtext" data-i18n="nav.basic-components.alert">{ITEM.title}</span>
            <span class="pcoded-mcaret"></span>
        </a>
    </li>
	<!-- END: item -->
</ul>
<!-- END: sub -->

<!-- BEGIN: main -->
<nav class="pcoded-navbar">
    <div class="sidebar_toggle"><a href="#"><i class="icon-close icons"></i></a></div>
    <div class="pcoded-inner-navbar main-menu">
        <ul class="pcoded-item pcoded-left-item">
            <li style="background-color: #73b4ff;border-color: #73b4ff;outline: 1px dashed #fff;outline-offset: -5px;">
                <a href="{HOME}">
                    <span class="pcoded-micon"><i class="ti-home"></i><b>D</b></span>
                    <span class="pcoded-mtext" data-i18n="nav.dash.main"><strong>Trang chủ</strong></span>
                    <span class="pcoded-mcaret"></span>
                </a>
            </li>
		<!-- BEGIN: loop -->
            <li class="{ROW.has_sub} {ROW.active}">
                <a href="{ROW.link}">
                    <span class="pcoded-micon"><i class="ti-layers"></i><b></b></span>
                    <span class="pcoded-mtext" data-i18n="nav.form-components.main">{ROW.title}</span>
                    <span class="pcoded-mcaret"></span>
                </a>
				<!-- BEGIN: sub --> {SUB}<!-- END: sub -->
            </li>
        <!-- END: loop -->
		<!-- BEGIN: chitieu -->
            <li class="pcoded-hasmenu {active}">
                <a href="#">
                    <span class="pcoded-micon"><i class="ti-layers"></i><b></b></span>
                    <span class="pcoded-mtext" data-i18n="nav.form-components.main">Nội dung đánh giá</span>
                    <span class="pcoded-mcaret"></span>
                </a>
				
				<ul class="pcoded-submenu">
					<!-- BEGIN: item -->
					<li class="{ITEM.active}">
						<a href="{ITEM.link_action}">
							<span class="pcoded-micon"><i class="ti-angle-right"></i></span>
							<span class="pcoded-mtext" data-i18n="nav.basic-components.alert">{ITEM.chi_so}</span>
							<span class="pcoded-mcaret"></span>
						</a>
					</li>
					<!-- END: item -->
				</ul>
            </li>
        <!-- END: chitieu -->
		
        </ul>
    </div>
</nav>

<!-- END: main -->
