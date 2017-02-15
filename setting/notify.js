define(function(require) {
	var $ = require("jquery");
	var justep = require("$UI/system/lib/justep");
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

		this.swipeDelete();
		
	};
		
	Model.prototype.backBtnClick = function(event){
//		this.comp('winRec').windowCancel();
		justep.Shell.closePage();
//		justep.Shell.showPage("main");
	};	
		
	//加载分类数据
	Model.prototype.notifyDataLoad = function(event){
	
			var notification = this.comp("notification");
			
			var userId = localStorage.getItem('userId');
			
			// 标记当前刷新是异步执行的
			event.async = false;
			var demoDB = DemoDB.getInstance();
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

	Model.prototype.div_delClick = function(event){
	
	};

	Model.prototype.btn_clearClick = function(event){
		//justep.Util.hint("清空消息记录！");
		Message.message("aler", "清空消息记录！");
	};	


	return Model;
});