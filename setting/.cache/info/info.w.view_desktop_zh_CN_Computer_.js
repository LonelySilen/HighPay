window.__justep.__ResourceEngine.loadCss([{url: '/v_1dab416eb7ac4d70b664dfe15d202546l_zh_CNs_desktopd_/system/components/comp.min.css', include: '$model/system/components/justep/row/css/row,$model/system/components/justep/attachment/css/attachment,$model/system/components/justep/barcode/css/barcodeImage,$model/system/components/justep/panel/css/panel,$model/system/components/justep/common/css/scrollable,$model/system/components/justep/scrollView/css/scrollView,$model/system/components/justep/input/css/datePickerPC,$model/system/components/justep/contents/css/contents,$model/system/components/justep/popMenu/css/popMenu,$model/system/components/justep/lib/css/icons,$model/system/components/justep/titleBar/css/titleBar,$model/system/components/justep/dataTables/css/dataTables,$model/system/components/justep/dialog/css/dialog,$model/system/components/justep/messageDialog/css/messageDialog,$model/system/components/justep/toolBar/css/toolBar,$model/system/components/justep/popOver/css/popOver,$model/system/components/justep/loadingBar/loadingBar,$model/system/components/justep/input/css/datePicker,$model/system/components/justep/dataTables/css/dataTables,$model/system/components/justep/wing/css/wing,$model/system/components/bootstrap/scrollSpy/css/scrollSpy,$model/system/components/justep/menu/css/menu,$model/system/components/justep/numberSelect/css/numberList,$model/system/components/justep/list/css/list,$model/system/components/bootstrap/carousel/css/carousel,$model/system/components/bootstrap/dropdown/css/dropdown,$model/system/components/justep/common/css/forms,$model/system/components/justep/bar/css/bar'},{url: '/v_cb57a37ba6174c83ae87b31d6f0f2a4dl_zh_CNs_desktopd_/system/components/bootstrap.min.css', include: '$model/system/components/bootstrap/lib/css/bootstrap,$model/system/components/bootstrap/lib/css/bootstrap-theme'}]);window.__justep.__ResourceEngine.loadJs(['/v_4f5ca5b505b3478392ad8074d4b6f6d8l_zh_CNs_desktopd_/system/components/comp2.min.js','/v_6ed21e949cae4743a7b99bfb4bc1d910l_zh_CNs_desktopd_/system/components/comp.min.js','/v_a8a37434a9c64829a174f59d08d7755bl_zh_CNs_desktopd_/system/common.min.js','/v_d81cb503ce1d49e292642b1a78c771bcl_zh_CNs_desktopd_/system/core.min.js']);define(function(require){
require('$model/UI2/system/components/justep/loadingBar/loadingBar');
require('$model/UI2/system/components/justep/windowReceiver/windowReceiver');
require('$model/UI2/system/components/justep/row/row');
require('$model/UI2/system/components/justep/panel/panel');
require('$model/UI2/system/components/justep/window/window');
require('$model/UI2/system/components/justep/input/password');
require('$model/UI2/system/components/justep/data/data');
require('$model/UI2/system/components/justep/titleBar/titleBar');
require('$model/UI2/system/components/justep/contents/contents');
require('$model/UI2/system/components/bootstrap/form/form');
require('$model/UI2/system/components/justep/panel/child');
require('$model/UI2/system/components/justep/scrollView/scrollView');
require('$model/UI2/system/components/justep/contents/content');
require('$model/UI2/system/components/justep/messageDialog/messageDialog');
require('$model/UI2/system/components/justep/model/model');
require('$model/UI2/system/components/justep/button/button');
require('$model/UI2/system/components/justep/input/input');
var __parent1=require('$model/UI2/system/lib/base/modelBase'); 
var __parent0=require('$model/UI2/weixin/setting/info'); 
var __result = __parent1._extend(__parent0).extend({
	constructor:function(contextUrl){
	this.__sysParam='true';
	this.__contextUrl=contextUrl;
	this.__id='';
	this.__cid='cIvI36j';
	this._flag_='428028645bfee290368d84c5aa387acb';
	this.callParent(contextUrl);
 var __Data__ = require("$UI/system/components/justep/data/data");new __Data__(this,{"autoLoad":false,"autoNew":false,"confirmDelete":true,"confirmRefresh":true,"defCols":{"accountName":{"define":"accountName","label":"accountName","name":"accountName","relation":"accountName","type":"String"},"defCarNo":{"define":"defCarNo","label":"defCarNo","name":"defCarNo","relation":"defCarNo","type":"String"},"driverName":{"define":"driverName","label":"driverName","name":"driverName","relation":"driverName","type":"String"},"driverNo":{"define":"driverNo","label":"driverNo","name":"driverNo","relation":"driverNo","type":"String"},"id":{"define":"id","label":"id","name":"id","relation":"id","type":"String"},"mobileNo":{"define":"mobileNo","label":"mobileNo","name":"mobileNo","relation":"mobileNo","rules":{"integer":true},"type":"Integer"},"paymentAccount":{"define":"paymentAccount","label":"paymentAccount","name":"paymentAccount","relation":"paymentAccount","type":"String"}},"directDelete":true,"events":{"onCustomRefresh":"infoDataCustomRefresh"},"idColumn":"id","initData":"[]","limit":20,"xid":"infoData"});
 new __Data__(this,{"autoLoad":false,"autoNew":true,"confirmDelete":true,"confirmRefresh":true,"defCols":{"newPwd":{"define":"newPwd","label":"newPwd","name":"newPwd","relation":"newPwd","type":"String"},"oldPwd":{"define":"oldPwd","label":"oldPwd","name":"oldPwd","relation":"oldPwd","type":"String"}},"directDelete":false,"events":{},"idColumn":"oldPwd","limit":20,"xid":"pwdData"});
}}); 
return __result;});
