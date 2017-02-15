window.__justep.__ResourceEngine.loadCss([{url: '/v_a0287c7dcb5042458bf466369bff5367l_zh_CNs_d_m/system/components/bootstrap.min.css', include: '$model/system/components/bootstrap/lib/css/bootstrap,$model/system/components/bootstrap/lib/css/bootstrap-theme'},{url: '/v_3011384e777d4e6d8ef6318b4809b64cl_zh_CNs_d_m/system/components/comp.min.css', include: '$model/system/components/justep/input/css/datePickerPC,$model/system/components/justep/messageDialog/css/messageDialog,$model/system/components/justep/input/css/datePicker,$model/system/components/justep/row/css/row,$model/system/components/justep/attachment/css/attachment,$model/system/components/justep/common/css/scrollable,$model/system/components/justep/barcode/css/barcodeImage,$model/system/components/bootstrap/dropdown/css/dropdown,$model/system/components/justep/dataTables/css/dataTables,$model/system/components/justep/contents/css/contents,$model/system/components/justep/common/css/forms,$model/system/components/justep/locker/css/locker,$model/system/components/justep/menu/css/menu,$model/system/components/justep/scrollView/css/scrollView,$model/system/components/justep/loadingBar/loadingBar,$model/system/components/justep/dialog/css/dialog,$model/system/components/justep/bar/css/bar,$model/system/components/justep/popMenu/css/popMenu,$model/system/components/justep/lib/css/icons,$model/system/components/justep/toolBar/css/toolBar,$model/system/components/justep/popOver/css/popOver,$model/system/components/justep/panel/css/panel,$model/system/components/bootstrap/carousel/css/carousel,$model/system/components/justep/wing/css/wing,$model/system/components/bootstrap/scrollSpy/css/scrollSpy,$model/system/components/justep/titleBar/css/titleBar,$model/system/components/justep/numberSelect/css/numberList,$model/system/components/justep/list/css/list,$model/system/components/justep/dataTables/css/dataTables'}]);window.__justep.__ResourceEngine.loadJs(['/v_c76456e735dd4a3e933ef85e5b227401l_zh_CNs_d_m/system/core.min.js','/v_b753d974e6f0484f80b3ac3b2bff9580l_zh_CNs_d_m/system/common.min.js','/v_58a859f56af84087bcfcbc9c47c479a2l_zh_CNs_d_m/system/components/comp.min.js']);define(function(require){
require('$model/UI2/system/components/justep/model/model');
require('$model/UI2/system/components/justep/loadingBar/loadingBar');
require('$model/UI2/system/components/justep/button/button');
require('$model/UI2/system/components/justep/scrollView/scrollView');
require('$model/UI2/system/components/justep/controlGroup/controlGroup');
require('$model/UI2/system/components/justep/panel/child');
require('$model/UI2/system/components/justep/button/toggle');
require('$model/UI2/system/components/justep/messageDialog/messageDialog');
require('$model/UI2/system/components/justep/labelEdit/labelEdit');
require('$model/UI2/system/components/justep/panel/panel');
require('$model/UI2/system/components/justep/contents/content');
require('$model/UI2/system/components/justep/windowReceiver/windowReceiver');
require('$model/UI2/system/components/justep/titleBar/titleBar');
require('$model/UI2/system/components/justep/contents/contents');
require('$model/UI2/system/components/justep/data/data');
require('$model/UI2/system/components/justep/window/window');
var __parent1=require('$model/UI2/system/lib/base/modelBase'); 
var __parent0=require('$model/UI2/weixin/setting/setting'); 
var __result = __parent1._extend(__parent0).extend({
	constructor:function(contextUrl){
	this.__sysParam='true';
	this.__contextUrl=contextUrl;
	this.__id='';
	this.__cid='caaUJ3e';
	this._flag_='8e9ce0d0ba5f68f8a4189e1d0181bab5';
	this.callParent(contextUrl);
 var __Data__ = require("$UI/system/components/justep/data/data");new __Data__(this,{"autoLoad":true,"confirmDelete":true,"confirmRefresh":false,"defCols":{"options":{"define":"options","label":"数据","name":"options","relation":"options","type":"String"},"optionsValue":{"define":"optionsValue","label":"选中值","name":"optionsValue","relation":"optionsValue","type":"String"}},"directDelete":false,"events":{},"idColumn":"options","initData":"[{\"options\":\"1秒\",\"optionsValue\":\"1\"},{\"options\":\"3秒\",\"optionsValue\":\"3\"},{\"options\":\"5秒\",\"optionsValue\":\"5\"},{\"options\":\"10秒\",\"optionsValue\":\"10\"},{\"options\":\"20秒\",\"optionsValue\":\"20\"}]","limit":20,"xid":"selectData"});
 new __Data__(this,{"autoLoad":true,"confirmDelete":true,"confirmRefresh":false,"defCols":{"options":{"define":"options","label":"数据","name":"options","relation":"options","type":"String"},"optionsValue":{"define":"optionsValue","label":"选中值","name":"optionsValue","relation":"optionsValue","type":"String"}},"directDelete":false,"events":{},"idColumn":"options","initData":"[{\"options\":\"10秒\",\"optionsValue\":\"10\"}]","limit":20,"xid":"valueData"});
}}); 
return __result;});
