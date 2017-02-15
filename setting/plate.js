define(function(require) {
	var $ = require("jquery");
	var justep = require("$UI/system/lib/justep");
	require("$UI/system/lib/cordova/cordova");
    require("cordova!cordova-plugin-device");
    var global = require("../res/js/global");
    var SqliteUtil = require("../res/js/sqliteUtil");
    var DemoDB = require("../res/js/sqlite");
    var touch = require("../res/js/touch");
    var tab_index = 0;//记录路由位置

    var Message = require("$UI/system/components/justep/common/common");

	var Model = function() {
		this.callParent();
	};
	
	Model.prototype.modelLoad = function(event){
		//debugger;
//		this.dataCustomRefresh(event);
		this.swipeDelete();
        this.comp("bindData").refreshData();
	};
	
	Model.prototype.getTabIndex = function() {
		//alert('tab_index: '+tab_index);
		return tab_index;
	};

//	Model.prototype.getModelType = function (typeId){
//		var selectData = this.comp("selectData");
//
//		var modelType = '未知';
//		selectData.each(function(param){
//			if(param.row.val('optionsValue')===typeId){
//				modelType = param.row.val('options');
//			}
//		});
//		return modelType;
//	};
	
	Model.prototype.bindDataLoad = function(event){
		
		var bindData = this.comp("bindData");
		var argv2 = new Array("10205");//编号
        argv2.push(localStorage.getItem('userId'));
        var query2 = global.getPrm(argv2);
        $.ajax({
        	timeout : 5000,
        	type: "post",
        	url: require.toUrl(global.getUrl()),
        	"data" : query2,
        	dataType: 'json',
        	async: false,//使用同步方式，目前data组件有同步依赖
        	cache: false,
        	"global":false,
        	success: function(info){
        	//alert(JSON.stringify(info));
        	//alert(JSON.stringify(info['Obj'][0]['id']));
        	//alert(JSON.stringify(info['Obj']));
        		bindData.loadData(info['Obj']);//将返回的数据加载到data组件
        		if(bindData.count()>0 && localStorage.getItem('plateId')!==bindData.getFirstRow().getID() ){
        			localStorage.setItem('plateId',bindData.getFirstRow().getID());//alert('plateId:'+localStorage.getItem('plateId'));
        			localStorage.setItem('licenceNo',bindData.getFirstRow().val('licenceNo'));
        			//alert(localStorage.getItem('licenceNo'));
        			
					var db = window.sqlitePlugin.openDatabase({
							name : "SQLite"
					});
					db.transaction(function(tx) {
						var id = localStorage.getItem('userId');
						var defCarNo = bindData.getFirstRow().val('licenceNo');							
							
						tx.executeSql("update info_data set defCarNo=?  where id=?", 
								[ defCarNo, id ], function(tx, res) {}, function(e) {
									alert("ERROR: " + e.message);
									return false;
								});
                                        	
					});
        		}
        	},

        	error:function(jqXHR, textStatus, errorThrown){	//alert(textStatus);
                        if(textStatus=="timeout"){  
                            //justep.Util.hint("加载数据超时！"); 
                            Message.message("aler", "加载数据超时！");
                        }else{   
                            //justep.Util.hint("加载数据失败！");
                            Message.message("aler", "加载数据失败！");
                        }  
            }
        });
	};
	
	Model.prototype.plateDataLoad = function(event){
		
		var is_back = false;
		var userId = localStorage.getItem('userId');
		var plateData = this.comp("plateData");
		if(localStorage.getItem('plate_load')==='true'){
//			alert('by localStorage');

			// 标记当前刷新是异步执行的
			event.async = false;
			var demoDB = DemoDB.getInstance();
			var db = demoDB.getDatabase();

			var append = event.options && event.options.append; // 是否数据追加模式
			var limit = event.limit; // 分页行数
			var offset = event.offset; // 分页偏移
			
			// 执行SQL查询
			SqliteUtil.executeSql(db, "SELECT * FROM plate_data where userId= ? LIMIT ? OFFSET ? ;", [ userId, limit, offset ], onSuccess, onError);
			function onSuccess(res) {
				// 转换返回数据结果
				var table = SqliteUtil.rowsToTable(res.rows);
				if (offset === 0) {
					// 如果偏移为零则表明加载第一页，需要在Table中提供总行数，用于分页计算
					SqliteUtil.executeSql(db, "SELECT COUNT(*) cnt FROM plate_data where userId = ? ;", [userId], function(res) {
						SqliteUtil.setTableTotal(table, res.rows.item(0).cnt);
						doRefreshData();
					});
				} else {
					doRefreshData();
				}
				function doRefreshData() {//alert('table.rows.length='+table.rows.length);
					if(table.rows.length > 0){
					
						plateData.loadData(table, append);
					}
					// 异步执行模式下，加载数据后必须执行doRefreshAfter
					plateData.doRefreshAfter(true, event.options);
				}
			}
			function onError(msg) {
				plateData.doRefreshAfter(false, event.options);
			}
            
		}else{
//			alert('by internet');
			var argv = new Array("10204");//编号
			argv.push(localStorage.getItem('userId'));
        
			var query = global.getPrm(argv);
                        
			$.ajax({
				timeout : 10000,
				type: "post",
				url: require.toUrl(global.getUrl()),
				"data" : query,
				dataType: 'json',
				async: false,//使用同步方式，目前data组件有同步依赖
				cache: false,
				"global":false,
				success: function(data){//alert(JSON.stringify(data['Obj']));
					plateData.loadData(data['Obj']);//将返回的数据加载到data组件
					if(plateData.count()<= 0){
						is_back = true;
					}else{
						plateData.each(function(param){
							var db = window.sqlitePlugin.openDatabase({
								name : "SQLite"
							});
							db.transaction(function(tx) {
								var id = param.row.val('id');
								var licenceNo = param.row.val('licenceNo')!==null?param.row.val('licenceNo'):" ";
								var vehicleModel = param.row.val('vehicleModel')!==null?param.row.val('vehicleModel'):" ";							
							
								tx.executeSql("select id from plate_data where id=? ;", [id], function(tx, res) {
									if(res.rows.length===0){ //已有数据不插入
										tx.executeSql("INSERT INTO plate_data (id, licenceNo, vehicleModel, userId ) VALUES (?,?,?,?)", 
													[ id, licenceNo, vehicleModel ], function(tx, res) {}, function(e) {
														alert("ERROR: " + e.message);
														return false;
													});
									}
								});
                                        	
							});
						});
					}
					if(plateData.getTotal()>0){
            		localStorage.setItem('plate_load','true');//已经加载数据
            		}
				},
				error: function(){
					//justep.Util.hint("加载数据失败！");
					Message.message("aler", "加载数据失败！");
				}
			});	
		}
        return is_back;
	};
		
	//加载分类数据
	Model.prototype.dataCustomRefresh = function(event){
	
		this.bindDataLoad(event);
		var is_back = false;
		is_back = this.plateDataLoad(event);
		
        if(is_back){
        	tab_index -= 1;
        	this.comp("contents").to('addCnt');
        }
	};
		
	Model.prototype.btn_addClick = function(event){
                var addData = this.comp("addData");
                //用户名和密码为空提示
                if ( $.trim(addData.val("licenceNo")) === "") {
                        this.comp("msg_dlg").show({
                                "title" : "温馨提示",
                                "message" : "请输入车牌号"
                        });
                }else if ( $.trim(addData.val("vehicleModel")) === ""){
                		this.comp("msg_dlg").show({
                                "title" : "温馨提示",
                                "message" : "请选择车型"
                        });
                }
                else
                {
                		var argv = new Array("10201");//编号
                        argv.push(localStorage.getItem('userId'));
                        argv.push(addData.val("licenceNo"));
                        argv.push(addData.val("vehicleModel"));

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
                                "data" : data,
                                //"contentType" : "application/json",
                                "url" : global.getUrl(), //PHP数据库校验用户名和密码是否正常
                                "success" : function(info) {
                                
                                        if(info['IsSuccess'] === true){          //php返回200，代表后端程序成功返回查询结果
//                                               
                                        	self.comp("msg_dlg").show({
                                                "title" : "温馨提示",
                                                "message" : "添加牌照成功"
                                        	 });
                                        	 is_back = true;
                                        }
                                        else if(info['IsSuccess'] === false) //返回400，代表数据库查询不到记录，用户名或密码
                                        {
                                                self.comp("msg_dlg").show({
                                                "title" : "温馨提示",
                                                "message" : "添加牌照失败"
                                                });
                                        }        
                                },
                                "error": function(){
                                                //justep.Util.hint("网络连接异常！");
                                                Message.message("aler", "网络连接异常！");
                                        }
                                
                        });
                        if(is_back){
                        	localStorage.setItem('plate_load','false');
                        	this.comp("bindData").refreshData();
                        	this.comp("contents").to('listCnt');
                        }
                }

        };


	Model.prototype.btn_bindClick = function(event){//绑定车牌
		
		var row = event.bindingContext.$object;
		
		var argv = new Array("10301");//编号
		var plate_id = row.val('id');
		var plate_no = row.val('licenceNo');
		
		
        argv.push(localStorage.getItem('userId'));
		argv.push(plate_id);
		argv.push(plate_no);
                                                
        var data = global.getPrm(argv);
        var is_refresh = false;
        //ajax校验
        $.ajax({
        	"type" : "post",
        	"async" : false,
        	"cache": false,
        	"dataType" : "json", 
        	"global":false, 
        	"data" : data,
        	//"contentType" : "application/json",
        	"url" : global.getUrl(),
        	"success" : function(info) {//alert(JSON.stringify(data));//alert(JSON.stringify(info));
                                
        		if(info['IsSuccess'] === true){          //php返回200，代表后端程序成功返回查询结果
        			//                                               
        			//justep.Util.hint("绑定成功！");
        			Message.message("aler", "绑定成功！");

        			is_refresh = true;
        		}
        		else if(info['IsSuccess'] === false) //返回400，代表数据库查询不到记录，用户名或密码
        		{
        			//justep.Util.hint("绑定失败！");
        			Message.message("aler", "绑定失败！");
        		}        
        	},
        	"error": function(){
        		//justep.Util.hint("网络连接异常！");
        		Message.message("aler", "网络连接异常！");
        	}
                                
        });
        if(is_refresh === true){
        	this.comp("bindData").refreshData();
        }
	};
	
	Model.prototype.div_delClick = function(event){
	
		var row = event.bindingContext.$object;
		
		var argv = new Array("10203");//编号
		var plate_id = row.val('id');
		
		argv.push(plate_id);
        argv.push(localStorage.getItem('userId'));
                                                
        var data = global.getPrm(argv);
                        
        var is_back = false;
        var self = this;
        //ajax校验
        $.ajax({
        	"type" : "post",
        	"async" : false,
        	"cache": false,
        	"dataType" : "json", 
        	"global":false, 
        	"data" : data,
        	//"contentType" : "application/json",
        	"url" : global.getUrl(), //PHP数据库校验用户名和密码是否正常
        	"success" : function(info) {
                                
        		if(info['IsSuccess'] === true){          //php返回200，代表后端程序成功返回查询结果
        			//                                               
        			self.comp("msg_dlg").show({
        				"title" : "温馨提示",
        				"message" : "删除牌照成功"
        			});
        			is_back = true;
        		}
        		else if(info['IsSuccess'] === false) //返回400，代表数据库查询不到记录，用户名或密码
        		{
        			self.comp("msg_dlg").show({
        				"title" : "温馨提示",
        				"message" : "删除牌照失败"
        			});
        		}        
        	},
        	"error": function(){
        		//justep.Util.hint("网络连接异常！");
        		Message.message("aler", "网络连接异常！");
        	}
                                
        });
        if(is_back){
        
        	var db = window.sqlitePlugin.openDatabase({
        		name : "SQLite"
        	});
        	db.transaction(function(tx) {
        		tx.executeSql("delete from plate_data where id=? ;", 
        				[ plate_id ], function(tx, res) {}, function(e) {
        					alert("ERROR: " + e.message);
        					return false;
        				});
        	});
        	//localStorage.setItem('plate_load','false');
        	this.comp("bindData").refreshData();
        	this.comp("contents").to('listCnt');
        }

	};
	
	Model.prototype.swipeDelete = function(){
		var listCntID = this.getIDByXID('listCnt');
		var swipeAreaSize = 100;
		var dx;
		touch.on('#' + listCntID, 'touchstart', function(ev){
			//ev.preventDefault();
			var $swipNode = $('#' + listCntID + " li").has(ev.target);
			dx = parseInt($swipNode.attr('swipeX') || "0");
		});
		
		touch.on('#'+ listCntID, 'drag', function(ev){
			var $swipNode = $('#' + listCntID + " li").has(ev.target);
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
		touch.on('#'+ listCntID, 'dragend', function(ev){
			var $swipNode = $('#' + listCntID + " li").has(ev.target);
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
		
	//进入列表页
	Model.prototype.listClick = function(event){
		alert('listClick');
	};


	Model.prototype.listCntActive = function(event){
		this.comp('titleBar1').set({
                        'title' : '车牌管理'
        });
        $(this.getElementByXid('btn_plate_add')).css({"display" : "block"});
		tab_index = 0;
	};
	
	Model.prototype.addCntActive = function(event){
		this.comp('titleBar1').set({
                        'title' : '添加车牌'
        });
        $(this.getElementByXid('btn_plate_add')).css({"display" : "none"});   
		tab_index = tab_index + 1;
	};
	
	Model.prototype.plate_addClick = function(event){
		this.comp("contents").to('addCnt');
		
		
	};
		
	Model.prototype.backBtnClick = function(event){
		if(tab_index === 1){
			this.comp("contents").to('listCnt');
		}
		else{
//			this.comp('winRec').windowCancel();
			justep.Shell.closePage();
//			justep.Shell.showPage("main");
		}
	};	

	Model.prototype.valueBtnClick = function(event){
		justep.Util.hint(this.comp("addData").val("vehicleModel"));

	};


	return Model;
});