<!-- BEGIN: main -->
<link href="{THEME_URL}/css/select2.min.css" rel="stylesheet" />
<script src="{THEME_URL}/js/select2.min.js"></script>
<script type="text/javascript" src="{THEME_URL}/assets/pages/accordion/accordion.js"></script>
<script type="text/javascript" src="{BASE_URL}{NV_ASSETS_DIR}/js/jquery/jquery.validate.min.js"></script>
<script type="text/javascript" src="{BASE_URL}{NV_ASSETS_DIR}/js/language/jquery.validator-{NV_LANG_INTERFACE}.js">
</script>
<link type="text/css" href="{BASE_URL}{NV_ASSETS_DIR}/js/jquery-ui/jquery-ui.min.css" rel="stylesheet" />
<script type="text/javascript" src="{BASE_URL}{NV_ASSETS_DIR}/js/jquery-ui/jquery-ui.min.js"></script>
<script type="text/javascript" src="{BASE_URL}{NV_ASSETS_DIR}/js/language/jquery.ui.datepicker-{NV_LANG_INTERFACE}.js">
</script>
<script src="{BASE_URL}assets/js/language/jquery.ui.datepicker-vi.js"></script>
<link href="{THEME_URL}/assets/css/bootstrap/css/bootstrap-datetimepicker.min.css" rel="stylesheet" />
<script src="{THEME_URL}/assets/js/bootstrap/js/bootstrap-datetimepicker.min.js"></script>
<script src="{THEME_URL}/assets/js/bootstrap/js/locales/bootstrap-datetimepicker.vi.js"></script>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css">

<style>
	.input-group .form-control:not(:first-child), .input-group-addon:not(:first-child), .input-group-btn:not(:first-child)>.btn, .input-group-btn:not(:first-child)>.btn-group>.btn, .input-group-btn:not(:first-child)>.dropdown-toggle, .input-group-btn:not(:last-child)>.btn-group:not(:first-child)>.btn, .input-group-btn:not(:last-child)>.btn:not(:first-child),
	select.form-control:not([size]):not([multiple])  {
		height: calc(2.25rem + 10px);
	}
</style>
<!-- Accordion js --> 

<div class="pcoded-inner-content">
	<div class="main-body">
		<div class="col-sm-12">
			<div class="card">
				<div class="card-header">
					<div class="label-main">
						<label class="label label-inverse-primary"><strong>Xuất dữ liệu spreadsheet</strong></label>
						<!-- <button type="button" class="btn btn-primary"
								onclick="window.location.href='{export_excel}'">
							<i class="fa fa-download"></i> Xuất Excel
						</button> -->
					</div>
					<h5></h5>
					<span></span>
					<div class="card-header-right">
						<ul class="list-unstyled card-option">
							<li><i class="fa fa-chevron-left"></i></li>
							<li><i class="fa fa-window-maximize full-card"></i></li>
							<li><i class="fa fa-minus minimize-card"></i></li>
							<li><i class="fa fa-refresh reload-card"></i></li>
						</ul>
					</div>
				</div>
                <div class="card-block">
					<div class="table-responsive" style="padding-bottom: 10px;">
						<form name="nmyform1" id="myform1" method="post" action="{link_frm}">
							<input type="hidden" name="act" id="act" value="export_spreadsheet" />
							<table class="table table-hover">
								<thead>
									<tr>
										<th>
											<div class="input-group">
												<span class="input-group-addon"
													style="width: auto;">link spreadsheets:</span>
												<input name="spreadsheet" value="" type="text" class="form-control">
											</div>
										</th>
										<th>
											<div class="input-group" style="width: auto;min-width:150px;">
												<select name="htbc" class="form-control">			
													<option value="" >Chọn hình thức báo cáo</option>										
													<option value="Sự cố tự nguyện" {HTBC.select1}>Sự cố tự nguyện</option>
													<option value="Sự cố bắt buộc" {HTBC.select2}>Sự cố bắt buộc</option>
												</select>
											</div>
										</th>
									</tr>
									<tr>
										
										
										<th>
											<div class="input-group">
												<span class="input-group-addon" id="tg_tungay"
													style="width: auto;min-width:120px;">Từ ngày:</span>
												<input id="datetime1" name="tg_tungay" value="{BC.tungay}" type="text"
													class="form-control">
											</div>
										</th>
										<th>
											<div class="input-group">
												<span class="input-group-addon" id="tg_denngay"
													style="width: auto;min-width:120px;">Đến ngày:</span>
												<input id="datetime2" name="tg_denngay" value="{BC.denngay}" type="text"
													class="form-control">
											</div>
										</th>
										<th>
											<div class="input-group">
												<button type="submit" class="btn btn-success" id="idfind" name="btn_find">
													<i class="icofont icofont-location-arrow"></i><strong> Bản nâng cấp 2.0</strong></button>
											</div>
										</th>
										
									</tr>
								</thead>
							</table>
						</form> <!-- end form1 -->
					</div>
				</div>
                <!-- BEGIN: notifi -->
                <div class="notifi" style=" text-align: center; padding: 50px 0; ">
                    {MESSAGE}
                </div>
                <!-- END: notifi -->
            </div>
        </div>
    </div>
</div>

<script>
	$(function () {
		
		$('#datetime1').datepicker({
			dateFormat: 'dd-mm-yy',
			onSelect: function (selectedDate) {
				$('#datetime2').datepicker('option', 'minDate', selectedDate);
			}
		});
		$('#datetime2').datepicker({
			dateFormat: 'dd-mm-yy',
			onSelect: function (selectedDate) {
				$('##datetime1').datepicker('option', 'maxDate', selectedDate);
			}
		});
		//ngay sinh
		$('#datepicker').datepicker({
			dateFormat: 'dd-mm-yy',
			onSelect: function (selectedDate) {
			}
		});
		//ngay bao cao
		$('#ngaygiott').datetimepicker({
			// format: "dd/mm/yyyy - hh:ii:ss P",
			language: 'vi',
			// RTL mode
			rtl: true,
			minuteStep: 1,
			pickerPosition: 'bottom-right',
			// enable meridian views for day and hour views    
			showMeridian: true,
			format: 'dd/mm/yyyy - hh:ii:ss P',
			weekStart: 0,
			daysOfWeekDisabled: [],
			autoclose: true,
			startView: 2,
			minView: 0,
			maxView: 3,
			viewSelect: 0,
			todayBtn: true,
			todayHighlight: true,
			forceParse: true
		});
		// Set the default date to today
		var today = new Date();
		$('#ngaygiott').datetimepicker('setDate', today);

	});

</script>

<!-- END: main -->