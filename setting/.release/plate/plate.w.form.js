define(function(require){
require('$model/UI2/system/components/justep/model/model');
require('$model/UI2/system/components/bootstrap/form/form');
require('$model/UI2/system/components/justep/loadingBar/loadingBar');
require('$model/UI2/system/components/justep/button/button');
require('$model/UI2/system/components/justep/scrollView/scrollView');
require('$model/UI2/system/components/justep/input/input');
require('$model/UI2/system/components/justep/list/list');
require('$model/UI2/system/components/justep/panel/child');
require('$model/UI2/system/components/justep/windowDialog/windowDialog');
require('$model/UI2/system/components/justep/messageDialog/messageDialog');
require('$model/UI2/system/components/justep/panel/panel');
require('$model/UI2/system/components/justep/contents/content');
require('$model/UI2/system/components/justep/windowReceiver/windowReceiver');
require('$model/UI2/system/components/justep/select/select');
require('$model/UI2/system/components/justep/row/row');
require('$model/UI2/system/components/justep/titleBar/titleBar');
require('$model/UI2/system/components/justep/contents/contents');
require('$model/UI2/system/components/justep/data/data');
require('$model/UI2/system/components/justep/window/window');
var __parent1=require('$model/UI2/system/lib/base/modelBase'); 
var __parent0=require('$model/UI2/weixin/setting/plate'); 
var __result = __parent1._extend(__parent0).extend({
	constructor:function(contextUrl){
	this.__sysParam='true';
	this.__contextUrl=contextUrl;
	this.__id='';
	this.__cid='cBJB7ry';
	this._flag_='f9d732b3e26f5ebfd56f5f0b74b8e18d';
	this.callParent(contextUrl);
 var __Data__ = require("$UI/system/components/justep/data/data");new __Data__(this,{"autoLoad":false,"autoNew":false,"confirmDelete":true,"confirmRefresh":true,"defCols":{"id":{"define":"id","label":"id","name":"id","relation":"id","type":"String"},"licenceNo":{"define":"licenceNo","label":"licenceNo","name":"licenceNo","relation":"licenceNo","type":"String"},"vehicleModel":{"define":"vehicleModel","label":"vehicleModel","name":"vehicleModel","relation":"vehicleModel","type":"String"}},"directDelete":false,"events":{},"idColumn":"id","limit":20,"xid":"plateData"});
 new __Data__(this,{"autoLoad":false,"autoNew":true,"confirmDelete":true,"confirmRefresh":true,"defCols":{"licenceNo":{"define":"licenceNo","label":"oldPwd","name":"licenceNo","relation":"licenceNo","type":"String"},"vehicleModel":{"define":"vehicleModel","label":"vehicleModel","name":"vehicleModel","relation":"vehicleModel","type":"String"}},"directDelete":false,"events":{},"idColumn":"licenceNo","limit":20,"xid":"addData"});
 new __Data__(this,{"autoLoad":false,"autoNew":false,"confirmDelete":true,"confirmRefresh":true,"defCols":{"id":{"define":"id","label":"id","name":"id","relation":"id","type":"String"},"licId":{"define":"licId","label":"licId","name":"licId","relation":"licId","type":"String"},"licenceNo":{"define":"licenceNo","label":"licenceNo","name":"licenceNo","relation":"licenceNo","type":"String"}},"directDelete":false,"events":{"onCustomRefresh":"dataCustomRefresh"},"idColumn":"id","limit":20,"xid":"bindData"});
 new __Data__(this,{"autoLoad":true,"confirmDelete":true,"confirmRefresh":false,"defCols":{"options":{"define":"options","label":"数据","name":"options","relation":"options","type":"String"},"optionsValue":{"define":"optionsValue","label":"选中值","name":"optionsValue","relation":"optionsValue","type":"String"}},"directDelete":false,"events":{},"idColumn":"options","initData":"[{\"options\":\"客1（7座及以下）\",\"optionsValue\":\"客1\"},{\"options\":\"客2（8-19座）\",\"optionsValue\":\"客2\"},{\"options\":\"客3（20-39座）\",\"optionsValue\":\"客3\"},{\"options\":\"客4（40座及以上）\",\"optionsValue\":\"客4\"},{\"options\":\"货1（载重2吨及以下）\",\"optionsValue\":\"货1\"},{\"options\":\"货2（载重2吨-5吨，含5吨）\",\"optionsValue\":\"货2\"},{\"options\":\"货3（载重5-10吨，含10吨）\",\"optionsValue\":\"货3\"},{\"options\":\"货4（载重10-15吨，含15吨）\",\"optionsValue\":\"货4\"},{\"options\":\"货5（载重15吨以上）\",\"optionsValue\":\"货5\"}]","limit":20,"xid":"selectData"});
 var justep = require('$UI/system/lib/justep');if(!this['__justep__']) this['__justep__'] = {};if(!this['__justep__'].selectOptionsAfterRender)	this['__justep__'].selectOptionsAfterRender = function($element) {		var comp = justep.Component.getComponent($element);		if(comp) comp._addDefaultOption();	};if(!this['__justep__'].selectOptionsBeforeRender)	this['__justep__'].selectOptionsBeforeRender = function($element) {		var comp = justep.Component.getComponent($element);		if(comp) comp._optionsBeforeRender();	};
}}); 
return __result;});