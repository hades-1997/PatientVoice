<!-- BEGIN: viewclass -->
<div class="card">
		<div class="card-header">
			<h5 style="text-transform: uppercase;">{CLASS_NAME}</h5><span></span>
		</div>
		<div class="card-block">		
			<table id="tbl_detail" class="table table-hover" >
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Đơn vị cấp</th>
                                <th>Từ ngày</th>
                                <th class="text-center">đến ngày</th>
                                <th class="text-center"> Số cán bộ <br/> tham gia</th>  
                                <th class="text-center"> Ghi chú</th>  
                            </tr>
                        </thead>
                        <tbody>
						<!-- BEGIN: loop -->
							<tr>
                                <td class="text-center phanhang">{ITEM.stt}</td>
								<td class="text-left phanhang">{ITEM.donvicap}</td>
								<td class="text-center ">{ITEM.tungay}</td>                                
								<td class="text-center ">{ITEM.denngay}</td>                                
								<td class="text-center ">{ITEM.soluong}</td>                                
								<td class="text-center"> 
								<a href="#" onclick="cb_select('{ITEM.link_view}')">
									<label class="label label-warning"><b><i class="ti-eye"></i> Chi tiết tham dự</b></label> 
								</a>
								</td>
                            </tr>
						<!-- END: loop -->	
                        </tbody>
		</table>
	</div>
</div>
<!-- END: viewclass -->
<!-- BEGIN: dscanbo -->
<div class="table-responsive">
	<table id="tbl_danhsach" class="table table-hover" style="width: 99%;" >
					<thead>
						<tr>
							<th style="text-transform: uppercase;" class="text-center" colspan="7">THÔNG TIN CÁN BỘ THAM GIA ĐÀO TẠO</th>							
						</tr>
						
						<tr>
							<th>#</th>
							<th>Mã CB</th>
							<th>Họ tên</th>
							<th>Khoa phòng</th>                                
							<th class="text-center">Chức vụ</th> 
							<th>Đối tượng</th> 
							<th class="text-center">Tín chỉ</th> 
						</tr>
					</thead>
					<tbody>
					<!-- BEGIN: canbo -->
						<tr>
							<td >{ITEM.stt}</td>
							<td>{ITEM.maso_bv}</td>
							<td>{ITEM.hovaten}</td>
							<td class="phanhang">{ITEM.tenkhoa}</td>               
							<td class="text-center">{ITEM.chucvu}</td>  
							<td class="phanhang">{ITEM.hinhthucdaotao}</td>  
							<td class="text-center">{ITEM.sotiethoc}</td>  
						</tr>
					<!-- END: canbo -->	
					</tbody>
		</table>
</div>	
	
<script>
table();
function table(){
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
					},dom: '<"top" >rt<"bottom"flp><"clear">',searching: false, paging: true, info: false,
		});};	
</script>
<!-- END: dscanbo -->

<!-- BEGIN: main -->
<style>.phanhang{white-space:pre-wrap; word-wrap:break-word}</style>
<div class="col-md-12">
	<div class="row">
		<div class="col-md-12 col-lg-12">
			<div class="card">
				<div class="card-header">
					<h5 style="text-transform: uppercase;">DANH SÁCH {title}</h5><span></span>
				</div>
			<div class="card-block">	
			
			<table id="tbl_daotao" class="table table-hover" >
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>{LANG.selectname} - Đào Tạo</th>
                                <th class="text-center">Tổng Số lượng<br/>tham gia</th>
                                <th class="text-center"> Ghi chú</th>  
                            </tr>
                        </thead>
                        <tbody>
						<!-- BEGIN: loop -->
							<tr>
                                <td class="text-center phanhang">{ITEM.stt}</td>
								<td class="text-left phanhang">{ITEM.select_name}</td>
								<td class="text-center ">{ITEM.soluong}</td>                                
								<td class="text-center"> <a href="#" onclick="viewdetail('{ITEM.link_view}','ds_class')">
									<label class="label label-info"><b><i class="ti-eye"></i> Chi tiết</b></label> 
								</a>
								</td>
                            </tr>
						<!-- END: loop -->	
                        </tbody>
			</table>
			
			</div>
		</div>	
	</div>	
	
<div class="col-md-12">
		<span id="ds_class">{LISTDS}</span>
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
<script>
function viewdetail(a,id) {    
	 $.ajax({url : a,type : 'get',dataType : 'text',success : function (result){$("#"+id).html(result);}});
	 }

</script>

<!-- END: main -->

<div class="col-md-12 col-lg-6">
			<div class="card">
				<div class="card-header">
					<h5>DANH MỤC CÀI ĐẶT ĐÀO TẠO</h5><span></span>
				</div>
			<div class="card-block">			
				<form name="myform" id="myform" method="post" action="{link_frm}" onsubmit="return nv_execute_frm(this);">
				<input type="hidden" name="checkss" id="checkss" value="{CHECKSESS}" />
				<input type="hidden" name="sta" id="sta" value="{sta}" />
				<input type="hidden" name="id" id="id" value="{DATA.id}" />
				
				<div class="form-group row">
					<div class="col-sm-12">
							<div class="input-group">
									<span class="input-group-addon" id="type_select" style="width: auto;">Chọn Loại Cài Đặt:</span>
									<select name="type_select" class="form-control" onchange="find_select(this,'{link_frm}');">
										<!-- BEGIN: type_select -->
										<option value="{r.id}" {r.select}>{r.name}</option>
										<!-- END: type_select -->
									</select>
							</div>
					</div>
				</div>
				<div class="form-group row">
					 <div class="col-sm-12">
						<div class="col-form-label">{LANG.selectcode} (*):</div>
						<input {disabled} name='selectcode' value='{DATA.select_code}' type='text' class='form-control' placeholder="Ví dụ: DTTX">
					 </div>
				</div>
				<div class="form-group row">
					 <div class="col-sm-12">
						<div class="col-form-label">{LANG.selectname} (*):</div>
						<textarea name="selectname" rows="2" class="form-control"> {DATA.select_name}</textarea>
					 </div>
				</div>
				
				<div class="form-group row">
					 <div class="col-sm-12">
						<div class="input-group">
							<button type="submit" class="btn btn-out-dashed btn-info btn-square"> 
							<i class="icofont icofont-check-circled"></i> Lưu </button>	
						</div>
					</div>
				</div>
				
			</form>
		</div>
		</div>
		
		
		</div>
		