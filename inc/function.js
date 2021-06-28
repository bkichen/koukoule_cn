// JavaScript Document
//==================函数列表=========================
 //写入Cookie PostCookie("Softview=Yes");
 function PostCookie(cookieName)
 {
  var expdate = new Date();
   expdate.setTime(expdate.getTime() + 604800000);
   document.cookie=cookieName+";expires="+expdate.toGMTString()+";path = /;";
 }

//读取Cookies值
function getCookie(cookieName) 
{ 
 var cookieString =document.cookie; 
 var start = cookieString.indexOf(cookieName + '='); 
 // 加上等号的原因是避免在某些 Cookie 的值里有 
 // 与 cookieName 一样的字符串。 
 if (start == -1) // 找不到
 return null; 
 start += cookieName.length + 1; 
 var end = cookieString.indexOf(';', start); 
 if (end == -1) 
 return unescape(cookieString.substring(start));
 return unescape(cookieString.substring(start, end)); 
}

 String.prototype.Trim=function(){ return  this.replace(/(^\s+)|(\s+$)/g,"");}
 String.prototype.Ltrim = function(){ return  this.replace(/(^\s+)/g,   "");}
 String.prototype.Rtrim = function() { return this.replace(/(\s+$)/g, "");}

//================= AJAX 提交表单 ====================
var http_request = true;
	function send_request(url,Temp,ref , tb) 
	 {//初始化、指定处理函数、发送请求的函数
		http_request = false;
		
		//document.domain = "yxdown.com";
		//开始初始化XMLHttpRequest对象
		if(window.XMLHttpRequest) { //Mozilla 浏览器
			http_request = new XMLHttpRequest();
			if (http_request.overrideMimeType) {//设置MiME类别
				http_request.overrideMimeType('text/xml');
			}
		}
		else if (window.ActiveXObject) { // IE浏览器
			try {
				http_request = new ActiveXObject("Msxml2.XMLHTTP");
			} catch (e) {
				try {
					http_request = new ActiveXObject("Microsoft.XMLHTTP");
				} catch (e) {}
			}
		}
		if (!http_request) { // 异常，创建对象实例失败
			window.alert("不能创建XMLHttpRequest对象实例.");
			return false;
		}
		http_request.onreadystatechange = ref; 
		
		// 确定发送请求的方式和URL以及是否同步执行下段代码
		http_request.open("Post", url, tb);
		http_request.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
		http_request.send(Temp);
	}
	
	// 处理返回信息的函数
    function processRequest() {
        if (http_request.readyState == 4) { // 判断对象状态
            if (http_request.status == 200) { // 信息已经成功返回，开始处理信息
                alert(http_request.responseText);
            } else { //页面不正常
                // alert("您所请求的页面有异常。");
            }
        }
    }
//加入收藏夹
function addfav(sURL,sTitle)
{
	try
    {
        window.external.addFavorite(sURL, sTitle);
    }
    catch (e)
    {
        try
        {
            window.sidebar.addPanel(sTitle, sURL, "");
        }
        catch (e)
        {
            alert("加入收藏失败，请使用Ctrl+D进行添加");
        }
    }

 }
 
//收藏本站
function address(url,title)
{
 window.external.AddFavorite(url,title);
}

function isNumberS(i,obj)
{
	if (obj.value=="")
	{
		alert(obj.name + ": 不能为空");
		obj.focus();
		return false;
	}
	
	if(isNaN(obj.value))
	{
		alert(obj.name + ": 必须为数字");
		obj.focus();
		return false;
	}
	
	if (i<obj.value)
	{
		alert(obj.name + ": 不能大于" + i);
		obj.focus();
		return false;
	}
}

//=================================前台专用====================================================
function ViewCmsHits(tobj,id)
{
	var obj= document.getElementById(tobj);
	var Url="Action=4&id="+ id;
	
	var ref=function()//处理返回数据
	 	{
		  if (http_request.readyState == 4) { // 判断对象状态
            if (http_request.status == 200) { // 信息已经成功返回，开始处理信息
				var requestText=http_request.responseText;
					obj.innerHTML = requestText;
            } else { //页面不正常
                // alert("写数据出错了！！");
            }
        }
	 }
   send_request("../ajax.asp",Url,ref,true);
}


function ViewCommCount(tobj,CommentTpye,id) //查询评论数
{
	var obj= document.getElementById(tobj);
	var Url="Action=16&CommentTpye="+CommentTpye+"&id="+ id;
	
	var ref=function()//处理返回数据
	 	{
		  if (http_request.readyState == 4) { // 判断对象状态
            if (http_request.status == 200) { // 信息已经成功返回，开始处理信息
				var requestText=http_request.responseText;
					obj.innerHTML = requestText;
            } else { //页面不正常
                // alert("写数据出错了！！");
            }
        }
	 }
   send_request("../ajax.asp",Url,ref,true);
}


//============处理文章中的图片====================
function ViewCmsImages(tobj,id)
{
	var obj= document.getElementById(tobj);
	var imgs=obj.getElementsByTagName("img");
	
	for(i=0;i<imgs.length;i++)
	{
		//imgs[i].setAttribute('onmousewheel',"return bbimg(this)");
		var sobj= imgs[i].parentNode;
		if (sobj.tagName!="a")
		{
			//imgs[i].outerHTML ="<a href='/viewimg_"+id+"_1.html?"+ imgs[i].src +"' target='_blank'>" + imgs[i].outerHTML + "</a>"
			
			imgs[i].onclick=function(){window.open("/viewimg_"+id+"_1.html?"+ this.src,"n","")}
            imgs[i].title="点击查看大图"
            imgs[i].style.cursor="pointer";
         }
		// imgs[i].onmousewheel = function(){return bbimg(this)};
		// imgs[i].alt="可以用鼠标滚动改变大小";
	}
}

//单击选项卡通用过程 obj,'Index_3_2_1','li','li_click'
function liClick(obj,t1,t2,t3)
{
	var TempObj=document.getElementById(t1);
	var TempObj_Li=TempObj.getElementsByTagName(t2);
	
	var TempObj_Ul;
	
	for(i=1;i<TempObj_Li.length;i++)
		{
			TempObj_Li[i].className=null;
			if(TempObj_Li[i]==obj)
			{
				document.getElementById(t1+"_"+i).style.display='';
				}
			else
			{
				document.getElementById(t1+"_"+i).style.display='none';
			}
		}
	obj.className=t3;
}
	
$(function() {
		//详细页点击差评弹窗
		$(".is_bad,.m-dc .m-cai").click(function(){ 
			var gotopl = $("#comment_list").offset().top-100;
		  	$("body,html").animate({scrollTop:gotopl},300);
		  	var pltc = '<div class="g-hpopBox"><div class="g-tips"><p>请留下您的联系方式，描述一下您打差评的原因，我们将用火箭般的速度修复，并有机会获得贴心礼物。</p><a href="javascript:void(0);" class="f-close"></a></div><div class="g-input-cont"><p><span><label><em><input value="软件无法下载" id="no-one" name="cuowu" type="checkbox"></em>软件无法下载</label></span><span><label><em><input value="下载后无法使用" id="no-two" name="cuowu" type="checkbox"></em>下载后无法使用</label></span><span><label><em><input value="与描述不一致" id="no-three" name="cuowu" type="checkbox"></em>与描述不一致</label></span></p><p><span><label><font>手机号码：</font><input value="" name="cuowu" type="input" class="m-txt-phone"></label></span></p></div><div class="g-plTextaera"><textarea id="cuowuneirong" ></textarea></div><div class="g-plSubmit"><input onclick="submitComment()" value="立即提交" id="tijiaocuowu" class="submit1" type="button"></div></div>';
			$("#comment_list").append(pltc);

		var cu1 =$('#no-one').val();
		var cu2 =$('#no-two').val();
		var cu3 =$('#no-three').val();
		var txt = '';
	$(".g-input-cont p em input").each(function(){
		$(this).click(function(){ 
			if( $(this).prop("checked") == true){			
				txt += $(this).val();
				$("#cuowuneirong").val(txt);
			}
			if( $(this).prop("checked") == false){
				var notxt = $(this).val();
				var txtmain = $("#cuowuneirong").val();
				var notx2t = txtmain.replace(notxt,'');
				$("#cuowuneirong").val(notx2t);
				txt = notx2t;
			}
		})
	})	

		$(".f-close").click(function(){ 
			$(".g-hpopBox").remove();
		});
	});
	
})
	
//提交表单软件下载评论
  var isSubmit=false;  //是否提交了评论
  function submitComment()
  {
     if (isSubmit)
	 {
		 //alert("您的评论已经提交，请不要重复提交谢谢!")
	    //	 return;
	 }
	 var userphone='';
	 var res=0;
	 
	 var Form=document.forms["FormComment"];
	 if (Form==null) Form=document.forms["zt_ly"];
	 if($('.g-hpopBox').length>0){
	 	var content=$("#cuowuneirong");
	 	var ContentText =content.val();
	 	userphone=$(".m-txt-phone").val();
		if( $("#no-one").prop("checked") == false && $("#no-two").prop("checked") == false && $("#no-three").prop("checked") == false){
			alert("请先选择差评原因！");
			return false;
		}	
	 	if(userphone==""){
			alert("手机号码不能为空！");
			Content.focus();
			return false;
	 	}else{
		  var pattern = /0?(13|14|15|18|17)[0-9]{9}/;
		   if(!userphone.match(pattern)){
		     alert("请输入正确的联系手机号码！");
		     return false;
		   }else{
	 		res=1;
		   }
	 	}
	 }else{

		 var Content =Form.Content;
		 if (Content==null) Content=Form.ly_content;
		 var ContentText = Content.value.Trim();

	 }
	 
	 if(ContentText=="" )
	 {
		alert("评论的内容不能为空！");
		Content.focus();
		return false;
	 }

	 
	 if( ContentText.length<5 || ContentText.length>1000 )
	 {
		alert("评论的内容不能小于5 大于 1000 个字符！");
		Content.focus();
		return false;
	 }
	 
	 var temp = ContentText;
	 var re = /\{.+?\}/g;        // 创建正则表达式模式
	 temp = temp.replace(re,"");
	 if (temp.Trim()=="")
	 {
		alert("对不起不能发表纯表情! 感谢您的支持！"); 
		Content.focus();
		return false;
	 }
	 
	 var ly_id
	 	 ly_id = Form.ly_id;
		 if (ly_id==null) ly_id = Form.softid;
		 
	 var CommentTpye,CommentTpyeId
	 	 CommentTpye =Form.CommentTpye;
		 if (CommentTpye==null) 
		 {
			 CommentTpyeId =0;
		 }else
		 {
			CommentTpyeId = CommentTpye.value; 
		 }
	 var Url="content=" + escape(ContentText) + "&SoftID=" +  escape(ly_id.value) + "&Action=2&CommentTpye="+CommentTpyeId+"&phone="+userphone;
	 
	 var ref=function()//处理返回数据
	 	{
		  if (http_request.readyState == 4) { // 判断对象状态
            if (http_request.status == 200) { // 信息已经成功返回，开始处理信息
				var requestText=http_request.responseText;
				if(res==0){
					 Content.value="";
				}
					 //Content.disabled=true;
					 //Form.disabled=true;
					 //alert("您的评论已经写入成功,但需要等审核才能显示出来");
					ViewComment(requestText);
	 
            } else { //页面不正常
                 //alert("写数据出错了！！"); 
            }
        }
	}
     send_request("/ajax.asp",Url,ref,true);
	 isSubmit = true;
	 $(".g-hpopBox").remove();
  }
  
  //将提交的评论显示到页面上
  function ViewComment(text)
  {
	  var d = new Date(); 
	  var sd=d.toLocaleString();
	  
	  var Temp ="<dt><span><i>顶楼 </i><b >您发表的评论</b> </span><em>发表于: <font color='red'> "+ sd +" </font> </em></dt>"
      Temp +="<dd> "+ text +" <p></p></dd>"
	  
	  $("#comment_1 dl").append(Temp);
  }
  
  //提交评论表单得到焦点的时候显示验证码
  function CommentOnblur()
  {
	 document.getElementById("viewGetCode").style.display="";
  }
  //按 CTRL+回车 提交表单
  function submitForm()
  {
	  if (typeof (window.event) != 'undefined')
	  {
	   if(window.event.ctrlKey && window.event.keyCode==13)
	    {
	  	//alert("点击了");
		 submitComment();
		 return true;
	    }
	 }
  }
  
//首页选项卡
function switchTab(obj,num,c,d){ 
    var parentNodeObj= obj.parentNode;
	 var s=0;
	 var i=0;
	 
	 for(i=0;i<parentNodeObj.childNodes.length;i++)
	 {
		 if (parentNodeObj.childNodes[i].nodeName=="#text")//针对FF处理
		   {
			 continue;  
		   }
		 parentNodeObj.childNodes[i].className=c+ "1";
		 var labObj= document.getElementById(d + s);
		 
		// alert(d + s)
		 if(labObj !=null)
		 {
		  labObj.style.display='none';
		 if(num==s)
		  {
			  labObj.style.display=''; 
	 
		  }
		 }
		 s +=1;
	 }
	obj.className=c + "2";
}

 

	
//======文章页专用=============

//快速分页需要 jQuery 库支持 //在页面中使用 shortcutKey("#cms_showpage_text")	
//参数分页容器id，默认为#cms_showpage_text

function shortcutKey(pagecss){
	
	if(typeof passcss == "undefined") {
		pagecss = "#cms_showpage_text";
	}


	var page = $(pagecss);
	
	if(page.length  == 0) return;

	var span = document.createElement("span");
	span.innerHTML = "提示：按\"←→\"键快速翻页"
	page[0].appendChild(span);
	var a = $(pagecss + " a");
	
	
	var b = parseInt($(pagecss + " b").text());
	

	$(document).keyup( function(e){
		
		var tag = e.target.tagName.toLowerCase();
		
		if(tag === "input" || tag === "textarea" ) return;
		
		if ( e.keyCode == 37){

			if (b > 1){

				window.location.href = a[b-2].href;

			}else{
					alert('这已经是第一页了');
			}
		}

		if ( e.keyCode == 39){
			if (b < a.length ){
				window.location.href = a[b-1].href;
			}else{
					alert('你已经浏览完所有内容');
			}

		  }
	});
 }



//------------
  function Cms_Title_Click(obj)
   {
	obj.style.background="  url(images/cms_c2_2.jpg) top center'";
   }
   
//统计点次下载次数
 function softCount(SoftID,SoftLinkID)
 { 
	 var Url = "Action=6&SoftLinkID=" + escape(SoftLinkID) + "&SoftID=" + escape(SoftID)
	  var ref=function()//处理返回数据
	  {
		  if (http_request.readyState == 4) { // 判断对象状态
		    if (http_request.status == 200) { // 信息已经成功返回，开始处理信息
			
			var requestText=http_request.responseText;
			//alert(requestText)
			}else
			{
				//var requestText=http_request.responseText;
				//alert(requestText)
			}
		  }  
	  }
	 send_request("../ajax.asp",Url,ref,true);
	 //alert(Url);
 }

//改变图片大小
function resizepic(thispic)
{
if(thispic.width>700) thispic.width=700;
}

// 鼠标滚动 无级缩放图片大小 onmousewheel="return bbimg(this)"
function bbimg(o)
{
  var zoom=parseInt(o.style.zoom, 10)||100;
  zoom+=event.wheelDelta/12;
  if (zoom>0) o.style.zoom=zoom+'%';
  return false;
}


//第一次点击下载地址的时候提示设为首页
function address_click()
{
	if(getCookie("Address_Home") != "Yes") 
	{
	ThissetHomePage();
	 PostCookie("Address_Home=Yes");
	}
	return true;
}


 function setHomepage(URL) {　 // 设为首页
　　　　　if (document.all) {
　　　　　　　　　　　document.body.style.behavior = 'url(#default#homepage)';
　　　　　　　　　　　document.body.setHomePage(URL);　　　　　　　　　　　 }
　　　　　　　　　　　 else if (window.sidebar) {
　　　　　　　　　　　　　　　 if (window.netscape) {
　　　　　　　　　　　　　　　　　　　 try {
　　　　　　　　　　　　　　　　　　　　　　　 netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
　　　　　　　　　　　　　　　　　　　 }
　　　　　　　　　　　　　　　　　　　 catch (e) {
　　　　　　　　　　　　　　　　　　　　// alert("该操作被浏览器拒绝，假如想启用该功能，请在地址栏内输入 about:config,然后将项 signed.applets.codebase_principal_support 值该为true");
　　　　　　　　　　　　　　　　　　　 }
　　　　　　　　　　　　　　　 }
　　　　　　　　　　　　　　　 var prefs = Components.classes['@mozilla.org/preferences-service;1'].getService(Components.interfaces.nsIPrefBranch);
　　　　　　　　　　　　　　　 prefs.setCharPref('browser.startup.homepage',URL);
　　　 }
    return true;
} 

//第一次点击下载地址的时候提示设为首页
function address_click2(URL)
{
	if(getCookie("Address_Home") != "Yes") 
	{
	  document.body.style.behavior="url(#default#homepage)";
	  document.body.setHomePage(URL); 
	  PostCookie("Address_Home=Yes");
	}
	return true;
}



 //比列调整当前图片大小
 function ReImgSize(obj,w,h){ 
  if(obj.width>w)
   {
	   obj.width=w;
	   obj.style.border="none" 
	 }
  }
 
/*
// 调用方法
img_maxwidth(); // 全部图片,最大600宽度
img_maxwidth(800) // 全部图片,最大800宽度

img_maxwidth('content') // #content 下的图片
img_maxwidth('content',600)
img_maxwidth( document.getElementsByTagName('img') ) // 指定的图片
*/
var debug = ''
var img_maxwidth  = (function (){
		
	// 忽略支持 max-width 的浏览器
	if('maxWidth' in document.createElement('img').style){
		return function(){};
	}
	// 特殊处理ie6
	var domloaded,
	// domready for ie6, 载入jQ的情况下使用jQ的domready
	doscroll = function(){
		try {
			document.documentElement.doScroll("left");
		} catch(e) {
			setTimeout( doscroll, 20 );
			return;
		}
		domloaded();
	},
	
	ready = typeof jQurey !== 'undefined' ? jQuery : function(callback){
		domloaded = callback, doscroll();			
	},
	
	later = function(context){
		
		ready(function(){
			if(typeof context == 'string') context = document.getElementById(context);
			each(context.getElementsByTagName('img'));								   
		});
	},
	
	fix_width = function(image,maxwidth){
		//image.removeAttribute('height');
		image.style.width = maxwidth + 'px';
	},
	
	later_fix_width = function(image,maxwidth){
		// attachEvent 的 this 指向?
		image.attachEvent('onload', function(){
			image.width > maxwidth && fix_width(image,maxwidth);
		});
	},
	
	each = function(images){
		 var image, maxwidth;
		 for(var i= images.length; image = images[--i];){
				maxwidth = parseInt(image.currentStyle['max-width']);
				
				if(!maxwidth) continue;
				
				image.complete || image.width > maxwidth ?
					fix_width(image,maxwidth) :	later_fix_width(image,maxwidth);
		 }
	 },
	 
	 port = function(){
		 
		var arg = arguments[0], context;
			
		if(!arg){
			later(document);
			return;
		}
		// id
		if(typeof arg == 'string'){
			context = document.getElementById(arg);
			context ? each(context.getElementsByTagName('img')) :  later(arg);
			return;
		}
		// elements
		if( 0 in arg && arg[0].nodeType == 1) each(arg);	
	}

	return port;
})();


   
//取得radio 选中的值
 function getRadioBoxValue(radioName){ 
            var obj = document.getElementsByName(radioName);             //这个是以标签的name来取控件 
                 for(i=0; i<obj.length;i++)    { 
                  if(obj[i].checked){ 
                          return obj[i].value; 
                  } 
              }          
             return "undefined";        
}



//Html转换成Ubb
function html_trans(str) {
	str = str.replace(/\r/g,"");
	str = str.replace(/on(load|click|dbclick|mouseover|mousedown|mouseup)="[^"]+"/ig,"");
	str = str.replace(/<script[^>]*?>([\w\W]*?)<\/script>/ig,"");
	str = str.replace(/<a[^>]+href="([^"]+)"[^>]*>(.*?)<\/a>/ig,"[url=$1]$2[/url]");
	str = str.replace(/<font[^>]+color=([^ >]+)[^>]*>(.*?)<\/font>/ig,"[color=$1]$2[/color]");
	str = str.replace(/<img[^>]+src="([^"]+)"[^>]*>/ig,"[img]$1[/img]");
	str = str.replace(/<([\/]?)b>/ig,"[$1b]");
	str = str.replace(/<([\/]?)strong>/ig,"[$1b]");
	str = str.replace(/<([\/]?)u>/ig,"[$1u]");
	str = str.replace(/<([\/]?)i>/ig,"[$1i]");
	str = str.replace(/&nbsp;/g," ");
	str = str.replace(/&amp;/g,"&");
	str = str.replace(/&quot;/g,"\"");
	str = str.replace(/&lt;/g,"<");
	str = str.replace(/&gt;/g,">");
	str = str.replace(/<br>/ig,"\n");
	str = str.replace(/<[^>]*?>/g,"");
	str = str.replace(/\[url=([^\]]+)\]\n(\[img\]\1\[\/img\])\n\[\/url\]/g,"$2");
	str = str.replace(/\n+/g,"\n");
	str = my_format(str);
	str = str.replace(/\n/g,"\n");
	return str;
}



function my_format(str){
   var cc,tempstr;
   cc = str;
   tempstr = "";
   var ss=cc.split("\n");
   for (var i=0; i< ss.length; i++ ){
        while (ss[i].substr(0,1)==" "||ss[i].substr(0,1)=="　"){ss[i]=ss[i].substr(1,ss[i].length);}
        if (ss[i].length>0) tempstr+="　　"+ss[i]+"\n";
   }
   return tempstr;
}

 
//=========== 前台最新更新 ===================

function MakeUbb(thisForm)
{
	var obj = document.getElementById(thisForm);
	
	if(isNaN(obj.TopNum.value))
	{
		obj.TopNum.value="";
		obj.TopNum.focus();
		alert("记录条数只能为数字！！");
		return false;
	}
	
	var sUbbType
	
	if (typeof(UbbType)=="undefined")
	{
	  sUbbType=0;
	} else
	{
		 sUbbType = UbbType;
	}
 
	
	var ref=function()//处理返回数据
	{
		  if (http_request.readyState == 4) 
		   { // 判断对象状态
            if (http_request.status == 200)
			{ // 信息已经成功返回，开始处理信息 
			  if (sUbbType==1)
			   {
				  // UbbText=http_request.responseText;
				   //makeCheckBtn();
				   makeCheckBtn(http_request.responseText);
			   }else
			   {
				document.getElementById("List").innerHTML=unescape(http_request.responseText);
			   }

            } else { //页面不正常
			    alert(  http_request.responseText);
                // alert("您所请求的页面有异常。");
            }
          }
	}
	
   document.getElementById("List").innerHTML = "正在查询中..."; 
   var SendTemp   = "Action=8&IsSize=" + escape(obj.IsSize.checked) +"&IsCateID=" + escape(obj.IsCateID.checked) +"&IsAtrImages=" + escape(obj.IsAtrImages.checked)+"&IsZhilian=" + escape(obj.IsZhilian.checked);
   		SendTemp += "&IsLanguage=" + escape(obj.IsLanguage.checked) +"&IsSoftSystem=" + escape(obj.IsSoftSystem.checked) +"&IsSoftViewImg=" + escape(obj.IsSoftViewImg.checked);
		SendTemp += "&IsContent=" + escape(obj.IsContent.checked)+"&IsHttp=" + escape(obj.IsHttp.checked) +"&IsXunLei=" + escape(obj.IsXunLei.checked);
		SendTemp += "&Bdate=" + escape(obj.Bdate.value)+"&Edate=" + escape(obj.Edate.value) +"&TopNum=" + escape(obj.TopNum.value);
		SendTemp += "&Tradio=" + escape(getRadioBoxValue("Tradio"))+"&order="+ escape(getRadioBoxValue("order"))+"&Keys_u="+ escape(obj.Keys_u.value);
		SendTemp +="&UbbType=" + sUbbType;
		
		
		if (document.getElementById("ContentNum")!=null)
		{
		  SendTemp += "&ContentNum=" + escape(obj.ContentNum.value);
		}
		
		if (document.getElementById("IsDownLink")!=null)
		{
		  SendTemp += "&IsDownLink=" + escape(obj.IsDownLink.checked);
		}
		
		
       send_request("ajax.asp",SendTemp,ref,true); 
      // alert(SendTemp);
}
//===========================================



//senfe("changecolor","#f8fbfc","#e5f1f4","#ecfbd4","#bce774"); 
////changecolor("表格名称","奇数行背景","偶数行背景","鼠标经过背景","点击后背景"); 

function senfe(o,a,b,c,d){ 
var t=document.getElementById(o).getElementsByTagName("tr");  
for(var i=0;i<t.length;i++){    t[i].style.backgroundColor=(t[i].sectionRowIndex%2==0)?a:b; 
t[i].onclick=function(){     if(this.x!="1"){      this.x="1";//本来打算直接用背景色判断，FF获取到的背景是RGB值，不好判断   
this.style.backgroundColor=d;
}else
{
	this.x="0";  
	this.style.backgroundColor=(this.sectionRowIndex%2==0)?a:b;  
	}   
	}  
t[i].onmouseover=function(){ if(this.x!="1")this.style.backgroundColor=c; }   
t[i].onmouseout=function(){ 
if(this.x!="1")this.style.backgroundColor=(this.sectionRowIndex%2==0)?a:b; } } }



//========================ICO显示图片============================================
var mailshowed=false; //是否显示列表图标
var showDiv="ListSpaces";
//===例表页显示软件大图======
function setShowSpace(obj,img)
{
  if (img=='') return;
  var sobj= document.getElementById(showDiv);
  if (sobj==null)
  {  
	var aNode =document.createElement("div");
	aNode.id=showDiv;
	aNode.innerHTML = "";
	aNode.onmouseout = function(){ closelisetSpace() };
	
	var Prean=document.getElementById("top");
	
	if (Prean==null)
	{
		obj.parentNode.insertBefore(aNode);  
	}
	else
	{
		 Prean.parentNode.insertBefore(aNode,Prean);  
	}
   }
		var x=obj.offsetLeft;
		var tempobj;
	        tempobj =obj;
		while(tempobj=tempobj.offsetParent){
          x+=tempobj.offsetLeft;
         }	
		 
		var y= obj.offsetTop;
		 tempobj =obj;
		 
		while(tempobj=tempobj.offsetParent){
           y+=tempobj.offsetTop;
         }
			
		var list=document.getElementById(showDiv);
	    if(list!= null)
		{
		    list.innerHTML="<img src="+img+">";
		    list.style.left= x + "px";
	        list.style.top=y + obj.clientHeight +"px";
			list.style.display='';
			//alert(list.tagName);
		}
	     //setTimeout("setShowSpace('showList')",100);	 
}
//关闭
function closelisetSpace()
{
	 var sobj= document.getElementById(showDiv);
	 if (sobj!=null)
	 {
		 sobj.style.display='none';
	 }
}

//=======================================================


//============游戏网站用显示图片 Begin ===================

var showYouxiPicDiv="divLable";
var timer
function showYouxiPic(obj,softid)
{
   if (softid==''||obj==null ) return;
	
   var Url="Action=9&id="+ softid;
   
   var img=""
    
	
	var ref=function()//处理返回数据
	 	{
		  if (http_request.readyState == 4) { // 判断对象状态
            if (http_request.status == 200) { // 信息已经成功返回，开始处理信息
				var requestText=http_request.responseText;
					 img = requestText;
            } else { //页面不正常
                // alert("写数据出错了！！");
            }
        }
	 }
	 
    send_request("../ajax.asp",Url,ref,false);
    if (img==''|| img=="NO") return;
	var list= document.getElementById(showYouxiPicDiv);
 
	var divListImg = list.getElementsByTagName("div")[1];
		divListImg.innerHTML=img
	
	var x=obj.offsetLeft;
	var tempobj;
	    tempobj =obj;
	while(tempobj=tempobj.offsetParent){
          x+=tempobj.offsetLeft;
         }	
		 
	var y= obj.offsetTop;
		 tempobj =obj;
		 
	while(tempobj=tempobj.offsetParent){
           y+=tempobj.offsetTop;
         }
	list.style.top=y ;
	
	if((document.body.scrollWidth - x)<(document.body.scrollWidth/2))
	{
	 list.style.left = (x - 500)+"px";;
	}else
	{
	 list.style.left= x + obj.clientWidth +"px";
    }
	list.style.display='block';
}

function closeshowYouxiPic()
{
	var sobj= document.getElementById(showYouxiPicDiv);
	var posSel=sobj.style.display;
	if(posSel=="block"){
		timer = setTimeout("showYouxiPicDiv_hide()", 500);
	}	
}

function showYouxiPicDiv_mouseover(){
	try{window.clearTimeout(timer);}catch(e){}
}

function showYouxiPicDiv_hide(){
	 var sobj= document.getElementById(showYouxiPicDiv);
	 if (sobj!=null)
	 {
		 sobj.style.display='none';
	 }
}

//============游戏网站用显示图片 End =====================

//插入表情图标
function insFace(id,itrm)
{
	var obj=document.getElementById(itrm);
	
	//obj.innerHTML = obj.innerHTML + "{f:"+id+"}";	
	obj.value += "{f:"+id+"}";
}


//=================投票===============================================
var isVote=false;  //是否已经投过票了
//投票BEGIN
function sEval(softid,num,din,cai,Tpye)
{
	if(isVote)
	{
		//alert('您已经投过票了,请不要重复投票,感谢您的支持!!')
		//return
	}
	var Temp="Action=0&softid="+ escape(softid) + "&num=" +escape(num)+"&type="+ Tpye; //发送的数据
	
	var RequestFunction=function() {  //返回处理函数
		if (http_request.readyState == 4) { // 判断对象状态
            if (http_request.status == 200) { // 信息已经成功返回，开始处理信息
					ReadMark(softid,din,cai,Tpye);
				 
				  alert('投票成功!!');
            } else { //页面不正常
			      
                // alert("您所请求的页面有异常。");
            }
        }
	 };
	send_request("../ajax.asp",Temp,RequestFunction,false);
	isVote = true;
	//alert(Temp);
}
//投票End

//读取投票数据 Begin
function ReadMark(softid,din,cai,Tpye)
{	
	var Temp="Action=1&softid="+ escape(softid)+"&type="+ Tpye; //发送的数据
	 
	var objTemp=document.getElementById(din).getElementsByTagName("div")[1].getElementsByTagName("div");
	
	var AbetImg=objTemp[0].getElementsByTagName("span")[0];
	var AbetNum=objTemp[1];
	
		 objTemp=document.getElementById(cai).getElementsByTagName("div")[1].getElementsByTagName("div");
	var ArgueImg=objTemp[0].getElementsByTagName("span")[0];;
	var ArgueNum=objTemp[1];
	
	var RequestFunction=function() {  //返回处理函数
		if (http_request.readyState == 4) { // 判断对象状态
            if (http_request.status == 200) { // 信息已经成功返回，开始处理信息
				var TempText=http_request.responseText;
 
				var	 TempText_1=TempText.split("|")[0];
				var  TempText_2=TempText.split("|")[1];
					
				var TempText_3= parseInt(TempText_1) + parseInt(TempText_2);
				if (TempText_3 == 0)
				{
					var a =50;
					var b=50;
				}else
				{
				var a =parseInt(parseInt(TempText_1) /TempText_3*100)
				var b= (100 - parseInt(parseInt(TempText_1) /TempText_3*100))
				}
    
				    AbetNum.innerHTML  = "%" + a +"(" + TempText_1 +")";
					ArgueNum.innerText = "%" +b +"(" + TempText_2 +")";;

					AbetImg.style.width = a+"%";
					ArgueImg.style.width = b+"%" ;
                
            } else { //页面不正常
                // alert("您所请求的页面有异常");
            }
        }
	 };
	 
	 send_request("../ajax.asp",Temp,RequestFunction,false);
	//AbetNum.innerText="5645";	
}
//读取投票数据 End


//==========投票第二种方案 Begin=================
function ngsEval(id,goodid,badid,verid,type)
{

	var objgood = $(goodid);
	var objbad = $(badid);

   
	 objgood.css({cursor:"pointer"});
	
	ngSendEval(id,goodid,badid,verid,0,type);
	 
	objgood.click(function (){ ngSendEval(id,goodid,badid,verid,1,type) ; isVote=true;});
	objbad.click(function (){ ngSendEval(id,goodid,badid,verid,2,type); isVote=true; });
}


//投票
function ngSendEval(id,goodid,badid,verid,num,type)
{
   if(isVote && num>0)
	{
		 alert('您已经投过票了,请不要重复投票,感谢您的支持!!')
		 return true;
	}
	
 var url="action=3&id="+id+"&num="+num+"&type="+type;
 
  $.ajax({
   type: "POST",
   url: "/ajax.asp",
   data: url,
   success: function(msg){
      ListEval(goodid,badid,verid,msg);
   }
}); 
}

function ListEval(goodid,badid,verid,msg){
	var objgoodimg = $(goodid + " img");
	var objgoodem = $(goodid + " em");

	var objgoodb = $(goodid + " b");
 
	
	var objbadimg = $(badid + " img");
	var objbadem = $(badid + " em");

	var objbadb = $(badid + " b");
	
	
	var objver = $(verid);
	
	var dataObj=eval("("+msg+")");//转换为json对象
	
	
	objgoodimg.eq(0).animate({width: "1%"},200);
	objgoodimg.eq(0).animate({width: +dataObj.Percentage[0]+ "%"},"slow");
	
	objbadimg.eq(0).animate({width: "1%"},200);
	objbadimg.eq(0).animate({width: +dataObj.Percentage[1]+ "%"},"slow");
	
	objgoodem.eq(0).html(dataObj.Percentage[0]+ "%" + "("+ dataObj.Num[0] +")");
	objbadem.eq(0).html(dataObj.Percentage[1]+ "%"+ "("+ dataObj.Num[1] +")");
	
	//objgoodb.eq(0).html(dataObj.Num[0] );
	//objbadb.eq(0).html(dataObj.Num[1] );
	
	objver.html(dataObj.Very[0])	
	 
	
}
//==========投票第二种方案 End=================


//====留言专用===============
function countLyNum(obj,ttextObj) //统计留言字符数
{
	//alert('sss');
	var textObj=document.getElementById(ttextObj);
	var num=obj.innerHTML.length;
	if(num>500)
	{
		alert("只允许输入500个字符，超过部份将自动删除");
		obj.innerHTML = obj.innerHTML.substr(1,500);
	}
	if (textObj!=null)
	{
		textObj.innerHTML=num;
	}
}

//================自动搜索专用=================
function autoSearch()
{
	var autooptions;
	
	autooptions = {
		  serviceUrl:'/ajax.asp',
		  minChars:1, 
    	  delimiter: /(,|;)\s*/, // regex or character
   		  maxHeight:400,
    	  // width:300,
   		  zIndex: 9999,
    	  deferRequestBy: 0, //miliseconds
  		  params: {action:'15' }, //aditional parameters
   		   //default is false, set to true to disable caching
    	  // callback function:
    	   onSelect: function(value, data){ 
		   
		   window.location=data;
		     },
   	   	  // local autosugest options:
   	      //lookup: ['January', 'February', 'March', 'April', 'May'] //local lookup values 
		  noCache: true
		  };
	
	if($('#keyword').length>0)
	{
		var a1 = $('#keyword').autocomplete(autooptions);   
	}
	
}

//============文章心情===========

function SetMoon(id,objid)
{
	var objb=$('#'+objid+ ' b');
	var objspan=$('#'+objid+ ' span');
	var objem=$('#'+objid+ ' em');
	var countid= objem.length;
	
	objem.css({cursor:"pointer"});
	if(countid>0){
	//alert(countid)
	objem.click(function (){ SendMoon(id,countid,$(this).attr('name'),objid)})
	
	SendMoon(id,countid,0,objid)
	}
		
}

function SendMoon(id,countid,sendid,objid)
{
  var url="action=17&id="+id+"&countid="+countid+"&sendid="+sendid+""
  $.ajax({
   type: "POST",
   url: "/ajax.asp",
   data: url,
   success: function(msg){
      ListMoon(msg,objid)  ;
   }
});
  

}

function ListMoon(msg,objid)
{  
	var objb=$('#'+objid+ ' b');
	var objspan=$("#"+objid + "  >ul>li> span >  img");
	var objem=$('#'+objid+ ' em');
	var countid= objb.length;
	
	//var aMsg=msg.split(",")
	var dataObj=eval("("+msg+")");//转换为json对象
	//alert(dataObj.data.length);//输出root的子对象数量
	//alert(msg);//输出root的子对象数量 
	//alert(countid)
	
	$('#'+objid+ ' label').html(dataObj.CountNumBer)
	 
	for(var i=0;i<countid;i++)
	{
		 objb.get(i).innerHTML= dataObj.Num[i];
		 objspan.eq(i).hide();
		// objspan.eq(i).attr('height',dataObj.data[i]);
		objspan.eq(i).css('height',dataObj.data[i] + '%')
		 
		 objspan.eq(i).slideDown("slow");
	}
	
}

//发送报错信息
function senderror(id,obj)
{
	var Content= document.getElementById(obj);
	var CommentTpyeId = 3
	
	if (Content.value.Trim().length<1) 
	{
		alert("请提供报错信息谢谢!!")
		return false;
	}
	
	var Url="content=" + escape(Content.value) + "&SoftID=" +  escape(id) + "&Action=2&CommentTpye="+CommentTpyeId;
	
	  var ref=function()//处理返回数据
	 	{
		  if (http_request.readyState == 4) { // 判断对象状态
            if (http_request.status == 200) { // 信息已经成功返回，开始处理信息
				var requestText=http_request.responseText;
                 if(requestText=="OK") 
				 {
					alert("你的报错信息已经提交感谢您的支持。");
					Content.value="";
					
				 }else
				 {alert(requestText);}
            } else { //页面不正常
                 alert("写数据出错了！！"); 
            }
        }
	}
      send_request("/ajax.asp",Url,ref,true);
	 //alert(Url)
	return true;	
}

//评论页读取顶
function BindDing(objtext,id,CommentTpye){
	var objtext=$("#comment_0  dl  dd  p ,#comment_1 > dl > dd > p");
	var obj=$(objtext)//模版写错，热门评论获取不到。。。。

	if (obj.length==0) return false;
	 for (var i=0 ;i<obj.length;i++){
	  var sobj = obj.eq(i).find("a:first")
	  var spanobj = obj.eq(i).find("span")	  
	  sobj.click(function (){ 
			SendDing($(this).parent().attr("id"));
			var  spanobj = $(this).parent().find("span")
			spanobj.html(parseInt(spanobj.html())+1);
			$(this).unbind();			
			$(this).attr("title","您已经顶过了");
		})
	 }
	ReadDing(objtext,id,CommentTpye)
}

function SendDing(id)//发送顶
{
	//alert(id)
   var url="action=19&id="+id
   $.ajax({
   type: "POST",
   url: "/ajax.asp",
   data: url,
   success: function(msg){
   	console.log("支持数据提交成功")
     // alert(msg)  ;
   }
});
}

//读取评论顶的数据
function ReadDing(objtext,id,CommentTpye)
{
	var obj=$(objtext);//模版代码写错，导致热门评论无法执行
	
	//return ; //退出
	
	var sendid="";
	for (var i=0 ;i<obj.length;i++)
	{
		sendid+=obj.eq(i).attr("id");
		if (i<(obj.length-1)) sendid+=",";
	}
	
if (sendid!="") //是否有评论
 {
	  var url="action=18&id="+id+"&CommentTpye="+CommentTpye+"&sendid="+escape(sendid)+""
	  $.ajax({
	   type: "POST",
	   url: "/ajax.asp",
	   data: url,
	   success: function(msg){
		  ListDing(objtext,msg)  ;
	   }
	});	
 }
}

function ListDing(objtext,msg) //显示顶的数据
{
	//alert(msg)
	var obj=$(objtext)
	var dataObj=eval("("+msg+")");//转换为json对象
	 for (var i=0 ;i<obj.length;i++)
	 { 
	   var spanobj = obj.eq(i).find("span")
	   var sid = obj.eq(i).attr("id");
	   for (var y=0;y < dataObj.ID.length;y++)
	   {
		   if (sid == dataObj.ID[y])
		   {
			 spanobj.html(dataObj.Ding[y]);
			 break;
		   }
	   }
	}	
}

//盖楼
var AllDownAction={
	init: function() {
        this.ReviewisReply(); //评论回复
		//this.HideReply();  //没有评论的不显示
    },
	ReviewisReply:function(){ 
		$("a[pid]").click(function(){
			$("#ly_content").val("[quote]"+$(this).attr("pid")+"[/quote]").focus();
			//alert($(this).attr("pid"))
			return false;		
		})
	} ,
	HideReply:function(){	
		if($("#comment_0").length <=0){return false}
 		$("#comment_0,#comment_1").each(function(){
			if($(this).find("dt").length==0){
				$(this).hide();
			}
		 })		 
	}
}
$(function(){
	AllDownAction.init();	
})

//投票 需要 JQ支持  
//function SendVote(id,sobj,ref)
function SendVote(id,sobj,ref)
{
	var obj = $(sobj +" input");
	var temp='';
	for(var i=0; i<obj.length; i++)
	{
		if (obj.eq(i).attr("checked")==true)
		{
			if (temp !='') temp +=',';
			temp +=  i;
		}
		obj.eq(i).attr("checked",false);
	}
	
	if (temp=='') {
		alert('请选择一个项目!!')
		return;
	}
	
  var url="action=21&id="+id+"&v="+ escape(temp);
   $.ajax({
   type: "POST",
   url: "/ajax.asp",
   data: url,
   success: function(msg){
      ref(msg)
   }
});
}

//单个投票ＪＱ支持
function OneVote(id,ni,ref)
{
  var url="action=21&id="+id+"&v="+ escape(ni);
   $.ajax({
   type: "POST",
   url: "/ajax.asp",
   data: url,
   success: function(msg){
      ref(msg)
   }
});
}


//读取投票数据 ＪＱ支持
function ReadVote(id,ref)
{
  var url="action=21&id="+id+"&v=";
   $.ajax({
   type: "POST",
   url: "/ajax.asp",
   data: url,
   success: function(msg){
      ref(msg)
   }
});
}


//设置控制的显示的数值
//sobj　JQ选择器 msg 数据 , iatt 是否百分比 ,att CSS Name
//列子 Listvote('#vote b',msg,true,'') 
//	   Listvote('#vote em img',msg,false,'width') 
function Listvote(sobj,msg,iatt,att) //显示顶的数据
{
	//alert(msg)
	var obj=$(sobj)
	var dataObj=eval("("+msg+")");//转换为json对象
	var PNum=0
	 
		for (var i=0;i<obj.length; i++)
		{
			if (iatt)
			{
				obj.eq(i).html(dataObj.Num[i]);  
			}else
			{
				PNum =  (dataObj.Num[i] /dataObj.NumBer *100).toFixed(1);
				if (att=='')
				{
				 obj.eq(i).html(PNum + "%" ); 
				}else
				{
				  obj.eq(i).css(att, PNum + '%');
				 // alert(obj.eq(i).attr(att))  
				}
			}
		}	  
}



//屏蔽规则2019
var isClose = false;
var dengji2 = false;
var dengji3 = false;
if(typeof(_pageinfo) != "undefined"){
    if(typeof(_pageinfo.softlicence) != 'undefined'){
      if(_pageinfo.softlicence == "\u4e0b\u67b6"){
        //如果授权等于 xj 就影藏body，通过CSS。这样不用等框架加载完毕
        $('head').append($("<style>body{ display:none}</style>"));
        isClose = true
      }

	// if(_pageinfo.softlicence != "\u4e0b\u67b6"){
	//     if(typeof(_pageinfo.star) != 'undefined'){
	//       if (_pageinfo.star == '1') {   //安卓模版 1ResRank
	//          // $("title").html('腾讯欢乐斗地主手机版2019下载-欢乐斗地主手机版v6.082.001 安卓版-腾牛安卓网');
	// 		  //2020-2-27修改安卓模版1星只屏蔽下载地址
	//           //$('head').append($("<style>body{ display:none}</style>"));
	//           //dengji2 = true
			  
	// 		  $(function(){
	// 			  $('.m-down-ul li').remove() ;//先隐藏所有下载按钮
	// 			  $(".m-down").hide();//无下载地址隐藏相关下载
	// 			  $(".m-move-link").hide();//隐藏高速下载
	// 			  $('.m-down-ul').html('<li><a class="m-xiajia" style="background-color:#c8c8c8;" href="javascript:;"><i></i>应用已下架</a></li>');//添加下架按钮
	// 		  });
			  
	//         }
	//       }
	//  }

	 // if(_pageinfo.softlicence != "\u4e0b\u67b6"){
	 //    if(typeof(_pageinfo.pcstar) != 'undefined'){
	 //      if (_pageinfo.pcstar == '1') {  //PC下载模版 1ResRank
	 //         // $("title").html('腾讯欢乐斗地主手机版2019下载-欢乐斗地主手机版v6.082.001 安卓版-腾牛安卓网');
		// 	  //2020-2-27修改安卓模版1星只屏蔽下载地址
	 //          //$('head').append($("<style>body{ display:none}</style>"));
	 //          //dengji3 = true
			  
		// 	  $(function(){
		// 	  		$(".m-down-btn div.f-fl").hide();//隐藏高速下载
		// 			$('.m-a-link').css('background-color', '#ccc').find('p').text('暂无下载');//下载按钮改变灰色
		// 			//隐藏底部下载地址
		// 			var txt1 = $(".g-left-title .m-title-dome ul li").eq(0).text();	//获取下载地址tab第一个	
		// 			if(txt1 == 'PC版'){							
		// 				//$(".g-left-title .m-title-dome ul li").eq(0).remove();
		// 				//$(".u-down-list").children().first().remove();
		// 				$(".m-down-content .u-down-list .u-link-list").eq(0).find("h4").hide();
		// 				$(".m-down-content .u-down-list .u-link-list").eq(0).find("ul").hide();
		// 				$(".m-down-content .u-down-list .u-link-list").append('<p style="margin:20px 0px 0px 20px"><img src="/skin/new2018/images/tigicoimg.png"></p>');
		// 			}
					
					
		// 	  });
			  
	 //        }
	 //      }
	 // }

  } 
}



$(function(){
  if(isClose == true){
    if(typeof(_pageinfo.page) != 'undefined'){
      //这里根据page属性判断具体页面，进行不同处理
      if(_pageinfo.page == "androidsoft"){
        closePage(".g-nav-full","body,.g-new-foot");
      }
    }
    
  }

  if(dengji2 == true){
      if(typeof(_pageinfo.page) != 'undefined'){
        if(_pageinfo.page == "androidsoft"){
          dengji(".g-nav-full","body,.g-new-foot");      
        }
      }
      
    }

   if(dengji3 == true){
      if(typeof(_pageinfo.page) != 'undefined'){
        if(_pageinfo.page == "androidsoft"){
          pcdengji(".g-navlist","body,.g-new-foot");      
        }
      }
      
    }

})

function closePage(hidebox,showbox){
  $(hidebox).nextAll().hide();
  $(hidebox).after('<div style="width:1200px;  height:500px; line-height:500px; padding:20px; border:1px solid #eee; background:#fff; margin:20px auto; font-size:54px; font-weight:bold; display:block; overflow:hidden;text-align:center;">\u8be5\u8f6f\u4ef6\u5df1\u4e0b\u67b6</div>');    
  $(showbox).show();
}

function dengji(hidebox,showbox){
  $(hidebox).nextAll().hide();
  $(hidebox).after('<div class="g-box-1200 g-nav"> <span></span>当前位置：<a href="/">首页 </a>→ <a href="/list/r_16_1.html">安卓游戏</a> → <a href="/list/s_224_1.html">卡牌桌游</a> → 欢乐斗地主手机版 v6.082.001 安卓版</div><div class="g-box-1200 clearfix"> <div class="f-fl m-sjleft"><div class="m-sjlinfo"><img src="https://pic.qqtn.com/up/2018-12/2018123112011944767.png" class="m-big-img" alt="欢乐斗地主手机版v6.082.001 安卓版"><h1>欢乐斗地主手机版</h1><div id="digg" class="m-dc clearfix"><div id="good" class="digg_btn f-fl" style="cursor: pointer;"><b>2</b></div><div id="bad" class="digg_btn m-cai f-fr"><b>1</b></div></div><ul class="m-down-ul info"><li><a href="javascript:;" class="m-move-link"><i></i>高速下载</a></li><li class="m-ljdown"><a href="http://dx10.198174.com/qqhlddz6082.apk" id="address"><i></i>立即下载</a></li></ul><dl class="m-sj-qr"><dt><img src="https://qr.612.com/pic.php?data=https://m.qqtn.com/q/284847" alt="扫描二维码到手机下载"></dt><dd>使用二维码下载到手机</dd></dl></div><div class="m-sjtj"><h4 class="m-tith4"><i></i>本类热门推荐</h4><ul class="m-sjtjul"><li><a href="/azgame/376989.html" target="_blank"><img src="https://pic.qqtn.com/up/2019-1/2019012709414446754.png" alt="无限封锁v1.0.2.5.9152 安卓版"><strong>无限封锁v1.0.2.5.9152 安卓版</strong><b>策略塔防</b><em>立即下载</em></a></li><li><a href="/azgame/267827.html" target="_blank"><img src="https://pic.qqtn.com/up/2019-1/2019012410161499633.png" alt="钓鱼王者手游v1.5 安卓版"><strong>钓鱼王者手游v1.5 安卓版</strong><b>休闲益智</b><em>立即下载</em></a></li><li><a href="/azgame/319780.html" target="_blank"><img src="https://pic.qqtn.com/up/2019-1/2019012317383788417.png" alt="王者修仙v0.4.46 安卓版"><strong>王者修仙v0.4.46 安卓版</strong><b>角色扮演</b><em>立即下载</em></a></li><li><a href="/azgame/397263.html" target="_blank"><img src="https://pic.qqtn.com/up/2019-1/2019012214204155248.png" alt="闲趣斗地主v1.0.0.1 安卓版"><strong>闲趣斗地主v1.0.0.1 安卓版</strong><b>卡牌桌游</b><em>立即下载</em></a></li><li><a href="/azgame/194716.html" target="_blank"><img src="https://pic.qqtn.com/up/2019-1/2019011717113915244.png" alt="江山荣耀手游v1.007 安卓版"><strong>江山荣耀手游v1.007 安卓版</strong><b>策略塔防</b><em>立即下载</em></a></li><li><a href="/azgame/194228.html" target="_blank"><img src="https://pic.qqtn.com/up/2019-1/201919828555486.jpg" alt="QQ飞车手游v1.10.0.12954 安卓版"><strong>QQ飞车手游v1.10.0.12954 安卓版</strong><b>赛车竞速</b><em>立即下载</em></a></li><li><a href="/azgame/382374.html" target="_blank"><img src="https://pic.qqtn.com/up/2019-1/2019010716190789079.jpg" alt="幻灵战歌v1.0.2 安卓版"><strong>幻灵战歌v1.0.2 安卓版</strong><b>角色扮演</b><em>立即下载</em></a></li><li><a href="/azgame/212203.html" target="_blank"><img src="https://pic.qqtn.com/up/2018-5/2018053016222431602.gif" alt="初音速手游官方版v0.4.1 安卓版"><strong>初音速手游官方版v0.4.1 安卓版</strong><b>休闲益智</b><em>立即下载</em></a></li></ul></div><!-- /左侧内容 --> </div> <div class="f-fl m-sjconter"><div class="m-ctop clearfix f-mb15"><ul class="f-fl"><li><i>分类：</i><span>卡牌桌游</span></li><li><i>大小：</i><b>98.4M</b></li><li class="m-sall"><i>语言：</i><span>中文</span></li><li><i>版本：</i><span>v6.082.001 安卓版</span></li><li><i>时间：</i><span>2019-01-28</span></li><li class="m-sall"><i>星级：</i><span><img src="/skin/new2013/images/xin4.png"></span></li><li><i>官网：</i><a href="http://hlddz.qq.com/" target="_blank">http://hlddz.qq.com/</a></li><li><i>厂商：</i><span><a href="/cy/67.html" target="_blank">腾讯游戏</a></span></li><li class="m-sall"><i>平台：</i><span>Android</span></li><li class="g-dwonin-label"><i>标签：</i><a href="/key/txsy/" target="_blank">腾讯手游</a><a href="/key/ddz/" target="_blank">斗地主</a></li></ul><a href="/ku/hlddz/" target="_blank" class="g-goku f-fr">进入专区</a></div><div class="m-cbj f-mb15"><div class="m-cbjtxt">腾讯游戏精心打造，十一年棋牌精品，与全球8亿玩家一起欢乐斗地主！</div></div><div class="m-jietu f-mb15 show_r2"><h5 class="m-tith5"><strong>应用截图</strong></h5><div class="showcase" id="showcase"><div class="scrollbar" style="position: relative; overflow: hidden;"><div class="s-box"><ul class="s-content" style="position: absolute; width: 990px; left: 0px;"> <li class="picture" style="width: 180px;"><div><a href="javascript:;" class="f-bigimg f-hov" i="https://pic.qqtn.com/up/2019-1/2019012815570159153.jpg" style="cursor: pointer;"><span style="display: none;"></span><img src="https://pic.qqtn.com/up/2019-1/2019012815570159153.jpg" alt="欢乐斗地主手机版v6.082.001 安卓版"></a></div></li><li class="picture" style="width: 180px;"><div><a href="javascript:;" class="f-bigimg f-hov" i="https://pic.qqtn.com/up/2019-1/2019012815570220008.jpg" style="cursor: pointer;"><span style="display: none;"></span><img src="https://pic.qqtn.com/up/2019-1/2019012815570220008.jpg" alt="欢乐斗地主手机版v6.082.001 安卓版"></a></div></li><li class="picture" style="width: 180px;"><div><a href="javascript:;" class="f-bigimg f-hov" i="https://pic.qqtn.com/up/2019-1/2019012815570293596.jpg" style="cursor: pointer;"><span style="display: none;"></span><img src="https://pic.qqtn.com/up/2019-1/2019012815570293596.jpg" alt="欢乐斗地主手机版v6.082.001 安卓版"></a></div></li><li class="picture" style="width: 180px;"><div><a href="javascript:;" class="f-bigimg f-hov" i="https://pic.qqtn.com/up/2019-1/2019012815570296532.jpg" style="cursor: pointer;"><span style="display: none;"></span><img src="https://pic.qqtn.com/up/2019-1/2019012815570296532.jpg" alt="欢乐斗地主手机版v6.082.001 安卓版"></a></div></li><li class="picture" style="width: 180px;"><div><a href="javascript:;" class="f-bigimg f-hov" i="https://pic.qqtn.com/up/2019-1/2019012815570291187.jpg" style="cursor: pointer;"><span></span><img src="https://pic.qqtn.com/up/2019-1/2019012815570291187.jpg" alt="欢乐斗地主手机版v6.082.001 安卓版"></a></div></li></ul></div><div class="track" style="display: block;"><div style="position: absolute; width: 453.434px; left: 0px;"></div></div></div></div></div><div class="m-jianjie f-mb15"><h5 class="m-tith5"><strong>应用介绍</strong></h5><div class="g-info-tag"><p>游戏Tags：<a href="/tags/%BB%B6%C0%D6%B6%B7%B5%D8%D6%F7.html" target="_blank"> 欢乐斗地主</a><a href="/tags/%B6%B7%B5%D8%D6%F7%CA%D6%D3%CE.html" target="_blank"> 斗地主手游</a><a href="/tags/%CC%DA%D1%B6%CA%D6%D3%CE.html" target="_blank"> 腾讯手游</a></p></div><div class="m-center" style="height: 500px;"><p><a target="_blank" href="https://www.qqtn.com/qqkey/hlddzjbb/">欢乐斗地主</a>手机版2019全新版本，迎来腾讯欢乐斗地主11周年经典版本，作为腾讯最经典的棋牌游戏，以最纯正最经典的棋牌游戏玩法，开创出一个全新的欢乐棋牌游戏对局；丰富的竞技玩法、刺激的赛事，带给每一位玩家最高品质的游戏体验！</p><p style="text-align:center;"><img src="https://pic.qqtn.com/up/2018-8/15352559188547987.jpg" title="欢乐斗地主手机版" alt="欢乐斗地主手机版"></p><h3>游戏介绍：</h3><p>欢乐<a target="_blank" href="https://www.qqtn.com/key/ddz/">斗地主</a>是腾讯移动<a target="_blank" href="https://www.qqtn.com/qqkey/yxpt/">游戏平台</a>首款实时对战棋牌手游，最纯正经典玩法+最丰富癞子玩法+最刺激挑战赛玩法，全民在线牌技PK；您可以与亿万游戏玩家同桌竞技，还可以和好友拼倍数、拼财富，在游戏中感受到无处不在的欢乐！</p><h3>游戏特色：</h3><p>【纯正的<a target="_blank" href="https://www.qqtn.com/qqkey/jddjyxphb/">经典</a>玩法】</p><p>经典玩法+癞子玩法，全民牌技PK！ 还有任务，抢地主，明牌，加倍等玩法，对局乐趣精彩不停！</p><p>【丰富的<a target="_blank" href="https://www.qqtn.com/key/jingji/">竞技</a>玩法】</p><p>新鲜有趣的三颗心玩法，<a target="_blank" href="https://www.qqtn.com/key/jssy/">角色</a>百变，技能升级！ 不同的打牌策略，看你如何抉择！</p><p>【刺激的赛事玩法】</p><p>丰富多样的赛事模式，钻石赛、挑战赛爽快刺激，诚邀各路斗地主高手见证实力、收获荣誉！</p><p>【高品质的游戏体验】</p><p>场景化的游戏界面，感受真实的斗地主；丰富<a target="_blank" href="https://www.qqtn.com/qqkey/iulxzz/">趣味</a>的飞机、炸弹动画，为斗地主增添更多欢乐元素！</p><p>【全新的<a target="_blank" href="https://www.qqtn.com/key/shejsy/">社交</a>体验】</p><p>邀请好友一起开私人房斗地主，情感连线！给好友送心送豆，请好友一起做任务领豆豆！高分炫耀，连胜比拼，好友互动不停！</p><h3>更新内容：</h3><p>版本更新内容：</p><p>1、新增【好友】系统，支持添加一起玩过的、附近在玩的斗地主玩家以及搜索添加好友，与志同道合的牌友一起交流，欢乐更多！</p><p>2、新增【聊天】系统，支持世界频道喊话，和全世界的牌友一起交流牌技；还能和好友说悄悄话，畅所欲言~</p><p>3、新增【<a target="_blank" href="https://www.qqtn.com/key/zdyxdq/">组队</a>】任务，和牌友一起组队，轻松完成任务，领取丰厚奖励。</p><p>最近更新内容：</p><p>1.新玩法【残局<a target="_blank" href="https://www.qqtn.com/key/cglsy/">闯关</a>】模式高能上线，人机大战，智力闯关！</p><p>2.新增【收藏牌局】功能，精彩牌局一键收藏，随时查看回放！</p><div class="m-fzk"><p class="m-zk">展开 + </p><p class="m-sq">收起 - </p></div></div></div><div class="m-down f-mb15"><div class=" m-hovertab-box" data-speed="160"><dl class="m-ktitle"><dt><strong><i></i>下载地址</strong></dt><dd class="m-hovertab-btn f-fr"><span class="m-hover">Android版</span><span>iphone版</span></dd> </dl><div class="m-hovertab-cont m-downur"><script type="text/javascript"> var _downInfo = {}; </script> <h3>欢乐斗地主手机版 v6.082.001 安卓版</h3><ul class="clearfix"><script> _downInfo = {Address:"qqhlddz6082.apk",TypeID:"23",SoftLinkID:"288302",SoftID:"284847",Special:"0"}</script><li class="address_like f-other-url"><a href="http://dx10.198174.com/qqhlddz6082.apk" target="_blank" onclick="softCount(284847,288302)">电脑本地下载</a></li><li class="address_like f-other-url"><a href="http://dx10.198174.com/qqhlddz6082.apk" target="_blank" onclick="softCount(284847,288302)">电脑本地下载</a></li><li class="address_like f-other-url"><a href="http://dx10.198174.com/qqhlddz6082.apk" target="_blank" onclick="softCount(284847,288302)">南方电信下载</a></li><li class="address_like f-other-url"><a href="http://dx10.198174.com/qqhlddz6082.apk" target="_blank" onclick="softCount(284847,288302)">北方联通下载</a></li><li class="address_like f-other-url"><a href="http://dx10.198174.com/qqhlddz6082.apk" target="_blank" onclick="softCount(284847,288302)">湖北电信下载</a></li><li class="address_like f-other-url"><a href="http://dx10.198174.com/qqhlddz6082.apk" target="_blank" onclick="softCount(284847,288302)">江苏电信下载</a></li><li class="address_like f-other-url"><a href="http://dx10.198174.com/qqhlddz6082.apk" target="_blank" onclick="softCount(284847,288302)">广东电信下载</a></li><li class="address_like f-other-url"><a href="http://dx10.198174.com/qqhlddz6082.apk" target="_blank" onclick="softCount(284847,288302)">浙江电信下载</a></li></ul></div><div class="m-hovertab-cont m-downur" style="display: none;"><h5 class="pan_0"><a href="https://itunes.apple.com/cn/app/id446324234" target="_blank">欢乐斗地主腾讯官方版iOS下载 v6.043.001 iPhone/iPad版</a></h5> </div></div></div><div class="m-xgnews f-mb15 f-num"><h5 class="m-tith5"><strong>相关文章</strong></h5><ul class="m-xgnewsul clearfix"><li><i></i><a target="_blank" href="/article/article_269914_1.html">微信欢乐斗地主8月残局破解攻略 微信欢乐斗地主8月</a></li><li><i></i><a target="_blank" href="/article/article_243899_1.html">微信欢乐斗地主3月残局100关通关攻略 3月残局通关</a></li><li><i></i><a target="_blank" href="/article/article_241917_1.html">微信欢乐斗地主二月残局出牌顺序 欢乐斗地主残局4</a></li><li><i></i><a target="_blank" href="/article/article_224782_1.html">2017腾讯棋牌年度盛典在哪里隆重开幕 欢乐斗地主每</a></li><li><i></i><a target="_blank" href="/article/article_220783_1.html">吉利远景斗地主大赛的第一场决赛会在12月几号开打</a></li><li><i></i><a target="_blank" href="/article/article_219191_1.html">欢乐斗地主手机版寻宝限时8折活动 腾讯欢乐斗地主</a></li></ul></div><div class="m-pl f-mb15"><h5 class="m-tith5"><strong>用户评论</strong></h5><div id="comment_list"><div id="s_comment"><form action="" id="zt_ly" onkeydown="submitForm()"><textarea name="ly_content" id="ly_content" placeholder="写下你想说的话"></textarea><div class="comment_btn"><input name="ly_id" type="hidden" id="ly_id" value="284847"><input name="CommentTpye" type="hidden" id="ztid" value="0"><input type="button" value=" 发表评论 " onclick="submitComment()"><span>请自觉遵守互联网相关政策法规，评论内容只代表网友观点，与本站立场无关！</span></div></form> </div> <div id="comment_0"><h2><span>热门评论</span></h2><dl></dl> </div> <div id="comment_1"><h2><span>最新评论</span></h2><dl></dl> </div> <h3 class="lookpl"><a href="/comment_284847_0.html">已有<i>0</i>人参与，点击查看更多精彩评论</a></h3></div><!-- /评论结束--></div><!-- /中间内容 --> </div> <div class="f-fr m-sjright"><div class="m-sjph f-mb15"><h4 class="m-tith4"><i></i>本类下载排行</h4><ul class="m-add-hover f-top f-top3"><li class="m-rank-color1 f-t3"><a href="/azgame/397263.html" target="_blank"> <i>1</i> <img src="https://pic.qqtn.com/up/2019-1/2019012214204155248.png" alt="闲趣斗地主"> <strong>闲趣斗地主</strong> <b>立即下载</b></a></li><li class="m-rank-color2 f-t3"><a href="/azgame/281542.html" target="_blank"> <i>2</i> <img src="https://pic.qqtn.com/up/2018-11/2018110713442994190.jpg" alt="万象物语手游"> <strong>万象物语手游</strong> <b>立即下载</b></a></li><li class="m-rank-color3 f-t3"><a href="/azgame/371398.html" target="_blank"> <i>3</i> <img src="https://pic.qqtn.com/up/2018-12/2018121410183955374.jpg" alt="调教三国手游"> <strong>调教三国手游</strong> <b>立即下载</b></a></li><li class="m-rank-color4"><a href="/azgame/355919.html" target="_blank"> <i>4</i> <img src="https://pic.qqtn.com/up/2018-11/2018112318173625829.jpg" alt="新斗罗大陆手游"> <strong>新斗罗大陆手游</strong> <b>立即下载</b></a></li><li class="m-rank-color5"><a href="/azgame/230586.html" target="_blank"> <i>5</i> <img src="https://pic.qqtn.com/up/2018-12/20181214814337207.png" alt="影之诗手游"> <strong>影之诗手游</strong> <b>立即下载</b></a></li><li class="m-rank-color6"><a href="/azgame/155826.html" target="_blank"> <i>6</i> <img src="https://pic.qqtn.com/up/2018-12/2018121117275860620.jpg" alt="少年驱魔教团手游"> <strong>少年驱魔教团手游</strong> <b>立即下载</b></a></li><li class="m-rank-color7"><a href="/azgame/55588.html" target="_blank"> <i>7</i> <img src="https://pic.qqtn.com/up/2018-12/2018120613242767931.jpg" alt="去吧皮卡丘手游"> <strong>去吧皮卡丘手游</strong> <b>立即下载</b></a></li><li class="m-rank-color8"><a href="/azgame/106701.html" target="_blank"> <i>8</i> <img src="https://pic.qqtn.com/up/2018-12/2018120609195959976.png" alt="部落冲突皇室战争安卓版"> <strong>部落冲突皇室战争安卓版</strong> <b>立即下载</b></a></li><li class="m-rank-color9"><a href="/azgame/82446.html" target="_blank"> <i>9</i> <img src="https://pic.qqtn.com/up/2018-12/2018120211420613806.jpg" alt="航海王强者之路手游"> <strong>航海王强者之路手游</strong> <b>立即下载</b></a></li><li class="m-rank-color10"><a href="/azgame/130558.html" target="_blank"> <i>10</i> <img src="https://pic.qqtn.com/up/2018-11/2018112814231349433.jpg" alt="放开那三国2手游"> <strong>放开那三国2手游</strong> <b>立即下载</b></a></li></ul></div><div class="m-sjhj f-mb15"><h4 class="m-tith4"><i></i>同类最新合集</h4><ul><li><a href="/qqkey/zhwsynew/" target="_blank"><img src="https://pic.qqtn.com/up/2018-1/201818923591617.jpg" alt="2018最好玩手游"><strong>2018最好玩手游</strong></a></li><li><a href="/qqkey/zhsynew/" target="_blank"><img src="https://pic.qqtn.com/up/2018-1/20181892661739.jpg" alt="2018最火手游"><strong>2018最火手游</strong></a></li><li><a href="/qqkey/wyhhzsy/" target="_blank"><img src="https://pic.qqtn.com/up/2016-11/201611251728267120.jpg" alt="网易回合制手游"><strong>网易回合制手游</strong></a></li><li><a href="/qqkey/mhxysybbdq/" target="_blank"><img src="https://pic.qqtn.com/up/2015-8/2015814154528.jpg" alt="梦幻西游手游版本大全"><strong>梦幻西游手游版本大全</strong></a></li><li><a href="/qqkey/fylsydq/" target="_blank"><img src="https://pic.qqtn.com/up/2018-9/20189281827607.png" alt="考验反应力的手游"><strong>考验反应力的手游</strong></a></li></ul></div></div></div>');    
  $(showbox).show();
  $(".m-center").css("height","auto")
  var conHeight = $(".m-center").height();

}

function pcdengji(hidebox,showbox){
  $(hidebox).nextAll().hide();
  var pcdengjitxt =("<div class=\'g-box-1200 g-nav\'><span></span>当前位置：<a href=\'/\'>首页</a>  → <a href=\'/list/r_8_1.html\'>游戏娱乐</a> → <a href=\'/list/s_279_1.html\'>游戏平台</a> → QQ游戏大厅2019官方下载正式版 v5.16.56082 最新版</div>");
	pcdengjitxt += ("<div class=\'g-box-1200 g-main-bg clearfix\'><div class=\'g-top-name\'><div class=\'f-fl m-h4name\'><img src=\'https://pic.qqtn.com/up/2019-2/20192211321485112.png\'alt=\'QQ游戏大厅2019官方下载正式版\'><h1>QQ游戏大厅2019官方下载正式版v5.16.56082 最新版</h1><strong>QQ游戏大厅官方下载</strong><b>评分：<span>8.2</span>分</b></div><span class=\'m-down-link f-fr\'><a href=\'#down-mian\'>下载地址</a></span></div><div class=\'clearfix\'><div class=\'g-detail-fix f-fl\'><div class=\'f-fl clearfix w585\'><ul class=\'m-list-box clearfix\'><li><span>软件大小：</span>54.7M</li><li><span>软件语言：</span>中文</li><li><span>更新时间：</span>2019-02-21</li><li><span>软件类别：</span>免费/游戏平台</li><li><span>软件性质：</span>PC软件</li><li><span>软件厂商：</span></li><li><span>运行环境：</span>WinAll</li><li><span>软件等级：</span><img src=\'/skin/new2018/images/s5.gif\'></li><li><span>官方网址：</span><a href=\'http://qqgame.qq.com/\'target=\'_blank\'>http://qqgame.qq.com/</ul><div class=\'m-down-btn clearfix\'><a class=\'m-a-link f-fl m-down-link\'href=\'#down-mian\'><p>本地下载</p></a><div class=\'f-fl\'></div></div><div class=\'g-click-two clearfix\'><p class=\'good_or_bad f-fl\'id=\'good_or_bad\'><a class=\'is_good\'id=\'is_good\'href=\'javascript:void(0);\'><b onClick=\'ngsEval(27772,1,\'is_good\',\'is_bad\',0)\'>点赞</b><span><i><img src=\'/skin/new2018/images/good-bg.png\'height=\'12\'width=\'50\'/></i></span><em>50%（1）</em></a><a class=\'is_bad\'id=\'is_bad\'href=\'javascript:void(0);\'><b onClick=\'ngsEval(27772,0,\'is_good\',\'is_bad\',0)\'>差评</b><span><i><img src=\'/skin/new2018/images/bad-bg.png\'height=\'12\'width=\'50\'/></i></span><em>50%（1）</em></a></p></div></div><div class=\'icolstbox m-soft-relat f-fr clearfix\'><ul class=\'icolst c_soft_same\'><li><a class=\'pic\'href=\'/down/355199.html\'preview=\'https://pic.qqtn.com/up/2017-2/2017224921476030.png\'><img src=\'https://pic.qqtn.com/up/2018-7/2018070219322810993.png\'alt=\'QQ游戏大厅2019官方版\'/></a><h6><a href=\'/down/355199.html\'>QQ游戏大厅2019官方版<span>v2.11(5.11.48586.0)最新版</span></a></h6><p><span>/</span>中文<span>/</span><em class=\'m-pc\'data=\'279\'></em></p></li><li><a class=\'pic\'href=\'/iosgame/241385.html\'preview=\'https://pic.qqtn.com/up/2017-7/2017072814340976090.jpg\'><img src=\'https://pic.qqtn.com/up/2017-7/2017072814334544113.png\'alt=\'QQ游戏大厅iOS版2018官方下载\'/></a><h6><a href=\'/iosgame/241385.html\'>QQ游戏大厅iOS版2018官方下载<span>v2.7.1最新版</span></a></h6><p><span>/</span>中文<span>/</span><em class=\'m-pc\'data=\'315\'></em></p></li><li><a class=\'pic\'href=\'/azsoft/241322.html\'preview=\'https://pic.qqtn.com/up/2017-7/2017072814340976090.jpg\'><img src=\'https://pic.qqtn.com/up/2017-7/2017072814334544113.png\'alt=\'QQ游戏大厅手机版2018免费下载\'/></a><h6><a href=\'/azsoft/241322.html\'>QQ游戏大厅手机版2018免费下载<span>v6.8.10官方版</span></a></h6><p><span>/</span>中文<span>/</span><em class=\'m-pc\'data=\'207\'></em></p></li><li><a class=\'pic\'href=\'/gamefz/203340.html\'preview=\'https://pic.qqtn.com/up/2017-5/201751396482975.jpg\'><img src=\'https://pic.qqtn.com/file/2013/2015-5/20155610546.png\'alt=\'QQ游戏大厅领取蓝钻一月工具\'/></a><h6><a href=\'/gamefz/203340.html\'>QQ游戏大厅领取蓝钻一月工具<span>1.0免费版</span></a></h6><p><span>/</span>中文<span>/</span><em class=\'m-pc\'data=\'281\'></em></p></li><li><a class=\'pic\'href=\'/down/70130.html\'preview=\'https://pic.qqtn.com/file/2013/2015-3/201539172157.png\'><img src=\'https://pic.qqtn.com/file/2013/2015-3/201539172355.jpg\'alt=\'QQ游戏大厅挤房器\'/></a><h6><a href=\'/down/70130.html\'>QQ游戏大厅挤房器<span>1.0绿色版</span></a></h6><p><span>/</span>中文<span>/</span><em class=\'m-pc\'data=\'12\'></em></p></li><li><a class=\'pic\'href=\'/qqfz/49213.html\'preview=\'https://pic.qqtn.com/file/2013/2013-12/2013123094826.png\'><img src=\'https://pic.qqtn.com/file/2013/2013-12/2013123094822.jpg\'alt=\'QQ游戏大厅管理器\'/></a><h6><a href=\'/qqfz/49213.html\'>QQ游戏大厅管理器<span>1.0绿色版</span></a></h6><p><span>/</span>中文<span>/</span><em class=\'m-pc\'data=\'182\'></em></p></li><li><a class=\'pic\'href=\'/down/36687.html\'preview=\'https://pic.qqtn.com/file/2012/2012-11/2012112214253297704.png\'><img src=\'https://pic.qqtn.com/file/2012/2012-5/201252311452.gif\'alt=\'QQ游戏大厅java客户端\'/></a><h6><a href=\'/down/36687.html\'>QQ游戏大厅java客户端<span>v1.7官方最新版</span></a></h6><p><span>/</span>中文<span>/</span><em class=\'m-pc\'data=\'12\'></em></p></li><li><a class=\'pic\'href=\'/qqfz/35472.html\'preview=\'https://pic.qqtn.com/file/2012/2012-8/2012813145540.jpg\'><img src=\'https://pic.qqtn.com/file/2012/2012-8/2012813145317.jpg\'alt=\'qq游戏大厅多开登陆器下载\'/></a><h6><a href=\'/qqfz/35472.html\'>qq游戏大厅多开登陆器下载<span>1.0绿色免费版</span></a></h6><p><span>/</span>中文<span>/</span><em class=\'m-pc\'data=\'182\'></em></p></li><li><a class=\'pic\'href=\'/azsoft/34746.html\'preview=\'https://pic.qqtn.com/up/2018-9/201891814429986980.jpg\'><img src=\'https://pic.qqtn.com/up/2018-9/201891814421944.png\'alt=\'QQ游戏大厅手机版\'/></a><h6><a href=\'/azsoft/34746.html\'>QQ游戏大厅手机版<span>v6.8.19安卓版</span></a></h6><p><span>/</span>中文<span>/</span><em class=\'m-pc\'data=\'207\'></em></p></li><li><a class=\'pic\'href=\'/down/34093.html\'preview=\'https://pic.qqtn.com/file/2013/2014-2/2014217141537.jpg\'><img src=\'https://pic.qqtn.com/file/2013/2014-2/2014217141526.jpg\'alt=\'QQ游戏大厅去广告补丁\'/></a><h6><a href=\'/down/34093.html\'>QQ游戏大厅去广告补丁<span>4.6免费版</span></a></h6><p><span>/</span>中文<span>/</span><em class=\'m-pc\'data=\'180\'></em></p></li></ul></div></div><div class=\'g-bd-ban2018 f-fr clearfix\'></div></div></div><!-- --><div class=\'g-box-1200 g-main-bg g-hotico m-margin15\'><span></span><ul><li><a href=\'/down/32345.html\'target=\'_blank\'><b>点击下载</b><img src=\'https://pic.qqtn.com/up/2019-2/20192211327481235.png\'><strong>QQ浏览器v10.3.3117.400最新版</strong></a></li><li><a href=\'/down/33448.html\'target=\'_blank\'><b>点击下载</b><img src=\'https://www.qqtn.com/up/2018-9/2018091914503190716.png?0.06434196846916151\'><strong>QQ电脑管家v13.0.19832.233最新正式版</strong></a></li><li><a href=\'/down/36412.html\'target=\'_blank\'><b>点击下载</b><img src=\'https://pic.qqtn.com/up/2016-10/20161013911327729.png\'><strong>腾讯QQ下载v9.0.9.24439最新版</strong></a></li><li><a href=\'/down/29791.html\'target=\'_blank\'><b>点击下载</b><img src=\'https://pic.qqtn.com/up/2018-10/2018100818584919111.png\'><strong>360安全卫士v11.6.0.1001最新版</strong></a></li><li><a href=\'/down/173569.html\'target=\'_blank\'><b>点击下载</b><img src=\'https://pic.qqtn.com/up/2018-10/2018101509263466397.png\'><strong>迅雷10v10.1.2.174官方最新版</strong></a></li><li><a href=\'/down/29552.html\'target=\'_blank\'><b>点击下载</b><img src=\'https://pic.qqtn.com/up/2019-2/2019221139484817.png\'><strong>QQ音乐v16.50.0.0官方正式版</strong></a></li><li><a href=\'/down/106871.html\'target=\'_blank\'><b>点击下载</b><img src=\'https://pic.qqtn.com/up/2019-2/201922113504667.png\'><strong>企业微信电脑版v2.7.0.1558官方最新版</strong></a></li><li><a href=\'/down/32112.html\'target=\'_blank\'><b>点击下载</b><img src=\'https://pic.qqtn.com/up/2018-10/2018100411161396120.png\'><strong>美图秀秀电脑版v6.1.2.3官方版</strong></a></li><li><a href=\'/down/92572.html\'target=\'_blank\'><b>点击下载</b><img src=\'https://pic.qqtn.com/up/2015-10/2015102315133.png\'><strong>魔兽争霸官方对战平台下载v1.7.88最新版</strong></a></li><li><a href=\'/down/65154.html\'target=\'_blank\'><b>点击下载</b><img src=\'https://pic.qqtn.com/up/2019-2/2019220147579093.png\'><strong>微信电脑版v2.6.6.44最新版</strong></a></li></ul></div><!--必备推荐结束end--><div class=\'g-box-1200 m-margin15 clearfix\'><div class=\'m-main-left f-fl\'><div class=\'g-main-bg clearfix\'><div class=\'m-ml-nav\'><ul><li class=\'f-hover\'>软件介绍</li><li>软件截图</li><li>猜你喜欢</li><li>同类推荐</li><li>相关文章</li><li class=\'m-goto-link\'>下载地址</li></ul></div><div class=\'m-content-box f-jump-place\'><div class=\'g-info-tag\'><p>软件Tags：<a href=\'/tags/QQ%D3%CE%CF%B7%B4%F3%CC%FC.html\'target=\'_blank\'>QQ游戏大厅</a><a href=\'/tags/%D3%CE%CF%B7%B4%F3%CC%FC.html\'target=\'_blank\'>游戏大厅</a></p></div><div id=\'m-cont\'><p><span style=\'line-height: 0px;\'></span>QQ游戏大厅2019版发布，新版本登录大厅速度提升，轻松游戏更加畅快，下载游戏界面优化，便捷管理下载任务。&nbsp;QQ游戏分为两大类：一种是非QQ<a target=\'_blank\'href=\'https://www.qqtn.com/qqkey/yxpt/\'>游戏平台</a>下的网络游戏，如飞行岛、飞车、穿越火线等；另一种则是基于QQ游戏平台下的大部分为休闲游戏为主的游戏。喜欢玩斗地主、四国军棋等游戏的玩家有福了，这次的新版本登录速度/界面全面优化，增加了我的游戏管理区，让我可以随心所欲的定制专属游戏世界，而且鼠标可以随便拖拽，轻松安排游戏顺序，享受畅游于此的极致体验。</p><p align=\'center\'><img src=\'https://pic.qqtn.com/up/2019-2/15507271769988707.png\'title=\'QQ游戏大厅2019官方下载正式版\'alt=\'QQ游戏大厅2019官方下载正式版\'/></p><h3>QQ游戏正式发布啦，快来体验吧！新特性介绍：</h3><p>1、<a target=\'_blank\'href=\'https://www.qqtn.com/key/yxzs/\'>游戏助手</a>--聊天互动，攻略查询，游戏体验爽翻天；</p><p>2、<a target=\'_blank\'href=\'https://www.qqtn.com/key/ljsy/\'>联机</a>房间--组局<a target=\'_blank\'href=\'https://www.qqtn.com/key/dzsy/\'>对战</a>，休闲游戏也开黑；</p><p>3、功能优化--棋牌房间右键可查询玩家数据；</p><h3>如何下载游戏大厅？</h3><p>要开始玩QQ游戏，需先下载安装QQ游戏大厅，您可以通过以下两种途径获取到QQ游戏大厅：</p><p>方法一：从<a target=\'_blank\'href=\'https://www.qqtn.com/\'>腾牛网</a>本页面获取</p><p>方法二：从QQ下载QQ游戏大厅</p><p>启动您的QQ，点击QQ最下面的QQ游戏图标。</p><p align=\'center\'><img src=\'https://pic.qqtn.com/file/2013/2013-12/2013121212120929169759.jpg\'/></p><p>如果您尚未安装QQ游戏，会弹出QQ游戏下载窗口，点击“接受并继续”，开始下载安装QQ游戏。</p><h3>开始玩游戏：</h3><p>1、快速加入游戏</p><p>QQ游戏为您提供了快速开始游戏功能，如果您想省去手工寻找游戏座位的麻烦，</p><p>可以直接点击房间上方的“快速加入”按钮，</p><p>系统会自动给您寻找空余的游戏座位，帮您加入游戏。</p><p align=\'center\'><img src=\'https://pic.qqtn.com/file/2013/2013-12/2013121209302882470.jpg\'/></p><p>2、自助找座位开始游戏</p><p>进入游戏房间后，在房间窗口左侧显示有一个个游戏桌，<a target=\'_blank\'href=\'https://www.qqtn.com/qqkey/hyx/\'>和游戏</a>桌上的玩家。</p><p>您可以选择一个还未开始游戏的桌子加入游戏。</p><p align=\'center\'><img src=\'https://pic.qqtn.com/file/2013/2013-12/2013121209302876598.png\'/></p><h3 style=\'white-space: normal;\'><span style=\'line-height: 1em;\'>2.0版本大厅游戏报错提示环境异常解决公告：</span></h3><p style=\'white-space: normal;\'><span style=\'line-height: 1em;\'>部分玩家反应2.0版本大厅碰到<a target=\'_blank\'href=\'https://www.qqtn.com/key/jieji/\'>街机</a>游戏或其他游戏报错提示环境异常的情况，例如下图的提示</span></p><p align=\'center\'><img src=\'https://pic.qqtn.com/up/2017-2/201702240925196137861.png\'/></p><p style=\'white-space: normal;\'><span style=\'line-height: 1em;\'>玩家可以选择在线<a target=\'_blank\'href=\'https://www.qqtn.com/key/sjyxdq/\'>升级</a>大厅，即可解决问题。升级位置如下图提示：</span></p><p align=\'center\'><img src=\'https://pic.qqtn.com/up/2017-2/201702240925344531248.png\'style=\'line-height: 1em;\'/></p><p style=\'white-space: normal;\'><span style=\'line-height: 1em;\'>祝大家游戏愉快。</span></p><p style=\'white-space: normal;\'><span style=\'line-height: 1em;\'></span></p><h3 style=\'white-space: normal;\'>更新内容：</h3><p>1.优化个人主页内容</p><p>2.bug优化--解决无法启动游戏等问题</p></div><b class=\'f-cont-btn\'>展开内容</b></div></div><!--软件介绍结束--><div class=\'m-previmg-box m-margin15 g-main-bg f-jump-place\'><h4 class=\'m-tith4\'><i></i>软件截图</h4><div class=\'m-previmg-fix\'><b class=\'g-scroll-left prev\'></b><b class=\'g-scroll-right next\'></b><div class=\'m-previmg-show\'><ul><li><img src=\'https://pic.qqtn.com/up/2019-2/20192211333437610.png\'alt=\'QQ游戏大厅2019官方下载正式版v5.16.56082 最新版\'/></li><li><img src=\'https://pic.qqtn.com/up/2019-2/20192211334341190.png\'alt=\'QQ游戏大厅2019官方下载正式版v5.16.56082 最新版\'/></li></ul></div></div></div><!--软件截图结束-->")
	pcdengjitxt += ("<div class=\'m-like-box m-margin15 g-main-bg clearfix f-jump-place\'><div class=\'g-left-title\'><h4 class=\'m-tith4\'><i></i>猜你喜欢</h4><div class=\'m-title-dome\'id=\'f-like-txt\'><ul></ul></div></div><div class=\'m-bottom-box clearfix\'><div class=\'m-bottom-list\'><div class=\'u-top-box\'><a class=\'u-top-img\'target=\'_blank\'href=\'/qqkey/yxpt/\'><img src=\'https://pic.qqtn.com/up/2018-5/2018514929584029.jpg\'></a><h4><a href=\'/qqkey/yxpt/\'target=\'_blank\'>游戏平台</a></h4><p>游戏平台官方下载，游戏平台哪个好？现在是很多喜欢玩游戏的朋友都很需要一个好的游戏平台，不管你玩什么类型的游戏都是需要有一款不错的游戏平台的，好用的游戏平台可以带给你更多的游戏体验，以及认识更多的志同道</p></div><ul><li><a target=\'_blank\'href=\'/down/29403.html\'><p><em><img src=\'https://pic.qqtn.com/up/2017-2/20172241344326092.png\'></em></p><strong>jj斗地主官方下载0.7.2.11最新版</strong><b>02-24/241KB</b><i><img src=\'/skin/new2018/images/s5.gif\'></i></a></li><li><a target=\'_blank\'href=\'/azsoft/34746.html\'><p><em><img src=\'https://pic.qqtn.com/up/2018-9/201891814421944.png\'></em></p><strong>QQ游戏大厅手机版v6.8.19安卓版</strong><b>10-29/32.6M</b><i><img src=\'/skin/new2018/images/s5.gif\'></i></a></li><li><a target=\'_blank\'href=\'/down/56317.html\'><p><em><img src=\'https://pic.qqtn.com/up/2018-4/2018424850316546.png\'></em></p><strong>多玩盒子游戏大厅官方下载V5.0.1.45最新版</strong><b>04-24/9M</b><i><img src=\'/skin/new2018/images/s5.gif\'></i></a></li><li><a target=\'_blank\'href=\'/down/49244.html\'><p><em><img src=\'https://pic.qqtn.com/up/2018-8/2018080710172761732.png\'></em></p><strong>360游戏大厅v3.8.7.1001最新版</strong><b>08-07/15.7M</b><i><img src=\'/skin/new2018/images/s5.gif\'></i></a></li><li><a target=\'_blank\'href=\'/down/76070.html\'><p><em><img src=\'https://pic.qqtn.com/file/2013/2015-5/201552092041.png\'></em></p><strong>网易游戏平台下载1.2.22官方版</strong><b>02-22/42.9M</b><i><img src=\'/skin/new2018/images/s5.gif\'></i></a></li><li><a target=\'_blank\'href=\'/down/241353.html\'><p><em><img src=\'https://pic.qqtn.com/up/2018-10/2018101008340378642.png\'></em></p><strong>腾讯wegame平台v3.18.4.5627最新版</strong><b>10-10/3.8M</b><i><img src=\'/skin/new2018/images/s5.gif\'></i></a></li></ul></div><div class=\'m-bottom-list\'><div class=\'u-top-box\'><a class=\'u-top-img\'target=\'_blank\'href=\'/game/xysjfz/\'><img src=\'https://pic.qqtn.com/file/2013/2015-5/20155618719.jpg\'></a><h4><a href=\'/game/xysjfz/\'target=\'_blank\'>轩辕世界辅助</a></h4><p>轩辕世界作为腾讯首款微端类3DPK网游，已在QQ游戏大厅内上线，玩家还可下载轩辕世界微端，在桌面极速登陆游戏。面对这款全新微端游戏，使用轩辕世界辅助能够帮助玩家建立更轻松游戏环境，简化游戏中的繁琐玩法，真正</p></div><ul><li><a target=\'_blank\'href=\'/gamefz/46095.html\'><p><em><img src=\'https://pic.qqtn.com/file/2013/2013-10/201310179116.jpg\'></em></p><strong>腾讯游戏盒子官方下载1.0最新版</strong><b>11-29/4.6M</b><i><img src=\'/skin/new2018/images/s2.gif\'></i></a></li><li><a target=\'_blank\'href=\'/down/29199.html\'><p><em><img src=\'https://pic.qqtn.com/file/2013/2015-5/20155610546.png\'></em></p><strong>QQ游戏大厅PC怀旧版下载v3.13 P1免费版</strong><b>02-24/53.2M</b><i><img src=\'/skin/new2018/images/s2.gif\'></i></a></li><li><a target=\'_blank\'href=\'/down/74651.html\'><p><em><img src=\'https://pic.qqtn.com/up/2015-9/201592916587.png\'></em></p><strong>轩辕世界微端v2.1腾讯官方版</strong><b>09-29/33.1M</b><i><img src=\'/skin/new2018/images/s2.gif\'></i></a></li><li><a target=\'_blank\'href=\'/down/74677.html\'><p><em><img src=\'https://pic.qqtn.com/file/2013/2015-5/20155617207.png\'></em></p><strong>轩辕世界安装包20000002 QQ游戏大厅版</strong><b>05-06/8.7M</b><i><img src=\'/skin/new2018/images/s2.gif\'></i></a></li><li><a target=\'_blank\'href=\'/azsoft/101753.html\'><p><em><img src=\'https://pic.qqtn.com/up/2016-1/2016112145142.png\'></em></p><strong>腾讯轩辕助手app下载v0.7.0.1231安卓版</strong><b>01-12/11.8M</b><i><img src=\'/skin/new2018/images/s2.gif\'></i></a></li><li><a target=\'_blank\'href=\'/azgame/280151.html\'><p><em><img src=\'https://pic.qqtn.com/up/2017-11/201711891531141.png\'></em></p><strong>轩辕世界手游官方版下载v1.0.0安卓版</strong><b>11-08/107.7M</b><i><img src=\'/skin/new2018/images/s2.gif\'></i></a></li></ul></div><div class=\'m-bottom-list\'><div class=\'u-top-box\'><a class=\'u-top-img\'target=\'_blank\'href=\'/qqkey/yxdtxz/\'><img src=\'https://pic.qqtn.com/up/2017-10/201710181650401115.jpg\'></a><h4><a href=\'/qqkey/yxdtxz/\'target=\'_blank\'>游戏大厅下载</a></h4><p>游戏大厅与网络游戏相比更具多样性，不同于网络游戏的单一；与单机游戏相比，更具有交流性，不像单机游戏那样缺乏氛围。而且游戏大厅里的游戏以小游戏居多，运行起来也不占内存，不要漫长等待，随进随玩。所谓独乐乐</p></div><ul><li><a target=\'_blank\'href=\'/azsoft/55839.html\'><p><em><img src=\'https://pic.qqtn.com/up/2018-9/20189191526218995.png\'></em></p><strong>4399游戏盒安卓版v4.7.0.33最新版</strong><b>01-31/21.5M</b><i><img src=\'/skin/new2018/images/s5.gif\'></i></a></li><li><a target=\'_blank\'href=\'/down/29403.html\'><p><em><img src=\'https://pic.qqtn.com/up/2017-2/20172241344326092.png\'></em></p><strong>jj斗地主官方下载0.7.2.11最新版</strong><b>02-24/241KB</b><i><img src=\'/skin/new2018/images/s5.gif\'></i></a></li><li><a target=\'_blank\'href=\'/azsoft/34746.html\'><p><em><img src=\'https://pic.qqtn.com/up/2018-9/201891814421944.png\'></em></p><strong>QQ游戏大厅手机版v6.8.19安卓版</strong><b>10-29/32.6M</b><i><img src=\'/skin/new2018/images/s5.gif\'></i></a></li><li><a target=\'_blank\'href=\'/down/56317.html\'><p><em><img src=\'https://pic.qqtn.com/up/2018-4/2018424850316546.png\'></em></p><strong>多玩盒子游戏大厅官方下载V5.0.1.45最新版</strong><b>04-24/9M</b><i><img src=\'/skin/new2018/images/s5.gif\'></i></a></li><li><a target=\'_blank\'href=\'/down/49244.html\'><p><em><img src=\'https://pic.qqtn.com/up/2018-8/2018080710172761732.png\'></em></p><strong>360游戏大厅v3.8.7.1001最新版</strong><b>08-07/15.7M</b><i><img src=\'/skin/new2018/images/s5.gif\'></i></a></li><li><a target=\'_blank\'href=\'/down/154247.html\'><p><em><img src=\'https://pic.qqtn.com/up/2016-11/201611221516184114.png\'></em></p><strong>YY游戏大厅官方下载2017v4.0.0.14桌面版</strong><b>11-22/9M</b><i><img src=\'/skin/new2018/images/s5.gif\'></i></a></li></ul></div></div></div><!--猜你喜欢结束--><div class=\'g-down-box m-margin15 g-main-bg clearfix\'id=\'down-mian\'><div class=\'g-left-title\'><h4 class=\'m-tith4\'><i></i>下载地址</h4><div class=\'m-title-dome\'><ul><li class=\'m-hover\'>PC版<i></i></li><li>Android版<i></i></li><li>iphone版<i></i></li></ul></div></div><div class=\'m-down-content\'><div class=\'u-down-list f-fl\'><div class=\'u-link-list one\'><h4>QQ游戏大厅2019官方下载正式版v5.16.56082最新版</h4><ul><h3 style=\'margin:5px 0 -5px 0; font-size:12px; background: none; background:none;color:#333\'class=\'m-down-1\'>需优先下载高速下载器：</h3><li class=\'address_like u-gs-btn\'><a href=\'http://qqtn.dun.gsxzq.com/download/QQ游戏大厅2019官方下载正式版v5._32@27772.exe\'>电信高速下载</a></li><li class=\'address_like u-gs-btn\'><a href=\'http://qqtn.dun.gsxzq.com/download/QQ游戏大厅2019官方下载正式版v5._32@27772.exe\'>电信高速下载</a></li><li class=\'address_like u-gs-btn\'><a href=\'http://qqtn.dun.gsxzq.com/download/QQ游戏大厅2019官方下载正式版v5._32@27772.exe\'>联通高速下载</a></li><li class=\'address_like u-gs-btn\'><a href=\'http://qqtn.dun.gsxzq.com/download/QQ游戏大厅2019官方下载正式版v5._32@27772.exe\'>联通高速下载</a></li><h3 style=\'margin:10px 0 -5px 0 ; font-size:12px; background: none; background:none;color:#333\'class=\'m-down-2\'>普通下载地址：</h3><li class=\'address_like f-other-url\'><a href=\'http://dx10.198174.com/qqyx516560820.zip\'target=\'_blank\'onclick=\'softCount(27772,431927)\'>电脑本地下载</a></li><li class=\'address_like f-other-url\'><a href=\'http://dx10.198174.com/qqyx516560820.zip\'target=\'_blank\'onclick=\'softCount(27772,431927)\'>电脑本地下载</a></li><li class=\'address_like f-other-url\'><a href=\'http://dx10.198174.com/qqyx516560820.zip\'target=\'_blank\'onclick=\'softCount(27772,431927)\'>南方电信下载</a></li><li class=\'address_like f-other-url\'><a href=\'http://dx10.198174.com/qqyx516560820.zip\'target=\'_blank\'onclick=\'softCount(27772,431927)\'>北方联通下载</a></li><li class=\'address_like f-other-url\'><a href=\'http://dx10.198174.com/qqyx516560820.zip\'target=\'_blank\'onclick=\'softCount(27772,431927)\'>湖北电信下载</a></li><li class=\'address_like f-other-url\'><a href=\'http://dx10.198174.com/qqyx516560820.zip\'target=\'_blank\'onclick=\'softCount(27772,431927)\'>江苏电信下载</a></li><li class=\'address_like f-other-url\'><a href=\'http://dx10.198174.com/qqyx516560820.zip\'target=\'_blank\'onclick=\'softCount(27772,431927)\'>广东电信下载</a></li><li class=\'address_like f-other-url\'><a href=\'http://dx10.198174.com/qqyx516560820.zip\'target=\'_blank\'onclick=\'softCount(27772,431927)\'>浙江电信下载</a></li></ul></div><div class=\'u-link-list two\'style=\'display: none;\'><div class=\'u-first-top\'><a href=\'/azsoft/34746.html\'target=\'_blank\'><i><img src=\'https://pic.qqtn.com/up/2018-9/201891814421944.png\'></i><p>QQ游戏大厅手机版</p><span>点击下载</span></a></div><ul><li class=\'address_like f-other-url\'><a href=\'http://dx8.198174.com/qqgame6819.apk\'target=\'_blank\'onclick=\'softCount(27772,36571)\'>电脑本地下载</a></li><li class=\'address_like f-other-url\'><a href=\'http://dx8.198174.com/qqgame6819.apk\'target=\'_blank\'onclick=\'softCount(27772,36571)\'>电脑本地下载</a></li><li class=\'address_like f-other-url\'><a href=\'http://dx8.198174.com/qqgame6819.apk\'target=\'_blank\'onclick=\'softCount(27772,36571)\'>南方电信下载</a></li><li class=\'address_like f-other-url\'><a href=\'http://dx8.198174.com/qqgame6819.apk\'target=\'_blank\'onclick=\'softCount(27772,36571)\'>北方联通下载</a></li><li class=\'address_like f-other-url\'><a href=\'http://dx8.198174.com/qqgame6819.apk\'target=\'_blank\'onclick=\'softCount(27772,36571)\'>湖北电信下载</a></li><li class=\'address_like f-other-url\'><a href=\'http://dx8.198174.com/qqgame6819.apk\'target=\'_blank\'onclick=\'softCount(27772,36571)\'>江苏电信下载</a></li><li class=\'address_like f-other-url\'><a href=\'http://dx8.198174.com/qqgame6819.apk\'target=\'_blank\'onclick=\'softCount(27772,36571)\'>广东电信下载</a></li><li class=\'address_like f-other-url\'><a href=\'http://dx8.198174.com/qqgame6819.apk\'target=\'_blank\'onclick=\'softCount(27772,36571)\'>浙江电信下载</a></li></ul></div><div class=\'u-link-list\'style=\'display: none;\'><div class=\'u-first-top\'><a href=\'/iossoft/34043.html\'target=\'_blank\'><i><img src=\'https://pic.qqtn.com/up/2017-2/2017224944301660.jpg\'></i><p>手机QQ游戏大厅iPhone版下载</p><span>点击下载</span></a></div><p class=\'pan_0\'><a href=\'https://itunes.apple.com/cn/app/id443908613?mt=8\'target=\'_blank\'></a></p><ul><li><a href=\'https://itunes.apple.com/cn/app/id443908613?mt=8\'target=\'_blank\'class=\'address_like\'>直接下载</a></li><li><a href=\'https://itunes.apple.com/cn/app/id443908613?mt=8\'target=\'_blank\'class=\'address_like\'>直接下载</a></li><li><a href=\'https://itunes.apple.com/cn/app/id443908613?mt=8\'target=\'_blank\'class=\'address_like\'>直接下载</a></li><li><a href=\'https://itunes.apple.com/cn/app/id443908613?mt=8\'target=\'_blank\'class=\'address_like\'>直接下载</a></li></ul></div></div></div><div id=\'szdz\'></div></div><div class=\'g-tltj m-margin15 g-main-bg clearfix f-jump-place\'><h4 class=\'m-tith4\'><i></i>同类推荐</h4><ul><li><a target=\'_blank\'href=\'/down/92572.html\'class=\'item-title\'>魔兽争霸官方对战平台下载v1.7.88最新版</a><div class=\'clearfix\'><a href=\'/down/92572.html\'target=\'_blank\'><img class=\'item-img\'src=\'https://pic.qqtn.com/up/2015-10/2015102315133.png\'></a><div class=\'item-info\'><p>星级评价：<img src=\'/skin/new2018/images/s5.gif\'></p><p>下载大小：118.1M</p><a href=\'/down/92572.html\'target=\'_blank\'class=\'btn-down\'>立即下载</a></div></div></li><li><a target=\'_blank\'href=\'/down/46186.html\'class=\'item-title\'>游侠对战平台v6.24官方版</a><div class=\'clearfix\'><a href=\'/down/46186.html\'target=\'_blank\'><img class=\'item-img\'src=\'https://pic.qqtn.com/up/2016-8/201685154435496.png\'></a><div class=\'item-info\'><p>星级评价：<img src=\'/skin/new2018/images/s5.gif\'></p><p>下载大小：88.7M</p><a href=\'/down/46186.html\'target=\'_blank\'class=\'btn-down\'>立即下载</a></div></div></li><li><a target=\'_blank\'href=\'/down/78546.html\'class=\'item-title\'>浩方对战平台官方下载2019v7.5.1.9正式版</a><div class=\'clearfix\'><a href=\'/down/78546.html\'target=\'_blank\'><img class=\'item-img\'src=\'https://pic.qqtn.com/up/2017-11/201711221717443772.png\'></a><div class=\'item-info\'><p>星级评价：<img src=\'/skin/new2018/images/s5.gif\'></p><p>下载大小：230.7M</p><a href=\'/down/78546.html\'target=\'_blank\'class=\'btn-down\'>立即下载</a></div></div></li><li><a target=\'_blank\'href=\'/down/34598.html\'class=\'item-title\'>11对战平台官方下载v2.0.22.77安装版</a><div class=\'clearfix\'><a href=\'/down/34598.html\'target=\'_blank\'><img class=\'item-img\'src=\'https://pic.qqtn.com/up/2018-12/20181231943498645.png\'></a><div class=\'item-info\'><p>星级评价：<img src=\'/skin/new2018/images/s5.gif\'></p><p>下载大小：191.6M</p><a href=\'/down/34598.html\'target=\'_blank\'class=\'btn-down\'>立即下载</a></div></div></li><li><a target=\'_blank\'href=\'/down/241353.html\'class=\'item-title\'>腾讯wegame平台v3.18.4.5627最新版</a><div class=\'clearfix\'><a href=\'/down/241353.html\'target=\'_blank\'><img class=\'item-img\'src=\'https://pic.qqtn.com/up/2018-10/2018101008340378642.png\'></a><div class=\'item-info\'><p>星级评价：<img src=\'/skin/new2018/images/s5.gif\'></p><p>下载大小：3.8M</p><a href=\'/down/241353.html\'target=\'_blank\'class=\'btn-down\'>立即下载</a></div></div></li><li><a target=\'_blank\'href=\'/down/49244.html\'class=\'item-title\'>360游戏大厅v3.8.7.1001最新版</a><div class=\'clearfix\'><a href=\'/down/49244.html\'target=\'_blank\'><img class=\'item-img\'src=\'https://pic.qqtn.com/up/2018-8/2018080710172761732.png\'></a><div class=\'item-info\'><p>星级评价：<img src=\'/skin/new2018/images/s5.gif\'></p><p>下载大小：15.7M</p><a href=\'/down/49244.html\'target=\'_blank\'class=\'btn-down\'>立即下载</a></div></div></li></ul></div><!--同类推荐结束--><div class=\'g-article m-margin15 g-main-bg clearfix f-jump-place\'><h4 class=\'m-tith4\'><i></i>相关文章</h4><ul><li><i></i><a target=\'_blank\'href=\'/article/article_110629_1.html\'>QQ游戏大厅签到送蓝钻活动连续签到免费领礼包</a></li><li><i></i><a target=\'_blank\'href=\'/article/article_94794_1.html\'>炫舞时代10.27-11.2 QQ游戏大厅活动介绍</a></li><li><i></i><a target=\'_blank\'href=\'/article/article_91689_1.html\'>炫舞时代彩虹系列非卖上线QQ游戏大厅9.30限时发售</a></li><li><i></i><a target=\'_blank\'href=\'/article/article_75550_1.html\'>傲世西游QQ游戏大厅浏览器手机管家礼包总览</a></li><li><i></i><a target=\'_blank\'href=\'/article/article_69184_1.html\'>七雄争霸登录QQ游戏大厅天天有礼活动</a></li><li><i></i><a target=\'_blank\'href=\'/article/article_57342_1.html\'>七雄争霸登陆QQ游戏大厅领取七星砂</a></li><li><i></i><a target=\'_blank\'href=\'/article/article_56476_1.html\'>七雄争霸登陆QQ游戏大厅三重福利来袭</a></li><li><i></i><a target=\'_blank\'href=\'/article/article_56417_1.html\'>七雄争霸联手QQ游戏大厅独家礼包发售</a></li></ul></div><!--相关文章结束-->")
	pcdengjitxt += ("<div class=\'m-margin15 g-main-bg clearfix\'id=\'goto-pl\'><h4 class=\'m-tith4\'><i></i>用户评论</h4><div id=\'comment_list\'><div id=\'s_comment\'><form action=\'\'id=\'zt_ly\'onKeyDown=\'submitForm()\'><textarea name=\'ly_content\'onkeyup=\'countLyNum(this,\'ly_num\')\'id=\'ly_content\'placeholder=\'写下你想说的话\'></textarea><div class=\'comment_btn\'><input name=\'ly_id\'type=\'hidden\'id=\'ly_id\'value=\'27772\'/><input name=\'CommentTpye\'type=\'hidden\'id=\'ztid\'value=\'0\'/><input type=\'button\'value=\' 发表评论 \'onclick=\'submitComment()\'/><span>请自觉遵守互联网相关政策法规，评论内容只代表网友观点，与本站立场无关！</span></div></form></div><div id=\'comment_0\'><h2><span>热门评论</span></h2><dl><dl><dt><span><i>第634楼</i><b>新疆教育网直通车网友客人</b></span><em>发表于:2012/5/5 21:45:00</em></dt><dd>2012年很好<p id=\'283397\'><a href=\'javascript:\'>支持<em>(</em><span>51</span><em>)</em></a><a href=\'javascript:\'pid=\'283397\'>盖楼(回复)</a></p></dd></dl><dl><dt><span><i>第631楼</i><b>河北电信网友客人</b></span><em>发表于:2012/4/24 4:04:00</em></dt><dd><blockquote><h4><cite>引用(陕西西安西安交通大学第二附属医院客人</cite>2012-4-8 9:00:00</h4>真是非常好啊！</blockquote><p id=\'278473\'><a href=\'javascript:\'>支持<em>(</em><span>36</span><em>)</em></a><a href=\'javascript:\'pid=\'278473\'>盖楼(回复)</a></p></dd></dl><dl><dt><span><i>第628楼</i><b>湖北武汉电信网友客人</b></span><em>发表于:2012/4/23 19:11:00</em></dt><dd>qq游戏大厅2012扩容好友分组，可一个好友同时出现在多个分组，这个功能到底怎么用呀？<p id=\'278361\'><a href=\'javascript:\'>支持<em>(</em><span>41</span><em>)</em></a><a href=\'javascript:\'pid=\'278361\'>盖楼(回复)</a></p></dd></dl><dl><dt><span><i>第627楼</i><b>湖北武汉电信网友客人</b></span><em>发表于:2012/4/23 19:09:00</em></dt><dd>qq游戏大厅里的游戏我喜欢的有好多，看来是离不开qq游戏大厅了，只是有时候玩久了，眼睛很不舒服。<img src=\'https://pic.qqtn.com/skin/fac/2.gif\'><p id=\'278359\'><a href=\'javascript:\'>支持<em>(</em><span>26</span><em>)</em></a><a href=\'javascript:\'pid=\'278359\'>盖楼(回复)</a></p></dd></dl><dl><dt><span><i>第626楼</i><b>湖北武汉电信网友客人</b></span><em>发表于:2012/4/23 19:09:00</em></dt><dd>qq游戏大厅2012功能比qq游戏大厅2011更强大了么？稳定性怎么样？下载了朋友给个经验。。。<p id=\'278358\'><a href=\'javascript:\'>支持<em>(</em><span>20</span><em>)</em></a><a href=\'javascript:\'pid=\'278358\'>盖楼(回复)</a></p></dd></dl></dl></div><div id=\'comment_1\'><h2><span>最新评论</span></h2><dl><dt><span><i>第661楼</i><b>美国CZ88.NET网友客人</b></span><em>发表于:2018/5/7 9:47:00</em></dt><dd>在干嘛呢？<p id=\'1086445\'><a href=\'javascript:\'>支持<em>(</em><span>0</span><em>)</em></a><a href=\'javascript:\'pid=\'1086445\'>盖楼(回复)</a></p></dd><dt><span><i>第660楼</i><b>美国CZ88.NET网友客人</b></span><em>发表于:2018/5/7 9:47:00</em></dt><dd><blockquote>bucuo<img src=\'https://pic.qqtn.com/skin/fac/1.gif\'><img src=\'https://pic.qqtn.com/skin/fac/1.gif\'><img src=\'https://pic.qqtn.com/skin/fac/1.gif\'><h4><cite>福建联通3G统一出口客人</cite>2015/3/1 21:02:00</h4></blockquote><p id=\'1086444\'><a href=\'javascript:\'>支持<em>(</em><span>0</span><em>)</em></a><a href=\'javascript:\'pid=\'1086444\'>盖楼(回复)</a></p></dd><dt><span><i>第659楼</i><b>本机地址CZ88.NET网友客人</b></span><em>发表于:2015/12/12 19:44:00</em></dt><dd>非常不错<img src=\'https://pic.qqtn.com/skin/fac/6.gif\'><img src=\'https://pic.qqtn.com/skin/fac/6.gif\'><img src=\'https://pic.qqtn.com/skin/fac/6.gif\'><img src=\'https://pic.qqtn.com/skin/fac/6.gif\'><p id=\'786840\'><a href=\'javascript:\'>支持<em>(</em><span>5</span><em>)</em></a><a href=\'javascript:\'pid=\'786840\'>盖楼(回复)</a></p></dd><dt><span><i>第658楼</i><b>湖北电信网友客人</b></span><em>发表于:2015/6/13 22:24:00</em></dt><dd><img src=\'https://pic.qqtn.com/skin/fac/8.gif\'><img src=\'https://pic.qqtn.com/skin/fac/6.gif\'><img src=\'https://pic.qqtn.com/skin/fac/6.gif\'>好<p id=\'711366\'><a href=\'javascript:\'>支持<em>(</em><span>4</span><em>)</em></a><a href=\'javascript:\'pid=\'711366\'>盖楼(回复)</a></p></dd><dt><span><i>第657楼</i><b>中国CZ88.NET网友客人</b></span><em>发表于:2015/5/9 14:38:00</em></dt><dd><img src=\'https://pic.qqtn.com/skin/fac/6.gif\'><img src=\'https://pic.qqtn.com/skin/fac/1.gif\'><img src=\'https://pic.qqtn.com/skin/fac/1.gif\'><img src=\'https://pic.qqtn.com/skin/fac/1.gif\'><img src=\'https://pic.qqtn.com/skin/fac/1.gif\'><img src=\'https://pic.qqtn.com/skin/fac/1.gif\'><img src=\'https://pic.qqtn.com/skin/fac/1.gif\'><img src=\'https://pic.qqtn.com/skin/fac/1.gif\'><img src=\'https://pic.qqtn.com/skin/fac/1.gif\'>海尔<p id=\'696716\'><a href=\'javascript:\'>支持<em>(</em><span>4</span><em>)</em></a><a href=\'javascript:\'pid=\'696716\'>盖楼(回复)</a></p></dd><dt><span><i>第656楼</i><b>湖北黄冈联通网友客人</b></span><em>发表于:2015/2/13 8:28:00</em></dt><dd><img src=\'https://pic.qqtn.com/skin/fac/8.gif\'><img src=\'https://pic.qqtn.com/skin/fac/1.gif\'><img src=\'https://pic.qqtn.com/skin/fac/1.gif\'><img src=\'https://pic.qqtn.com/skin/fac/1.gif\'><img src=\'https://pic.qqtn.com/skin/fac/1.gif\'><img src=\'https://pic.qqtn.com/skin/fac/1.gif\'><img src=\'https://pic.qqtn.com/skin/fac/1.gif\'><img src=\'https://pic.qqtn.com/skin/fac/1.gif\'><img src=\'https://pic.qqtn.com/skin/fac/1.gif\'><img src=\'https://pic.qqtn.com/skin/fac/1.gif\'><img src=\'https://pic.qqtn.com/skin/fac/1.gif\'><img src=\'https://pic.qqtn.com/skin/fac/1.gif\'>&#22826;&#22909;&#20102;<p id=\'667062\'><a href=\'javascript:\'>支持<em>(</em><span>3</span><em>)</em></a><a href=\'javascript:\'pid=\'667062\'>盖楼(回复)</a></p></dd><dt><span><i>第655楼</i><b>福建联通3G统一出口网友客人</b></span><em>发表于:2015/3/1 21:02:00</em></dt><dd>bucuo<img src=\'https://pic.qqtn.com/skin/fac/1.gif\'><img src=\'https://pic.qqtn.com/skin/fac/1.gif\'><img src=\'https://pic.qqtn.com/skin/fac/1.gif\'><p id=\'674124\'><a href=\'javascript:\'>支持<em>(</em><span>4</span><em>)</em></a><a href=\'javascript:\'pid=\'674124\'>盖楼(回复)</a></p></dd><dt><span><i>第654楼</i><b>河南新乡河南科技学院网友客人</b></span><em>发表于:2015/2/22 8:54:00</em></dt><dd><img src=\'https://pic.qqtn.com/skin/fac/2.gif\'><img src=\'https://pic.qqtn.com/skin/fac/2.gif\'><img src=\'https://pic.qqtn.com/skin/fac/2.gif\'><img src=\'https://pic.qqtn.com/skin/fac/2.gif\'><img src=\'https://pic.qqtn.com/skin/fac/2.gif\'><img src=\'https://pic.qqtn.com/skin/fac/2.gif\'><img src=\'https://pic.qqtn.com/skin/fac/2.gif\'><img src=\'https://pic.qqtn.com/skin/fac/2.gif\'><img src=\'https://pic.qqtn.com/skin/fac/2.gif\'><img src=\'https://pic.qqtn.com/skin/fac/1.gif\'><img src=\'https://pic.qqtn.com/skin/fac/1.gif\'><img src=\'https://pic.qqtn.com/skin/fac/1.gif\'>&#21704;&#21704;<p id=\'670633\'><a href=\'javascript:\'>支持<em>(</em><span>2</span><em>)</em></a><a href=\'javascript:\'pid=\'670633\'>盖楼(回复)</a></p></dd><dt><span><i>第653楼</i><b>美国CZ88.NET网友客人</b></span><em>发表于:2015/2/5 20:05:00</em></dt><dd>QQ大厅怎样大载英魂之刃怎样下载<p id=\'664127\'><a href=\'javascript:\'>支持<em>(</em><span>4</span><em>)</em></a><a href=\'javascript:\'pid=\'664127\'>盖楼(回复)</a></p></dd><dt><span><i>第652楼</i><b>黑龙江大兴安岭高级中学网友客人</b></span><em>发表于:2015/1/23 18:55:00</em></dt><dd>&#24456;&#22909;&#65292;&#31069;&#24895;&#22823;&#23478;&#26032;&#24180;&#24555;&#20048;<p id=\'660013\'><a href=\'javascript:\'>支持<em>(</em><span>3</span><em>)</em></a><a href=\'javascript:\'pid=\'660013\'>盖楼(回复)</a></p></dd></dl></div><h3 class=\'lookpl\'><a href=\'/comment_27772_0.html\'>已有<i>661</i>人参与，点击查看更多精彩评论</a></h3></div></div><!--用户评论结束--></div><div class=\'g-rj-right f-fr\'><div class=\'g-bl-down g-main-bg clearfix\'><div class=\'g-title\'><h4 class=\'u-right-title\'><strong>本类排行</strong></h4><div class=\'f-month\'><ul><li class=\'m-hover\'>周排行</li><li>月排行</li></ul></div></div><div class=\'g-bl-box\'><div class=\'m-bl-list\'><ul><li><a target=\'_blank\'href=\'/down/27772.html\'><i>1</i><img src=\'https://pic.qqtn.com/up/2019-2/20192211321485112.png\'class=\'u-rank-img\'><strong>QQ游戏大厅2019官方下载正式版v5.16.56082最新版</strong><em>游戏平台/54.7M</em><img src=\'/skin/new2018/images/s5.gif\'class=\'u-rank-star\'></a></li><li><a target=\'_blank\'href=\'/down/154708.html\'><i>2</i><img src=\'https://pic.qqtn.com/up/2016-11/201611241405168175413.png\'class=\'u-rank-img\'><strong>游族网页游戏平台下载1.0官方版</strong><em>游戏平台/2KB</em><img src=\'/skin/new2018/images/s2.gif\'class=\'u-rank-star\'></a></li><li><a target=\'_blank\'href=\'/down/241353.html\'><i>3</i><img src=\'https://pic.qqtn.com/up/2018-10/2018101008340378642.png\'class=\'u-rank-img\'><strong>腾讯wegame平台v3.18.4.5627最新版</strong><em>游戏平台/3.8M</em><img src=\'/skin/new2018/images/s5.gif\'class=\'u-rank-star\'></a></li><li><a target=\'_blank\'href=\'/down/142636.html\'><i>4</i><img src=\'https://pic.qqtn.com/up/2016-9/20169281652227379.png\'class=\'u-rank-img\'><strong>850棋牌游戏大厅20161.01官方版</strong><em>游戏平台/8.8M</em><img src=\'/skin/new2018/images/s2.gif\'class=\'u-rank-star\'></a></li><li><a target=\'_blank\'href=\'/down/93828.html\'><i>5</i><img src=\'https://pic.qqtn.com/up/2015-11/20151131725.png\'class=\'u-rank-img\'><strong>赖子游戏中心0.5.3官方版</strong><em>游戏平台/35.1M</em><img src=\'/skin/new2018/images/s2.gif\'class=\'u-rank-star\'></a></li><li><a target=\'_blank\'href=\'/down/187218.html\'><i>6</i><img src=\'https://pic.qqtn.com/up/2017-4/201704050914486049558.png\'class=\'u-rank-img\'><strong>518电玩城棋牌电脑版v1.0.26 pc最新版</strong><em>游戏平台/32.3M</em><img src=\'/skin/new2018/images/s2.gif\'class=\'u-rank-star\'></a></li><li><a target=\'_blank\'href=\'/down/113981.html\'><i>7</i><img src=\'https://pic.qqtn.com/up/2016-5/2016561138373458.png\'class=\'u-rank-img\'><strong>世爵娱乐平台客户端下载2.0.0.98安装版</strong><em>游戏平台/287KB</em><img src=\'/skin/new2018/images/s2.gif\'class=\'u-rank-star\'></a></li><li><a target=\'_blank\'href=\'/down/131897.html\'><i>8</i><img src=\'https://pic.qqtn.com/up/2016-8/2016081109245436364.jpg\'class=\'u-rank-img\'><strong>吉祥棋牌游戏大厅下载2016最新版</strong><em>游戏平台/7.2M</em><img src=\'/skin/new2018/images/s2.gif\'class=\'u-rank-star\'></a></li><li><a target=\'_blank\'href=\'/down/151104.html\'><i>9</i><img src=\'https://pic.qqtn.com/up/2016-11/20161171628433446.png\'class=\'u-rank-img\'><strong>华为游戏中心电脑版下载v8.0.3.300官方版</strong><em>游戏平台/9.9M</em><img src=\'/skin/new2018/images/s2.gif\'class=\'u-rank-star\'></a></li><li><a target=\'_blank\'href=\'/down/376802.html\'><i>10</i><img src=\'https://pic.qqtn.com/up/2018-11/20181111021578409.png\'class=\'u-rank-img\'><strong>Steam游戏助手v1.0.0.15官方版</strong><em>游戏平台/4.9M</em><img src=\'/skin/new2018/images/s4.gif\'class=\'u-rank-star\'></a></li></ul></div><div class=\'m-bl-list\'><ul><li><a target=\'_blank\'href=\'/down/241353.html\'><i>1</i><img src=\'https://pic.qqtn.com/up/2018-10/2018101008340378642.png\'class=\'u-rank-img\'><strong>腾讯wegame平台v3.18.4.5627最新版</strong><em>游戏平台/3.8M</em><img src=\'/skin/new2018/images/s5.gif\'class=\'u-rank-star\'></a></li><li><a target=\'_blank\'href=\'/down/142636.html\'><i>2</i><img src=\'https://pic.qqtn.com/up/2016-9/20169281652227379.png\'class=\'u-rank-img\'><strong>850棋牌游戏大厅20161.01官方版</strong><em>游戏平台/8.8M</em><img src=\'/skin/new2018/images/s2.gif\'class=\'u-rank-star\'></a></li><li><a target=\'_blank\'href=\'/down/27772.html\'><i>3</i><img src=\'https://pic.qqtn.com/up/2019-2/20192211321485112.png\'class=\'u-rank-img\'><strong>QQ游戏大厅2019官方下载正式版v5.16.56082最新版</strong><em>游戏平台/54.7M</em><img src=\'/skin/new2018/images/s5.gif\'class=\'u-rank-star\'></a></li><li><a target=\'_blank\'href=\'/down/187218.html\'><i>4</i><img src=\'https://pic.qqtn.com/up/2017-4/201704050914486049558.png\'class=\'u-rank-img\'><strong>518电玩城棋牌电脑版v1.0.26 pc最新版</strong><em>游戏平台/32.3M</em><img src=\'/skin/new2018/images/s2.gif\'class=\'u-rank-star\'></a></li><li><a target=\'_blank\'href=\'/down/201300.html\'><i>5</i><img src=\'https://pic.qqtn.com/up/2017-5/201705091023069798781.png\'class=\'u-rank-img\'><strong>大富豪电玩城电脑版v1.1.0稳定版</strong><em>游戏平台/30M</em><img src=\'/skin/new2018/images/s1.gif\'class=\'u-rank-star\'></a></li><li><a target=\'_blank\'href=\'/down/256489.html\'><i>6</i><img src=\'https://www.qqtn.com/up/2018-10/2018101008454360109.png?0.7610353992264778?0.27624735069827033\'class=\'u-rank-img\'><strong>Tencent WeGamev3.18.4.5627官方版</strong><em>游戏平台/3.8M</em><img src=\'/skin/new2018/images/s3.gif\'class=\'u-rank-star\'></a></li><li><a target=\'_blank\'href=\'/down/154708.html\'><i>7</i><img src=\'https://pic.qqtn.com/up/2016-11/201611241405168175413.png\'class=\'u-rank-img\'><strong>游族网页游戏平台下载1.0官方版</strong><em>游戏平台/2KB</em><img src=\'/skin/new2018/images/s2.gif\'class=\'u-rank-star\'></a></li><li><a target=\'_blank\'href=\'/down/131897.html\'><i>8</i><img src=\'https://pic.qqtn.com/up/2016-8/2016081109245436364.jpg\'class=\'u-rank-img\'><strong>吉祥棋牌游戏大厅下载2016最新版</strong><em>游戏平台/7.2M</em><img src=\'/skin/new2018/images/s2.gif\'class=\'u-rank-star\'></a></li><li><a target=\'_blank\'href=\'/down/151104.html\'><i>9</i><img src=\'https://pic.qqtn.com/up/2016-11/20161171628433446.png\'class=\'u-rank-img\'><strong>华为游戏中心电脑版下载v8.0.3.300官方版</strong><em>游戏平台/9.9M</em><img src=\'/skin/new2018/images/s2.gif\'class=\'u-rank-star\'></a></li><li><a target=\'_blank\'href=\'/down/29403.html\'><i>10</i><img src=\'https://pic.qqtn.com/up/2017-2/20172241344326092.png\'class=\'u-rank-img\'><strong>jj斗地主官方下载0.7.2.11最新版</strong><em>游戏平台/241KB</em><img src=\'/skin/new2018/images/s5.gif\'class=\'u-rank-star\'></a></li></ul></div></div></div><!--本类下载排行结束--><div class=\'g-jp-box g-main-bg m-margin15 clearfix\'><h4 class=\'u-right-title\'><strong>本类推荐</strong></h4><ul><li><a href=\'/down/46186.html\'target=\'_blank\'><img src=\'https://pic.qqtn.com/up/2016-8/201685154435496.png\'><strong>游侠对战平台v6.24官方版</strong><b>中文/88.7M</b></a></li><li><a href=\'/down/241353.html\'target=\'_blank\'><img src=\'https://pic.qqtn.com/up/2018-10/2018101008340378642.png\'><strong>腾讯wegame平台v3.18.4.5627最新版</strong><b>中文/3.8M</b></a></li><li><a href=\'/down/49244.html\'target=\'_blank\'><img src=\'https://pic.qqtn.com/up/2018-8/2018080710172761732.png\'><strong>360游戏大厅v3.8.7.1001最新版</strong><b>中文/15.7M</b></a></li><li><a href=\'/down/66105.html\'target=\'_blank\'><img src=\'https://pic.qqtn.com/file/2013/2015-6/2015630143138.png\'><strong>37游戏盒子下载v4.0.0.5安装版</strong><b>中文/3.8M</b></a></li><li><a href=\'/down/94230.html\'target=\'_blank\'><img src=\'https://pic.qqtn.com/up/2018-5/2018514155422670.png\'><strong>完美游戏平台官方下载v2.7.9.0511最新版</strong><b>中文/62.8M</b></a></li><li><a href=\'/down/56317.html\'target=\'_blank\'><img src=\'https://pic.qqtn.com/up/2018-4/2018424850316546.png\'><strong>多玩盒子游戏大厅官方下载V5.0.1.45最新版</strong><b>中文/9M</b></a></li></ul></div><!--本类精品软件结束-->")
	pcdengjitxt += ("<div class=\'g-hot-rj g-main-bg m-margin15 clearfix\'><h4 class=\'u-right-title\'><strong>热门软件</strong></h4><div class=\'g-hot-bottom\'><div class=\'g-hot-img\'><a href=\'/down/92572.html\'target=\'_blank\'><img src=\'https://pic.qqtn.com/up/2015-10/2015102315133.png\'/><strong>魔兽争霸官方对战平台下载v1.7.88最新版</strong><b>游戏平台</b></a><a href=\'/gamefz/157406.html\'target=\'_blank\'><img src=\'https://pic.qqtn.com/up/2018-8/2018082215561217387.png\'/><strong>GG修改器官方汉化版下载v73.0安卓中文版</strong><b>手游辅助</b></a><a href=\'/down/78546.html\'target=\'_blank\'><img src=\'https://pic.qqtn.com/up/2017-11/201711221717443772.png\'/><strong>浩方对战平台官方下载2019v7.5.1.9正式版</strong><b>游戏平台</b></a><a href=\'/down/34598.html\'target=\'_blank\'><img src=\'https://pic.qqtn.com/up/2018-12/20181231943498645.png\'/><strong>11对战平台官方下载v2.0.22.77安装版</strong><b>游戏平台</b></a><a href=\'/gamefz/39799.html\'target=\'_blank\'><img src=\'https://pic.qqtn.com/up/2018-12/201812171312504602.png\'/><strong>游久dota2超级助手最新版下载v10.1.0.0官方完整版</strong><b>网游辅助</b></a><a href=\'/down/78992.html\'target=\'_blank\'><img src=\'https://pic.qqtn.com/up/2018-9/2018092817142335794.png\'/><strong>夜神安卓模拟器v6.2.3.8官方最新版</strong><b>模拟游戏</b></a><a href=\'/down/79769.html\'target=\'_blank\'><img src=\'https://pic.qqtn.com/up/2018-10/2018100909333748394.png\'/><strong>逍遥模拟器v5.6.2.3最新版</strong><b>模拟游戏</b></a><a href=\'/gamefz/34489.html\'target=\'_blank\'><img src=\'https://pic.qqtn.com/up/2018-10/2018100119180638507.png\'/><strong>多玩魔盒v8.0.3.2官方版</strong><b>网游辅助</b></a><a href=\'/xcx/369873.html\'target=\'_blank\'><img src=\'https://pic.qqtn.com/up/2018-9/20189131559156830.png\'/><strong>头像达人小程序</strong><b>微信小程序</b></a></div></div></div><!--热门软件关键词结束--><div class=\'g-hot-rj g-main-bg m-margin15 clearfix\'><h4 class=\'u-right-title\'><strong>热门标签</strong></h4><div class=\'g-hot-bottom\'><div class=\'g-hot-font\'><a href=\'/qqkey/wegame/\'target=\'_blank\'>WeGame(腾讯游戏平台)</a><a href=\'/qqkey/wzrycfm/\'target=\'_blank\'>王者荣耀重复名</a><a href=\'/qqkey/lbqdxxmnq/\'target=\'_blank\'>了不起的修仙模拟器</a><a href=\'/qqkey/beichibaoma/\'target=\'_blank\'>奔驰宝马</a><a href=\'/qqkey/sangong/\'target=\'_blank\'>三公</a><a href=\'/qqkey/erbagang/\'target=\'_blank\'>二八杠</a><a href=\'/qqkey/hdqsxgq/\'target=\'_blank\'>荒岛求生修改器</a><a href=\'/qqkey/mxgq/\'target=\'_blank\'>MrAntiFun修改器</a><a href=\'/qqkey/flyyxgq/\'target=\'_blank\'>风灵月影修改器</a><a href=\'/qqkey/bashumj/\'target=\'_blank\'>巴蜀麻将</a><a href=\'/qqkey/steampowered/\'target=\'_blank\'>Steam平台</a><a href=\'/qqkey/bhrxyx/\'target=\'_blank\'>冰火人小游戏</a><a href=\'/qqkey/yxhzphb/\'target=\'_blank\'>游戏盒子排行榜2019</a><a href=\'/qqkey/mnqphb/\'target=\'_blank\'>2019模拟器排行榜</a><a href=\'/qqkey/azmnqdnb/\'target=\'_blank\'>安卓模拟器电脑版</a><a href=\'/qqkey/tlwpj/\'target=\'_blank\'>至尊魔都</a><a href=\'/qqkey/wlyxphb/\'target=\'_blank\'>网络游戏排行榜</a><a href=\'/qqkey/fpsyxdq/\'target=\'_blank\'>fps游戏排行榜</a><a href=\'/qqkey/jjmnq/\'target=\'_blank\'>街机模拟器</a><a href=\'/qqkey/mjyxdq/\'target=\'_blank\'>麻将游戏大全</a><a href=\'/qqkey/zljgyyxdq/\'target=\'_blank\'>侏罗纪公园游戏大全</a><a href=\'/qqkey/klyxdq/\'target=\'_blank\'>恐龙游戏大全</a><a href=\'/qqkey/mxdwgdq/\'target=\'_blank\'>冒险岛外挂</a><a href=\'/qqkey/baolimotuo/\'target=\'_blank\'>暴力摩托</a><a href=\'/qqkey/kblnn/\'target=\'_blank\'>冥月之巅</a><a href=\'/qqkey/granny/\'target=\'_blank\'>捍卫斯巴达</a><a href=\'/qqkey/bzpp/\'target=\'_blank\'>笨拙攀爬</a><a href=\'/qqkey/soccerkick/\'target=\'_blank\'>Soccer Kick</a><a href=\'/qqkey/qqdzz90/\'target=\'_blank\'>球球大作战9.0</a><a href=\'/qqkey/yxncxgq/\'target=\'_blank\'>游戏内存修改器</a></div></div></div><!--热门软件关键词结束--></div></div>");

  $(hidebox).after(pcdengjitxt);    
  $(showbox).show();
}


