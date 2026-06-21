<!-- BEGIN: main -->
<script type="text/javascript" src="{BASE_URL}{NV_ASSETS_DIR}/js/jquery/jquery.validate.min.js"></script>
<script type="text/javascript" src="{BASE_URL}{NV_ASSETS_DIR}/js/language/jquery.validator-{NV_LANG_INTERFACE}.js"></script>
<link type="text/css" href="{BASE_URL}{NV_ASSETS_DIR}/js/jquery-ui/jquery-ui.min.css" rel="stylesheet" />
<script type="text/javascript" src="{BASE_URL}{NV_ASSETS_DIR}/js/jquery-ui/jquery-ui.min.js"></script>
<script type="text/javascript" src="{BASE_URL}{NV_ASSETS_DIR}/js/language/jquery.ui.datepicker-{NV_LANG_INTERFACE}.js"></script>
<script src="/assets/js/language/jquery.ui.datepicker-vi.js"></script>
<link type="text/css" href="{URL_THEMES}/assets/css/daotao.css" rel="stylesheet" />
	
<div class="col-md-12">
	<div class="card">
		<div class="card-header">
			<h4 class="" style="text-transform: uppercase;color: #4099ff;">THÔNG TIN CẬP NHẬT KIẾN THỨC Y KHOA LIÊN TỤC</h4>
			<form name="myform" id="myform" method="post" action="{SUBMIT}">
				<input type="hidden" name="check" id="check" value="{CHECK}">
				<input type="hidden" name="sta" id="sta" value="find_item">
				<div class="form-group  row">
					<div class="col-sm-4 col-4">
						<select name="id_khoaphong" class="form-control">
						<option value="">Chọn khoa phòng</option>
						<!-- BEGIN: khoaphong -->	
						<option value="{KP.id}" {KP.select}>{KP.name}</option>
						<!-- END: khoaphong -->	
						</select>
					</div>
					<div class="col-sm-4 col-4">
						<select name="chucvu" class="form-control">
							<option value="">Chọn chức vụ</option>
							<!-- BEGIN: chucvu -->	
							<option value="{CV.id}" {CV.select}>{CV.name}</option>
							<!-- END: chucvu -->	
						</select>
					</div>
					<div class="col-sm-4 col-4 ">
						<select name="trinhdo" class="form-control">
							<option value="">Chọn trình độ</option>
							<!-- BEGIN: trinhdo -->	
							<option value="{TD.id}" {TD.select}>{TD.name}</option>
							<!-- END: trinhdo -->
						</select>
					</div>
					<div class="col-sm-4 col-4 mt-3">
						<select name="nghenghiep" class="form-control">
							<option value="">Chọn nghề nghiệp</option>
							<!-- BEGIN: nghenghiep -->	
							<option value="{NP.name}" {NP.select}>{NP.name}</option>
							<!-- END: nghenghiep -->
						</select>
					</div>
					<div class="col-sm-4 col-4 mt-3">
						<select name="tinhtrang" class="form-control">
							<option value="">Chọn tình trạng</option>
							<!-- BEGIN: tinhtrang -->	
							<option value="{TR.name}" {TR.select}>{TR.name}</option>
							<!-- END: tinhtrang -->
						</select>
					</div>
					<div class="col-sm-4 mt-3">
						<div class="input-group">
							<input name="find_text" value="{SEARCH.find_text}" type="text" class="form-control" placeholder="Nhập nội dung cần tìm... nhấn Enter!">
						</div>
					</div>
					<div class="col-sm-4 mt-3">
						<div class="input-group">
							<span class="input-group-addon" id="tungay" style="width: auto;min-width: 120px;margin-top: 0px;">Từ ngày:</span>
							<input id="startdate" name="tungay" type="text" class="form-control " value="{SEARCH.tungay}">
						</div>
					</div>
					<div class="col-sm-4 mt-3">
						<div class="input-group">
							<span class="input-group-addon" id="denngay" style="width: auto;min-width: 120px;margin-top: 0px;">Đến ngày:</span>
							<input id="enddate" name="denngay" value="{SEARCH.denngay}" type="text" class="form-control ">
						</div>
					</div>
					<div class="col-sm-4 mt-3">
						<div class="input-group">
							<input name="gsheet_url" value="" type="text" class="form-control" placeholder="Dán đường dẫn">
						</div>
					</div>
				</div>
				<div class="form-group  d-flex">

				
					<button type="submit" class="btn btn-primary" style="background-color:#0F9D58;border-color:#0F9D58;" onclick="document.getElementById('sta').value='export_gsheet';">
						<i class="fa fa-table"></i> <strong>Đồng bộ dữ liệu</strong>
					</button>
					
				</div>
			</form>
			
		</div>	
	</div>
</div>	
<!-- BEGIN: notifi -->
<div class="col-md-12">
	<div class="alert alert-warning" style="text-align: center; margin-bottom: 20px;">
		<i class="fa fa-info-circle"></i> {MESSAGE}
	</div>
</div>
<!-- END: notifi -->
<!-- BEGIN: gdrive_result
<div class="col-md-12">
	<div style="margin-bottom: 20px; padding: 15px; background: #f0fff4; border: 1px solid #0F9D58; border-radius: 4px;">
		<h5 style="color:#0F9D58;"><i class="fa fa-check-circle"></i> Xuất thành công!</h5>
		<p><i class="fa fa-file-excel-o"></i> <strong>{GDRIVE_FILENAME}</strong></p>
		<p><i class="fa fa-link"></i> <strong>Link Google Sheet:</strong>
			<a href="{GDRIVE_LINK}" target="_blank" style="word-break:break-all;">{GDRIVE_LINK}</a>
		</p>
		<a href="{GDRIVE_LINK}" target="_blank" class="btn btn-sm" style="background-color:#0F9D58;border-color:#0F9D58;color:#fff;">
			<i class="fa fa-external-link"></i> Mở Google Sheet
		</a>
	</div>
</div>
 END: gdrive_result -->

<script type="text/javascript">
	$(document).ready(function() {
		// var currentYear = new Date().getFullYear();
        // var startDate =  '01/01/' + currentYear;
        // var endDate =  '31/12/'+currentYear;
		// $('#startdate').val(startDate);
		// $('#enddate').val(endDate);
		$("#startdate").datepicker({
			dateFormat : "dd/mm/yy",
			changeMonth : true,
			changeYear : true,
			//minDate: new Date(startDate),
			showOtherMonths : true,
			showOn: 'focus'
		});
		
		$("#enddate").datepicker({
			dateFormat : "dd/mm/yy",
		//	minDate: new Date(endDate),
			changeMonth : true,
			changeYear : true,
			showOtherMonths : true,
			showOn: 'focus'
		});
	});
</script> 		

{FILE "export.tpl"}
<!-- END: main -->