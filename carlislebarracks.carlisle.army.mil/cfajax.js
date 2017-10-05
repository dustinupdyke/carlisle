/*ADOBE SYSTEMS INCORPORATED
Copyright 2012 Adobe Systems Incorporated
All Rights Reserved.

NOTICE:  Adobe permits you to use, modify, and distribute this file in accordance with the
terms of the Adobe license agreement accompanying it.  If you have received this file from a
source other than Adobe, then your use, modification, or distribution of it requires the prior
written permission of Adobe.*/
function cfinit(){
if(!window.ColdFusion){
ColdFusion={};
var $C=ColdFusion;
if(!$C.Ajax){
$C.Ajax={};
}
var $A=$C.Ajax;
if(!$C.AjaxProxy){
$C.AjaxProxy={};
}
var $X=$C.AjaxProxy;
if(!$C.Bind){
$C.Bind={};
}
var $B=$C.Bind;
if(!$C.Event){
$C.Event={};
}
var $E=$C.Event;
if(!$C.Log){
$C.Log={};
}
var $L=$C.Log;
if(!$C.Util){
$C.Util={};
}
var $U=$C.Util;
if(!$C.DOM){
$C.DOM={};
}
var $D=$C.DOM;
if(!$C.Spry){
$C.Spry={};
}
var $S=$C.Spry;
if(!$C.Pod){
$C.Pod={};
}
var $P=$C.Pod;
if(!$C.objectCache){
$C.objectCache={};
}
if(!$C.required){
$C.required={};
}
if(!$C.importedTags){
$C.importedTags=[];
}
if(!$C.requestCounter){
$C.requestCounter=0;
}
if(!$C.bindHandlerCache){
$C.bindHandlerCache={};
}
window._cf_loadingtexthtml="<div style=\"text-align: center;\">"+window._cf_loadingtexthtml+"&nbsp;"+CFMessage["loading"]+"</div>";
$C.globalErrorHandler=function(_236,_237){
if($L.isAvailable){
$L.error(_236,_237);
}
if($C.userGlobalErrorHandler){
$C.userGlobalErrorHandler(_236);
}
if(!$L.isAvailable&&!$C.userGlobalErrorHandler){
alert(_236+CFMessage["globalErrorHandler.alert"]);
}
};
$C.handleError=function(_238,_239,_23a,_23b,_23c,_23d,_23e,_23f){
var msg=$L.format(_239,_23b);
if(_238){
$L.error(msg,"http");
if(!_23c){
_23c=-1;
}
if(!_23d){
_23d=msg;
}
_238(_23c,_23d,_23f);
}else{
if(_23e){
$L.error(msg,"http");
throw msg;
}else{
$C.globalErrorHandler(msg,_23a);
}
}
};
$C.setGlobalErrorHandler=function(_241){
$C.userGlobalErrorHandler=_241;
};
$A.createXMLHttpRequest=function(){
try{
return new XMLHttpRequest();
}
catch(e){
}
var _242=["Microsoft.XMLHTTP","MSXML2.XMLHTTP.5.0","MSXML2.XMLHTTP.4.0","MSXML2.XMLHTTP.3.0","MSXML2.XMLHTTP"];
for(var i=0;i<_242.length;i++){
try{
return new ActiveXObject(_242[i]);
}
catch(e){
}
}
return false;
};
$A.isRequestError=function(req){
return ((req.status!=0&&req.status!=200)||req.getResponseHeader("server-error"));
};
$A.sendMessage=function(url,_246,_247,_248,_249,_24a,_24b){
var req=$A.createXMLHttpRequest();
if(!_246){
_246="GET";
}
if(_248&&_249){
req.onreadystatechange=function(){
$A.callback(req,_249,_24a);
};
}
if(_247){
_247+="&_cf_nodebug=true&_cf_nocache=true";
}else{
_247="_cf_nodebug=true&_cf_nocache=true";
}
if(window._cf_clientid){
_247+="&_cf_clientid="+_cf_clientid;
}
if(_246=="GET"){
if(_247){
_247+="&_cf_rc="+($C.requestCounter++);
if(url.indexOf("?")==-1){
url+="?"+_247;
}else{
url+="&"+_247;
}
}
$L.info("ajax.sendmessage.get.htm"/*tpa=http://carlislebarracks.carlisle.army.mil/cf_scripts/scripts/ajax/package/ajax.sendmessage.get*/,"http",[url]);
req.open(_246,url,_248);
req.send(null);
}else{
$L.info("ajax.sendmessage.post.htm"/*tpa=http://carlislebarracks.carlisle.army.mil/cf_scripts/scripts/ajax/package/ajax.sendmessage.post*/,"http",[url,_247]);
req.open(_246,url,_248);
req.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
if(_247){
req.send(_247);
}else{
req.send(null);
}
}
if(!_248){
while(req.readyState!=4){
}
if($A.isRequestError(req)){
$C.handleError(null,"ajax.sendmessage.error","http",[req.status,req.statusText],req.status,req.statusText,_24b);
}else{
return req;
}
}
};
$A.callback=function(req,_24e,_24f){
if(req.readyState!=4){
return;
}
req.onreadystatechange=new Function;
_24e(req,_24f);
};
$A.submitForm=function(_250,url,_252,_253,_254,_255){
var _256=$C.getFormQueryString(_250);
if(_256==-1){
$C.handleError(_253,"ajax.submitform.formnotfound","http",[_250],-1,null,true);
return;
}
if(!_254){
_254="POST";
}
_255=!(_255===false);
var _257=function(req){
$A.submitForm.callback(req,_250,_252,_253);
};
$L.info("ajax.submitform.submitting","http",[_250]);
var _259=$A.sendMessage(url,_254,_256,_255,_257);
if(!_255){
$L.info("ajax.submitform.success","http",[_250]);
return _259.responseText;
}
};
$A.submitForm.callback=function(req,_25b,_25c,_25d){
if($A.isRequestError(req)){
$C.handleError(_25d,"ajax.submitform.error","http",[req.status,_25b,req.statusText],req.status,req.statusText);
}else{
$L.info("ajax.submitform.success","http",[_25b]);
if(_25c){
_25c(req.responseText);
}
}
};
$C.empty=function(){
};
$C.setSubmitClicked=function(_25e,_25f){
var el=$D.getElement(_25f,_25e);
el.cfinputbutton=true;
$C.setClickedProperty=function(){
el.clicked=true;
};
$E.addListener(el,"click",$C.setClickedProperty);
};
$C.getFormQueryString=function(_261,_262){
var _263;
if(typeof _261=="string"){
_263=(document.getElementById(_261)||document.forms[_261]);
}else{
if(typeof _261=="object"){
_263=_261;
}
}
if(!_263||null==_263.elements){
return -1;
}
var _264,elementName,elementValue,elementDisabled;
var _265=false;
var _266=(_262)?{}:"";
for(var i=0;i<_263.elements.length;i++){
_264=_263.elements[i];
elementDisabled=_264.disabled;
elementName=_264.name;
elementValue=_264.value;
if(!elementDisabled&&elementName){
switch(_264.type){
case "select-one":
case "select-multiple":
for(var j=0;j<_264.options.length;j++){
if(_264.options[j].selected){
if(window.ActiveXObject){
_266=$C.getFormQueryString.processFormData(_266,_262,elementName,_264.options[j].attributes["value"].specified?_264.options[j].value:_264.options[j].text);
}else{
_266=$C.getFormQueryString.processFormData(_266,_262,elementName,_264.options[j].hasAttribute("value")?_264.options[j].value:_264.options[j].text);
}
}
}
break;
case "radio":
case "checkbox":
if(_264.checked){
_266=$C.getFormQueryString.processFormData(_266,_262,elementName,elementValue);
}
break;
case "file":
case undefined:
case "reset":
break;
case "button":
_266=$C.getFormQueryString.processFormData(_266,_262,elementName,elementValue);
break;
case "submit":
if(_264.cfinputbutton){
if(_265==false&&_264.clicked){
_266=$C.getFormQueryString.processFormData(_266,_262,elementName,elementValue);
_265=true;
}
}else{
_266=$C.getFormQueryString.processFormData(_266,_262,elementName,elementValue);
}
break;
case "textarea":
var _269;
if(window.FCKeditorAPI&&(_269=$C.objectCache[elementName])&&_269.richtextid){
var _26a=FCKeditorAPI.GetInstance(_269.richtextid);
if(_26a){
elementValue=_26a.GetXHTML();
}
}
_266=$C.getFormQueryString.processFormData(_266,_262,elementName,elementValue);
break;
default:
_266=$C.getFormQueryString.processFormData(_266,_262,elementName,elementValue);
break;
}
}
}
if(!_262){
_266=_266.substr(0,_266.length-1);
}
return _266;
};
$C.getFormQueryString.processFormData=function(_26b,_26c,_26d,_26e){
if(_26c){
if(_26b[_26d]){
_26b[_26d]+=","+_26e;
}else{
_26b[_26d]=_26e;
}
}else{
_26b+=encodeURIComponent(_26d)+"="+encodeURIComponent(_26e)+"&";
}
return _26b;
};
$A.importTag=function(_26f){
$C.importedTags.push(_26f);
};
$A.checkImportedTag=function(_270){
var _271=false;
for(var i=0;i<$C.importedTags.length;i++){
if($C.importedTags[i]==_270){
_271=true;
break;
}
}
if(!_271){
$C.handleError(null,"ajax.checkimportedtag.error","widget",[_270]);
}
};
$C.getElementValue=function(_273,_274,_275){
if(!_273){
$C.handleError(null,"getelementvalue.noelementname","bind",null,null,null,true);
return;
}
if(!_275){
_275="value";
}
var _276=$B.getBindElementValue(_273,_274,_275);
if(typeof (_276)=="undefined"){
_276=null;
}
if(_276==null){
$C.handleError(null,"getelementvalue.elnotfound","bind",[_273,_275],null,null,true);
return;
}
return _276;
};
$B.getBindElementValue=function(_277,_278,_279,_27a,_27b){
var _27c="";
if(window[_277]){
var _27d=eval(_277);
if(_27d&&_27d._cf_getAttribute){
_27c=_27d._cf_getAttribute(_279);
return _27c;
}
}
var _27e=$C.objectCache[_277];
if(_27e&&_27e._cf_getAttribute){
_27c=_27e._cf_getAttribute(_279);
return _27c;
}
var el=$D.getElement(_277,_278);
var _280=(el&&((!el.length&&el.length!=0)||(el.length&&el.length>0)||el.tagName=="SELECT"));
if(!_280&&!_27b){
$C.handleError(null,"bind.getbindelementvalue.elnotfound","bind",[_277]);
return null;
}
if(el.tagName!="SELECT"){
if(el.length>1){
var _281=true;
for(var i=0;i<el.length;i++){
var _283=(el[i].getAttribute("type")=="radio"||el[i].getAttribute("type")=="checkbox");
if(!_283||(_283&&el[i].checked)){
if(!_281){
_27c+=",";
}
_27c+=$B.getBindElementValue.extract(el[i],_279);
_281=false;
}
}
}else{
_27c=$B.getBindElementValue.extract(el,_279);
}
}else{
var _281=true;
for(var i=0;i<el.options.length;i++){
if(el.options[i].selected){
if(!_281){
_27c+=",";
}
_27c+=$B.getBindElementValue.extract(el.options[i],_279);
_281=false;
}
}
}
if(typeof (_27c)=="object"){
$C.handleError(null,"bind.getbindelementvalue.simplevalrequired","bind",[_277,_279]);
return null;
}
if(_27a&&$C.required[_277]&&_27c.length==0){
return null;
}
return _27c;
};
$B.getBindElementValue.extract=function(el,_285){
var _286=el[_285];
if((_286==null||typeof (_286)=="undefined")&&el.getAttribute){
_286=el.getAttribute(_285);
}
return _286;
};
$L.init=function(){
if(window.YAHOO&&YAHOO.widget&&YAHOO.widget.Logger){
YAHOO.widget.Logger.categories=[CFMessage["debug"],CFMessage["info"],CFMessage["error"],CFMessage["window"]];
YAHOO.widget.LogReader.prototype.formatMsg=function(_287){
var _288=_287.category;
return "<p>"+"<span class='"+_288+"'>"+_288+"</span>:<i>"+_287.source+"</i>: "+_287.msg+"</p>";
};
var _289=new YAHOO.widget.LogReader(null,{width:"30em",fontSize:"100%"});
_289.setTitle(CFMessage["log.title"]||"ColdFusion AJAX Logger");
_289._btnCollapse.value=CFMessage["log.collapse"]||"Collapse";
_289._btnPause.value=CFMessage["log.pause"]||"Pause";
_289._btnClear.value=CFMessage["log.clear"]||"Clear";
$L.isAvailable=true;
}
};
$L.log=function(_28a,_28b,_28c,_28d){
if(!$L.isAvailable){
return;
}
if(!_28c){
_28c="global";
}
_28c=CFMessage[_28c]||_28c;
_28b=CFMessage[_28b]||_28b;
_28a=$L.format(_28a,_28d);
YAHOO.log(_28a,_28b,_28c);
};
$L.format=function(code,_28f){
var msg=CFMessage[code]||code;
if(_28f){
for(i=0;i<_28f.length;i++){
if(!_28f[i].length){
_28f[i]="";
}
var _291="{"+i+"}";
msg=msg.replace(_291,_28f[i]);
}
}
return msg;
};
$L.debug=function(_292,_293,_294){
$L.log(_292,"debug",_293,_294);
};
$L.info=function(_295,_296,_297){
$L.log(_295,"info",_296,_297);
};
$L.error=function(_298,_299,_29a){
$L.log(_298,"error",_299,_29a);
};
$L.dump=function(_29b,_29c){
if($L.isAvailable){
var dump=(/string|number|undefined|boolean/.test(typeof (_29b))||_29b==null)?_29b:recurse(_29b,typeof _29b,true);
$L.debug(dump,_29c);
}
};
$X.invoke=function(_29e,_29f,_2a0,_2a1,_2a2){
return $X.invokeInternal(_29e,_29f,_2a0,_2a1,_2a2,false,null,null);
};
$X.invokeInternal=function(_2a3,_2a4,_2a5,_2a6,_2a7,_2a8,_2a9,_2aa){
var _2ab="method="+_2a4+"&_cf_ajaxproxytoken="+_2a5;
if(_2a8){
_2ab+="&_cfclient="+"true";
var _2ac=$X.JSON.encodeInternal(_2a3._variables,_2a8);
_2ab+="&_variables="+encodeURIComponent(_2ac);
var _2ad=$X.JSON.encodeInternal(_2a3._metadata,_2a8);
_2ab+="&_metadata="+encodeURIComponent(_2ad);
}
var _2ae=_2a3.returnFormat||"json";
_2ab+="&returnFormat="+_2ae;
if(_2a3.queryFormat){
_2ab+="&queryFormat="+_2a3.queryFormat;
}
if(_2a3.formId){
var _2af=$C.getFormQueryString(_2a3.formId,true);
if(_2a6!=null){
for(prop in _2af){
_2a6[prop]=_2af[prop];
}
}else{
_2a6=_2af;
}
_2a3.formId=null;
}
var _2b0="";
if(_2a6!=null){
_2b0=$X.JSON.encodeInternal(_2a6,_2a8);
_2ab+="&argumentCollection="+encodeURIComponent(_2b0);
}
$L.info("ajaxproxy.invoke.invoking","http",[_2a3.cfcPath,_2a4,_2b0]);
if(_2a3.callHandler){
_2a3.callHandler.call(null,_2a3.callHandlerParams,_2a3.cfcPath,_2ab);
return;
}
var _2b1;
var _2b2=_2a3.async;
if(_2a9!=null){
_2b2=true;
_2b1=function(req){
$X.callbackOp(req,_2a3,_2a7,_2a9,_2aa);
};
}else{
if(_2a3.async){
_2b1=function(req){
$X.callback(req,_2a3,_2a7);
};
}
}
var req=$A.sendMessage(_2a3.cfcPath,_2a3.httpMethod,_2ab,_2b2,_2b1,null,true);
if(!_2b2){
return $X.processResponse(req,_2a3);
}
};
$X.callback=function(req,_2b7,_2b8){
if($A.isRequestError(req)){
$C.handleError(_2b7.errorHandler,"ajaxproxy.invoke.error","http",[req.status,_2b7.cfcPath,req.statusText],req.status,req.statusText,false,_2b8);
}else{
if(_2b7.callbackHandler){
var _2b9=$X.processResponse(req,_2b7);
_2b7.callbackHandler(_2b9,_2b8);
}
}
};
$X.callbackOp=function(req,_2bb,_2bc,_2bd,_2be){
if($A.isRequestError(req)){
var _2bf=_2bb.errorHandler;
if(_2be!=null){
_2bf=_2be;
}
$C.handleError(_2bf,"ajaxproxy.invoke.error","http",[req.status,_2bb.cfcPath,req.statusText],req.status,req.statusText,false,_2bc);
}else{
if(_2bd){
var _2c0=$X.processResponse(req,_2bb);
_2bd(_2c0,_2bc);
}
}
};
$X.processResponse=function(req,_2c2){
var _2c3=true;
for(var i=0;i<req.responseText.length;i++){
var c=req.responseText.charAt(i);
_2c3=(c==" "||c=="\n"||c=="\t"||c=="\r");
if(!_2c3){
break;
}
}
var _2c6=(req.responseXML&&req.responseXML.childNodes.length>0);
var _2c7=_2c6?"[XML Document]":req.responseText;
$L.info("ajaxproxy.invoke.response","http",[_2c7]);
var _2c8;
var _2c9=_2c2.returnFormat||"json";
if(_2c9=="json"){
try{
_2c8=_2c3?null:$X.JSON.decode(req.responseText);
}
catch(e){
if(typeof _2c2._metadata!=="undefined"&&_2c2._metadata.servercfc&&typeof req.responseText==="string"){
_2c8=req.responseText;
}else{
throw e;
}
}
}else{
_2c8=_2c6?req.responseXML:(_2c3?null:req.responseText);
}
return _2c8;
};
$X.init=function(_2ca,_2cb,_2cc){
if(typeof _2cc==="undefined"){
_2cc=false;
}
var _2cd=_2cb;
if(!_2cc){
var _2ce=_2cb.split(".");
var ns=self;
for(i=0;i<_2ce.length-1;i++){
if(_2ce[i].length){
ns[_2ce[i]]=ns[_2ce[i]]||{};
ns=ns[_2ce[i]];
}
}
var _2d0=_2ce[_2ce.length-1];
if(ns[_2d0]){
return ns[_2d0];
}
ns[_2d0]=function(){
this.httpMethod="GET";
this.async=false;
this.callbackHandler=null;
this.errorHandler=null;
this.formId=null;
};
_2cd=ns[_2d0].prototype;
}else{
_2cd.httpMethod="GET";
_2cd.async=false;
_2cd.callbackHandler=null;
_2cd.errorHandler=null;
_2cd.formId=null;
}
_2cd.cfcPath=_2ca;
_2cd.setHTTPMethod=function(_2d1){
if(_2d1){
_2d1=_2d1.toUpperCase();
}
if(_2d1!="GET"&&_2d1!="POST"){
$C.handleError(null,"ajaxproxy.sethttpmethod.invalidmethod","http",[_2d1],null,null,true);
}
this.httpMethod=_2d1;
};
_2cd.setSyncMode=function(){
this.async=false;
};
_2cd.setAsyncMode=function(){
this.async=true;
};
_2cd.setCallbackHandler=function(fn){
this.callbackHandler=fn;
this.setAsyncMode();
};
_2cd.setErrorHandler=function(fn){
this.errorHandler=fn;
this.setAsyncMode();
};
_2cd.setForm=function(fn){
this.formId=fn;
};
_2cd.setQueryFormat=function(_2d5){
if(_2d5){
_2d5=_2d5.toLowerCase();
}
if(!_2d5||(_2d5!="column"&&_2d5!="row"&&_2d5!="struct")){
$C.handleError(null,"ajaxproxy.setqueryformat.invalidformat","http",[_2d5],null,null,true);
}
this.queryFormat=_2d5;
};
_2cd.setReturnFormat=function(_2d6){
if(_2d6){
_2d6=_2d6.toLowerCase();
}
if(!_2d6||(_2d6!="plain"&&_2d6!="json"&&_2d6!="wddx")){
$C.handleError(null,"ajaxproxy.setreturnformat.invalidformat","http",[_2d6],null,null,true);
}
this.returnFormat=_2d6;
};
$L.info("ajaxproxy.init.created","http",[_2ca]);
if(_2cc){
return _2cd;
}else{
return ns[_2d0];
}
};
$U.isWhitespace=function(s){
var _2d8=true;
for(var i=0;i<s.length;i++){
var c=s.charAt(i);
_2d8=(c==" "||c=="\n"||c=="\t"||c=="\r");
if(!_2d8){
break;
}
}
return _2d8;
};
$U.getFirstNonWhitespaceIndex=function(s){
var _2dc=true;
for(var i=0;i<s.length;i++){
var c=s.charAt(i);
_2dc=(c==" "||c=="\n"||c=="\t"||c=="\r");
if(!_2dc){
break;
}
}
return i;
};
$C.trim=function(_2df){
return _2df.replace(/^\s+|\s+$/g,"");
};
$U.isInteger=function(n){
var _2e1=true;
if(typeof (n)=="number"){
_2e1=(n>=0);
}else{
for(i=0;i<n.length;i++){
if($U.isInteger.numberChars.indexOf(n.charAt(i))==-1){
_2e1=false;
break;
}
}
}
return _2e1;
};
$U.isInteger.numberChars="0123456789";
$U.isArray=function(a){
return (typeof (a.length)=="number"&&!a.toUpperCase);
};
$U.isBoolean=function(b){
if(b===true||b===false){
return true;
}else{
if(b.toLowerCase){
b=b.toLowerCase();
return (b==$U.isBoolean.trueChars||b==$U.isBoolean.falseChars);
}else{
return false;
}
}
};
$U.isBoolean.trueChars="true";
$U.isBoolean.falseChars="false";
$U.castBoolean=function(b){
if(b===true){
return true;
}else{
if(b===false){
return false;
}else{
if(b.toLowerCase){
b=b.toLowerCase();
if(b==$U.isBoolean.trueChars){
return true;
}else{
if(b==$U.isBoolean.falseChars){
return false;
}else{
return false;
}
}
}else{
return false;
}
}
}
};
$U.checkQuery=function(o){
var _2e6=null;
if(o&&o.COLUMNS&&$U.isArray(o.COLUMNS)&&o.DATA&&$U.isArray(o.DATA)&&(o.DATA.length==0||(o.DATA.length>0&&$U.isArray(o.DATA[0])))){
_2e6="row";
}else{
if(o&&o.COLUMNS&&$U.isArray(o.COLUMNS)&&o.ROWCOUNT&&$U.isInteger(o.ROWCOUNT)&&o.DATA){
_2e6="col";
for(var i=0;i<o.COLUMNS.length;i++){
var _2e8=o.DATA[o.COLUMNS[i]];
if(!_2e8||!$U.isArray(_2e8)){
_2e6=null;
break;
}
}
}
}
return _2e6;
};
$X.JSON=new function(){
var _2e9={}.hasOwnProperty?true:false;
var _2ea=/^("(\\.|[^"\\\n\r])*?"|[,:{}\[\]0-9.\-+Eaeflnr-u \n\r\t])+?$/;
var pad=function(n){
return n<10?"0"+n:n;
};
var m={"\b":"\\b","\t":"\\t","\n":"\\n","\f":"\\f","\r":"\\r","\"":"\\\"","\\":"\\\\"};
var _2ee=function(s){
if(/["\\\x00-\x1f]/.test(s)){
return "\""+s.replace(/([\x00-\x1f\\"])/g,function(a,b){
var c=m[b];
if(c){
return c;
}
c=b.charCodeAt();
return "\\u00"+Math.floor(c/16).toString(16)+(c%16).toString(16);
})+"\"";
}
return "\""+s+"\"";
};
var _2f3=function(o){
var a=["["],b,i,l=o.length,v;
for(i=0;i<l;i+=1){
v=o[i];
switch(typeof v){
case "undefined":
case "function":
case "unknown":
break;
default:
if(b){
a.push(",");
}
a.push(v===null?"null":$X.JSON.encode(v));
b=true;
}
}
a.push("]");
return a.join("");
};
var _2f6=function(o){
return "\""+o.getFullYear()+"-"+pad(o.getMonth()+1)+"-"+pad(o.getDate())+"T"+pad(o.getHours())+":"+pad(o.getMinutes())+":"+pad(o.getSeconds())+"\"";
};
this.encode=function(o){
return this.encodeInternal(o,false);
};
this.encodeInternal=function(o,cfc){
if(typeof o=="undefined"||o===null){
return "null";
}else{
if(o instanceof Array){
return _2f3(o);
}else{
if(o instanceof Date){
if(cfc){
return this.encodeInternal({_date_:o.getTime()},cfc);
}
return _2f6(o);
}else{
if(typeof o=="string"){
return _2ee(o);
}else{
if(typeof o=="number"){
return isFinite(o)?String(o):"null";
}else{
if(typeof o=="boolean"){
return String(o);
}else{
if(cfc&&typeof o=="object"&&typeof o._metadata!=="undefined"){
return "{\"_metadata\":"+this.encodeInternal(o._metadata,false)+",\"_variables\":"+this.encodeInternal(o._variables,cfc)+"}";
}else{
var a=["{"],b,i,v;
for(var i in o){
if(!_2e9||o.hasOwnProperty(i)){
v=o[i];
switch(typeof v){
case "undefined":
case "function":
case "unknown":
break;
default:
if(b){
a.push(",");
}
a.push(this.encodeInternal(i,cfc),":",v===null?"null":this.encodeInternal(v,cfc));
b=true;
}
}
}
a.push("}");
return a.join("");
}
}
}
}
}
}
}
};
this.decode=function(json){
if(typeof json=="object"){
return json;
}
if($U.isWhitespace(json)){
return null;
}
var _2fe=$U.getFirstNonWhitespaceIndex(json);
if(_2fe>0){
json=json.slice(_2fe);
}
if(window._cf_jsonprefix&&json.indexOf(_cf_jsonprefix)==0){
json=json.slice(_cf_jsonprefix.length);
}
try{
if(_2ea.test(json)){
return eval("("+json+")");
}
}
catch(e){
}
throw new SyntaxError("parseJSON");
};
}();
if(!$C.JSON){
$C.JSON={};
}
$C.JSON.encode=$X.JSON.encode;
$C.JSON.encodeInternal=$X.JSON.encodeInternal;
$C.JSON.decode=$X.JSON.decode;
$C.navigate=function(url,_300,_301,_302,_303,_304){
if(url==null){
$C.handleError(_302,"navigate.urlrequired","widget");
return;
}
if(_303){
_303=_303.toUpperCase();
if(_303!="GET"&&_303!="POST"){
$C.handleError(null,"navigate.invalidhttpmethod","http",[_303],null,null,true);
}
}else{
_303="GET";
}
var _305;
if(_304){
_305=$C.getFormQueryString(_304);
if(_305==-1){
$C.handleError(null,"navigate.formnotfound","http",[_304],null,null,true);
}
}
if(_300==null){
if(_305){
if(url.indexOf("?")==-1){
url+="?"+_305;
}else{
url+="&"+_305;
}
}
$L.info("navigate.towindow","widget",[url]);
window.location.replace(url);
return;
}
$L.info("navigate.tocontainer","widget",[url,_300]);
var obj=$C.objectCache[_300];
if(obj!=null){
if(typeof (obj._cf_body)!="undefined"&&obj._cf_body!=null){
_300=obj._cf_body;
}
}
$A.replaceHTML(_300,url,_303,_305,_301,_302);
};
$A.checkForm=function(_307,_308,_309,_30a,_30b){
var _30c=_308.call(null,_307);
if(_30c==false){
return false;
}
var _30d=$C.getFormQueryString(_307);
$L.info("ajax.submitform.submitting","http",[_307.name]);
$A.replaceHTML(_309,_307.action,_307.method,_30d,_30a,_30b);
return false;
};
$A.replaceHTML=function(_30e,url,_310,_311,_312,_313){
var _314=document.getElementById(_30e);
if(!_314){
$C.handleError(_313,"ajax.replacehtml.elnotfound","http",[_30e]);
return;
}
var _315="_cf_containerId="+encodeURIComponent(_30e);
_311=(_311)?_311+"&"+_315:_315;
$L.info("ajax.replacehtml.replacing","http",[_30e,url,_311]);
if(_cf_loadingtexthtml){
try{
_314.innerHTML=_cf_loadingtexthtml;
}
catch(e){
}
}
var _316=function(req,_318){
var _319=false;
if($A.isRequestError(req)){
$C.handleError(_313,"ajax.replacehtml.error","http",[req.status,_318.id,req.statusText],req.status,req.statusText);
_319=true;
}
var _31a=new $E.CustomEvent("onReplaceHTML",_318);
var _31b=new $E.CustomEvent("onReplaceHTMLUser",_318);
$E.loadEvents[_318.id]={system:_31a,user:_31b};
if(req.responseText.search(/<script/i)!=-1){
try{
_318.innerHTML="";
}
catch(e){
}
$A.replaceHTML.processResponseText(req.responseText,_318,_313);
}else{
try{
_318.innerHTML=req.responseText;
$A.updateLayouttab(_318);
}
catch(e){
}
}
$E.loadEvents[_318.id]=null;
_31a.fire();
_31a.unsubscribe();
_31b.fire();
_31b.unsubscribe();
$L.info("ajax.replacehtml.success","http",[_318.id]);
if(_312&&!_319){
_312();
}
};
try{
$A.sendMessage(url,_310,_311,true,_316,_314);
}
catch(e){
try{
_314.innerHTML=$L.format(CFMessage["ajax.replacehtml.connectionerrordisplay"],[url,e]);
}
catch(e){
}
$C.handleError(_313,"ajax.replacehtml.connectionerror","http",[_30e,url,e]);
}
};
$A.replaceHTML.processResponseText=function(text,_31d,_31e){
var pos=0;
var _320=0;
var _321=0;
_31d._cf_innerHTML="";
while(pos<text.length){
var _322=text.indexOf("<s",pos);
if(_322==-1){
_322=text.indexOf("<S",pos);
}
if(_322==-1){
break;
}
pos=_322;
var _323=true;
var _324=$A.replaceHTML.processResponseText.scriptTagChars;
for(var i=1;i<_324.length;i++){
var _326=pos+i+1;
if(_326>text.length){
break;
}
var _327=text.charAt(_326);
if(_324[i][0]!=_327&&_324[i][1]!=_327){
pos+=i+1;
_323=false;
break;
}
}
if(!_323){
continue;
}
var _328=text.substring(_320,pos);
if(_328){
_31d._cf_innerHTML+=_328;
}
var _329=text.indexOf(">",pos)+1;
if(_329==0){
pos++;
continue;
}else{
pos+=7;
}
var _32a=_329;
while(_32a<text.length&&_32a!=-1){
_32a=text.indexOf("</s",_32a);
if(_32a==-1){
_32a=text.indexOf("</S",_32a);
}
if(_32a!=-1){
_323=true;
for(var i=1;i<_324.length;i++){
var _326=_32a+2+i;
if(_326>text.length){
break;
}
var _327=text.charAt(_326);
if(_324[i][0]!=_327&&_324[i][1]!=_327){
_32a=_326;
_323=false;
break;
}
}
if(_323){
break;
}
}
}
if(_32a!=-1){
var _32b=text.substring(_329,_32a);
var _32c=_32b.indexOf("<!--");
if(_32c!=-1){
_32b=_32b.substring(_32c+4);
}
var _32d=_32b.lastIndexOf("//-->");
if(_32d!=-1){
_32b=_32b.substring(0,_32d-1);
}
if(_32b.indexOf("document.write")!=-1||_32b.indexOf("CF_RunContent")!=-1){
if(_32b.indexOf("CF_RunContent")!=-1){
_32b=_32b.replace("CF_RunContent","document.write");
}
_32b="var _cfDomNode = document.getElementById('"+_31d.id+"'); var _cfBuffer='';"+"if (!document._cf_write)"+"{document._cf_write = document.write;"+"document.write = function(str){if (_cfBuffer!=null){_cfBuffer+=str;}else{document._cf_write(str);}};};"+_32b+";_cfDomNode._cf_innerHTML += _cfBuffer; _cfBuffer=null;";
}
try{
eval(_32b);
}
catch(ex){
$C.handleError(_31e,"ajax.replacehtml.jserror","http",[_31d.id,ex]);
}
}
_322=text.indexOf(">",_32a)+1;
if(_322==0){
_321=_32a+1;
break;
}
_321=_322;
pos=_322;
_320=_322;
}
if(_321<text.length-1){
var _328=text.substring(_321,text.length);
if(_328){
_31d._cf_innerHTML+=_328;
}
}
try{
_31d.innerHTML=_31d._cf_innerHTML;
$A.updateLayouttab(_31d);
}
catch(e){
}
_31d._cf_innerHTML="";
};
$A.updateLayouttab=function(_32e){
var _32f=_32e.id;
if(_32f.length>13&&_32f.indexOf("cf_layoutarea")==0){
var s=_32f.substr(13,_32f.length);
var cmp=Ext.getCmp(s);
var _332=_32e.innerHTML;
if(cmp){
cmp.update("<div id="+_32e.id+">"+_32e.innerHTML+"</div>");
}
var _333=document.getElementById(_32f);
if(_333){
_333.innerHTML=_332;
}
}
};
$A.replaceHTML.processResponseText.scriptTagChars=[["s","S"],["c","C"],["r","R"],["i","I"],["p","P"],["t","T"]];
$D.getElement=function(_334,_335){
var _336=function(_337){
return (_337.name==_334||_337.id==_334);
};
var _338=$D.getElementsBy(_336,null,_335);
if(_338.length==1){
return _338[0];
}else{
return _338;
}
};
$D.getElementsBy=function(_339,tag,root){
tag=tag||"*";
var _33c=[];
if(root){
root=$D.get(root);
if(!root){
return _33c;
}
}else{
root=document;
}
var _33d=root.getElementsByTagName(tag);
if(!_33d.length&&(tag=="*"&&root.all)){
_33d=root.all;
}
for(var i=0,len=_33d.length;i<len;++i){
if(_339(_33d[i])){
_33c[_33c.length]=_33d[i];
}
}
return _33c;
};
$D.get=function(el){
if(!el){
return null;
}
if(typeof el!="string"&&!(el instanceof Array)){
return el;
}
if(typeof el=="string"){
return document.getElementById(el);
}else{
var _340=[];
for(var i=0,len=el.length;i<len;++i){
_340[_340.length]=$D.get(el[i]);
}
return _340;
}
return null;
};
$E.loadEvents={};
$E.CustomEvent=function(_342,_343){
return {name:_342,domNode:_343,subs:[],subscribe:function(func,_345){
var dup=false;
for(var i=0;i<this.subs.length;i++){
var sub=this.subs[i];
if(sub.f==func&&sub.p==_345){
dup=true;
break;
}
}
if(!dup){
this.subs.push({f:func,p:_345});
}
},fire:function(){
for(var i=0;i<this.subs.length;i++){
var sub=this.subs[i];
sub.f.call(null,this,sub.p);
}
},unsubscribe:function(){
this.subscribers=[];
}};
};
$E.windowLoadImpEvent=new $E.CustomEvent("cfWindowLoadImp");
$E.windowLoadEvent=new $E.CustomEvent("cfWindowLoad");
$E.windowLoadUserEvent=new $E.CustomEvent("cfWindowLoadUser");
$E.listeners=[];
$E.addListener=function(el,ev,fn,_34e){
var l={el:el,ev:ev,fn:fn,params:_34e};
$E.listeners.push(l);
var _350=function(e){
if(!e){
var e=window.event;
}
fn.call(null,e,_34e);
};
if(el.addEventListener){
el.addEventListener(ev,_350,false);
return true;
}else{
if(el.attachEvent){
el.attachEvent("on"+ev,_350);
return true;
}else{
return false;
}
}
};
$E.isListener=function(el,ev,fn,_355){
var _356=false;
var ls=$E.listeners;
for(var i=0;i<ls.length;i++){
if(ls[i].el==el&&ls[i].ev==ev&&ls[i].fn==fn&&ls[i].params==_355){
_356=true;
break;
}
}
return _356;
};
$E.callBindHandlers=function(id,_35a,ev){
var el=document.getElementById(id);
if(!el){
return;
}
var ls=$E.listeners;
for(var i=0;i<ls.length;i++){
if(ls[i].el==el&&ls[i].ev==ev&&ls[i].fn._cf_bindhandler){
ls[i].fn.call(null,null,ls[i].params);
}
}
};
$E.registerOnLoad=function(func,_360,_361,user){
if($E.registerOnLoad.windowLoaded){
if(_360&&_360._cf_containerId&&$E.loadEvents[_360._cf_containerId]){
if(user){
$E.loadEvents[_360._cf_containerId].user.subscribe(func,_360);
}else{
$E.loadEvents[_360._cf_containerId].system.subscribe(func,_360);
}
}else{
func.call(null,null,_360);
}
}else{
if(user){
$E.windowLoadUserEvent.subscribe(func,_360);
}else{
if(_361){
$E.windowLoadImpEvent.subscribe(func,_360);
}else{
$E.windowLoadEvent.subscribe(func,_360);
}
}
}
};
$E.registerOnLoad.windowLoaded=false;
$E.onWindowLoad=function(fn){
if(window.addEventListener){
window.addEventListener("load",fn,false);
}else{
if(window.attachEvent){
window.attachEvent("onload",fn);
}else{
if(document.getElementById){
window.onload=fn;
}
}
}
};
$C.addSpanToDom=function(){
var _364=document.createElement("span");
document.body.insertBefore(_364,document.body.firstChild);
};
$E.windowLoadHandler=function(e){
if(window.Ext){
Ext.BLANK_IMAGE_URL=_cf_ajaxscriptsrc+"/resources/ext/images/default/s.gif";
}
$C.addSpanToDom();
$L.init();
$E.registerOnLoad.windowLoaded=true;
$E.windowLoadImpEvent.fire();
$E.windowLoadImpEvent.unsubscribe();
$E.windowLoadEvent.fire();
$E.windowLoadEvent.unsubscribe();
if(window.Ext){
Ext.onReady(function(){
$E.windowLoadUserEvent.fire();
});
}else{
$E.windowLoadUserEvent.fire();
}
$E.windowLoadUserEvent.unsubscribe();
};
$E.onWindowLoad($E.windowLoadHandler);
$B.register=function(_366,_367,_368,_369){
for(var i=0;i<_366.length;i++){
var _36b=_366[i][0];
var _36c=_366[i][1];
var _36d=_366[i][2];
if(window[_36b]){
var _36e=eval(_36b);
if(_36e&&_36e._cf_register){
_36e._cf_register(_36d,_368,_367);
continue;
}
}
var _36f=$C.objectCache[_36b];
if(_36f&&_36f._cf_register){
_36f._cf_register(_36d,_368,_367);
continue;
}
var _370=$D.getElement(_36b,_36c);
var _371=(_370&&((!_370.length&&_370.length!=0)||(_370.length&&_370.length>0)||_370.tagName=="SELECT"));
if(!_371){
$C.handleError(null,"bind.register.elnotfound","bind",[_36b]);
}
if(_370.length>1&&!_370.options){
for(var j=0;j<_370.length;j++){
$B.register.addListener(_370[j],_36d,_368,_367);
}
}else{
$B.register.addListener(_370,_36d,_368,_367);
}
}
if(!$C.bindHandlerCache[_367.bindTo]&&typeof (_367.bindTo)=="string"){
$C.bindHandlerCache[_367.bindTo]=function(){
_368.call(null,null,_367);
};
}
if(_369){
_368.call(null,null,_367);
}
};
$B.register.addListener=function(_373,_374,_375,_376){
if(!$E.isListener(_373,_374,_375,_376)){
$E.addListener(_373,_374,_375,_376);
}
};
$B.assignValue=function(_377,_378,_379,_37a){
if(!_377){
return;
}
if(_377.call){
_377.call(null,_379,_37a);
return;
}
var _37b=$C.objectCache[_377];
if(_37b&&_37b._cf_setValue){
_37b._cf_setValue(_379);
return;
}
var _37c=document.getElementById(_377);
if(!_37c){
$C.handleError(null,"bind.assignvalue.elnotfound","bind",[_377]);
}
if(_37c.tagName=="SELECT"){
var _37d=$U.checkQuery(_379);
var _37e=$C.objectCache[_377];
if(_37d){
if(!_37e||(_37e&&(!_37e.valueCol||!_37e.displayCol))){
$C.handleError(null,"bind.assignvalue.selboxmissingvaldisplay","bind",[_377]);
return;
}
}else{
if(typeof (_379.length)=="number"&&!_379.toUpperCase){
if(_379.length>0&&(typeof (_379[0].length)!="number"||_379[0].toUpperCase)){
$C.handleError(null,"bind.assignvalue.selboxerror","bind",[_377]);
return;
}
}else{
$C.handleError(null,"bind.assignvalue.selboxerror","bind",[_377]);
return;
}
}
_37c.options.length=0;
var _37f;
var _380=false;
if(_37e){
_37f=_37e.selected;
if(_37f&&_37f.length>0){
_380=true;
}
}
if(!_37d){
for(var i=0;i<_379.length;i++){
var opt=new Option(_379[i][1],_379[i][0]);
_37c.options[i]=opt;
if(_380){
for(var j=0;j<_37f.length;j++){
if(_37f[j]==opt.value){
opt.selected=true;
}
}
}
}
}else{
if(_37d=="col"){
var _384=_379.DATA[_37e.valueCol];
var _385=_379.DATA[_37e.displayCol];
if(!_384||!_385){
$C.handleError(null,"bind.assignvalue.selboxinvalidvaldisplay","bind",[_377]);
return;
}
for(var i=0;i<_384.length;i++){
var opt=new Option(_385[i],_384[i]);
_37c.options[i]=opt;
if(_380){
for(var j=0;j<_37f.length;j++){
if(_37f[j]==opt.value){
opt.selected=true;
}
}
}
}
}else{
if(_37d=="row"){
var _386=-1;
var _387=-1;
for(var i=0;i<_379.COLUMNS.length;i++){
var col=_379.COLUMNS[i];
if(col==_37e.valueCol){
_386=i;
}
if(col==_37e.displayCol){
_387=i;
}
if(_386!=-1&&_387!=-1){
break;
}
}
if(_386==-1||_387==-1){
$C.handleError(null,"bind.assignvalue.selboxinvalidvaldisplay","bind",[_377]);
return;
}
for(var i=0;i<_379.DATA.length;i++){
var opt=new Option(_379.DATA[i][_387],_379.DATA[i][_386]);
_37c.options[i]=opt;
if(_380){
for(var j=0;j<_37f.length;j++){
if(_37f[j]==opt.value){
opt.selected=true;
}
}
}
}
}
}
}
}else{
_37c[_378]=_379;
}
$E.callBindHandlers(_377,null,"change");
$L.info("bind.assignvalue.success","bind",[_379,_377,_378]);
};
$B.localBindHandler=function(e,_38a){
var _38b=document.getElementById(_38a.bindTo);
var _38c=$B.evaluateBindTemplate(_38a,true);
$B.assignValue(_38a.bindTo,_38a.bindToAttr,_38c);
};
$B.localBindHandler._cf_bindhandler=true;
$B.evaluateBindTemplate=function(_38d,_38e,_38f,_390,_391){
var _392=_38d.bindExpr;
var _393="";
if(typeof _391=="undefined"){
_391=false;
}
for(var i=0;i<_392.length;i++){
if(typeof (_392[i])=="object"){
var _395=null;
if(!_392[i].length||typeof _392[i][0]=="object"){
_395=$X.JSON.encode(_392[i]);
}else{
var _395=$B.getBindElementValue(_392[i][0],_392[i][1],_392[i][2],_38e,_390);
if(_395==null){
if(_38e){
_393="";
break;
}else{
_395="";
}
}
}
if(_38f){
_395=encodeURIComponent(_395);
}
_393+=_395;
}else{
var _396=_392[i];
if(_391==true&&i>0){
if(typeof (_396)=="string"&&_396.indexOf("&")!=0){
_396=encodeURIComponent(_396);
}
}
_393+=_396;
}
}
return _393;
};
$B.jsBindHandler=function(e,_398){
var _399=_398.bindExpr;
var _39a=new Array();
var _39b=_398.callFunction+"(";
for(var i=0;i<_399.length;i++){
var _39d;
if(typeof (_399[i])=="object"){
if(_399[i].length){
if(typeof _399[i][0]=="object"){
_39d=_399[i];
}else{
_39d=$B.getBindElementValue(_399[i][0],_399[i][1],_399[i][2],false);
}
}else{
_39d=_399[i];
}
}else{
_39d=_399[i];
}
if(i!=0){
_39b+=",";
}
_39a[i]=_39d;
_39b+="'"+_39d+"'";
}
_39b+=")";
var _39e=_398.callFunction.apply(null,_39a);
$B.assignValue(_398.bindTo,_398.bindToAttr,_39e,_398.bindToParams);
};
$B.jsBindHandler._cf_bindhandler=true;
$B.urlBindHandler=function(e,_3a0){
var _3a1=_3a0.bindTo;
if($C.objectCache[_3a1]&&$C.objectCache[_3a1]._cf_visible===false){
$C.objectCache[_3a1]._cf_dirtyview=true;
return;
}
var url=$B.evaluateBindTemplate(_3a0,false,true,false,true);
var _3a3=$U.extractReturnFormat(url);
if(_3a3==null||typeof _3a3=="undefined"){
_3a3="JSON";
}
if(_3a0.bindToAttr||typeof _3a0.bindTo=="undefined"||typeof _3a0.bindTo=="function"){
var _3a0={"bindTo":_3a0.bindTo,"bindToAttr":_3a0.bindToAttr,"bindToParams":_3a0.bindToParams,"errorHandler":_3a0.errorHandler,"url":url,returnFormat:_3a3};
try{
$A.sendMessage(url,"GET",null,true,$B.urlBindHandler.callback,_3a0);
}
catch(e){
$C.handleError(_3a0.errorHandler,"ajax.urlbindhandler.connectionerror","http",[url,e]);
}
}else{
$A.replaceHTML(_3a1,url,null,null,_3a0.callback,_3a0.errorHandler);
}
};
$B.urlBindHandler._cf_bindhandler=true;
$B.urlBindHandler.callback=function(req,_3a5){
if($A.isRequestError(req)){
$C.handleError(_3a5.errorHandler,"bind.urlbindhandler.httperror","http",[req.status,_3a5.url,req.statusText],req.status,req.statusText);
}else{
$L.info("bind.urlbindhandler.response","http",[req.responseText]);
var _3a6;
try{
if(_3a5.returnFormat==null||_3a5.returnFormat==="JSON"){
_3a6=$X.JSON.decode(req.responseText);
}else{
_3a6=req.responseText;
}
}
catch(e){
if(req.responseText!=null&&typeof req.responseText=="string"){
_3a6=req.responseText;
}else{
$C.handleError(_3a5.errorHandler,"bind.urlbindhandler.jsonerror","http",[req.responseText]);
}
}
$B.assignValue(_3a5.bindTo,_3a5.bindToAttr,_3a6,_3a5.bindToParams);
}
};
$A.initSelect=function(_3a7,_3a8,_3a9,_3aa){
$C.objectCache[_3a7]={"valueCol":_3a8,"displayCol":_3a9,selected:_3aa};
};
$S.setupSpry=function(){
if(typeof (Spry)!="undefined"&&Spry.Data){
Spry.Data.DataSet.prototype._cf_getAttribute=function(_3ab){
var val;
var row=this.getCurrentRow();
if(row){
val=row[_3ab];
}
return val;
};
Spry.Data.DataSet.prototype._cf_register=function(_3ae,_3af,_3b0){
var obs={bindParams:_3b0};
obs.onCurrentRowChanged=function(){
_3af.call(null,null,this.bindParams);
};
obs.onDataChanged=function(){
_3af.call(null,null,this.bindParams);
};
this.addObserver(obs);
};
if(Spry.Debug.trace){
var _3b2=Spry.Debug.trace;
Spry.Debug.trace=function(str){
$L.info(str,"spry");
_3b2(str);
};
}
if(Spry.Debug.reportError){
var _3b4=Spry.Debug.reportError;
Spry.Debug.reportError=function(str){
$L.error(str,"spry");
_3b4(str);
};
}
$L.info("spry.setupcomplete","bind");
}
};
$E.registerOnLoad($S.setupSpry,null,true);
$S.bindHandler=function(_3b6,_3b7){
var url;
var _3b9="_cf_nodebug=true&_cf_nocache=true";
if(window._cf_clientid){
_3b9+="&_cf_clientid="+_cf_clientid;
}
var _3ba=window[_3b7.bindTo];
var _3bb=(typeof (_3ba)=="undefined");
if(_3b7.cfc){
var _3bc={};
var _3bd=_3b7.bindExpr;
for(var i=0;i<_3bd.length;i++){
var _3bf;
if(_3bd[i].length==2){
_3bf=_3bd[i][1];
}else{
_3bf=$B.getBindElementValue(_3bd[i][1],_3bd[i][2],_3bd[i][3],false,_3bb);
}
_3bc[_3bd[i][0]]=_3bf;
}
_3bc=$X.JSON.encode(_3bc);
_3b9+="&method="+_3b7.cfcFunction;
_3b9+="&argumentCollection="+encodeURIComponent(_3bc);
$L.info("spry.bindhandler.loadingcfc","http",[_3b7.bindTo,_3b7.cfc,_3b7.cfcFunction,_3bc]);
url=_3b7.cfc;
}else{
url=$B.evaluateBindTemplate(_3b7,false,true,_3bb);
$L.info("spry.bindhandler.loadingurl","http",[_3b7.bindTo,url]);
}
var _3c0=_3b7.options||{};
if((_3ba&&_3ba._cf_type=="json")||_3b7.dsType=="json"){
_3b9+="&returnformat=json";
}
if(_3ba){
if(_3ba.requestInfo.method=="GET"){
_3c0.method="GET";
if(url.indexOf("?")==-1){
url+="?"+_3b9;
}else{
url+="&"+_3b9;
}
}else{
_3c0.postData=_3b9;
_3c0.method="POST";
_3ba.setURL("");
}
_3ba.setURL(url,_3c0);
_3ba.loadData();
}else{
if(!_3c0.method||_3c0.method=="GET"){
if(url.indexOf("?")==-1){
url+="?"+_3b9;
}else{
url+="&"+_3b9;
}
}else{
_3c0.postData=_3b9;
_3c0.useCache=false;
}
var ds;
if(_3b7.dsType=="xml"){
ds=new Spry.Data.XMLDataSet(url,_3b7.xpath,_3c0);
}else{
ds=new Spry.Data.JSONDataSet(url,_3c0);
ds.preparseFunc=$S.preparseData;
}
ds._cf_type=_3b7.dsType;
var _3c2={onLoadError:function(req){
$C.handleError(_3b7.errorHandler,"spry.bindhandler.error","http",[_3b7.bindTo,req.url,req.requestInfo.postData]);
}};
ds.addObserver(_3c2);
window[_3b7.bindTo]=ds;
}
};
$S.bindHandler._cf_bindhandler=true;
$S.preparseData=function(ds,_3c5){
var _3c6=$U.getFirstNonWhitespaceIndex(_3c5);
if(_3c6>0){
_3c5=_3c5.slice(_3c6);
}
if(window._cf_jsonprefix&&_3c5.indexOf(_cf_jsonprefix)==0){
_3c5=_3c5.slice(_cf_jsonprefix.length);
}
return _3c5;
};
$P.init=function(_3c7){
$L.info("pod.init.creating","widget",[_3c7]);
var _3c8={};
_3c8._cf_body=_3c7+"_body";
$C.objectCache[_3c7]=_3c8;
};
$B.cfcBindHandler=function(e,_3ca){
var _3cb=(_3ca.httpMethod)?_3ca.httpMethod:"GET";
var _3cc={};
var _3cd=_3ca.bindExpr;
for(var i=0;i<_3cd.length;i++){
var _3cf;
if(_3cd[i].length==2){
_3cf=_3cd[i][1];
}else{
_3cf=$B.getBindElementValue(_3cd[i][1],_3cd[i][2],_3cd[i][3],false);
}
_3cc[_3cd[i][0]]=_3cf;
}
var _3d0=function(_3d1,_3d2){
$B.assignValue(_3d2.bindTo,_3d2.bindToAttr,_3d1,_3d2.bindToParams);
};
var _3d3={"bindTo":_3ca.bindTo,"bindToAttr":_3ca.bindToAttr,"bindToParams":_3ca.bindToParams};
var _3d4={"async":true,"cfcPath":_3ca.cfc,"httpMethod":_3cb,"callbackHandler":_3d0,"errorHandler":_3ca.errorHandler};
if(_3ca.proxyCallHandler){
_3d4.callHandler=_3ca.proxyCallHandler;
_3d4.callHandlerParams=_3ca;
}
$X.invoke(_3d4,_3ca.cfcFunction,_3ca._cf_ajaxproxytoken,_3cc,_3d3);
};
$B.cfcBindHandler._cf_bindhandler=true;
$U.extractReturnFormat=function(url){
var _3d6;
var _3d7=url.toUpperCase();
var _3d8=_3d7.indexOf("RETURNFORMAT");
if(_3d8>0){
var _3d9=_3d7.indexOf("&",_3d8+13);
if(_3d9<0){
_3d9=_3d7.length;
}
_3d6=_3d7.substring(_3d8+13,_3d9);
}
return _3d6;
};
$U.replaceAll=function(_3da,_3db,_3dc){
var _3dd=_3da.indexOf(_3db);
while(_3dd>-1){
_3da=_3da.replace(_3db,_3dc);
_3dd=_3da.indexOf(_3db);
}
return _3da;
};
$U.cloneObject=function(obj){
var _3df={};
for(key in obj){
var _3e0=obj[key];
if(typeof _3e0=="object"){
_3e0=$U.cloneObject(_3e0);
}
_3df.key=_3e0;
}
return _3df;
};
$C.clone=function(obj,_3e2){
if(typeof (obj)!="object"){
return obj;
}
if(obj==null){
return obj;
}
var _3e3=new Object();
for(var i in obj){
if(_3e2===true){
_3e3[i]=$C.clone(obj[i]);
}else{
_3e3[i]=obj[i];
}
}
return _3e3;
};
$C.printObject=function(obj){
var str="";
for(key in obj){
str=str+"  "+key+"=";
value=obj[key];
if(typeof (value)=="object"){
value=$C.printObject(value);
}
str+=value;
}
return str;
};
}
}
cfinit();
