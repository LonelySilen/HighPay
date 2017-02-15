window.__justep.__ResourceEngine.loadCss([{url: '/v_0438adf4a5514fcaa45770dbd670e317l_zh_CNs_desktopd_/system/components/comp.min.css', include: '$model/system/components/justep/row/css/row,$model/system/components/justep/attachment/css/attachment,$model/system/components/justep/barcode/css/barcodeImage,$model/system/components/justep/panel/css/panel,$model/system/components/justep/common/css/scrollable,$model/system/components/justep/scrollView/css/scrollView,$model/system/components/justep/input/css/datePickerPC,$model/system/components/justep/contents/css/contents,$model/system/components/justep/popMenu/css/popMenu,$model/system/components/justep/lib/css/icons,$model/system/components/justep/titleBar/css/titleBar,$model/system/components/justep/dataTables/css/dataTables,$model/system/components/justep/dialog/css/dialog,$model/system/components/justep/messageDialog/css/messageDialog,$model/system/components/justep/toolBar/css/toolBar,$model/system/components/justep/popOver/css/popOver,$model/system/components/justep/loadingBar/loadingBar,$model/system/components/justep/input/css/datePicker,$model/system/components/justep/dataTables/css/dataTables,$model/system/components/justep/wing/css/wing,$model/system/components/bootstrap/scrollSpy/css/scrollSpy,$model/system/components/justep/menu/css/menu,$model/system/components/justep/numberSelect/css/numberList,$model/system/components/justep/list/css/list,$model/system/components/bootstrap/carousel/css/carousel,$model/system/components/bootstrap/dropdown/css/dropdown,$model/system/components/justep/common/css/forms,$model/system/components/justep/bar/css/bar'},{url: '/v_2325f65bf7204751b269390eac4667d7l_zh_CNs_desktopd_/system/components/bootstrap.min.css', include: '$model/system/components/bootstrap/lib/css/bootstrap,$model/system/components/bootstrap/lib/css/bootstrap-theme'}]);window.__justep.__ResourceEngine.loadJs(['/v_44bda6bdcaea43469b8e1243db8630cdl_zh_CNs_desktopd_/system/components/comp2.min.js','/v_6fee04b016ec4dbfb9dc6fffea34ab2dl_zh_CNs_desktopd_/system/components/comp.min.js','/v_30a5a5bf8eaf4838bb2af40e5927fa5al_zh_CNs_desktopd_/system/common.min.js','/v_8d5e0daf0a1447468000e0e874626ab7l_zh_CNs_desktopd_/system/core.min.js']);define(function(require){
require('$model/UI2/system/components/justep/loadingBar/loadingBar');
require('$model/UI2/system/components/justep/windowReceiver/windowReceiver');
require('$model/UI2/system/components/justep/row/row');
require('$model/UI2/system/components/justep/panel/panel');
require('$model/UI2/system/components/justep/list/list');
require('$model/UI2/system/components/justep/windowDialog/windowDialog');
require('$model/UI2/system/components/justep/window/window');
require('$model/UI2/system/components/justep/data/data');
require('$model/UI2/system/components/justep/titleBar/titleBar');
require('$model/UI2/system/components/justep/contents/contents');
require('$model/UI2/system/components/bootstrap/form/form');
require('$model/UI2/system/components/justep/panel/child');
require('$model/UI2/system/components/justep/scrollView/scrollView');
require('$model/UI2/system/components/justep/contents/content');
require('$model/UI2/system/components/justep/messageDialog/messageDialog');
require('$model/UI2/system/components/justep/select/select');
require('$model/UI2/system/components/justep/model/model');
require('$model/UI2/system/components/justep/button/button');
require('$model/UI2/system/components/justep/input/input');
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
 new __Data__(this,{"autoLoad":true,"confirmDelete":true,"confirmRefresh":false,"defCols":{"options":{"define":"options","label":"数据","name":"options","relation":"options","type":"String"},"optionsValue":{"define":"optionsValue","label":"选中值","name":"optionsValue","relation":"optionsValue","type":"String"}},"directDelete":false,"events":{},"idColumn":"options","initData":"[{\"options\":\"客1（7座及以上）\",\"optionsValue\":\"11\"},{\"options\":\"客2（8-19座）\",\"optionsValue\":\"12\"},{\"options\":\"客3（20-39座）\",\"optionsValue\":\"13\"},{\"options\":\"客4（40座及以上）\",\"optionsValue\":\"14\"},{\"options\":\"货1（载重2吨及以下）\",\"optionsValue\":\"21\"},{\"options\":\"货2（载重2吨-5吨，含5吨）\",\"optionsValue\":\"22\"},{\"options\":\"货3（载重5-10吨，含10吨）\",\"optionsValue\":\"23\"},{\"options\":\"货4（载重10-15吨，含15吨）\",\"optionsValue\":\"24\"}]","limit":20,"xid":"selectData"});
 var justep = require('$UI/system/lib/justep');if(!this['__justep__']) this['__justep__'] = {};if(!this['__justep__'].selectOptionsAfterRender)	this['__justep__'].selectOptionsAfterRender = function($element) {		var comp = justep.Component.getComponent($element);		if(comp) comp._addDefaultOption();	};if(!this['__justep__'].selectOptionsBeforeRender)	this['__justep__'].selectOptionsBeforeRender = function($element) {		var comp = justep.Component.getComponent($element);		if(comp) comp._optionsBeforeRender();	};
}}); 
return __result;});
