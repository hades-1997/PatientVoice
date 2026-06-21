
<!-- BEGIN: data -->
[
	<!-- BEGIN: tongbn -->
	{ngaygio:'{R.ngay}',tongbn:{R.tongbn}}<!-- BEGIN: dau -->,<!-- END: dau -->
	<!-- END: tongbn -->
	{ngaygio:'{R.ngay}',tongbn:{R.tongbn}}
]
<!-- END: data -->
			
			<!-- Bar Chart start -->
            <div class="col-md-12 col-lg-6">
                <div class="card">
                    <div class="card-header">
                        <h5>1.Tỷ lệ thực hiện kỹ thuật chuyên môn theo phân tuyến khám chữa bệnh</h5>
                        <span>Số liệu cập nhật <strong>{thoigian}</strong></span>
                        <div class="card-header-right">                                                             
					  <i class="icofont icofont-spinner-alt-5"></i>                                                         
				  </div>
                    </div>
                    <div class="card-block">
                        <div id="get_chitieu1"></div>
                    </div>
                </div>
            </div>
            <!-- Bar Chart Ends -->	 
				 
				 
<!-- BEGIN: main -->
<script src="{URL_THEMES}/js/highcharts.js"></script>
<script src="{URL_THEMES}/js/boost.js"></script>
<script src="{URL_THEMES}/js/exporting.js"></script>
<!-- Chartlist chart css -->
<link rel="stylesheet" type="text/css" href="{URL_THEMES}/assets/css/chartist/chartist.css">
<!-- Morris Chart js -->
<script src="{URL_THEMES}/assets/js/raphael/raphael.min.js"></script>
<script src="{URL_THEMES}/assets/js/morris.js/morris.js"></script>

<div class="pcoded-inner-content">
        <div class="page-wrapper">
			<div class="row">
			<!-- BEGIN: group -->
			<!-- Table start -->
				<div class="col-md-12 col-lg-6">
					<div class="card">
						<div class="card-header">
							<h5>Chỉ tiêu số {ROW.stt}:{ROW.chi_so}</h5>
							<span></span>
						</div>
						<div class="card-block">
						<table class="table table-hover" >
                        <thead>
							<tr style="background-color: #73b4ff;">
                                <th  class="align-middle text-center col-1">STT</th>
								<!-- BEGIN: kehoach -->								
								<th  class="align-middle text-center col-1">Kế hoạch <br> {namapdung}</th>								
								<!-- END: kehoach -->	
								<!-- BEGIN: solan -->								
								<th  class="align-middle text-center col-1">{TS.title}</th>								
								<!-- END: solan -->
								<th  class="align-middle text-center col-1">Đánh giá</th>										
                            </tr>
                        </thead>
                        <tbody>
							<td  class="align-middle text-center">1</td>
							<!-- BEGIN: kehoachnhap -->								
								<th  class="align-middle text-center col-1">{TS.giatri}</th>								
							<!-- END: kehoachnhap -->
							<!-- BEGIN: solannhap -->								
								<th  class="align-middle text-center col-1">{TS.giatri}</th>								
							<!-- END: solannhap -->	
							<th  class="align-middle text-center col-1">Đạt</th>							

							
                        </tbody>
					</table>	
						</div>
					</div>
				</div>
            <!-- table Ends -->	
			<!-- Bar Chart start -->
				<div class="col-md-12 col-lg-6">
					<div class="card">
						<div class="card-header">
							<h5>Biểu đồ đánh giá chỉ tiêu:{ROW.chi_so}</h5>
							<span></span>
						</div>
						<div class="card-block">
							<div id="get_chiso{ROW.stt}"></div>
						</div>
					</div>
				</div>
				<script> Morris.Bar({
							element: 'get_chiso{ROW.stt}',
							data: [{datachart}],
							xkey: 'Quy',
							ykeys: ['giatri'],
							labels: ['KQ'],
							barColors: [ '#5D9CEC', '#ff0000'],
							hideHover: 'auto',xLabelAngle: 35,
							gridLineColor: '#5D9CEC',
							resize: true
						});	
				</script>				
				<!-- Bar Chart Ends -->
			<!-- END: group -->
			</div>
	
	
	
	<div class="row">
		<!-- Table start -->
		<!-- BEGIN: list_table -->
		<!-- BEGIN: chitieu -->
				<div class="col-md-12 col-lg-6">
					<div class="card">
						<div class="card-header">
							<h5>Chỉ tiêu:{ROW.chi_so}</h5>
							<span></span>
						</div>
						<div class="card-block">
						<table class="table table-hover" >
							<thead>
								<tr style="background-color: #73b4ff;">
									<th  class="align-middle text-center col-1">STT</th>
									<th  class="align-middle text-center col-1">Nội dung</th>										
									<th  class="align-middle text-center col-1">Số SCYK <br>được báo cáo</th>										
								</tr>
							</thead>
							<tbody>
								<!-- BEGIN: loop -->	
								<tr>
								<td  class="align-middle text-center">{ITEM.stt}</td>														
								<th  class="align-middle text-left col-1">{ITEM.noidung}</th>						
								<th  class="align-middle text-center col-1">{ITEM.giatri}</th>
								</tr>								
								<!-- END: loop -->	
							</tbody>
						</table>	
						</div>
					</div>
				</div>
         <!-- table Ends -->	
		<!-- END: chitieu -->
		<!-- END: list_table -->
	</div>
	
</div>
</div>


<script src="{URL_THEMES}/js/chart.js"></script>

<!-- END: main -->


<script>
  
var url='{link}';
$(document).ready(function() {

    //showinfor();

    $(window).on('resize',function() { });
});
// Morris bar chart
//alert(url+'&act=get_chitieu1');
function showinfor(){	
$.ajax({
        type: 'post',
        cache: !1,
        url: url+'&act=get_kehoach_chitieu',
        dataType: "text",
        success: function(d) {
			Morris.Bar({
				element: 'get_kehoach_chitieu',
				data: JSON.parse(d),
				xkey: 'chitieu',
				ykeys: ['kehoach','nam'],
				labels: ['Kế Hoạch','Kết quả'],
				barColors: [ '#5D9CEC', '#ff0000'],
				hideHover: 'auto',xLabelAngle: 35,
				gridLineColor: '#5D9CEC',
				resize: true
			});
        }
    });

    return !1
	
}

//alert(url);
</script>

