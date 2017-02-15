<?xml version="1.0" encoding="utf-8"?>

<div xmlns="http://www.w3.org/1999/xhtml" class="main13" component="$UI/system/components/justep/window/window" design="device:mobile;"	xid="window">
	<div component="$UI/system/components/justep/model/model" xid="model"
		style="height:auto;left:204px;top:330px;" onLoad="modelLoad">
		<div component="$UI/system/components/justep/data/data" autoLoad="true" xid="notification" idColumn="id" onCustomRefresh="notifyDataLoad">
   <column label="id" name="id" type="String" xid="default2"></column>
  <column label="content" name="content" type="String" xid="default3"></column>
  <column label="recTime" name="recTime" type="Time" xid="xid1"></column></div></div>
	<span component="$UI/system/components/justep/windowDialog/windowDialog"
		xid="win_dlg" style="left:61px;top:9px;"></span>
	<span component="$UI/system/components/justep/windowReceiver/windowReceiver"
		xid="winRec" style="left:37px;top:10px;"></span>
	<span component="$UI/system/components/justep/messageDialog/messageDialog" xid="msg_dlg" style="left:106px;top:13px;"></span><div component="$UI/system/components/justep/panel/panel" class="x-panel x-full"
		xid="panel1">
		<div class="x-panel-top" xid="top1">
			<div component="$UI/system/components/justep/titleBar/titleBar"
				title="消息记录" class="x-titlebar" xid="titleBar1">
				<div class="x-titlebar-left" xid="div_title_left">
					<a component="$UI/system/components/justep/button/button" label=""
						class="btn btn-link btn-only-icon" icon="icon-chevron-left"
						onClick="backBtnClick" xid="backBtn">
						<i class="icon-chevron-left" xid="i1"></i>
						<span xid="span12"></span>
					</a>
				</div>
				<div class="x-titlebar-title" xid="div_title_title">消息记录</div>
				<div class="x-titlebar-right reverse" xid="div_title_right"><a component="$UI/system/components/justep/button/button" class="btn btn-link btn-only-icon" label="button" xid="btn_clear" icon="icon-ios7-trash-outline" style="width:38px;height:30px;" onClick="btn_clearClick">
   <i xid="i6" class="icon-ios7-trash-outline"></i>
   <span xid="span2"></span></a></div>
			</div>
		</div>
		<div class="x-panel-content" xid="content">
			
		<div component="$UI/system/components/justep/contents/contents" class="x-contents x-full" active="0" xid="contents" slidable="true" swipe="false">
   <div class="x-contents-content x-cards x-scroll-view" xid="listCnt">
    
    
  
  <div component="$UI/system/components/justep/panel/panel" class="x-panel x-full" xid="panel_list">
   
   <div class="x-scroll" component="$UI/system/components/justep/scrollView/scrollView" xid="scrollView">
   <div class="x-content-center x-pull-down container" xid="div1">
   <i class="x-pull-down-img glyphicon x-icon-pull-down" xid="i2"></i>
   <span class="x-pull-down-label" xid="span1">下拉刷新...</span></div><div class="x-scroll-content" xid="div2"><div component="$UI/system/components/justep/list/list" class="x-list" xid="list_notify" data="notification">
   <ul class="x-list-template" xid="listTemplateUl2">
    <li xid="li_notify" class="list-group-item x-flex">
     <div class="x-flex1" xid="div_info">
      <h4 style="text-align: justify;" xid="span_licenceNo" bind-text=' $object.val("content")'></h4>
      <span class="text-muted" style="text-align: justify;" xid="span_model" bind-text=' $object.val("recTime")'></span></div> 
     <div class="x-swipe-area" xid="div_del" bind-click="div_delClick">删除</div></li> </ul> </div></div>
   <div class="x-content-center x-pull-up" xid="div3">
   <span class="x-pull-up-label" xid="span3">加载更多...</span></div></div></div></div> 
   
   </div></div>
	</div>
<div id="aler" xid="div_aler"></div></div>
