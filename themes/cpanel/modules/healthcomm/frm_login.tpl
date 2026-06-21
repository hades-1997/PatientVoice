<!-- BEGIN: main -->
<!-- Authentication card start -->
<div class="login-card card-block auth-body mr-auto ml-auto">
    <form class="md-float-material" action="{url_login}" method="post" onsubmit="return login_validForm(this);">
        <div class="text-center"><input name="nv_redirect" id="nv_redirect" value="{redirect}" type="hidden" />  </div>
        <div class="auth-box">
            <div class="row m-b-20">
                <div class="col-md-12">
                    <h3 class="text-left txt-primary">Đăng Nhập</h3>
                </div>
            </div>
            
			<div class="row">
                <div class="col-md-12">
                    <p class="text-inverse text-left m-b-0">{lang.title_login}.</p>
                </div>
			</div>
            <hr/>
            <div class="input-group">
				<input type="text" class="required form-control" placeholder="Tên đăng nhập hoặc email" value="" name="nv_login" maxlength="100" data-pattern="/^(.){1,}$/" onkeypress="validErrorHidden(this);" data-mess="Tên đăng nhập chưa được khai báo">
                <span class="md-line"></span>
            </div>
            <div class="input-group">
				<input type="password" autocomplete="off" class="required form-control" placeholder="Mật khẩu" value="" name="nv_password" maxlength="100" data-pattern="/^(.){3,}$/" onkeypress="validErrorHidden(this);" data-mess="Mật khẩu đăng nhập chưa được khai báo">
                <span class="md-line"></span>
            </div>
            <div class="row m-t-25 text-left">
                <div class="col-sm-7 col-xs-12">
                    <div class="checkbox-fade fade-in-primary">
                        <label>
                            <input type="checkbox" value="">
                            <span class="cr"><i class="cr-icon icofont icofont-ui-check txt-primary"></i></span>
                            <span class="text-inverse">{lang.nho_pass}</span>
                        </label>
                    </div>
                </div>
				<div class="col-sm-5 col-xs-12 forgot-phone text-right">
                    <a href="{url_pass}" class="text-right f-w-600 text-inverse"> Quên mật khẩu?</a>
                </div>
            </div>
            <div class="row m-t-30">
                <div class="col-md-12">
                    <button type="submit" class="btn btn-primary btn-md btn-block waves-effect text-center m-b-20">{GLANG.loginsubmit}</button>
                </div>
            </div>
            <hr/>
			<div class="row">
                <div class="col-md-12">
                    <p class="text-inverse text-left m-b-0">Đơn vị phát triển: Trung tâm Dịch vụ truyền thông và Giải pháp sáng tạo Quang Minh.</p>
                    <p class="text-inverse text-left"><b>Hotline:0379.811.530 </b></p>
                </div>
            </div>
        </div>
    </form>
    <!-- end of form -->
</div>
<!-- Authentication card end -->
<!-- END: main -->

			