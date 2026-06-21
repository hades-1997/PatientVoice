
<!-- BEGIN: main -->
  <!-- BEGIN: error -->
  <div class="alert alert-warning">{error}</div>
  <!-- END: error -->
<div id="content">
	<div class="panel panel-default">
		<div class="panel-heading">
			<h3 class="panel-title" style="float:left"><i class="fa fa-pencil"></i> {CAPTION}</h3>
			<div style="clear:both"></div>
		</div>
		<div class="panel-body">
			<form class="form-horizontal" action="{NV_BASE_ADMINURL}index.php" method="post">
				<input type="hidden" name ="{NV_NAME_VARIABLE}" value="{MODULE_NAME}" />
				<input type="hidden" name ="{NV_OP_VARIABLE}" value="{OP}" />
				<input type="hidden" name ="id" value="{DATA.id}" />
				<input name="savekp" type="hidden" value="1" />
				<div class="form-group">
					<label class="col-sm-4 control-label" for="account">Account</label>
					<div class="col-sm-20">
						<input type="text" name="account" value="{DATA.account}" class="form-control w500"/>
					</div>
				</div>
				<div class="form-group">
					<label class="col-sm-4 control-label" for="tenkhoa">Tên Khoa Phòng</label>
					<div class="col-sm-20">
						<input type="text" name="tenkhoa" value="{DATA.tenkhoa}" class="form-control w500"/>
					</div>
				</div>
				<div class="text-center">
					<input class="btn btn-primary" name="submit1" type="submit" value="{LANG.save}" />
				</div>
			</form>
		</div>
	</div>
</div>
<!-- END: main -->