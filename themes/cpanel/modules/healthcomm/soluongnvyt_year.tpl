<!-- BEGIN: main -->
<link type="text/css" href="{URL_THEMES}/assets/css/daotao.css" rel="stylesheet" />
<div class="col-md-12">
	<div class="card">
		<div class="card-header">
			<h4 class="" style="text-transform: uppercase;color: #4099ff;">Số lượng nhân viên y tế theo các mức giờ tín chỉ trong năm</h4>
			<form name="myform" id="myform" method="post" action="{SUBMIT}">
				<input type="hidden" name="check" id="check" value="{CHECK}">
				<input type="hidden" name="sta" id="sta" value="find_item">
				<div class="form-group  row">
					<div class="col-sm-4 col-4">
						<select name="id_khoaphong" class="form-control">
						<option value="">Chọn khoa phòng</option>
						<!-- BEGIN: khoaphong -->	
						<option value="{KP.id}" {KP.select}>{KP.name}</option>
						
						<!-- END: khoaphong -->	
						</select>
					</div>
					<div class="col-sm-4 col-4">
						<select name="chucvu" class="form-control">
							<option value="">Chọn chức vụ</option>	
							<!-- BEGIN: chucvu -->	
							<option value="{CV.id}" {CV.select}>{CV.name}</option>
							<!-- END: chucvu -->
						</select>
					</div>
					<div class="col-sm-4 col-4 ">
						<select name="trinhdo" class="form-control">
							<option value="">Chọn trình độ</option>
							<!-- BEGIN: trinhdo -->	
							<option value="{TD.id}" {TD.select}>{TD.name}</option>
							<!-- END: trinhdo -->
						</select>
					</div>
					<div class="col-sm-4 col-4 mt-3">
						<select name="nghenghiep" class="form-control">
							<option value="">Chọn nghề nghiệp</option>
							<!-- BEGIN: nghenghiep -->	
							<option value="{NP.name}" {NP.select}>{NP.name}</option>
							<!-- END: nghenghiep -->
						</select>
					</div>
					<div class="col-sm-4 col-4 mt-3">
						<select name="gioitinh" class="form-control">
							<option value="">Chọn giới tính</option>
							<!-- BEGIN: gioitinh -->	
							<option value="{GT.id}" {GT.select}>{GT.name}</option>
							<!-- END: gioitinh -->
						</select>
					</div>
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
				<th class="text-center">Tổng số giờ tín chỉ</th>
				<th class="text-center">Số nhân viên </th>
			</tr>
		</thead>

		<tbody>
			<tr>
				<td class="text-center">&lt;12</td>
				<td class="text-center">{total_cb}</td>
			</tr>
			<tr>
				<td class="text-center">12 &lt;= x &lt; 24</td>
				<td class="text-center">{total_cb1}</td>
			</tr>
			<tr>
				<td class="text-center">24 &lt;= x &lt; 48</td>
				<td class="text-center">{total_cb2}</td>
			</tr>
			<tr>
				<td class="text-center">48 &lt;= x &lt; 120</td>
				<td class="text-center">{total_cb3}</td>
			</tr>
			<tr>
				<td class="text-center">&gt;= 120</td>
				<td class="text-center">{total_cb4}</td>
			</tr>
		</tbody>
	</table>
</div>

<div class="">
	<div class="row">
		<div class="col-md-12 col-lg-6">
			 <div class="card">
				 <!-- <div class="card-header">
					<h5>Số lượng nhân viên y tế</h5>
					 <div class="card-header-right">
						<div class="label-main">
						 <div class="label-main">
							<a title="In đồ thị này" id="printPieTke" onclick="printDiv('pieTke')" class="label  btn-warning"><i class="fa fa-print"></i></a>
						</div> 
						</div>                                                        
					</div>
				 </div> -->
				 <div class="card-block" >
					<div id="pieTke"></div>
				 </div>
			 </div>
		 </div>
		 <div class="col-md-12 col-lg-6">
			 <div class="card">
				 <div class="card-header">
					<h5>Số lượng nhân viên y tế biểu đồ bar</h5>
					 <div class="card-header-right">
						<div class="label-main">
						 <a title="In đồ thị này" onclick="printDiv('bar_tke');" class="label  btn-warning"><i class="fa fa-print"></i></a>
						</div>                                                        
					</div>
				 </div>
				 <div class="card-block">
					<div id="bar_tke"></div>
				 </div>
			 </div>
		 </div>
	</div>
</div>		
<style>
	a.canvasjs-chart-credit {
		display: none;
	}
</style>
{FILE "export.tpl"}	



<!-- Chartlist chart css -->
<link rel="stylesheet" type="text/css" href="{URL_THEMES}/assets/css/chartist/chartist.css">
<script src="{URL_THEMES}/assets/js/raphael/raphael.min.js"></script>
<script src="{URL_THEMES}/assets/js/morris.js/morris.js"></script>
<script type="text/javascript" >
window.onload = function () {  
	Morris.Bar({
		element: 'bar_tke',
		data: [
			{label:'<12',value: {total_cb}},
			{label:'12 <= x < 24',value:{total_cb1}},
			{label:'24 <= x < 48',value:{total_cb2}},
			{label:'48 <= x < 120',value:{total_cb3}},
			{label:'>= 120',value:{total_cb4}}
		],
		xkey: 'label',
		ykeys: ['value'],
		labels: ['Value'],
		barColors: ['#5FBEAA', '#34495E', '#FF9F55', '#E74C3C', '#1ABC9C', '#2ECC71'],
		hideHover: 'auto',xLabelAngle: 35,
		gridLineColor: '#5D9CEC',
		resize: true
	});

}


</script>
<script src="{URL_THEMES}/assets/highcharts/highcharts.js"></script>
<script src="{URL_THEMES}/assets/highcharts/accessibility.js"></script>
<script src="{URL_THEMES}/assets/highcharts/exporting.js"></script>

<script >
$(document).ready (function(){  
	var datas = {DATA_PIE};
	Highcharts.chart('pieTke', {
    chart: {
        type: 'pie'
    },
    title: {
        text: 'Số lượng nhân viên y tế'
    },
    tooltip: {
        valueSuffix: '%'
    },
    subtitle: {
        text:
        ''
    },
    plotOptions: {
        series: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: [{
                enabled: true,
                distance: 20
            }, {
                enabled: true,
                distance: -40,
                format: '{point.percentage:.1f}%',
                style: {
                    fontSize: '1.2em',
                    textOutline: 'none',
                    opacity: 0.7
                },
                filter: {
                    operator: '>',
                    property: 'percentage',
                    value: 10
                }
            }]
        }
    },
    series: [
        {
            name: 'Percentage',
            colorByPoint: true,
            data: datas
        }
    ]
});

}) 
</script>

<script>
function printDiv(divName) {
     var printContents = document.getElementById(divName).innerHTML;
     var originalContents = document.body.innerHTML;
     document.body.innerHTML = printContents;

     window.print();

     document.body.innerHTML = originalContents;
} 
  
</script>

<!-- END: main -->
