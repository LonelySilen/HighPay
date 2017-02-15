define(function(require){
	var $ = require("jquery");
	var justep = require("$UI/system/lib/justep");
	require("cordova!com.justep.cordova.plugin.alipay");
	var global = require("../res/js/global");
	
    var Message = require("$UI/system/components/justep/common/common");
      
	var timer =null;
	
	var Model = function(){
		this.callParent();
	};
	
	Model.prototype.modelLoad = function(event){

//		timer = setInterval(this.comp("recordData").refreshData(),5000);
	};

	Model.prototype.sendDataCustomRefresh = function(event){

	};
		
	Model.prototype.btn_backClick = function(event){

	
//		this.comp('winRec').windowCancel();
//		history.back();
		//justep.Shell.closePage("pay");
		
		if(timer !== null){
			clearInterval(timer);
			timer = null;
		}
		//justep.Shell.showPage("main");
		justep.Shell.closePage();
	};
	
	Model.prototype.sendClick = function(event){
		/*
		1、配送方式按钮点击事件
		2、显示配送列表
		 */
		this.comp("popOver").show();
	};
	
	Model.prototype.sendLiClick = function(event){
		/*
		1、配送列表点击事件
		2、选中配送方式，关闭配送列表
		*/
//		this.comp("sendData").setValue("fState",0);
//		var row = event.bindingContext.$object; 
//		row.val("fState",1);
//		var title=row.val("fSendName")+" "+row.val("fCost");		
//		$("span[xid=sendTitle]", this.getRootNode()).text(title);
		this.comp("popOver").hide();
	};
	
	//打开成功页面
	Model.prototype.confirmBtnClick = function(event){
		/*
		1、确认按钮点击事件
		2、打开成功页面
		*/

//		var url =  require.toUrl("./success.w");
//		this.comp('winDlg').open({src:url});
		//window.location.href = url;
		//this.payOrderByAlipay();
		

/*********************************************************************************************/
			var url =  require.toUrl("./success.w");
			var me = this;
			var argv;
			argv = new Array("10708");
			argv.push(recordId);
			argv.push(localStorage.getItem('userId'));

			var data = global.getPrm(argv);
			//ajax校验用户名和密码
			$.ajax({
				//"timeout" : 3000,
				"type" : "post",
				"async" : false,
				"cache": false,
				"dataType" : "json", 
				"global":false,
				"data" : data,
				//"contentType" : "application/json",
				"url" : global.getUrl(), //PHP数据库校验用户名和密码是否正常
				"success" : function(data) {//justep.Util.hint(data);
					//alert("info['IsSuccess'] : "+info['IsSuccess']);
					
					if(data['IsSuccess'] === true){
					
						//justep.Util.hint("获取支付数据成功");
						//Message.message("aler", "支付成功！");
//						alert("获取支付数据成功");
						me.comp('winDlg').open({src:url});
//						alert('Obj: '+JSON.stringify(data['Obj']));
//						alert('count: '+recordData.count());
					}
//					else if(data['IsSuccess'] === false) //返回400，代表数据库查询不到记录，用户名或密码
//					{
//						justep.Util.hint("获取支付数据失败");
//					}        
				},
				"error": function(){
						//justep.Util.hint("网络连接异常！");
						Message.message("aler", "网络连接异常！");
				}
                                
			});
		

/*********************************************************************************************/
	};
	
	Model.prototype.payOrderByAlipay = function() {
		this.comp("confirmBtn").disabled = true;
		var me =this;
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
		 *///alert("进入支付宝");
		if (!navigator.alipay) {
			Message.message("aler", "未安装支付宝");
			return;
		}
		var me = this;
		var money = this.comp("recordData").val("Money");//alert('启动支付宝...');
		var notifyUrl = "http://rmkj022.vicp.cc:9011/notify_url.aspx";//location.origin;
		var tradeNo = justep.UUID.createUUID();
		var alipay = navigator.alipay;
		alipay.pay({
			"seller" : "rmzfb@rmtech.com.cn", // 卖家支付宝账号或对应的支付宝唯一用户号
			"subject" : "高速支付", // 商品名称
			"body" : "支付测试", // 商品详情
			"price" : money, // 金额，单位为RMB
			"tradeNo" : tradeNo, // 唯一订单号
			"timeout" : "30m", // 超时设置
			"notifyUrl" : notifyUrl
		}, // 服务器通知路径
		function(message) {
			
			var responseCode = parseInt(message);
			if (responseCode === 9000) {localStorage.setItem('tradeNo',tradeNo);
				me.confirmBtnClick();
//				var url =  require.toUrl("./success.w");
//				me.comp('winDlg').open({src:url});
			} else if (!isNaN(responseCode)) {
				me.comp("confirmBtn").disabled = false;
				if(responseCode === 8000){
					me.comp("messageDlg").show({
							type : 'OK',
							title : '提示信息',
							message : "支付异常：正在处理中"
						});
				}else if(responseCode === 4000){
					me.comp("messageDlg").show({
							type : 'OK',
							title : '提示信息',
							message : "支付异常：订单支付失败"
						});
				}else if(responseCode === 6001){
					me.comp("messageDlg").show({
							type : 'OK',
							title : '提示信息',
							message : "支付异常：用户中途取消"
						});
				}else if(responseCode === 6002){
					me.comp("messageDlg").show({
							type : 'OK',
							title : '提示信息',
							message : "支付异常：网络连接出错"
						});
				}
				
				
			} else {
				//alert("支付不成功");
				me.comp("confirmBtn").disabled = false;
				me.comp("messageDlg").show({
							type : 'OK',
							title : '提示信息',
							message : "支付异常"
						});
			
			}
		}, function(msg) {
			Message.message("aler", "支付异常："+msg);
			
		});

	};

	var recordId = null;
	//onParamsReceive事件中接收参数
	Model.prototype.modelParamsReceive = function(event){
		
//		alert(event.params.recordId);
//		alert(JSON.stringify(event.params.recordData));
//		if (event.params.data){
//        this.comp("recordData").loadData([event.params.recordData]);
//        this.comp("recordData").first();
//    }
		recordId = event.params.recordId;
		//this.comp("recordData").refreshData();
		var me = this;
		//me.recordDataCustomRefresh(event);
		function refresh(){
			me.recordDataCustomRefresh(event);
		}
		timer = setInterval(refresh,5000);
	};


	
	Model.prototype.recordDataCustomRefresh = function(event){

		var recordData = this.comp("recordData");

		if(recordId !== null){
			
			if(recordData.getCount()>0 && recordData.val("Money")!==undefined){//alert(JSON.stringify(recordData.toJson()));
				this.comp("confirmBtn").set({disabled: false});
				//alert("清除定时器");
				
				clearInterval(timer);
				timer = null;
				return false;
			}
		
			var argv;
			argv = new Array("10704");
			argv.push(localStorage.getItem('userId'));
			argv.push(recordId);

			var data = global.getPrm(argv);
			//ajax校验用户名和密码
			$.ajax({
				"timeout" : 3000,
				"type" : "post",
				"async" : false,
				"cache": false,
				"dataType" : "json", 
				"global":false,
				"data" : data,
				//"contentType" : "application/json",
				"url" : global.getUrl(), //PHP数据库校验用户名和密码是否正常
				"success" : function(data) {//justep.Util.hint(data);
					//alert(data['IsSuccess']);
					//alert('Obj: '+JSON.stringify(data['Obj']));
					
					if(data['IsSuccess'] === true){
					
						//justep.Util.hint("获取支付数据成功");
						//Message.message("aler", "获取支付数据成功！");
//						alert("获取支付数据成功");
						recordData.loadData(data['Obj']);//将返回的数据加载到data组件
						recordData.refreshData();
						$("#span_total").text("￥"+recordData.val("Money"));
//						alert('Obj: '+JSON.stringify(data['Obj']));
//						alert('count: '+recordData.count());
					}
//					else if(data['IsSuccess'] === false) //返回400，代表数据库查询不到记录，用户名或密码
//					{
//						justep.Util.hint("获取支付数据失败");
//					}        
				},
				"error": function(){
						//justep.Util.hint("网络连接异常！");
						Message.message("aler", "网络连接异常！");
				}
                                
			});
		}
	};



	
	return Model;
});