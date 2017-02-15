define(function(require){
	var $ = require('jquery');
	var WindowContainer = require("$UI/system/components/justep/windowContainer/windowContainer");
	return {
		loadContent:function(contents, xid, url, fn){
			var content = contents.getContent(xid);
			if (!content) {
				content = contents.add({
					xid : xid
				});
			}
			var parentNode = content.$domNode.get(0);
			var compose = new WindowContainer({
				parentNode : parentNode,
				src : url,
				onLoad : function() {
					fn && fn();
					content.on("onActive", function() {
						if (compose.getInnerModel()) {
							compose.getInnerModel().fireEvent('onActive');
						}
					});
				},
				onLoadError : function(err) {
					fn && fn(err);
				}
			});
			content.innerContainer = compose;
			return content;
		},
		attachDoubleClickExitApp:function(conditionFn){
			var exitDtd = $.Deferred();
			if(this.attached === true){
				exitDtd.reject();
			}else{
				this.attached = true;
				document.addEventListener("deviceready", function() {
					var exitAppTicker = 0;
					var listener = function(){
						if(conditionFn()){
							if(exitAppTicker === 0){
								exitAppTicker++;
								var msg = $('<span style="display: none;border-radius: 50px;padding: 7px;left: 50%;margin-left: -80px;background-color: #383838;color: #F0F0F0;z-index:9999;position:fixed;bottom:25px;">再按一次退出</span>').appendTo('body');
								msg.fadeIn(400).delay(2000).fadeOut(400,function(){
									exitAppTicker = 0;
									msg.remove();
								});
							}else if(exitAppTicker == 1){
								exitDtd.resolve();
//								navigator.app.exitApp();
								navigator.moveTaskToBack(true);
							}	
						}else{
							history.back();
						}
					};
					document.addEventListener('backbutton', listener, false);
					$(window).on('beforeunload', function(){
						document.removeEventListener('backbutton', listener, false);
				    });
		        }, false);
			}
			return exitDtd.promise();
		}
	};
});