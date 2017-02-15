<?xml version="1.0" encoding="utf-8"?>

<div xmlns="http://www.w3.org/1999/xhtml" component="$UI/system/components/justep/window/window"
	design="device:mobile" xid="window">
	<div component="$UI/system/components/justep/model/model" xid="model"
		style="height:auto;left:320px;top:301px;">
		<div component="$UI/system/components/justep/data/data" xid="userData"
			directDelete="true" autoLoad="false" idColumn="userID" onCustomSave="mainDataCustomSave"
			onSaveCommit="saveCommit" autoNew="true">
			<column label="userID" name="userID" type="String" xid="userData"></column>
  <rule xid="rule1">
   <col name="fID" xid="ruleCol1">
    <calculate xid="calculate1">
     <expr xid="default2">justep.UUID.createUUID()</expr></calculate> </col> </rule>
  <column label="username" name="username" type="String" xid="xid2"></column>
  <column label="phoneNum" name="phoneNum" type="Integer" xid="xid3"></column>
  <column label="userpass" name="userpass" type="String" xid="xid1"></column>
  <column label="userpass2" name="userpass2" type="String" xid="xid4"></column>
  <column label="verifyCode" name="verifyCode" type="String" xid="xid5"></column></div>
	</div>
	<span component="$UI/system/components/justep/messageDialog/messageDialog"
		xid="msgDlg_res" style="left:66px;top:10px;"></span>
	<span component="$UI/system/components/justep/windowReceiver/windowReceiver"
		xid="winRec" style="left:37px;top:9px;"></span>
	<div component="$UI/system/components/justep/panel/panel" class="x-panel x-full">
		<div class="x-panel-top">
			<div component="$UI/system/components/justep/titleBar/titleBar"
				title="用户注册" class="x-titlebar">
				<div class="x-titlebar-left" xid="div_title_left">
					<a component="$UI/system/components/justep/button/button" label=""
						class="btn btn-link btn-only-icon" icon="icon-chevron-left"
						onClick="backBtnClick" xid="backBtn">
						<i class="icon-chevron-left" />
						<span />
					</a>
				</div>
				<div class="x-titlebar-title" xid="div_title_title">用户注册</div>
				<div class="x-titlebar-right reverse" xid="div_title_right"></div>
			</div>
		</div>
		<div class="x-panel-content  x-scroll-view" _xid="C70A033B26D00001D01310BD10BCB6E0" style="bottom: 0px;">

			
  <div class="x-scroll" component="$UI/system/components/justep/scrollView/scrollView" xid="info1" noMoreLoadLabel="注册信息" pullUpLoadingLabel="注册信息" pullUpMoveLabel="注册信息" pullUpLabel="注册信息" pullDownLoadingLabel="注册信息" pullDownMoveLabel="注册信息" pullDownLabel="注册信息">
   <div class="x-content-center x-pull-down" xid="div15">
    <span class="x-pull-down-label" xid="span2"><![CDATA[用户注册]]></span></div> 
   <div class="x-scroll-content" xid="div2">
    
    
    
    
    
    
    
    <div class="form-vertical" component="$UI/system/components/bootstrap/form/form" xid="form1">
   <div xid="div9" class="form-group">
    <label xid="col6" class="sr-only">用户名</label>
    <div xid="col5" class="input-group">
     <div xid="div4" class="input-group-addon">
      <span xid="span12"><![CDATA[账 号 ： ]]></span><span xid="span8" class="glyphicon glyphicon-user"></span>
  </div> 
     <input component="$UI/system/components/justep/input/input" class="form-control" xid="input3" placeHolder="请输入账号" bind-ref="userData.ref('userID')"></input></div> </div> 
   <div xid="div10" class="form-group">
    <label xid="col4" class="sr-only">用户名</label>
    <div xid="col3" class="input-group">
     <div xid="div3" class="input-group-addon">
      <span xid="span15"><![CDATA[手  机 ： ]]></span><span class="glyphicon glyphicon-phone" xid="span7"></span>
  </div> 
     <input component="$UI/system/components/justep/input/input" class="form-control" xid="input2" placeHolder="请输入手机号" bind-ref="userData.ref('phoneNum')"></input></div> </div><div xid="div11" class="form-group">
    <label xid="label5" class="sr-only">密码</label>
    <div xid="div16" class="input-group">
     <div xid="div17" class="input-group-addon">
      <span xid="span14"><![CDATA[密  码 ： ]]></span><span class="glyphicon glyphicon-lock" xid="span4"></span>
  </div> 
     <input component="$UI/system/components/justep/input/password" class="form-control" xid="password" placeHolder="请输入密码" bind-ref="userData.ref('userpass')"></input></div> </div> 
    
   <div xid="div12" class="form-group">
    <label xid="col15" class="sr-only">用户名</label>
    <div xid="col14" class="input-group">
     <div xid="div8" class="input-group-addon">
      <span xid="span19"><![CDATA[校验密码：]]></span></div> 
     <input component="$UI/system/components/justep/input/password" class="form-control" xid="password1" placeHolder="请再次输入密码" bind-ref="userData.ref('userpass2')"></input></div> </div> 
   <div xid="div13" class="form-group">
    <a component="$UI/system/components/justep/button/button" style="padding: 0;margin: 10px 10px 0 0;" class="btn btn-link pull-right" label="获取验证码" xid="btn_verify" onClick="btn_identifyClick">
     <i xid="i14"></i>
     <span xid="span11">获取验证码</span></a> 
    <label xid="col17" class="sr-only">用户名</label>
    <div xid="col16" class="input-group">
     <div xid="div1" class="input-group-addon">
      <span xid="span20"><![CDATA[验证码：]]></span><span class="glyphicon glyphicon-envelope" xid="span10"></span>
  </div> 
     <input component="$UI/system/components/justep/input/input" class="form-control" xid="verify_code" placeHolder="请输入验证码" bind-ref="userData.ref('verifyCode')"></input></div> </div> </div><div component="$UI/system/components/justep/row/row" class="x-row" xid="row4">
   <div class="x-col" xid="col10" style="text-align:center;">
    <a component="$UI/system/components/justep/button/button" class="btn x-green btn-block" label="注册" xid="button3" onClick="btnRegister">
     <i xid="i3"></i>
     <span xid="span5">注册</span></a> </div> </div></div> </div></div>
	</div>
<div id="aler" xid="div_aler"></div></div>