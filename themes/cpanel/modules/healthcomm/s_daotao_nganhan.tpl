<!-- BEGIN: main -->
<div class="col-md-12">
	<div class="card">
		<div class="card-header">
			<h4 class="" style="text-transform: uppercase;color: #4099ff;">THÔNG TIN CẬP NHẬT KIẾN THỨC Y KHOA LIÊN TỤC</h4>
		</div>	
	</div>
</div>	
<div class="table-responsive">
	<table class="table table-striped table-bordered table-hover" id="tbl_danhsach">
		<thead>
			<tr>
				<th class="text-center">STT</th>
				<th class="text-center">Họ tên</th>
				<th class="text-center">Khoa/phòng</th>
				<th class="text-center">Năm sinh</th>
				<th class="text-center">Chức vụ</th>
				<th class="text-center">Nghề nghiệp</th>
				<th class="text-center">Trình độ chuyên môn</th>
				<th class="text-center">Từ ngày</th>
				<th class="text-center">Đến ngày</th>
				<th class="text-center">Hình thức đào tạo</th>
				<th class="text-center">Loại đào tạo</th>
				<th class="text-center">Nội dung/chủ đề</th>
				<th class="text-center">Đơn vị đào tạo/xác nhận</th>
				<th class="text-center">Tổng số giờ tín chỉ</th>
				<th class="text-center">Tình trạng</th>
			</tr>
		</thead>

		<tbody>
			<!-- BEGIN: loop -->
			<tr>
				<td class="text-center">{ROW.stt}</td>
				<td class="text-center">{ROW.hovaten}</td>
				<td class="text-center">{ROW.tenkhoa}</td>
				<td class="text-center">{ROW.ngaysinh}</td>
				<td class="text-center">{ROW.chucvu}</td>
				<td class="text-center">{ROW.nghe_nghiep}</td>
				<td class="text-center">{ROW.trinhdo}</td>
				<td class="text-center">{ROW.tungay}</td>
				<td class="text-center">{ROW.denngay}</td>
				<td class="text-center">{ROW.htdaotao}</td>
				<td class="text-center">{ROW.loaidaotao}</td>
				<td class="text-center">{ROW.noidung}</td>
				<td class="text-center">{ROW.dv_xacnhan}</td>
				<td class="text-center">{ROW.tongsogio}</td>
				<td class="text-center "><strong>{ROW.tinhtrang}</strong></td>
			</tr>
			<!-- END: loop -->
		</tbody>
	</table>
</div>

{FILE "export.tpl"}					 		
<!-- END: main -->