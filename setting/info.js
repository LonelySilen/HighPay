define(function(require){
	var $ = require("jquery");
	var justep = require("$UI/system/lib/justep");
	require("$UI/system/lib/cordova/cordova");
//	require("$UI/blshopApp/JS/Chart.js");
    require("cordova!cordova-plugin-device");
    var global = require("../res/js/global");
    var SqliteUtil = require("../res/js/sqliteUtil");
    var DemoDB = require("../res/js/sqlite");
    var tab_index = 0;//记录路由位置
	    var touch = require("../res/js/touch");
    var Message = require("$UI/system/components/justep/common/common");
    
	var Model = function(){
		this.callParent();
	};

	Model.prototype.modelLoad = function(event){
				this.swipeDelete();
//		var demoDB = DemoDB.getInstance();
//		demoDB.initData(function() {
////			me.infoDataSave();
//		});
		//this.infoDataCustomRefresh(event);
		this.comp("infoData").refreshData();
	};
	
	Model.prototype.modelUnLoad = function(event) {
		
	};

/*******information************************************************************/
	Model.prototype.infoDataCustomRefresh = function(event){
	
		var infoData = this.comp("infoData");
		var userId = localStorage.getItem('userId');
		if(localStorage.getItem('info_load')==='true'){
//			alert('by localStorage');

			// 标记当前刷新是异步执行的
			event.async = true;
			var demoDB = DemoDB.getInstance();
			var db = demoDB.getDatabase();

			var append = false;//event.options && event.options.append; // 是否数据追加模式
			//var limit = event.limit; // 分页行数
			var offset = event.offset; // 分页偏移
			
			// 执行SQL查询
			SqliteUtil.executeSql(db, "SELECT * FROM info_data where id = ? ;", [ userId ], onSuccess, onError);
			function onSuccess(res) {
				// 转换返回数据结果
				var table = SqliteUtil.rowsToTable(res.rows);
				if (offset === 0) {
					// 如果偏移为零则表明加载第一页，需要在Table中提供总行数，用于分页计算
					SqliteUtil.executeSql(db, "SELECT COUNT(*) cnt FROM info_data where id = ? ;", [userId], function(res) {
						SqliteUtil.setTableTotal(table, res.rows.item(0).cnt);
						doRefreshData();
					});
				} else {
					doRefreshData();
				}
				function doRefreshData() {//alert('table.rows.length='+table.rows.length);
					if(table.rows.length > 0){
					
						infoData.loadData(table, append);
					}
					// 异步执行模式下，加载数据后必须执行doRefreshAfter
					infoData.doRefreshAfter(true, event.options);
				}
			}
			function onError(msg) {
				infoData.doRefreshAfter(false, event.options);
			}
            
		}else{
//		alert('by internet');
			var argv = new Array("10103");//编号
			argv.push(localStorage.getItem('userId'));
        
			var query = global.getPrm(argv);
                        
			$.ajax({
				timeout : 5000,
				type: "post",
				url: require.toUrl(global.getUrl()),
				"data" : query,
				dataType: 'json',
				async: false,//使用同步方式，目前data组件有同步依赖
				"global" : false, 
				cache: false,
				success: function(info){//alert(query+JSON.stringify(info));
					infoData.loadData(info['Obj']);//将返回的数据加载到data组件
					
					infoData.each(function(param){
						var db = window.sqlitePlugin.openDatabase({
							name : "SQLite"
						});
						db.transaction(function(tx) {
							var id = param.row.val('id');
							var accountName = (param.row.val('accountName')!=='null')?param.row.val('accountName'):'';
							var mobileNo = (param.row.val('mobileNo')!=='null')?param.row.val('mobileNo'):'';
							var paymentAccount = (param.row.val('paymentAccount')!=='null')?param.row.val('paymentAccount'):'';
							var defCarNo = (param.row.val('defCarNo')!=='null')?param.row.val('defCarNo'):'';
							var driverName = (param.row.val('driverName')!=='null')?param.row.val('driverName'):'';
							var driverNo = (param.row.val('driverNo')!=='null')?param.row.val('driverNo'):'';
							
							//alert('id='+id+';accountName='+accountName+';mobileNo='+mobileNo+';paymentAccount='+paymentAccount+';driverName='+driverName+';driverNo='+driverNo);
							tx.executeSql("select id from info_data where id=? ;", [id], function(tx, res) {
								if(res.rows.length===0){ //已有数据不插入
									tx.executeSql("INSERT INTO info_data (id, accountName, mobileNo, paymentAccount, defCarNo, driverName, driverNo) VALUES (?,?,?,?,?,?,?)", 
													[ id, accountName, mobileNo, paymentAccount, defCarNo, driverName, driverNo ], 
													function(tx, res) {
														localStorage.setItem('info_load','true');//已经加载数据
													}, 
													function(e) {
														alert("ERROR: " + e.message);
														return false;
													});
								}
							});
                                        	
						});
					});
					
//					localStorage.setItem('info_load','true');//已经加载数据
				},
				error: function(){
					//throw justep.Error.create("加载数据失败");
					//justep.Util.hint("加载数据失败！");
					Message.message("aler", "加载数据失败！");
				}
			});	
        }
	};
/*******update************************************************************/
	Model.prototype.saveCommit = function(event){
		alert("保存数据成功！");
	};

	Model.prototype.mainDataCustomSave = function(event){
		alert("数据保存：请参考注释代码或者baas资料，手动进行修改");
	};
	
	

	Model.prototype.btn_update = function(event){
                var infoData = this.comp("infoData");
                //用户名和密码为空提示
                if ( $.trim(infoData.val("accountName")) === "") {
                        this.comp("msg_dlg").show({
                                "title" : "温馨提示",
                                "message" : "请输入账号"
                        });
                }else if ( $.trim(infoData.val("mobileNo")) === ""){
                		this.comp("msg_dlg").show({
                                "title" : "温馨提示",
                                "message" : "请输入手机号"
                        });
                }/*else if ( $.trim(infoData.val("paymentAccount")) === ""){
                		this.comp("msg_dlg").show({
                                "title" : "温馨提示",
                                "message" : "请输入支付宝账号"
                        });
                }else if ( $.trim(infoData.val("driverName")) === ""){
                		this.comp("msg_dlg").show({
                                "title" : "温馨提示",
                                "message" : "请输入驾驶员姓名"
                        });
                }else if ( $.trim(infoData.val("driverNo")) === ""){
                		this.comp("msg_dlg").show({
                                "title" : "温馨提示",
                                "message" : "请输入驾驶证号"
                        });
                }*/
                else
                {
                	
            			var argv = new Array("10104");//编号
            			argv.push(localStorage.getItem('userId'));
            			argv.push(infoData.val("paymentAccount"));
            			//argv.push(infoData.val("defCarNo"));
            			argv.push(infoData.val("driverName"));
            			argv.push(infoData.val("driverNo"));
                                                
                		var data = global.getPrm(argv);
                        
                        var is_back = false;
                        var self = this;
                        //ajax校验用户名和密码
                        $.ajax({
                                "type" : "post",
                                "async" : false,
                                "cache": false,
                                "dataType" : "json", 
                                "global":false, 
//                                "data":{
//                                        "user":infoData.val("username"), //POS提交用户名字段
//                                        "pwd":infoData.val("userpass")  //POS提交密码字段
//                                },
                                "data" : data,
                                //"contentType" : "application/json",
                                "url" : global.getUrl(), //PHP数据库校验用户名和密码是否正常
                                "success" : function(info) {
                                //alert('info='+JSON.stringify(info) );
                                        if(info['IsSuccess'] === true){          //php返回200，代表后端程序成功返回查询结果
//                                                localStorage.setItem('username',info['data']['username']);  //登录成功存储用户名到html localStorage
//                                                localStorage.setItem('shopname',info['data']['shopname']);  //登录成功存储中文名称到html localStorage
//                                                window.location.href="./index.w";   //登录成功，跳转到APP首页
                                        	self.comp("msg_dlg").show({
                                                "title" : "温馨提示",
                                                "message" : "更新成功"
                                        	 });
                                        	 is_back = true;
                                        }
                                        else if(info['IsSuccess'] === false) //返回400，代表数据库查询不到记录，用户名或密码
                                        {
                                                self.comp("msg_dlg").show({
                                                "title" : "温馨提示",
                                                "message" : "更新失败"
                                                });//alert(JSON.stringify(info));
                                        }        
                                },
                                "error": function(){
                                                //justep.Util.hint("网络连接异常！");
                                				Message.message("aler", "网络连接异常！");
                                        }
                                
                        });
                        if(is_back){
                        	infoData.each(function(param){
                        		var db = window.sqlitePlugin.openDatabase({
                        			name : "SQLite"
                        		});
                        		db.transaction(function(tx) {
                        			var id = param.row.val('id');
                        			var accountName = param.row.val('accountName')!==null?param.row.val('accountName'):'';
                        			var mobileNo = param.row.val('mobileNo')!==null?param.row.val('mobileNo'):'';
                        			var paymentAccount = param.row.val('paymentAccount')!==null?param.row.val('paymentAccount'):'';
                        			//var defCarNo = param.row.val('defCarNo')!==null?param.row.val('defCarNo'):" ";
                        			var driverName = param.row.val('driverName')!==null?param.row.val('driverName'):'';
                        			var driverNo = param.row.val('driverNo')!==null?param.row.val('driverNo'):'';
							
                        			//alert('id='+id+';accountName='+accountName+';mobileNo='+mobileNo+';paymentAccount='+paymentAccount+';driverName='+driverName+';driverNo='+driverNo);

                        			tx.executeSql("update info_data set accountName=?, mobileNo=?, paymentAccount=?, driverName=?, driverNo=?  where id="+id, 
													[ accountName, mobileNo, paymentAccount, driverName, driverNo ], function(tx, res) {}, function(e) {
														alert("ERROR: " + e.message);
														return false;
													});
                                        	
                        		});
                        	});
                        	this.comp("contents").to('infoCnt');
                        }
                }

        };


/*******pwd************************************************************/
    Model.prototype.btn_alterClick = function(event){
                var pwdData = this.comp("pwdData");
                //用户名和密码为空提示
                if ( $.trim(pwdData.val("oldPwd")) === "" || $.trim(pwdData.val("newPwd")) === "") {
                        this.comp("msg_dlg").show({
                                "title" : "温馨提示",
                                "message" : "请同时输入原密码和新密码"
                        });
                }
                else
                {
                		//window.location.href="./index.w";
                        var self = this;
                        var is_back = false;
                        //
                        $.support.cors = true;
                        
                        var argv = new Array("10105");//编号
            			argv.push(localStorage.getItem('userId'));
            			argv.push(pwdData.val("oldPwd"));
            			argv.push(pwdData.val("newPwd"));
                        
                        var data = global.getPrm(argv);
                        //ajax校验用户名和密码
                        $.ajax({
                                "type" : "post",
                                "async" : false,
                                "cache" : false,
                                "global" : false, 
                                "dataType" : "json",                              
                                "contentType" : "application/x-www-form-urlencoded; charset=utf-8",
//                                "data" : {
//                                        "accountName" : pwdData.val("userId"), //POS提交用户名字段
//                                        "accountPwd" : pwdData.val("userpass")  //POS提交密码字段
//                                },
                                "data" : data,
                                "url" : global.getUrl(), //PHP数据库校验用户名和密码是否正常
                                "success" : function(info) {
                                		//alert(info['IsSuccess']+JSON.stringify(info) );
                                        if(info['IsSuccess'] == true){          //php返回200，代表后端程序成功返回查询结果
                                                
                                        	self.comp("msg_dlg").show({
                                                "title" : "温馨提示",
                                                "message" : "修改成功"
                                        	 });
                                        	 is_back = true;
                                        }
                                        else if(info['IsSuccess'] == false) //返回400，代表数据库查询不到记录，用户名或密码
                                        {
                                                self.comp("msg_dlg").show({
                                                "title" : "温馨提示",
                                                "message" : "修改失败"
                                                });
                                                //alert(JSON.stringify(info));
                                        }        
                                },
                                "error": function(){
                                                //justep.Util.hint("网络连接异常！");
                                                Message.message("aler", "网络连接异常！");
                                        }
                                
                        });
                        if(is_back)
                        	this.comp("contents").to('infoCnt');
                }

        };

/*******other************************************************************/

	Model.prototype.infoCntActive = function(event){
		//更改Title
		this.comp('titleBar').set({
                        'title' : '注册信息'
        });
		tab_index = 0;
	};

	Model.prototype.updateCntActive = function(event){
		//更改Title
		//this.infoDataCustomRefresh(event);
		this.comp('titleBar').set({
                        'title' : '更新个人信息'
        });
		tab_index = 1;
	};

	Model.prototype.pwdCntActive = function(event){
		//更改Title
		this.comp('titleBar').set({
                        'title' : '修改密码'
        });
		tab_index = 1;
	};

	Model.prototype.backBtnClick = function(event){
		if(tab_index === 1){
			this.comp("contents").to('infoCnt');
		}
		else{
//			this.comp('winRec').windowCancel();
			justep.Shell.closePage();
//			justep.Shell.showPage("main");
		}
	};
	
	Model.prototype.swipeDelete = function(){
		var newsContentID = this.getIDByXID('newsContent');
		var swipeAreaSize = 100;
		var dx;
		touch.on('#' + newsContentID, 'touchstart', function(ev){
			//ev.preventDefault();
			var $swipNode = $('#' + newsContentID + " li").has(ev.target);
			dx = parseInt($swipNode.attr('swipeX') || "0");
		});
		
		touch.on('#'+ newsContentID, 'drag', function(ev){
			var $swipNode = $('#' + newsContentID + " li").has(ev.target);
			if(ev.direction === "left" || ev.direction === "right"){
				dx = dx || 0;
				var offx = dx + ev.x;
				if(offx < swipeAreaSize*-1){
					offx = swipeAreaSize*-1;
				}
				if(offx > 0){
					offx = 0;
				}
				if(ev.direction === "right" && $swipNode.hasClass('x-swipe-out')){
					$swipNode.css({'transform':'translate3d('+offx+'px,0,0)'});
				}else if(ev.direction === "left" && (!$swipNode.hasClass('x-swipe-out'))){
					$swipNode.css({'transform':'translate3d('+offx+'px,0,0)'});
				}
			}
		});
		touch.on('#'+ newsContentID, 'dragend', function(ev){
			var $swipNode = $('#' + newsContentID + " li").has(ev.target);
			if(ev.direction === "left"){
				$swipNode.css({'transform':'translate3d(-'+swipeAreaSize+'px,0,0)'});
				$swipNode.addClass('x-swipe-out');
				dx = swipeAreaSize*-1;
			}else if(ev.direction === "right"){
				$swipNode.removeClass('x-swipe-out');
				$swipNode.css({'transform':'translate3d(0,0,0)'});
				dx = 0;
			}
			$swipNode.attr('swipeX',dx);
		});
	};
	
	return Model;
});