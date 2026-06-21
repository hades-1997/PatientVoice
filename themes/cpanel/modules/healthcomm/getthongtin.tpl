<!-- BEGIN: dscanbotochuc -->

<div class="card-header">
    <h5>Danh sách cán bộ {tc.tentochuc}</h5>
</div>
<div class="card-block table-border-style">
    <div class="table-responsive">
        <table class="table table-hover">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Mã BV</th>
                    <th>Họ tên</th>
                    <th>Ngày sinh</th>
                    <th>Chức vụ</th>                    
                    <th>Khoa/phòng</th>
					<th>Phân công</th>
					<th>Chức vụ phân công</th>
                    <th>Ngày phân công</th>
                    <th>Thao tác</th>
                </tr>
            </thead>
            <tbody>
			<!-- BEGIN: row -->
                <tr>
                    <th scope="row">{ROW.stt}</th>
                    <td>{ROW.mabv}</td>
                    <td>{ROW.hoten}</td>
                    <td>{ROW.ngaysinh}</td>
                    <td>{ROW.chucvu}</td>
                    <td>{ROW.tenkhoa}</td>
                    <td>{ROW.noidung}</td>
                    <td>{ROW.chucvuphancong}</td>
                    <td>{ROW.ngaybatdau}</td>
                    <td><button class="btn-sm btn-inverse btn-outline-inverse"><i class="icofont icofont-exchange"></i></button></td>
                </tr>
            <!-- END: row -->
            </tbody>
        </table>
    </div>
</div>

<!-- END: dscanbotochuc -->

<!-- BEGIN: get_notification -->
	<a href="#"> <i class="ti-bell"></i> <span class="badge bg-c-pink">{msg_new}</span> </a>
    <ul class="show-notification">
        <li>
            <h6>Tin nhắn của bạn</h6>
			<a href="{viewall}">
           <label class="label label-danger">Xem tất cả</label>
			</a>
        </li>
		<!-- BEGIN: loop -->
        <li>
            <div class="media">
                <div class="col-sm-12 col-md-6 col-lg-4 col-xl-3 outer-ellipsis">
				<h1 class="d-flex align-self-center img-radius"><i class="ti-email"></i></h1></div>
                <div class="media-body">
					<h5 class="notification-user">{ROW.nguoigui}</h5>
                    <p class="notification-msg">{ROW.tieude}</p>
                    <span class="notification-time">Thời gian:{ROW.tg_nhan}</span>
                </div>
            </div>
        </li>
		<!-- END: loop -->
	</ul>
<!-- END: get_notification -->

