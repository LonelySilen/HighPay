define(function(require) {
	var $ = require("jquery");
	var justep = require("$UI/system/lib/justep");
	require("$UI/system/lib/cordova/cordova");
	require("cordova!cordova-plugin-device");
	require("cordova!cordova-plugin-geolocation");
	require("cordova!com.justep.cordova.plugin.alipay");
	require("cordova!cordova-plugin-network-information");
	require("cordova!de.appplant.cordova.plugin.background-mode");

	//require("cordova!cordova-plugin-insomnia");
	
	var Message = require("$UI/system/components/justep/common/common");
	var global = require("../res/js/global");
	var SqliteUtil = require("../res/js/sqliteUtil");
	var DemoDB = require("../res/js/sqlite");
	
	var timer = null;
	
	var Model = function() {
		this.callParent();
		this.watchID = null;
		
	};

	Model.prototype.modelLoad = function(event){
		var me = this;
		document.addEventListener("deviceready", onDeviceReady, false);
//		$(this.getElementByXid('stopQPassBtn')).css({"display" : "none"});
		function onDeviceReady() {
//			me.comp("posBtn").set({disabled: false});
//			me.comp("getGeoBtn").set({disabled: false});
//			me.comp("listenBtn").set({disabled: false});
//			me.comp("stopBtn").set({disabled: false});
//			me.comp("btn_pay").set({disabled: false});
			
			me.checkPlate();
			
			var demoDB = DemoDB.getInstance();
			demoDB.initData(function() {
				me.gpsDataSave();
			});	
		}  
		
	};
	
	Model.prototype.modelUnLoad = function(event) {alert(1);
		if (timer) {alert(2);
			clearInterval(timer);
			}
		if (this.watchID) {
			navigator.geolocation.clearWatch(this.watchID);
		}
	};
		//图片路径转换
	Model.prototype.getImageUrl = function(url){
		return require.toUrl(url);
	};
	
	Model.prototype.checkPlate = function(event){
	

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
					//alert(JSON.stringify(info['Obj'][0]['id']));
					//alert(JSON.stringify(info['Obj'][0]['licId']));
					if(info['Obj'][0] === null || info['Obj'][0] === "" || info['Obj'][0] === undefined){
						justep.Util.hint("请绑定车牌数据！");
					}else{
						localStorage.setItem('plateId',info['Obj'][0]['id']);
						localStorage.setItem('licenceNo',info['Obj'][0]['licenceNo']);
						
					}
//					alert(localStorage.getItem('plateId'));
//					alert(localStorage.getItem('licenceNo'));
				},
				error: function(){
					justep.Util.hint("加载数据失败！");
				}
			});
		}

	};
	
	Model.prototype.gpsDataLoad = function(event){
		
		var load_had = 0;//是否联网获取数据成功
		var gps_data = this.comp("gpsData");
		var demoDB = null;

		// 这里在DemoDB.js中实现了一个单例对象，为了能在多个功能页中共用一个数据源，避免死锁
		demoDB = DemoDB.getInstance();
		// DemoDB.js中实现了自动判断并初始化数据库
		demoDB.initData(function() {

			// 标记当前刷新是异步执行的
			event.async = true;//false;

			var db = demoDB.getDatabase();

			var append = event.options && event.options.append; // 是否数据追加模式
			var limit = event.limit; // 分页行数
			var offset = event.offset; // 分页偏移
			//alert('SqliteUtil');
			// 执行SQL查询
			SqliteUtil.executeSql(db, "SELECT * FROM gps_data LIMIT ? OFFSET ? ;", [ limit, offset ], onSuccess, onError);
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
				function doRefreshData() {alert('table.rows.length='+table.rows.length);
					if(table.rows.length > 1){
						load_had = 1;
						gps_data.loadData(table, append);
					}else{
						//联网初始化数据
						var argv = new Array("10401");
						var time = global.getTime(0);
						argv.push(time);
						var data = global.getPrm(argv);
            			
						//ajax校验用户名和密码
						$.ajax({
							"type" : "post",
							"async" : false,
							"cache": false,
							"dataType" : "json", 
							"global":false,
							"data" : data,
							//"contentType" : "application/json",
							"url" : global.getUrl(), //数据库校验
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
									justep.Util.hint("拉取GPS失败");//alert(JSON.stringify(info));
								}        
							},
							"error": function(){
								justep.Util.hint("网络连接异常！");
							}
                                
						});
						
					}
					// 异步执行模式下，加载数据后必须执行doRefreshAfter
					gps_data.doRefreshAfter(true, event.options);
				}
			}
			function onError(msg) {
				gps_data.doRefreshAfter(false, event.options);
			}
            
		});

		return load_had;
		
	};
	
	Model.prototype.gpsDataSave = function(event){
	
		if(localStorage.getItem('gps_load')==='true'){
			return ;
		}
		
		var gps_data = this.comp("gpsData");

		var argv = new Array("10401");
		var time = global.getTime(0);
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
														alert("ERROR: " + e.message);
														return false;
													});
								}
							});
                                        	
						});
					});
					localStorage.setItem('gps_load','true');//已经加载数据
					gps_data.refreshData();
				}
				else if(info['IsSuccess'] === false) //返回400，代表数据库查询不到记录，用户名或密码
				{
					justep.Util.hint("拉取GPS失败");//alert(JSON.stringify(info));
				}        
			},
			"error": function(){
				justep.Util.hint("网络连接异常！");
			}
                                
		});
	};

	// 关闭功能
	Model.prototype.backBtnClick = function(event) {
		if(this.watchID)
			navigator.geolocation.clearWatch(this.watchID);
		//justep.Portal.closeWindow();
		history.back();
		//window.location.href = '../index.w';
	};

	
	//从地图返回
	Model.prototype.yBackBtnClick = function(event) {
		this.comp("contents1").to("main");
	};
	

	//发送驶入高速公路附近
	Model.prototype.nearTollgate = function(event) {

		var argv = new Array("10302");//编号
		var userId = localStorage.getItem('userId');
		var plateId = localStorage.getItem('plateId');//车牌ID
		var isInTollGate = 1;//0,未;1,可
     
       	if(plateId!== null && plateId!== '' && plateId!== undefined){
       		argv.push(userId);
       		argv.push(plateId);
       		argv.push(isInTollGate);
		    
       		var data = global.getPrm(argv);
                			

       		//ajax校验
       		$.ajax({
       			"type" : "post",
       			"async" : false,
       			"cache": false,
       			"dataType" : "json", 
       			"global":false,
       			"data" : data,
       			//"contentType" : "application/json",
       			"url" : global.getUrl(), //数据库校验用户名和密码是否正常
       			"success" : function(info) {//alert(data+JSON.stringify(info));
       				if(info['IsSuccess'] === true){          //php返回200，代表后端程序成功返回查询结果
//                                               
       					justep.Util.hint("发送驶入高速公路附近成功");

       				}
       				else if(info['IsSuccess'] === false) //返回400，代表数据库查询不到记录，用户名或密码
       				{
       					justep.Util.hint("发送驶入高速公路附近失败");//alert(JSON.stringify(info));
       				}        
       			},
       			"error": function(){
       				justep.Util.hint("网络连接异常！");
       			}
                                
       		});
            
		}else{
			justep.Util.hint("尚未绑定车牌,请绑定车牌！");
		}
	};
	
	Model.prototype.sendLocation = function(event){
		var me = this;
		me.comp("contentData").setValue("title",'获取设备位置信息');
	    me.comp("contentData").setValue("x", '经度: ');
	    me.comp("contentData").setValue("y", '维度: ');

		function onSuccess(position) {
			var cur_longitude = position.coords.longitude;
		    var cur_latitude = position.coords.latitude;
		    if(global.getPhoneType() === "android" && global.getNetworkType() === '0'){//justep.Util.hint("开始转坐标");
		    	var wgs = global.gpsTranslate(cur_longitude,cur_latitude);
		    	cur_longitude= wgs.lon;
		    	cur_latitude = wgs.lat;
		    }

		    me.comp("contentData").setValue("x", '经度: ' +cur_longitude);
		    me.comp("contentData").setValue("y", '维度: ' +cur_latitude);
		    me.comp("contentData").setValue("h", '方向: ' +position.coords.longitude);
		    me.comp("contentData").setValue("s", '速度: ' +position.coords.latitude);
		    
          
			    /************************************************************************************/
		    		    
		    var argv = new Array("10501");//编号
		    var userId = localStorage.getItem('userId');
		    var licenseId = localStorage.getItem('plateId');//车牌ID
		    var licenseNo = localStorage.getItem('licenceNo');//驾驶证号
		    var longitude = position.coords.longitude;
		    var latitude = position.coords.latitude;
		    var heading = position.coords.heading;
		    var speed = position.coords.speed;
    
	    
            if(licenseId === null || licenseId === ""){
            	justep.Util.hint("尚未绑定车牌,请绑定车牌");
            	return null;
            }else if(longitude === null || longitude === ""){
            	justep.Util.hint("请开启定位功能");
            	return null;
            }
            if(heading === null || heading === undefined  || heading === ""){
            	heading = "-1";
            }
            if(speed === null || speed === undefined  || speed === ""){
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
            	"type" : "post",
                "async" : true,//false,
                "cache": false,
                "dataType" : "json", 
                "global":false,
                "data" : data,
                //"contentType" : "application/json",
                "url" : global.getUrl(), //PHP数据库校验用户名和密码是否正常
                "success" : function(info) {
                	if(info['IsSuccess'] === true){          //php返回200，代表后端程序成功返回查询结果
//                                               
//                    	justep.Util.hint("发送GPS成功");

                	}
                	else if(info['IsSuccess'] === false) //返回400，代表数据库查询不到记录，用户名或密码
                	{
                		justep.Util.hint("发送GPS失败");alert(data+JSON.stringify(info));
                	}        
                },
                "error": function(){
                	justep.Util.hint("网络连接异常！");
                }
                                
            });
		    /************************************************************************************/
		}

		function onError() {
		    me.comp("contentData").setValue("x", "失败");
			me.comp("contentData").setValue("y", '');
		}
		navigator.geolocation.getCurrentPosition(onSuccess, onError);
	};
	
	//判断联网方式
//	Model.prototype.judgeNetwork = function(event) {
//	
//		var networkState = navigator.connection.type;  
//        var states = {};  
//        states[Connection.UNKNOWN]  = 'Unknown connection';  
//        states[Connection.ETHERNET] = 'Ethernet connection';  
//        states[Connection.WIFI]     = 'WiFi connection';  
//        states[Connection.CELL_2G]  = 'Cell 2G connection';  
//        states[Connection.CELL_3G]  = 'Cell 3G connection';  
//        states[Connection.CELL_4G]  = 'Cell 4G connection';  
//        states[Connection.CELL]     = 'Cell generic connection';  
//        states[Connection.NONE]     = 'No network connection';
//        
//        alert('Connection type: ' + states[networkState]);
//	};
	
	//baiduGps转火星GPS再转标准GPS
	//WGS-84：是国际标准，GPS坐标（Google Earth使用、或者GPS模块）
	//GCJ-02：中国坐标偏移标准，Google Map、高德、腾讯使用
	//BD-09：百度坐标偏移标准，Baidu Map使用
//	Model.prototype.gpsTranslate = function(baidu_longitude, baidu_latitude) {
//		//alert('开始转换GPS');
//		var PI = 3.14159265358979324;
//		var x_pi = 3.14159265358979324 * 3000.0 / 180.0;
//		
//		var bd_x=baidu_longitude - 0.0065;
//		var bd_y=baidu_latitude - 0.006;
//		var z = Math.sqrt(bd_x * bd_x + bd_y * bd_y) - 0.00002 * Math.sin(bd_y * x_pi);
//		var theta = Math.atan2(bd_y, bd_x) - 0.000003 * Math.cos(bd_x * x_pi);
//		var gcjLon = z * Math.cos(theta);
//		var gcjLat = z * Math.sin(theta);
//
//		//GCJ-02 to WGS-84
//		var a = 6378245.0;
//		var ee = 0.00669342162296594323;
//		var dLat = transformLat(gcjLon - 105.0, gcjLat - 35.0);
//		var dLon = transformLon(gcjLon - 105.0, gcjLat - 35.0);
//		var radLat = gcjLat / 180.0 * PI;
//		var magic = Math.sin(radLat);
//		magic = 1 - ee * magic * magic;
//		var sqrtMagic = Math.sqrt(magic);
//		dLat = (dLat * 180.0) / ((a * (1 - ee)) / (magic * sqrtMagic) * PI);
//		dLon = (dLon * 180.0) / (a / sqrtMagic * Math.cos(radLat) * PI);
//		return {'lat': gcjLat - dLat, 'lon': gcjLon - dLon};
//		
//		function transformLat(x, y){
//			var ret = -100.0 + 2.0 * x + 3.0 * y + 0.2 * y * y + 0.1 * x * y + 0.2 * Math.sqrt(Math.abs(x));
//			ret += (20.0 * Math.sin(6.0 * x * PI) + 20.0 * Math.sin(2.0 * x * PI)) * 2.0 / 3.0;
//			ret += (20.0 * Math.sin(y * PI) + 40.0 * Math.sin(y / 3.0 * PI)) * 2.0 / 3.0;
//			ret += (160.0 * Math.sin(y / 12.0 * PI) + 320 * Math.sin(y * PI / 30.0)) * 2.0 / 3.0;
//			return ret;
//		}
//		function transformLon(x, y)
//		{
//			var ret = 300.0 + x + 2.0 * y + 0.1 * x * x + 0.1 * x * y + 0.1 * Math.sqrt(Math.abs(x));
//			ret += (20.0 * Math.sin(6.0 * x * PI) + 20.0 * Math.sin(2.0 * x * PI)) * 2.0 / 3.0;
//			ret += (20.0 * Math.sin(x * PI) + 40.0 * Math.sin(x / 3.0 * PI)) * 2.0 / 3.0;
//			ret += (150.0 * Math.sin(x / 12.0 * PI) + 300.0 * Math.sin(x / 30.0 * PI)) * 2.0 / 3.0;
//			return ret;
//		}
//
////		//GCJ-02 to WGS-84 exactly
////		var initDelta = 0.01;
////		var threshold = 0.00001;
////		var dLat = initDelta, dLon = initDelta;
////		var mLat = gcjLat - dLat, mLon = gcjLon - dLon;
////		var pLat = gcjLat + dLat, pLon = gcjLon + dLon;
////		var wgsLat, wgsLon, i = 0;
////		while (1) {
////			wgsLat = (mLat + pLat) / 2;
////			wgsLon = (mLon + pLon) / 2;
////			var tmp = this.gcj_encrypt(wgsLat, wgsLon);
////			dLat = tmp.lat - gcjLat;
////			dLon = tmp.lon - gcjLon;
////			if ((Math.abs(dLat) < threshold) && (Math.abs(dLon) < threshold)){
////				break;
////			}
////			if (dLat > 0){
////				pLat = wgsLat;
////			}else
////				mLat = wgsLat;
////				
////			if (dLon > 0){
////				pLon = wgsLon;
////			}else
////				mLon = wgsLon;
////
////			if (++i > 10000)
////				break;
////		}
////		return {'lat': wgsLat, 'lon': wgsLon};
//
//	};
	
	
	//获取设备位置信息
	Model.prototype.getGeoBtnClick = function(event) {
		var me = this;
		me.comp("contentData").setValue("title",'获取设备位置信息');
	    me.comp("contentData").setValue("x", '经度: ');
	    me.comp("contentData").setValue("y", '维度: ');

		function onSuccess(position) {
			var cur_longitude = position.coords.longitude;
		    var cur_latitude = position.coords.latitude;
		    if(global.getPhoneType() === "android" && global.getNetworkType() === '0'){//justep.Util.hint("开始转坐标");
		    	var wgs = global.gpsTranslate(cur_longitude,cur_latitude);
		    	cur_longitude= wgs.lon;
		    	cur_latitude = wgs.lat;
		    }

		    me.comp("contentData").setValue("x", '经度: ' +cur_longitude);
		    me.comp("contentData").setValue("y", '维度: ' +cur_latitude);
		    me.comp("contentData").setValue("h", '方向: ' +position.coords.longitude);
		    me.comp("contentData").setValue("s", '速度: ' +position.coords.latitude);
		    
//		    var argv = new Array("10302");//编号
//		    var userId = localStorage.getItem('userId');
//		    var plateId = localStorage.getItem('plateId');//localStorage.getItem('licenseId');//车牌ID
//		    var isInTollGate = 1;//0,未;1,可
////		    alert('plateId:'+plateId);
//    
//		    argv.push(userId);
//		    argv.push(plateId);
//		    argv.push(isInTollGate);
//		    
//            var data = global.getPrm(argv);
//                			
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
//                "success" : function(info) {alert(data+JSON.stringify(info));
//                	if(info['IsSuccess'] === true){          //php返回200，代表后端程序成功返回查询结果
////                                               
//                    	justep.Util.hint("发送驶入高速公路附近成功");
//
//                	}
//                	else if(info['IsSuccess'] === false) //返回400，代表数据库查询不到记录，用户名或密码
//                	{
//                		justep.Util.hint("发送驶入高速公路附近失败");//alert(JSON.stringify(info));
//                	}        
//                },
//                "error": function(){
//                	justep.Util.hint("网络连接异常！");
//                }
//                                
//            });
            
/*****************************************/    

            //var demoDB = DemoDB.getInstance();
            //var db = demoDB.getDatabase();
//            var db = window.sqlitePlugin.openDatabase({
//				name : "SQLite"
//			});alert("open database!!");
//            db.transaction(function(tx) {
//			tx.executeSql("select * from gps_data ;", [], function(tx, res) {
//				
//					var record = "count=" + res.rows.length ;
//					alert("记录内容： " + record);
//
//			});
//		});
 /*****************************************/
		}

		function onError() {
		    me.comp("contentData").setValue("x", "失败");
			me.comp("contentData").setValue("y", '');
		}
		navigator.geolocation.getCurrentPosition(onSuccess, onError);
	};
	
	//监听设备位置信息
	var num = 0;
	Model.prototype.listenBtnClick = function(event) {
		var me = this;
		var is_send = false;
		me.comp("contentData").setValue("title",'监听设备位置信息');
	    me.comp("contentData").setValue("x", '经度: ');
	    me.comp("contentData").setValue("y", '维度: ');
	    
//	    var gps_data = this.comp("gpsData");

		var options = {
			timeout : 1000,
			maximumAge: 1000,	//缓存的时间
			//enableHighAccuracy: true	//是否允许使用高精度
		};
		function onSuccess(position) {
			
			++num;justep.Util.hint('已经运行'+ num +'秒' );
			me.sendLocation();
			
		    var cur_longitude = position.coords.longitude;
		    var cur_latitude = position.coords.latitude;
		    if(global.getPhoneType() === "android" && global.getNetworkType() === '0'){//justep.Util.hint("***开始转坐标***");
		    	if(cur_longitude.toString().split(".")[1].length>6)alert("大于6");
		    	var wgs = global.gpsTranslate(cur_longitude,cur_latitude);
		    	cur_longitude= wgs.lon;
		    	cur_latitude = wgs.lat;
		    }

		    me.comp("contentData").setValue("x", '经度: ' +cur_longitude);
		    me.comp("contentData").setValue("y", '维度: ' +cur_latitude);
		    me.comp("contentData").setValue("h", '方向: ' +position.coords.longitude);
		    me.comp("contentData").setValue("s", '速度: ' +position.coords.latitude);
		    
		    /************************************************************************************/
		    me.comp('gpsData').eachAll(function(param){

		    	var distance = global.getDistance(cur_latitude, cur_longitude, param.row.val('latitude'), param.row.val('Longitude'));
//		    	if(distance<10)
//		    		justep.Util.hint(param.row.val('Name')+": "+distance+' latitude: '+cur_latitude+" longitude: "+cur_longitude);
		    	if(distance<10 && is_send === false){
		    		is_send = true;
		    		me.nearTollgate();
		    		return false;
		    	}
		    });
		    
		    /************************************************************************************/
		    

		}
		function onError() {
		    me.comp("contentData").setValue("x", "失败");
			me.comp("contentData").setValue("y", '');
		}
		//this.watchID = navigator.geolocation.watchPosition(onSuccess, onError, options);

		function getPos(){
			navigator.geolocation.getCurrentPosition(onSuccess, onError, options);
		}
		timer = setInterval(getPos,1000);
	};

	//停止监听
	Model.prototype.stopBtnClick = function(event) {
//		if (this.watchID) {
			navigator.geolocation.clearWatch(this.watchID);
			this.comp("contentData").setValue("title",'停止监听');
			this.comp("contentData").setValue("x", '');
			this.comp("contentData").setValue("y", '');
//			this.watchID = null;
			clearInterval(timer);
			timer = null;

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
	
//	//显示地图
//	Model.prototype.mapBtnClick = function(event) {
//		this.comp("contents1").to("map");
//		
//	    var url =  require.toUrl("./map.html");
//	    $(this.getElementByXid('mapContent')).html('<iframe id="mapFrame" src="'+url+'" width="100%" height="100%" style="border:0;"></iframe>');
//	};
//			
//	Model.prototype.posBtnClick = function(event){
//		function onSuccess(position) {
//			var cur_longitude = position.coords.longitude;
//		    var cur_latitude = position.coords.latitude;
//		    if(global.getPhoneType() === "android" && global.getNetworkType() === '0'){justep.Util.hint("开始转坐标");
//		    	var wgs = global.gpsTranslate(cur_longitude,cur_latitude);
//		    	cur_longitude= wgs.lon;
//		    	cur_latitude = wgs.lat;
//		    }
//			$('#mapFrame')[0].contentWindow.movePos(cur_longitude, cur_latitude);
//		}
//
//		function onError() {
//		    alert("获取当前位置信息失败");
//		}
//		navigator.geolocation.getCurrentPosition(onSuccess, onError);
//	};

	Model.prototype.btn_payClick = function(event){

		//this.payOrderByAlipay();
//		var url =  require.toUrl("../pay/order.w");
//		this.comp('winDlg').open({src:url});
		justep.Shell.showPage("pay");
		
	};
	
	Model.prototype.scan = function(event){

		Message.message("aler", "通过代码动态创建MessageDialog");alert(Message.flag);

	};
	
	
	Model.prototype.wakeLock = function(is_wakelock){

		if(is_wakelock === false){
			
/***********************************************************************/
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
					cordova.plugins.notification.badge.set(2);
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
/***********************************************************************/			
			this.listenBtnClick();

//			window.plugins.insomnia.keepAwake();
			justep.Util.hint('常驻进程');
		}else{

			clearInterval(timer);
			cordova.plugins.backgroundMode.disable();
			window.plugins.insomnia.allowSleepAgain();
			justep.Util.hint('释放常驻进程');
		}

	};
	
	Model.prototype.quickPassBtnClick = function(event){

		var me = this;
		
		if(localStorage.getItem('gps_load')=== null || localStorage.getItem('gps_load') === undefined){
			
			me.gpsDataSave();
			justep.Util.hint("数据初始化异常，请稍后重试！");
		}else{

			if(localStorage.getItem('plateId') === null || localStorage.getItem('plateId')=== undefined){alert('plateId为空');
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
						//alert(JSON.stringify(info['Obj'][0]['id']));
						//alert(JSON.stringify(info['Obj'][0]['licId']));
						if(info['Obj'][0] === null || info['Obj'][0] === "" || info['Obj'][0] === undefined){
							justep.Util.hint("请绑定车牌数据！");
						}else{
							localStorage.setItem('plateId',info['Obj'][0]['id']);
							localStorage.setItem('licenceNo',info['Obj'][0]['licenceNo']);
							me.wakeLock(false);
							
							$(this.getElementByXid('quickPassBtn')).css({"display" : "none"});
							$(this.getElementByXid('stopQPassBtn')).css({"display" : "block"});
							
						}
//						alert(localStorage.getItem('plateId'));
//						alert(localStorage.getItem('licenceNo'));
					},
					error: function(){
						justep.Util.hint("加载数据失败！");
					}
				});
			}else{
			
				$(this.getElementByXid('quickPassBtn')).css({"display" : "none"});
				$(this.getElementByXid('stopQPassBtn')).css({"display" : "block"});
				me.wakeLock(false);
			}
        }
	};
	
	Model.prototype.stopQPassBtnClick = function(event){
		this.wakeLock(true);
		this.comp("contentData").setValue("title",'停止监听');
		this.comp("contentData").setValue("x", '');
		this.comp("contentData").setValue("y", '');
		
		timer = null;
		$(this.getElementByXid('stopQPassBtn')).css({"display" : "none"});
		$(this.getElementByXid('quickPassBtn')).css({"display" : "block"});

	};
	
	return Model;
});
