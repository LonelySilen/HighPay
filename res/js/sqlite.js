define(function(require) {
	var $ = require("jquery");
	var justep = require("$UI/system/lib/justep");
	var SqliteUtil = require("$UI/weixin/res/js/sqliteUtil");

	var _instance = null;

	var DemoDB = function() {
//		在调试场景下，这里可以选择用HTML5的Web SQL Database，在Chrome浏览器远程调试时可以直接看到数据库内容
//		this.database = window.openDatabase("X5_DEMO_DB", null, null, -1);
		//this.database = window.sqlitePlugin.openDatabase({name : "SQLite"});
		this.database = window.sqlitePlugin.openDatabase({
			name : "SQLite"
		});
		/* 
		this.database.transaction(function(tx) {
			tx.executeSql("drop table demo_test");
			tx.executeSql("drop table demo_region");
		});
		*/
	};

	/**
	 * 这里构建单例，为了让多个页面共用同一个数据连接，避免死锁
	 */ 
	DemoDB.getInstance = function() {
		if (!_instance) {
			_instance = new DemoDB();
		}
		return _instance;
	};

	/**
	 * 获取数据库链接
	 */
	DemoDB.prototype.getDatabase = function() {
		return this.database;
	};

	/**
	 * 这里给出一个自动判断并初始化数据库的方案
	 */
	DemoDB.prototype.initData = function(onSuccess) {
		var db = this.getDatabase();
		// 检查表是否已存在
		var sqlCheckExists = "SELECT count(*) AS cnt FROM sqlite_master WHERE type = 'table' AND UPPER(name) in ('SQLite') ";
		SqliteUtil.executeSql(db, sqlCheckExists, null, function(res) {
			if (res.rows.item(0).cnt < 2) {
				// 如果不存在则获取初始化脚本
				require(["text!$UI/weixin/res/js/sqlite.sql"], function(data) {
					executeSqlFile(data);
				});
			} else {
				doSuccess();
			}
		});
		// 执行初始化脚本
		function executeSqlFile(content) {
			var sqls = content.split(";");
			SqliteUtil.executeBatch(db, sqls, null, function() {
				doSuccess();
			});
		}
		function doSuccess() {
			if ($.isFunction(onSuccess)) {
				onSuccess.call(this);
			}
		}
	};

	return DemoDB;
});