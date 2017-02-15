define(function(require){
        var $ = require("jquery");
        var justep = require("$UI/system/lib/justep");
        require("$UI/system/lib/cordova/cordova");
        require("cordova!cordova-plugin-device");
        require("cordova!cn.jpush.phonegap.JPushPlugin");
        	
        var global = require("./res/js/global");
        var jpushInstance = require("./res/js/jpush");
        var Message = require("$UI/system/components/justep/common/common");
        
        var SqliteUtil = require("./res/js/sqliteUtil");
        var DemoDB = require("./res/js/sqlite");
    
        var Model = function(){
        	this.callParent();
        };

       	Model.prototype.modelLoad = function(event){
       		var me = this;
       		document.addEventListener("deviceready", onDeviceReady, false);
       		// 加载完成
       		function onDeviceReady() {
       			//发送jpush需要的RegistrationID
       			me.getRegistrationID();
       			me.comp("btn_login").set({disabled: false});
       			//this.comp("temp").refreshData();
       		}
       	};
        
        function checkName(input)
        {

        	var regex= /^[a-zA-Z0-9_]{1,}$/;
        	if(regex.exec(input))
        		return true;
        	else
        		return false;
        	
        }
        
        Model.prototype.userLogin = function(event){
        		
        		this.comp("btn_login").disabled = true;
        		this.comp("btn_login").set({
        			'icon' : 'icon-loading-a'
        		});
                var userData = this.comp("userData");
                //用户名和密码为空提示
                if ( $.trim(userData.val("userId")) === "" ) {
                        this.comp("msgDlg_login").show({
                                "title" : "温馨提示",
                                "message" : "请输入用户名或手机号"
                        });
                        this.comp("btn_login").disabled = false;
                        this.comp("btn_login").set({
                        	'icon' : null
                        });
                        //Message.message("aler", "请输入用户名或密码");
                }else if ( !checkName(userData.val("userId")) ) {
                        this.comp("msgDlg_login").show({
                                "title" : "温馨提示",
                                "message" : "请输入正确的用户名"
                        });
                        this.comp("btn_login").disabled = false;
                        this.comp("btn_login").set({
                        	'icon' : null
                        });
                        //Message.message("aler", "请输入用户名或密码");
                }else if ( $.trim(userData.val("userpass")) === "") {
                        this.comp("msgDlg_login").show({
                                "title" : "温馨提示",
                                "message" : "请输入密码"
                        });
                        this.comp("btn_login").disabled = false;
                        this.comp("btn_login").set({
                        	'icon' : null
                        });
                        //Message.message("aler", "请输入用户名或密码");
                }
                else
                {
                		//window.location.href="./index.w";
                        var self = this;
                        
                        //解决跨域访问
//                        $.support.cors = true;
                        
                        var argv = new Array("10102");//编号
                        argv.push(userData.val("userId"));
                        argv.push(userData.val("userpass"));
                        //alert(localStorage.getItem('registrationID'));
                        if(localStorage.getItem('registrationID')!== null){
                        	argv.push(localStorage.getItem('registrationID'));
                        }else{
                        	//justep.Util.hint("获取本机数据异常，请重试");
                        	Message.message("aler", "获取本机数据异常，请重试");
                        	this.getRegistrationID();
                        	self.comp("btn_login").disabled = false;
                        	self.comp("btn_login").set({
                        		'icon' : null
                        	});
                        	return false;
                        }
                        
                        var data = global.getPrm(argv);
                        //alert(JSON.stringify(data) );
                        
                        //ajax校验用户名和密码
                        $.ajax({
                        		timeout : 5000,
                                "type" : "post",
                                "async" : true,
                                "cache" : false,
                                "global" : false, 
                                "dataType" : "json",                              
                                "contentType" : "application/x-www-form-urlencoded; charset=utf-8",
//                                "data" : {
//                                        "accountName" : userData.val("userId"), //POS提交用户名字段
//                                        "accountPwd" : userData.val("userpass")  //POS提交密码字段
//                                },
                                "data" : data,
                                "url" : global.getUrl(), //PHP数据库校验用户名和密码是否正常
                                "success" : function(info) {
                                		//alert(info['IsSuccess']+JSON.stringify(info['Obj']) );
                                        if(info['IsSuccess'] === true){
                                                localStorage.setItem('userId',info['Obj']['id']);  //登录成功存储用户账户到html localStorage
                                                localStorage.setItem('userName',userData.val("userId"));
                                                localStorage.setItem('sessionid',info['Obj']['SessionID']);
                                                //localStorage.setItem('shopname',data['data']['shopname']);  //登录成功存储中文名称到html localStorage
                                                //window.location.href="./index.w";   //登录成功，跳转到APP首页
//                                        	self.comp("msgDlg_login").show({
//                                                "title" : "温馨提示",
//                                                "message" : "登录成功"
//                                        	 });
                                        	 self.comp("btn_login").disabled = false;
                                        	 self.comp("btn_login").set({
                                        		 'icon' : null
                                        	 });
                                        	 //justep.Shell.closePage("main");
                                        	 //justep.Shell.showPage("$UI/weixin/index_main.w");
                                        	 justep.Shell.showPage("main");/*window.location.reload();window.location.href = "./index.w";*/
                                        	 //window.location.reload();
                                        }
                                        else if(info['IsSuccess'] === false) //返回400，代表数据库查询不到记录，用户名或密码
                                        {
                                                self.comp("msgDlg_login").show({
                                                "title" : "温馨提示",
                                                "message" : "输入的用户名或密码不正确"
                                                });
                                                self.comp("btn_login").disabled = false;
                                                self.comp("btn_login").set({
                                                	'icon' : null
                                                });
                                        }        
                                },
                                "error" : function(XMLHttpRequest){
                                		//justep.Util.hint("网络连接异常！");
                                		Message.message("aler", "网络连接异常！");
//                                		alert(XMLHttpRequest.status);
//                                		alert(XMLHttpRequest.readyState);
                                		//0:请求未初始化;1：请求已经建立,但是还没有发送;
                                		//1:请求已经建立,但是还没有发送(还没有调用 send());
                                		//2:请求已发送,正在处理中(通常现在可以从响应中获取内容头);
                                		//3:请求在处理中(通常响应中已有部分数据可用了,但是服务器还没有完成响应的生成);
                                		//4:响应已完成(您可以获取并使用服务器的响应了)
                                        
                                        self.comp("btn_login").disabled = false;
                                        self.comp("btn_login").set({
                                        	'icon' : null
                                        });
                                }
                                
                        });
                }

        };


        Model.prototype.registerClick = function(event){
        	
        	//var url =  require.toUrl("./register/register.w");
        	//this.comp('winDlg_reg').open({src:url});
        	//window.location.href = url;
//        	justep.Shell.closePage();

        	if(localStorage.getItem('registrationID')!== null){
        		justep.Shell.showPage("register");
            }else{

            	Message.message("aler", "获取本机数据异常，请重试");
            	this.getRegistrationID();
                        	
            }

	};
        Model.prototype.forgetClick = function(event){
        	
//        	justep.Shell.closePage();
        	justep.Shell.showPage("touchjs/mainActivity.w");

	};


	Model.prototype.getRegistrationID = function(event){
		if(global.getPhoneType()==='ios'){//alert( device.model +"----"+device.cordova +"------"+ device.uuid +"-----"+device.version+"----"+device.platform );
			localStorage.setItem('registrationID',device.uuid);
		}
		window.plugins.jPushPlugin.getRegistrationID(onCallback);
		
		var onCallback = function(data) {//alert('onCallback');
			if(data>0){
				//开启
				alert('0:'+data);
			}else{
				//关闭
				alert('1:'+data);
			}
		};
		
		jpushInstance.getRegistrationID().done(function(id) {
			//justep.Util.hint(id);
			localStorage.setItem('registrationID',id);
//			var argv = new Array("10106");
//			argv.push(localStorage.getItem('userId'));
//			argv.push(id);
//
//			var data = global.getPrm(argv);
//			//ajax校验用户名和密码
//			$.ajax({
//				"type" : "post",
//				"async" : true,
//				"cache": false,
//				"dataType" : "json", 
//				"global":false,
//				"data" : data,
//				//"contentType" : "application/json",
//				"url" : global.getUrl(), //PHP数据库校验用户名和密码是否正常
//				"success" : function(info) {
//					//alert("info['IsSuccess'] : "+info['IsSuccess']);
//					if(info['IsSuccess'] === true){
//						justep.Util.hint("发送getRegistrationID数据成功");
//					}
//					else if(info['IsSuccess'] === false) //返回400，代表数据库查询不到记录，用户名或密码
//					{
//						justep.Util.hint("发送getRegistrationID失败");
//					}        
//				},
//				"error": function(){
//					justep.Util.hint("网络连接异常！");
//				}
//                                
//			});
		});
	};
	

        Model.prototype.contentActive = function(event){
        	
//        	if(localStorage.getItem("userId") != null){
//        		window.location.href = "./index_main.w";
//        	}
	};

        return Model;
});