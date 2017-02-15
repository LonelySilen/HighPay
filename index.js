define(function(require){
	var $ = require("jquery");
	var justep = require("$UI/system/lib/justep");
	var ShellImpl = require('$UI/system/lib/portal/shellImpl');
//	var global = require("./res/js/global");
//	var SqliteUtil = require("./res/js/sqliteUtil");
//	var DemoDB = require("./res/js/sqlite");
	
	var Model = function(){
		this.callParent();
		var shellImpl = new ShellImpl(this, {
			"contentsXid" : "pages",
			"pageMappings" : {
				"login":{
					url : '$UI/weixin/login.w'
				},
				"main":{
					url : '$UI/weixin/index_main.w'
				},
				"register":{
					url : '$UI/weixin/register/register.w'
				},
				"pay":{
					url : '$UI/weixin/pay/order.w'
				},
				"info":{
					url : '$UI/weixin/setting/info.w'
				},
				"notify":{
					url : '$UI/weixin/setting/notify.w'
				},
				"plate":{
					url : '$UI/weixin/setting/plate.w'
				},
				"record":{
					url : '$UI/weixin/setting/record.w'
				},
				"about":{
					url : '$UI/weixin/setting/about.w'
				},
				"setting":{
					url : '$UI/weixin/setting/setting.w'
				}
			}
		});
	
	};
	


//	Model.prototype.modelLoad = function(event){
//		
//		if(localStorage.getItem('isLoad') === null || localStorage.getItem('isLoad') === false){
//			
//			var demoDB = null;
//			// 设备准备好后，才能通过插件打开数据库
//			document.addEventListener("deviceready", function() {
//				// 这里在DemoDB.js中实现了一个单例对象，为了能在多个功能页中共用一个数据源，避免死锁
//				demoDB = DemoDB.getInstance();
//				// DemoDB.js中实现了自动判断并初始化数据库
//				demoDB.initData(function() {
//				});
//			});
//			
//			var gps_data = this.comp("gpsData");
//			
//			var is_load = false;
//		    var argv = new Array("10401");
//		    var time = global.getTime(0);
//		    argv.push(time);
//            var data = global.getPrm(argv);
//            			
//            //ajax校验用户名和密码
//            $.ajax({
//            	"type" : "post",
//                "async" : false,
//                "cache": false,
//                "dataType" : "json", 
//                "global":false,
//                "data" : data,
//                //"contentType" : "application/json",
//                "url" : global.getUrl(), //PHP数据库校验用户名和密码是否正常
//                "success" : function(info) {
//                    //alert(JSON.stringify(info));
//                	if(info['IsSuccess'] === true){
//                		is_load = true;
//                		gps_data.loadData(info['Obj']);
//                    	justep.Util.hint("拉取GPS成功");
//                    	
//                	}
//                	else if(info['IsSuccess'] === false) //返回400，代表数据库查询不到记录，用户名或密码
//                	{
//                		justep.Util.hint("拉取GPS失败");//alert(JSON.stringify(info));
//                	}        
//                },
//                "error": function(){
//                	justep.Util.hint("网络连接异常！");
//                }
//                                
//            });
//            if(true === is_load){
//            	localStorage.setItem('isLoad', true);
//            	gps_data.refreshData();
//            	//this.dataCustomRefresh(event);
//            }else {
//            	localStorage.setItem('isLoad', false);
//            }        
//		}  
//		
//		if(localStorage.getItem("userId") !== null){
//        	justep.Shell.showPage("main");
//        }
//        else{
//        	justep.Shell.showPage("login");
//        }
//	};
	
/************************************************************/
	Model.prototype.modelLoad = function(event){
		justep.Shell.setIsSinglePage(true);
		if(localStorage.getItem("userId") !== null){
        	justep.Shell.showPage("main");
        }
        else{
        	justep.Shell.showPage("login");
        }
	};

/***********************************************************/

	return Model;
});