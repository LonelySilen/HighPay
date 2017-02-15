define(function(require){
	var $ = require("jquery");
	var justep = require("$UI/system/lib/justep");
	require("$UI/system/lib/cordova/cordova");
//	require("$UI/blshopApp/JS/Chart.js");
    require("cordova!cordova-plugin-device");
    var global = require("../res/js/global");
    var SqliteUtil = require("../res/js/sqliteUtil");
    var DemoDB = require("../res/js/sqlite");

	
    var Message = require("$UI/system/components/justep/common/common");
        
	var Model = function(){
		this.callParent();
	};

	Model.prototype.modelLoad = function(event){
		//alert(localStorage.getItem('listening'));
		if(localStorage.getItem('listening')==='false'){
			this.comp("toggle_listen").set({
				'checked' : null
			});
		}else{
			this.comp("toggle_listen").set({
				'checked' : 'true'
			});
		}
		if(localStorage.getItem('offscreen')!=='false'){
			this.comp("toggle_screen").set({
				'checked' : 'true'
			});
		}else{
			this.comp("toggle_screen").set({
				'checked' : null
			});
		}
	};
	
	Model.prototype.modelUnLoad = function(event) {
		
	};


	Model.prototype.backBtnClick = function(event){
//		justep.Shell.showPage("main");
		//justep.Shell.closePage();
		this.comp('winRec').windowCancel();
	};
	
	Model.prototype.toggle_listenChange = function(event){
		var state = this.comp("toggle_listen").value.toString();
		if(state === '0'){//alert(state);
			Message.message("aler", "软件将不会实时判断您的位置，但您只能扫描入口二维码通过");
			localStorage.setItem('listening', false);
		}else{//alert(state);
			localStorage.setItem('listening', true);
			Message.message("aler", "软件将实时判断您的位置，但不需要扫码即可通过高速入口");
		}
	};

	Model.prototype.toggle_screenChange = function(event){
		var state = this.comp("toggle_screen").value.toString();
		if(state === '0'){//alert(state);
			Message.message("aler", "开启快速通过时，屏幕仍可以自动熄灭");
			localStorage.setItem('offscreen', false);
		}else{//alert(state);
			localStorage.setItem('offscreen', true);
			Message.message("aler", "开启快速通过时，屏幕将不会自动熄灭");
		}
	};
/*************************************************************/
	Model.prototype.toggleBtnClick = function(event){
		justep.Util.hint(this.comp("toggle1").value);
	};
	
	Model.prototype.toggle1Change = function(event){
		var state = this.comp("toggle1").value;
		if(state !== '1'){
			this.comp("select1").set({
				"disabled":true
			});
		}else{
			this.comp("select1").set({
				"disabled":false
			});
		}
	};
	
	Model.prototype.valueBtnClick = function(event){
		justep.Util.hint(this.comp("valueData").val("optionsValue"));

	};
	
/*************************************************************/



	Model.prototype.li_exitClick = function(event){
	
		this.comp("msg_dlg").on('onClose', function(event) {
			if(event.button === 'ok'){
				this.msg_dlgOK(event);
			}
		}, this);
		
		this.comp("msg_dlg").show({
			type : 'OKCancel',
			title : '提示信息',
			message : '确定要退出当前账号？'
		});

	};
	
	Model.prototype.msg_dlgOK = function(event){
		
		//localStorage.removeItem('userId');
		localStorage.clear();
		location.reload();
		//navigator.app.exitApp();

	};


	Model.prototype.toggle_cacheChange = function(event){
		var state = this.comp("toggle_cache").value.toString();
		if(state === '1'){
			var self = this;
			window.cache.clear(
					function() {
						//alert('清除缓存成功');
						self.comp("msg_dlg").show({
							type : 'OK',
							title : '提示信息',
							message : '清除缓存成功！'
						});
					}, function() {
						//alert('清除缓存失败');
						self.comp("msg_dlg").show({
							type : 'OK',
							title : '提示信息',
							message : '清除缓存失败！'
						});
					}
			);
			this.comp("toggle_cache").set({
				"value":0
			});
		}
	};


	return Model;
});