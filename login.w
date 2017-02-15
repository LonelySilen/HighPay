<?xml version="1.0" encoding="utf-8"?>
<div xmlns="http://www.w3.org/1999/xhtml" component="$UI/system/components/justep/window/window"
	design="device:m;">
	<div component="$UI/system/components/justep/model/model" xid="model1"
		style="left:6px;top:393px;height:46px;width:143px;" onLoad="modelLoad">
		<div component="$UI/system/components/justep/data/data" autoLoad="false"
			xid="userData" idColumn="userId" autoNew="true">
			<column label="userId" name="userId" type="String" xid="default1"></column>
			<column label="userpass" name="userpass" type="String" xid="default2"></column>
		</div>
	</div>
	<span component="$UI/system/components/justep/messageDialog/messageDialog"
		xid="msgDlg_login" style="left:9px;top:351px;"></span>
	<span component="$UI/system/components/justep/windowDialog/windowDialog"
		xid="winDlg_reg"></span>
	<div component="$UI/system/components/justep/contents/contents"
		class="x-contents x-full" active="0" xid="contents" slidable="false" swipe="false" wrap="false">
		<div class="x-contents-content" xid="content"
			style="background-image:url(img/loginbg4.jpg);" onActive="contentActive">
			
			<div xid="div_avatar" style="margin:10px 50px 0px 50px;" align="center">
				
			<img src="$UI/weixin/res/img/vim.png" alt="" xid="image_avatar" height="150"></img>
  <p xid="p1"></p>
  </div><div class="form-vertical" component="$UI/system/components/bootstrap/form/form"
				xid="form">
				<div xid="div_account" class="form-group"
					style="margin-right:auto;margin-left:auto;width:95%;">
					<label xid="label_account" class="sr-only"><![CDATA[用户名]]></label>
					<div xid="div_acct" class="input-group">
						<div xid="div_icon_acct" class="input-group-addon">
							<span class="glyphicon glyphicon-user"></span>
						</div>
						<input component="$UI/system/components/justep/input/input"
							class="form-control" xid="userId" placeHolder="请输入账号/手机号"
							bind-ref="userData.ref('userId')"></input>
					</div>
				</div>
				<div xid="div_password" class="form-group"
					style="margin-right:auto;margin-left:auto;width:95%;">
					<label xid="label_pass" class="sr-only"><![CDATA[密码]]></label>
					<div xid="div_pass" class="input-group">
						<div xid="div_icon_pass" class="input-group-addon">
							<span class="glyphicon glyphicon-lock"></span>
						</div>
						<input component="$UI/system/components/justep/input/password"
							class="form-control" xid="password" placeHolder="请输入密码"
							bind-ref="userData.ref('userpass')"></input>
					</div>
				</div>
			</div>
			<div component="$UI/system/components/justep/row/row" class="x-row"
				xid="row_btn">
				<div class="x-col" xid="col10" style="text-align:center;">
					<a component="$UI/system/components/justep/button/button" class="btn btn-danger btn-block"
						label="登录系统" xid="btn_login" onClick="userLogin" disabled="true">
						<i xid="i_btn"></i>
						<span xid="span_btn">登录系统</span>
					</a>
				</div>
			</div>
			<div xid="div_others" align="right">
				<a xid="register" style="margin-right:20px;text-align:center;"
					bind-click="registerClick"><![CDATA[注册]]></a>
				<a xid="forget" style="margin-right:50px;text-align:center;"
					bind-click="forgetClick"><![CDATA[忘记密码]]></a>
			</div>
			<div xid="div_info"
				style="margin:50px 20px 50px 20px;height:50px;text-align:center;">
				<span xid="span_info"><![CDATA[ © 天津锐敏科技]]></span>
			<a href= "tel:10086" ><![CDATA[联系我们]]></a>
  </div>
		</div>
	</div>
<div id="aler" xid="div_aler"></div></div>