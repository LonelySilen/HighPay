define(function(require) {
	var $ = require("jquery");
	var justep = require("$UI/system/lib/justep");
	var global = require("../res/js/global");
	require("$UI/system/lib/cordova/cordova");

	require("cordova!phonegap-plugin-barcodescanner");
	
	var Model = function() {
		this.callParent();
		this.STORE_ID = "com.justep.demo.advice.barcodedata";
	};

	Model.prototype.modelLoad = function(event){
		var me = this;
		document.addEventListener("deviceready", onDeviceReady, false);
		// 加载完成
		function onDeviceReady() {
			me.comp("scanBtn").set({disabled: false});

			if(localStorage.getItem(me.STORE_ID) != "")
				me.comp("fileData").loadData(JSON.parse(localStorage.getItem(me.STORE_ID)));
		}
	};		

	// 关闭功能
	Model.prototype.backBtnClick = function(event) {
		localStorage.setItem(this.STORE_ID, JSON.stringify(this.comp("fileData").toJson(false)));
		//justep.Portal.closeWindow();
		//window.location.href = '../index.w';
		history.back();
	};

	//扫描二维码
	Model.prototype.scanBtnClick = function(event) {
		var qr_data = this.comp("fileData");
//		this.comp('titleOutput').set({value: "扫描二维码"});
//		this.comp('codeOutput').set({value: ""});
//		this.comp('fileOutput').set({value: ""});
		
		var me = this;
		function onSuccess(result) {
			qr_data.newData({index : 0});
			qr_data.setValue("filePath", result.text);
			qr_data.setValue("fileName", result.format);
			qr_data.setValue('createTime', justep.Date.toString(new Date(), justep.Date.DEFAULT_FORMAT));
//			me.comp('titleOutput').set({value: "扫描成功！"});
//			me.comp('codeOutput').set({value: result.format});
//			me.comp('fileOutput').set({value: result.text});

			var is_export = false;
			var argv;
			var argc = result.text.split(";");
			if(argc[0]== 'gaosuru'){
				argv = new Array("10602");
				argv.push(localStorage.getItem('userId'));
				argv.push(argc[1]);
				argv.push(argc[2]);
				argv.push("k1");
			}else if(argc[0]== 'gaosuchu'){
				is_export = true;
				argv = new Array("10702");
				argv.push(localStorage.getItem('userId'));
				argv.push(argc[1]);
				argv.push(argc[2]);
			}else{
				return;
			}
			

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
				"url" : global.getUrl(), //PHP数据库校验用户名和密码是否正常
				"success" : function(info) {//justep.Util.hint(data);
					//alert("info['IsSuccess'] : "+info['IsSuccess']);
					
					if(info['IsSuccess'] === true){
						if(is_export === true){
							justep.Util.hint("发送出口扫描数据成功");
//							alert(JSON.stringify(info['Obj']['TrafficRecordID']));
							
							var params = {
									recordId : info['Obj']['TrafficRecordID'],
									// 将data中的一行数据传给对话框
									recordData : info['Obj']
							};
    
							//localStorage.setItem('recordId',info['Obj']['TrafficRecordID']);//已经加载数据
							justep.Shell.showPage("pay", params);
						}else{
							justep.Util.hint("发送入口扫描数据成功");
						}
					}
					else if(info['IsSuccess'] === false) //返回400，代表数据库查询不到记录，用户名或密码
					{
						justep.Util.hint("未扫描到您的车牌号");justep.Util.hint(JSON.stringify(info['Msg']));
					}        
				},
				"error": function(){
					justep.Util.hint("网络连接异常！");
				}
                                
			});
		}
		
		function onError(error) {
			justep.Util.hint("扫描失败！");
		}
		
		cordova.plugins.barcodeScanner.scan(onSuccess, onError);
		
//		cordova.plugins.barcodeScanner.encode(  
//      "TEXT_TYPE",   
//      "http://www.baidu.com",   
//      function(success) {  
//        alert("encode success: " + success);  
//      }, function(fail) { 
//        alert("encoding failed: " + fail);  
//      }  
//    );  
	};
	
//	// 打开列表内容
//	Model.prototype.fileListClick = function(event) {
//		this.comp('titleOutput').set({value: ""});
//		this.comp('codeOutput').set({value: ""});
//		this.comp('fileOutput').set({value: ""});
//
//		var data = this.comp("fileData");
//		var codeText = data.getValue("filePath");
//		if(codeText.indexOf("http") > -1){
//			window.open(codeText, '_blank', 'toolbarposition=top,location=no,enableViewportScale=yes');
//		}else{
//			alert(codeText);
//		}
//	};

//	// 清空历史记录
//	Model.prototype.deleteBtnClick = function(event) {
//		this.comp("fileData").clear();
//		this.comp('titleOutput').set({value: "清空历史记录"});
//		this.comp('codeOutput').set({value: ""});
//		this.comp('fileOutput').set({value: ""});
//		localStorage.setItem(this.STORE_ID, "");
//	};

	return Model;
});