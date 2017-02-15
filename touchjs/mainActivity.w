<?xml version="1.0" encoding="utf-8"?>

<div xmlns="http://www.w3.org/1999/xhtml" xid="window" class="window" component="$UI/system/components/justep/window/window"
  design="device:mobile">  
  <div component="$UI/system/components/justep/model/model" xid="model" style="height:auto;left:280px;top:68px;" onLoad="modelLoad"> 
    <div component="$UI/system/components/justep/data/data" xid="newsData"
      idColumn="fID" autoLoad="true"> 
      <column label="ID" name="fID" type="String" xid="default1"/>  
      <column label="图片" name="fImage" type="String" xid="default2"/>  
      <column label="标题" name="fTitle" type="String" xid="default3"/>  
      <column label="内容" name="fContent" type="String" xid="default5"/>  
      <data xid="default10">[{"fID":"1","fImage":"./img/0.jpg","fTitle":"台媒猜测大陆测试歼20引擎","fContent":"两型新引擎高原测试，台媒猜测含歼20的国产动力涡扇15。"},{"fID":"2","fImage":"./img/1.jpg","fTitle":"普京称俄军2天击垮东欧5国","fContent":"普京称俄军有能力两天占领东欧五国首度，引起东欧国家紧张。"},{"fID":"3","fImage":"./img/2.jpg","fTitle":"俄出动十万军队在远东演习","fContent":"俄军开始东方2014演习，1500辆坦克70艘军舰参演。"},{"fID":"4","fImage":"./img/3.jpg","fTitle":"埃及狂购35亿美元俄制武器","fContent":"俄媒称订单中含战斗机、潜艇、中远程防空导弹等多种武器。"},{"fID":"5","fImage":"./img/4.jpg","fTitle":"日本拟动用自卫队保护核电站","fContent":"有分析称核电站面临安全威胁只是安倍突破自卫队限制的借口。"},{"fID":"6","fImage":"./img/5.jpg","fTitle":"美中校向华裔女友泄密获刑7年","fContent":"泄漏的文件包括文件包括美军事防御计划大纲，美军亚太部署。"},{"fID":"7","fImage":"./img/6.jpg","fTitle":"中俄联盟？俄军演先知会中国","fContent":"北京获悉俄远东军演消息早于俄官兵，俄媒称此确认中俄结盟。"},{"fID":"8","fImage":"./img/7.jpg","fTitle":"俄称4年造出世界最大无人机","fContent":"俄罗斯表示计划2018年试飞重达20吨的无人作战飞机。"},{"fID":"9","fImage":"./img/8.jpg","fTitle":"海军练远程空战余油险不够回","fContent":"东海舰队三代机部队千余公里外空战，落地时油表接近归零。"},{"fID":"10","fImage":"./img/9.jpg","fTitle":"美称中国装备新款反航母导弹","fContent":"美专家称中国东风25飞得更快更难拦截，可能曾推销给沙特。"},{"fID":"11","fImage":"./img/10.jpg","fTitle":"中国城市战型火箭筒亮相南非","fContent":"简氏称DZJ08特意减小杀伤半径，防止在巷战中伤及..."},{"fID":"12","fImage":"./img/11.jpg","fTitle":"基地组织错将巴军舰当美航母","fContent":"基地组织日前袭击巴军港，原想袭美航母，却不知其早已..."},{"fID":"13","fImage":"./img/12.jpg","fTitle":"美媒称翼龙无人机中东销路好","fContent":"外媒称翼龙比CH4性能好，解放军无人机团或配多达1..."},{"fID":"14","fImage":"./img/13.jpg","fTitle":"大校：光靠嘴炮挡不住美潜艇","fContent":"陈虎表示靠嘴批美潜艇抵近中国毫无意义，须能发现其踪..."}]</data> 
    </div> 
  </div>  
  <div component="$UI/system/components/justep/panel/panel" class="x-panel x-full" xid="panel1">
   <div class="x-panel-top" xid="top2">
   <div component="$UI/system/components/justep/titleBar/titleBar" class="x-titlebar" xid="titleBar2" title="touch相关效果">
    <div class="x-titlebar-left" xid="div4">
     <a component="$UI/system/components/justep/button/button" label="button" xid="button2" icon="icon-chevron-left" class="btn btn-link btn-only-icon" onClick="button2Click">
      <i xid="i2" class="icon-chevron-left"></i>
      <span xid="span2"></span></a> </div> 
    <div class="x-titlebar-title" xid="div5">touch相关效果</div>
    <div class="x-titlebar-right reverse" xid="div6"></div></div> </div><div class="x-panel-content" xid="content1"><div component="$UI/system/components/justep/contents/contents" class="x-contents x-full" active="0" xid="contents1" wrap="false">
   <div class="x-contents-content" xid="rotateContent">
    <img src="./img/cloud.png" alt="" xid="rotate" style="height:196px;width:184px;"></img></div> 
   <div class="x-contents-content" xid="content2">
    <div xid="div19" class="x-pinch-table">
       <div xid="div20" class="x-pinch-table-cell">
        <img src="./img/1024.jpg" alt="" xid="pinch" style="height:196px;width:184px;"></img></div> </div></div> 
   <div class="x-contents-content" xid="content5">
    <img src="./img/cloud.png" alt="" xid="drag" style="height:196px;width:184px;"></img></div> 
   <div class="x-contents-content" xid="newsContent">
    <div class="x-scroll" component="$UI/system/components/justep/scrollView/scrollView" xid="demoList" autoPullUp="false">
         <div class="x-content-center x-pull-down container" xid="div15">
          <i class="x-pull-down-img glyphicon x-icon-pull-down" xid="i7"></i>
          <span class="x-pull-down-label" xid="span6">下拉刷新...</span></div> 
         <div class="x-scroll-content" xid="div14">
          <div xid="newsList" class="x-list" component="$UI/system/components/justep/list/list" data="newsData" limit="8">
           <ul class="x-list-template" style="padding-top:6px;" xid="listTemplateUl1">
            <li class="media" style="padding-left:6px; padding-right:6px;overflow:visible;position:relative;display:block;" xid="li1">
             <div style="overflow:hidden;" xid="div21">
              <div class="x-blob x-blob-radius pull-left media-object x-news-image" xid="div16">
               <img class="x-blob-img x-autofill" bind-attr-src="$model.getImageUrl($object)" xid="image4"></img></div> 
              <div class="media-body" xid="div17">
               <h4 class="media-heading" bind-text="ref('fTitle')" xid="h41"></h4>
               <div bind-text="ref('fContent')" xid="div18"></div></div> </div> 
             <div class="x-swipe-area" xid="div22">删除</div></li> </ul> </div> </div> 
         <div class="x-content-center x-pull-up" xid="div13">
          <span class="x-pull-up-label" xid="span7">加载更多...</span></div> </div></div> </div></div>
   <div class="x-panel-bottom" xid="bottom1"><div component="$UI/system/components/justep/button/buttonGroup" class="btn-group btn-group-justified" tabbed="true" xid="buttonGroup1" style="height:48px;"><a component="$UI/system/components/justep/button/button" class="btn btn-default" label="单指旋转" xid="button4" target="rotateContent">
   <i xid="i4"></i>
   <span xid="span4">单指旋转</span></a>
  <a component="$UI/system/components/justep/button/button" class="btn btn-default" label="双指缩放" xid="button5" target="content2">
   <i xid="i5"></i>
   <span xid="span5">双指缩放</span></a>
  <a component="$UI/system/components/justep/button/button" class="btn btn-default" label="拖拽" xid="button6" target="content5">
   <i xid="i6"></i>
   <span xid="span8">拖拽</span></a>
  <a component="$UI/system/components/justep/button/button" class="btn btn-default" label="滑动删除" xid="button7" target="newsContent">
   <i xid="i8"></i>
   <span xid="span9">滑动删除</span></a></div></div>
  </div></div>
