<input name='selectname' value='{DATA.select_name}' type='text' class='form-control' placeholder="Ví dụ: Đào Tạo từ xa">
<!-- BEGIN: main -->
<style>
.phanhang{white-space:pre-wrap; word-wrap:break-word}
</style>
<div class="col-md-12">
	<div class="row">
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
		
		<div class="col-md-12 col-lg-6">
			<div class="card">
				<div class="card-header">
					<h5 style="text-transform: uppercase;">DANH SÁCH {title}</h5><span></span>
				</div>
			<div class="card-block">	
			
			<table id="tbl_danhsach" class="table table-hover" >
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>{LANG.selectcode}</th>
                                <th>{LANG.selectname}</th>
                                <th>Ghi chú</th>                                
								<th>Thao tác</th>
                            </tr>
                        </thead>
                        <tbody>
						<!-- BEGIN: item -->
							<tr>
                                <td class="text-center phanhang">{ITEM.stt}</td>
								<td class="text-center phanhang">{ITEM.select_code}</td>
								<td class="text-left phanhang">{ITEM.select_name}</td>
								<td class="text-center phanhang"> </td>                                
								<td class="text-center  align-middle">
								<a href="{ITEM.link_edit}">
								<label class="label label-warning"><b><i class="ti-pencil"></i> Sửa</b></label> 
								</a>
								</td>
                            </tr>
						<!-- END: item -->	
                        </tbody>
			</table>
			
			</div>
		</div>	
	</div>	
</div>	
	
	
	{JS}
<script>
	function setdefault_item(url,a){
		if (confirm('Bạn có chắc chắn áp dụng mặc định?')) {//link_del
        $.post(url, 'token=' + a, function(res) {
            var r_split = res.split("_");
            if (r_split[0] == 'OK') {
                 location.reload();
            } else if (r_split[0] == 'ERR') {
                alert(r_split[1]);
            } else {
                alert(nv_is_del_confirm[2]);
            }
        });
    }
	return false;
}





</script>
<!-- END: main -->