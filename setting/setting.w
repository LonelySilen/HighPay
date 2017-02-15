<?xml version="1.0" encoding="UTF-8"?>

<div xmlns="http://www.w3.org/1999/xhtml" xid="window" class="window"
	component="$UI/system/components/justep/window/window" design="device:m;resolution:360 x 640;">
	<div component="$UI/system/components/justep/model/model" xid="model"
		onLoad="modelLoad" style="height:auto;left:114px;top:547px;">
		<div component="$UI/system/components/justep/data/data" autoLoad="true" xid="selectData" idColumn="options" confirmRefresh="false">
   <column label="数据" name="options" type="String" xid="column11"></column>
   <column label="选中值" name="optionsValue" type="String" xid="column12"></column>
   <data xid="default9">[{&quot;options&quot;:&quot;1秒&quot;,&quot;optionsValue&quot;:&quot;1&quot;},{&quot;options&quot;:&quot;3秒&quot;,&quot;optionsValue&quot;:&quot;3&quot;},{&quot;options&quot;:&quot;5秒&quot;,&quot;optionsValue&quot;:&quot;5&quot;},{&quot;options&quot;:&quot;10秒&quot;,&quot;optionsValue&quot;:&quot;10&quot;},{&quot;options&quot;:&quot;20秒&quot;,&quot;optionsValue&quot;:&quot;20&quot;}]</data></div>
  <div component="$UI/system/components/justep/data/data" autoLoad="true" xid="valueData" idColumn="options" confirmRefresh="false">
   <column label="数据" name="options" type="String" xid="column18"></column>
   <column label="选中值" name="optionsValue" type="String" xid="column19"></column>
   <data xid="default11">[{&quot;options&quot;:&quot;10秒&quot;,&quot;optionsValue&quot;:&quot;10&quot;}]</data></div></div>
	<span component="$UI/system/components/justep/windowReceiver/windowReceiver"
		xid="winRec" style="left:52px;top:13px;"></span>
	<span component="$UI/system/components/justep/messageDialog/messageDialog"
		xid="msg_dlg" style="left:89px;top:13px;"></span>
	<div component="$UI/system/components/justep/panel/panel" class="x-panel x-full"
		xid="mainPanel">
		<div class="x-panel-top" xid="top">
			<div component="$UI/system/components/justep/titleBar/titleBar"
				title="设置" class="x-titlebar" xid="titleBar">
				<div class="x-titlebar-left" xid="div_title_left">
					<a component="$UI/system/components/justep/button/button" label=""
						class="btn btn-link btn-only-icon" icon="icon-chevron-left"
						onClick="backBtnClick" xid="backBtn">
						<i class="icon-chevron-left" xid="i1"></i>
						<span xid="span12"></span>
					</a>
				</div>
				<div class="x-titlebar-title" xid="div_title_title" id="tops">设置</div>
				<div class="x-titlebar-right reverse" xid="div_title_right"></div>
			</div>
		</div>
		<div class="x-panel-content" xid="infoContent">
			<div component="$UI/system/components/justep/contents/contents"
				class="x-contents x-full" active="0" xid="contents" slidable="true"
				swipe="false">


				
				<div class="x-contents-content x-cards" xid="infoCnt">
					<div class="x-scroll" component="$UI/system/components/justep/scrollView/scrollView" xid="scrollView1">
   
   <div component="$UI/system/components/justep/controlGroup/controlGroup" class="x-control-group" title="系统设置" xid="controlGroup4" collapsible="false">
   <div class="x-control-group-title" xid="controlGroupTitle1">
    <span xid="span31">title</span></div> 
   <div component="$UI/system/components/justep/labelEdit/labelEdit" class="x-label-edit x-label60" xid="labelEdit1">
   <label class="text-warning x-label" xid="label3" style="width:80%;font-size:medium;"><![CDATA[快速通过：]]></label>
   <span component="$UI/system/components/justep/button/toggle" class="x-toggle pull-right  x-edit" type="checkbox" name="checkbox_listen" ON="开启" OFF="关闭" checkedValue="1" checked="true" xid="toggle_listen" uncheckedValue="0" onChange="toggle_listenChange"></span></div><div component="$UI/system/components/justep/labelEdit/labelEdit" class="x-label-edit x-label60" xid="labelEdit2">
   <label class="text-warning x-label" xid="label1" style="width:80%;font-size:medium;"><![CDATA[禁止熄屏：]]></label>
   <span component="$UI/system/components/justep/button/toggle" class="x-toggle pull-right  x-edit" type="checkbox" name="checkbox_screen" ON="开启" OFF="关闭" checkedValue="1" checked="true" xid="toggle_screen" uncheckedValue="0" onChange="toggle_screenChange"></span></div>
  <div component="$UI/system/components/justep/labelEdit/labelEdit" class="x-label-edit x-label60" xid="labelEdit3">
   <label class="text-warning x-label" xid="label2" style="width:80%;font-size:medium;"><![CDATA[清除缓存：]]></label>
   <span component="$UI/system/components/justep/button/toggle" class="x-toggle pull-right  x-edit" type="checkbox" name="checkbox_cache" ON="清除" OFF="清除" checkedValue="1" checked="false" xid="toggle_cache" uncheckedValue="0" onChange="toggle_cacheChange"></span></div></div><ul class="list-group" xid="ul1">
   
    
   <li class="list-group-item" xid="li2" bind-click="li_exitClick">
    
    
     
  <div xid="div1" align="center">
   <a component="$UI/system/components/justep/button/button" class="btn btn-link btn-only-icon btnImg" label="button" xid="button4" icon="icon-log-out" style="background-color: #FF0000">
   <i xid="i13" class="icon-log-out"></i>
   <span xid="span16"></span></a>
  <span xid="span15"><![CDATA[退出当前账号]]></span></div></li></ul></div>
  </div></div>
		</div>

	</div>
<div id="aler" xid="div_aler"></div></div>