<!-- BEGIN: main -->
<link type="text/css" href="{URL_THEMES}/assets/css/daotao.css" rel="stylesheet" />
<div class="col-md-12">
	<div class="card">
		<div class="card-header">
			<h4 class="" style="text-transform: uppercase;color: #4099ff;">Số lượng nhân viên y tế theo các mức giờ tín chỉ theo khoa, phòng hàng năm</h4>
			<form name="myform" id="myform" method="post" action="{SUBMIT}">
				<input type="hidden" name="check" id="check" value="{CHECK}">
				<input type="hidden" name="sta" id="sta" value="find_item">
				<div class="form-group  row">
					<div class="col-sm-4 col-4 mt-3">
						<select name="year" class="form-control">
							<option value="">Chọn năm</option>
							<!-- BEGIN: year -->	
							<option value="{YEAR.id}" {YEAR.select}>{YEAR.name}</option>
							<!-- END: year -->
						</select>
					</div>
				</div>
				<input type="submit" name="Tìm kiếm" id="btn-search" class="btn btn-primary"
					style=" text-align: center; margin: auto; display: block; ">
			</form>
		</div>	
	</div>
</div>	
<div class="table-responsive">
	<table class="table table-striped table-bordered table-hover" id="tbl_danhsach">
		<thead>
			<tr>
				<th class="text-center">Khoa, phòng</th>
				<th class="text-center">&lt;12</th>
				<th class="text-center">12&lt;= x &lt;24</th>
				<th class="text-center">24&lt;= x &lt;48</th>
				<th class="text-center">48&lt;= x &lt;120</th>
				<th class="text-center">&gt;=120</th>
			</tr>
		</thead>
					
		<tbody>
			<!-- BEGIN: loop -->
			<tr>
				<td class="text-center">{DATA.tenkhoa}</td>
				<td class="text-center">{DATA.count_lt_12}</td>
				<td class="text-center">{DATA.count_12_to_24}</td>
				<td class="text-center">{DATA.count_24_to_48}</td>
				<td class="text-center">{DATA.count_48_to_120}</td>
				<td class="text-center">{DATA.count_120}</td>
			</tr>
			<!-- END: loop -->
		</tbody>
	</table>
</div>

<div class="">
	<div class="row">
		<div class="col-md-12 col-lg-12">
			 <div class="card">
				 <div class="card-header">
					<h5>Số lượng nhân viên y tế</h5>
					 <div class="card-header-right">
						<div class="label-main">
						 <!--<a title="In đồ thị này" onclick="printDiv('pie_benhnhan');" class="label  btn-warning"><i class="fa fa-print"></i></a>-->
						</div>                                                        
					</div>
				 </div>
				 <div class="card-block">
					<label class="label label-success">Line Chart</label>
      				<div id="line-chart"></div>
				 </div>
			 </div>
		 </div>
	</div>
</div>		
{FILE "export.tpl"}
<style>
	.morris-hover {
		min-width: 300px !important;
	}
</style>
<!-- Chartlist chart css -->
<script src="{URL_THEMES}/assets/js/raphael/raphael.min.js"></script>
<script src="{URL_THEMES}/assets/js/morris.js/morris.js"></script>	

<script>
	const res = {JSONDATA};
var data = res,
    config = {
      data: data,
      xkey: 'y',
      ykeys: ['a','b','c','d','e'],
      labels: ['<12', '12<= x < 24', '24<= x < 48', '48<= x < 120', '>120'],
      fillOpacity: 0.6,
      hideHover: 'auto',
	  parseTime: false,
      behaveLikeLine: true,
      resize: true,
      pointFillColors:['#ffffff'],
      pointStrokeColors: ['black'],
      lineColors:['gray','red','blue','yellow','#008080']
  };
config.element = 'line-chart';
Morris.Line(config);

</script>				 		
<!-- END: main -->