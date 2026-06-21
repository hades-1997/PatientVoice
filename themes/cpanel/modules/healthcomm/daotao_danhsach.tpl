<!-- BEGIN: main -->
<!-- Page-header start -->
    <!-- Page-header end -->
	
	<div class="col-sm-12">
        <!-- Tooltips on textbox card start -->
        <div class="card">
	<!-- BEGIN: item -->
	<div class="table-responsive" style="padding-bottom: 100px;">
        <table class="table table-hover" >
            <thead>
				<tr>
                    <th colspan="8" class="text-center">PHÂN BỐ ÁP DỤNG BỘ CHỈ TIÊU NĂM {namapdung}</th>
                </tr>
                <tr>
                    <th>#</th>
                    <th>Chỉ tiêu</th>
                    <th>Thành tố</th>
                    <th>Phạm vi áp dụng</th>
                    <th>Khoa/phòng cung cấp</th>
                    <th>Thời gian cung cấp</th>
                    <th>Trạng thái</th>
                    <th>Thao tác</th>
                </tr>
            </thead>
            <tbody>
			<!-- BEGIN: row -->
                <tr >
                    <th scope="row">{ROW.stt}</th>
                    <td>{ROW.chi_so}</td>
                    <td><label class="label label-inverse-primary"><b>{ROW.thanh_to}</b></label> </td>
					<td> {ROW.pham_vi} </td>
                    <td>{ROW.list_khoacungcap}</td>
                    <td><label class="label label-inverse-danger"><b>{ROW.tansuatgui}</b></label> </td>
                    <td><label class="label label-success">Đã khởi tạo</label>  </td>                                
                    <td> 
					<div class="dropdown-success dropdown">
						<button class="btn btn-success dropdown-toggle waves-effect waves-light " type="button" id="dropdown-3" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">Thao tác</button>
						<div class="dropdown-menu" aria-labelledby="dropdown-3" data-dropdown-in="fadeIn" data-dropdown-out="fadeOut">
							<a onlick="<scrip>alert('Đang cập nhật chức năng này')</scrip>" class="dropdown-item waves-light waves-effect" href="#"><i class="ti-pencil-alt"></i> Nhập số liệu</a>
							<a class="dropdown-item waves-light waves-effect" href="#"><i class="ti-settings"></i> Cài đặt khác</a>
						</div>
					</div>
					</td>                                
                </tr>
            <!-- END: row -->
            </tbody>
        </table>
    </div>
	<!-- END: item -->
	</div>
	<!-- Tooltips on textbox card end -->
    </div>	
	{JS}
<!-- END: main -->