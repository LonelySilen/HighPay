define(function(require) {
	var $ = require("jquery");
	var justep = require("$UI/system/lib/justep");
    var global = require("../res/js/global");
    var SqliteUtil = require("../res/js/sqliteUtil");
    var DemoDB = require("../res/js/sqlite");
    var touch = require("../res/js/touch");
    
    var Message = require("$UI/system/components/justep/common/common");

	var Model = function() {
		this.callParent();
	};
	
	Model.prototype.modelLoad = function(event){
		//debugger;
		this.swipeDelete();
		this.recordDataLoad();
	};
	
	Model.prototype.recordDataLoad = function(event){
		
		var is_back = false;
		
		var recordData = this.comp("recordData");
//		if(localStorage.getItem('record_load')==='true'){
//			alert('by localStorage');
//
//			// 标记当前刷新是异步执行的
//			event.async = false;
//			var demoDB = DemoDB.getInstance();
//			var db = demoDB.getDatabase();
//
//			var append = event.options && event.options.append; // 是否数据追加模式
//			var limit = event.limit; // 分页行数
//			var offset = event.offset; // 分页偏移
//			
//			// 执行SQL查询
//			SqliteUtil.executeSql(db, "SELECT * FROM record_data LIMIT ? OFFSET ? ;", [ limit, offset ], onSuccess, onError);
//			function onSuccess(res) {
//				// 转换返回数据结果
//				var table = SqliteUtil.rowsToTable(res.rows);
//				if (offset === 0) {
//					// 如果偏移为零则表明加载第一页，需要在Table中提供总行数，用于分页计算
//					SqliteUtil.executeSql(db, "SELECT COUNT(*) cnt FROM record_data ;", [], function(res) {
//						SqliteUtil.setTableTotal(table, res.rows.item(0).cnt);
//						doRefreshData();
//					});
//				} else {
//					doRefreshData();
//				}
//				function doRefreshData() {//alert('table.rows.length='+table.rows.length);
//					if(table.rows.length > 0){
//					
//						recordData.loadData(table, append);
//					}
//					// 异步执行模式下，加载数据后必须执行doRefreshAfter
//					recordData.doRefreshAfter(true, event.options);
//				}
//			}
//			function onError(msg) {
//				recordData.doRefreshAfter(false, event.options);
//			}
//            
//		}else{
			//alert('by internet');
			var argv = new Array("10705");//编号
			argv.push(localStorage.getItem('userId'));
			argv.push("10");//每页显示条数
			argv.push("1");//页数
        
			var query = global.getPrm(argv);
			$.ajax({
				timeout : 5000,
                "type" : "post",
                "async" : false,
                "cache": false,
                "dataType" : "json", 
                "global":false, 
                "data" : query,
				"url" : global.getUrl(), 
				success: function(data){//alert(JSON.stringify(data['Obj']));
					recordData.loadData(data['Obj']);//将返回的数据加载到data组件
					if(recordData.count()<= 0){
						is_back = true;
					}else{
						recordData.each(function(param){
							var db = window.sqlitePlugin.openDatabase({
								name : "SQLite"
							});
							db.transaction(function(tx) {
								var id = param.row.val('id');
								var UserId = param.row.val('UserId')!==null?param.row.val('UserId'):" ";
								var ExitTollGateId = param.row.val('ExitTollGateId')!==null?param.row.val('ExitTollGateId'):"未知";
								var EnterTollGateId = param.row.val('EnterTollGateId')!==null?param.row.val('EnterTollGateId'):"未知";
								var ExitTollGateName = param.row.val('ExitTollGateName')!==null?param.row.val('ExitTollGateName'):"未知";
								var EnterTollGateName = param.row.val('EnterTollGateName')!==null?param.row.val('EnterTollGateName'):"未知";
								var ExitLicenseNo = (param.row.val('ExitLicenseNo')!==null && param.row.val('ExitLicenseNo')!=="")?param.row.val('ExitLicenseNo'):"未知";
								var Money = param.row.val('Money')!==null?param.row.val('Money'):" ";
								var VehicleModel = param.row.val('VehicleModel')!==null?param.row.val('VehicleModel'):"未知";
								var EnterDateTime = param.row.val('EnterDateTime')!==null?param.row.val('EnterDateTime'):" ";
								var ExitDateTime = param.row.val('ExitDateTime')!==null?param.row.val('ExitDateTime'):" ";						
							//alert('0'+id+';1'+UserId+';2'+ExitTollGateId+';3'+EnterTollGateId+';4'+ExitTollGateName+';5'+EnterTollGateName+';6'+ExitLicenseNo+';7'+Money+';8'+VehicleModel+';9'+EnterDateTime+';10'+ExitDateTime);
								tx.executeSql("select id from record_data where id=? ;", [id], function(tx, res) {
									if(res.rows.length===0){ //已有数据不插入
										tx.executeSql("INSERT INTO record_data (id, UserId, ExitTollGateId, EnterTollGateId, ExitTollGateName, EnterTollGateName, ExitLicenseNo, Money, VehicleModel, EnterDateTime, ExitDateTime ) VALUES (?,?,?,?,?,?,?,?,?,?,?)", 
													[ id, UserId, ExitTollGateId, EnterTollGateId, ExitTollGateName, EnterTollGateName, ExitLicenseNo, Money, VehicleModel, EnterDateTime, ExitDateTime ], function(tx, res) {}, function(e) {
														alert("ERROR: " + e.message);
														return false;
													});
									}
								});
                                        	
							});
						});
					}
            		//localStorage.setItem('record_load','true');//已经加载数据
				},
				error: function(XMLHttpRequest){
					//justep.Util.hint("加载数据失败！");
					Message.message("aler", "加载数据失败！");
					 //alert(XMLHttpRequest.status);
                     //alert(XMLHttpRequest.readyState);
                     //0:请求未初始化;1：请求已经建立,但是还没有发送;
                     //1:请求已经建立,但是还没有发送(还没有调用 send());
                     //2:请求已发送,正在处理中(通常现在可以从响应中获取内容头);
                     //3:请求在处理中(通常响应中已有部分数据可用了,但是服务器还没有完成响应的生成);
                     //4:响应已完成(您可以获取并使用服务器的响应了)
				}
			});	
//		}
        return is_back;
	};

	Model.prototype.div_delClick = function(event){
		
//		var row = event.bindingContext.$object;
//		
//		var argv = new Array("10203");//编号
//		var plate_id = row.val('id');
//		
//		argv.push(plate_id);
//        argv.push(localStorage.getItem('userId'));
//                                                
//        var data = global.getPrm(argv);
//                        
//        var is_back = false;
//        var self = this;
//        //ajax校验
//        $.ajax({
//        	"type" : "post",
//        	"async" : false,
//        	"cache": false,
//        	"dataType" : "json", 
//        	"global":false, 
//        	"data" : data,
//        	//"contentType" : "application/json",
//        	"url" : global.getUrl(), //PHP数据库校验用户名和密码是否正常
//        	"success" : function(info) {
//                                
//        		if(info['IsSuccess'] === true){          //php返回200，代表后端程序成功返回查询结果
//        			//                                               
//        			self.comp("msg_dlg").show({
//        				"title" : "温馨提示",
//        				"message" : "删除牌照成功"
//        			});
//        			is_back = true;
//        		}
//        		else if(info['IsSuccess'] === false) //返回400，代表数据库查询不到记录，用户名或密码
//        		{
//        			self.comp("msg_dlg").show({
//        				"title" : "温馨提示",
//        				"message" : "删除牌照失败"
//        			});
//        		}        
//        	},
//        	"error": function(){
//        		justep.Util.hint("网络连接异常！");
//        	}
//                                
//        });
//        if(is_back){
//        
//        	var db = window.sqlitePlugin.openDatabase({
//        		name : "SQLite"
//        	});
//        	db.transaction(function(tx) {
//        		tx.executeSql("delete from plate_data where id=? ;", 
//        				[ plate_id ], function(tx, res) {}, function(e) {
//        					alert("ERROR: " + e.message);
//        					return false;
//        				});
//        	});
//        	//localStorage.setItem('plate_load','false');
//        	this.comp("bindData").refreshData();
//        	this.comp("contents").to('listCnt');
//        }

	};
	
	Model.prototype.swipeDelete = function(){
	
		var listCntID = this.getIDByXID('listCnt');
		var swipeAreaSize = 100;
		var dx;
		touch.on('#' + listCntID, 'touchstart', function(ev){
			ev.preventDefault();
			var $swipNode = $('#' + listCntID + " li").has(ev.target);
			dx = parseInt($swipNode.attr('swipeX') || "0");
		});
		
		touch.on('#'+ listCntID, 'drag', function(ev){
			var $swipNode = $('#' + listCntID + " li").has(ev.target);
			if(ev.direction === "left" || ev.direction === "right"){
				dx = dx || 0;
				var offx = dx + ev.x;
				//debugger;
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
		
	Model.prototype.backBtnClick = function(event){
	
//		this.comp('winRec').windowCancel();
		justep.Shell.closePage();
//		justep.Shell.showPage("main");
	};	
	
	Model.prototype.btn_clearClick = function(event){alert(123);
		//justep.Util.hint("清空消息记录！");
		Message.message("aler", "清空消息记录！");
	};	
	
	return Model;
});