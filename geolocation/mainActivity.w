<?xml version="1.0" encoding="utf-8"?>

<div xmlns="http://www.w3.org/1999/xhtml" xid="window" class="window"
	component="$UI/system/components/justep/window/window">
	<div component="$UI/system/components/justep/model/model" xid="model"
		style="height:auto;left:562px;top:345px;" onunLoad="modelUnLoad"
		onLoad="modelLoad">
		<div component="$UI/system/components/justep/data/data" autoLoad="false" xid="gpsData" idColumn="id" limit="5" onCustomRefresh="gpsDataLoad">
   <column label="id" name="id" type="String" xid="default6"></column>
   <column label="latitude" name="latitude" type="Double" xid="default7"></column>
   <column label="Longitude" name="Longitude" type="Double" xid="default8"></column>
   <column label="Name" name="Name" type="String" xid="xid3"></column>
   <column label="UpdateTime" name="UpdateTime" type="DateTime" xid="xid4"></column></div><div component="$UI/system/components/justep/data/data" xid="fileData"
			idColumn="content" autoNew="true">
			<column label="col0" name="content" type="String" xid="default2" />
		</div>
		<div component="$UI/system/components/justep/data/data" xid="contentData"
			idColumn="title" autoNew="true">
			<column label="col0" name="title" type="String" xid="default1"></column>
  <column label="col1" name="x" type="String" xid="default3"></column>
  <column label="col2" name="y" type="String" xid="default4"></column>
  <column label="col3" name="z" type="String" xid="default5"></column>
  <column label="col4" name="h" type="String" xid="xid1"></column>
  <column label="col5" name="s" type="String" xid="xid2"></column></div>
	</div>
	<span component="$UI/system/components/justep/windowDialog/windowDialog" xid="winDlg" style="left:6px;top:4px;"></span><div component="$UI/system/components/justep/contents/contents"
		class="x-contents x-full" active="0" xid="contents1" wrap="false"
		swipe="false" slidable="false" routable="false">
		<div class="x-contents-content" xid="main">
			
  <div component="$UI/system/components/justep/panel/panel" class="x-panel x-full" xid="panel1"><div class="x-panel-content grid91 x-scroll-view" xid="content3" style="top: 0px; bottom: 0px;">
					
				
  
  <div class="x-scroll" component="$UI/system/components/justep/scrollView/scrollView" xid="scrollView1">
   
   <div class="x-scroll-content" xid="div2"><table class="table x-noborder" component="$UI/system/components/bootstrap/table/table" xid="table1">
   <tr xid="tr2" class="text-center">
     
     
     <td xid="td3">
      <i class="icon icon-model-s" style="color:#FF8040;" xid="i10"></i><div xid="div31" bind-text="'到达高速附近'" class="h6">到达高速附近</div>
  </td> 
     <td xid="td4" bind-click="listenBtnClick">
      <i class="icon icon-android-locate" style="color:#0080FF;" xid="i14"></i><div xid="div37" bind-text="'实时定位'" class="h6">实时定位</div>
  </td> 
     <td xid="td5" bind-click="stopBtnClick">
      <i class="icon icon-trash-a" style="color:#FF8080;" xid="i15"></i><div xid="div38" bind-text="'停止实时定位'" class="h6">停止实时定位</div>
  </td> </tr><tr xid="tr3" class="text-center">
     
     <td xid="td9" bind-click="getGeoBtnClick">
      <i class="icon icon-android-location" style="color:#FF8000;" xid="i16"></i><div xid="div40" bind-text="'获取当前位置'" class="h6">获取当前位置</div>
  </td> 
     <td xid="td10" bind-click="btn_payClick">
      <i class="icon-ios7-cart icon" style="color: #99C412;" xid="i17"></i><div xid="div45" bind-text="'快速支付'" class="h6">快速支付</div>
  </td> 
     <td xid="td11" bind-click="wakeLock">
      <i class="icon icon-android-hand" style="color:#FF80C0;" xid="i18"></i><div xid="div42" bind-text="'扫一扫'" class="h6">扫一扫</div>
  </td> 
     </tr></table><div xid="div1">
    <a component="$UI/system/components/justep/button/button" class="btn btn-link2 btn-block device-button-white" label="快速通过" xid="quickPassBtn" onClick="quickPassBtnClick">
     <i xid="i1"></i>
     <span xid="span3">快速通过</span></a> 
  <a component="$UI/system/components/justep/button/button" class="btn x-red btn-block device-button-white" label="停止快速通过" xid="stopQPassBtn" onClick="stopQPassBtnClick" style="display:none;">
   <i xid="i2"></i>
   <span xid="span1">停止快速通过</span></a></div><div xid="contentDiv"><div id="titleDiv" xid="titleDiv" bind-text="contentData.ref('title')"></div><div id="xDiv" xid="xDiv" bind-text="contentData.ref('x')"></div>
  <div id="yDiv" xid="yDiv" bind-text="contentData.ref('y')"></div>
  <div id="zDiv" xid="zDiv" bind-text="contentData.ref('z')"></div>
  <div id="div1" xid="hDiv" bind-text=' $model.contentData.val("h")'></div>
  <div id="div2" xid="sDiv" bind-text=' $model.contentData.val("s")'></div></div></div>
   </div></div>
  </div></div>
		</div>
	<div component="$UI/system/components/justep/popOver/popOver"
		class="x-popOver" xid="popOver1">
		<div class="x-popOver-overlay" xid="div5" />
		<div class="x-popOver-content" xid="div6" />
	</div>
</div>
