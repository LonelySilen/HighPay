<?xml version="1.0" encoding="utf-8"?>

<div xmlns="http://www.w3.org/1999/xhtml" class="main13" component="$UI/system/components/justep/window/window" design="device:mobile;"	xid="window">
	<div component="$UI/system/components/justep/model/model" xid="model"
		style="height:auto;left:204px;top:330px;" onLoad="modelLoad">
		<div component="$UI/system/components/justep/data/data" autoLoad="true"
			xid="recordData" idColumn="id">
			<column label="id" name="id" type="String" xid="default1"></column>
  <column label="UserId" name="UserId" type="String" xid="xid1"></column>
  <column label="ExitTollGateId" name="ExitTollGateId" type="String" xid="xid2"></column>
  <column label="EnterTollGateId" name="EnterTollGateId" type="String" xid="xid3"></column>
  <column label="ExitTollGateName" name="ExitTollGateName" type="String" xid="xid4"></column>
  <column label="EnterTollGateName" name="EnterTollGateName" type="String" xid="xid5"></column>
  <column label="ExitLicenseNo" name="ExitLicenseNo" type="String" xid="xid6"></column>
  <column label="Money" name="Money" type="String" xid="xid7"></column>
  <column label="VehicleModel" name="VehicleModel" type="String" xid="xid8"></column>
  <column label="EnterDateTime" name="EnterDateTime" type="String" xid="xid9"></column>
  <column label="ExitDateTime" name="ExitDateTime" type="String" xid="xid10"></column></div>
	<div component="$UI/system/components/justep/data/data" xid="newsData" idColumn="fID" autoLoad="true">
   <column label="ID" name="fID" type="String" xid="column1"></column>
   <column label="图片" name="fImage" type="String" xid="default2"></column>
   <column label="标题" name="fTitle" type="String" xid="default3"></column>
   <column label="内容" name="fContent" type="String" xid="default5"></column>
   <data xid="default10">[{&quot;fID&quot;:&quot;1&quot;,&quot;fImage&quot;:&quot;./img/0.jpg&quot;,&quot;fTitle&quot;:&quot;台媒猜测大陆测试歼20引擎&quot;,&quot;fContent&quot;:&quot;两型新引擎高原测试，台媒猜测含歼20的国产动力涡扇15。&quot;},{&quot;fID&quot;:&quot;2&quot;,&quot;fImage&quot;:&quot;./img/1.jpg&quot;,&quot;fTitle&quot;:&quot;普京称俄军2天击垮东欧5国&quot;,&quot;fContent&quot;:&quot;普京称俄军有能力两天占领东欧五国首度，引起东欧国家紧张。&quot;},{&quot;fID&quot;:&quot;3&quot;,&quot;fImage&quot;:&quot;./img/2.jpg&quot;,&quot;fTitle&quot;:&quot;俄出动十万军队在远东演习&quot;,&quot;fContent&quot;:&quot;俄军开始东方2014演习，1500辆坦克70艘军舰参演。&quot;},{&quot;fID&quot;:&quot;4&quot;,&quot;fImage&quot;:&quot;./img/3.jpg&quot;,&quot;fTitle&quot;:&quot;埃及狂购35亿美元俄制武器&quot;,&quot;fContent&quot;:&quot;俄媒称订单中含战斗机、潜艇、中远程防空导弹等多种武器。&quot;},{&quot;fID&quot;:&quot;5&quot;,&quot;fImage&quot;:&quot;./img/4.jpg&quot;,&quot;fTitle&quot;:&quot;日本拟动用自卫队保护核电站&quot;,&quot;fContent&quot;:&quot;有分析称核电站面临安全威胁只是安倍突破自卫队限制的借口。&quot;},{&quot;fID&quot;:&quot;6&quot;,&quot;fImage&quot;:&quot;./img/5.jpg&quot;,&quot;fTitle&quot;:&quot;美中校向华裔女友泄密获刑7年&quot;,&quot;fContent&quot;:&quot;泄漏的文件包括文件包括美军事防御计划大纲，美军亚太部署。&quot;},{&quot;fID&quot;:&quot;7&quot;,&quot;fImage&quot;:&quot;./img/6.jpg&quot;,&quot;fTitle&quot;:&quot;中俄联盟？俄军演先知会中国&quot;,&quot;fContent&quot;:&quot;北京获悉俄远东军演消息早于俄官兵，俄媒称此确认中俄结盟。&quot;},{&quot;fID&quot;:&quot;8&quot;,&quot;fImage&quot;:&quot;./img/7.jpg&quot;,&quot;fTitle&quot;:&quot;俄称4年造出世界最大无人机&quot;,&quot;fContent&quot;:&quot;俄罗斯表示计划2018年试飞重达20吨的无人作战飞机。&quot;},{&quot;fID&quot;:&quot;9&quot;,&quot;fImage&quot;:&quot;./img/8.jpg&quot;,&quot;fTitle&quot;:&quot;海军练远程空战余油险不够回&quot;,&quot;fContent&quot;:&quot;东海舰队三代机部队千余公里外空战，落地时油表接近归零。&quot;},{&quot;fID&quot;:&quot;10&quot;,&quot;fImage&quot;:&quot;./img/9.jpg&quot;,&quot;fTitle&quot;:&quot;美称中国装备新款反航母导弹&quot;,&quot;fContent&quot;:&quot;美专家称中国东风25飞得更快更难拦截，可能曾推销给沙特。&quot;},{&quot;fID&quot;:&quot;11&quot;,&quot;fImage&quot;:&quot;./img/10.jpg&quot;,&quot;fTitle&quot;:&quot;中国城市战型火箭筒亮相南非&quot;,&quot;fContent&quot;:&quot;简氏称DZJ08特意减小杀伤半径，防止在巷战中伤及...&quot;},{&quot;fID&quot;:&quot;12&quot;,&quot;fImage&quot;:&quot;./img/11.jpg&quot;,&quot;fTitle&quot;:&quot;基地组织错将巴军舰当美航母&quot;,&quot;fContent&quot;:&quot;基地组织日前袭击巴军港，原想袭美航母，却不知其早已...&quot;},{&quot;fID&quot;:&quot;13&quot;,&quot;fImage&quot;:&quot;./img/12.jpg&quot;,&quot;fTitle&quot;:&quot;美媒称翼龙无人机中东销路好&quot;,&quot;fContent&quot;:&quot;外媒称翼龙比CH4性能好，解放军无人机团或配多达1...&quot;},{&quot;fID&quot;:&quot;14&quot;,&quot;fImage&quot;:&quot;./img/13.jpg&quot;,&quot;fTitle&quot;:&quot;大校：光靠嘴炮挡不住美潜艇&quot;,&quot;fContent&quot;:&quot;陈虎表示靠嘴批美潜艇抵近中国毫无意义，须能发现其踪...&quot;}]</data></div></div>
	<span component="$UI/system/components/justep/windowDialog/windowDialog"
		xid="win_dlg" style="left:61px;top:9px;"></span>
	<span component="$UI/system/components/justep/windowReceiver/windowReceiver"
		xid="winRec" style="left:37px;top:10px;"></span>
	<span component="$UI/system/components/justep/messageDialog/messageDialog" xid="msg_dlg" style="left:90px;top:7px;"></span><div component="$UI/system/components/justep/panel/panel" class="x-panel x-full" xid="panel">
   <div class="x-panel-top" xid="top">
    <div component="$UI/system/components/justep/titleBar/titleBar" class="x-titlebar" xid="titleBar" title="通行记录">
     <div class="x-titlebar-left" xid="left1">
      <a component="$UI/system/components/justep/button/button" label="" class="btn btn-link btn-only-icon" icon="icon-chevron-left" onClick="backBtnClick" xid="button1">
       <i class="icon-chevron-left" xid="i2"></i>
       <span xid="span23"></span></a> </div> 
     <div class="x-titlebar-title" xid="title1">通行记录</div>
     <div class="x-titlebar-right reverse" xid="div6">
      <a component="$UI/system/components/justep/button/button" class="btn btn-link btn-only-icon" label="button" xid="btn2" onClick="btn_clearClick" icon="icon-ios7-trash-outline" style="width:36px;height:36px;">
       <i xid="i3" class="icon-ios7-trash-outline"></i>
       <span xid="span1"></span></a> </div> </div> </div> 
   <div class="x-panel-content" xid="content2">
    <div component="$UI/system/components/justep/contents/contents" class="x-contents x-full" active="0" xid="contents" wrap="false">
     <div class=" x-cards x-contents-content x-scroll-view" xid="content">
      <div class="x-scroll" component="$UI/system/components/justep/scrollView/scrollView" xid="scrollView">
       <div class="x-content-center x-pull-down container" xid="div25">
        <i class="x-pull-down-img glyphicon x-icon-pull-down" xid="i5"></i>
        <span class="x-pull-down-label" xid="span35">下拉刷新...</span></div> 
       <div class="x-scroll-content" xid="div24">
        <div component="$UI/system/components/justep/list/list" class="x-list" xid="list2" data="recordData">
         <ul class="x-list-template" xid="listTemplateUl2">
          <li xid="li2" class="list-group-item x-flex">
           <div class="x-flex1" xid="div19">
            <div class="text-muted" xid="div4">
             <span xid="span6" class="text-primary">支付路段：</span>
             <span xid="span7" class="pull-right text-danger">天津市京津高速北塘站</span></div> 
            <div class="text-muted" xid="div2">
             <span xid="span32" class="pull-left text-primary">车牌：</span>
             <span xid="span21" class="text-danger" bind-text=' $object.val("ExitLicenseNo")'>No123456</span>
             <span xid="span5" class="pull-right text-danger" bind-text="ref('VehicleModel')">家庭轿车</span>
             <span xid="span3" class="pull-right text-primary">车型：</span></div> 
            <div class="text-muted" xid="div5">
             <span xid="span8" class="text-primary">付款人：</span>
             <span xid="span9" class="text-danger">张三</span>
             <span xid="span15" class="pull-right text-danger" bind-text=' $object.val("Money")'>56</span>
             <span xid="span16" class="pull-right text-primary">金额(￥)：</span></div> 
            <div class="text-muted" xid="div3">
             <span xid="span11" class="pull-left text-primary">入站口：</span>
             <span xid="span14" class="text-danger" bind-text="ref('EnterTollGateName')">入口名</span></div> 
            <div class="text-muted" xid="div10">
             <span xid="span13" class="text-primary">时间：</span>
             <span xid="span10" class="text-danger" bind-text=' $object.val("EnterDateTime")'>2016-03-06</span></div> 
            <div class="text-muted" xid="div8">
             <span xid="span17" class="text-primary">出站口：</span>
             <span xid="span18" class="text-danger" bind-text=' $object.val("ExitTollGateName")'>出口名</span></div> 
            <div class="text-muted" xid="div9">
             <span xid="span20" class="text-primary">时间：</span>
             <span xid="span19" class="text-danger" bind-text=' $object.val("ExitDateTime")'>2016-03-06</span></div> </div> 
           </li> </ul> </div></div> 
       <div class="x-content-center x-pull-up" xid="div31">
        <span class="x-pull-up-label" xid="span36">加载更多...</span></div> </div> </div> </div> </div> 
   <div class="x-panel-bottom" xid="bottom" height="0"></div></div><div id="aler" xid="div_aler"></div></div>
