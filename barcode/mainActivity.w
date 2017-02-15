<?xml version="1.0" encoding="utf-8"?>

<div xmlns="http://www.w3.org/1999/xhtml" xid="window" class="window oa"
	component="$UI/system/components/justep/window/window">
	<div component="$UI/system/components/justep/model/model" xid="model"
		style="height:auto;left:201px;top:457px;" onLoad="modelLoad">
		<div component="$UI/system/components/justep/data/data" xid="fileData"
			idColumn="filePath" autoNew="false">
			<column label="col0" name="filePath" type="String" xid="default1" />
			<column label="col1" name="fileName" type="String" xid="default2" />
			<column label="col2" name="createTime" type="String" xid="default3" />
		</div>
	</div>
	<div component="$UI/system/components/justep/contents/contents"
		class="x-contents x-full" active="0" xid="contents1">
		<div class="x-contents-content" xid="main">
			<div component="$UI/system/components/justep/panel/panel" class="x-panel x-full"
				xid="panel1">
				<div class="x-panel-content x-scroll-view" xid="content3" style="top: 0px; bottom: 0px;">
					
				<div class="x-scroll" component="$UI/system/components/justep/scrollView/scrollView" xid="scrollView1">
   
   <div class="x-scroll-content" xid="div2"><div component="$UI/system/components/justep/controlGroup/controlGroup" class="x-control-group" title="title" xid="controlGroup1">
						<div xid="iamgeDiv" style="text-align:center;">
							<img src="justep.png" alt="" id="image2" xid="image2" height="175px" style="width:175px;" />
						</div>
						<div xid="div5">
							<a component="$UI/system/components/justep/button/button" class="btn btn-link2 btn-block device-button-white" label="扫一扫" xid="scanBtn" onClick="scanBtnClick" disabled="true">
								<i xid="i1" />
								<span xid="span3">扫一扫</span>
							</a>
						</div>
						</div></div>
   </div></div>
				</div>
		</div>
	</div>
</div>
