<?xml version="1.0" encoding="UTF-8"?>

<div xmlns="http://www.w3.org/1999/xhtml" xid="window" class="window"
	component="$UI/system/components/justep/window/window" design="device:m;resolution:360 x 640;">
	<div component="$UI/system/components/justep/model/model" xid="model"
		onLoad="modelLoad" style="height:auto;left:108px;top:461px;">
		<div component="$UI/system/components/justep/data/data" xid="infoData"
			directDelete="true" autoLoad="false" idColumn="id" autoNew="false" onCustomRefresh="infoDataCustomRefresh">
			<column label="id" name="id" type="String" xid="column7"></column>
  <rule xid="rule2">
   <col name="fID" xid="ruleCol2">
    <calculate xid="calculate2">
     <expr xid="default4">justep.UUID.createUUID()</expr></calculate> </col> </rule>
  <column label="accountName" name="accountName" type="String" xid="column1"></column>
  <column label="mobileNo" name="mobileNo" type="Integer" xid="column2"></column>
  <column label="paymentAccount" name="paymentAccount" type="String" xid="column3"></column>
  <column label="defCarNo" name="defCarNo" type="String" xid="column4"></column>
  <column label="driverName" name="driverName" type="String" xid="column6"></column>
  <column label="driverNo" name="driverNo" type="String" xid="column5"></column>
  <data xid="default3">[]</data></div>
		<div component="$UI/system/components/justep/data/data" autoLoad="false"
			xid="pwdData" idColumn="oldPwd" autoNew="true">
			<column label="oldPwd" name="oldPwd" type="String" xid="column8"></column>
			<column label="newPwd" name="newPwd" type="String" xid="column9"></column>
		</div>
	<div component="$UI/system/components/justep/data/data" xid="newsData" idColumn="fID" autoLoad="true">
   <column label="ID" name="fID" type="String" xid="default1"></column>
   <column label="图片" name="fImage" type="String" xid="default2"></column>
   <column label="标题" name="fTitle" type="String" xid="column10"></column>
   <column label="内容" name="fContent" type="String" xid="default5"></column>
   <data xid="default10">[{&quot;fID&quot;:&quot;1&quot;,&quot;fImage&quot;:&quot;./img/0.jpg&quot;,&quot;fTitle&quot;:&quot;台媒猜测大陆测试歼20引擎&quot;,&quot;fContent&quot;:&quot;两型新引擎高原测试，台媒猜测含歼20的国产动力涡扇15。&quot;},{&quot;fID&quot;:&quot;2&quot;,&quot;fImage&quot;:&quot;./img/1.jpg&quot;,&quot;fTitle&quot;:&quot;普京称俄军2天击垮东欧5国&quot;,&quot;fContent&quot;:&quot;普京称俄军有能力两天占领东欧五国首度，引起东欧国家紧张。&quot;},{&quot;fID&quot;:&quot;3&quot;,&quot;fImage&quot;:&quot;./img/2.jpg&quot;,&quot;fTitle&quot;:&quot;俄出动十万军队在远东演习&quot;,&quot;fContent&quot;:&quot;俄军开始东方2014演习，1500辆坦克70艘军舰参演。&quot;},{&quot;fID&quot;:&quot;4&quot;,&quot;fImage&quot;:&quot;./img/3.jpg&quot;,&quot;fTitle&quot;:&quot;埃及狂购35亿美元俄制武器&quot;,&quot;fContent&quot;:&quot;俄媒称订单中含战斗机、潜艇、中远程防空导弹等多种武器。&quot;},{&quot;fID&quot;:&quot;5&quot;,&quot;fImage&quot;:&quot;./img/4.jpg&quot;,&quot;fTitle&quot;:&quot;日本拟动用自卫队保护核电站&quot;,&quot;fContent&quot;:&quot;有分析称核电站面临安全威胁只是安倍突破自卫队限制的借口。&quot;},{&quot;fID&quot;:&quot;6&quot;,&quot;fImage&quot;:&quot;./img/5.jpg&quot;,&quot;fTitle&quot;:&quot;美中校向华裔女友泄密获刑7年&quot;,&quot;fContent&quot;:&quot;泄漏的文件包括文件包括美军事防御计划大纲，美军亚太部署。&quot;},{&quot;fID&quot;:&quot;7&quot;,&quot;fImage&quot;:&quot;./img/6.jpg&quot;,&quot;fTitle&quot;:&quot;中俄联盟？俄军演先知会中国&quot;,&quot;fContent&quot;:&quot;北京获悉俄远东军演消息早于俄官兵，俄媒称此确认中俄结盟。&quot;},{&quot;fID&quot;:&quot;8&quot;,&quot;fImage&quot;:&quot;./img/7.jpg&quot;,&quot;fTitle&quot;:&quot;俄称4年造出世界最大无人机&quot;,&quot;fContent&quot;:&quot;俄罗斯表示计划2018年试飞重达20吨的无人作战飞机。&quot;},{&quot;fID&quot;:&quot;9&quot;,&quot;fImage&quot;:&quot;./img/8.jpg&quot;,&quot;fTitle&quot;:&quot;海军练远程空战余油险不够回&quot;,&quot;fContent&quot;:&quot;东海舰队三代机部队千余公里外空战，落地时油表接近归零。&quot;},{&quot;fID&quot;:&quot;10&quot;,&quot;fImage&quot;:&quot;./img/9.jpg&quot;,&quot;fTitle&quot;:&quot;美称中国装备新款反航母导弹&quot;,&quot;fContent&quot;:&quot;美专家称中国东风25飞得更快更难拦截，可能曾推销给沙特。&quot;},{&quot;fID&quot;:&quot;11&quot;,&quot;fImage&quot;:&quot;./img/10.jpg&quot;,&quot;fTitle&quot;:&quot;中国城市战型火箭筒亮相南非&quot;,&quot;fContent&quot;:&quot;简氏称DZJ08特意减小杀伤半径，防止在巷战中伤及...&quot;},{&quot;fID&quot;:&quot;12&quot;,&quot;fImage&quot;:&quot;./img/11.jpg&quot;,&quot;fTitle&quot;:&quot;基地组织错将巴军舰当美航母&quot;,&quot;fContent&quot;:&quot;基地组织日前袭击巴军港，原想袭美航母，却不知其早已...&quot;},{&quot;fID&quot;:&quot;13&quot;,&quot;fImage&quot;:&quot;./img/12.jpg&quot;,&quot;fTitle&quot;:&quot;美媒称翼龙无人机中东销路好&quot;,&quot;fContent&quot;:&quot;外媒称翼龙比CH4性能好，解放军无人机团或配多达1...&quot;},{&quot;fID&quot;:&quot;14&quot;,&quot;fImage&quot;:&quot;./img/13.jpg&quot;,&quot;fTitle&quot;:&quot;大校：光靠嘴炮挡不住美潜艇&quot;,&quot;fContent&quot;:&quot;陈虎表示靠嘴批美潜艇抵近中国毫无意义，须能发现其踪...&quot;}]</data></div></div>
	<span component="$UI/system/components/justep/windowReceiver/windowReceiver"
		xid="winRec" style="left:52px;top:13px;"></span>
	<span component="$UI/system/components/justep/messageDialog/messageDialog"
		xid="msg_dlg" style="left:89px;top:13px;"></span>
	<div component="$UI/system/components/justep/panel/panel" class="x-panel x-full"
		xid="mainPanel">
		<div class="x-panel-top" xid="top">
			<div component="$UI/system/components/justep/titleBar/titleBar"
				title="注册信息" class="x-titlebar" xid="titleBar">
				<div class="x-titlebar-left" xid="div_title_left">
					<a component="$UI/system/components/justep/button/button" label=""
						class="btn btn-link btn-only-icon" icon="icon-chevron-left"
						onClick="backBtnClick" xid="backBtn">
						<i class="icon-chevron-left" xid="i1"></i>
						<span xid="span12"></span>
					</a>
				</div>
				<div class="x-titlebar-title" xid="div_title_title" id="tops">注册信息</div>
				<div class="x-titlebar-right reverse" xid="div_title_right"></div>
			</div>
		</div>
		<div class="x-panel-content" xid="infoContent">
			<div component="$UI/system/components/justep/contents/contents"
				class="x-contents x-full" active="0" xid="contents" slidable="true"
				swipe="false">


				<div class="x-contents-content x-cards  x-scroll-view" xid="infoCnt" onActive="infoCntActive" onactive="infoCntActive">
					<div class="x-scroll" component="$UI/system/components/justep/scrollView/scrollView" xid="info_scroll" noMoreLoadLabel="注册信息" pullUpLoadingLabel="注册信息" pullUpMoveLabel="注册信息" pullUpLabel="注册信息" pullDownLoadingLabel="注册信息" pullDownMoveLabel="注册信息" pullDownLabel="注册信息">
   
   <div class="x-content-center x-pull-down" xid="div15">
   <span class="x-pull-down-label" xid="span2">注册信息</span></div>
   <div class="x-scroll-content" xid="div2">
     <li class="list-group-item" xid="li8">我的账号
      <span class="pull-right text-muted" xid="span23" bind-text="($model.infoData.val(&quot;accountName&quot;)==null)?'未绑定': $model.infoData.val(&quot;accountName&quot;)">未绑定</span>
      <i xid="i4" class="icon-person" style="color: #FF8000;"></i></li> 
     <li class="list-group-item" xid="li9">我的手机
      <span class="pull-right text-muted" xid="span24" bind-text="($model.infoData.val(&quot;mobileNo&quot;)==null)?'未绑定':$model.infoData.val(&quot;mobileNo&quot;)">未绑定</span>
      <i xid="i5" class="icon-iphone" style="color:#FF8080;"></i></li> 
     <li class="list-group-item" xid="li15">我的积分
      <span class="pull-right text-muted" xid="span261" style="color:#FF8000;">106</span>
      <i xid="i21" class="icon-android-star" style="color:#FF8000;"></i></li> 
     <li class="list-group-item" xid="li11">默认车号
      <span class="pull-right text-muted" xid="span26" bind-text="($model.infoData.val(&quot;defCarNo&quot;)=='' || $model.infoData.val(&quot;defCarNo&quot;)=='null' || $model.infoData.val(&quot;defCarNo&quot;)=='undefined')?'未绑定':$model.infoData.val(&quot;defCarNo&quot;)">未绑定</span>
      <i xid="i7" class="icon-ios7-keypad" style="color: #0080FF;"></i></li> 
     <li class="list-group-item" xid="li10">支付宝账户
      <span class="pull-right text-muted" xid="span25" bind-text="($model.infoData.val(&quot;paymentAccount&quot;)=='' || $model.infoData.val(&quot;paymentAccount&quot;)=='null' || $model.infoData.val(&quot;paymentAccount&quot;)=='undefined')?'未绑定':$model.infoData.val(&quot;paymentAccount&quot;)">未绑定</span>
      <i xid="i6" class="icon-ios7-box-outline" style="color:#008080;"></i></li> 
     <li class="list-group-item" xid="li12">驾驶员姓名
      <span class="pull-right text-muted" xid="span27" bind-text="($model.infoData.val(&quot;driverName&quot;)=='' || $model.infoData.val(&quot;driverName&quot;)=='null' || $model.infoData.val(&quot;driverName&quot;)=='undefined')?'未添加':$model.infoData.val(&quot;driverName&quot;)">未添加</span>
      <i xid="i8" class="icon-leaf" style="color:#228B22;"></i></li> 
     <li class="list-group-item" xid="li13">驾驶证号
      <span class="pull-right text-muted" xid="span28" bind-text="( $model.infoData.val(&quot;driverNo&quot;)=='' || $model.infoData.val(&quot;driverNo&quot;)=='null' || $model.infoData.val(&quot;driverNo&quot;)=='undefined')?'未添加': $model.infoData.val(&quot;driverNo&quot;)">未添加</span>
      <i xid="i9" class="icon-android-storage" style="color: #FF0000"></i></li> <div component="$UI/system/components/justep/controlGroup/controlGroup" class="x-control-group" title="title" xid="group1">
     <div xid="div24" class="text-center user">
      <a component="$UI/system/components/justep/button/button" class="btn x-green" label="修改密码" xid="btn9" target="pwdCnt">
       <i xid="i10"></i>
       <span xid="span29">修改密码</span></a> 
      <a component="$UI/system/components/justep/button/button" class="btn btn-warning" label="更新信息" xid="btn10" target="updateCnt">
       <i xid="i11"></i>
       <span xid="span30">更新信息</span></a> </div> </div></div></div>
  </div>
				<div class="x-contents-content x-cards  x-scroll-view" xid="updateCnt"
					onActive="updateCntActive" onactive="updateCntActive">
					
					
				
  <div class="x-scroll" component="$UI/system/components/justep/scrollView/scrollView" xid="scrollView1" pullDownLabel="注册信息" pullDownMoveLabel="注册信息" pullDownLoadingLabel="注册信息" pullUpLabel="注册信息" pullUpMoveLabel="注册信息" pullUpLoadingLabel="注册信息" noMoreLoadLabel="注册信息">
   <div class="x-content-center x-pull-down" xid="div9">
    <span class="x-pull-down-label" xid="span22">注册信息</span></div> 
   <div class="x-scroll-content" xid="div11">
    
    
    
    
    
    
    
    <div class="form-vertical" component="$UI/system/components/bootstrap/form/form" xid="form1">
						<div xid="div18" class="form-group" style="margin-right:auto;margin-left:auto;width:95%;">
							<label xid="col6" class="sr-only">用户名</label>
							<div xid="col5" class="input-group">
								<div xid="div4" class="input-group-addon">
									<span xid="span4"><![CDATA[昵 称 ： ]]></span><span xid="span8" class="glyphicon glyphicon-user"><![CDATA[]]></span>
								</div>
								<input component="$UI/system/components/justep/input/input" class="form-control" xid="input3" placeHolder="请输入账号" bind-ref="infoData.ref('accountName')"></input>
							</div>
						</div>
						<div xid="div19" class="form-group" style="margin-right:auto;margin-left:auto;width:95%;top:10px;">
							<label xid="col4" class="sr-only">用户名</label>
							<div xid="col3" class="input-group">
								<div xid="div3" class="input-group-addon">
									<span xid="span6"><![CDATA[手 机 ：]]></span><span class="glyphicon glyphicon-phone" xid="span7"><![CDATA[]]></span>
								</div>
								<input component="$UI/system/components/justep/input/input" class="form-control" xid="input2" placeHolder="请输入手机号" bind-ref="infoData.ref('mobileNo')"></input>
							</div>
						</div>
						<div xid="div20" class="form-group" style="margin-right:auto;margin-left:auto;width:95%;top:10px;">
							<label xid="col7" class="sr-only">用户名</label>
							<div xid="col8" class="input-group">
								<div xid="div5" class="input-group-addon">
									<span xid="span10"><![CDATA[支付宝：]]></span><span class="glyphicon glyphicon-credit-card" xid="span1"><![CDATA[]]></span>
								</div>
								<input component="$UI/system/components/justep/input/input" class="form-control" xid="input4" placeHolder="请输入支付宝账号" bind-ref="infoData.ref('paymentAccount')"></input>
							</div>
						</div>
						<div xid="div22" class="form-group" style="margin-right:auto;margin-left:auto;width:95%;top:10px;">
							<label xid="col13" class="sr-only">用户名</label>
							<div xid="col12" class="input-group">
								<div xid="div17" class="input-group-addon">
									<span xid="span13"><![CDATA[驾驶员：]]></span><span class="glyphicon glyphicon-edit" xid="span3"><![CDATA[]]></span>
								</div>
								<input component="$UI/system/components/justep/input/input" class="form-control" xid="input6" placeHolder="请输入驾驶员姓名" bind-ref="infoData.ref('driverName')"></input>
							</div>
						</div>
						<div xid="div23" class="form-group" style="margin-right:auto;margin-left:auto;width:95%;top:10px;">
							<label xid="col15" class="sr-only">用户名</label>
							<div xid="col14" class="input-group">
								<div xid="div16" class="input-group-addon">
									<span xid="span14"><![CDATA[驾驶证：]]></span><span class="glyphicon glyphicon-list-alt" xid="span9"><![CDATA[]]></span>
								</div>
								<input component="$UI/system/components/justep/input/input" class="form-control" xid="input7" placeHolder="请输入驾驶证号" bind-ref="infoData.ref('driverNo')"></input>
							</div>
						</div>
					</div><div component="$UI/system/components/justep/row/row" class="x-row" xid="row4">
						<div class="x-col" xid="col10" style="text-align:center;">
							<a component="$UI/system/components/justep/button/button" class="btn btn-danger btn-block" label="更新" xid="btn13" onClick="btn_update">
								<i xid="i3"></i>
								<span xid="span5">更新</span>
							</a>
						</div>
					</div></div> 
   
  </div></div>
				<div class="x-contents-content x-cards x-scroll-view" xid="pwdCnt" onActive="pwdCntActive" onactive="pwdCntActive">
					
					
				<div class="x-scroll" component="$UI/system/components/justep/scrollView/scrollView" xid="scrollView2" pullDownLabel="注册信息" pullDownMoveLabel="注册信息" pullDownLoadingLabel="注册信息" pullUpLabel="注册信息" pullUpMoveLabel="注册信息" pullUpLoadingLabel="注册信息" noMoreLoadLabel="注册信息">
   <div class="x-content-center x-pull-down" xid="div31">
    <span class="x-pull-down-label" xid="span37">注册信息</span></div> 
   <div class="x-scroll-content" xid="div12">
    
    <div class="form-vertical" component="$UI/system/components/bootstrap/form/form" xid="form">
						<div xid="div25" class="form-group" style="margin-right:auto;margin-left:auto;width:95%;">
							<label xid="label1" class="sr-only">用户名</label>
							<div xid="div26" class="input-group">
								<div xid="div27" class="input-group-addon">
									<span class="glyphicon glyphicon-pencil" xid="span31"></span>
								</div>
								<input component="$UI/system/components/justep/input/password" class="form-control" xid="oldPwd" placeHolder="请输入原密码" bind-ref="pwdData.ref('oldPwd')"></input>
							</div>
						</div>
						<div xid="div28" class="form-group" style="margin-right:auto;margin-left:auto;width:95%;">
							<label xid="label2" class="sr-only">密码</label>
							<div xid="div29" class="input-group">
								<div xid="div30" class="input-group-addon">
									<span class="glyphicon glyphicon-edit" xid="span32"></span>
								</div>
								<input component="$UI/system/components/justep/input/password" class="form-control" xid="newPwd" placeHolder="请输入新的密码" bind-ref="pwdData.ref('newPwd')"></input>
							</div>
						</div>
					</div><div component="$UI/system/components/justep/row/row" class="x-row" xid="row1">
						<div class="x-col" xid="col1" style="text-align:center;">
							<a component="$UI/system/components/justep/button/button" class="btn btn-danger btn-block" label="修改密码" xid="btn12" onClick="btn_alterClick">
								<i xid="i12"></i>
								<span xid="span33">修改密码</span>
							</a>
						</div>
					</div></div> 
   </div></div>
			</div>
		</div>

	<div class="x-panel-bottom" xid="bottom" height="0"></div></div>
<div id="aler" xid="div_aler"></div></div>