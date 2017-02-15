define(function(require){
require('$model/UI2/system/components/justep/loadingBar/loadingBar');
require('$model/UI2/system/components/justep/windowReceiver/windowReceiver');
require('$model/UI2/system/components/justep/panel/panel');
require('$model/UI2/system/components/justep/button/buttonGroup');
require('$model/UI2/system/components/justep/windowDialog/windowDialog');
require('$model/UI2/system/components/justep/list/list');
require('$model/UI2/system/components/justep/window/window');
require('$model/UI2/system/components/justep/data/data');
require('$model/UI2/system/components/justep/titleBar/titleBar');
require('$model/UI2/system/components/justep/panel/child');
require('$model/UI2/system/components/justep/messageDialog/messageDialog');
require('$model/UI2/system/components/justep/model/model');
require('$model/UI2/system/components/justep/button/radio');
require('$model/UI2/system/components/justep/button/button');
require('$model/UI2/system/components/justep/popOver/popOver');
require('$model/UI2/system/components/justep/input/input');
var __parent1=require('$model/UI2/system/lib/base/modelBase'); 
var __parent0=require('$model/UI2/weixin/pay/order'); 
var __result = __parent1._extend(__parent0).extend({
	constructor:function(contextUrl){
	this.__sysParam='true';
	this.__contextUrl=contextUrl;
	this.__id='';
	this.__cid='cIRNvMz';
	this._flag_='22b6f61042f2a095087e30de81574ae2';
	this.callParent(contextUrl);
 var __Data__ = require("$UI/system/components/justep/data/data");new __Data__(this,{"autoLoad":true,"confirmDelete":true,"confirmRefresh":true,"defCols":{"id":{"define":"id","label":"id","name":"id","relation":"id","type":"String"},"payCost":{"define":"payCost","label":"费用","name":"payCost","relation":"payCost","type":"String"},"payName":{"define":"payName","label":"支付方式","name":"payName","relation":"payName","type":"String"},"payState":{"define":"payState","label":"状态","name":"payState","relation":"payState","rules":{"integer":true},"type":"Integer"}},"directDelete":false,"events":{"onCustomRefresh":"sendDataCustomRefresh"},"idColumn":"id","initData":"[{\"id\":\"001\",\"payName\":\"支付宝\",\"payCost\":\"12\",\"payState\":0},{\"id\":\"002\",\"payName\":\"微信支付\",\"payCost\":\"11\",\"payState\":1}]","limit":20,"xid":"sendData"});
 new __Data__(this,{"autoLoad":false,"autoNew":false,"confirmDelete":true,"confirmRefresh":true,"defCols":{"EnterDateTime":{"define":"EnterDateTime","label":"EnterDateTime","name":"EnterDateTime","relation":"EnterDateTime","type":"String"},"EnterTollGateId":{"define":"EnterTollGateId","label":"EnterTollGateId","name":"EnterTollGateId","relation":"EnterTollGateId","type":"String"},"EnterTollGateName":{"define":"EnterTollGateName","label":"EnterTollGateName","name":"EnterTollGateName","relation":"EnterTollGateName","type":"String"},"ExitDateTime":{"define":"ExitDateTime","label":"ExitDateTime","name":"ExitDateTime","relation":"ExitDateTime","type":"String"},"ExitLicenseNo":{"define":"ExitLicenseNo","label":"ExitLicenseNo","name":"ExitLicenseNo","relation":"ExitLicenseNo","type":"String"},"ExitTollGateId":{"define":"ExitTollGateId","label":"ExitTollGateId","name":"ExitTollGateId","relation":"ExitTollGateId","type":"String"},"ExitTollGateName":{"define":"ExitTollGateName","label":"ExitTollGateName","name":"ExitTollGateName","relation":"ExitTollGateName","type":"String"},"Money":{"define":"Money","label":"Money","name":"Money","relation":"Money","type":"String"},"UserId":{"define":"UserId","label":"UserId","name":"UserId","relation":"UserId","type":"String"},"VehicleModel":{"define":"VehicleModel","label":"VehicleModel","name":"VehicleModel","relation":"VehicleModel","type":"String"},"id":{"define":"id","label":"id","name":"id","relation":"id","type":"String"}},"directDelete":false,"events":{},"idColumn":"id","limit":20,"xid":"recordData"});
}}); 
return __result;});