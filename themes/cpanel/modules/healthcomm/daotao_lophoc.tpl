<!-- BEGIN: unit -->
<table id="tbl_item" class="table table-hover" >
	<thead>
		<tr>
			<th>#</th>
			<th>Đối tượng đào tạo</th>
			<th>Phân loại </th>                              
			<th class="text-center">Hệ số quy đổi </th>                              
			<th class="text-center">Thao tác</th>
		</tr>
	</thead>
	<tbody>
	<!-- BEGIN: loop -->
		<tr>
			<td>{ITEM.stt}</td>
			<td class="text-left phanhang">{ITEM.select_name}</td>
			<td>{ITEM.unit}</td>            
			<td class="text-center">{ITEM.value}</td>            
			<td class="text-center  align-middle">
			<div class="ks-cboxtags">
				<input onchange="cb_select('{ITEM.link}');" class="item_class" type="radio" id="select{ITEM.id}"
				name="checks_kt[]" value="{ITEM.id}" {ITEM.check}>
				<label for="select{ITEM.id}">Chọn</label>
			</div>
			
			</td>
		</tr>
	<!-- END: loop -->	
	</tbody>
</table>
<!-- END: unit -->

<!-- BEGIN: dscb_apply -->
<div class="table-responsive">
	<table id="dscb_apply" class="table table-hover" style="width: 99%;" >
					<thead>		
						<tr>
							<th>#</th>
							<th>Mã CB</th>
							<th>Họ tên</th>
							<th>Khoa phòng</th>                                
							<th>Chức vụ</th>  
							<th>Đối tượng</th>  
						</tr>
					</thead>
					<tbody>
					<!-- BEGIN: canbo -->
						<tr>
							<td >{ITEM.stt}</td>
							<td>{ITEM.maso_bv}</td>
							<td>{ITEM.hovaten}</td>
							<td class="phanhang">{ITEM.tenkhoa}</td>               
							<td>{ITEM.chucvu}</td>    
							<td>{ITEM.doituong_tg}</td>    
						</tr>
					<!-- END: canbo -->	
					</tbody>
		</table>
</div>		

<!-- END: dscb_apply -->
<!-- BEGIN: dscb -->
<div class="table-responsive">
	<input type="hidden" name="doituong" id="doituong" value="{ds.select_code}" />
	<table id="tbl_danhsach" class="table table-hover" style="width: 99%;" >
					<thead>
						<tr>
							<th class="text-right" colspan="6">
								<div class="card-header-right">
									<button onclick="apply_canbo();"type="button" class="btn btn-out-dashed btn-info btn-square"> 
									<i class="icofont icofont-check-circled"></i> Xác nhận </button>	
									
									<button type="button" class="btn btn-danger btn-out-dashed btn-square" data-dismiss="modal" style="float:right">
									<i class="ti-close"></i> Đóng</button>
								</div>
							</th>							
						</tr>
						<tr>
							<th style="text-transform: uppercase;" class="text-center" colspan="6">LỰA CHỌN CÁN BỘ THAM GIA ĐÀO TẠO</th>							
													
						</tr>
						
						<tr>
							<th>#</th>
							<th>Mã CB</th>
							<th>Họ tên</th>
							<th>Khoa phòng</th>                                
							<th>Chức vụ</th>                                
							<th>Thao tác</th>
						</tr>
					</thead>
					<tbody>
					<!-- BEGIN: canbo -->
						<tr>
							<td >{ITEM.stt}</td>
							<td>{ITEM.maso_bv}</td>
							<td>{ITEM.hovaten}</td>
							<td class="phanhang">{ITEM.tenkhoa}</td>               
							<td>{ITEM.chucvu}</td>               
							<td class="text-center  align-middle">
							<div class="ks-cboxtags">
								<input onchange="canbo_select('{ITEM.id}');" class="item_cb" type="checkbox" id="selectcb{ITEM.id}"
								name="checks_kt[]" value="{ITEM.id}" {ITEM.check}>
								<label for="selectcb{ITEM.id}">Chọn</label>
							</div>
							
							</td>
						</tr>
					<!-- END: canbo -->	
					</tbody>
		</table>
</div>		

<!-- END: dscb -->
/*<script>	
	$(document).ready(function() {
		$('#tbl_danhsach').DataTable({
			language:{
						"decimal":        "",
						"emptyTable":     "Không có dữ liệu",
						"info":           "(Từ _START_ - _END_)/ _TOTAL_ ",
						"infoEmpty":      "( 0 to 0 ) 0 entries",
						"infoFiltered":   "(Của _MAX_ )",
						"infoPostFix":    "",
						"thousands":      ",",
						"lengthMenu":     "Hiển thị _MENU_ dòng/trang",
						"loadingRecords": "Loading...",
						"processing":     "",
						"search":         "Tìm:",
						"zeroRecords":    "Không tìm thấy thông tin",
						"paginate": {
							"first":      "Trang đầu",
							"last":       "trang cuối",
							"next":       "Trang sau",
							"previous":   "Trang trước"
						},
						"aria": {
							"sortAscending":  ": activate to sort column ascending",
							"sortDescending": ": activate to sort column descending"
						}
					}
		});});
		
		
</script>*/
<!-- BEGIN: main -->
<style>.phanhang{white-space:pre-wrap; word-wrap:break-word}</style>
<script type="text/javascript" src="{BASE_URL}{NV_ASSETS_DIR}/js/jquery/jquery.validate.min.js"></script>
<script type="text/javascript" src="{BASE_URL}{NV_ASSETS_DIR}/js/language/jquery.validator-{NV_LANG_INTERFACE}.js"></script>
<link type="text/css" href="{BASE_URL}{NV_ASSETS_DIR}/js/jquery-ui/jquery-ui.min.css" rel="stylesheet" />
<script type="text/javascript" src="{BASE_URL}{NV_ASSETS_DIR}/js/jquery-ui/jquery-ui.min.js"></script>
<script src="{BASE_URL}assets/js/language/jquery.ui.datepicker-vi.js"></script>

<div class="col-md-12">
	<div class="row">
		<div class="col-md-12">
			<div class="card">
				<div class="card-header">
					<h5>TẠO MỚI KHÓA ĐÀO TẠO/HỘI NGHỊ/HỘI THẢO...</h5><span></span>
				</div>
			<div class="card-block">			
				<form name="myform" id="myform" method="post" action="{link_frm}" onsubmit="return nv_execute(this);">
				<input type="hidden" name="checkss" id="checkss" value="{CHECKSESS}" />
				<input type="hidden" name="sta" id="sta" value="{sta}" />
				<input type="hidden" name="id" id="id" value="{DATA.id}" />
				<input type="hidden" name="dscanbo" id="dscanbo" value="{DATA.dscanbo}" />
				<div class="form-group row">
					 <div class="col-sm-6">
						<div class="col-form-label">{LANG.hinhthucdaotao} (*):</div>
						<select name="hinhthucdaotao" class="form-control" onchange="selectclass(this);">							
							<!-- BEGIN: hinhthucdaotao -->
							<option value="{r.id}" {r.select}>{r.name}</option>
							<!-- END: hinhthucdaotao -->
						</select>	
					 </div>
				</div>
				
				<div class="form-group row">
					 <div class="col-sm-10">
						<div class="col-form-label">Loại đào tạo (*):</div>
						<select name="loaidaotao" class="form-control" onchange="changeselect(this,'ds_unit');">							
							<!-- BEGIN: loaidaotao -->
							<option value="{r.id}" {r.select}>{r.name}</option>
							<!-- END: loaidaotao -->
						</select>	
					 </div>
					<div class="col-sm-2">
					<div class="col-form-label">Số lượng(*):</div>
						<input name='soluong' value='{DATA.value}' type='text' class='form-control'>
					</div>
				</div>
				<div class="form-group row">
					 <div class="col-sm-2">
						<div class="col-form-label">{LANG.tungay} (*):</div>
						<input name='tungay' id='tungay' value='{DATA.tungay}' type='text' class='form-control' 
						placeholder="{LANG.notetungay}">
					 </div>
					 <div class="col-sm-2">
						<div class="col-form-label">{LANG.denngay}:</div>
						<input name='denngay' id='denngay' value='{DATA.denngay}' type='text' class='form-control' 
						placeholder="{LANG.notedenngay}">
					 </div>
					 
					 <div class="col-sm-8">
						<div class="col-form-label">{LANG.coso} (*):</div>
						<input name='donvicap' value='{DATA.donvicap}' 
						type='text' class='form-control' placeholder="{LANG.notecoso}">
					 </div>
				</div>
				<div class="form-group row">					
					<div class="col-sm-12">
					<div class="col-form-label">Đối tượng (Hình thức)tham gia (*):</div>
						 <span id="ds_unit">{LIST}</span>			 
					</div>						
				</div>
				
				
				<div class="col-sm-12">
					<div class="input-group">
						<button type="submit" class="btn btn-out-dashed btn-info btn-square"> 
						<i class="icofont icofont-check-circled"></i> Lưu </button>	
					</div>
				</div>
			</form>
		</div>
		</div>
	</div>
	
	<div class="col-md-12">
	<span id="frm"> </span>
		<div class="card">
			<div class="card-header">
				<h5 style="text-transform: uppercase;">DANH SÁCH CÁN BỘ THAM GIA KHÓA ĐÀO TẠO</h5><span></span>
			</div>
		<div class="card-block">			
			<span id="ds_apply">{LISTDS}</span>
		</div>
	</div>	

</div>	

<!-- Modal start -->
<div class="modal fade modal-detail" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialogdetail modal-lg" role="document">
        <div class="modal-content">
		<div class="modal-header" style="background-color: #b2f3fd;">
			<div class="breadcrumb-header"><strong>THÔNG TIN CHI TIẾT</strong></div>
		 </div>
		<div class="card borderless-card" style="margin-bottom: 0px;">
			<div class="card-block">                
                <div class="page-header-breadcrumb"><span id="modal_bodydetail"></span>  </div>
            </div>
			
		</div>
		
        </div>
		
    </div>
</div>
<!-- Modal end -->
<script>
var links='{link_frm}' ;var id='frm'; //selectclass('def');
function danhsach(a)
{
  /*var ds='';
  checkboxes = document.getElementsByClassName('item_cb');
  for(var k=0, n=checkboxes.length;k<n;k++) if (checkboxes[k].checked) ds =ds +checkboxes[k].value + ';';
  */
  alert(a.value);
}
function changeselect(a,id) {    
	 $.ajax({url : links+'&unit='+a.value,type : 'get',dataType : 'text',success : function (result){$("#"+id).html(result);}});
	 $("#ds_apply").html('');
	 }
/*
function selectclass(a)
{
  var t=''; if (a=='def') t='DTLT'; else t=a.value;$("#"+id).html('');
  $.ajax({url : links+'&typeclass='+t,type : 'get',dataType : 'text',success : function (result){$("#"+id).html(result);}});
}*/
function nv_execute(a) {
		
		var ds='';
		checkboxes = document.getElementsByClassName('item_cb');
		for(var k=0, n=checkboxes.length;k<n;k++) if (checkboxes[k].checked) ds =ds +checkboxes[k].value + ';';
		document.getElementById('dscanbo').value=ds;
		var c = []; 
		c.type = $(a).prop("method"); c.url = $(a).prop("action"); c.data = $(a).serialize();
		$(a).find("input,button,select,textarea, a").removeClass("has-error");
		$(a).find("input,button,select,textarea, a").prop("disabled", !0);
		$.ajax({
				url : c.url,cache: !1,data:c.data,type : c.type,dataType : 'json',
				success : function (result){
				modal(result.mess);$(a).find("input,button,select,textarea, a").prop("disabled", !1);
				if(result.status == "OK") location.reload();
				}
			});
		
		return !1;	
}

function apply_canbo() {
		
		var ds='';
		var dt = document.getElementById('doituong').value;
		checkboxes = document.getElementsByClassName('item_cb');
		for(var k=0, n=checkboxes.length;k<n;k++) if (checkboxes[k].checked) ds =ds +checkboxes[k].value + ';';
		$.ajax({url : links+'&sta=applydscb&dscb='+ds+'&doituong='+dt,type : 'get',dataType : 'text',
		success : function (result){$("#ds_apply").html(result);}});
		
		return !1;	
}
</script>
<script>
$(function () {	$('#tungay').datepicker({ autoclose: true,todayHighlight: true }).datepicker('update', new Date());});
$(function () {	$('#denngay').datepicker({ autoclose: true,todayHighlight: true }).datepicker('update', new Date());});
</script>

	<style>.dt-buttons {float:right;}</style>
	<link href="{URL_THEMES}/table/datatables.min.css" rel="stylesheet"/>
	<link href="{URL_THEMES}/table/datatables.css" rel="stylesheet"/>
	 <script src="{URL_THEMES}/table/datatables.js"></script>
	 <script src="{URL_THEMES}/table/datatables.min.js"></script>
	 <script src="{URL_THEMES}/table/button/js/datatables.buttons.min.js"></script>
	 <script src="{URL_THEMES}/table/pdf/pdfmake.js"></script>
	 <script src="{URL_THEMES}/table/pdf/pdfmake.min.js"></script>
	 <script src="{URL_THEMES}/table/pdf/vfs_fonts.js"></script>
	 <script src="{URL_THEMES}/table/jszip/jszip.min.js"></script>
	 


<!-- END: main -->






	