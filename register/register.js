/*
  Silen
*/

define(function(require){
	var $ = require("jquery");
	var justep = require("$UI/system/lib/justep");
	require("$UI/system/lib/cordova/cordova");
//  require("$UI/blshopApp/JS/Chart.js");
	require("cordova!cordova-plugin-device");
	var global = require("../res/js/global");
        
	var Model = function(){
		this.callParent();
	};

    var Message = require("$UI/system/components/justep/common/common");
      
	Model.prototype.saveCommit = function(event){
		alert("保存数据成功！");
	};

/*判断输入是否为合法的手机号码*/
     function isphone(inputString)
     {
          var partten = /^1[3,5,7,8]\d{9}$/;

          if(partten.test(inputString))
          {
               //alert('是手机号码');
               return true;
          }
          else
          {
               return false;
               //alert('不是手机号码');
          }
     }
     //仅支持字母数字下划线,且必须含有字母
     function checkName(input)
        {	
    	 	var re = new RegExp("[a-zA-Z]");
    	 	if(!re.test(input)){
    	 		return false;
    	 	}
    	 	
        	var regex= /^[a-zA-Z0-9_]{1,}$/;
        	if(regex.exec(input))
        		return true;
        	else
        		return false;
        	
        }
     
     var countdown=60;
     function settime(btn) { 
    	 if (countdown === 0) { 
    		 btn.disabled = false;
    		 btn.set({
        			'label' : "获取验证码"
    		 });
    		 countdown = 60; 
    	 } else { 
    		 btn.disabled = true;
    		 btn.set({
        			'label' : "重新发送(" + countdown + ")"
    		 });
    		countdown--; 
    	 } 
    	 setTimeout(function() { 
    		 settime(btn);
    	 },1000); 

         //this.comp("btn_verify").disabled = true;
     }

	Model.prototype.mainDataCustomSave = function(event){
		alert("数据保存：请参考注释代码或者baas资料，手动进行修改");
	/*
		// 获取当前数据对象
	    var data = event.source;

	    // 构造请求参数
	    var params = {
	    	'data' : data.toJson(true) // 将数据集中已变更数据导出为JSON数据
	    };
	    // 请求成功后的回调方法
	    var success = function(resultData) {
	        // 保存成功后，必须调用data.applyUpdates()，用于数据集确认数据已更新
	        data.applyUpdates();
	    };
	    // 发送请求
	    Baas.sendRequest({
	        'url' : '/test', // servlet请求地址，url要和web.xml中的配置一致，需要手动修改
	        'action' : 'saveTest', // action
	        'params' : params, // action对应的参数
	        'success' : success // 请求成功后的回调方法
	    });
	*/};
	
	Model.prototype.backBtnClick = function(){
		//justep.Portal.closeWindow();
		//history.go(-1);
		//this.comp('winRec').windowCancel();
		justep.Shell.closePage();
//		justep.Shell.showPage("login");
	};
	Model.prototype.btnRegister = function(event){
                var userData = this.comp("userData");
                var userID = $.trim(userData.val("userID"));
                var phoneNum = $.trim(userData.val("phoneNum"));
                var userpass = $.trim(userData.val("userpass"));
                var verify_code = $.trim(userData.val('verifyCode'));
                
                if ( userID === "") {
                        this.comp("msgDlg_res").show({
                                "title" : "温馨提示",
                                "message" : "请输入账号"
                        });
                }else if (!checkName(userID)){
                		this.comp("msgDlg_res").show({
                                "title" : "温馨提示",
                                "message" : "账号仅支持字母、数字和下划线，且必须包含字母"
                        });
                }else if ( phoneNum === "" || !isphone(phoneNum)){
                		this.comp("msgDlg_res").show({
                                "title" : "温馨提示",
                                "message" : "请输入正确的手机号"
                        });
                }else if ( userpass === ""){
                		this.comp("msgDlg_res").show({
                                "title" : "温馨提示",
                                "message" : "请输入密码"
                        });
                }else if ( $.trim(userData.val("userpass2")) !== userpass){
                		this.comp("msgDlg_res").show({
                                "title" : "温馨提示",
                                "message" : "两次密码不一致"
                        });
                }
                else if(verifyCode === "" || verifyCode != verify_code){
                	 this.comp("msgDlg_res").show({
                                "title" : "温馨提示",
                                "message" : "请输入正确的验证码"
                        });
                } 
                else
                {
                		var argv = new Array("10101");//编号
                        argv.push(userID);
                        argv.push(phoneNum);
                        argv.push(userpass);
//                        argv.push(userData.val("alipayCT"));
//                        argv.push(userData.val("defCarNo"));
//                        argv.push(userData.val("driverName"));
//                        argv.push(userData.val("driverNo"));
                        
                		var data = global.getPrm(argv);
                        
                        var self = this;
                        //ajax校验用户名和密码
                        $.ajax({
                                "type" : "post",
                                "async" : false,
                                "cache": false,
                                "dataType" : "json", 
                                "global":false, 
//                                "data":{
//                                        "user":userData.val("username"), //POS提交用户名字段
//                                        "pwd":userData.val("userpass")  //POS提交密码字段
//                                },
                                "data" : data,
                                //"contentType" : "application/json",
                                "url" : global.getUrl(), //PHP数据库校验用户名和密码是否正常
                                "success" : function(data) {
                                //alert(JSON.stringify(data) );
                                        if(data['IsSuccess'] === true){
//                                                localStorage.setItem('username',data['data']['username']);  //登录成功存储用户名到html localStorage
//                                                localStorage.setItem('shopname',data['data']['shopname']);  //登录成功存储中文名称到html localStorage
//                                                window.location.href="./index.w";   //登录成功，跳转到APP首页
                                        	self.comp("msgDlg_res").show({
                                                "title" : "温馨提示",
                                                "message" : "注册成功"
                                        	 });
                                        	 setTimeout( jump ,1000);
                                        	 function jump(){ 
                                        		justep.Shell.closePage();
//                                        	 	justep.Shell.showPage("login");
                                        	 	/*this.comp('winRec').windowCancel();*/
                                        	 }
                                        }
                                        else if(data['IsSuccess'] === false) //返回400，代表数据库查询不到记录，用户名或密码
                                        {
                                                self.comp("msgDlg_res").show({
                                                "title" : "注册失败",
                                                "message" : data['Msg']
                                                });
                                        }        
                                },
                                "error": function(){
                                               //justep.Util.hint("网络连接异常！");
                                               Message.message("aler", "网络连接异常！");
                                        }
                                
                        });
                }

        };
        
    var verifyCode = '';
	Model.prototype.btn_identifyClick = function(event){
		var userData = this.comp("userData");
		var phoneNum = $.trim(userData.val("phoneNum"));
		if ( phoneNum === ""){
			this.comp("msgDlg_res").show({
				"title" : "温馨提示",
				"message" : "请输入手机号"
			});
			return false;
        }
		else if(!isphone(phoneNum)){
			this.comp("msgDlg_res").show({
				"title" : "温馨提示",
				"message" : "请输入正确的手机号"
			});
			return false;
		}
		var argv = new Array("19901");//编号
		argv.push(phoneNum);
		argv.push(localStorage.getItem('registrationID'));

		var data = global.getPrm(argv);
		settime(this.comp("btn_verify"));
		var self = this;
		//ajax校验用户名和密码
		$.ajax({
			"type" : "post",
			"async" : false,
			"cache": false,
			"dataType" : "json", 
			"global":false, 
			"data" : data,
			//"contentType" : "application/json",
			"url" : global.getUrl(), //PHP数据库校验用户名和密码是否正常
			"success" : function(info) {//alert(JSON.stringify(info));
                                
				if(info['IsSuccess'] === true){          //php返回200，代表后端程序成功返回查询结果

					verifyCode = info['Msg'];
					userData.setValue('verifyCode', info['Msg']);
				}
				else if(info['IsSuccess'] === false) //返回400，代表数据库查询不到记录，用户名或密码
				{
					Message.message("aler", "获取验证码失败！");
				}        
			},
			"error": function(){
				//justep.Util.hint("网络连接异常！");
				Message.message("aler", "获取验证码失败！");
			}
                                
		});
	};
	return Model;
});