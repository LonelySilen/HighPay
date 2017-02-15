define(function(require){
	var $ = require("jquery");
	var justep = require("$UI/system/lib/justep");
	
	var Model = function(){
		this.callParent();
	};
	//完成按钮
	Model.prototype.btn_returnClick = function(event){
		justep.Shell.closePage();
		//justep.Shell.showPage("main");
//		this.comp('winRec').windowCancel();
//		history.go(-2);
	};

	return Model;
});