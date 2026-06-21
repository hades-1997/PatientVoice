<!-- BEGIN: main -->
<link type="text/css" href="{URL_THEMES}/assets/css/daotao.css" rel="stylesheet" />
<div class="page-wrapper">
   <div class="row">
        <div class="col-sm-12">
            <!-- Tab variant tab card start -->
            <div class="card">
                <div class="card-header">
				<div class="label-main">
                    <label class="label label-inverse-primary"><strong>Khoa/Phòng:{phong.tenkhoa}</strong></label>
                </div>
				
                    <div class="card-header-right">
						<ul class="list-unstyled card-option">
							<li><i class="fa fa-chevron-left"></i></li>
							<li><i class="fa fa-window-maximize full-card"></i></li>
							<li><i class="fa fa-minus minimize-card"></i></li>
							<li><i class="fa fa-refresh reload-card"></i></li>
							<li><i class="fa fa-times close-card"></i></li>
						</ul>
					</div>

                </div>
                <div class="card-block tab-icon">
                    <!-- Row start active-->
                    <div class="row">
                        <div class="col-lg-12 col-xl-12">
                            <!-- Nav tabs -->
                            <ul class="nav nav-tabs md-tabs " role="tablist">
								<li class="nav-item" >
                                    <a onclick="setValue('{link.tinnhan}','panel_chitiet');" class="nav-link" data-toggle="tab"  role="tab"><i class="icofont icofont-ui-message"></i>Danh sách thông báo</a>
                                    <div class="slide"></div>
                                </li>
                            </ul>
                            <!-- Tab panes -->
                            <div class="tab-content card-block">
                                <div class="tab-pane active" id="msg" role="tabpanel">
                                    <span class="m-0" id="panel_chitiet">.....</span>
                                </div>
                            </div>
                        </div>
                        
                    <!-- Row end -->
                </div>
            </div>
            <!-- Tab variant tab card start -->
        </div>
   </div>
</div>
{JS}
<!-- END: main -->

<!-- BEGIN: tinnhan -->
	tin nhắn
<!-- END: tinnhan -->

<!-- BEGIN: dstinnhan -->
	<!-- Basic table card start -->
            <div class="card-block table-border-style">
                <div class="table-responsive" style="padding-bottom: 100px;">
                    <table class="table table-hover" >
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Người gửi</th>
                                <th>Nội dung</th>
                                <th>Thời gian</th>
                                <th>Trạng thái</th>
                                <th>Thao tác</th>
                                <th>Ghi chú</th>
                            </tr>
                        </thead>
                        <tbody>
						<!-- BEGIN: loop -->
                            <tr style="{ROW.new}">
                                <th scope="row" style="padding-top: 15px;">{ROW.stt}</th>
                                <td><div class="label-main">
                                        <label class="label label-primary">{ROW.nguoigui}</label>
                                    </div></td>
                                <td style="padding-top: 15px;" ><a onclick="setValue('{ROW.link_view}','panel_chitiet');" href="#">{ROW.tieude}</a></td>
                                <td style="padding-top: 15px;">{ROW.tg_nhan}</td>
                                <td><div class="label-main">
								<label class="label {ROW.color_tt}">{ROW.trangthai}</label></div>
								</td>
								
                                <td><div class="dropdown-success dropdown">
								<button class="btn-sm btn-success dropdown-toggle waves-effect waves-light " type="button" id="dropdown-3" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">Chọn</button>
									<div class="dropdown-menu" aria-labelledby="dropdown-3" data-dropdown-in="fadeIn" data-dropdown-out="fadeOut">
										<a onclick="setValue('{ROW.link_view}','panel_chitiet');" class="dropdown-item waves-light waves-effect" href="#">Chi tiết</a>
										<!-- BEGIN: admin --> <a onclick="del_msg('{ROW.link_del}','{ROW.code_pro}');" class="dropdown-item waves-light waves-effect" href="#">Xóa bỏ</a><!-- END: admin -->
									</div>
								</div></td>
                                <td></td>
                            </tr>
                        <!-- END: loop -->
                        </tbody>
                    </table>
                </div>
            </div>
        <!-- Basic table card end -->
<!-- END: dstinnhan -->


<!-- BEGIN: detail_daotao -->
	<script type="text/javascript" src="{BASE_URL}{NV_ASSETS_DIR}/js/jquery/jquery.validate.min.js"></script>
	<script type="text/javascript" src="{BASE_URL}{NV_ASSETS_DIR}/js/language/jquery.validator-{NV_LANG_INTERFACE}.js"></script>
	<link type="text/css" href="{BASE_URL}{NV_ASSETS_DIR}/js/jquery-ui/jquery-ui.min.css" rel="stylesheet" />
	<script type="text/javascript" src="{BASE_URL}{NV_ASSETS_DIR}/js/jquery-ui/jquery-ui.min.js"></script>
	<script type="text/javascript" src="{BASE_URL}{NV_ASSETS_DIR}/js/language/jquery.ui.datepicker-{NV_LANG_INTERFACE}.js"></script>
    <script src="/ttytthanhson/assets/js/language/jquery.ui.datepicker-vi.js"></script>
<style>
.noti-mess__ctx {
	padding: 20px 0;
}
</style>
<div class="card-header">
    <h5 class="card-header-text">Thông báo duyệt danh sách đào tạo khoá học</h5>
</div>
<div class="card-block accordion-block color-accordion-block">
    <div class="accordion-box">
		<div class="noti-mess">
			<div class="noti-mess__time">
			<strong>Ngày gửi:</strong> {DATA.tg_gui}
			</div>
			<div class="noti-mess__ctx">
			{DATA.tieude}
			</div>
            <!-- BEGIN: ena -->
            <div class="ena-btn">
                <a href="{DATA.link_ena}" class="btn btn-info">
                    Duyệt khoá học
                </a>
            </div>
            <!-- END: ena -->
		</div>
    </div>
</div>

<!-- Accordion js -->
<script type="text/javascript" src="{URL_THEMES}/assets/pages/accordion/accordion.js"></script>
<script type="text/javascript">
$(document).ready(function() {
    $("#startDate,#endDate").datepicker({
        dateFormat : "dd/mm/yy",
        changeMonth : true,
        changeYear : true,
        showOtherMonths : true,
        showOn: 'focus'
    });

    $('#tg_tungay').click(function(){
        $("#publ_date").datepicker('show');
    });

    $('#tg_denngay').click(function(){
        $("#exp_date").datepicker('show');
    });
});
</script>
<!-- END: detail_daotao -->
