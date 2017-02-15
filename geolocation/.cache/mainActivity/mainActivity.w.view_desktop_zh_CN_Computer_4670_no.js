window.__justep.__ResourceEngine.loadCss([{url: '/v_4670_nol_zh_CNs_desktopd_pc/system/components/comp.min.css', include: '$model/system/components/justep/row/css/row,$model/system/components/justep/attachment/css/attachment,$model/system/components/justep/barcode/css/barcodeImage,$model/system/components/justep/panel/css/panel,$model/system/components/justep/common/css/scrollable,$model/system/components/justep/scrollView/css/scrollView,$model/system/components/justep/input/css/datePickerPC,$model/system/components/justep/contents/css/contents,$model/system/components/justep/popMenu/css/popMenu,$model/system/components/justep/lib/css/icons,$model/system/components/justep/titleBar/css/titleBar,$model/system/components/justep/dataTables/css/dataTables,$model/system/components/justep/dialog/css/dialog,$model/system/components/justep/messageDialog/css/messageDialog,$model/system/components/justep/toolBar/css/toolBar,$model/system/components/justep/popOver/css/popOver,$model/system/components/justep/loadingBar/loadingBar,$model/system/components/justep/input/css/datePicker,$model/system/components/justep/dataTables/css/dataTables,$model/system/components/justep/wing/css/wing,$model/system/components/bootstrap/scrollSpy/css/scrollSpy,$model/system/components/justep/menu/css/menu,$model/system/components/justep/numberSelect/css/numberList,$model/system/components/justep/list/css/list,$model/system/components/bootstrap/carousel/css/carousel,$model/system/components/bootstrap/dropdown/css/dropdown,$model/system/components/justep/common/css/forms,$model/system/components/justep/bar/css/bar'},{url: '/v_4670_nol_zh_CNs_desktopd_pc/system/components/bootstrap.min.css', include: '$model/system/components/bootstrap/lib/css/bootstrap,$model/system/components/bootstrap/lib/css/bootstrap-theme'}]);window.__justep.__ResourceEngine.loadJs(['/v_4670_nol_zh_CNs_desktopd_pc/system/components/comp2.min.js','/v_4670_nol_zh_CNs_desktopd_pc/system/components/comp.min.js','/v_4670_nol_zh_CNs_desktopd_pc/system/common.min.js','/v_4670_nol_zh_CNs_desktopd_pc/system/core.min.js']);define(function(require){
require('$model/UI2/system/components/justep/loadingBar/loadingBar');
require('$model/UI2/system/components/justep/panel/panel');
require('$model/UI2/system/components/justep/panel/child');
require('$model/UI2/system/components/justep/scrollView/scrollView');
require('$model/UI2/system/components/justep/windowDialog/windowDialog');
require('$model/UI2/system/components/justep/contents/content');
require('$model/UI2/system/components/justep/model/model');
require('$model/UI2/system/components/justep/window/window');
require('$model/UI2/system/components/bootstrap/table/table');
require('$model/UI2/system/components/justep/data/data');
require('$model/UI2/system/components/justep/contents/contents');
require('$model/UI2/system/components/justep/button/button');
require('$model/UI2/system/components/justep/popOver/popOver');
var __parent1=require('$model/UI2/system/lib/base/modelBase'); 
var __parent0=require('$model/UI2/weixin/geolocation/mainActivity'); 
var __result = __parent1._extend(__parent0).extend({
	constructor:function(contextUrl){
	this.__sysParam='true';
	this.__contextUrl=contextUrl;
	this.__id='';
	this.__cid='cRr6zUz';
	this._flag_='8d77f691b42942e517a9ca8fc6460e55';
	this.callParent(contextUrl);
 var __Data__ = require("$UI/system/components/justep/data/data");new __Data__(this,{"autoLoad":false,"autoNew":false,"confirmDelete":true,"confirmRefresh":true,"defCols":{"Longitude":{"define":"Longitude","label":"Longitude","name":"Longitude","relation":"Longitude","rules":{"number":true},"type":"Double"},"Name":{"define":"Name","label":"Name","name":"Name","relation":"Name","type":"String"},"UpdateTime":{"define":"UpdateTime","label":"UpdateTime","name":"UpdateTime","relation":"UpdateTime","rules":{"datetime":true},"type":"DateTime"},"id":{"define":"id","label":"id","name":"id","relation":"id","type":"String"},"latitude":{"define":"latitude","label":"latitude","name":"latitude","relation":"latitude","rules":{"number":true},"type":"Double"}},"directDelete":false,"events":{"onCustomRefresh":"gpsDataLoad"},"idColumn":"id","limit":5,"xid":"gpsData"});
 new __Data__(this,{"autoLoad":false,"autoNew":true,"confirmDelete":true,"confirmRefresh":true,"defCols":{"content":{"define":"content","label":"col0","name":"content","relation":"content","type":"String"}},"directDelete":false,"events":{},"idColumn":"content","limit":20,"xid":"fileData"});
 new __Data__(this,{"autoLoad":false,"autoNew":true,"confirmDelete":true,"confirmRefresh":true,"defCols":{"h":{"define":"h","label":"col4","name":"h","relation":"h","type":"String"},"s":{"define":"s","label":"col5","name":"s","relation":"s","type":"String"},"title":{"define":"title","label":"col0","name":"title","relation":"title","type":"String"},"x":{"define":"x","label":"col1","name":"x","relation":"x","type":"String"},"y":{"define":"y","label":"col2","name":"y","relation":"y","type":"String"},"z":{"define":"z","label":"col3","name":"z","relation":"z","type":"String"}},"directDelete":false,"events":{},"idColumn":"title","limit":20,"xid":"contentData"});
}}); 
return __result;});
