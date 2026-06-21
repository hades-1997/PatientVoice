<!-- BEGIN: viewinfo -->
<div class="table-responsive">
<table class="table table-hover" style="width: 99%;" >		
                <thead>
                    <tr>
                        <th colspan="5">THÔNG TIN CÁN BỘ</th>
                    </tr>
					<tr>
                        <th>Mã số</th>
                        <th>Họ và tên</th>
                        <th>Khoa/Phòng</th>
                        <th>Chức vụ</th>
                        <th class="text-center"> Tổng tín chỉ</th>  
                    </tr>
					
                </thead>
                <tbody>
					<tr>
                        <td class="text-center phanhang">{CB.maso_bv}</td>
						<td class="text-left phanhang">{CB.hovaten}</td>
						<td class="text-left phanhang">{CB.tenkhoa}</td>
						<td class="text-center ">{CB.chucvu}</td>                                
						<td class="text-center"> <b>{sum}</b> </td>
                    </tr>
                </tbody>
</table>



	<table id="tbl_detail" class="table table-hover" style="width: 99%;" >		
                    <thead>
						<tr>
							<th colspan="5">THÔNG TIN THAM GIA ĐÀO TẠO</th>
						</tr>
                        <tr>
                            <th>#</th>
                            <th>Mô tả - Đào tạo</th>
                            <th>Đơn vị cấp</th>
                            <th>Từ ngày</th>
                            <th class="text-center">Đến ngày</th>
                            <th class="text-center"> Tín chỉ</th>  
                            <th class="text-center"> Ghi chú</th>  
                        </tr>
                    </thead>
                    <tbody>
					<!-- BEGIN: loop -->
						<tr>
                            <td class="text-center phanhang">{ITEM.stt}</td>
							<td class="text-left phanhang">{ITEM.tenlop}</td>
							<td class="text-left phanhang">{ITEM.donvicap}</td>
							<td class="text-center ">{ITEM.tungay}</td>                                
							<td class="text-center ">{ITEM.denngay}</td>                                
							<td class="text-center ">{ITEM.sotiethoc}</td>                                
							<td class="text-center"> </td>
                        </tr>
					<!-- END: loop -->	
                    </tbody>
					<tfoot>
                        <tr>
                            <th class="text-center" colspan="5"> Tổng tín chỉ</th>  
                            <th class="text-center"> {sum}</th>  
                            <th class="text-center"></th>  
                        </tr>
                    </tfoot>
	</table>
</div>
<!-- END: viewinfo -->


<!-- BEGIN: main -->
<style>.phanhang{white-space:pre-wrap; word-wrap:break-word}</style>
	<!-- Page-header start -->    
    <!-- Page-header end -->
	<!-- Page-body start -->
    <div class="page-body">
        <!-- Basic table card start -->
        <div class="card">
            <div class="card-header">
                <h5>DANH SÁCH CÁN BỘ</h5>
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
			
			<form name="myform" id="myform" method="post" action="{link_frm}">
				<input type="hidden" name="checkss" id="checkss" value="{CHECKSESS}" />
				<input type="hidden" name="sta" id="sta" value="{sta}" />
				<div class="form-group  row">
					<div class="col-sm-3 col-3">
						<select name="id_khoaphong" class="form-control" onchange="find_select(this,'{link_frm}');" >
							<option value="0">Xem tất cả</option>
							<!-- BEGIN: khoaphong -->
							<option value="{r.id}" {r.select}>{r.name}</option>
							<!-- END: khoaphong -->
						</select>
					</div>
					<div class="col-sm-9">
						<div class="input-group">
							<span class="input-group-addon" id="find_text" style="width: auto;min-width:100px;">Tìm kiếm:</span>
							<input name="find_text" value="{find_text}" type="text" class="form-control" placeholder="Nhập nội dung cần tìm... nhấn Enter!" title="Nhập nội dung bạn cần tìm như họ tên,ngày sinh,địa chỉ..v.v.." data-toggle="tooltip">
						</div>
					</div>
				</div>
			</form>
			
            <div class="card-block table-border-style">
                <div class="table-responsive" style="padding-bottom: 100px;">
                    <table id="tbl_danhsach" class="table table-hover" >
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Mã BV</th>
                                <th>Họ tên</th>
                                <th>Nam/Nữ</th>
                                <th>Ngày sinh</th>
                                <th>Điện thoại</th>
                                <th>Trình độ</th>
                                <th>Khoa/phòng</th>
                                <th class="text-center">Tổng tín chỉ</th>                                
								<th>Thao tác</th>
                            </tr>
                        </thead>
                        <tbody>
						<!-- BEGIN: row -->
                            <tr class="{ROW.color}">
                                <th scope="row">{ROW.stt}</th>
                                <td>{ROW.maso_bv}</td>
                                <td>{ROW.hovaten}</td>
                                <td>{ROW.gioitinh}</td>
                                <td>{ROW.ngaysinh}</td>
                                <td>{ROW.chucvu}</td>
                                <td>{ROW.trinhdo}</td>
                                <td>{ROW.tenkhoa}</td>
                                <td class="text-center"><b>{ROW.tongtinchi}</b></td>
                                <!-- BEGIN: admin --><td>{ROW.ghichu}</td><!-- END: admin -->
                                <td><div class="dropdown-success dropdown">
								<button class="btn btn-mini btn-success dropdown-toggle waves-effect waves-light " type="button" id="dropdown-3" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">Chọn</button>
									<div class="dropdown-menu" aria-labelledby="dropdown-3" data-dropdown-in="fadeIn" data-dropdown-out="fadeOut">
										<a onclick="cb_select('{ROW.link_view}',{ROW.id});" class="dropdown-item waves-light waves-effect">Chi tiết</a>
										<a href="{ROW.link_bosung}" class="dropdown-item waves-light waves-effect">Bổ sung</a>
										
										<!-- BEGIN: admin --> <a onclick="del_msg('{ROW.link_del}','{ROW.code_pro}');" class="dropdown-item waves-light waves-effect" href="#">Xóa bỏ</a><!-- END: admin -->
									</div>
								</div>
								</td>
								
                            </tr>
                        <!-- END: row -->
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        <!-- Basic table card end -->
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
	<style>.dt-buttons {float:right;}
	.dataTables_length { padding: 10px;}</style>
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
<!-- END: main -->

