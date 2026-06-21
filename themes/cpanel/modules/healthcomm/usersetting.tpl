<!-- BEGIN: main -->
	<div class="page-body">
        <div class="row">
            <div class="col-sm-12">
                <div class="card">
                    <div class="card-header">
                        <h5>CÀI ĐẶT TÀI KHOẢN</h5>
                        <span></span>
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
                    <div class="card-block">
							<!-- Container-fluid starts -->
							<div class="container-fluid">
								<div class="row">
									<div class="col-sm-12">
										<!-- Authentication card start -->
										<div class="signup-card card-block auth-body mr-auto ml-auto">
											<div class="md-float-material">
												<div class="auth-box">
													<div class="row">
														<div class="col-md-10">
															<p class="text-inverse text-left m-b-0">Chi tiết tài khoản.</p>
														</div>
														<div class="col-md-2"><img src="{USER.photo}" class="img-radius" alt="image" style="height:45px"></div>
													</div>
												
													<hr/>
													<dl class="dl-horizontal row">
														<dt class="col-sm-3">Tài khoản:</dt>
														<dd class="col-sm-9">{USER.username}</dd>
														<dt class="col-sm-3">Khoa/Phòng:</dt>
														<dd class="col-sm-9">{USER.name}</dd>
														<dt class="col-sm-3">Email:</dt>
														<dd class="col-sm-9">{USER.email}</dd>
													</dl>													
													<hr/>
													<div id="changpass" style="display:none">
													<form name="myform" method="post" action="{FORM_ACTION}" onsubmit="return nv_execute_frm(this);">
														<input type="hidden" name="checkss" id="checkss" value="{CHECKSESS}" />
														<input type="hidden" name="changepass" value="1" />
														
														<div class="input-group">
															<span class="input-group-addon" id="new_pass" style="width: auto;">Mật khẩu mới:</span>
															<input name="new_pass" value="" type="password" class="form-control" required >
														</div>
														<div class="input-group">
															<span class="input-group-addon" id="renew_pass" style="width: auto;">Nhập lại MK mới:</span>
															<input name="renew_pass" value="" type="password" class="form-control" required >
														</div>
														
														<div class="row">
															<div class="col-md-6 text-center">
																<button type="submit" class="btn btn-out-dotted btn-info btn-square">
																<i class="icofont icofont-exchange "></i>Cập nhật</button>
															</div>
															<div class="col-md-6 text-center">
																<button onclick="show_change('opt','changpass')" class="btn btn-out-dotted btn-inverse btn-square">
																<i class="icofont icofont-exchange"></i>Hủy bỏ</button>
															</div>
														</div>
														<hr/>
														</form> 
													</div>
													
													<div class="row" id="opt">
														<div class="col-md-6 text-center">
															<button onclick="changeAvatar('{USER.link_avatar}');"  class="btn btn-inverse btn-outline-inverse">
															<i class="icofont icofont-exchange "></i>Đổi hình đại diện</button>
														</div>
														<div class="col-md-6 text-center">
															<button onclick="show_change('changpass','opt')" class="btn btn-inverse btn-outline-inverse">
															<i class="icofont icofont-exchange"></i>Đổi mật khẩu</button>
														</div>
													</div>
													
												</div>
											</div>
											<!-- end of form -->
										</div>
										<!-- Authentication card end -->
									</div>
									<!-- end of col-sm-12 -->
								</div>
								<!-- end of row -->
							</div>
							<!-- end of container-fluid -->
                    </div>
                </div>
            </div>
        </div>
    </div>
<!-- END: main -->