<!-- BEGIN: main-->
 <style>
    a.del {
        background-color: red;
        padding: 5px 10px;
        border-radius: 3px;
        color: #fff !important;
        font-weight: 300;
        font-size: 11px;
    }

 </style>
    <div class="panel-heading">
       <div class="row">
        <h3 style="float:left"><i class="fa fa-list"></i>Quản lý quyền account</h3>
        <div class="pull-right">
            <a href="{ADD_KP}" class="btn btn-success btn-sm" data-placement="top" data-original-title="Thêm mới"> <i class="fa fa-plus"></i></a> 
        </div>
       </div>
    </div>
<div class="table-responsive">
    <table class="table table-striped table-bordered table-hover">
        <thead>
            <tr>
                <th class="text-center">STT</th>
                <th class="text-center">Account</th>
                <th class="text-center">Tên khoa</th>
                <th class="text-center">Nhóm quyền</th>
                <th>&nbsp;</th>
            </tr>
        </thead>
        <tbody>
            <!-- BEGIN: loop -->
            <tr>
                <td class="text-center">{STT}</td>
                <td class="text-center">{DATA.account}</td>
                <td class="text-center">{DATA.tenkhoa}</td>
                <td class="text-center">{DATA.id_nhomquyen}</td>
                <td class="text-center">
                    <a title=""  href="{DATA.edit}"  class="btn btn-info btn-xs" data-toggle="tooltip" data-original-title="Sửa" style=" line-height: normal !important;font-size: 12px;    padding: 3px 10px;">
                        <em class="fa fa-edit"></em>
                        <span class="visible-xs-inline-block">&nbsp;Sửa</span>
                    </a>
                    <a title="" class="del"  href="{DATA.destroy}"  class="btn btn-danger btn-xs">
                        <em class="fa fa-trash-o"></em>
                        <span class="visible-xs-inline-block">&nbsp;Delete</span>
                    </a>
                </td>
            </tr>
            <!-- END: loop -->
        </tbody>

    </table>
</div>
<script type="text/javascript">
   $("a.del").click(function() {
		confirm("Bạn có chắc chắn xóa tài khoản khỏi quyền sử dụng của module này không ?") && $.ajax({
			type : "POST",
			url : "{MODULE_URL}",
			data : "del=" + $(this).attr("href"),
			success : function(a) {
				console.log(a);
                 "OK" == a ? window.location.href = window.location.reload(true) : alert(a)
			}
		});
		return !1
	});
</script>

<!-- END: main-->