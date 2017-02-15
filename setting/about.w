<?xml version="1.0" encoding="utf-8"?>

<div xmlns="http://www.w3.org/1999/xhtml" class="main13" component="$UI/system/components/justep/window/window" design="device:mobile;"	xid="window">
	<div component="$UI/system/components/justep/model/model" xid="model"
		style="height:auto;left:204px;top:330px;" onLoad="modelLoad">
		</div>
	<span component="$UI/system/components/justep/windowDialog/windowDialog"
		xid="win_dlg" style="left:61px;top:9px;"></span>
	<span component="$UI/system/components/justep/windowReceiver/windowReceiver"
		xid="winRec" style="left:37px;top:10px;"></span>
	<span component="$UI/system/components/justep/messageDialog/messageDialog" xid="msg_dlg" style="left:106px;top:13px;"></span><div component="$UI/system/components/justep/panel/panel" class="x-panel x-full"
		xid="panel1">
		<div class="x-panel-top" xid="top1">
			<div component="$UI/system/components/justep/titleBar/titleBar"
				title="关于" class="x-titlebar" xid="titleBar1">
				<div class="x-titlebar-left" xid="div_title_left">
					<a component="$UI/system/components/justep/button/button" label=""
						class="btn btn-link btn-only-icon" icon="icon-chevron-left"
						onClick="backBtnClick" xid="backBtn">
						<i class="icon-chevron-left" xid="i1"></i>
						<span xid="span12"></span>
					</a>
				</div>
				<div class="x-titlebar-title" xid="div_title_title">关于</div>
				<div class="x-titlebar-right reverse" xid="div_title_right"></div>
			</div>
		</div>
		<div class="x-panel-content" xid="content">
			
		<div component="$UI/system/components/bootstrap/carousel/carousel" class="x-carousel carousel" xid="carousel" auto="false">
   <ol class="carousel-indicators" xid="ol2"></ol>
   <div class="x-contents carousel-inner" role="listbox" component="$UI/system/components/justep/contents/contents" active="0" slidable="true" wrap="false" swipe="true" xid="contents2" style="height:100%;width:100%;">
    <div class="x-contents-content" xid="content1">
     <img src="$UI/weixin/intro/img/01.png" class="image-wall" xid="image1" height="100%" style="width:100%;"></img></div> 
    <div class="x-contents-content" xid="content2">
     <img src="$UI/weixin/intro/img/02.png" class="image-wall" xid="image2"></img></div> 
    <div class="x-contents-content" xid="content3">
     <img src="$UI/weixin/intro/img/03.png" class="image-wall" xid="image3"></img></div> 
    </div> 
   
   </div></div>
	</div>
<div id="aler" xid="div_aler"></div></div>
