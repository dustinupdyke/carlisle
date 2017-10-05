/*ADOBE SYSTEMS INCORPORATED
Copyright 2012 Adobe Systems Incorporated
All Rights Reserved.

NOTICE:  Adobe permits you to use, modify, and distribute this file in accordance with the
terms of the Adobe license agreement accompanying it.  If you have received this file from a
source other than Adobe, then your use, modification, or distribution of it requires the prior
written permission of Adobe.*/
var _CF_error_messages=new Array();
var _CF_error_fields=new Object();
var _CF_FirstErrorField=null;
var _CF_submit_status=new Array();
_CF_signalLoad=function(){
_CF_loaded=1;
};
_CF_onError=function(_91a,_91b,_91c,_91d){
if(_CF_error_fields[_91b]==null){
if(_CF_FirstErrorField==null){
_CF_FirstErrorField=_91b;
}
_CF_error_exists=true;
_CF_error_fields[_91b]=_91d;
_CF_error_messages[_CF_error_messages.length]=_91d;
}
};
_CF_onErrorAlert=function(_91e){
var _91f="";
for(var i=0;i<_91e.length;i++){
_91f+=_91e[i]+"\n";
}
alert(_91f);
return false;
};
updateHiddenValue=function(val,form,name){
if(form==null||form==""){
form=0;
}
if(document.forms[form]==null||document.forms[form][name]==null){
return;
}
document.forms[form][name].value=val;
};
_CF_hasValue=function(obj,_925,_926){
if(_925=="TEXT"||_925=="FILE"||_925=="PASSWORD"||_925=="CFTEXTAREA"||_925=="TEXTAREA"||_925=="CFTEXTINPUT"||_925=="DATEFIELD"){
if(obj.value.length==0){
return false;
}else{
if(_926){
str=obj.value.replace(/^\s+/,"").replace(/\s+$/,"");
if(str.length==0){
return false;
}
}
}
return true;
}else{
if(_925=="SELECT"){
for(i=0;i<obj.length;i++){
if(obj.options[i].selected&&obj.options[i].value.length>0){
return true;
}
}
return false;
}else{
if(_925=="SINGLE_VALUE_RADIO"||_925=="SINGLE_VALUE_CHECKBOX"){
if(obj.checked){
return true;
}else{
return false;
}
}else{
if(_925=="RADIO"||_925=="CHECKBOX"){
if(obj.length==undefined&&obj.checked){
return true;
}else{
for(i=0;i<obj.length;i++){
if(obj[i].checked){
return true;
}
}
}
return false;
}else{
if(_925=="CFTREE"){
if(obj["value"].length>0){
return true;
}else{
return false;
}
}else{
if(_925=="RICHTEXT"){
var _927=FCKeditorAPI.GetInstance(obj.id);
var val=_927.GetXHTML();
if(val.length==0){
return false;
}else{
if(_926){
str=val.replace(/^\s+/,"").replace(/\s+$/,"");
if(str.length==0){
return false;
}
}
return true;
}
}else{
return true;
}
}
}
}
}
}
};
_CF_checkdate=function(_929,_92a){
_929=_929.replace(/^\s+/,"").replace(/\s+$/,"");
_929=_929=_929.replace(/{d \'/,"").replace(/'}/,"");
if(_92a){
if(_929.length==0){
return false;
}
}else{
if(_929.length==0){
return true;
}
}
if(_929.length==0){
return true;
}
isplit=_929.indexOf("/");
splitchr="/";
if(isplit==-1){
isplit=_929.indexOf(".");
splitchr=".";
}
if(isplit==-1){
isplit=_929.indexOf("-");
splitchr="-";
}
if(isplit==-1||isplit==_929.length){
return false;
}
var _92b=_929.substring(0,isplit);
if(_92b.length==4){
sYear=_929.substring(0,isplit);
isplit=_929.indexOf(splitchr,isplit+1);
if(isplit==-1||(isplit+1)==_929.length){
return false;
}
sMonth=_929.substring((sYear.length+1),isplit);
sDay=_929.substring(isplit+1);
}else{
sMonth=_929.substring(0,isplit);
isplit=_929.indexOf(splitchr,isplit+1);
if(isplit==-1||(isplit+1)==_929.length){
return false;
}
sDay=_929.substring((sMonth.length+1),isplit);
sYear=_929.substring(isplit+1);
}
if((sDay.length==0)||(sMonth.length==0)||(sYear.length==0)){
return false;
}
if(!_CF_checkinteger(sMonth)){
return false;
}else{
if(!_CF_checkrange(sMonth,1,12)){
return false;
}else{
if(!_CF_checkinteger(sYear)){
return false;
}else{
if(sYear.length!=1&&sYear.length!=2&&sYear.length!=4){
return false;
}else{
if(!_CF_checkrange(sYear,0,9999)){
return false;
}else{
if(!_CF_checkinteger(sDay)){
return false;
}else{
if(!_CF_checkday(sYear,sMonth,sDay)){
return false;
}else{
return true;
}
}
}
}
}
}
}
};
_CF_checkeurodate=function(_92c,_92d){
_92c=_92c.replace(/^\s+/,"").replace(/\s+$/,"");
_92c=_92c=_92c.replace(/{d \'/,"").replace(/'}/,"");
if(_92d){
if(_92c.length==0){
return false;
}
}else{
if(_92c.length==0){
return true;
}
}
isplit=_92c.indexOf("/");
splitchr="/";
if(isplit==-1){
isplit=_92c.indexOf(".");
splitchr=".";
}
if(isplit==-1){
isplit=_92c.indexOf("-");
splitchr="-";
}
if(isplit==-1||isplit==_92c.length){
return false;
}
var _92e=_92c.substring(0,isplit);
if(_92e.length==4){
sYear=_92c.substring(0,isplit);
isplit=_92c.indexOf(splitchr,isplit+1);
if(isplit==-1||(isplit+1)==_92c.length){
return false;
}
sMonth=_92c.substring((sYear.length+1),isplit);
sDay=_92c.substring(isplit+1);
}else{
sDay=_92c.substring(0,isplit);
isplit=_92c.indexOf(splitchr,isplit+1);
if(isplit==-1||(isplit+1)==_92c.length){
return false;
}
sMonth=_92c.substring((sDay.length+1),isplit);
sYear=_92c.substring(isplit+1);
}
if(!_CF_checkinteger(sMonth)){
return false;
}else{
if(!_CF_checkrange(sMonth,1,12)){
return false;
}else{
if(!_CF_checkinteger(sYear)){
return false;
}else{
if(!_CF_checkrange(sYear,0,null)){
return false;
}else{
if(!_CF_checkinteger(sDay)){
return false;
}else{
if(!_CF_checkday(sYear,sMonth,sDay)){
return false;
}else{
return true;
}
}
}
}
}
}
};
_CF_checkday=function(_92f,_930,_931){
maxDay=31;
if(_930==4||_930==6||_930==9||_930==11){
maxDay=30;
}else{
if(_930==2){
if(_92f%4>0){
maxDay=28;
}else{
if(_92f%100==0&&_92f%400>0){
maxDay=28;
}else{
maxDay=29;
}
}
}
}
return _CF_checkrange(_931,1,maxDay);
};
_CF_checkinteger=function(_932,_933){
_932=_932.replace(/^\s+/,"").replace(/\s+$/,"");
_932=_932.replace(/[$Â£Â¥â‚¬,~+]?/g,"");
if(_933){
if(_932.length==0){
return false;
}
}else{
if(_932.length==0){
return true;
}
}
var _934=".";
var _935=_932.indexOf(_934);
if(_935==-1){
return _CF_checknumber(_932);
}else{
return false;
}
};
_CF_numberrange=function(_936,_937,_938,_939){
if(_939){
if(_936.length==0){
return false;
}
}else{
if(_936.length==0){
return true;
}
}
if(_937!=null){
if(_936<_937){
return false;
}
}
if(_938!=null){
if(_936>_938){
return false;
}
}
return true;
};
_CF_checknumber=function(_93a,_93b){
var _93c=" .+-0123456789";
var _93d=" .0123456789";
var _93e;
var _93f=false;
var _940=false;
var _941=false;
_93a=_93a.replace(/^\s+/,"").replace(/\s+$/,"");
_93a=_93a.replace(/[$Â£Â¥â‚¬,~+]?/g,"");
if(_93b){
if(_93a.length==0){
return false;
}
}else{
if(_93a.length==0){
return true;
}
}
_93e=_93c.indexOf(_93a.charAt(0));
if(_93e==1){
_93f=true;
}else{
if(_93e<1){
return false;
}
}
for(var i=1;i<_93a.length;i++){
_93e=_93d.indexOf(_93a.charAt(i));
if(_93e<0){
return false;
}else{
if(_93e==1){
if(_93f){
return false;
}else{
_93f=true;
}
}else{
if(_93e==0){
if(_93f||_941){
_940=true;
}
}else{
if(_940){
return false;
}else{
_941=true;
}
}
}
}
}
return true;
};
_CF_checkrange=function(_943,_944,_945,_946){
_943=_943.replace(/^\s+/,"").replace(/\s+$/,"");
if(_946){
if(_943.length==0){
return false;
}
}else{
if(_943.length==0){
return true;
}
}
if(!_CF_checknumber(_943)){
return false;
}else{
return (_CF_numberrange((eval(_943)),_944,_945));
}
return true;
};
_CF_checktime=function(_947,_948){
_947=_947.replace(/^\s+/,"").replace(/\s+$/,"");
_947=_947.replace(/\s+:\s+/,":");
_947=_947=_947.replace(/{t \'/,"").replace(/'}/,"");
if(_948){
if(_947.length==0){
return false;
}
}else{
if(_947.length==0){
return true;
}
}
var _949=_CF_checkregex(_947,/^((([0-1]?\d)|(2[0-3])):[0-5]?\d)?(:[0-5]?\d)? ?([AP]M|[AP]m|[ap]m|[ap]M)?$/,_948);
return _949;
};
_CF_checkphone=function(_94a,_94b){
_94a=_94a.replace(/^\s+/,"").replace(/\s+$/,"");
if(_94b){
if(_94a.length==0){
return false;
}
}else{
if(_94a.length==0){
return true;
}
}
if(_94a.length==0){
return true;
}
return _CF_checkregex(_94a,/^(((1))?[ ,\-,\.]?([\\(]?([1-9][0-9]{2})[\\)]?))?[ ,\-,\.]?([^0-1]){1}([0-9]){2}[ ,\-,\.]?([0-9]){4}(( )((x){0,1}([0-9]){1,5}){0,1})?$/,_94b);
};
_CF_checkzip=function(_94c,_94d){
_94c=_94c.replace(/^\s+/,"").replace(/\s+$/,"");
if(_94d){
if(_94c.length==0){
return false;
}
}else{
if(_94c.length==0){
return true;
}
}
return _CF_checkregex(_94c,/^([0-9]){5,5}$|(([0-9]){5,5}(-| ){1}([0-9]){4,4}$)/,_94d);
};
_CF_checkcreditcard=function(_94e,_94f){
_94e=_94e.replace(/^\s+/,"").replace(/\s+$/,"");
if(_94f){
if(_94e.length==0){
return false;
}
}else{
if(_94e.length==0){
return true;
}
}
if(_94e.length==0){
return true;
}
var _950=" -";
var _951="";
var _952;
for(var i=0;i<_94e.length;i++){
_952=_950.indexOf(_94e.charAt(i));
if(_952<0){
_951+=_94e.substring(i,(i+1));
}
}
if(_951.length<13||_951.length>19){
return false;
}
if(_951.charAt(0)=="+"){
return false;
}
if(!_CF_checkinteger(_951)){
return false;
}
var _954=_951.length%2==1?false:true;
var _955=0;
var _956;
for(var i=0;i<_951.length;i++){
_956=eval(_951.charAt(i));
if(_954){
_956*=2;
_955+=(_956%10);
if((_956/10)>=1){
_955++;
}
_954=false;
}else{
_955+=_956;
_954=true;
}
}
return (_955%10)==0?true:false;
};
_CF_checkssn=function(_957,_958){
_957=_957.replace(/^\s+/,"").replace(/\s+$/,"");
if(_958){
if(_957.length==0){
return false;
}
}else{
if(_957.length==0){
return true;
}
}
return _CF_checkregex(_957,/^[0-9]{3}(-| )[0-9]{2}(-| )[0-9]{4}$/,_958);
};
_CF_checkEmail=function(_959,_95a){
_959=_959.replace(/^\s+/,"").replace(/\s+$/,"");
if(_95a){
if(_959.length==0){
return false;
}
}else{
if(_959.length==0){
return true;
}
}
return _CF_checkregex(_959,/^[a-zA-Z_0-9-'\+~]+(\.[a-zA-Z_0-9-'\+~]+)*@([a-zA-Z_0-9-]+\.)+[a-zA-Z]*$/,_95a);
};
_CF_checkURL=function(_95b,_95c){
_95b=_95b.replace(/^\s+/,"").replace(/\s+$/,"");
if(_95c){
if(_95b.length==0){
return false;
}
}else{
if(_95b.length==0){
return true;
}
}
return _CF_checkregex(_95b.toLowerCase(),/^((http|https|ftp|file)\:\/\/([a-zA-Z0-0]*:[a-zA-Z0-0]*(@))?[a-zA-Z0-9-\.]+(\.[a-zA-Z]{2,3})?(:[a-zA-Z0-9]*)?\/?([a-zA-Z0-9-\._\?\,\'\/\+&amp;%\$#\=~])*)|((mailto)\:[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*@([a-zA-Z0-9-]+\.)+[a-zA-Z0-9]*)|((news)\:[a-zA-Z0-9\.]*)$/,_95c);
};
_CF_checkUUID=function(_95d,_95e){
_95d=_95d.replace(/^\s+/,"").replace(/\s+$/,"");
if(_95e){
if(_95d.length==0){
return false;
}
}else{
if(_95d.length==0){
return true;
}
}
return _CF_checkregex(_95d,/[A-Fa-f0-9]{8,8}-[A-Fa-f0-9]{4,4}-[A-Fa-f0-9]{4,4}-[A-Fa-f0-9]{16,16}/,_95e);
};
_CF_checkGUID=function(_95f,_960){
_95f=_95f.replace(/^\s+/,"").replace(/\s+$/,"");
if(_960){
if(_95f.length==0){
return false;
}
}else{
if(_95f.length==0){
return true;
}
}
return _CF_checkregex(_95f,/[A-Fa-f0-9]{8,8}-[A-Fa-f0-9]{4,4}-[A-Fa-f0-9]{4,4}-[A-Fa-f0-9]{4,4}-[A-Fa-f0-9]{12,12}/,_960);
};
_CF_checkBoolean=function(_961,_962){
_961=_961.replace(/^\s+/,"").replace(/\s+$/,"");
if(_962){
if(_961.length==0){
return false;
}
}else{
if(_961.length==0){
return true;
}
}
if(_961.toUpperCase()=="TRUE"||_961.toUpperCase()=="YES"||(_CF_checknumber(_961)&&_961!="0")){
return true;
}else{
if(_961.toUpperCase()=="FALSE"||_961.toUpperCase()=="NO"||_961=="0"){
return true;
}else{
return false;
}
}
};
_CF_setFormParam=function(_963,_964,_965){
var _966="document['"+_963+"']['"+_964+"']";
var obj=eval(_966);
if(obj==undefined){
return false;
}else{
obj.value=_965;
return true;
}
};
_CF_checkregex=function(_968,_969,_96a){
if(_96a){
if(_968.length==0){
return false;
}
}else{
if(_968.length==0){
return true;
}
}
return _969.test(_968);
};
