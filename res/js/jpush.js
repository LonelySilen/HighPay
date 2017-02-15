define(function(require) {
	var $ = require('jquery');
	require("cordova!cordova-plugin-device");
    var SqliteUtil = require("./sqliteUtil");
    var DemoDB = require("./sqlite");
    var global = require("./global");
    
	var JPushInstance = function() {
		if (window.plugins && window.plugins.jPushPlugin) {
			document.addEventListener("deviceready", this.onDeviceReady.bind(this), false);
			document.addEventListener("jpush.openNotification", this.onOpenNotification.bind(this), false);
			document.addEventListener("jpush.receiveNotification", this.onReceiveNotification.bind(this), false);
			document.addEventListener("jpush.receiveMessage", this.onReceiveMessage.bind(this), false);
		}
	};
	
	//hcr 解决第一次获取失败的问题
	JPushInstance.prototype.getRegistrationID = function(){
		 var dtd = $.Deferred();
		 if (this.registrationID){
			 dtd.resolve(this.registrationID);
		 }else{
			 if (window.plugins && window.plugins.jPushPlugin){
				 window.plugins.jPushPlugin.getRegistrationID(function(registrationID) {
					 self.registrationID = registrationID;
					 if (self.registrationID){
						 dtd.resolve(self.registrationID);	 
					 }else{
						 dtd.reject();
					 }
				 });
			 }else{
				 dtd.reject();
			 }
		 }
		 return dtd.promise();
	};
	
	JPushInstance.prototype.onResume = function() {
		window.plugins.jPushPlugin.onResume(this);
	};
	
	JPushInstance.prototype.onResumePush = function() {
		window.plugins.jPushPlugin.resumePush();
	};
	
	JPushInstance.prototype.onStopPush = function() {
		window.plugins.jPushPlugin.stopPush();
	};
	
	JPushInstance.prototype.onDeviceReady = function() {
		var self = this;
		window.plugins.jPushPlugin.init();
		window.plugins.jPushPlugin.getRegistrationID(function(registrationID) {
			self.registrationID = registrationID;
		});
		if (device.platform == "Android") {
			window.plugins.jPushPlugin.setDebugMode(false);
			window.plugins.jPushPlugin.setApplicationIconBadgeNumber(0);
		} else {
			window.plugins.jPushPlugin.setDebugMode(false);
			window.plugins.jPushPlugin.setApplicationIconBadgeNumber(0);
		}
	};

	JPushInstance.prototype.onOpenNotification = function(event) {//打开通知
		var alertContent;
		if (device.platform == "Android") {
			alertContent = window.plugins.jPushPlugin.openNotification.alert;
		} else {
			alertContent = event.aps.alert;
		}
		window.plugins.jPushPlugin.setApplicationIconBadgeNumber(0);
		//justep.Util.hint('onOpenNotification: '+alertContent);
	};

	JPushInstance.prototype.onReceiveNotification = function(event) {//发送通知
		var alertContent;
        if(device.platform == "Android"){
        	alertContent = window.plugins.jPushPlugin.receiveNotification.alert;
        }else{
        	alertContent   = event.aps.alert;
        }
        window.plugins.jPushPlugin.setApplicationIconBadgeNumber(0);
		//justep.Util.hint('onReceiveNotification: '+alertContent);
	};

	JPushInstance.prototype.onReceiveMessage = function() {//自定义消息
		var message;
        if(device.platform == "Android"){
       		 message = window.plugins.jPushPlugin.receiveMessage.message;
        }else{
              message   = event.content;
        }
        window.plugins.jPushPlugin.setApplicationIconBadgeNumber(0);
		//justep.Util.hint('onReceiveMessage: '+message);
		
		if(message === 'UserOtherAddressLogin'){
			localStorage.clear();
			justep.Shell.closePage();//.showPage("login");
//			navigator.app.exitApp();
			return false;
		}
		var db = window.sqlitePlugin.openDatabase({
			name : "SQLite"
		});
		db.transaction(function(tx) {
			var id =  justep.UUID.createUUID();
			var content = message;					
			var recTime = global.getTime(1); 
			var userId = localStorage.getItem('userId');
			tx.executeSql("select id from notify_data where id=? ;", [id], function(tx, res) {
				if(res.rows.length===0){ //已有数据不插入
					tx.executeSql("INSERT INTO notify_data (id, content, recTime, userId) VALUES (?,?,?,?)", 
								[ id, content, recTime, userId], function(tx, res) {}, function(e) {
									alert("ERROR: " + e.message);
									return false;
								});
				}
			});
                    	
		});
		
	};

	return new JPushInstance();
});