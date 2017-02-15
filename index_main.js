define(function(require){
	var $ = require("jquery");
	var justep = require("$UI/system/lib/justep");
	var allData = require("./res/js/loadData");
	require("$UI/system/lib/cordova/cordova");
	require("cordova!cordova-plugin-device");
	require("cordova!phonegap-plugin-barcodescanner");
	require("cordova!cordova-plugin-geolocation");
	require("cordova!com.justep.cordova.plugin.alipay");
	require("cordova!cordova-plugin-network-information");
	require("cordova!cn.jpush.phonegap.JPushPlugin");
	require("cordova!at.modalog.cordova.plugin.cache");
	require("cordova!cordova-plugin-inappbrowser");//内置浏览器
	//快速通过部分
	require("cordova!de.appplant.cordova.plugin.background-mode");
	require("cordova!cordova-plugin-powermanagement");
//	require("cordova!com.greensea.pgs");
	
	require("cordova!cordova-plugin-insomnia");
	require("cordova!cordova-plugin-android-movetasktoback");
	var Timer = require("$UI/system/components/justep/timer/timer");
    var jpushInstance = require("./res/js/jpush");
    var Message = require("$UI/system/components/justep/common/common");
    var global = require("./res/js/global");
    var SqliteUtil = require("./res/js/sqliteUtil");
    var DemoDB = require("./res/js/sqlite");

	var Model = function(){
		this.callParent();this.STORE_ID = "com.justep.demo.advice.barcodedata";
		this.watchID = null;
	};

	Model.prototype.getNotifyCount = function(event){
		var notification = this.comp("notification");
		var count = notification.getCount();
		if(count>0)
			return "有"+notification.getCount()+"个消息";
		else
			return "";
	};
	
var timer_longlink=null;
	Model.prototype.modelLoad = function(event){
		var me = this;
		document.addEventListener("deviceready", onDeviceReady, false);
		// 加载完成
		function onDeviceReady() {
			
			me.comp("posBtn").set({disabled: false});
			me.comp("scanBtn").set({disabled: false});
//			me.comp("quickPassBtn").set({disabled: false});
			

			//快速通过部分
			//me.checkPlate();
			var demoDB = DemoDB.getInstance();
			demoDB.initData(function() {
				me.gpsDataSave();
				me.sectionDataLoad();
				
			});
		timer_longlink = setInterval(longlink,180000);
		function longlink(){
			me.keep_live();
		}
			
			//二维码部分
			if(localStorage.getItem(me.STORE_ID) !== "")
				me.comp("fileData").loadData(JSON.parse(localStorage.getItem(me.STORE_ID)));
		}
		
		this.comp("notification").refreshData();
	};
	
	Model.prototype.modelUnLoad = function(event) {clearInterval(timer_longlink);
		if (this.watchID) {
//			clearInterval(timer);
//			timer = null;
//			id_send = '';
			this.stopQPass(event);
		}
		if (this.watchID) {
			navigator.geolocation.clearWatch(this.watchID);//this.watchID.free();//navigator.geolocation.clearWatch(this.watchID);
		}
		
	};

	Model.prototype.modelActive = function(event){
		var userId = localStorage.getItem('userId');
		if(userId === null){
			//alert('You have exit!');
			//justep.Shell.showPage("login");
		}
	};

	Model.prototype.notifyDataLoad = function(event){
	
			var notification = this.comp("notification");
			
			var userId = localStorage.getItem('userId');
			
			// 标记当前刷新是异步执行的
			event.async = false;
			var demoDB = DemoDB.getInstance();
			demoDB.initData(function() {
				var db = demoDB.getDatabase();

				var append = event.options && event.options.append; // 是否数据追加模式
				var limit = event.limit; // 分页行数
				var offset = event.offset; // 分页偏移
			
				// 执行SQL查询
				SqliteUtil.executeSql(db, "SELECT * FROM notify_data where userId = ? LIMIT ? OFFSET ? ;", [ userId, limit, offset ], onSuccess, onError);
				function onSuccess(res) {
					// 转换返回数据结果
					var table = SqliteUtil.rowsToTable(res.rows);
					if (offset === 0) {
						// 如果偏移为零则表明加载第一页，需要在Table中提供总行数，用于分页计算
						SqliteUtil.executeSql(db, "SELECT COUNT(*) cnt FROM notify_data where userId=? ;", [userId], function(res) {
						
							SqliteUtil.setTableTotal(table, res.rows.item(0).cnt);
							doRefreshData();
						});
					} else {
						doRefreshData();
					}
					function doRefreshData() {//alert('table.rows.length='+table.rows.length);
						if(table.rows.length > 0){
					
							notification.loadData(table, append);
						}
						// 异步执行模式下，加载数据后必须执行doRefreshAfter
						notification.doRefreshAfter(true, event.options);
					}
				}
				function onError(msg) {
					notification.doRefreshAfter(false, event.options);
				}
			});
	};
	
	//显示地图
	Model.prototype.mapBtnClick = function(event) {

	    var me = this;
	    function onSuccess(position) {
	    	var cur_longitude = position.coords.longitude;
		    var cur_latitude = position.coords.latitude;
		    //wex5 3.4后不需要自己转码为物理坐标
		    /*if(global.getPhoneType() === "android" && global.getNetworkType() === '0'){
		    	var wgs = global.gpsTranslate(cur_longitude,cur_latitude);
		    	cur_longitude= wgs.lon;
		    	cur_latitude = wgs.lat;
		    }*/

	    	localStorage.setItem('longitude',cur_longitude);
	    	localStorage.setItem('latitude',cur_latitude);
	    	
	    	me.comp("contents1").to("map");
	    	var url =  require.toUrl("./geolocation/map.html");
	    	$(me.getElementByXid('mapContent')).html('<iframe id="mapFrame" src="'+url+'" width="100%" height="100%" style="border:0;"></iframe>');
	    }

		function onError() {
		    Message.message("获取当前位置信息失败");
		}
		navigator.geolocation.getCurrentPosition(onSuccess, onError);
	};
			
	Model.prototype.posBtnClick = function(event){

		function onSuccess(position) {
			
			var cur_longitude = position.coords.longitude;
		    var cur_latitude = position.coords.latitude;

		    //wex5 3.4后不需要自己转码为物理坐标
		    /*if(global.getPhoneType() === "android" && global.getNetworkType() === '0'){
		    	var wgs = global.gpsTranslate(cur_longitude,cur_latitude);
		    	cur_longitude= wgs.lon;
		    	cur_latitude = wgs.lat;
		    }*/

			$('#mapFrame')[0].contentWindow.movePos(cur_longitude, cur_latitude);
		}

		function onError() {
		    Message.message("获取当前位置信息失败");
		}
		navigator.geolocation.getCurrentPosition(onSuccess, onError);
	};
	
	//从地图返回
	Model.prototype.yBackBtnClick = function(event) {
		this.comp("contents1").to("main");
	};

	Model.prototype.exit = function(event){
		navigator.app.exitApp();
//		if(global.getPhoneType() === "android"){
//			this.comp("exitMsgDlg").show();
//		}else{
//			this.comp("exitMsgDlg").show({
//			type : 'OKCancel',
//			title : '提示信息',
//			message : '确定要退出当前账号？'
//		});
//		}
		
	};

	Model.prototype.popoverClick = function(event){
		this.comp("demoPopOver").show();
	};
		
	Model.prototype.a1Click = function(event){
		this.comp("demoPopOver").hide();
	};

	Model.prototype.relogin = function(event){
		
		//localStorage.removeItem('userId');
		localStorage.clear();
		location.reload();
		//navigator.app.exitApp();

	};
	
	Model.prototype.exitMsgDlgCancel = function(event){

	};

	
	Model.prototype.exitMsgDlgOK = function(event){
		navigator.app.exitApp();
	};

	Model.prototype.exitMsgDlgYes = function(event){
		navigator.app.exitApp();
	};
	
	Model.prototype.exitMsgDlgNo = function(event){
		this.modelUnLoad();

		//localStorage.removeItem('userId');
		localStorage.clear();
//		moveTaskToBack(true);
		if(timer_start!==null){
			clearInterval(timer_start);
		}
		location.reload();
		//justep.Shell.showPage("login");
		
		//navigator.app.exitApp();
	};

	Model.prototype.getRegistrationID = function(event){
		
		window.plugins.jPushPlugin.getRegistrationID(onCallback);
		
		var onCallback = function(data) {
			if(data>0){
				//开启
				Message.message('0:'+data);
			}else{
				//关闭
				Message.message('1:'+data);
			}
		};
		
		jpushInstance.getRegistrationID().done(function(id) {
			//justep.Util.hint(id);
			var argv = new Array("10106");
			argv.push(localStorage.getItem('userId'));
			argv.push(id);

			var data = global.getPrm(argv);
			//ajax校验用户名和密码
			$.ajax({
				
				"type" : "post",
				"async" : true,
				"cache": false,
				"dataType" : "json", 
				"global":false,
				"data" : data,
				//"contentType" : "application/json",
				"url" : global.getUrl(), 
				"success" : function(info) {
					//alert("info['IsSuccess'] : "+info['IsSuccess']);
					if(info['IsSuccess'] === true){
						justep.Util.hint("发送getRegistrationID数据成功");
					}
					else if(info['IsSuccess'] === false)
					{
						Message.message("aler", "发送getRegistrationID失败");
					}        
				},
				"error": function(){
					//Message.message("aler", "网络连接异常！");
				}
                                
			});
		});
	};
	
	Model.prototype.passCntActive = function(event){
		//更改Title
		var title = eval("document.all.tops");
		title.innerHTML="高速移动支付";
		

	};

	Model.prototype.scanCntActive = function(event){
		//更改Title
		var title = eval("document.all.tops"); 
		title.innerHTML="扫码通过";
		
	};

	Model.prototype.incCntActive = function(event){
		//更改Title
		var title = eval("document.all.tops"); 
		title.innerHTML="增值服务";
	};
	
	Model.prototype.mineCntActive = function(event){
		//更改Title
		var title = eval("document.all.tops"); 
		title.innerHTML="我的";
		this.comp("notification").refreshData();
	};

	Model.prototype.li_infoClick = function(event){
//		var url =  require.toUrl("./setting/setting.w");
//	    this.comp('winDlg_main').open({src:url});
//	    //window.location.href = url;
		justep.Shell.showPage("info");
	};

	Model.prototype.li_msgClick = function(event){
//		var url =  require.toUrl("./setting/notify.w");
//	    this.comp('winDlg_main').open({src:url});
		justep.Shell.showPage("notify");
	};
	
 	Model.prototype.li_plateClick = function(event){
//		var url =  require.toUrl("./setting/plate.w");
//	    this.comp('winDlg_main').open({src:url});
//	    //window.location.href = url;
		justep.Shell.showPage("plate");
	};

	Model.prototype.li_historyClick = function(event){
//		var url =  require.toUrl("./setting/record.w");
//	    this.comp('winDlg_main').open({src:url});
//	    //window.location.href = url;
		justep.Shell.showPage("record");
	};

	Model.prototype.li_aboutClick = function(event){
//		this.comp("contents1").to("map");
//		var title = eval("document.all.tops2"); 
//		title.innerHTML="关于";
//		var url =  require.toUrl("./intro2.html");
//	    $(this.getElementByXid('mapContent')).html('<iframe id="mapFrame" src="'+url+'" width="100%" height="100%" style="border:0;"></iframe>');

	    //this.comp('winDlg_main').open({src:url});
		//justep.Shell.showPage("pay");
		justep.Shell.showPage("about");
	};

	Model.prototype.col2Click = function(event){
		mayflower.moveTaskToBack();
	};


	Model.prototype.col3Click = function(event){
//		Message.message("aler", "创建了一条Message！");
		showMessage("aler", "创建了一条自定义Message！");
		justep.Util.hint("创建了一条justep hint");
	};


	Model.prototype.li_settingClick = function(event){
		//justep.Shell.showPage("setting");
		var url =  require.toUrl("./setting/setting.w");
	    this.comp('winDlg_main').open({src:url});
	};


	Model.prototype.btn_scanClick = function(event){

	};

	//清除本地缓存
	Model.prototype.clearCache = function(event){//Message.message("aler", "清除缓存");
		var self = this;
		window.cache.clear(
			function() {
				//alert('清除缓存成功');
				self.comp("messageDlg").show({
					type : 'OK',
					title : '提示信息',
					message : '清除缓存成功！'
				});
			}, function() {
				//alert('清除缓存失败');
				self.comp("messageDlg").show({
					type : 'OK',
					title : '提示信息',
					message : '清除缓存失败！'
				});
			}
		);
	};

/*
	 * 写首页图片数据缓存的代码 1、数据模型创建时事件
	 * 2、判断有没有localStorage，如果有显示localStorage中的内容，否则显示静态内容。
	 * 3、从服务端获取最新数据和图片，获取之后，更新界面并写入localStorage
	 */
//	Model.prototype.modelModelConstruct = function(event) {
//		/*
//		 * 1、数据模型创建时事件 2、加载静态图片或从缓存中加载图片
//		 */
//		var carousel = this.comp("carousel1");
//
//		var fImgUrl = localStorage.getItem("index_BannerImg_src");
//		if (fImgUrl === undefined) {
//			$(carousel.domNode).find("img").eq(0).attr({
//				"src" : "./res/advert/carouselBox61.jpg",
//				"ad_path" : "http://www.sina.com"
//			});
//		} else {
//			var fUrl = localStorage.getItem("index_BannerImg_url");
//			$(carousel.domNode).find("img").eq(0).attr({
//				"src" : fImgUrl,
//				"ad_path" : fUrl
//			});
//		}
//	};

	Model.prototype.imgDataCustomRefresh = function(event) {
		/*
		 * 1、加载轮换图片数据
		 * 2、根据data数据动态添加carouse组件中的content页面 
		 * 3、如果img已经创建了，只修改属性
		 * 4、第一张图片信息存入localStorage
		 */
		var url = require.toUrl("./res/json/imgData.json");
		allData.loadDataFromFile(url, event.source, true);
		var me = this;
		var carousel = this.comp("carousel1");
		event.source.each(function(obj) {
			var fImgUrl = require.toUrl(obj.row.val("fImgUrl"));
			var fUrl = require.toUrl(obj.row.val("fUrl"));
			if (me.comp('contentsImg').getLength() > obj.index) {
				$(carousel.domNode).find("img").eq(obj.index).attr({
					"src" : fImgUrl,
					"ad_path" : fUrl
				});
				if (obj.index === 0) {
					localStorage.setItem("index_BannerImg_src", fImgUrl);
					localStorage.setItem("index_BannerImg_url", fUrl);
				}
			} else {
				carousel.add('<img src="' + fImgUrl + '" class="tb-img1" bind-click="openPageClick" ad_path="' + fUrl + '"/>');
			}
		});
	};

	Model.prototype.openPageClick = function(event){
		var ad_path = event.currentTarget.getAttribute('ad_path');
		if (ad_path){
			//window.open( ad_path, '_blank', 'location=yes');
			window.open( ad_path, '_system', 'location=yes');
			//window.open('http://'+ad_path, '_system' );
		}
	};
	
	 function showMessage(containerID, message, visible) {
 		if(visible === true){
 			$("#" + containerID).addClass("aler-message");
 			$("#" + containerID).html(message.toString());
 			$("#" + containerID).slideDown('fast', "linear", function() {});
 		}else if(visible === false){
 			$("#" + containerID + ":visible").fadeOut();
 		}else {
 		
 			$("#" + containerID).addClass("aler-message");
 			$("#" + containerID).html(message.toString());
 			$("#" + containerID).slideDown('fast', "linear", function() {
 				setTimeout(function() {
 					$("#" + containerID + ":visible").fadeOut();
 				}, 3000);
 			});
 		}
		
	}
	
	Model.prototype.isDebug = function(event) {
		return true;
	};
/****************************************************************************************************************************
 ****************************************************************************************************************************
 **************************************************快速通过部分***************************************************************
 ****************************************************************************************************************************
 ****************************************************************************************************************************/
	Model.prototype.keep_live = function(){
		//var url = 'http://192.168.1.106:4000/Handler1.ashx';
		
		var argv = new Array("999999");//编号
		argv.push(localStorage.getItem('userId'));
        
		var query = global.getPrm(argv);
       	
       	$.ajax({
       		timeout : 180000,
       		"type" : "post",
       		"async" : true,//false,
       		"cache": false,
       		"dataType" : "json", 
       		"global":false,
       		"data" : query,
       		//"contentType" : "application/json",
       		"url" : global.getUrl(),
       		"success" : function(info) {alert(JSON.stringify(info));
       			justep.Util.hint("长连接成功");
       		},
       		"error": function(XMLHttpRequest){

//alert(XMLHttpRequest.status);
//alert(XMLHttpRequest.readyState);
                                		//0:请求未初始化;1：请求已经建立,但是还没有发送;
                                		//1:请求已经建立,但是还没有发送(还没有调用 send());
                                		//2:请求已发送,正在处理中(通常现在可以从响应中获取内容头);
                                		//3:请求在处理中(通常响应中已有部分数据可用了,但是服务器还没有完成响应的生成);
                                		//4:响应已完成(您可以获取并使用服务器的响应了)
       			Message.message("aler", "长连接发生异常！");
       		}
       	});
	};
 	//发送驶入附近
	Model.prototype.nearSection = function(sectionId, secName) {

		var argv = new Array("10902");//编号
		var userId = localStorage.getItem('userId');
     
       	if(sectionId!== null && sectionId!== '' && sectionId!== undefined){
       		argv.push(userId);
       		argv.push(-1);
       		argv.push(sectionId);
		    
       		var data = global.getPrm(argv);
                			

       		//ajax校验
       		$.ajax({
       			timeout : 5000,
       			"type" : "post",
       			"async" : true,//false,
       			"cache": false,
       			"dataType" : "json", 
       			"global":false,
       			"data" : data,
       			//"contentType" : "application/json",
       			"url" : global.getUrl(), //数据库校验用户名和密码是否正常
       			"success" : function(info) {//alert(JSON.stringify(data));alert(JSON.stringify(info));
       				if(info['IsSuccess'] === true){          //php返回200，代表后端程序成功返回查询结果
//                                               
       					justep.Util.hint("发送路端点位"+sectionId+': '+secName+"附近成功");

       				}
       				else if(info['IsSuccess'] === false) //返回400，代表数据库查询不到记录，用户名或密码
       				{	
       					Message.message("aler", "发送路端点位"+sectionId+': '+secName+"附近失败");//alert(JSON.stringify(info));
       					num_section = '';
       				}        
       			},
       			"error": function(){
       				Message.message("aler", "网络连接异常！");
       				num_section = '';
       			}
                                
       		});
            
		}else{
			//alert('尚未绑定车牌,请在"我"->"车牌管理"中绑定车牌！');
			this.comp("messageDlg").show({
				type : 'OK',
				title : '提示信息',
				message : '路端点位为空'
			});
		}
	};
	
 	Model.prototype.sectionDataRefresh = function(event){//alert('gpsDataLoad');
		
		var load_had = 0;//是否联网获取数据成功
		var section_data = this.comp("sectionData");
		var demoDB = null;
		
		// 这里在DemoDB.js中实现了一个单例对象，为了能在多个功能页中共用一个数据源，避免死锁
		demoDB = DemoDB.getInstance();
		// DemoDB.js中实现了自动判断并初始化数据库
		demoDB.initData(function() {

			// 标记当前刷新是异步执行的
			event.async = true;//false;

			var db = demoDB.getDatabase();

			//var append = false;//event.options && event.options.append; // 是否数据追加模式
			//var limit = event.limit; // 分页行数
			var offset = 0;//event.offset; // 分页偏移
			//alert('SqliteUtil');
			// 执行SQL查询
			SqliteUtil.executeSql(db, "SELECT * FROM section_data ;", [  ], onSuccess, onError);
			function onSuccess(res) {
				// 转换返回数据结果
				var table = SqliteUtil.rowsToTable(res.rows);
				if (offset === 0) {
					// 如果偏移为零则表明加载第一页，需要在Table中提供总行数，用于分页计算
					SqliteUtil.executeSql(db, "SELECT COUNT(*) cnt FROM section_data ;", [], function(res) {
						SqliteUtil.setTableTotal(table, res.rows.item(0).cnt);
						doRefreshData();
					});
				} else {
					doRefreshData();
				}
				function doRefreshData() {//alert('table.rows.length='+table.rows.length);
					if(table.rows.length > 1){
						load_had = 1;
						section_data.loadData(table);
						//alert(JSON.stringify(gps_data.toJson()));
					}else{
						//联网初始化数据
						var argv = new Array("10901");
						var time = global.getTime(0);
						argv.push(time);
						var data = global.getPrm(argv);
            			
						//ajax校验用户名和密码
						$.ajax({
							//timeout : 3000,
							"type" : "post",
							"async" : true,
							"cache": false,
							"dataType" : "json", 
							"global":false,
							"data" : data,
							//"contentType" : "application/json",
							"url" : global.getUrl(),
							"success" : function(info) {
								//alert(JSON.stringify(info));
								//alert("info['IsSuccess'] : "+info['IsSuccess']);
								if(info['IsSuccess'] === true){
									section_data.loadData(info['Obj']);
									load_had = 2;
									section_data.saveData();
								}
								else if(info['IsSuccess'] === false) //返回400，代表数据库查询不到记录，用户名或密码
								{
									Message.message("aler", "拉取路端点位失败");//alert(JSON.stringify(info));
								}        
							},
							"error": function(){
								//Message.message("aler", "网络连接异常！");
							}
                            
						});
						
					}
					// 异步执行模式下，加载数据后必须执行doRefreshAfter
					section_data.doRefreshAfter(true, event.options);
					
				}
			}
			function onError(msg) {
				section_data.doRefreshAfter(false, event.options);
			}
            
		});

		return load_had;
		
	};
	
	Model.prototype.sectionDataLoad = function(event){//alert('gpsDataSave');

//		if(localStorage.getItem('gps_get')!==undefined && localStorage.getItem('gps_get')!==null ){
//			this.comp("gpsData").refreshData();
//			return ;
//		}

		var time = null;
		if(localStorage.getItem('section_get')===undefined || localStorage.getItem('section_get')===null ){
			time = global.getTime(0);
		}else{
			time = localStorage.getItem('section_get');
		}
		var section_data = this.comp("sectionData");

		var argv = new Array("10901");
		
		argv.push(time);
		var data = global.getPrm(argv);
        
		//ajax校验用户名和密码
		$.ajax({

			"type" : "post",
			"async" : true,//false,
			"cache": false,
			"dataType" : "json", 
			"global":false,
			"data" : data,
			//"contentType" : "application/json",
			"url" : global.getUrl(), //PHP数据库校验用户名和密码是否正常
			"success" : function(info) {
				//alert(JSON.stringify(info));
				if(info['IsSuccess'] === true){
					section_data.loadData(info['Obj']);
					
					section_data.each(function(param){
						var db = window.sqlitePlugin.openDatabase({
							name : "SQLite"
						});
						db.transaction(function(tx) {
							var id = param.row.val('id');
							var latitude = param.row.val('Latitude');
							var Longitude = param.row.val('Longitude');
							var Name = param.row.val('Name');
							var Radius = param.row.val('Radius');//param.row.val('UpdateTime');

							tx.executeSql("select id from section_data where id=? ;", [id], function(tx, res) {
								if(res.rows.length===0){ //已有数据不插入
									tx.executeSql("INSERT INTO section_data (id, Latitude, Longitude, Name, Radius) VALUES (?,?,?,?,?)", 
													[ id,latitude,Longitude,Name,Radius ], function(tx, res) {}, function(e) {
														//alert("ERROR: " + e.message);
														return false;
													});
								}else{
									tx.executeSql("update section_data set latitude=?, Longitude=?, Name=?, Radius=? where id= ?", 
													[ latitude, Longitude, Name, Radius, id ], function(tx, res) {}, function(e) {
														//alert("UPDATE ERROR: " + e.message);
														return false;
													});
								}
							});
                                        	
						});
					});
					localStorage.setItem('section_get',global.getTime(1));//已经加载数据
					
					
				}
				else if(info['IsSuccess'] === false) //返回400，代表数据库查询不到记录，用户名或密码
				{
					Message.message("aler", "拉取路段点位失败");//alert(JSON.stringify(info));
				}
				section_data.refreshData();
				
			},
			"error": function(){
				//Message.message("aler", "网络连接异常！");
				section_data.refreshData();
			}
                                
		});
	};
	
	var id_send = '';//收费站ID
	var bind_checked = false;//是否想要绑定
	
	Model.prototype.toggle_listenChange = function(event){
		var state = this.comp("toggle_listen").value.toString();
		if(state === '0'){//alert('timer1:'+timer+' state:'+state);
			if (this.watchID) {
				this.stopQPass(event);
//				this.comp("toggle_listen").set({'checked' : null});
//				this.comp("toggle_listen").set({'checkedValue' : 0});
			}
		}else{//alert('timer2:'+timer+' state:'+state);
			if (this.watchID===null) {
				this.quickPass(event);
//				this.comp("toggle_listen").set({'checked' : true});
//				this.comp("toggle_listen").set({'checkedValue' : 1});
			}
		}
	};

	var timer_start = null;//启动App车牌未绑定，用于检查的定时器

	Model.prototype.bindPlateCancel = function(event){
		bind_checked = false;
		var me = this;
		
		this.comp("messageDlg").show({
			type : 'OK',
			title : '提示信息',
			message : '如果需要绑定车牌，请在"我"->"车牌管理"中绑定车牌数据！'
		});
		//alert('如果需要绑定车牌，请在"我"->"车牌管理"中绑定车牌数据！');
		
		function checkBind(event){
			if (me.watchID === null && localStorage.getItem('plateId') !== undefined && localStorage.getItem('plateId') !== null ) {
				//Message.message("aler", "clear timer！");
				clearInterval(timer_start);
				me.quickPass(event);
			}
		}

		timer_start = setInterval(checkBind, 3000);
		
		this.comp("contentData").setValue("title",'您尚未绑定车牌');
		this.comp("contentData").setValue("x", '未知');
//		this.comp("contentData").setValue("y", '未知');
//		this.comp("contentData").setValue("x_", '未知');
//		this.comp("contentData").setValue("y_", '未知');
		this.comp("contentData").setValue("s", '未知');
		this.comp("contentData").setValue("d", '未知');
	};

	Model.prototype.bindPlateOK = function(event){
		bind_checked = true;
		var me = this;
		
		function checkBind(event){
			if (me.watchID === null && localStorage.getItem('plateId') !== undefined && localStorage.getItem('plateId') !== null ) {
				Message.message("aler", "clear timer！");
				clearInterval(timer_start);
				me.quickPass(event);
			}else{
				Message.message("aler", "您没有绑定车牌！");
			}
		}

		timer_start = setInterval(checkBind, 3000);
		
		justep.Shell.showPage("plate");
	};
	
	Model.prototype.upload = function(event){

			var argv2 = new Array("99001");//编号
			argv2.push(device.model);

			argv2.push(this.comp("contentData").getValue("y_", 0));
			argv2.push(this.comp("contentData").getValue("x_", 0));
			argv2.push(this.comp("contentData").getValue("y", 0));
			argv2.push(this.comp("contentData").getValue("x", 0));
			argv2.push(this.comp("contentData").getValue("h", 0));
			argv2.push(this.comp("tempData").getValue("enterTollGateName", 0));
			
			var query2 = global.getPrm(argv2);//alert(JSON.stringify(query2));
			$.ajax({
				type: "post",
				url: require.toUrl(global.getUrl()),
				"data" : query2,
				dataType: 'json',
				async: false,//使用同步方式，目前data组件有同步依赖
				cache: false,
				"global":false,
				success: function(info){//alert(JSON.stringify(info));

					if(info['IsSuccess'] === true){
						justep.Util.hint("上传经纬数据成功！");
					}else{
						Message.message("aler", "上传经纬数据失败！");
					}
				},
				error: function(){
					//Message.message("aler", "上传经纬数据出错！");
				}
			});


	};
	//是否联网修改驶入高速状态
	Model.prototype.tempDataCheck = function(EnterTollGateName, LicenceNo, EnterType){
		var self = this;
		var userId = localStorage.getItem('userId');
		
		var argv = new Array("10709");
		argv.push(userId);
		var data = global.getPrm(argv);
            			
		//ajax校验
		$.ajax({
			timeout : 5000,
			"type" : "post",
			"async" : true,
			"cache": false,
			"dataType" : "json", 
			"global":false,
			"data" : data,
			//"contentType" : "application/json",
			"url" : global.getUrl(),
			"success" : function(info) {
				//alert(JSON.stringify(info['Obj']));
				if(info['IsSuccess'] === true){
					
					var db = window.sqlitePlugin.openDatabase({
						name : "SQLite"
					});
					db.transaction(function(tx) {
						var userId = localStorage.getItem('userId');
						var userName = localStorage.getItem('userName');
						var enterTollGateId;
						var enterTollGateName;//!==null ? EnterTollGateName:"未知";
						var licenceNo;
						var enterDateTime;
						var enterType;	
						if(info['Obj'][0] === null || info['Obj'][0] === undefined){
							enterTollGateId = "";
							enterTollGateName = EnterTollGateName;//!==null ? EnterTollGateName:"未知";
							licenceNo = LicenceNo;
							enterDateTime = global.getTime();
							enterType = EnterType;			
						}else{
							enterTollGateId = info['Obj'][0]['EnterTollGateId'];
							enterTollGateName = info['Obj'][0]['EnterTollGateName'];//!==null ? EnterTollGateName:"未知";
							licenceNo = info['Obj'][0]['EnterLicenseNo'];
							enterDateTime = info['Obj'][0]['EnterDateTime'];//alert(info['Obj'][0]['EnterType']);
							enterType = (info['Obj'][0]['EnterType'].toString()=== '1')?'扫码通过':'快速通过';	
						}		
						//alert( userId +userName + enterTollGateId + enterTollGateName + licenceNo + enterDateTime + enterType );
						tx.executeSql("select userId from temp_data where userId=? ;", [userId], function(tx, res) {
							if(res.rows.length!==0){ //已有数据
								tx.executeSql("update temp_data set userName=?, enterTollGateId=?, enterTollGateName=?, licenceNo=?, enterDateTime=?, enterType=? where userId= ?", 
										[ userName, enterTollGateId, enterTollGateName, licenceNo, enterDateTime, enterType, userId ], function(tx, res) {}, function(e) {
											//alert("UPDATE ERROR: " + e.message);
											return false;
										});
							}else{
								tx.executeSql("INSERT INTO temp_data ( userId, userName, enterTollGateId, enterTollGateName, licenceNo, enterDateTime, enterType ) VALUES (?,?,?,?,?,?,?)", 
										[ userId, userName, enterTollGateId, enterTollGateName, licenceNo, enterDateTime, enterType ], function(tx, res) {}, function(e) {
											//alert("INSERT ERROR: " + e.message);
											return false;
										});
							}
						});
                                        	
					});
					self.comp("tempData").refreshData();
				}
				else if(info['IsSuccess'] === false) //返回400，代表数据库查询不到记录，用户名或密码
				{
					Message.message("aler", "查询通行记录失败");//alert(JSON.stringify(info));
				}        
			},
			"error": function(){
				//Message.message("aler", "网络连接异常！");
			}
                            
		});
	};
	Model.prototype.tempDataSave = function(EnterTollGateName, LicenceNo, EnterType){

		var db = window.sqlitePlugin.openDatabase({
					name : "SQLite"
				});
		db.transaction(function(tx) {
			var userId = localStorage.getItem('userId');
			var userName = localStorage.getItem('userName');
			var enterTollGateId = "";
			var enterTollGateName = EnterTollGateName;//!==null ? EnterTollGateName:"未知";
			var licenceNo = LicenceNo;
			var enterDateTime = global.getTime();
			var enterType = EnterType;			
			//alert( userId +userName + enterTollGateId + enterTollGateName + licenceNo + enterDateTime + enterType );
			tx.executeSql("select userId from temp_data where userId=? ;", [userId], function(tx, res) {
				if(res.rows.length!==0){ //已有数据
					tx.executeSql("update temp_data set userName=?, enterTollGateId=?, enterTollGateName=?, licenceNo=?, enterDateTime=?, enterType=? where userId= ?", 
							[ userName, enterTollGateId, enterTollGateName, licenceNo, enterDateTime, enterType, userId ], function(tx, res) {}, function(e) {
								//alert("UPDATE ERROR: " + e.message);
								return false;
							});
				}else{
					tx.executeSql("INSERT INTO temp_data ( userId, userName, enterTollGateId, enterTollGateName, licenceNo, enterDateTime, enterType ) VALUES (?,?,?,?,?,?,?)", 
							[ userId, userName, enterTollGateId, enterTollGateName, licenceNo, enterDateTime, enterType ], function(tx, res) {}, function(e) {
								//alert("INSERT ERROR: " + e.message);
								return false;
							});
				}
			});
                                        	
		});
		this.comp("tempData").refreshData();			
	};
 
 	Model.prototype.tempDataLoad = function(event){
	
 		var tempData = this.comp("tempData");
		// 标记当前刷新是异步执行的
 		event.async = true;//false;
		var demoDB = DemoDB.getInstance();
		var userId = localStorage.getItem('userId');
		
		demoDB.initData(function() {
			var db = demoDB.getDatabase();

			//var append = event.options && event.options.append; // 是否数据追加模式
			var limit = event.limit; // 分页行数
			var offset = event.offset; // 分页偏移
			
			// 执行SQL查询
			SqliteUtil.executeSql(db, "SELECT * FROM temp_data where userId= ? LIMIT ? OFFSET ? ;", [ userId, limit, offset ], onSuccess, onError);
			function onSuccess(res) {
				// 转换返回数据结果
				var table = SqliteUtil.rowsToTable(res.rows);
				if (offset === 0) {
					// 如果偏移为零则表明加载第一页，需要在Table中提供总行数，用于分页计算
					SqliteUtil.executeSql(db, "SELECT COUNT(*) cnt FROM temp_data where userId = ? ;", [userId], function(res) {
						SqliteUtil.setTableTotal(table, res.rows.item(0).cnt);
						doRefreshData();
					});
				} else {
					doRefreshData();
				}
				function doRefreshData() {//alert('table.rows.length='+table.rows.length);
					if(table.rows.length > 0){
					
						tempData.loadData(table);
					}
					// 异步执行模式下，加载数据后必须执行doRefreshAfter
					tempData.doRefreshAfter(true, event.options);
				}
			}
			function onError(msg) {
				tempData.doRefreshAfter(false, event.options);
			}
		});
		
	};
 
	Model.prototype.checkPlate = function(event){
	
		var me = this;
		if(localStorage.getItem('plateId') === null || localStorage.getItem('plateId')=== undefined){
			var argv2 = new Array("10205");//编号
			argv2.push(localStorage.getItem('userId'));
			var query2 = global.getPrm(argv2);
			$.ajax({
				type: "post",
				url: require.toUrl(global.getUrl()),
				"data" : query2,
				dataType: 'json',
				async: false,//使用同步方式，目前data组件有同步依赖
				cache: false,
				"global":false,
				success: function(info){//alert(JSON.stringify(info));

					if(info['Obj'][0] === null || info['Obj'][0] === "" || info['Obj'][0] === undefined){
						//alert('请在"我"->"车牌管理"中绑定车牌数据！');
						me.comp("messageDlg").show({
							type : 'OK',
							title : '提示信息',
							message : '请在"我"->"车牌管理"中绑定车牌数据！'
						});
					}else{
						localStorage.setItem('plateId',info['Obj'][0]['id']);
						localStorage.setItem('licenceNo',info['Obj'][0]['licenceNo']);
						
					}
				},
				error: function(){
					Message.message("aler", "加载数据失败！");
				}
			});
		}

	};
	
	Model.prototype.gpsDataLoad = function(event){//alert('gpsDataLoad');
		
		
		var load_had = 0;//是否联网获取数据成功
		var gps_data = this.comp("gpsData");
		var demoDB = null;
		var me = this;
		
		// 这里在DemoDB.js中实现了一个单例对象，为了能在多个功能页中共用一个数据源，避免死锁
		demoDB = DemoDB.getInstance();
		// DemoDB.js中实现了自动判断并初始化数据库
		demoDB.initData(function() {

			// 标记当前刷新是异步执行的
			event.async = true;//false;

			var db = demoDB.getDatabase();

			//var append = false;//event.options && event.options.append; // 是否数据追加模式
			//var limit = event.limit; // 分页行数
			var offset = 0;//event.offset; // 分页偏移
			//alert('SqliteUtil');
			// 执行SQL查询
			SqliteUtil.executeSql(db, "SELECT * FROM gps_data ;", [  ], onSuccess, onError);
			function onSuccess(res) {
				// 转换返回数据结果
				var table = SqliteUtil.rowsToTable(res.rows);
				if (offset === 0) {
					// 如果偏移为零则表明加载第一页，需要在Table中提供总行数，用于分页计算
					SqliteUtil.executeSql(db, "SELECT COUNT(*) cnt FROM gps_data ;", [], function(res) {
						SqliteUtil.setTableTotal(table, res.rows.item(0).cnt);
						doRefreshData();
					});
				} else {
					doRefreshData();
				}
				function doRefreshData() {//alert('table.rows.length='+table.rows.length);
					if(table.rows.length > 1){
						load_had = 1;
						gps_data.loadData(table);
						//alert(JSON.stringify(gps_data.toJson()));
					}else{
						//联网初始化数据
						var argv = new Array("10401");
						var time = global.getTime(0);
						argv.push(time);
						var data = global.getPrm(argv);
            			
						//ajax校验用户名和密码
						$.ajax({
							timeout : 10000,
							"type" : "post",
							"async" : false,
							"cache": false,
							"dataType" : "json", 
							"global":false,
							"data" : data,
							//"contentType" : "application/json",
							"url" : global.getUrl(),
							"success" : function(info) {
								//alert(JSON.stringify(info));
								//alert("info['IsSuccess'] : "+info['IsSuccess']);
								if(info['IsSuccess'] === true){
									gps_data.loadData(info['Obj']);
									load_had = 2;
									gps_data.saveData();
								}
								else if(info['IsSuccess'] === false) //返回400，代表数据库查询不到记录，用户名或密码
								{
									Message.message("aler", "拉取GPS失败");//alert(JSON.stringify(info));
								}        
							},
							"error": function(){
								//Message.message("aler", "网络连接异常！");
							}
                            
						});
						
					}
					// 异步执行模式下，加载数据后必须执行doRefreshAfter
					gps_data.doRefreshAfter(true, event.options);
					me.quickPass(event);
				}
			}
			function onError(msg) {
				gps_data.doRefreshAfter(false, event.options);
				me.quickPass(event);
			}
            
		});

		return load_had;
		
	};
	
	Model.prototype.gpsDataSave = function(event){//alert('gpsDataSave');

//		if(localStorage.getItem('gps_get')!==undefined && localStorage.getItem('gps_get')!==null ){
//			this.comp("gpsData").refreshData();
//			return ;
//		}

//请求数据并显示popOver组件
var popOver_load=this.comp("popOver_load");
popOver_load.show();

		var time = null;
		if(localStorage.getItem('gps_get')===undefined || localStorage.getItem('gps_get')===null ){
			time = global.getTime(0);
		}else{
			time = localStorage.getItem('gps_get');
		}
		var gps_data = this.comp("gpsData");

		var argv = new Array("10401");
		
		argv.push(time);
		var data = global.getPrm(argv);
        
		//ajax校验用户名和密码
		$.ajax({
			timeout : 6000,
			"type" : "post",
			"async" : true,//false,
			"cache": false,
			"dataType" : "json", 
			"global":false,
			"data" : data,
			//"contentType" : "application/json",
			"url" : global.getUrl(), //PHP数据库校验用户名和密码是否正常
			"success" : function(info) {
				//alert(JSON.stringify(info));
				if(info['IsSuccess'] === true){
					gps_data.loadData(info['Obj']);
					
					gps_data.each(function(param){
						var db = window.sqlitePlugin.openDatabase({
							name : "SQLite"
						});
						db.transaction(function(tx) {
							var id = param.row.val('id');
							var latitude = param.row.val('latitude');
							var Longitude = param.row.val('Longitude');
							var Name = param.row.val('Name');
							var UpdateTime = global.getTime(1);//param.row.val('UpdateTime');

							tx.executeSql("select id from gps_data where id=? ;", [id], function(tx, res) {
								if(res.rows.length===0){ //已有数据不插入
									tx.executeSql("INSERT INTO gps_data (id, latitude, Longitude, Name, UpdateTime) VALUES (?,?,?,?,?)", 
													[ id,latitude,Longitude,Name,UpdateTime ], function(tx, res) {}, function(e) {
														//alert("ERROR: " + e.message);
														return false;
													});
								}else{
									tx.executeSql("update gps_data set latitude=?, Longitude=?, Name=?, UpdateTime=? where id= ?", 
													[ latitude, Longitude, Name, UpdateTime, id ], function(tx, res) {}, function(e) {
														//alert("UPDATE ERROR: " + e.message);
														return false;
													});
								}
							});
                                        	
						});
					});
					localStorage.setItem('gps_get',global.getTime(1));//已经加载数据
					
					
				}
				else if(info['IsSuccess'] === false) //返回400，代表数据库查询不到记录，用户名或密码
				{
					Message.message("aler", "拉取GPS失败");//alert(JSON.stringify(info));
				}
				gps_data.refreshData();
				
			},
			"error": function(){
				//Message.message("aler", "网络连接异常！");
				gps_data.refreshData();
			},
			complete:function(){
				//popOver_load.hide();//请求完成后隐藏popOver组件

				setTimeout(function(){
					popOver_load.hide();
				},5000);
			}
                                
		});
	};

	//发送驶入高速公路附近
	Model.prototype.nearTollgate = function(gateId) {

		var argv = new Array("10302");//编号
		var userId = localStorage.getItem('userId');
		var plateId = localStorage.getItem('plateId');//车牌ID
		var isInTollGate = 1;//0,未;1,可
     
       	if(plateId!== null && plateId!== '' && plateId!== undefined){
       		argv.push(userId);
       		argv.push(plateId);
       		argv.push(isInTollGate);
       		argv.push(gateId);
		    
       		var data = global.getPrm(argv);
                			

       		//ajax校验
       		$.ajax({
       			timeout : 5000,
       			"type" : "post",
       			"async" : true,//false,
       			"cache": false,
       			"dataType" : "json", 
       			"global":false,
       			"data" : data,
       			//"contentType" : "application/json",
       			"url" : global.getUrl(), //数据库校验用户名和密码是否正常
       			"success" : function(info) {//alert(JSON.stringify(data));alert(JSON.stringify(info));
       				if(info['IsSuccess'] === true){          //php返回200，代表后端程序成功返回查询结果
//                                               
       					justep.Util.hint("发送驶入高速公路"+gateId+"附近成功");

       				}
       				else if(info['IsSuccess'] === false) //返回400，代表数据库查询不到记录，用户名或密码
       				{	
       					id_send = '';
       					Message.message("aler", "发送驶入高速公路附近失败");//alert(JSON.stringify(info));
       				}        
       			},
       			"error": function(){
       				id_send = '';
       				//Message.message("aler", "网络连接异常！");
       			}
                                
       		});
            
		}else{
			//alert('尚未绑定车牌,请在"我"->"车牌管理"中绑定车牌！');
			this.comp("messageDlg").show({
				type : 'OK',
				title : '提示信息',
				message : '尚未绑定车牌,请在"我"->"车牌管理"中绑定车牌！'
			});
		}
	};
	
	Model.prototype.sendLocation = function(Longitude, Latitude, Heading, Speed){
       
		/************************************************************************************/
		    		    
		var argv = new Array("10501");//编号
		var userId = localStorage.getItem('userId');
		var licenseId = localStorage.getItem('plateId');//车牌ID
		var licenseNo = localStorage.getItem('licenceNo');//驾驶证号
		var longitude = Longitude;
		var latitude = Latitude;
		var heading = Heading;
		var speed = Speed;

		if(licenseId === null || licenseId === ""){
			//alert('尚未绑定车牌,请在"我"->"车牌管理"中绑定车牌！');
			this.comp("messageDlg").show({
				type : 'OK',
				title : '提示信息',
				message : '尚未绑定车牌,请在"我"->"车牌管理"中绑定车牌！'
			});
			return null;
		}else if(longitude === null || longitude === ""){
			justep.Util.hint("请开启定位功能");
			return null;
		}
		if(heading === null || heading === undefined  || heading === "" || isNaN(heading) ){
			heading = "-1";
		}
		if(speed === null || speed === undefined  || speed === "" || isNaN(speed) ){
			speed = "1";
		}
	    
		argv.push(userId);
		argv.push(licenseId);
		argv.push(licenseNo);
		argv.push(longitude);
		argv.push(latitude);
		argv.push(heading);
		argv.push(speed);
		    
		var data = global.getPrm(argv);
                			
		//ajax校验用户名和密码
		$.ajax({
			timeout : 5000,
			"type" : "post",
			"async" : true,//false,
			"cache": false,
			"dataType" : "json", 
			"global":false,
			"data" : data,
			//"contentType" : "application/json",
			"url" : global.getUrl(), //PHP数据库校验用户名和密码是否正常
			"success" : function(info) {
				if(info['IsSuccess'] === true){
//                                               
//              	justep.Util.hint("发送GPS成功");

				}
				else if(info['IsSuccess'] === false) //返回400，代表数据库查询不到记录，用户名或密码
				{
					Message.message("aler", "发送GPS失败");//alert(data+JSON.stringify(info));
				}        
			},
			"error": function(){
				//Message.message("aler", "网络连接异常！");
			}

		});

	};
	
	//获取设备位置信息
	var num_section = '';
	Model.prototype.getGeoBtnClick = function(event) {//alert('getGeoBtnClick');
		var me = this;
		var interval = 60;//定时器间隔
		
		me.comp("contentData").setValue("title",'车辆位置实时信息');
	    me.comp("contentData").setValue("x", '未知');
//	    me.comp("contentData").setValue("y", '未知');
//	    me.comp("contentData").setValue("x_", '未知');
//		me.comp("contentData").setValue("y_", '未知');
		me.comp("contentData").setValue("s", '未知');
		me.comp("contentData").setValue("d", '未知');
		
		if (me.watchID !== null) {
			me.stopQPass(event);
		}
		
		function onSuccess(position) {
			
	
		    var cur_longitude = position.coords.longitude;
		    var cur_latitude = position.coords.latitude;
		    
		    //wex5 3.4后不需要自己转码为物理坐标
		    /*if(global.getPhoneType() === "android" && global.getNetworkType() === '0'){//justep.Util.hint("***开始转坐标***");
		    	//if(cur_longitude.toString().split(".")[1].length>6)alert("大于6");
		    	var wgs = global.gpsTranslate(cur_longitude,cur_latitude);
		    	cur_longitude= wgs.lon;
		    	cur_latitude = wgs.lat;
		    }*/
		    
		    if(global.getNetworkType() !== '0'){
		    	showMessage("net_aler", "当前网络不可用，请检查您的网络设置", true);
		    }else{
		    	showMessage("net_aler", "当前网络不可用，请检查您的网络设置", false);
		    }
		    
//		    me.comp("contentData").setValue("x", cur_longitude);
//		    me.comp("contentData").setValue("y", cur_latitude);
//		    me.comp("contentData").setValue("x_", position.coords.longitude);
//		    me.comp("contentData").setValue("y_", position.coords.latitude);
//		    me.comp("contentData").setValue("s", '0秒');

		    //alert("gpsData 总数： "+me.comp('gpsData').count());
		    /************************************************************************************/
		    var distance = 100;
		    var cur_distance = 0;
		    //判断点位信息
		    me.comp('sectionData').eachAll(function(param){

		    	cur_distance = global.getDistance(cur_latitude, cur_longitude, param.row.val('Latitude'), param.row.val('Longitude'));
		    	if(cur_distance < distance){
		    		distance = cur_distance;

		    	}
		    	var dis = parseInt(param.row.val('Radius'))/1000;
		    	if(cur_distance < dis  && num_section!==param.row.val('id')){//alert(id_send + '!==' + param.row.val('id'));
		    		num_section = param.row.val('id');
		    		me.nearSection(param.row.val('id'), param.row.val('Name'));

		    		return false;
		    	}
		    	
		    });
		    me.comp('gpsData').eachAll(function(param){

		    	cur_distance = global.getDistance(cur_latitude, cur_longitude, param.row.val('latitude'), param.row.val('Longitude'));
		    	if(cur_distance < distance){
		    		distance = cur_distance;
		    		
		    	}
		    	
		    	if(cur_distance<0.3 && id_send !== param.row.val('id').toString()){//alert(id_send + '!==' + param.row.val('id'));

		    		id_send = param.row.val('id').toString();
		    		me.nearTollgate(id_send);
		    		me.tempDataCheck(param.row.val('Name'), localStorage.getItem('licenceNo'), '快速通过');//me.tempDataSave(param.row.val('Name'), localStorage.getItem('licenceNo'), '快速通过');
		    		justep.Util.hint('车辆到达：'+param.row.val('Name'));
		    		return false;
		    	}
		    	
		    });
		    //alert('id_send: '+id_send);
		    if(id_send!==''){
		    	me.comp("contentData").setValue("x", me.comp('gpsData').getRowByID(id_send).val('Name'));
				me.comp("contentData").setValue("d", global.getDistance(cur_latitude, cur_longitude, me.comp('gpsData').getRowByID(id_send).val('latitude'), me.comp('gpsData').getRowByID(id_send).val('Longitude')).toFixed(8));
				me.sendLocation(cur_longitude, cur_latitude, position.coords.heading, position.coords.speed);
			}
		    
		    /************************************************************************************/
		   if(distance >= 2){
			   interval = 60;
		   }else if(distance > 1 && distance < 2){
			   interval = 30;
		   }else if(distance < 1){
			   interval = 10;			   
		   }//alert('interval: '+interval);
		   me.listenBtnClick(interval);

		}
		function onError(error) {

			me.listenBtnClick(10);
			switch(error.code)
			{
			case 1:
				//alert('您拒绝了使用位置共享服务，请在"设置"->"隐私"中开启定位服务。!');
				this.comp("messageDlg").show({
					type : 'OK',
					title : '提示信息',
					message : '您拒绝了使用位置共享服务，请在"设置"->"隐私"中开启定位服务!'
				});
				break;
			case 62:
				//alert('您拒绝了使用位置共享服务，请在"设置"中开启本程序定位服务权限。!');
				this.comp("messageDlg").show({
					type : 'OK',
					title : '提示信息',
					message : '您拒绝了使用位置共享服务，请在"设置"中开启本程序定位服务权限!'
				});
				break;
			default :
				//Message.message("aler", '获取位置失败!');
			break;
			}
		    me.comp("contentData").setValue("x", "失败");
//			me.comp("contentData").setValue("y", '');
//			me.comp("contentData").setValue("x_", '');
//		    me.comp("contentData").setValue("y_", '');
		}
		navigator.geolocation.getCurrentPosition(onSuccess, onError);
	};


	//车辆位置实时信息
	var num = 0;
	Model.prototype.listenBtnClick = function(def_interval) {//Message.message("aler", "开始监听");
		var me = this;
		
		var cur_interval = def_interval;//parseInt(me.comp("valueData").val("optionsValue"));//设置定时器时间间隔
		
		me.comp("contentData").setValue("title",'车辆位置实时信息');
	    me.comp("contentData").setValue("x", '未知');
//	    me.comp("contentData").setValue("y", '未知');
//	    me.comp("contentData").setValue("x_", '未知');
//		me.comp("contentData").setValue("y_", '未知');
		me.comp("contentData").setValue("s", '未知');
		me.comp("contentData").setValue("d", '未知');
//	    var gps_data = this.comp("gpsData");

		var options = {
			timeout : cur_interval*1000,
//			maximumAge: cur_interval*1000,	//缓存的时间
//			//enableHighAccuracy: true	//是否允许使用高精度
		};
		function onSuccess(position) {//Message.message("aler", "监听成功");
			
			num = num +cur_interval;

			
		    var cur_longitude = position.coords.longitude;
		    var cur_latitude = position.coords.latitude;
		    
		    //wex5 3.4后不需要自己转码为物理坐标
		    /*if(global.getPhoneType() === "android" && global.getNetworkType() === '0'){
		    	//if(cur_longitude.toString().split(".")[1].length>6)alert("大于6");
		    	var wgs = global.gpsTranslate(cur_longitude,cur_latitude);
		    	cur_longitude= wgs.lon;
		    	cur_latitude = wgs.lat;
		    }*/
		    if(global.getNetworkType() !== '0'){
		    	showMessage("net_aler", "当前网络不可用，请检查您的网络设置", true);
		    }else{
		    	showMessage("net_aler", "当前网络不可用，请检查您的网络设置", false);
		    }

//		    me.comp("contentData").setValue("x", cur_longitude);
//		    me.comp("contentData").setValue("y", cur_latitude);
//		    me.comp("contentData").setValue("x_", position.coords.longitude);
//		    me.comp("contentData").setValue("y_", position.coords.latitude);
		    me.comp("contentData").setValue("s", parseInt(num/60)+": "+global.getTime(1));//num +'秒'+' 当前时间：'+global.getTime(1));

		    
		    /************************************************************************************/
		    var distance = 100;
		    var cur_distance = 0;
		    //判断点位信息
		    me.comp('sectionData').eachAll(function(param){

		    	cur_distance = global.getDistance(cur_latitude, cur_longitude, param.row.val('Latitude'), param.row.val('Longitude'));
		    	if(cur_distance < distance){
		    		distance = cur_distance;
		    		
		    	}
		    	var dis = parseInt(param.row.val('Radius'))/1000;
		    	if(cur_distance < dis && num_section!==param.row.val('id')){//alert(id_send + '!==' + param.row.val('id'));
		    		num_section = param.row.val('id');
		    		me.nearSection(param.row.val('id'), param.row.val('Name'));

		    		return false;
		    	}
		    	
		    });
		    me.comp('gpsData').eachAll(function(param){

		    	cur_distance = global.getDistance(cur_latitude, cur_longitude, param.row.val('latitude'), param.row.val('Longitude'));
		    	if(cur_distance < distance){
		    		distance = cur_distance;
		    	
		    	}

		    	if(cur_distance<0.3 && id_send !== param.row.val('id')){//alert(id_send + '!==' + param.row.val('id'));
		    		id_send = param.row.val('id').toString();
		    		me.nearTollgate(id_send);
		    		me.tempDataCheck(param.row.val('Name'), localStorage.getItem('licenceNo'), '快速通过');//me.tempDataSave(param.row.val('Name'), localStorage.getItem('licenceNo'), '快速通过');
		    		justep.Util.hint('车辆到达：'+param.row.val('Name'));
		    		return false;
		    	}
		    	
		    });
		    
		    if(id_send!==''){
		    	me.comp("contentData").setValue("x", me.comp('gpsData').getRowByID(id_send).val('Name'));
				me.comp("contentData").setValue("d", global.getDistance(cur_latitude, cur_longitude, me.comp('gpsData').getRowByID(id_send).val('latitude'), me.comp('gpsData').getRowByID(id_send).val('Longitude')).toFixed(8));
				me.sendLocation(cur_longitude, cur_latitude, position.coords.heading, position.coords.speed);
			}
		    /************************************************************************************/
		    //alert('distance: '+distance);
		    if(distance >= 2 && cur_interval!== 60){
			   cur_interval = 60;
			   navigator.geolocation.clearWatch(this.watchID);//clearInterval(timer);
			   options = {
					   timeout : cur_interval*1000
			   };
			   me.watchID = navigator.geolocation.watchPosition(onSuccess, onError, options);//setInterval(getPos,cur_interval*1000);
		    }else if(distance > 1 && distance < 2 && cur_interval!== 30){
			   cur_interval = 30;
			   navigator.geolocation.clearWatch(this.watchID);//clearInterval(timer);
			   options = {
					   timeout : cur_interval*1000
			   };
			   me.watchID = navigator.geolocation.watchPosition(onSuccess, onError, options);//setInterval(getPos,cur_interval*1000);
			   
		    }else if(distance < 1 && cur_interval!== 10){
			   cur_interval = 10;
			   navigator.geolocation.clearWatch(this.watchID);//clearInterval(timer);
			   options = {
					   timeout : cur_interval*1000
			   };
			   me.watchID = navigator.geolocation.watchPosition(onSuccess, onError, options);//setInterval(getPos,cur_interval*1000);
		    }

		    

		}
		function onError(error) {
//			alert('code: '    + error.code    + '\n' +'message: ' + error.message + '\n');
			switch(error.code)
			{
			case 1:
				//alert('您拒绝了使用位置共享服务，请在"设置"->"隐私"中开启定位服务。!');
				this.comp("messageDlg").show({
					type : 'OK',
					title : '提示信息',
					message : '您拒绝了使用位置共享服务，请在"设置"->"隐私"中开启定位服务!'
				});
				break;
			case 62:
				//alert('您拒绝了使用位置共享服务，请在"设置"中开启本程序定位服务权限。!');
				this.comp("messageDlg").show({
					type : 'OK',
					title : '提示信息',
					message : '您拒绝了使用位置共享服务，请在"设置"中开启本程序定位服务权限!'
				});
				break;
			default :
				Message.message("aler", '获取位置失败!');
			break;
			}
		    me.comp("contentData").setValue("x", "失败");
//			me.comp("contentData").setValue("y", '未知');
//			me.comp("contentData").setValue("x_", '未知');
//		    me.comp("contentData").setValue("y_", '未知');
		    me.comp("contentData").setValue("s", '未知');
		    me.comp("contentData").setValue("d", '未知');
		}
		//this.watchID = navigator.geolocation.watchPosition(onSuccess, onError, options);
		
		/*function getPos(){
			navigator.geolocation.getCurrentPosition(onSuccess, onError);//, options);
		}

		timer = setInterval(getPos,cur_interval*1000);*/
		this.watchID = navigator.geolocation.watchPosition(onSuccess, onError, options);
	};

//	//车辆位置实时信息
//	var num = 0;
//	Model.prototype.listenBtnClick = function(def_interval) {//Message.message("aler", "开始监听");
//		var me = this;
//		
//		var cur_interval = def_interval;
//		
//		me.comp("contentData").setValue("title",'车辆位置实时信息');
//	    me.comp("contentData").setValue("x", '未知');
////	    me.comp("contentData").setValue("y", '未知');
////	    me.comp("contentData").setValue("x_", '未知');
////		me.comp("contentData").setValue("y_", '未知');
//		me.comp("contentData").setValue("s", '未知');
//		me.comp("contentData").setValue("d", '未知');
////	    var gps_data = this.comp("gpsData");
//
//		var options = {
//			timeout : cur_interval*1000,
////			maximumAge: cur_interval*1000,	//缓存的时间
////			//enableHighAccuracy: true	//是否允许使用高精度
//		};
//		function onSuccess(position) {//Message.message("aler", "监听成功");
//			
//			num = num +cur_interval;
//
//			
//		    var cur_longitude = position.coords.longitude;
//		    var cur_latitude = position.coords.latitude;
//		    
//		    //wex5 3.4后不需要自己转码为物理坐标
//		    /*if(global.getPhoneType() === "android" && global.getNetworkType() === '0'){
//		    	//if(cur_longitude.toString().split(".")[1].length>6)alert("大于6");
//		    	var wgs = global.gpsTranslate(cur_longitude,cur_latitude);
//		    	cur_longitude= wgs.lon;
//		    	cur_latitude = wgs.lat;
//		    }*/
//		    if(global.getNetworkType() !== '0'){
//		    	showMessage("net_aler", "当前网络不可用，请检查您的网络设置", true);
//		    }else{
//		    	showMessage("net_aler", "当前网络不可用，请检查您的网络设置", false);
//		    }
//
////		    me.comp("contentData").setValue("x", cur_longitude);
////		    me.comp("contentData").setValue("y", cur_latitude);
////		    me.comp("contentData").setValue("x_", position.coords.longitude);
////		    me.comp("contentData").setValue("y_", position.coords.latitude);
//		    me.comp("contentData").setValue("s", num+"  "+parseInt(num/60)+": "+global.getTime(1));//num +'秒'+' 当前时间：'+global.getTime(1));
//
//		    
//		    /************************************************************************************/
//		    var distance = 100;
//		    var cur_distance = 0;
//		    //判断点位信息
//		    me.comp('sectionData').eachAll(function(param){
//
//		    	cur_distance = global.getDistance(cur_latitude, cur_longitude, param.row.val('Latitude'), param.row.val('Longitude'));
//		    	if(cur_distance < distance){
//		    		distance = cur_distance;
//		    		
//		    	}
//		    	var dis = parseInt(param.row.val('Radius'))/1000;
//		    	if(cur_distance < dis && num_section!==param.row.val('id')){//alert(id_send + '!==' + param.row.val('id'));
//		    		num_section = param.row.val('id');
//		    		me.nearSection(param.row.val('id'), param.row.val('Name'));
//
//		    		return false;
//		    	}
//		    	
//		    });
//		    me.comp('gpsData').eachAll(function(param){
//
//		    	cur_distance = global.getDistance(cur_latitude, cur_longitude, param.row.val('latitude'), param.row.val('Longitude'));
//		    	if(cur_distance < distance){
//		    		distance = cur_distance;
//		    	
//		    	}
//
//		    	if(cur_distance<0.3 && id_send !== param.row.val('id')){//alert(id_send + '!==' + param.row.val('id'));
//		    		id_send = param.row.val('id').toString();
//		    		me.nearTollgate(id_send);
//		    		me.tempDataCheck(param.row.val('Name'), localStorage.getItem('licenceNo'), '快速通过');//me.tempDataSave(param.row.val('Name'), localStorage.getItem('licenceNo'), '快速通过');
//		    		justep.Util.hint('车辆到达：'+param.row.val('Name'));
//		    		return false;
//		    	}
//		    	
//		    });
//		    
//		    if(id_send!==''){
//		    	me.comp("contentData").setValue("x", me.comp('gpsData').getRowByID(id_send).val('Name'));
//				me.comp("contentData").setValue("d", global.getDistance(cur_latitude, cur_longitude, me.comp('gpsData').getRowByID(id_send).val('latitude'), me.comp('gpsData').getRowByID(id_send).val('Longitude')).toFixed(8));
//				me.sendLocation(cur_longitude, cur_latitude, position.coords.heading, position.coords.speed);
//			}
//		    /************************************************************************************/
//		    //alert('distance: '+distance);
//		    var option = null;
//		    var interval = null;
//		    var times = 0;
//		    if(distance >= 2 && cur_interval!== 60){
//			   cur_interval = 60;
//			   me.watchID.free();
//			   option = {model:me,onTimer:getPos.bind(me)};
//			   interval = cur_interval*1000;
//			   if(interval){
//				   option.interval = justep.String.toInt(interval, 10000);
//			   }
//			   times = 0;
//			   if(times){
//				   option.times = justep.String.toInt(times, 0);
//			   } 
//			   me.watchID = new Timer(option);
//		    }else if(distance > 1 && distance < 2 && cur_interval!== 30){
//			   cur_interval = 30;
//			   me.watchID.free();
//			   option = {model:me,onTimer:getPos.bind(me)};
//			   interval = cur_interval*1000;
//			   if(interval){
//				   option.interval = justep.String.toInt(interval, 10000);
//			   }
//			   times = 0;
//			   if(times){
//				   option.times = justep.String.toInt(times, 0);
//			   } 
//			   me.watchID = new Timer(option);
//			   
//		    }else if(distance < 1 && cur_interval!== 10){
//			   cur_interval = 10;
//			   me.watchID.free();
//			   option = {model:me,onTimer:getPos.bind(me)};
//			   interval = cur_interval*1000;
//			   if(interval){
//				   option.interval = justep.String.toInt(interval, 10000);
//			   }
//			   times = 0;
//			   if(times){
//				   option.times = justep.String.toInt(times, 0);
//			   } 
//			   me.watchID = new Timer(option);
//		    }
//
//		    
//
//		}
//		function onError(error) {
////			alert('code: '    + error.code    + '\n' +'message: ' + error.message + '\n');
//			switch(error.code)
//			{
//			case 1:
//				//alert('您拒绝了使用位置共享服务，请在"设置"->"隐私"中开启定位服务。!');
//				this.comp("messageDlg").show({
//					type : 'OK',
//					title : '提示信息',
//					message : '您拒绝了使用位置共享服务，请在"设置"->"隐私"中开启定位服务!'
//				});
//				break;
//			case 62:
//				//alert('您拒绝了使用位置共享服务，请在"设置"中开启本程序定位服务权限。!');
//				this.comp("messageDlg").show({
//					type : 'OK',
//					title : '提示信息',
//					message : '您拒绝了使用位置共享服务，请在"设置"中开启本程序定位服务权限!'
//				});
//				break;
//			default :
//				Message.message("aler", '获取位置失败!');
//			break;
//			}
//		    me.comp("contentData").setValue("x", "失败");
////			me.comp("contentData").setValue("y", '未知');
////			me.comp("contentData").setValue("x_", '未知');
////		    me.comp("contentData").setValue("y_", '未知');
//		    me.comp("contentData").setValue("s", '未知');
//		    me.comp("contentData").setValue("d", '未知');
//		}
//		
//		function getPos(){
//			navigator.geolocation.getCurrentPosition(onSuccess, onError);//, options);
//		}
//
//		//this.watchID = setInterval(getPos,cur_interval*1000);
//		
//		if(!this.dtimer){
//			var option = {model:this,onTimer:getPos.bind(this)};
//			var interval = cur_interval*1000;
//			if(interval){
//				option.interval = justep.String.toInt(interval, 10000);
//			}
//			var times = 0;
//			if(times){
//				option.times = justep.String.toInt(times, 0);
//			} 
//			this.watchID = new Timer(option);
//		}
//
//	};

	//停止监听
	Model.prototype.stopBtnClick = function(event) {
//		if (this.watchID) {
			this.comp("contentData").setValue("title",'停止监听');
			this.comp("contentData").setValue("x", '未知');
//			this.comp("contentData").setValue("y", '未知');
//			this.comp("contentData").setValue("x_", '未知');
//		    this.comp("contentData").setValue("y_", '未知');
		    this.comp("contentData").setValue("s", '未知');
		    this.comp("contentData").setValue("d", '未知');
//			this.watchID = null;
			navigator.geolocation.clearWatch(this.watchID);//this.watchID.free();//navigator.geolocation.clearWatch(this.watchID);//clearInterval(timer);
			this.watchID = null;
			id_send = '';
//		}
	};	

	Model.prototype.payOrderByAlipay = function() {
		/**
		 * 支付宝支付
		 **/
		/**
		 * 9000 操作成功。 4000 系统异常。 4001 数据格式不正确。 4003 该用户绑定的支付宝账户被冻结或不允许支付。 4004
		 * 该用户已解除绑定。 4005 绑定失败或没有绑定。 4006 订单支付失败。 4010 重新绑定账户。 6000 支付服务正在进行升级操作。
		 * 6001 用户中途取消支付操作。
		 * 
		 * 当请求支付已经到alipay应用但是失败 错误编码 以 -33 + message(message是非常大的整数一般都3000+) -33
		 * 当前环境不支持支付宝支付 -30 支付宝支付支付请求被拒绝
		 */alert("进入支付宝");
		if (!navigator.alipay) {
			alert("未安装支付宝");
			return;
		}
		var me = this;
		var notifyUrl = location.origin;
		var tradeNo = justep.UUID.createUUID();
		var alipay = navigator.alipay;
		alipay.pay({
			"seller" : "rmzfb@rmtech.com.cn", // 卖家支付宝账号或对应的支付宝唯一用户号
			"subject" : "高速支付", // 商品名称
			"body" : "支付测试", // 商品详情
			"price" : "0.01", // 金额，单位为RMB
			"tradeNo" : tradeNo, // 唯一订单号
			"timeout" : "30m", // 超时设置
			"notifyUrl" : notifyUrl
		}, // 服务器通知路径
		function(message) {
			
			var responseCode = parseInt(message);
			if (responseCode === 9000) {
				var url =  require.toUrl("./success.w");
				me.comp('winDlg').open({src:url});
			} else if (!isNaN(responseCode)) {
				alert("出错：" + message);
				
			} else {
				alert("出错了!1："+message);
				
			}
		}, function(msg) {
			alert("出错了!"+msg);
			
		});

	};
	

	Model.prototype.btn_payClick = function(event){

		//this.payOrderByAlipay();
//		var url =  require.toUrl("../pay/order.w");
//		this.comp('winDlg').open({src:url});
		justep.Shell.showPage("pay");
		
	};
	
	
	Model.prototype.wakeLock = function(is_wakelock){
		
		if(is_wakelock === false){

/***********insomnia************************************************************/
			if(localStorage.getItem('offscreen') !='false'){//alert("不熄屏");
				window.plugins.insomnia.keepAwake();
			}
			
/***********background-mode************************************************************/
			cordova.plugins.backgroundMode.setDefaults( {
					title:  '高速移动支付',
					text:   '程序正在后台运行',
					ticker: '程序正在后台运行',
					resume: true,
					silent: false
			});

			cordova.plugins.backgroundMode.enable();
			// Get informed when the background mode has been activated
			cordova.plugins.backgroundMode.onactivate = function () {
				if(global.getPhoneType() === "ios"){//alert("ios");
					cordova.plugins.notification.badge.set(1);
					cordova.plugins.notification.badge.configure({ title:"程序正在后台运行" });
				}
			};
//
			// Get informed when the background mode has been deactivated
			cordova.plugins.backgroundMode.ondeactivate = function () {
				if(global.getPhoneType() === "ios"){
					cordova.plugins.notification.badge.clear();
				}
			};
/***********cordova-plugin-powermanagement************************************************************/				
//			window.powermanagement.acquire();
			
/***********************************************************************/			
			this.listenBtnClick(10);//.getGeoBtnClick(event);//
			//justep.Util.hint("调用listenBtnClick()");
			//justep.Util.hint('常驻进程');
		}else{
			num = 0;
			navigator.geolocation.clearWatch(this.watchID);//this.watchID.free();//navigator.geolocation.clearWatch(this.watchID);//clearInterval(timer);
			
/***********background-mode************************************************************/
			cordova.plugins.backgroundMode.disable();
			
/***********cordova-plugin-powermanagement************************************************************/				
//			window.powermanagement.release();
			
/***********************************************************************/
			
			if(localStorage.getItem('offscreen') !='false'){//alert("重新熄屏");
				window.plugins.insomnia.allowSleepAgain();
			}
			//justep.Util.hint('释放常驻进程');
		}

	};
	
	Model.prototype.quickPass = function(event){//alert('quickPass');

		var me = this;
		
		if(localStorage.getItem('gps_get') === null || localStorage.getItem('gps_get') === undefined){
			
			me.gpsDataSave();
			Message.message("aler", "数据初始化异常，请稍后重试！");
		}else if(localStorage.getItem('listening')!=='false'){//this.comp("toggle_listen").value === '1'){

			if(localStorage.getItem('plateId') === null || localStorage.getItem('plateId') === undefined){//alert('plateId为空');
				var argv2 = new Array("10205");//编号
				argv2.push(localStorage.getItem('userId'));
				var query2 = global.getPrm(argv2);
				$.ajax({
					type: "post",
					url: global.getUrl(),//require.toUrl(global.getUrl()),
					"data" : query2,
					dataType: 'json',
					async: false,//使用同步方式，目前data组件有同步依赖
					cache: false,
					"global":false,
					success: function(info){
						if(info['Obj'][0] === null || info['Obj'][0] === "" || info['Obj'][0] === undefined){
							//alert('请在"我"->"车牌管理"中绑定车牌数据！');
							me.comp("bindPlate").show();
						}else{
							localStorage.setItem('plateId',info['Obj'][0]['id']);
							localStorage.setItem('licenceNo',info['Obj'][0]['licenceNo']);
							me.wakeLock(false);
							
							//$(me.getElementByXid('quickPassBtn')).css({"display" : "none"});
							//$(me.getElementByXid('stopQPassBtn')).css({"display" : "block"});
						}

					},
					error: function(){
						Message.message("aler", "加载数据失败！");
					}
				});
			}else{
			
				//$(me.getElementByXid('quickPassBtn')).css({"display" : "none"});
				//$(me.getElementByXid('stopQPassBtn')).css({"display" : "block"});
				me.wakeLock(false);
			}
        }
	};
	
	Model.prototype.stopQPass = function(event){
		this.wakeLock(true);
		this.comp("contentData").setValue("title",'停止监听');
		this.comp("contentData").setValue("x", '未知');
//		this.comp("contentData").setValue("y", '未知');
//		this.comp("contentData").setValue("x_", '未知');
//		this.comp("contentData").setValue("y_", '未知');
		this.comp("contentData").setValue("s", '未知');
		this.comp("contentData").setValue("d", '未知');
		
		this.watchID = null;
		id_send = '';
		//$(this.getElementByXid('stopQPassBtn')).css({"display" : "none"});
		//$(this.getElementByXid('quickPassBtn')).css({"display" : "block"});

	};
/****************************************************************************************************************************
 ****************************************************************************************************************************
 **************************************************扫描二维码*****************************************************************
 ****************************************************************************************************************************
 ****************************************************************************************************************************/
	//扫描二维码
	Model.prototype.scanBtnClick = function(event) {
	
		var me = this;
		
		this.comp("scanBtn").disabled = true;
		
		if(global.getNetworkType() !== '0'){
			//Message.message("aler", "请打开网络连接");
			this.comp("messageDlg").show({
				type : 'OK',
				title : '提示信息',
				message : '请打开网络连接！'
			});
			return false;
		}
		
		function activate(){
			me.comp("scanBtn").disabled = false;
		}
		
		setTimeout(activate ,3000);
		var qr_data = this.comp("fileData");


		function onSuccess(result) {
			qr_data.newData({index : 0});
			qr_data.setValue("filePath", result.text);
			qr_data.setValue("fileName", result.format);
			qr_data.setValue('createTime', justep.Date.toString(new Date(), justep.Date.DEFAULT_FORMAT));

			var is_export = false;
			var argv;
			var argc = result.text.split(";");
			if(argc[0]== 'gaosuru'){
				argv = new Array("10602");
				argv.push(localStorage.getItem('userId'));
				argv.push(argc[1]);
				argv.push(argc[2]);
				argv.push("未知");
			}else if(argc[0]== 'gaosuchu'){
				is_export = true;
				argv = new Array("10702");
				argv.push(localStorage.getItem('userId'));
				argv.push(argc[1]);
				argv.push(argc[2]);
			}else{
				return;
			}
			var enterTollGateName = argc[3];
			

			var data = global.getPrm(argv);//alert("data : "+JSON.stringify(data));

			$.ajax({
				timeout : 5000,
				"type" : "post",
				"async" : false,
				"cache": false,
				"dataType" : "json", 
				"global":false,
				"data" : data,
				//"contentType" : "application/json",
				"url" : global.getUrl(), //PHP数据库校验用户名和密码是否正常
				"success" : function(info) {					
					//alert(JSON.stringify(info['Obj']));
					if(info['IsSuccess'] === true){
						if(is_export === true){
							//justep.Util.hint("发送出口扫描数据成功");
//							
							var params = {
									recordId : info['Obj']['TrafficRecordID'],
									// 将data中的一行数据传给对话框
									recordData : info['Obj']
							};
						
//							if (timer !== null) {
//								me.stopQPass(event);
//							}
							
							justep.Shell.showPage("pay", params);
						}else{//alert(info['Obj']['EnterLicenseNo']);
							//justep.Util.hint("发送入口扫描数据成功");
							//alert(JSON.stringify(info['Obj']));alert(JSON.stringify(info['Obj']['EnterLicenseNo']));
							me.tempDataCheck(enterTollGateName, info['Obj']['EnterLicenseNo'], '扫码通过');//me.tempDataSave(enterTollGateName, info['Obj']['EnterLicenseNo'], '扫码通过');
						}
					}
					else if(info['IsSuccess'] === false) //返回400，代表数据库查询不到记录，用户名或密码
					{
						Message.message("aler", "未扫描到您的车牌号");//justep.Util.hint(JSON.stringify(info['Msg']));
					}
					
					//me.comp("scanBtn").disabled = false;       
				},
				"error": function(){
					//Message.message("aler", "网络连接异常！");
					//me.comp("scanBtn").disabled = false;
				}
                                
			});
		}
		
		function onError(error) {
			Message.message("aler", "扫描失败！");
			//me.comp("scanBtn").disabled = false;
		}

		cordova.plugins.barcodeScanner.scan(onSuccess, onError);

	};


	Model.prototype.button2Click = function(event){
		alert(localStorage.getItem('tradeNo'));
	};

	return Model;
});
