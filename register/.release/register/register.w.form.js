define(function(require){
require('$model/UI2/system/components/justep/model/model');
require('$model/UI2/system/components/bootstrap/form/form');
require('$model/UI2/system/components/justep/loadingBar/loadingBar');
require('$model/UI2/system/components/justep/button/button');
require('$model/UI2/system/components/justep/scrollView/scrollView');
require('$model/UI2/system/components/justep/input/input');
require('$model/UI2/system/components/justep/panel/child');
require('$model/UI2/system/components/justep/messageDialog/messageDialog');
require('$model/UI2/system/components/justep/panel/panel');
require('$model/UI2/system/components/justep/input/password');
require('$model/UI2/system/components/justep/windowReceiver/windowReceiver');
require('$model/UI2/system/components/justep/row/row');
require('$model/UI2/system/components/justep/titleBar/titleBar');
require('$model/UI2/system/components/justep/data/data');
require('$model/UI2/system/components/justep/window/window');
var __parent1=require('$model/UI2/system/lib/base/modelBase'); 
var __parent0=require('$model/UI2/weixin/register/register'); 
var __result = __parent1._extend(__parent0).extend({
	constructor:function(contextUrl){
	this.__sysParam='true';
	this.__contextUrl=contextUrl;
	this.__id='';
	this.__cid='cRnIziu';
	this._flag_='8d6abee605d4439bf04e008268db620e';
	this.callParent(contextUrl);
 var __Data__ = require("$UI/system/components/justep/data/data");new __Data__(this,{"autoLoad":false,"autoNew":true,"confirmDelete":true,"confirmRefresh":true,"defCols":{"phoneNum":{"define":"phoneNum","label":"phoneNum","name":"phoneNum","relation":"phoneNum","rules":{"integer":true},"type":"Integer"},"userID":{"define":"userID","label":"userID","name":"userID","relation":"userID","type":"String"},"username":{"define":"username","label":"username","name":"username","relation":"username","type":"String"},"userpass":{"define":"userpass","label":"userpass","name":"userpass","relation":"userpass","type":"String"},"userpass2":{"define":"userpass2","label":"userpass2","name":"userpass2","relation":"userpass2","type":"String"},"verifyCode":{"define":"verifyCode","label":"verifyCode","name":"verifyCode","relation":"verifyCode","type":"String"}},"directDelete":true,"events":{"onCustomSave":"mainDataCustomSave","onSaveCommit":"saveCommit"},"idColumn":"userID","limit":20,"xid":"userData"});
}}); 
return __result;});