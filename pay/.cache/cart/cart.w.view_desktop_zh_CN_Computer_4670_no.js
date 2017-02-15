window.__justep.__ResourceEngine.loadCss([{url: '/v_4670_nol_zh_CNs_desktopd_pc/system/components/comp.min.css', include: '$model/system/components/justep/row/css/row,$model/system/components/justep/attachment/css/attachment,$model/system/components/justep/barcode/css/barcodeImage,$model/system/components/justep/panel/css/panel,$model/system/components/justep/common/css/scrollable,$model/system/components/justep/scrollView/css/scrollView,$model/system/components/justep/input/css/datePickerPC,$model/system/components/justep/contents/css/contents,$model/system/components/justep/popMenu/css/popMenu,$model/system/components/justep/lib/css/icons,$model/system/components/justep/titleBar/css/titleBar,$model/system/components/justep/dataTables/css/dataTables,$model/system/components/justep/dialog/css/dialog,$model/system/components/justep/messageDialog/css/messageDialog,$model/system/components/justep/toolBar/css/toolBar,$model/system/components/justep/popOver/css/popOver,$model/system/components/justep/loadingBar/loadingBar,$model/system/components/justep/input/css/datePicker,$model/system/components/justep/dataTables/css/dataTables,$model/system/components/justep/wing/css/wing,$model/system/components/bootstrap/scrollSpy/css/scrollSpy,$model/system/components/justep/menu/css/menu,$model/system/components/justep/numberSelect/css/numberList,$model/system/components/justep/list/css/list,$model/system/components/bootstrap/carousel/css/carousel,$model/system/components/bootstrap/dropdown/css/dropdown,$model/system/components/justep/common/css/forms,$model/system/components/justep/bar/css/bar'},{url: '/v_4670_nol_zh_CNs_desktopd_pc/system/components/bootstrap.min.css', include: '$model/system/components/bootstrap/lib/css/bootstrap,$model/system/components/bootstrap/lib/css/bootstrap-theme'}]);window.__justep.__ResourceEngine.loadJs(['/v_4670_nol_zh_CNs_desktopd_pc/system/components/comp.min.js','/v_4670_nol_zh_CNs_desktopd_pc/system/common.min.js','/v_4670_nol_zh_CNs_desktopd_pc/system/core.min.js']);define(function(require){
require('$model/UI2/system/components/justep/windowReceiver/windowReceiver');
require('$model/UI2/system/components/justep/loadingBar/loadingBar');
require('$model/UI2/system/components/justep/row/row');
require('$model/UI2/system/components/justep/panel/panel');
require('$model/UI2/system/components/justep/scrollView/scrollView');
require('$model/UI2/system/components/justep/panel/child');
require('$model/UI2/system/components/justep/button/checkbox');
require('$model/UI2/system/components/justep/list/list');
require('$model/UI2/system/components/justep/model/model');
require('$model/UI2/system/components/justep/window/window');
require('$model/UI2/system/components/justep/titleBar/titleBar');
require('$model/UI2/system/components/justep/data/data');
require('$model/UI2/system/components/justep/button/button');
var __parent1=require('$model/UI2/system/lib/base/modelBase'); 
var __parent0=require('$model/UI2/weixin/pay/cart'); 
var __result = __parent1._extend(__parent0).extend({
	constructor:function(contextUrl){
	this.__sysParam='true';
	this.__contextUrl=contextUrl;
	this.__id='';
	this.__cid='c36JfIj';
	this._flag_='e21fa8cdb217c70a880cc64d52f57447';
	this.callParent(contextUrl);
 var __Data__ = require("$UI/system/components/justep/data/data");new __Data__(this,{"autoLoad":true,"confirmDelete":false,"confirmRefresh":false,"defCols":{"fAddress":{"define":"fAddress","label":"所在地区","name":"fAddress","relation":"fAddress","type":"String"},"fChoose":{"define":"fChoose","label":"选择","name":"fChoose","relation":"fChoose","rules":{"integer":true},"type":"Integer"},"fColor":{"define":"fColor","label":"颜色","name":"fColor","relation":"fColor","type":"String"},"fImg":{"define":"fImg","label":"图片","name":"fImg","relation":"fImg","type":"String"},"fNumber":{"define":"fNumber","label":"数量","name":"fNumber","relation":"fNumber","rules":{"integer":true},"type":"Integer"},"fOldPrice":{"define":"fOldPrice","label":"原价格","name":"fOldPrice","relation":"fOldPrice","rules":{"number":true},"type":"Float"},"fPostage":{"define":"fPostage","label":"邮费","name":"fPostage","relation":"fPostage","type":"String"},"fPrice":{"define":"fPrice","label":"价格","name":"fPrice","relation":"fPrice","rules":{"number":true},"type":"Float"},"fRecord":{"define":"fRecord","label":"买出数量","name":"fRecord","relation":"fRecord","rules":{"integer":true},"type":"Integer"},"fShopID":{"define":"fShopID","label":"店铺ID","name":"fShopID","relation":"fShopID","type":"String"},"fSize":{"define":"fSize","label":"尺寸","name":"fSize","relation":"fSize","type":"String"},"fSum":{"define":"fSum","label":"总价","name":"fSum","relation":"fSum","rules":{"calculate":"$row.val('fChoose')==1?$row.val('fPrice')*$row.val('fNumber'):'0'","number":true},"type":"Float"},"fTitle":{"define":"fTitle","label":"标题","name":"fTitle","relation":"fTitle","type":"String"},"id":{"define":"id","label":"id","name":"id","relation":"id","type":"String"}},"directDelete":false,"events":{"onCustomRefresh":"goodsDataCustomRefresh"},"idColumn":"id","limit":20,"xid":"goodsData"});
 new __Data__(this,{"autoLoad":true,"confirmDelete":true,"confirmRefresh":true,"defCols":{"allNumber":{"define":"allNumber","label":"总数量","name":"allNumber","relation":"allNumber","rules":{"calculate":"$model.goodsData.sum('fChoose')"},"type":"String"},"allSum":{"define":"allSum","label":"合计","name":"allSum","relation":"allSum","rules":{"calculate":"$model.goodsData.sum('fSum')"},"type":"String"},"isBack":{"define":"isBack","label":"是否返回","name":"isBack","relation":"isBack","rules":{"integer":true},"type":"Integer"}},"directDelete":false,"events":{},"idColumn":"allSum","initData":"[{\"allSum\":\"0\",\"isBack\":0}]","limit":20,"xid":"calculateData"});
}}); 
return __result;});
