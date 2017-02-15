<?xml version="1.0" encoding="UTF-8"?>

<div xmlns="http://www.w3.org/1999/xhtml" xid="window" class="window"
	component="$UI/system/components/justep/window/window" design="device:m;resolution:440 x 700;">
	<div component="$UI/system/components/justep/model/model" xid="model"
		onLoad="modelLoad" style="height:auto;top:499px;left:190px;" onunLoad="modelUnLoad">
	<div component="$UI/system/components/justep/data/data" autoLoad="true" xid="notification" idColumn="id" onCustomRefresh="notifyDataLoad" confirmRefresh="false"><column label="id" name="id" type="String" xid="xid1"></column>
  <column label="content" name="content" type="String" xid="xid2"></column></div>
  <div component="$UI/system/components/justep/data/data" xid="fileData" idColumn="filePath" autoNew="false" confirmRefresh="false">
   <column label="col0" name="filePath" type="String" xid="default1"></column>
   <column label="col1" name="fileName" type="String" xid="default2"></column>
   <column label="col2" name="createTime" type="String" xid="default3"></column></div>
  <div component="$UI/system/components/justep/data/data" autoLoad="false" xid="gpsData" idColumn="id" limit="20" onCustomRefresh="gpsDataLoad" confirmRefresh="false">
   <column label="id" name="id" type="String" xid="default6"></column>
   <column label="latitude" name="latitude" type="Double" xid="default7"></column>
   <column label="Longitude" name="Longitude" type="Double" xid="default8"></column>
   <column label="Name" name="Name" type="String" xid="xid3"></column>
   <column label="UpdateTime" name="UpdateTime" type="DateTime" xid="xid4"></column></div>
  <div component="$UI/system/components/justep/data/data" xid="contentData" idColumn="title" autoNew="true" confirmRefresh="false">
   <column label="标题" name="title" type="String" xid="column1"></column>
  <column label="x" name="x" type="String" xid="column2"></column>
  <column label="y" name="y" type="String" xid="default4"></column>
  <column label="速度" name="s" type="String" xid="column4"></column>
  <column label="距离" name="d" type="String" xid="column3"></column>
  <column label="x_" name="x_" type="String" xid="xid8"></column>
  <column label="y_" name="y_" type="String" xid="xid10"></column></div>
  <div component="$UI/system/components/justep/data/data" autoLoad="false" xid="tempData" idColumn="userId" onCustomRefresh="tempDataLoad" confirmRefresh="false">
   <column label="userId" name="userId" type="String" xid="column7"></column>
  <column label="userName" name="userName" type="String" xid="column8"></column>
  <column label="enterTollGateId" name="enterTollGateId" type="String" xid="column5"></column>
  <column label="enterTollGateName" name="enterTollGateName" type="String" xid="xid5"></column>
  <column label="licenceNo" name="licenceNo" type="String" xid="xid6"></column>
  <column label="enterDateTime" name="enterDateTime" type="String" xid="xid9"></column>
  <column label="enterType" name="enterType" type="String" xid="xid7"></column>
  <data>[{&quot;userId&quot;:&quot;未知&quot;,&quot;userName&quot;:&quot;未知&quot;,&quot;enterTollGateId&quot;:&quot;未知&quot;,&quot;enterTollGateName&quot;:&quot;未知&quot;,&quot;licenceNo&quot;:&quot;未知&quot;,&quot;enterDateTime&quot;:&quot;未知&quot;,&quot;enterType&quot;:&quot;未知&quot;}]</data></div>
  <div component="$UI/system/components/justep/data/data" autoLoad="true" xid="imgData" idColumn="id" onCustomRefresh="imgDataCustomRefresh" confirmRefresh="false">
   <column label="id" name="id" type="String" xid="column6"></column>
   <column label="图片" name="fImgUrl" type="String" xid="column9"></column>
   <column label="链接地址" name="fUrl" type="String" xid="column10"></column></div>
  <div component="$UI/system/components/justep/data/data" autoLoad="false" xid="sectionData" idColumn="id" onCustomRefresh="sectionDataRefresh" confirmRefresh="false">
   <column label="id" name="id" type="String" xid="column13"></column>
  <column label="latitude" name="Latitude" type="Double" xid="column14"></column>
  <column label="Longitude" name="Longitude" type="Double" xid="column15"></column>
  <column label="Name" name="Name" type="String" xid="column16"></column>
  <column label="Radius" name="Radius" type="Integer" xid="column17"></column></div></div>
	<span component="$UI/system/components/justep/messageDialog/messageDialog" xid="messageDlg" type="OK"></span><span component="$UI/system/components/justep/messageDialog/messageDialog"
		xid="exitMsgDlg" style="left:47px;top:11px;" type="OKCancel" message="确定退出程序？"
		onOK="exitMsgDlgOK" onCancel="exitMsgDlgCancel" onYes="exitMsgDlgYes" onNo="exitMsgDlgNo"></span>
	<span component="$UI/system/components/justep/windowDialog/windowDialog"
		xid="winDlg_main" forceRefreshOnOpen="true"></span>
	<span component="$UI/system/components/justep/windowReceiver/windowReceiver"
		xid="winRec"></span>
	<span component="$UI/system/components/justep/messageDialog/messageDialog" xid="bindPlate" style="left:97px;top:11px;" message="需要绑定车牌，是否现在绑定？" type="OKCancel" onOK="bindPlateOK" onCancel="bindPlateCancel"></span>
  
  <div component="$UI/system/components/justep/popOver/popOver"
    class="x-popOver" xid="popOver_load"
    opacity="1">
    <div class="x-popOver-overlay" xid="div32"/>
    <div class="x-popOver-content text-center" xid="div31">
      <a component="$UI/system/components/justep/button/button"
        class="btn btn-link btn-only-icon"
        label="button" xid="button1" icon="icon-loading-a">
        <i xid="i2" class="icon-loading-a" style="font-size:40px;"/>
        <span xid="span2"/>
      </a>
      <div xid="div36" bind-text='"数据更新中，请稍候..."'/>
    </div>
</div>
  <div component="$UI/system/components/justep/popOver/popOver" class="x-popOver" xid="demoPopOver" opacity="0.7" position="center" dismissible="true" direction="left-top">
   <div class="x-popOver-overlay" xid="div3"></div>
   <div class="pull-left x-popOver-content" xid="div2" style="background-color:#FFFFFF;">
     
  
  
  
  <a component="$UI/system/components/justep/button/button" class="btn btn-lg btn-icon-left btn-block btn-link3 device-button-white" label="切换账号" xid="button3" onClick="relogin" icon="icon-person" style="text-align:right;">
   <i xid="i17" class="icon-person"></i>
   <span xid="span40">切换账号</span></a><a component="$UI/system/components/justep/button/button" class="btn btn-icon-left btn-block btn-link3 device-button-white" label="退出登录" xid="button6" onClick="exit" icon="icon-power" style="text-align:right;">
   <i xid="i19" class="icon-power"></i>
   <span xid="span41">退出登录</span></a>
  </div> </div><div component="$UI/system/components/justep/contents/contents"
		class="x-contents x-full" active="0" xid="contents1" slidable="true"
		swipe="false">
		<div class="x-contents-content" xid="main">
			
		<div component="$UI/system/components/justep/panel/panel" class="x-panel x-full" xid="mainPanel">
				<div class="x-panel-top" xid="top1">
					<div component="$UI/system/components/justep/titleBar/titleBar" class="x-titlebar" xid="titleBar" title="高速移动支付">
						<div class="x-titlebar-left" xid="div_title_left">
						</div>
						<div class="x-titlebar-title" xid="div_title_title" id="tops">快速通过</div>
						<div class="x-titlebar-right reverse" xid="div_title_right">
							</div>
					</div>
				</div>
				<div class="x-panel-content" xid="mainContent">
					<div component="$UI/system/components/justep/contents/contents" class="x-contents x-full" active="0" xid="contents" slidable="false" swipe="false">
						<div class="x-contents-content x-cards" xid="passCnt" style="height:100%;width:100%;" onActive="passCntActive" onactive="passCntActive">



							<div class="x-scroll" component="$UI/system/components/justep/scrollView/scrollView" xid="scrollView5" checkDOMChanges="false" pullDownLabel="高速移动支付" pullDownMoveLabel="高速移动支付" pullDownLoadingLabel="高速移动支付" pullUpLabel="高速移动支付" pullUpMoveLabel="高速移动支付" pullUpLoadingLabel="高速移动支付" noMoreLoadLabel="高速移动支付" autoPullUp="true">
   
   <div class="x-content-center x-pull-down" xid="div41">
   <span class="x-pull-down-label" xid="span61">高速移动支付</span></div><div class="x-scroll-content" xid="div44"><div component="$UI/system/components/bootstrap/carousel/carousel" class="x-carousel carousel" xid="carousel" auto="true">
   <ol class="carousel-indicators" xid="ol2"></ol>
   <div class="x-contents carousel-inner" role="listbox" component="$UI/system/components/justep/contents/contents" active="0" slidable="true" wrap="true" swipe="true" xid="contents2" style="height:81px;">
    <div class="x-contents-content" xid="content1">
     <img src="./res/carousel/p1.jpg" class="image-wall" xid="image1"></img></div> 
    <div class="x-contents-content" xid="content4">
     <img src="./res/carousel/p2.jpg" class="image-wall" xid="image2"></img></div> 
    <div class="x-contents-content" xid="content6">
     <img src="./res/carousel/p3.jpg" class="image-wall" xid="image3"></img></div> 
    <div class="x-contents-content" xid="content7">
     <img src="./res/carousel/p4.jpg" class="image-wall" xid="image4"></img></div> </div> 
   <a class="left carousel-control" role="button" xid="a1">
    <span class="glyphicon glyphicon-chevron-left" aria-hidden="true" xid="span1"></span>
    <span class="sr-only" xid="span24">Previous</span></a> 
   <a class="right carousel-control" role="button" xid="a2">
    <span class="glyphicon glyphicon-chevron-right" aria-hidden="true" xid="span27"></span>
    <span class="sr-only" xid="span1">Next</span></a> </div><div component="$UI/system/components/justep/controlGroup/controlGroup" class="x-control-group btn_group" title="title" xid="div_btngroup">
   <table class="table" component="$UI/system/components/bootstrap/table/table" xid="table1">
    
     <tr xid="tr3" class="text-center" style="border-style:hidden hidden hidden hidden;">
     <td xid="td9" style="width:33%;">
      <a component="$UI/system/components/justep/button/button" class="btn btn-link btn-icon-top" label="扫码通过" icon="icon-camera  icon" xid="scanBtn" style="color:#008080;" onClick="scanBtnClick">
   <i xid="i28" class="icon-camera icon"></i>
   <span xid="span13">扫码通过</span></a></td> 
     <td xid="td10" style="width:33%;">
      <a component="$UI/system/components/justep/button/button" class="btn btn-link btn-icon-top" label="增值服务" icon="icon-ios7-cart icon" xid="button4" style="color: #99C412;" target="incCnt">
   <i xid="i31" class="icon-ios7-cart icon"></i>
   <span xid="span15">增值服务</span></a></td> 
     <td xid="td11" style="width:33%;">
      
  <a component="$UI/system/components/justep/button/button" class="btn btn-link btn-icon-top" label="我的信息" icon="icon-gear-a icon" xid="button5" style="color:#0080C0;" target="mineCnt">
   <i xid="i32" class="icon-gear-a icon"></i>
   <span xid="span16">我的信息</span></a></td> </tr></table></div><div class="x-scroll-content" xid="div_pass_info" style="background-color:white;">
    <div component="$UI/system/components/justep/controlGroup/controlGroup" class="x-control-group" title="title" xid="group_info">
   <div component="$UI/system/components/justep/list/list" class="x-list" xid="list2" data="contentData">
    <ul class="x-list-template" xid="listTemplateUl3">
     <li xid="li3" class="list-group-item1 x-flex">
   <div xid="div42" class="x-flex1">
     
    <div component="$UI/system/components/justep/labelEdit/labelEdit" class="x-label-edit x-label60" xid="labelEdit1">
   <label class="text-warning x-label" xid="label3" style="font-size:medium;width:80%;" bind-text=' $object.val("title")'><![CDATA[实时信息]]></label>
   <span component="$UI/system/components/justep/button/toggle" class="x-toggle pull-right  x-edit" type="checkbox" name="checkbox_listen" ON="开启" OFF="关闭" checkedValue="1" checked="true" xid="toggle_listen" value="1" uncheckedValue="0" onChange="toggle_listenChange"></span></div><div class="text-muted" xid="div_x">
     <span xid="span70" class="text-primary"><![CDATA[前方车站：]]></span>
  <span xid="span71" class="pull-right text-danger" bind-text=' $object.val("x")'>未知</span></div> 
    <div class="text-muted" xid="div_s"><span xid="span75" class="text-primary"><![CDATA[运行时间：]]></span>
  <span xid="span74" class="pull-right text-danger" bind-text=' $object.val("s")'>未知</span></div>
  <div class="text-muted" xid="div_d"><span xid="span77" class="text-primary"><![CDATA[实时距离：]]></span>
  <span xid="span76" class="pull-right text-danger" bind-text=' $object.val("d")'>未知</span></div>
  </div> </li></ul> </div> 
   </div><div component="$UI/system/components/justep/controlGroup/controlGroup" class="x-control-group" title="title" xid="group_record" style="display:none;">
   
   <div class="x-flex1" xid="div11">
      <div class="text-muted" xid="div8">
       <span xid="span39" class="text-warning" style="font-size:medium;"><![CDATA[最近通行记录：]]></span>
       <span xid="span35" class="pull-right text-danger" bind-text='($model.tempData.val("enterDateTime")==null)?"未知时间":$model.tempData.val("enterDateTime")'><![CDATA[未知时间]]></span>
  </div><div class="text-muted" xid="div7">
       <span xid="span37" class="text-primary"><![CDATA[用户名：]]></span>
       <span xid="span38" class="pull-right text-danger" bind-text='($model.tempData.val("userName")==null)?"未知":$model.tempData.val("userName")'><![CDATA[未知]]></span>
       </div> 
      
       
      <div class="text-muted" xid="div13">
   <span xid="span45" class="text-primary"><![CDATA[车牌号：]]></span><span xid="span46" class="pull-right text-danger" bind-text='($model.tempData.val("licenceNo")==null)?"未知":$model.tempData.val("licenceNo")'><![CDATA[未知]]></span>
   </div><div class="text-muted" xid="div9">
       <span xid="span33" class="text-primary">入站口：</span>
       <span xid="span36" class="pull-right text-danger" bind-text='($model.tempData.val("enterTollGateName")==null)?"未知":$model.tempData.val("enterTollGateName")'><![CDATA[未知]]></span>
       
       </div> 
  <div class="text-muted" xid="div24">
   <span xid="span53" class="text-primary"><![CDATA[通过方式：]]></span>
   <span xid="span51" class="pull-right text-danger" bind-text='($model.tempData.val("enterType")==null)?"未知":$model.tempData.val("enterType")'><![CDATA[未知]]></span></div></div><div xid="div6" style="display:none;">
     <a component="$UI/system/components/justep/button/button" class="btn btn-link2 btn-block device-button-white" label="快速通过" xid="quickPassBtn" onClick="quickPass" disabled="true">
      <i xid="i39"></i>
      <span xid="span25">快速通过</span></a> 
     <a component="$UI/system/components/justep/button/button" class="btn x-red btn-block device-button-white" label="停止快速通过" xid="stopQPassBtn" onClick="stopQPass" style="display:none;">
      <i xid="i34"></i>
      <span xid="span26">停止快速通过</span></a> 
  </div></div>
    <a component="$UI/system/components/justep/button/button" class="btn btn-default" label="button" xid="button2" onClick="button2Click">
   <i xid="i5"></i>
   <span xid="span11"></span></a></div><div xid="div_advert"><div component="$UI/system/components/bootstrap/carousel/carousel" class="x-carousel carousel" xid="carousel1" auto="true" style="height:63px;">
    <ol class="carousel-indicators" xid="ol1"></ol>
    <div class="x-contents carousel-inner" role="listbox" component="$UI/system/components/justep/contents/contents" active="0" slidable="true" wrap="true" swipe="true" xid="contentsImg" routable="false">
     <div class="x-contents-content" xid="content2">
      <img src="./res/advert/carouselBox61.jpg" alt="" xid="image13" bind-click="openPageClick" class="tb-img1" ad_path=""></img></div> </div> </div></div></div>
   </div></div>
		<div class="x-contents-content x-cards  x-scroll-view" xid="incCnt" style="height:100%;width:100%;" onActive="incCntActive" onactive="incCntActive">
						
  <div component="$UI/system/components/justep/panel/panel" class="x-panel x-full" xid="panel1">
   <div class="x-panel-content grid91" xid="content3" style="top: 0px; bottom: 0px;" _xid="C709B31208700001703E38E615104380">
    <div class="x-scroll" component="$UI/system/components/justep/scrollView/scrollView" xid="scrollView3" pullDownLoadingLabel="高速移动支付" pullDownMoveLabel="高速移动支付" pullDownLabel="高速移动支付" pullUpLabel="高速移动支付" pullUpMoveLabel="高速移动支付" pullUpLoadingLabel="高速移动支付" noMoreLoadLabel="高速移动支付">
   <div class="x-content-center x-pull-down" xid="div38">
    <i class="x-pull-down-img glyphicon x-icon-pull-down" xid="i18"></i>
    <span class="x-pull-down-label" xid="span59">高速移动支付</span></div> 
   <div class="x-scroll-content" xid="div40"><div component="$UI/system/components/bootstrap/row/row" class="row grid" xid="row1">
   <div class="col cell col-xs-3 col-sm-2 col-md-2 col-lg-1" xid="col14">
    <div class="card" xid="div26">
     <i class="icon-ios7-people" style="color:#008000;" xid="i20"></i>
     <span class="title" xid="span17"><![CDATA[朋友圈]]></span></div> </div><div class="col cell col-xs-3 col-sm-2 col-md-2 col-lg-1" xid="col4" bind-click="getRegistrationID">
    <div class="card" xid="div16">
     <i class="icon-hammer" style="color: rgb(153, 196, 18);" xid="i9"></i>
     <span class="title" xid="span5"><![CDATA[推送ID]]></span></div> </div><div class="col cell col-xs-3 col-sm-2 col-md-2 col-lg-1" xid="col8" bind-click="mapBtnClick">
     <div class="card" xid="div20">
     <i class="icon-android-location" style="color:#FF8080;" xid="i13"></i>
     <span class="title" xid="span10">地图</span></div></div><div class="col cell col-xs-3 col-sm-2 col-md-2 col-lg-1" xid="col2" bind-click="col2Click">
    <div class="card" xid="div14">
     <i class="icon-android-mixer" style="color:#FF8080;" xid="i7"></i>
     <span class="title" xid="span3"><![CDATA[返回桌面]]></span></div> </div> 
   <div class="col cell col-xs-3 col-sm-2 col-md-2 col-lg-1" xid="col3" bind-click="col3Click">
    <div class="card" xid="div15">
     <i class="icon-chatbox-working" style="color:#FF8000;" xid="i8"></i>
     <span class="title" xid="span4"><![CDATA[消息显示]]></span></div> </div> 
    
   <div class="col cell col-xs-3 col-sm-2 col-md-2 col-lg-1" xid="col5">
    <div class="card" xid="div17">
     <i class="icon-social-bitcoin" style="color:#8BBBCD;" xid="i10"></i>
     <span class="title" xid="span7"><![CDATA[汇率换算]]></span></div> </div> 
   <div class="col cell col-xs-3 col-sm-2 col-md-2 col-lg-1" xid="col6">
    <div class="card" xid="div18">
     <i class="icon-calculator" style="color:#FF8040;" xid="i11"></i>
     <span class="title" xid="span8"><![CDATA[计算器]]></span></div> </div> 
   <div class="col cell col-xs-3 col-sm-2 col-md-2 col-lg-1" xid="col7">
    <div class="card" xid="div19">
     <i class="icon-bag" style="color:#0080FF;" xid="i12"></i>
     <span class="title" xid="span9"><![CDATA[购物车]]></span></div> </div> 
    
   <div class="col cell col-xs-3 col-sm-2 col-md-2 col-lg-1" xid="col10">
    <div class="card" xid="div22">
     <i class="icon-medkit" style="color: rgb(153, 196, 18);" xid="i16"></i>
     <span class="title" xid="span12"><![CDATA[事故急救]]></span></div> </div> 
    
   <div class="col cell col-xs-3 col-sm-2 col-md-2 col-lg-1" xid="col15">
    <div class="card" xid="div27">
     <i class="icon-ipad" style="color:#FF80C0;" xid="i21"></i>
     <span class="title" xid="span18"><![CDATA[话费充值]]></span></div> </div> 
   <div class="col cell col-xs-3 col-sm-2 col-md-2 col-lg-1" xid="col16">
    <div class="card" xid="div28">
     <i class="icon-heart" style="color:#FF8080;" xid="i22"></i>
     <span class="title" xid="span19"><![CDATA[爱心捐赠]]></span></div> </div> 
   <div class="col cell col-xs-3 col-sm-2 col-md-2 col-lg-1" xid="col17">
    <div class="card" xid="div29">
     <i class="icon-clipboard" style="color:#FF8000;" xid="i23"></i>
     <span class="title" xid="span20"><![CDATA[记账本]]></span></div> </div> 
   <div class="col cell col-xs-3 col-sm-2 col-md-2 col-lg-1" xid="col18">
    <div class="card" xid="div30">
     <i class="icon-arrow-graph-up-right" style="color:#FF0000;" xid="i24"></i>
     <span class="title" xid="span21"><![CDATA[股票]]></span></div> </div> 
   <div class="col cell col-xs-3 col-sm-2 col-md-2 col-lg-1" xid="col19">
    <div class="card" xid="div34">
     <i class="icon-game-controller-b" style="color:#8000FF;" xid="i25"></i>
     <span class="title" xid="span22"><![CDATA[游戏中心]]></span></div> </div> 
   <div class="col cell col-xs-3 col-sm-2 col-md-2 col-lg-1" xid="col20">
    <div class="card" xid="div35">
     <i class="icon-waterdrop" style="color: rgb(153, 196, 18);" xid="i26"></i>
     <span class="title" xid="span23"><![CDATA[生活缴费]]></span></div> </div> 
  <div class="col cell col-xs-3 col-sm-2 col-md-2 col-lg-1" xid="col1">
   <div class="card" xid="div1">
    <i class="icon-ios7-more" style="color:#C0C0C0;" xid="i3"></i>
    <span class="title" xid="span2"><![CDATA[更多]]></span></div> </div></div></div>
   </div></div> </div></div>

						<div class="x-contents-content x-cards  x-scroll-view" xid="mineCnt" style="height:100%;width:100%;" onActive="mineCntActive" onactive="mineCntActive">
							<!-- <img src="img/angela.jpg" alt="" xid="image1" style="width:100%;" 
								height="100%"></img> -->

							<div class="x-scroll" component="$UI/system/components/justep/scrollView/scrollView" xid="scrollView2" pullDownLabel="高速移动支付" pullDownMoveLabel="高速移动支付" pullDownLoadingLabel="高速移动支付" pullUpLabel="高速移动支付" pullUpMoveLabel="高速移动支付" pullUpLoadingLabel="高速移动支付" noMoreLoadLabel="高速移动支付">
   <div class="x-content-center x-pull-down" xid="div33">
    <i class="x-pull-down-img glyphicon x-icon-pull-down" xid="i14"></i>
    <span class="x-pull-down-label" xid="span31">高速移动支付</span></div> 
   <div class="x-scroll-content" xid="div25">
    
    <ul class="list-group" xid="ul_info">
								<li class="list-group-item" xid="li_info" bind-click="li_infoClick">
									<a component="$UI/system/components/justep/button/button" class="btn btn-link btn-only-icon btnImg" label="button" xid="btn_info" icon="icon-person-add" style="background-color: #FF8000;">
										<i xid="i38" class="icon-person-add"></i>
										<span xid="span28"></span>
									</a>
									<span xid="span_info"><![CDATA[注册信息]]></span>
									<span class="pull-right text-muted" xid="span_info_right">
										<i xid="i41" class="icon-ios7-arrow-forward"></i>
									</span>
								</li>
								<li class="list-group-item" xid="li_msg" bind-click="li_msgClick">

									<a component="$UI/system/components/justep/button/button" class="btn btn-link btn-only-icon btnImg" label="button" xid="btn_msg" icon="icon-ios7-bell" style="background-color:#FF8080;">
										<i xid="i37" class="icon-ios7-bell"></i>
										<span xid="span29"></span>
									</a>
									<span xid="span_msg"><![CDATA[消息记录]]></span>
									<span class="pull-right text-muted" xid="span_exit_right">
										<i xid="i43" class="icon-ios7-arrow-forward"></i>
									</span>
									<span class="pull-right text-danger text-muted" xid="span_msg_info" bind-text="  $model.getNotifyCount(event)"><![CDATA[]]></span>
								</li>
								<li class="list-group-item" xid="li_plate" bind-click="li_plateClick">
									<a component="$UI/system/components/justep/button/button" class="btn btn-link btn-only-icon btnImg" label="button" xid="btn_plate" icon="icon-android-mixer" style="background-color:#008080;">
										<i xid="i36" class="icon-android-mixer"></i>
										<span xid="span34"></span>
									</a>
									<span xid="span_plate"><![CDATA[车牌管理]]></span>
									<span class="pull-right text-muted" xid="span_plate_right">
										<i xid="i43" class="icon-ios7-arrow-forward"></i>
									</span>
								</li>
								<li class="list-group-item" xid="li_history" bind-click="li_historyClick">
									<a component="$UI/system/components/justep/button/button" class="btn btn-link btn-only-icon btnImg" label="button" xid="btn_history" icon="icon-social-buffer" target="main" style="background-color: #0080FF;">
										<i xid="i35" class="icon-social-buffer"></i>
										<span xid="span44"></span>
									</a>
									<span xid="span_history"><![CDATA[通行记录]]></span>
									<span class="pull-right text-muted" xid="span_history_right">
										<i xid="i44" class="icon-ios7-arrow-forward"></i>
									</span>
								</li>


							</ul><ul class="list-group" xid="ul_about">
								<li class="list-group-item" xid="li_setting" bind-click="li_settingClick">
									<a component="$UI/system/components/justep/button/button" class="btn btn-link btn-only-icon btnImg" label="button" xid="btn_setting" icon="icon-ios7-gear" style="background-color:#FF8000;">
										<i xid="i47" class="icon-ios7-gear"></i>
										<span xid="span54"></span>
									</a>
									<span xid="span_setting"><![CDATA[设置]]></span>
									<span class="pull-right text-muted" xid="span_setting_right">
										<i xid="i43" class="icon-ios7-arrow-forward"></i>
									</span>
									<span class="pull-right text-danger text-muted" xid="span_setting_info"><![CDATA[]]></span>
								</li><li class="list-group-item" xid="li_about" bind-click="li_aboutClick">

									<a component="$UI/system/components/justep/button/button" class="btn btn-link btn-only-icon btnImg" label="button" xid="btn_about" icon="icon-help-circled" style="background-color:#228B22;">
										<i xid="i50" class="icon-help-circled"></i>
										<span xid="span55"></span>
									</a>
									<span xid="span_about"><![CDATA[关于]]></span>
									<span class="pull-right text-muted" xid="span_about_right">
										<i xid="i49" class="icon-ios7-arrow-forward"></i>
									</span>
									<span class="pull-right text-danger text-muted" xid="span_about_info">
										<i xid="i49" class="icon-ios7-information"></i>
									</span>
								</li>

								

								<li class="list-group-item" xid="li_exit" bind-click="popoverClick">
									<a component="$UI/system/components/justep/button/button" class="btn btn-link btn-only-icon btnImg" label="button" xid="btn_exit" icon="icon-log-out" style="background-color: #FF0000">
										<i xid="i48" class="icon-log-out"></i>
										<span xid="span52"></span>
									</a>
									<span xid="span_exit"><![CDATA[退出]]></span>
									<span class="pull-right text-muted" xid="span_exit_right">
										<i xid="i43" class="icon-ios7-arrow-forward"></i>
									</span>
								</li>

							</ul></div> 
   </div></div>
					</div>
				</div>

				<div class="x-panel-bottom" xid="bottom1" visible="false">
					<div component="$UI/system/components/justep/button/buttonGroup" class="btn-group x-card btn-group-justified" tabbed="true" xid="buttonGroup1" selected="passBtn">
						<a component="$UI/system/components/justep/button/button" class="btn btn-default btn-icon-top" label="快速通过" xid="passBtn" icon="icon-ios7-paperplane" target="passCnt">
							<i xid="i1" class="icon-ios7-paperplane"></i>
							<span xid="pass_span">快速通过</span>
						</a>
						<a component="$UI/system/components/justep/button/button" class="btn btn-default btn-icon-top" label="增值服务" xid="incBtn" icon="icon-pricetag" target="incCnt">
							<i xid="i2" class="icon-pricetag"></i>
							<span xid="inc_span">增值服务</span>
						</a>

						<a component="$UI/system/components/justep/button/button" class="btn btn-default btn-icon-top" label="我的" xid="mineBtn" icon="icon-person" target="mineCnt">
							<i xid="i4" class="icon-person"></i>
							<span xid="mine_span">我的</span>
						</a>
					</div>
				</div>

			</div>
  </div>
		<div class="x-contents-content" xid="map">
			<div component="$UI/system/components/justep/panel/panel" class="x-panel x-full"
				xid="mapPanel">
				<div class="x-panel-top" xid="mapTop">
					<div component="$UI/system/components/justep/titleBar/titleBar"
						class="x-titlebar" xid="titleBar2" title="地图">
						<div class="x-titlebar-left" xid="div_title_left2">
							<a component="$UI/system/components/justep/button/button"
								class="btn btn-link" xid="yBackBtn" icon="icon-chevron-left"
								onClick="yBackBtnClick">
								<i xid="i15" class="icon-chevron-left"></i>
								<span xid="span14"></span>
							</a>
						</div>
						<div class="x-titlebar-title" xid="div_title_title2" id="tops2">地图</div>
						<div class="x-titlebar-right reverse" xid="div_title_right2">
							<a component="$UI/system/components/justep/button/button"
								class="btn btn-link btn-only-icon" label="button" xid="posBtn"
								icon="icon-android-location" onClick="posBtnClick" disabled="true">
								<i xid="i6" class="icon-android-location"></i>
								<span xid="span6"></span>
							</a>
						</div>
					</div>
				</div>
				<div class="x-panel-content" xid="mapContent"></div>
			</div>
		</div>
	</div>
<div id="net_aler" xid="div_net_aler"></div><div id="aler" xid="div_aler"></div>
  </div>