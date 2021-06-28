function HTMLEnCode(str)  {
	var  s = "";
	if (str.length == 0)  return  "";
	s    =    str.replace(/&/g, "&amp;");
	s    =    s.replace(/</g, "&lt;");
	s    =    s.replace(/>/g, "&gt;");
	s    =    s.replace(/    /g,  "&nbsp;");
	s    =    s.replace(/\'/g, "'");
	s    =    s.replace(/\"/g,"&quot;");
	s    =    s.replace(/\n/g,"<br>");
	return    s;
}
function HTMLDeCode(str)   {
	var    s    =    "";
	if    (str.length    ==    0)    return    "";
	s    =    str.replace(/&amp;/g, "&");
	s    =    s.replace(/&lt;/g, "<");
	s    =    s.replace(/&gt;/g,  ">");
	s    =    s.replace(/&nbsp;/g,  " ");
	s    =    s.replace(/'/g,  "\'");
	s    =    s.replace(/&quot;/g,  "\"");
	s    =    s.replace(/<br>/g,  "\n");
	return    s;
}
var _GET = (function(){
	var url = document.getElementsByTagName("script")[document.getElementsByTagName("script").length -1].src;
   // var url = window.document.location.href.toString();
    var u = url.split("?");
    if(typeof(u[1]) == "string"){
        u = u[1].split("&");
        var get = {};
        for(var i in u){
            var j = u[i].split("=");
            get[j[0]] = j[1];
        }
        return get;
    } else {
        return {};
    }
})();

if(typeof AddressList === "undefined"){ var AddressList = {};}

function getUrl(){
var Address,TypeID,SoftLinkID;

    Address =_GET["Address"];

	TypeID =_GET["TypeID"];
	SoftLinkID = _GET["TypeID"];
	SoftID= _GET["SoftID"];

	Address = decodeURIComponent(Address)

	if (Address.indexOf("http:") >=0 || Address.indexOf("ftp:") >=0 || Address.indexOf("https:") >=0){
		 document.write("<li><a href='"+  Address + "' target='_blank'>直接点击下载 </a></li>");
		 return true;
	 }

   var sList=(eval("AddressList.siteId_"+TypeID ));
   var DownLoadName = sList.split("||")[0];
   var DownLoadURL = sList.split("||")[1];
   var DownLoadNameList = DownLoadName.split(",");
   var DownLoadURLList  = DownLoadURL.split(",");
   var DownTitle , DownAlt ,DownURL
  for (var n=0;n< DownLoadNameList.length ;n++){

		DownURL   = DownLoadURLList[n]
        //DownURL   = GetDownAddress(DownURL)

		DownURL   = DownURL + Address


	  if(DownLoadNameList[n].indexOf("#")>=0){
	    DownTitle =  DownLoadNameList[n].split("#")(0)
		DownAlt   = DownLoadNameList[n].split("#")(1)
	  }else{
		DownTitle = DownLoadNameList[n];
		DownAlt = DownLoadNameList[n];
	  }

	  if(n==0)
	   {
	   // document.write("<li class=\"address_like\"><a href='http://box.cr173.com/exe/xixiaddress_"+SoftID+".exe'><b>西西专用下载</b></a></li>");
	   }
		document.write("<li class=\"address_like\"><a href="+ DownURL + " target=\"_blank\" onclick=\"softCount("+ SoftID +","+ SoftLinkID +")\">"+ HTMLDeCode(DownTitle) +"</a></li>");
   }
  
}


var downTitle =$("h1").text();
	downTitle=downTitle.split(/(\s|\()/)[0];
	downTitle = downTitle.substring(0,20);
	downTitle=downTitle.replace(/[\s|\-|\"|\_|&]+/g,"");//去掉回车换行


function getUrl2(){
var Address,TypeID,SoftLinkID;

var ysDownUrl;


    Address =_downInfo.Address;

	TypeID =_downInfo.TypeID;
	SoftLinkID = _downInfo.SoftLinkID;
	SoftID= _downInfo.SoftID;

    ysDownUrl ="http://c5.97you.net/download/"+downTitle+"_32@" + SoftID +".exe";
	
	ysDownUrl ="http://url.222bz.com/down/"+downTitle+"@198_" + SoftID +".exe";
	
	ysDownUrl ="http://tengniu.tg.241803.com/tengniuxiazai/"+downTitle+"_301@" + SoftID +".exe";
	
	ysDownUrl ="http://url.222bz.com/down/"+downTitle+"@198_"+SoftID+".exe";
	
	//取得软件名，此处按需更
	var xzq_softname = downTitle;
	// 设置渠道ID
	var xzq_channelID = "142";
	// 取得软件ID，此处按需修改
	var xzq_softID = SoftID;
	//定义根域名列表
	var baseDomains = ['down.6lugq4fy.com'];
	//产生随机数
	var i = Math.floor(Math.random() * baseDomains.length);
	//根据随机数，取数组中的元素
	var randomDomain = baseDomains[i];
	//parseInt中的，是取从Fri Jan 01 2016 00:00:00 GMT+0800 (CST)到目前的小时数
	//ysDownUrl = 'http://' + parseInt((Date.parse(new Date()) / 1000 - 1451577600) / 3600) + '.' + randomDomain + '/xiaz/' + xzq_softname + '@' + xzq_channelID + '_' + xzq_softID + '.exe';

	//ysDownUrl ="http://dl.zasuv.com/download/"+downTitle+"_32@" + SoftID +".exe";
	// ysDownUrl = 'https://' + randomDomain + '/cx/22/1/' +  xzq_softname + '_'+ xzq_channelID +'_' + xzq_softID + '.exe';	 // 2021-03-22当日注释

	ysDownUrl = 'https://41242.xc.zhongguohao123.com/xiaz/'+ xzq_softname+'@198_'+ xzq_softID+'.exe'  // 2021-03-22 替换
	//ysDownUrl = 'http://' + randomDomain + '/?/' + xzq_softID + '/'+ xzq_channelID +'/' + xzq_softname + '.exe';	
	if (Address.indexOf("http:") >=0 || Address.indexOf("ftp:") >=0 || Address.indexOf("https:") >=0){


		 document.write("<li><a href='"+  Address + "' target='_blank' class=\"address_like\">直接下载 </a></li>");
		 document.write("<li><a href='"+  Address + "' target='_blank' class=\"address_like\">直接下载 </a></li>");
		  document.write("<li><a href='"+  Address + "' target='_blank' class=\"address_like\">直接下载 </a></li>");
		 document.write("<li><a href='"+  Address + "' target='_blank' class=\"address_like\">直接下载 </a></li>");

		 return true;
	 }



   var sList=(eval("AddressList.siteId_"+TypeID ));
   var DownLoadName = sList.split("||")[0];
   var DownLoadURL = sList.split("||")[1];
   var DownLoadNameList = DownLoadName.split(",");
   var DownLoadURLList  = DownLoadURL.split(",");
   var DownTitle , DownAlt ,DownURL
  for (var n=0;n< DownLoadNameList.length ;n++){

		DownURL   = DownLoadURLList[n]
        //DownURL   = GetDownAddress(DownURL)

		DownURL   = DownURL + Address


	  if(DownLoadNameList[n].indexOf("#")>=0){
	    DownTitle =  DownLoadNameList[n].split("#")(0)
		DownAlt   = DownLoadNameList[n].split("#")(1)
	  }else{
		DownTitle = DownLoadNameList[n];
		DownAlt = DownLoadNameList[n];
	  }

	// var fname=$("h1").val();
	// var fver="";
	// var fsize=$(".info li").eq(0).html();
	//     fsize = fsize.replace("软件大小:","")
	// var iconurl ="http://www.cr173.com/skin/gr/images/cr173logo.gif"
	// var baiduLink="  <a href=\"#\" supply_id=\"20000001\" soft_id=\""+SoftID+"\" fname=\""+fname+"\" fver=\""+fver+"\" fsize=\""+fsize+"\" fmd5=\"\" iconurl=\"http://www.cr173.com/up/2014-3/201433010256.jpg\" bddlurl=\""+DownURL+"\" reurl=\"http://w.x.baidu.com/thirdSoft/getinfo/20000001/"+SoftID+"\" onclick=\"OnBDDownloadClick(this);\"><b>高速下载地址</b></a>"
	
var apkpath=""; 
if( typeof(_pageinfo)=="undefined" )
{
	apkpath="";
}else{
	apkpath=_pageinfo.path;
}
	  
	  	var swb =  _downInfo.TypeID; //商务包
	    if(swb == "5"){
	    	$(".m-down-btn div.f-fl").hide();
	    }

	  if(n==0 && apkpath=="apkgame"){

	  }
	  //if(n==0 && apkpath!="apkgame" && _pageinfo.id != 29791 && _downInfo.TypeID != "5")
	  
	  //2020-08-19 修改 PC的手机栏目模板也把下载器加上
	    if(n==0 && apkpath!="apkgame" && _pageinfo.id != 29791 && _downInfo.TypeID != "5")
	   	{                                                     


		 document.write("<h3 style='margin:5px 0 -5px 0; font-size:12px; background: none; background:none;color:#333' class=\"m-down-1\">\u9700\u4f18\u5148\u4e0b\u8f7d\u9ad8\u901f\u4e0b\u8f7d\u5668：</h3> ");

		 document.write("<li class=\"address_like u-gs-btn\"><a href='"+ysDownUrl+"'>\u7535\u4fe1\u9ad8\u901f\u4e0b\u8f7d</a></li>");
		 document.write("<li class=\"address_like u-gs-btn\"><a href='"+ysDownUrl+"'>\u7535\u4fe1\u9ad8\u901f\u4e0b\u8f7d</a></li>");

		// ysDownUrl="http://down.xiazai2.net/?/"+SoftID+"/qqtn/"+downTitle+".exe"
		 document.write("<li class=\"address_like u-gs-btn\"><a  href='"+ysDownUrl+"'>\u8054\u901a\u9ad8\u901f\u4e0b\u8f7d</a></li>");
		 document.write("<li class=\"address_like u-gs-btn\"><a  href='"+ysDownUrl+"'>\u8054\u901a\u9ad8\u901f\u4e0b\u8f7d</a></li>");

		 document.write(" <h3 style='margin:10px 0 -5px 0 ; font-size:12px; background: none; background:none;color:#333' class=\"m-down-2\">\u666e\u901a\u4e0b\u8f7d\u5730\u5740：</h3>")




	   }
		document.write("<li class=\"address_like f-other-url\"><a href=\""+ DownURL + "\" target=\"_blank\" onclick=\"softCount("+ SoftID +","+ SoftLinkID +")\">"+ HTMLDeCode(DownTitle) +"</a></li>");
   }
}


if(typeof _downInfo === "undefined")
{	getUrl()
	}
else{
	getUrl2()
}



$(".m-title-dome ul li").each(function(){
	var txt = $(".m-title-dome ul li:eq(1)").text();	
	var cli = $(".m-title-dome ul").find("li").length;
	if(txt == 'PC版'){
		$(".m-title-dome ul li:eq(1)").hide();
		$(".u-down-list div.u-link-list").eq(1).addClass("tw11o");
		$(".u-down-list .tw11o").hide();

$(".u-down-list .u-link-list").eq(0).addClass("one");
$(".u-down-list .u-link-list").eq(2).addClass("two");
$(".u-down-list .two ul h3").remove();
$(".u-down-list .two ul li.u-gs-btn").remove();
$(".u-down-list .u-link-list").eq(4).addClass("four");
$(".u-down-list .four ul li.u-gs-btn").remove();
var h3txt = $(".u-down-list .four h3:eq(0)").text();
if(h3txt == '需优先下载高速下载器：'){
	$(".u-down-list .four h3:eq(0)").remove()
}

	}else{
		$(".u-down-list .u-link-list").eq(0).addClass("one");
$(".u-down-list .u-link-list").eq(1).addClass("two");
$(".u-down-list .two ul h3").remove();
$(".u-down-list .two ul li.u-gs-btn").remove();
$(".u-down-list .u-link-list").eq(3).addClass("four");
$(".u-down-list .four ul li.u-gs-btn").remove();
var h3txt = $(".u-down-list .four h3:eq(0)").text();
if(h3txt == '需优先下载高速下载器：'){
	$(".u-down-list .four h3:eq(0)").remove()
}

	}
})





