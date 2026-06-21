<!-- BEGIN: main -->
<script type="text/javascript" src="{BASE_URL}{NV_ASSETS_DIR}/js/jquery/jquery.validate.min.js"></script>
<script type="text/javascript" src="{BASE_URL}{NV_ASSETS_DIR}/js/language/jquery.validator-{NV_LANG_INTERFACE}.js"></script>
<link type="text/css" href="{BASE_URL}{NV_ASSETS_DIR}/js/jquery-ui/jquery-ui.min.css" rel="stylesheet" />
<script type="text/javascript" src="{BASE_URL}{NV_ASSETS_DIR}/js/jquery-ui/jquery-ui.min.js"></script>
<link type="text/css" href="{URL_THEMES}/assets/css/daotao.css" rel="stylesheet" />
<script type="text/javascript" src="{BASE_URL}{NV_ASSETS_DIR}/js/language/jquery.ui.datepicker-{NV_LANG_INTERFACE}.js"></script>
<script src="/assets/js/language/jquery.ui.datepicker-vi.js"></script>
	
<div class="col-md-12">
	<div class="card">
		<div class="card-header">
			<h4 class="" style="text-transform: uppercase;color: #4099ff;">BÁO CÁO ĐÀO TẠO	</h4>
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
							<option value="" selected="selected">Chọn chức vụ</option>
							<!-- BEGIN: chucvu -->	
							<option value="{CV.name}" {CV.select}>{CV.name}</option>
							<!-- END: chucvu -->	
						</select>
					</div>
					<div class="col-sm-4 col-4">
						<select name="nghenghiep" class="form-control">
					 		<option value="" selected="selected">Chọn nghề nghiệp</option>
							<!-- BEGIN: nghenghiep -->	
							<option value="{NP.name}" {NP.select}>{NP.name}</option>
							<!-- END: nghenghiep -->	
						</select>
					</div>
					<div class="col-sm-4 col-4 mt-3">
						<select name="trinhdo" class="form-control">
							<option value="">Chọn trình độ</option>
							<!-- BEGIN: trinhdo -->	
							<option value="{TD.id}" {TD.select}>{TD.name}</option>
							<!-- END: trinhdo -->
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
							<input id="startdate" name="tungay" value="{SEARCH.tungay}" type="text" class="form-control ">
						</div>
					</div>
					<div class="col-sm-4 mt-3">
						<div class="input-group">
							<span class="input-group-addon" id="denngay" style="width: auto;min-width: 120px;margin-top: 0px;">Đến ngày:</span>
							<input id="enddate" name="denngay" value="{SEARCH.denngay}" type="text" class="form-control ">
						</div>
					</div>
				</div>
				<input type="submit" name="Tìm kiếm" id="btn-search" class="btn btn-primary"
					style=" text-align: center; margin: auto; display: block; ">
			</form>
		</div>	
	</div>
</div>	

<div class="table-responsive">
	<table class="table table-striped table-bordered table-hover" id="tbl_danhsach">
		<thead>
			<tr>
				<th class="text-center">STT</th>
				<th class="text-center">Họ tên</th>
				<th class="text-center">Năm sinh</th>
				<th class="text-center">Chức vụ</th>
				<th class="text-center">Nghề nghiệp</th>
				<th class="text-center">Trình độ chuyên môn</th>
				<th class="text-center">Tổng số giờ tín chỉ</th>
				<th class="text-center">Số lần cập nhật kiến thức y khoa</th>
			</tr>
		</thead>
		<tbody>
			<!-- BEGIN: loop -->
			<tr>
				<td class="text-center">{ROW.stt}</td>
				<td class="text-center">{ROW.hovaten}</td>
				<td class="text-center">{ROW.ngaysinh}</td>
				<td class="text-center">{ROW.chucvu}</td>
				<td class="text-center">{ROW.nghe_nghiep}</td>
				<td class="text-center">{ROW.trinhdo}</td>
				<td class="text-center">{ROW.total_sogio}</td>
				<td class="text-center">{ROW.count_cb}</td>
			</tr>
			<!-- END: loop -->
		</tbody>
	</table>
</div>

<script type="text/javascript">
	$(document).ready(function() {
		//var currentYear = new Date().getFullYear();
        //var startDate =  '01/01/' + currentYear;
        //var endDate =  '31/12/'+currentYear;
		//$('#startdate').val(startDate);
		//$('#enddate').val(endDate);
		$("#startdate,#enddate").datepicker({
			dateFormat : "dd/mm/yy",
			changeMonth : true,
			changeYear : true,
			showOtherMonths : true,
			showOn: 'focus'
		});
	});
</script>		
{FILE "export.tpl"}		 		
<!-- END: main -->