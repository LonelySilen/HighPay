define(function(require) {
	var $ = require("jquery");
	var justep = require("$UI/system/lib/justep");

	require("$UI/system/lib/cordova/cordova");
	require("cordova!cordova-plugin-device");
	require("cordova!com.brodysoft.sqlitePlugin");
	
	function cloneObj(oldObj) {
		if (typeof (oldObj) != "object")
			return oldObj;
		if (oldObj == null)
			return oldObj;
		var newObj = new Object();
		for ( var i in oldObj) {
			newObj[i] = cloneObj(oldObj[i]);
		}
		return newObj;
	}
	;
	/**
	 * Sqlite工具类
	 */
	var SqliteUtil = {
		/**
		 * 执行SQL脚本，扩展实现了统一的错误提示
		 */
		executeSql : function(db, sql, param, onSuccess, onError) {
			db.transaction(function(tx) {
				tx.executeSql(sql, param, function(tx, res) {
					doSuccess(res);
				}, function(tx, res) {
					try {
						return true; // 如果执行过程发生错误，事务回滚
					} finally {
						doError(res.message);
					}
				});
			});
			function doSuccess(res) {
				if ($.isFunction(onSuccess)) {
					onSuccess.call(this, res);
				}
			}
			function doError(msg) {
				justep.Util.hint(msg, {
					"type" : "danger"
				});
				if ($.isFunction(onError)) {
					onError.call(this, msg);
				} 
			}
		},
		/**
		 * 批执行SQL脚本，扩展实现了统一的错误提示
		 */
		executeBatch : function(db, sqls, params, onSuccess, onError) {
			function doSuccess() {
				if ($.isFunction(onSuccess)) {
					onSuccess.call(this);
				}
			}
			function doError(msg) {
				justep.Util.hint(msg, {
					"type" : "danger"
				});
				if ($.isFunction(onError)) {
					onError.call(this, msg);
				} 
			}
			
			if (sqls.length == 0) {
				doSuccess();
				return;
			}
			
			var sqlsLength = sqls.length;
			var sqlsSuccessCount = 0;
			function doSqlsSuccess() {
				sqlsSuccessCount++;
				if (sqlsSuccessCount == sqlsLength) {
					doSuccess();
				}
			}
			db.transaction(function(tx) {
				for ( var i = 0; i < sqlsLength; i++) {
					var sql = sqls[i];
					var param = params && params[i];
					if ($.trim(sql) == "") {
						doSqlsSuccess();
					} else {
						tx.executeSql(sql, param, function(tx, res) {
							doSqlsSuccess();
						}, function(tx, res) {
							try {
								return true; // 如果执行过程发生错误，事务回滚
							} finally {
								doError(res.message);
							}
						});
					}
				}
			});
		},
		/**
		 * sqlite查询结果转换成Table格式
		 */
		rowsToTable : function(rows) {
			var table = {
				"@type" : "table",
				"rows" : []
			}
			for ( var i = 0, len = rows.length; i < len; i++) {
				table.rows.push(cloneObj(rows.item(i)));
			}
			return table;
		},
		/**
		 * sqlite查询结果转换成树形Table格式
		 */
		rowsToTreeTable : function(rows, idColumn, parentColumn) {
			var table = {
				"@type" : "table",
				"rows" : []
			}

			function addRowChild(parent, child) {
				if (!parent.hasOwnProperty("rows")) {
					parent.rows = [];
				}
				parent.rows.push(child);
			}

			var parentMap = {};
			var childrenMap = {};

			for ( var i = 0, len = rows.length; i < len; i++) {
				var row = cloneObj(rows.item(i));

				var idValue = row[idColumn];
				var parentValue = row[parentColumn];

				// find parent
				if (parentMap.hasOwnProperty(parentValue)) {
					var parentRow = parentMap[parentValue];
					addRowChild(parentRow, row);
				} else {
					table.rows.push(row);
				}
				// find children
				if (childrenMap.hasOwnProperty(idValue)) {
					var children = childrenMap[idValue];
					for ( var j = 0, len = children.length; j < len; j++) {
						var childRow = children[j];
						addRowChild(row, childRow);
						table.rows.splice($.inArray(childRow, table.rows), 1);
					}
				}
				parentMap[idValue] = row;
				if (parentValue != null) {
					if (!childrenMap.hasOwnProperty(parentValue)) {
						childrenMap[parentValue] = [];
					}
					childrenMap[parentValue].push(row);
				}
			}
			return table;
		},
		/**
		 * 获取数据保存的SQL语句
		 */
		getDataSaveSqls : function(data, tableName, columns) {
			var idColumn = data.idColumn;
			columns = (typeof(columns) === "undefined" || columns === null) ? data.getColumnIDs() : columns;
			if (typeof(columns) == "string") {
				columns = columns.split(",");
			}

			// 构造插入SQL
			var insertValues = [];
			for (var i = 0; i < columns.length; i++) {
				insertValues.push("?");
			}
			var insertSql = "INSERT INTO " + tableName + "(" + columns.join(",") + ") VALUES (" + insertValues.join(",") + ")";
			
			// 构造更新SQL
			var updateValues = [];
			for (var k = 0; k < columns.length; k++) {
				updateValues.push(columns[k] + "=?");
			}
			var updateSql = "UPDATE " + tableName + " SET " + updateValues.join(",") + " WHERE " + idColumn + "=? ";
			
			// 构造删除SQL
			var deleteSql = "DELETE FROM " + tableName + " WHERE " + idColumn + "=? ";
				
			function getRowValues(row) {
				var values = [];
				for (var i = 0; i < columns.length; i++) {
					var column = columns[i];
					var value;
					if (column == idColumn) {
						value = row.userdata.id.value;
					} else {
						value = row[column].value;
					}
					values.push((typeof(value) == "undefined") ? null : value);
				}
				return values;
			}

			var sqls = [];
			var params = [];
			
			var changedData = data.toJson(true);//alert('changedData: '+JSON.stringify(data.toJson()));alert('changedData.rows.length: '+changedData.rows.length);
			for (var j = 0, len = changedData.rows.length; j < len; j++) {
				var row = changedData.rows[j];
				var keyValue = row.userdata.id.changed == 1 ? row.userdata.id.originalValue : row.userdata.id.value;
				//alert('keyValue:'+keyValue);alert('row.userdata.recordState:'+row.userdata.recordState);
				if (row.userdata.recordState == "new") {
					sqls.push(insertSql);
					params.push(getRowValues(row));
				} else if (row.userdata.recordState == "edit") {
					sqls.push(updateSql);
					params.push(getRowValues(row).concat(keyValue));
				} else if (row.userdata.recordState == "delete") {
					sqls.push(deleteSql);
					params.push([keyValue]);
				}
			}//alert('sqls: '+sqls);
			return {
				"sqls" : sqls,
				"params" : params
			};
		},
		/**
		 * 保存多个数据集
		 */
		saveDatas : function(db, datas, tableNames, columns, onSuccess, onError) {
			var sqls = [];
			var params = [];
			for (var i = 0; i < datas.length; i++) {//alert('datas[i]: '+JSON.stringify(datas[i].toJson()));
				// 获取保存脚本
				var saveSqls = this.getDataSaveSqls(datas[i], tableNames[i], columns[i]);
				sqls = sqls.concat(saveSqls.sqls);
				params = params.concat(saveSqls.params);
			}
			this.executeBatch(db, sqls, params, onSuccess, onError);
		},
		/**
		 * 保存数据集
		 * 	data - 数据集
		 * 	tableName - 要保存的物理表名
		 *  columns - 要保存的列名，以逗号分隔；默认保存所有列
		 */
		saveData : function(db, data, tableName, columns, onSuccess, onError) {//alert('data: '+JSON.stringify(data.toJson()));
			this.saveDatas(db, [data], [tableName], [columns], onSuccess, onError);
		},
		/**
		 * 设置Table总行数
		 */
		setTableTotal : function(table, total) {
			table["userdata"] = table["userdata"] ? table["userdata"] : {};
			table["userdata"]["sys.count"] = total;
		}
		
	};

	return SqliteUtil;
});