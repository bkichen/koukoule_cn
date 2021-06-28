//JavaScript Document
// var fiCtiy = ["武汉","北京","上海","广州","深圳","长沙","厦门","福州","苏州","孝感","成都"]
// var fiurl = ["/qqkey/wzryfz/","/down/35484.html","/gamefz/117230.html","/gamefz/158145.html","/gamefz/159388.html","/gamefz/163742.html","/game/cftsfz/","/qqkey/cyhxsyfz/","/gamefz/96925.html","/qqkey/cfqzwzszs/","/sj/200796.html","/sj/243869.html","/gamefz/116993.html","/gamefz/42881.html","/gamefz/42897.html","/gamefz/90137.html","/qqfz/35952.html","/gamefz/59137.html"]
// var dqurl =  window.location.pathname;
// jQuery.getScript("//int.dpool.sina.com.cn/iplookup/iplookup.php?format=js",function(){//判断地区
// 				province = remote_ip_info["province"];
// 				city = remote_ip_info["city"];	
// 		   		if(jQuery.inArray(city, fiCtiy) != -1 && jQuery.inArray(dqurl, fiurl) != -1){//包含以上地区		   			
// 		   			window.location.href='https://www.qqtn.com/404.html';
// 		   		}
// })
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

var Temp="";
//设置随机数字
function GetRandom(Min,Max){
        var Range = Max - Min;


        var Rand = Math.random();
        var Num = (Min + Math.round(Rand * Range));
        return Num;
}

//========公用广告代码=========
var Baidu_760_60="";
var Baidu_300_300="";
var Baidu_460_60="";
/*
pageClass 1 首页 1 | 3 下载页 | 8 专题页
*/
if (typeof(pageClass)=="undefined'")
{
	var pageClass = 7
}else{
	if(pageClass==7){
		var qmName = $(".f_inh3 span").html()

		if(qmName=="签名精选"){
			//$("#zoom p").eq(2).after('<p><a href="https://www.qqtn.com/health/" target="_blank" style="color:#f00; font-weight:bold">为了健康的过个好年，我容易吗？鱼刺卡着喉咙怎么办！<<<点击进入</a></p>')
		}
		if($(".m_ssxx").length>0){
			$(".m_ssxx").after('<div style="width:100%; height:auto;background:#fff; margin:15px 0 0; display:block; overflow:hidden; border-top:3px solid #999"><img src="/skin/new2015/images/qqtn-qr.jpg" style="width:auto; max-width:100%; height:auto; margin:20px auto;  display:block; overflow:hidden" /></div>')
		}
	}
}


//=============================
if(pageClass==1 || pageClass==3 || pageClass==2  || pageClass== 5 || pageClass== 6 || pageClass== 7 )
{

     Temp='<div><a href="http://downlaod.vstart.net/i/?cid=546"><img src="/gg/img/yx_960_90.gif" width="960" height="90" border="0"></a> </div>';
	// Temp+="<div><iframe marginwidth=0 marginheight=0 frameborder=0 bordercolor='#000000' scrolling=no src=\"/gg/html/baidu_960.html\" width=970 height=90></iframe></div>";

    if(pageClass==1)
     {
	   Temp ='<a href="http://www.cr173.com/game/" target=\'_blank\' title=\'西西游戏网\'><img src="/gg/img/cr173.gif" alt="西西游戏网" width="970" height="80" border="0" /></a>';
	 }
	 if(document.getElementById("Default_Top_760_60")!=null)
	 {
	  document.getElementById("Default_Top_760_60").innerHTML=Temp;
	 }
      Temp=('<div align="center"><a href="http://gamebox.962.net/" target=\'_blank\'><img src="/gg/img/lele.jpg" alt="单机游戏盒"  height="60" border="0" style="padding-top:5px;"/></a></div>');
   var Top_468_60=document.getElementById("TopBlann");
   if (Top_468_60!=null)
    {
     Top_468_60.innerHTML = Temp;
    }
}
   //除了首页
 if(pageClass !=1)
   {
//富媒体
//document.write("<script src=\"//pc.ctsywy.com/js/rt.js\" id=\"lts-rich-mark\" zoneid=\"1980\"  ><\/script>"); 



   

     


	  if (getCookie("isPop")!="Yes")
	   {
		 PostCookie("isPop=Yes")
	   }
  }

if (typeof(createDate)=="undefined'")
{
	var createDate = "";
}

if( pageClass==5 && createDate=="newCms"){
	//百度分享 3-20
		$(".g-cms-introd").after("<div class=\"m-contTop-ad\"><iframe src=\"/skin/know/cms_hot.html\" width=\"630\" height=\"95\" marginheight=\"0\" marginwidth=\"0\" scrolling=\"no\" frameborder=\"0\" style=\"margin-top:5px\"></iframe></div>");
		//document.write('<div class="bdsharebuttonbox" id=\"bd-share\"><strong>分享到</strong><a href="#" class="bds_qzone" data-cmd="qzone" title="分享到QQ空间"></a><a href="#" class="bds_tsina" data-cmd="tsina" title="分享到新浪微博"></a><a href="#" class="bds_tqq" data-cmd="tqq" title="分享到腾讯微博"></a><a href="#" class="bds_bdhome" data-cmd="bdhome" title="分享到百度新首页"></a><a href="#" class="bds_weixin" data-cmd="weixin" title="分享到微信"></a><a href="#" class="bds_sqq" data-cmd="sqq" title="分享到QQ好友"></a><b class=\"m-backtop\">返回顶部</b></div>');
		//window._bd_share_config={"common":{"bdSnsKey":{},"bdText":"","bdMini":"2","bdMiniList":false,"bdPic":"","bdStyle":"0","bdSize":"24"},"share":{}};with(document)0[(getElementsByTagName('head')[0]||body).appendChild(createElement('script')).src='//bdimg.share.baidu.com/static/api/js/share.js?v=89860593.js?cdnversion='+~(-new Date()/36e5)];
	}

 if( pageClass ==7 )  //文章页
	{

		  var sobj = $("#cms_right_1");
		  if (sobj.length>0)
		  {
			  Temp="<iframe marginwidth=0 marginheight=0 frameborder=0 bordercolor='#000000' scrolling=no src=\"/skin/know/all-cms7.html\" width=250 height=250></iframe>";
			  sobj.before(Temp) ;
			  Temp="<div style='style=\"margin:10px 0;\"'><iframe marginwidth=0 marginheight=0 frameborder=0 bordercolor='#000000' scrolling=no src=\"/skin/know/all-bd7.html\" width=250 height=250></iframe></div>";
			  sobj.after(Temp) ;
		  }

	



	}


 if(pageClass==3) //软件页
    {
	 var Temp="<iframe marginwidth=0 marginheight=0 frameborder=0 bordercolor='#000000' scrolling=no src='/skin/know/all-soft3.html' width=300 height=250></iframe>";
	 var url = window.location.href;
	 var re =/(qqfz|gamefz)/ig;

	 if (re.test(url))
	 {
		//Temp="<iframe marginwidth=0 marginheight=0 frameborder=0 bordercolor='#000000' scrolling=no src='http://show.qqabcd8899.cn/300_250.html?qq' width=300 height=250></iframe>";
	 }

	 var ggMain =  document.getElementById("Info_1_2_1_2");
	 if(ggMain == null ) ggMain = document.getElementById("adw300");
	 //if(ggMain != null ) ggMain.innerHTML=Temp;


	 var downObj=document.getElementById("Info_1_2_3");
	 var Info_Right = document.getElementById("Info_1_2_1_right");

	if (Info_Right!=null)
	{
		Temp="<iframe marginwidth=0 marginheight=0 frameborder=0 bordercolor='#000000' scrolling=no src='/skin/know/all-infosoft3.html' width=200 height=320></iframe>";
		Info_Right.innerHTML = Temp;
	}

	var aobj=$(".ul_Address a");
	 aobj.click(function(){address_click2("http://www.hao123.com/?tn=92210580_hao_pg");})


	var All_600  ="<iframe marginwidth=0 marginheight=0 frameborder=0 bordercolor='#000000' scrolling=no src=\"/js/html/down_foot.html\" width=660 height=60></iframe>";
	$("#szdz").after('<div style=\"clear:both;width: 100%; background:#FFF;\"> '+All_600+' </div>');
	// 诱导位结束 3-13 

	//广告在callback600中呈现


	//temp = "<div <div style=\"clear:both; text-align:center\"><iframe marginwidth=0 marginheight=0 frameborder=0 bordercolor='#000000' scrolling=no src='/gg/html/soft_top.Html' width=700 height=65></iframe></div>";
	//$("#xiangua").after(temp)

	//介绍中插入百度广告
	//var sobj = $("#show_content");
   // Temp="<div><iframe marginwidth=0 marginheight=0 frameborder=0 bordercolor='#000000' scrolling=no src=\"//www.baidu.com/ur/cun?di=contentunion10&ltu=12\" width='707' height='300'></iframe></div>";
  // sobj.after(Temp) ;



  	//安卓下载详细右侧-相关应用
  	var xglist = $(".m-xgyy ul li").length;
  	if (xglist != "undefined") {
  		if (xglist == 0) {
  			$(".m-xgyy").hide();
  		}
  	}



 }

 
if(typeof(_pageinfo) != "undefined" && typeof(_pageinfo) != "object"){	
	

	if(_pageinfo.path == "down" )
	    	{
	    		//下载页立即下载换成下载器2016-09-10去掉
	    		/*
				var downxx = $(".down_btn").length;
				if(downxx>0){
					$(".down_btn").click(function (){
						var downTitle =$("h1").text();
						 downTitle=downTitle.split(/(\s|\()/)[0];
						 downTitle = downTitle.substring(0,20);
						  downTitle=downTitle.replace(/[\s|\-|\"|\_|&]+/g,"");
						  window.location.href = 'http://url.tduou.com/down/'+downTitle+'@198_'+_pageinfo.id+'.exe';
						  $("html,body").animate({scrollTop:$('#show_button').offset().top}, 500);
				  			return false;
					});	
				};
				*/


	    	}

}