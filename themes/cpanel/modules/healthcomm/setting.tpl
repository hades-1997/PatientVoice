<!-- BEGIN: main -->
<!-- Page-header start -->
    <!-- Page-header end -->
	<div class="col-sm-12">
        <!-- Tooltips on textbox card start -->
        <div class="card">
            <div class="card-header">
                <h5 class="m-b-10">CẬP NHẬT DS BỘ CHỈ TIÊU TỪ EXCEL</h5>
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
			<form name="myform" id="myform" method="post" action="{link_frm}" enctype="multipart/form-data">
			<input type="hidden" name="checkss" id="checkss" value="{CHECKSESS}" />
			<input type="hidden" name="sta" id="sta" value="{sta}" />
			<input type="hidden" name="id" id="id" value="{ROW.id}" />
			
            <div class="card-block tooltip-icon button-list">
				<div class="form-group row">
					<label class="col-sm-2 col-form-label">Upload File</label>
					<div class="col-sm-10">
						<input name="file" type="file" required="required" class="form-control">
					</div>
				</div>
                <button type="submit" class="btn btn-out-dashed btn-info btn-square" data-toggle="tooltip" data-placement="right" title="Cập nhật thông tin"> 
				<i class="icofont icofont-check-circled"></i> Cập Nhật</button>	
            </div>
        </div>
		</form>
        <!-- Tooltips on textbox card end -->
		<!-- BEGIN: data -->
			<table class="table table-striped table-bordered table-hover" >
			<tbody>
			<!-- BEGIN: row -->
				<tr {color}>
				<!-- BEGIN: item -->
					<td class="text-center">{item}</td>
				<!-- END: item -->
				</tr>
			<!-- END: row -->
			</tbody>
			</table>
			
		<!-- END: data -->
    </div>
	
	<div class="col-sm-12">
        <!-- Tooltips on textbox card start -->
        <div class="card">
            <div class="card-header">
                <h5 class="m-b-10">CẬP NHẬT TÀI KHOẢN PHÒNG VÀO HỆ THỐNG</h5>
                
            </div>			
			<form name="myform" id="myform" method="post" action="{link_frm}">
			<input type="hidden" name="checkss" id="checkss" value="{CHECKSESS}" />
			<input type="hidden" name="sta" id="sta" value="update_account" />
			<input type="hidden" name="id" id="id" value="{ROW.id}" />
			
            <div class="card-block tooltip-icon button-list">
                <button type="submit" class="btn btn-out-dashed btn-info btn-square" data-toggle="tooltip" data-placement="right" title="Cập nhật thông tin"> 
				<i class="icofont icofont-check-circled"></i> Cập Nhật tài khoản</button>	
            </div>
        </div>
		</form>
        <!-- Tooltips on textbox card end -->
		<!-- BEGIN: phong -->
			<table class="table table-striped table-bordered table-hover" >
			<tbody>
			<!-- BEGIN: row -->
				<tr {color}>
					<td class="text-center">{item}</td>
				</tr>
			<!-- END: row -->
			</tbody>
			</table>
			
		<!-- END: phong -->
    </div>
	
	
	
	{JS}
<!-- END: main -->