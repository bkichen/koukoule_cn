
if (typeof(pageClass) == "undefined") {
  pageClass = "0"  
};


$(function() {
	//本类下载排行
	$(".m-bl-list").each(function(){
		$(this).find("li:first").addClass("f-hover");    
	})

	$(".m-bl-list ul li").hover(function() {
		$(this).addClass("f-hover").siblings("li").removeClass("f-hover");  

	})

	//条数赋值
	var txt = $(".tsp_count i:first").html();
	$(".m-tith4 span b").html(txt);


if(pageClass==3){
	//隐藏源文件下载按钮提示大小js插入
	var dsize = $(".m-list-box li").eq(0).text();
	$(".m-down-btn a.m-a-link span").remove();
	$(".m-down-btn a.m-a-link").append('<span class="u-adddx">'+dsize+'</span>');

	//判断288,282分类下面无高速下载器
	var zipurl = $(".u-down-list .u-link-list").find("ul li.f-other-url a").attr("href")
	//console.log(zipurl)
	var xid = _pageinfo.categroyId;
	if(xid == '288' || xid =='282'){
		//先判断小类id 然后判断 “zipurl”下载地址是否存在
		if (zipurl != undefined) { 
	
			console.log(zipurl.indexOf("zip"))
			//判断下载地址是否包含“zip”
			if(zipurl.indexOf("zip") == -1){
				$(".m-down-btn div.f-fl").hide();
				$(".u-down-list div.one ul h3.m-down-1").hide();
				$(".u-down-list div.one ul li.u-gs-btn").hide();
			}

		}else{
			$(".m-down-btn div.f-fl").hide();
			$(".u-down-list div.one ul h3.m-down-1").hide();
			$(".u-down-list div.one ul li.u-gs-btn").hide();
		}
	}

	var txt1 = $(".g-left-title .m-title-dome ul li").eq(0).text();	
	var cli1 = $(".g-left-title .m-title-dome ul").find("li").length;
	var pcdown = $(".m-down-content .u-down-list .one ul li").length;
	var ulpcdown = $(".u-down-list .u-link-list").eq(0).find("ul li").length;
		if(txt1 == 'PC版' && cli1 == '1' && _pageinfo.id != '29791' && pcdown < 1 && _pageinfo.pcstar != 1){
			$(".m-down-btn div.f-fl").hide();
			$(".m-down-content .u-down-list .u-link-list h4").hide();
			$(".m-down-content .u-down-list .u-link-list").append('<p style="margin:20px 0px 0px 20px"><img src="/skin/new2018/images/tigicoimg.png"></p>');
		}
		if (cli1 > 1 && pcdown < 1 ) {
			$(".m-down-content .u-down-list .one h4").hide();
			$(".m-down-content .u-down-list .one").append('<p style="margin:20px 0px 0px 20px"><img src="/skin/new2018/images/tigicoimg.png"></p>');
		}
		if (cli1 > 1 && ulpcdown < 1 ) {
			$(".u-down-list .u-link-list").eq(0).find("h4").hide();
			$(".u-down-list .u-link-list").eq(0).append('<p style="margin:20px 0px 0px 20px"><img src="/skin/new2018/images/tigicoimg.png"></p>');
		}
		if (pcdown < 1) {
			$(".m-down-btn div.f-fl").hide();
			$('.m-a-link').css('background-color', '#ccc').find('p').text('暂无下载')
		}

}

	//软件截图轮播图标小于一张隐藏左右按钮
	var list = $(".m-previmg-show ul").find("li").length;
	if(list<=1)
	{
   		$(".m-previmg-fix").find("b").hide();
	}
	$(".g-news-tj").slide({titCell:".f-tj-dome li",mainCell:".g-tj-box",trigger:"click",titOnClassName:"m-hover"});//新品推荐 最新更新
	$(".m-tj-dome").slide({titCell:".f-dome-list li",mainCell:".g-tj-bottom",titOnClassName:"m-hover"});//软件推荐
	$(".g-bl-down").slide({titCell:".f-month li",mainCell:".g-bl-box",titOnClassName:"m-hover"});//本类下载排行
	$(".g-hot-rj").slide({titCell:".g-hot-top li",mainCell:".g-hot-bottom",titOnClassName:"f-hover"});//热门软件 关键词
	$(".m-like-box").slide({titCell:".m-title-dome li",mainCell:".m-bottom-box",titOnClassName:"m-hover"});//猜你喜欢
	$(".m-previmg-fix").slide({mainCell:".m-previmg-show ul",effect:"left",scroll:1});//软件截图
	$(".g-down-box").slide({titCell:".m-title-dome li",mainCell:".u-down-list",trigger:"click",titOnClassName:"m-hover"});//下载地址
	
	//展开关闭内容
	// if($("#m-cont").height() <= 800){
	// 	$(".f-cont-btn").hide();
	// 	$("#m-cont").height("auto")
	// }else{
	// 	$("#m-cont").height(800);	
	// 	$("#m-cont").addClass("f-cont800");	
	// 	$(".f-cont-btn").click(function(){
	// 		if($(this).text()=="展开内容"){
	// 			$("#m-cont").height("auto");
	// 			$(this).text("收起内容").addClass("m-click-bg");
	// 			$("#m-cont").removeClass("f-cont800");	
	// 		}else{
	// 			$("#m-cont").height("800px");
	// 			$(this).text("展开内容").removeClass("m-click-bg");
	// 			$("#m-cont").addClass("f-cont800");	
	// 		}
	// 	})
	// }	2021-05-26
	$(".f-cont-btn").hide();


	txtvideo();//2020-06-23 修改内容添加的视频http路径
	//addbox();//2020-09-09 新增普通下载点击弹窗
	
	if(pageClass==3) //软件页
	{	
		if (_pageinfo.id != 29791) {//不为360指定id号
		//var All_600  ="<iframe marginwidth=0 marginheight=0 frameborder=0 bordercolor='#000000' scrolling=no src=\"/js/html/down_foot2018.html\" width=870 height=60></iframe>";
		//$("#szdz").after('<div style=\"clear:both;width:870px;padding: 0px 15px 15px 15px; background:#FFF;\"> '+All_600+' </div>');
		}

	
	// 诱导位结束 3-13 
	$(".keyText").prepend('<strong><i>i</i>软件特别说明</strong>');
	
	//截图垂直居中
	 var jtimg = $('.m-previmg-show').height(); 
	    $(".m-previmg-show img").each(function(){
		var strli="<i id='u-show-img'></i>";				
			$(this).wrapAll(strli);	
			
			$("#u-show-img").css("height", jtimg);
		})
		
	//判断无内容隐藏
	$('.f-jump-place').each(function(i){
		if (i > 0) {
			var judivlinum = $(this).find('li').length;
			if (judivlinum <1) {
				$('.m-ml-nav li').eq(i).css({'width':'0','overflow':'hide','font-size':'0','border':'0'});
				$('.f-jump-place').eq(i).css({'height':'0','overflow':'hide','margin':'0'});
			}
		}
	})
	// 处理无下载地址
	if ($('.u-link-list a').length < 1) {
		$('.m-a-link').css('background-color', '#ccc').find('p').text('暂无下载');
		//2020-2-11新增无下载地址隐藏官网和厂商
		$(".m-list-box li").eq(5).find("a").hide();
		$(".m-list-box li").eq(8).find("a").hide();
				
	}

	  var version = $(".g-version ul").find("li").length;
	  if(version < 1){
		  $(".g-version").remove()
		 
	  }

	//2020-11-13 新增根据 名称 隐藏下载地址
 //    var pbtitle = $(".g-top-name h1").text();
 //    var pcdown = $(".m-down-content .u-down-list .one ul li").length;
 //    if (pcdown > 1) {
	//     if (pbtitle.indexOf("王者荣耀") != -1 || pbtitle.indexOf("英雄联盟") != -1 || pbtitle.indexOf("和平精英") != -1 || pbtitle.indexOf("地下城与勇士") != -1 || pbtitle.indexOf("穿越火线") != -1 || pbtitle.indexOf("一人之下") != -1) {
	//       $('.m-a-link').css('background-color', '#ccc').find('p').text('暂无下载');
	//       $(".u-down-list ul").eq(0).hide();
	//       $(".u-down-list .u-link-list").eq(0).find("h4").hide();
	// 	  $(".u-down-list .u-link-list").eq(0).append('<p style="margin:20px 0px 0px 20px"><img src="/skin/new2018/images/tigicoimg.png"></p>');
	// 	  $(".left_add").hide();
	//     }
	// }
	 
  
	  //插入三张广告
	  $(".u-down-list").after("<div class=\"u-right-ban f-fr\"><a class=\"first-ban\" href=\"https://www.qqtn.com/down/60003.html\" target=\"_blank\"><img src=\"/skin/new2018/images/ban1_douyu.png\"></a><p><a href=\"https://www.qqtn.com/down/29791.html\" target=\"_blank\"><img src=\"/skin/new2018/images/ban2.png\"></a><a href=\"https://www.qqtn.com/down/29865.html\" target=\"_blank\"><img src=\"/skin/new2018/images/ban3.png\"></a></p></div> ")

	  $(function() {

if(typeof(_pageinfo.pcstar) == 'undefined' || _pageinfo.pcstar != '1'){

		//索引滚动
		gotoObj($(".m-ml-nav"),$(".m-ml-nav").height());

}

function gotoObj(thisObj,navHeight){	
	$(".m-down-link").click(function(){
		$("body,html").animate({scrollTop:$("#down-mian").offset().top-320},300)
	})
	var navTop = thisObj.offset().top;
	$(window).scroll(function(){		
		if($(window).scrollTop() > navTop){
			thisObj.addClass("f-float");
			$('.topForm').addClass("f-top-box");
			$("#m-cont").css("margin-top",navHeight)
		}else{
			thisObj.removeClass("f-float");
			$('.topForm').removeClass("f-top-box");
			$("#m-cont").css("margin-top",0)
		}
		for(i=0;i<thisObj.find("li").length-1;i++){
			if($(window).scrollTop() >= parseInt(($(".f-jump-place").eq(i).offset().top - navHeight))){
				thisObj.find("li").eq(i).addClass("f-hover").siblings().removeClass("f-hover")
			}
		}
	})
	thisObj.find("li").click(function(){
		var n = $(this).index();
		if(n<5){	
			var gotoTop = $(".f-jump-place").eq(n).offset().top - navHeight;
			$("body,html").animate({scrollTop:gotoTop},500)
		}else{
			var gotoTop = $("#down-mian").offset().top - navHeight;
			$("body,html").animate({scrollTop:gotoTop},500)	
		}
	})

	//合集功能
	var titleName ="";
	$(".m-bottom-box .m-bottom-list").each(function(i) {
        titleName = '<li>'+$(this).find(" h4 a").text()+'<i></i>'+'</li>';	
		 $('#f-like-txt ul').append(titleName);
		 $('#f-like-txt ul li:first').addClass("m-hover");
		 $('#f-like-txt ul li').hover(function(){
		 	$(this).addClass("m-hover").siblings("li").removeClass("m-hover");  
		 	var n = $(this).index();	
		 	$(".m-bottom-box .m-bottom-list").eq(0).show();
			$(".m-bottom-box .m-bottom-list").eq(n).show().siblings(".m-bottom-list").hide();
		 })
    });
	}
})

	//详细页相关
	$(".m-soft-relat").hover(function(){
		$(this).find(".icolst").css("height","auto");
		$(this).addClass("m-hover")
	},function(){
		$(this).find(".icolst").css("height","298px");
		$(this).removeClass("m-hover")
	});
	$(".m-soft-relat .icolst li h6 a span").each(function(){
		var liText = $(this).text();
		var sizeText = $(this).parents("li").find("p").text();
		if(sizeText.indexOf("M") <= -1 && sizeText.indexOf("K") <= -1){
			if(liText.indexOf("官方") > -1){
				$(this).parents("li").find("p").prepend("<font color=\"red\">官方版</font>")
			}else if(liText.indexOf("ios") > -1){
				$(this).parents("li").find("p").prepend("<font color=\"red\">IOS版</font>")
			}else if(liText.indexOf("绿色") > -1){
				$(this).parents("li").find("p").prepend("<font color=\"red\">绿色版</font>")
			}else if(liText.indexOf("破解") > -1){
				$(this).parents("li").find("p").prepend("<font color=\"red\">破解版</font>")
			}else if(liText.indexOf("免费") > -1){
				$(this).parents("li").find("p").prepend("<font color=\"red\">免费版</font>")
			}else if(liText.indexOf("安卓") > -1){
				$(this).parents("li").find("p").prepend("<font color=\"red\">安卓版</font>")
			}else if(liText.indexOf("Mac") > -1){
				$(this).parents("li").find("p").prepend("<font color=\"red\">Mac版</font>")
			}else if(liText.indexOf("ipa") > -1){
				$(this).parents("li").find("p").prepend("<font color=\"red\">IOS版</font>")
			}else if(liText.indexOf("中文") > -1){
				$(this).parents("li").find("p").prepend("<font color=\"red\">中文版</font>")
			}else if(liText.indexOf("安装") > -1){
				$(this).parents("li").find("p").prepend("<font color=\"red\">安装版</font>")
			}else if(liText.indexOf("谷歌") > -1){
				$(this).parents("li").find("p").prepend("<font color=\"red\">谷歌版</font>")
			}else{
				$(this).parents("li").find("p span:first").remove();
			}
		}
	})

	Array.prototype.in_array = function(e) {  //用法arr.in_array("a") 是否包含在数组中
	for(i=0;i<this.length;i++){ 
		
		if(this[i] == e)  return true;
	}   
 	return false;  
}

var cateAPK = [194,195,196,227,197,198,228,229,230,231,286,188,285,187,189,325,326,327,328,329,207,205,304,385,200,201,202,203,221,222,223,224,225,204,226,324];	 //安卓分类
var cateIOS = [209,210,211,212,213,214,215,216,217,218,219,220,318,292,293,294,295,296,297,298,299,300,301,302,303,306,307,308,309,310,311,312,313,314,315,316,317]; //苹果分类 
	$(".c_soft_same em").each(function(i){
			var data=$(this).attr("data");			 
			if ( cateAPK.in_array(data)	){ //如果安卓
				$(this).attr("class","m-android")
			}
			if ( cateIOS.in_array(data)	){ //如果苹果
				$(this).attr("class","m-ios");
			}
        });




	 		
  }
});

//下载详细页插入广告300*295
var d_a5=function(){
	var da5 = '<script type="text/javascript" src="//a1.q6u.com/common/qydss.js?niaffeke=h"></script>';
	document.write(da5)
} 


//禁用右键、文本选择功能、复制按键  
//document.onselectstart = function(){  event.returnValue = false;};document.oncontextmenu = function(){  event.returnValue = false;};document.oncopy = function(){  event.returnValue = false;};

//2020-06-23 修改内容添加的视频http路径
function txtvideo() {
  var ifm = $("#m-cont iframe").length;
  //var embed = $(".g-down-content embed").length;
  //console.log(ifm)
  //console.log(embed)
  if (ifm > 0) {
      var ifmUrl = $("#m-cont iframe").attr("src");
      var httpUrl = ifmUrl.split('//');
      var oneUrl = httpUrl[0];
      //ifmUrl.indexOf("iqiyi.com") != -1 || 
      //添加https 腾讯、优酷、网易音乐、17173
      if (ifmUrl.indexOf("v.qq.com") != -1 || ifmUrl.indexOf("youku.com") != -1 || ifmUrl.indexOf("music.163.com") != -1 || ifmUrl.indexOf("v.17173.com") != -1) {
          if(oneUrl == "http:"){
            $("#m-cont iframe").attr("src","https://"+httpUrl[1])
          }
      }      
  } 

};


// function addbox() {
// 	//创建弹出层
// 	var jf1 = '<div id="j-open-box" style="width:505px;height:auto;margin:0 0 0 -252px;background:#fff;overflow:hidden;position:fixed;left:50%;top:230px;z-index:999;border-radius:8px;text-align:center;">';
// 	    jf1 += '<p style="height: 46px;line-height: 46px;font-weight: 700;font-size: 18px;color: #f90;border-bottom: 1px solid #f0f0f0;">温馨提示</p>';
// 	    jf1 += '<div style="padding: 15px 60px;font-size: 16px;color: #000;">';
// 	    jf1 += '<div style="font-size: 16px;color: #000;text-align:left;line-height:28px;"><p>您好:</p><p>感谢您下载<font style="color:red">'+document.getElementsByTagName('h1')[0].innerText+'</font>。</p><p>现邀请您关注公众号，获取该软件安装使用教程及相关学习资料。</p></div>';
// 	    jf1 += '<div class="n1-ewm"><img style="width: 244px;height: 244px;vertical-align: middle;" src="https://www.qqtn.com/skin/new2018/images/jf.png" /></div>';
// 	    jf1 += '</div>';
// 	    jf1 += '<b class="j-open-exit" style="display:block;text-align:center;font-weight:normal;color: #4b78ff;font-size: 16px;cursor: pointer;border-top: 1px solid #f0f0f0;position: static;background: #fff;width: 100%;line-height: 45px;height: 45px;">好的，我知道了</b>';
// 	    jf1 += '</div>';
// 	    jf1 += '<b class="j-black-bg" style="display:block;width:100%;height:100%;background:#000;overflow:hidden;position:fixed;top:0;left:0;z-index:998;opacity:0.6;"></b>';
// 	$('#showa,.address_like a').click(function(){
// 	    if($('#j-open-box').length == 0){
// 	        $('body').append(jf1);
// 	    }else{
// 	        $('#j-open-box,.j-black-bg').show();
// 	    }
// 	    $('.j-open-exit,.j-black-bg').click(function() {
// 	        $('#j-open-box,.j-black-bg').hide();
// 	    });
// 	    //tongji
// 	    if($('#cnzz_stat_icon_1279256637').length == 0){
// 	        $('body').append('<span id="cnzz_stat_icon_1279256637"></span>');
// 	        new_element=document.createElement("script");
// 	        document.body.appendChild(new_element);
// 	        new_element.type = "text/javascript";
// 	        new_element.src = "https://w.cnzz.com/c.php?id=1279256637";
// 	    }    
// 	});
// }