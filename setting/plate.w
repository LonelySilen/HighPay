<?xml version="1.0" encoding="utf-8"?>

<div xmlns="http://www.w3.org/1999/xhtml" class="main13" component="$UI/system/components/justep/window/window" design="device:mobile;"	xid="window">
	<div component="$UI/system/components/justep/model/model" xid="model"
		style="height:auto;left:204px;top:330px;" onLoad="modelLoad">
		<div component="$UI/system/components/justep/data/data" autoLoad="false"
			xid="plateData" idColumn="id">
			<column label="id" name="id" type="String" xid="default1"></column>
			<column label="licenceNo" name="licenceNo" type="String" xid="xid1"></column>
			<column label="vehicleModel" name="vehicleModel" type="String"
				xid="xid2"></column>
		</div>
	<div component="$UI/system/components/justep/data/data" autoLoad="false" xid="addData" idColumn="licenceNo" autoNew="true">
   <column label="oldPwd" name="licenceNo" type="String" xid="column8"></column>
  <column label="vehicleModel" name="vehicleModel" type="String" xid="column9"></column></div>
  <div component="$UI/system/components/justep/data/data" autoLoad="false" xid="bindData" idColumn="id" onCustomRefresh="dataCustomRefresh">
   <column label="id" name="id" type="String" xid="column3"></column>
  <column label="licId" name="licId" type="String" xid="column1"></column>
  <column label="licenceNo" name="licenceNo" type="String" xid="column2"></column></div>
  <div component="$UI/system/components/justep/data/data" autoLoad="true" xid="selectData" idColumn="options" confirmRefresh="false">
   <column label="数据" name="options" type="String" xid="column11"></column>
   <column label="选中值" name="optionsValue" type="String" xid="column12"></column>
   <data xid="default9">[{&quot;options&quot;:&quot;客1（7座及以下）&quot;,&quot;optionsValue&quot;:&quot;客1&quot;},{&quot;options&quot;:&quot;客2（8-19座）&quot;,&quot;optionsValue&quot;:&quot;客2&quot;},{&quot;options&quot;:&quot;客3（20-39座）&quot;,&quot;optionsValue&quot;:&quot;客3&quot;},{&quot;options&quot;:&quot;客4（40座及以上）&quot;,&quot;optionsValue&quot;:&quot;客4&quot;},{&quot;options&quot;:&quot;货1（载重2吨及以下）&quot;,&quot;optionsValue&quot;:&quot;货1&quot;},{&quot;options&quot;:&quot;货2（载重2吨-5吨，含5吨）&quot;,&quot;optionsValue&quot;:&quot;货2&quot;},{&quot;options&quot;:&quot;货3（载重5-10吨，含10吨）&quot;,&quot;optionsValue&quot;:&quot;货3&quot;},{&quot;options&quot;:&quot;货4（载重10-15吨，含15吨）&quot;,&quot;optionsValue&quot;:&quot;货4&quot;},{&quot;options&quot;:&quot;货5（载重15吨以上）&quot;,&quot;optionsValue&quot;:&quot;货5&quot;}]</data></div>
  </div>
	<span component="$UI/system/components/justep/windowDialog/windowDialog"
		xid="win_dlg" style="left:61px;top:9px;"></span>
	<span component="$UI/system/components/justep/windowReceiver/windowReceiver"
		xid="winRec" style="left:37px;top:10px;"></span>
	<span component="$UI/system/components/justep/messageDialog/messageDialog" xid="msg_dlg" style="left:119px;top:10px;"></span><div component="$UI/system/components/justep/panel/panel" class="x-panel x-full"
		xid="panel1">
		<div class="x-panel-top" xid="top1">
			<div component="$UI/system/components/justep/titleBar/titleBar"
				title="车牌管理" class="x-titlebar" xid="titleBar1">
				<div class="x-titlebar-left" xid="div_title_left">
					<a component="$UI/system/components/justep/button/button" label=""
						class="btn btn-link btn-only-icon" icon="icon-chevron-left"
						onClick="backBtnClick" xid="backBtn">
						<i class="icon-chevron-left" xid="i1"></i>
						<span xid="span12"></span>
					</a>
				</div>
				<div class="x-titlebar-title" xid="div_title_title">车牌管理</div>
				<div class="x-titlebar-right reverse" xid="div_title_right"><a component="$UI/system/components/justep/button/button" class="btn btn-link btn-only-icon" label="button" xid="btn_plate_add" onClick="plate_addClick" icon="icon-android-add" style="width:36px;height:36px;">
   <i xid="i6" class="icon-android-add"></i>
   <span xid="span2"></span></a></div>
			</div>
		</div>
		<div class="x-panel-content" xid="plateContent">
			
		<div component="$UI/system/components/justep/contents/contents" class="x-contents x-full" active="0" xid="contents" slidable="true" swipe="false">
   <div class="x-contents-content x-cards  x-scroll-view" xid="listCnt" onActive="listCntActive" onactive="listCntActive">
    
    
  <div class="x-scroll" component="$UI/system/components/justep/scrollView/scrollView" xid="scrollView">
   <div class="x-content-center x-pull-down container" xid="div1">
    <i class="x-pull-down-img glyphicon x-icon-pull-down" xid="i2"></i>
    <span class="x-pull-down-label" xid="span1">下拉刷新...</span></div> 
   
   <div class="x-scroll-content" xid="div6"><div component="$UI/system/components/justep/list/list" class="x-list" xid="list_plate" data="plateData">
   <ul class="x-list-template" xid="listTemplateUl2">
    <li xid="li_plate" class="list-group-item x-flex">
     <div xid="div_icon" class="media-left">
      <a xid="a1">
       <img alt="" xid="image1" class="img-rounded img-responsive img5" src="$UI/weixin/res/img/car.png"></img></a> </div> 
     <div class="x-flex1" xid="div_info">
      <h4 bind-text="ref('licenceNo')" style="text-align: justify;" xid="span_licenceNo"></h4>
      <span bind-text="ref('vehicleModel')" class="text-muted" style="text-align: justify;" xid="span_model"></span></div> 
     <div class="text-muted" xid="div_bind">
   <a component="$UI/system/components/justep/button/button" class="btn btn-danger btn-only-label" label="绑定" xid="btn_bind" onClick="btn_bindClick" bind-visible='$object.val("id") != $model.bindData.val("licId") '>
    <i xid="i3" class="text-muted"></i>
    <span xid="span7">绑定</span></a> 
  <a component="$UI/system/components/justep/button/button" class="btn btn-success btn-only-label" label="已绑定" xid="btn_binded" bind-visible='$object.val("id")  == $model.bindData.val("licId")'>
   <i xid="i7" class="text-muted"></i>
   <span xid="span8">已绑定</span></a>
  </div>
  <div class="x-swipe-area" xid="div_del" bind-click="div_delClick" bind-visible=' $object.val("id") != $model.bindData.val("licId")'>删除</div></li> </ul> </div></div><div class="x-content-center x-pull-up" xid="div7">
    <span class="x-pull-up-label" xid="span4">加载更多...</span></div> </div></div> 
   
   <div class="x-contents-content x-cards" xid="addCnt" onActive="addCntActive">
   <div class="form-vertical" component="$UI/system/components/bootstrap/form/form" xid="form">
    <div xid="div2" class="form-group" style="margin-right:auto;margin-left:auto;width:95%;">
     <label xid="label1" class="sr-only">用户名</label>
     <div xid="div26" class="input-group">
      <div xid="div3" class="input-group-addon">
       <span class="glyphicon glyphicon-th" xid="span31"></span></div> 
      <input component="$UI/system/components/justep/input/input" class="form-control" xid="input3" placeHolder="请输入车牌号" bind-ref="addData.ref('licenceNo')"></input></div> </div> 
    <div xid="div4" class="form-group" style="margin-right:auto;margin-left:auto;width:95%;">
     <label xid="label2" class="sr-only">用户名</label>
     <div xid="col2" class="input-group">
      <div xid="div5" class="input-group-addon">
       <span class="glyphicon glyphicon-tags" xid="span3"></span></div> 
      <select component="$UI/system/components/justep/select/select" class="form-control" xid="select1" bind-options="selectData" bind-optionsValue="optionsValue" bind-optionsLabel="options" bind-optionsCaption="请选择车型" bind-ref="addData.ref('vehicleModel')" optionsAutoLoad="true"></select>
  </div> </div> </div> 
   <div component="$UI/system/components/justep/row/row" class="x-row" xid="row1">
    <div class="x-col" xid="col1" style="text-align:center;">
     <a component="$UI/system/components/justep/button/button" class="btn btn-success btn-block" label="添加车牌" xid="btn_add" onClick="btn_addClick">
      <i xid="i12"></i>
      <span xid="span33">添加车牌</span></a> </div> </div> 
  </div></div></div>
	</div>
<div id="aler" xid="div_aler"></div></div>
