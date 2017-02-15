<?xml version="1.0" encoding="utf-8"?>

<div xmlns="http://www.w3.org/1999/xhtml" xid="window" class="window" component="$UI/system/components/justep/window/window"
  design="device:m;">  
  <div component="$UI/system/components/justep/model/model" xid="model" style="height:auto;left:253px;top:111px;" onParamsReceive="modelParamsReceive" onLoad="modelLoad"> 
    <div component="$UI/system/components/justep/data/data" autoLoad="true" xid="sendData" idColumn="id" onCustomRefresh="sendDataCustomRefresh">
   <column label="id" name="id" type="String" xid="xid7"></column>
  <column label="支付方式" name="payName" type="String" xid="xid8"></column>
  <column label="费用" name="payCost" type="String" xid="xid18"></column>
  <column label="状态" name="payState" type="Integer" xid="xid17"></column>
  <data xid="default1">[{&quot;id&quot;:&quot;001&quot;,&quot;payName&quot;:&quot;支付宝&quot;,&quot;payCost&quot;:&quot;12&quot;,&quot;payState&quot;:0},{&quot;id&quot;:&quot;002&quot;,&quot;payName&quot;:&quot;微信支付&quot;,&quot;payCost&quot;:&quot;11&quot;,&quot;payState&quot;:1}]</data></div>
  <div component="$UI/system/components/justep/data/data" autoLoad="false" xid="recordData" idColumn="id">
   <column label="id" name="id" type="String" xid="column4"></column>
   <column label="UserId" name="UserId" type="String" xid="xid1"></column>
   <column label="ExitTollGateId" name="ExitTollGateId" type="String" xid="xid2"></column>
   <column label="EnterTollGateId" name="EnterTollGateId" type="String" xid="xid3"></column>
   <column label="ExitTollGateName" name="ExitTollGateName" type="String" xid="xid4"></column>
   <column label="EnterTollGateName" name="EnterTollGateName" type="String" xid="xid5"></column>
   <column label="ExitLicenseNo" name="ExitLicenseNo" type="String" xid="xid6"></column>
   <column label="Money" name="Money" type="String" xid="column5"></column>
   <column label="VehicleModel" name="VehicleModel" type="String" xid="column6"></column>
   <column label="EnterDateTime" name="EnterDateTime" type="String" xid="xid9"></column>
   <column label="ExitDateTime" name="ExitDateTime" type="String" xid="xid10"></column></div></div>  
  <span component="$UI/system/components/justep/windowDialog/windowDialog" xid="winDlg" style="left:123px;top:10px;"></span><span component="$UI/system/components/justep/windowReceiver/windowReceiver" xid="winRec" style="left:170px;top:12px;"></span><span component="$UI/system/components/justep/messageDialog/messageDialog" xid="messageDlg" type="OK"></span><div component="$UI/system/components/justep/popOver/popOver" class="x-popOver"
    xid="popOver"> 
    <div class="x-popOver-overlay" xid="div9"/>  
    <div class="x-popOver-content" xid="div10">
      <div class="x-cards panel-heading">
        <h5><![CDATA[选择配送方式：]]></h5>
      </div>
      <div class="panel-body">
        <div component="$UI/system/components/justep/list/list" class="x-list"
          xid="list2" data="sendData"> 
          <ul class="x-list-template" xid="ul1"> 
            <li xid="li2" class="list-group-item tb-noborder" bind-click="sendLiClick">
              <span component="$UI/system/components/justep/button/radio" class="x-radio"
                bind-value="ref('payState')" checkedValue="1" checked="false" xid="state"/>  
              <span bind-text="ref('payName')"/>  
              <span bind-text="ref('payCost')"/>
            </li>
          </ul> 
        </div> 
      </div> 
    </div>
  </div>
  
  <div component="$UI/system/components/justep/panel/panel" class="x-panel x-full x-card"
    xid="panel1"> 
    <div class="x-panel-top" xid="top1"> 
      <div component="$UI/system/components/justep/titleBar/titleBar" class="x-titlebar" xid="titleBar">
   <div class="x-titlebar-left" xid="left1"><a component="$UI/system/components/justep/button/button" class="btn btn-link btn-icon-left" label="确认订单" xid="btn_back" icon="icon-chevron-left" onClick="btn_backClick"> 
          <i xid="i1" class="icon-chevron-left" />  
          <span xid="span1">确认订单</span> 
        </a></div>
   <div class="x-titlebar-title" xid="title1"></div>
   <div class="x-titlebar-right reverse" xid="right1"></div></div></div>  
    <div class="x-panel-content x-cards" xid="content1"> 
        
      
  <div component="$UI/system/components/justep/list/list" class="x-list" data="recordData" xid="list4" disablePullToRefresh="true" disableInfiniteLoad="true" limit="1">
   <ul class="x-list-template x-min-height" xid="listTemplateUl4" componentname="$UI/system/components/justep/list/list#listTemplateUl" id="undefined_listTemplateUl4">
    <div component="$UI/system/components/justep/panel/panel" class="panel panel-default x-card tb-noborder media" xid="panel2"> 
        <div class="media-left media-middle"> 
          <a component="$UI/system/components/justep/button/button" class="btn btn-link btn-only-icon text-black" label="button" xid="button3" icon="icon-ios7-location"> 
            <i xid="i3" class="icon-ios7-location" />  
            <span xid="span7" /> 
          </a> 
        </div>  
        <div class="media-body"> 
          <h4 class="text-black"><![CDATA[付款人：张三]]></h4>  
          <h5 class="text-black"><![CDATA[支付路段：天津市南开区华苑产业园梓苑路68号C座601室]]></h5>  
          <h5 class="text-warning"><![CDATA[（支付成功后，请注意抬杆）]]></h5> 
        </div>  
        <div class="media-right media-middle"> 
          <a component="$UI/system/components/justep/button/button" class="btn btn-link btn-only-icon text-black" label="button" xid="button4" icon="icon-ios7-arrow-forward"> 
            <i xid="i4" class="icon-ios7-arrow-forward" />  
            <span xid="span8" /> 
          </a> 
        </div> 
      </div><div component="$UI/system/components/justep/panel/panel" class="panel panel-default tb-noborder x-card x-tuniu" xid="panel3">
   <li xid="li4" class="panel-body media" componentname="li(html)" id="undefined_li4">
   <div class="media-left" xid="div11">
    <img src="$UI/weixin/res/img/car.png" alt="" xid="image4" class="tb-img-good" style="height:85px;width:81px;" height="81px"></img></div> 
   <div class="media-body" xid="div12">
    <span class="text-black h5" xid="span33"><![CDATA[高速移动支付]]></span>
    <div class="text-muted" xid="div1">
     <span xid="span34"><![CDATA[车型：]]></span>
     <span xid="span35" bind-text=' $object.val("VehicleModel")'><![CDATA[家庭轿车]]></span>
     <span xid="span36">；</span>
     <span xid="span37">尺寸：</span>
     <span xid="span38"><![CDATA[5m]]></span></div> 
    <div class="text-muted" xid="div2">
     <span xid="span32" class="text-danger">￥</span>
     <span xid="span21" class="h4 text-danger" bind-text=' $object.val("Money")'><![CDATA[56]]></span></div> 
    <div class="numberOperation" xid="div3">
     <span class="pull-right text-black h4" xid="span39"><![CDATA[1]]></span>
     <span class="pull-right text-black h4" xid="span40">x</span></div> 
  </div> </li> 
  <div xid="div1">
    <div class="panel-heading" bind-click="sendClick" xid="div2">
     <a component="$UI/system/components/justep/button/button" class="btn btn-link btn-xs btn-only-icon pull-right" label="button" xid="button2" icon="icon-ios7-arrow-right">
      <i class="icon-ios7-arrow-right text-muted" xid="i5"></i>
      <span xid="span12"></span></a> 
     <span xid="span6" class=" text-primary"><![CDATA[支付方式：]]></span><span class="pull-right text-muted" xid="sendTitle"><![CDATA[支付宝 微信]]></span>
     </div> 
    <div class="panel-heading" xid="div3">
     <a component="$UI/system/components/justep/button/button" class="btn btn-link btn-xs btn-only-icon pull-right" label="button" xid="button5" icon="icon-ios7-arrow-right">
      <i class="icon-ios7-arrow-right text-muted" xid="i7"></i>
      <span xid="span13"></span></a> 
     <span xid="span10" class="text-primary"><![CDATA[入站口：]]></span>
  <span xid="span24" bind-text=' $object.val("EnterTollGateName")' class="pull-right text-danger"><![CDATA[侯台入口站]]></span></div> 
    <div class="panel-heading" xid="div13">
   <a component="$UI/system/components/justep/button/button" class="btn btn-link btn-xs btn-only-icon pull-right" label="button" xid="button1" icon="icon-ios7-arrow-right">
    <i class="icon-ios7-arrow-right text-muted" xid="i6"></i>
    <span xid="span16"></span></a> 
   <span xid="span18" class="text-primary">入站时间：</span><span xid="span23" bind-text=' $object.val("EnterDateTime")' class="pull-right text-danger">2016-02-14</span>
   </div><div class="panel-heading" xid="div18">
   <a component="$UI/system/components/justep/button/button" class="btn btn-link btn-xs btn-only-icon pull-right" label="button" xid="button6" icon="icon-ios7-arrow-right">
    <i class="icon-ios7-arrow-right text-muted" xid="i10"></i>
    <span xid="span20"></span></a> 
   <span xid="span19" class="text-primary"><![CDATA[出站口：]]></span>
  <span xid="span25" bind-text=' $object.val("ExitTollGateName")' class="pull-right text-danger"><![CDATA[侯台出口站]]></span>
  </div><div class="panel-heading" xid="div14">
   <a component="$UI/system/components/justep/button/button" class="btn btn-link btn-xs btn-only-icon pull-right" label="button" xid="button7" icon="icon-ios7-arrow-right">
    <i class="icon-ios7-arrow-right text-muted" xid="i8"></i>
    <span xid="span27"></span></a> 
   <span xid="span11" class="text-primary">出站时间：</span><span xid="span5" bind-text=' $object.val("ExitDateTime")' class="pull-right text-danger">2016-02-14</span>
  </div><div class="panel-heading" xid="div5">
      
     <div class="media-left media-middle" xid="div6">
      <span class="x-flex  text-primary" style="width:80px;" xid="span3"><![CDATA[留言：]]></span></div><div class="media-body" xid="div7">
      <input component="$UI/system/components/justep/input/input" class="form-control input-sm tb-noborder text-muted" xid="input1" bind-value="'选填，可填写您的意见和建议'"></input></div> </div> 
    <div class="panel-heading text-right" bind-text="'共1件商品'" xid="div8"></div>
  
  </div>
  </div></ul> </div>
  </div>  
    <div class="x-panel-bottom" xid="bottom1"> 
      <div> 
        <div class="col col-xs-8" xid="col7"> 
          <div class="h4 text-right" xid="div4"> 
            <span xid="span15" class="text-muted">合计：</span>  
            <span xid="span_total" id="span_total" class="text-danger" bind-text="($model.recordData.val(&quot;Money&quot;)==null)?&quot;未知&quot;:('￥' + $model.recordData.val(&quot;Money&quot;))"><![CDATA[￥56]]></span> 
          </div> 
        </div>  
        <div class="col col-xs-4 tb-settlement" xid="col6"> 
          <div component="$UI/system/components/justep/button/buttonGroup"
            class="btn-group btn-group-justified" tabbed="true" xid="buttonGroup1"> 
            <a component="$UI/system/components/justep/button/button" class="btn  btn-lg btn-only-label text-white"
              label="确认" xid="confirmBtn" onClick="payOrderByAlipay" disabled="true"> 
              <i xid="i2"/>  
              <span xid="span2">确认</span> 
            </a> 
          </div> 
        </div> 
      </div> 
    </div> 
  </div> 
<div id="aler" xid="div_aler"></div>
  </div>
