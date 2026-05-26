@extends('layouts.master')
@section('title',' Balance Sheet')
@section('stylesheet')
    <link rel="stylesheet" href="/assets/css/profile_pg.css">
    <link rel="stylesheet" href="/assets/sweet-alert/sweetalert.css">
    <script src="/assets/sweet-alert/alert-customize.js"></script>
    <script type="text/javascript">
        function success(){
            const Toast = Swal.mixin({
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 3000,
              timerProgressBar: true,
              didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
              }
            })

            Toast.fire({
              icon: 'success',
              title: '<?php echo session('success'); ?>'
            })
        }

        function error(){
            const Toast = Swal.mixin({
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 3000,
              timerProgressBar: true,
              didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
              }
            })

            Toast.fire({
              icon: 'error',
              title: '<?php echo session('error'); ?>'
            })
        }
    </script>
    <style type="text/css">
        .form-horizontal .dropdown-menu{
            width: 96%;
        }
    </style>
@stop

@section('content')
    @if(Session::has('success'))
        <?php
        echo '<script type="text/javascript">success();</script>';
        ?>
    @endif

    @if(Session::has('error'))
        <?php
        echo '<script type="text/javascript">error();</script>';
        ?>
    @endif

    <?php
        include(app_path().'/External_Files/array.php');
    ?>

    <div class="main-wrapper scrollspy-container">

        <div class="breadcrumb-wrapper hidden-xs pap">
            <div class="container">
                <div class="row">
                    <div class="col-xs-12 col-sm-6">
                        <a href="/BalanceSheet"><h2> Click: Balance Sheet</h2></a>
                    </div>
                    <div class="col-xs-12 col-sm-6">
                        <ol class="breadcrumb">
                            <li>
                                <!--<img src="/assets/picture/profile.png">-->
                            </li>
                        </ol>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="container-outer">
            <div class="container pb-20">
                <div class="row">        

                    <div class="col-xs-12">
                        <h1 class="reg_1" style="margin-top:20px;">
                            <i class="fa fa-money"></i>&nbsp; Balance Sheet
                        </h1>
                        <p class="reg_m_p"> 
                            Gain insights into account payment orders, including transaction details, invoices, and payment statuses. This comprehensive overview provides visibility into financial transactions and their associated documentation. Stay informed about the status of payments and track transaction history effortlessly.
                        </p>
                        <div class="row">
                            <div class="col-12 col-sm-6 col-md-4 col-lg-2">
                                <a class="btn btn-primary btn-block btn-lg" data-toggle="modal" href="#c_date" style="margin-top:5px; padding: 10px 0px;">
                                    Search OrderDate
                                </a>
                            </div>
                            
                            <div class="col-12 col-sm-6 col-md-4 col-lg-3">
                                <a class="btn btn-primary btn-block" data-toggle="modal" href="#c_ship" style="margin-top:5px; padding: 10px 0px;">
                                    By Shipment Arrival Date
                                </a>
                            </div>
                            
                            <div class="col-12 col-sm-6 col-md-4 col-lg-2">
                                <a class="btn btn-primary btn-block" data-toggle="modal" href="#c_vin" style="margin-top:5px; padding: 10px 0px;">
                                    By VIN No
                                </a>
                            </div>
                            
                            <div class="col-12 col-sm-6 col-md-4 col-lg-3">
                                <a class="btn btn-primary btn-block" data-toggle="modal" href="#c_code" style="margin-top:5px; padding: 10px 0px;">
                                    By Order Code or BL No
                                </a>
                            </div>
                            
                            <div class="col-12 col-sm-12 col-md-4 col-lg-2">
                                <a class="btn btn-primary btn-block" data-toggle="modal" href="#c_model" style="margin-top:5px; padding: 10px 0px;">
                                    By Models or Years
                                </a>
                            </div>
                        </div>
                        
                        <main class="table-responsive">
                            @if(!$data->isEmpty()) 
                            <table class="table table-bordered table-hover table-striped">
                                <tbody class="invoice-index">
                                    <tr>
                                        <th style="background-color: #AA66CC; color: #fff;">
                                            Sr.
                                        </th>
                                        <th style="background-color: #AA66CC; color: #fff;">    
                                            Date
                                        </th style="background-color: #AA66CC; color: #fff;">
                                        <th style="background-color: #AA66CC; color: #fff;">
                                            ETA
                                        </th>
                                        <th style="background-color: #AA66CC; color: #fff;">
                                            Item [Chassis]
                                        </th>
                                        <th style="background-color: #AA66CC; color: #fff;">
                                            Remarks
                                        </th>
                                        <th style="background-color: #AA66CC; color: #fff;">
                                            Qty
                                        </th>
                                        <th style="background-color: #AA66CC; color: #fff;">
                                            FOB
                                        </th>
                                        <th style="background-color: #AA66CC; color: #fff;">
                                            Freight
                                        </th>
                                        <th style="background-color: #AA66CC; color: #fff;">
                                            Discount
                                        </th>
                                        <th style="background-color: #AA66CC; color: #fff;">
                                            Sale Value
                                        </th>
                                        <th style="background-color: #AA66CC; color: #fff;">
                                            Commission
                                        </th>
                                        <th style="background-color: #AA66CC; color: #fff;">
                                            Net Value
                                        </th>
                                        <th style="background-color: #AA66CC; color: #fff;">   
                                            Deposit
                                        </th>
                                        <th style="background-color: #AA66CC; color: #fff;">   
                                            Balance
                                        </th>
                                    </tr>
                                    
                                    @php
                                        $grandTotalFob = 0; // Initialize grand total variable
                                        $grandTotalFreight = 0;
                                        $grandTotalDis = 0;
                                        $grandTotalCom = 0;
                                        $grandTotalDop = 0;
                                        $grandTotalQty = 0;
                                        
                                        $currentMonth = null;
                                        $subtotalFob = 0;
                                        $subtotalQty = 0;
                                        $subtotalFre = 0;
                                        $subtotalDis = 0;
                                        $subtotalCom = 0;
                                        $subtotalDop = 0;
                                    @endphp
                                    
                                    @foreach($data as $key => $u)
                                    
                                        @php
                                            $grandTotalFob += $u->fob; // Add current fob value to grand total
                                            $grandTotalFreight += $u->freight;
                                            $grandTotalDis += $u->discount;
                                            $grandTotalCom += $u->commission;
                                            $grandTotalDop += $u->deposit;
                                            $grandTotalQty += $u->quantity;
                                            
                                            // Check if the month has changed
                                            $month = \Carbon\Carbon::parse($u->date)->format('m');
                                            if ($month !== $currentMonth) {
                                                // If month has changed, display subtotal and reset for the next month
                                                if ($currentMonth !== null) {
                                                    $subtotalFob = 0;
                                                    $subtotalQty = 0;
                                                    $subtotalFre = 0;
                                                    $subtotalDis = 0;
                                                    $subtotalCom = 0;
                                                    $subtotalDop = 0;
                                                }
                                                $currentMonth = $month;
                                            }
                                            $subtotalFob += $u->fob;
                                            $subtotalQty += $u->quantity;
                                            $subtotalFre += $u->freight;
                                            $subtotalDis += $u->discount;
                                            $subtotalCom += $u->commission;
                                            $subtotalDop += $u->deposit;
                                        @endphp

                                        <tr>
                                            <td>    
                                                {{$key + 1 }} 
                                            </td>
                                            <td>    
                                                {{ \Carbon\Carbon::parse($u->date)->format('d/m') }}
                                            </td>
                                            <td>    
                                                @if($u->eta){{ \Carbon\Carbon::parse($u->eta)->format('d M Y') }}@else - @endif
                                            </td>
                                            <td>    
                                                {{$u->vehicle_details}} 
                                                @if($u->vin_no)
    						              	        <br>
    						              	        [{{$u->vin_no}}] 
    						              	    @endif
                                            </td>
                                            <td>    
                                                @php
                                                    $parts = explode('/', $u->remarks);
                                                    $substring = $parts[0]; // Get the substring before the first '/'
                                                @endphp
                                                @if($u->quantity !=0) <a href="/orders/{{$substring}}" target="_blank">{{$u->remarks}} </a> @else {{$u->remarks}} @endif
                                            </td>
                                            <td class="text-center">{{$u->quantity}}</td>
                                            <td>    
                                                {{number_format($u->fob)}}
                                            </td>
                                            <td>    
                                                {{number_format($u->freight)}}
                                            </td>
                                            <td>    
                                                @if($u->discount != 0)-@endif{{number_format($u->discount)}}
                                            </td>
                                            <td>    
                                                {{number_format($u->fob + $u->freight - $u->discount)}}
                                            </td>
                                            <td>    
                                                @if($u->commission != 0)-@endif{{number_format($u->commission)}}
                                            </td>
                                            <td>    
                                                {{number_format($u->fob + $u->freight - $u->discount - $u->commission)}}
                                            </td>
                                            <td>    
                                                {{number_format($u->deposit)}}
                                            </td>
                                            <td>    
                                                {{number_format(1 * $u->payable)}}
                                            </td>
                                        </tr>
                                        
                                        
                                        @if ($loop->last || \Carbon\Carbon::parse($data[$key + 1]->date)->format('m') !== $month)
                                            <tr style="background-color: #c393db !important; color: #fff;">
                                                <td colspan="5" class="text-center"><strong>{{ \Carbon\Carbon::parse($u->date)->format('m/Y') }} Total</strong></td>
                                                <td class="text-center"><strong>{{number_format($subtotalQty)}}</strong></td>
                                                <td class="text-center"><strong>{{number_format($subtotalFob)}}</strong></td>
                                                <td class="text-center"><strong>{{number_format($subtotalFre)}}</strong></td>
                                                <td class="text-center"><strong>@if($subtotalDis != 0)-@endif{{number_format($subtotalDis)}}</strong></td>
                                                <td class="text-center"><strong>{{number_format($subtotalFob + $subtotalFre - $subtotalDis)}}</strong></td>
                                                <td class="text-center"><strong>@if($subtotalCom != 0)-@endif{{number_format($subtotalCom)}}</strong></td>
                                                <td class="text-center"><strong>{{number_format($subtotalFob + $subtotalFre -$subtotalCom - $subtotalDis) }}</strong></td>
                                                <td class="text-center"><strong>{{number_format($subtotalDop)}}</strong></td>
                                                <td class="text-center"><strong>{{number_format(1 * $u->payable)}}</strong></td>
                                            </tr>
                                        @endif
                                    @endforeach
                                    <br>
                                    <tr style="background-color: #AA66CC; color: #fff;">
                                        <td colspan="5" class="text-center"><strong>Grand Total</strong></td>
                                        <td class="text-center"><strong>{{number_format($grandTotalQty)}}</strong></td>
                                        <td class="text-center"><strong>{{number_format($grandTotalFob)}}</strong></td>
                                        <td class="text-center"><strong>{{number_format($grandTotalFreight)}}</strong></td>
                                        <td class="text-center"><strong>@if($grandTotalDis != 0)-@endif{{number_format($grandTotalDis)}}</strong></td>
                                        <td class="text-center"><strong>{{number_format($grandTotalFob + $grandTotalFreight - $grandTotalDis)}}</strong></td>
                                        <td class="text-center"><strong>@if($grandTotalCom != 0)-@endif{{number_format($grandTotalCom)}}</strong></td>
                                        <td class="text-center"><strong>{{number_format($grandTotalFob + $grandTotalFreight - $grandTotalDis - $grandTotalCom)}}</strong></td>
                                        <td class="text-center"><strong>{{number_format($grandTotalDop)}}</strong></td>
                                        <td class="text-center"><strong>{{number_format(- $grandTotalFob - $grandTotalFreight + $grandTotalDis + $grandTotalCom + $grandTotalDop)}}</strong></td>
                                    </tr>
                                    
                                </tbody>
                            </table>
                            @else
    				            <div class="text-center" style="background: white; padding-bottom: 132px;">
    				            	<br><br><br><br><br><br>
    				            	Sorry, there are no records to display.
    				            </div>
    			        	@endif
                        </main>
                    </div>
                </div>
            </div>    
        </div>
    </div>

    <div id="c_date" class="modal border-transparent fade container-sm" tabindex="-1" data-replace="true">
        <form class="modal-container" method="post" action="/BalanceSheet/Date" autocomplete="off">
            {{ csrf_field() }}
            <div class="modal-header"> 
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                <h4 class="modal-title text-center">
                    Search By Order or Payment Date
                </h4>
            </div>
            <div class="modal-body">
                <br>
                <div class="form-horizontal">

                    <div class="row gap-15 mb-10">
                        <div class="col-sm-3">
                            <label class="lb_receipt">
                                From
                                <span class="text-red">*</span>
                            </label>
                        </div>
                        <div class="col-sm-9">
                            <input type="date" name="from" class="form-control" required>
                        </div>
                    </div>

                    <div class="row gap-15 mb-10">
                        <div class="col-sm-3">
                            <label class="lb_receipt">
                                To
                                <span class="text-red">*</span>
                            </label>
                        </div>
                        <div class="col-sm-9">
                            <input type="date" name="to" class="form-control" required>
                        </div>
                    </div>

                </div>
            </div>
            <div class="modal-footer text-right">
                <button type="button" class="btn btn-danger btn-md" data-dismiss="modal">
                    <i class="fa fa-times"></i>
                        Cancel
                </button>
                <button type="submit" value="submit" class="btn btn-success btn-md">
                    <i class="fa fa-search"></i>
                        Search
                </button>
            </div>
        </form>
    </div>
    
    <div id="c_ship" class="modal border-transparent fade container-sm" tabindex="-1" data-replace="true">
        <form class="modal-container" method="post" action="/BalanceSheet/Eta" autocomplete="off">
            {{ csrf_field() }}
            <div class="modal-header"> 
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                <h4 class="modal-title text-center">
                    Search By Shipment Arrival Date
                </h4>
            </div>
            <div class="modal-body">
                <br>
                <div class="form-horizontal">

                    <div class="row gap-15 mb-10">
                        <div class="col-sm-3">
                            <label class="lb_receipt">
                                From
                                <span class="text-red">*</span>
                            </label>
                        </div>
                        <div class="col-sm-9">
                            <input type="date" name="from" class="form-control" required>
                        </div>
                    </div>

                    <div class="row gap-15 mb-10">
                        <div class="col-sm-3">
                            <label class="lb_receipt">
                                To
                                <span class="text-red">*</span>
                            </label>
                        </div>
                        <div class="col-sm-9">
                            <input type="date" name="to" class="form-control" required>
                        </div>
                    </div>

                </div>
            </div>
            <div class="modal-footer text-right">
                <button type="button" class="btn btn-danger btn-md" data-dismiss="modal">
                    <i class="fa fa-times"></i>
                        Cancel
                </button>
                <button type="submit" value="submit" class="btn btn-success btn-md">
                    <i class="fa fa-search"></i>
                        Search
                </button>
            </div>
        </form>
    </div>
    
    <div id="c_vin" class="modal border-transparent fade container-sm" tabindex="-1" data-replace="true">
        <form class="modal-container" method="post" action="/BalanceSheet/Vin" autocomplete="off">
            {{ csrf_field() }}
            <div class="modal-header"> 
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                <h4 class="modal-title text-center">
                    Search By Chassis Number
                </h4>
            </div>
            <div class="modal-body">
                <br>
                <div class="form-horizontal">

                    <div class="row gap-15 mb-10">
                        <div class="col-sm-3">
                            <label class="lb_receipt">
                                VIN [Chassis]
                                <span class="text-red">*</span>
                            </label>
                        </div>
                        <div class="col-sm-9">
                            <input type="text" name="vin" class="form-control typeahead_vin" required=""  placeholder="Please enter VIN number here...">
                        </div>
                    </div>

                </div>
            </div>
            <div class="modal-footer text-right">
                <button type="button" class="btn btn-danger btn-md" data-dismiss="modal">
                    <i class="fa fa-times"></i>
                        Cancel
                </button>
                <button type="submit" value="submit" class="btn btn-success btn-md">
                    <i class="fa fa-search"></i>
                        Search
                </button>
            </div>
        </form>
    </div>
    
    <div id="c_code" class="modal border-transparent fade container-sm" tabindex="-1" data-replace="true">
        <form class="modal-container" method="post" action="/BalanceSheet/Bl" autocomplete="off">
            {{ csrf_field() }}
            <div class="modal-header"> 
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                <h4 class="modal-title text-center">
                    Customer Code or BL No
                </h4>
            </div>
            <div class="modal-body">
                <br>
                <div class="form-horizontal">

                    <div class="row gap-15 mb-10">
                        <div class="col-sm-3">
                            <label class="lb_receipt">
                                BL Number:
                                <span class="text-red">*</span>
                            </label>
                        </div>
                        <div class="col-sm-9">
                            <input type="text" name="code" class="form-control typeahead_code" required=""  placeholder="Please enter customer code or bl number here...">
                        </div>
                    </div>

                </div>
            </div>
            <div class="modal-footer text-right">
                <button type="button" class="btn btn-danger btn-md" data-dismiss="modal">
                    <i class="fa fa-times"></i>
                        Cancel
                </button>
                <button type="submit" value="submit" class="btn btn-success btn-md">
                    <i class="fa fa-search"></i>
                        Search
                </button>
            </div>
        </form>
    </div>
    
    <div id="c_model" class="modal border-transparent fade container-sm" tabindex="-1" data-replace="true">
        <form class="modal-container" method="post" action="/BalanceSheet/Model" autocomplete="off">
            {{ csrf_field() }}
            <div class="modal-header"> 
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                <h4 class="modal-title text-center">
                    Search by Model Name Year 
                </h4>
            </div>
            <div class="modal-body">
                <br>
                <div class="form-horizontal">

                    <div class="row gap-15 mb-10">
                        <div class="col-sm-3">
                            <label class="lb_receipt">
                                Model / Year:
                                <span class="text-red">*</span>
                            </label>
                        </div>
                        <div class="col-sm-9">
                            <input type="text" name="name" class="form-control typeahead" required=""  placeholder="Please enter model or year here...">
                        </div>
                    </div>

                </div>
            </div>
            <div class="modal-footer text-right">
                <button type="button" class="btn btn-danger btn-md" data-dismiss="modal">
                    <i class="fa fa-times"></i>
                        Cancel
                </button>
                <button type="submit" value="submit" class="btn btn-success btn-md">
                    <i class="fa fa-search"></i>
                        Search
                </button>
            </div>
        </form>
    </div>
    
    @section('script')
        
        <script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-3-typeahead/4.0.1/bootstrap3-typeahead.min.js"></script>
        <script type="text/javascript">
            var path = "{{ route('sheet-model-autocomplete') }}";
            var bl = "{{ route('sheet-bl-autocomplete') }}";
            var vin = "{{ route('sheet-vin-autocomplete') }}";
    
    	    $('input.typeahead').typeahead({
    	        source:  function (query, process) {
    	        return $.get(path, { query: query }, function (data) {
    	                return process(data);
    	            });
    	        }
    	    });
    	    
    	    $('input.typeahead_code').typeahead({
    	        source:  function (query, process) {
    	        return $.get(bl, { query: query }, function (data) {
    	                return process(data);
    	            });
    	        }
    	    });
    	    
    	    $('input.typeahead_vin').typeahead({
    	        source:  function (query, process) {
    	        return $.get(vin, { query: query }, function (data) {
    	                return process(data);
    	            });
    	        }
    	    });
    	    
	    </script>
    @stop
@stop