<!-- BEGIN: main -->

<!-- Page-header start -->
<div class="page-header card">
    <div class="card-block">
        <h5 class="m-b-10">BÁO CÁO CHỈ TIÊU ĐÃ NHẬP NĂM {namapdung}</h5>
        <p class="text-muted m-b-10"> {donvi}</p>
    </div>
</div>
<!-- Page-header end -->

<div class="page-body">
    
     <div class="page-body">
       <div class="row">
          <!-- order-card start -->
          <!-- BEGIN: chitieu -->
          <div class="col-md-6 col-lg-4">
                <div class="card">
                    <div class="card-block text-center"  style="min-height: 250px;">
                        <i class="fa fa-file-text-o  text-c-green d-block f-40"></i>
                        <h4 class="m-t-20"><span class="text-c-blgreenue"></span> {ROW.chi_so}</h4>
                        <p class="m-b-20">Thời gian cung cấp: {ROW.tansuatgui} </p>
                        <button onclick="openForm('{ROW.link_detail}',0,0);" class="btn btn-success btn-sm btn-round">Xem Báo Cáo</button>
                    </div>
                </div>
            </div>
          <!-- END: chitieu -->
          <!-- order-card end -->
        </div>
    </div>


    <!-- Basic table card start -->
    <div class="card">
        <span id="resurt"></span>
    </div>
    <!-- Basic table card end -->
</div>



<!-- END: main -->
