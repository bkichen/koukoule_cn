
var browser = {  versions: function () {
                var u = navigator.userAgent, app = navigator.appVersion;
                return {//移动终端浏览器版本信息
                    trident: u.indexOf('Trident') > -1, //IE内核
                    presto: u.indexOf('Presto') > -1, //opera内核
                    webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
                    gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
                    mobile: !!u.match(/AppleWebKit.*Mobile/i) || !!u.match(/MIDP|SymbianOS|NOKIA|SAMSUNG|LG|NEC|TCL|Alcatel|BIRD|DBTEL|Dopod|PHILIPS|HAIER|LENOVO|MOT-|Nokia|SonyEricsson|SIE-|Amoi|ZTE/), //是否为移动终端
                    ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
                    android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
                    iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1, //是否为iPhone或者QQHD浏览器
                    iPad: u.indexOf('iPad') > -1, //是否iPad
                    webApp: u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部
                };
            } (),
   language: (navigator.browserLanguage || navigator.language).toLowerCase()
}





if (typeof(Page)=="undefined'")
{
	var Page = 0
}

$(function(){


	//文章内容推广
	isImgLoad(function(){	// 判断图片加载状况，加载完成后回调
		if(typeof(cmsList) == "undefined"){
			window.setInterval(function(){
				$(".plist").each(function() {

					if($(this).find("ul span").css("position")=="absolute"){
							var allHeight = $(this).find("ul img").outerHeight(true);
							var ulTop = Math.ceil($(this).find("ul").css("top").substr(0,$(this).find("ul").css("top").indexOf("px")));
							$(this).height(allHeight+ulTop+10)
					}else if($(this).find("ul img").length>0){
						var allHeight = $(this).find("ul img").outerHeight(true) + $(this).find("ul strong").outerHeight(true) + $(this).find("ul span").outerHeight(true) + $(this).find("ul b").outerHeight(true);
						$(this).height(allHeight)
					}



				});
			},100)
		}

		$(".g-index-tab .g-index-tab-game").each(function() {
            var allHeight = $(this).find("ul img").outerHeight(true) + $(this).find("ul strong").outerHeight(true) + $(this).find("ul span").outerHeight(true) + $(this).find("ul b").outerHeight(true)+10;
			$(this).height(allHeight)
			$(this).find("ul,ul li").height(allHeight);
        });
	});
	

	//评论
	commentSeo();
	$(".m-backtop").click(function(){backTop()})
	$("#verify").click(function(){
		commontSubmit();
	});

	//下载列表
	if(Page == 2){
		//$(".g-nav-full a:first").addClass("m-hover")
		var listHref = window.location.pathname;
		$(".g-nav-full a").each(function() {
			var navHref =  $(this).attr("href");
			if(navHref==listHref){
			   $(this).addClass("m-hover").siblings().removeClass("m-hover");
			}
		}); 

		var durl = $(".m-catalogid").text();
		if (_variable.Rootid == 15) {$(".g-nav-box").find('a').eq(2).addClass("on");}
		if (_variable.Rootid == 16) {$(".g-nav-box").find('a').eq(1).addClass("on");}
		
		if(durl == 194 || durl == 195 || durl == 196 || durl == 227 || durl == 197 || durl == 198 || durl ==228 || durl==229 || durl==230 || durl==231 || durl==286 || durl==188 || durl==285 || durl==187 || durl==189 || durl==325 || durl==326 || durl==327 || durl==328 || durl==329 || durl==207 || durl==205 || durl==304 || durl==385)
		{
			$(".g-nav-box").find('a').eq(1).addClass("on");
		}
		if(durl==200 || durl==201 || durl==202 || durl==203 || durl==221 || durl==222 || durl==223 || durl==224 || durl==225 || durl==204 || durl==226 || durl==324)
		{
			$(".g-nav-box").find('a').eq(2).addClass("on");
		}	
	}
	
	//下载页
	if(Page==3){
		downShowcontent();
		$("#m-game-introd").click(function(){
			$(this).addClass("m-hover").siblings().removeClass("m-hover");
			$("section").show();
		})
		$("#m-game-tutorail").click(function(){
			$(this).addClass("m-hover").siblings().removeClass("m-hover");
			$(".g-down-previmg,.g-down-information,.g-down-introd,.g-down-recomd,.m-comment,.showad,#g-keyword,.g-key-ohter").hide();
			$(".g-cms-relatedcms").show();
		})
		$("#m-game-comment").click(function(){
			$(this).addClass("m-hover").siblings().removeClass("m-hover");
			$(".g-down-previmg,.g-down-information,.g-down-introd,.g-down-recomd,.g-cms-relatedcms,.showad,#g-keyword,.g-key-ohter").hide()
			$(".m-comment").show();
		});
		setInter = window.setInterval(function(){
			var heightImg = $("#g-down-previmg ul li img").height();
			$("#g-down-previmg,#g-down-previmg ul").height(heightImg);
			if(heightImg>50){
				clearInterval(setInter);
			}
		},100);
		theme();
	}
	
	//文章信息
	if(Page == 5){
		$("#dhmore").click(function(){
			$(this).toggleClass("tagShow");
			$(".m-vicenav").slideToggle();
		});
		var cmscontent=$("#content p");
		if (cmscontent.length>2){
			$("#show_c_2").insertAfter(cmscontent.eq(parseInt(cmscontent.length/2)));
		}
		$.ajax({
		   type: "GET",
		   url: "/skin/new2016/js/cmsjson.html",
		   data: "",
		   success: function(msg){						   
				loadCmsrandom( msg );
		   }
		}); 
		theme();
	}
	
	//Rank
	if(Page==6){
		$(".m-ranklist").each(function() {
			$(this).find(".g-cont-game").eq(0).find("i").css("background","#ff0000");
			$(this).find(".g-cont-game").eq(1).find("i").css("background","#ff6600");
			$(this).find(".g-cont-game").eq(2).find("i").css("background","#ff9900");
		});
	}
	
	//文章列表
	if(Page == 10){
		cmsLoading();
		cmslistImghide();
		var linkArry = window.location.href;
		$(".g-nav-cms a").each(function(){
			var aLink = $(this).attr("href");	
			if(aLink==linkArry){
				$(this).addClass("m-hover")
			}
		})

		/*$(window).scroll(function(){			
			if($(window).scrollTop()>90){
				$(".g-top-full").addClass("m-float-top1");
				$("#m-cms-nav").addClass("m-float-top2");
			}else{
				$(".g-top-full").removeClass("m-float-top1");	
				$("#m-cms-nav").removeClass("m-float-top2");	
			}
		})*/
	}
	
	//游戏分类，软件分类
	if(Page==11 || Page==12){
		hideIcon();
	}
	
	//Keyword
	if(Page==14){
		if($(".g-key-list li").length<=0){
			$(".g-key-list,.m-keyword-title").hide();	
		}
		keyIntroduce();
		for(i=0;i<3;i++){
			if($(".g-keyword").eq(i).find("div").length <= 0){
				$(".g-keyword").eq(i).hide();
				$(".g-nav-rankbang b").eq(i).hide();
			}
		}
		for(i=0;i<3;i++){
			if($(".g-keyword").eq(i).find("div").length > 0){
				$(".g-keyword").eq(i).show();
				$(".g-nav-rankbang b").eq(i).addClass("m-hover").siblings("b").removeClass("m-hover");
				break;
			}
		}
		systemPaix();

		//判断k页面 相关应用个数为0就添加 并且根据"彩票、棋牌、爱奇艺"屏蔽
		var klistn = $(".g-keyword").find("div.g-cont-game").length;
		if (klistn <= 0) {
			$(".g-keyword").after('<div style="width:100%;height:65px;line-height:65px;font-size:20px;font-weight:bold;text-align:center;background:#fff;margin-top: 10px;">该应用已经下架，请看看其他内容吧</div>');
		}
		var htxtname = $(".g-key-top h1").text();
		if(htxtname.indexOf("\u5f69\u7968") != -1 || htxtname.indexOf("\u68cb\u724c") != -1){
			$(".g-keyword").hide();
			$(".g-keyword").after('<div style="width:100%;height:65px;line-height:65px;font-size:20px;font-weight:bold;text-align:center;background:#fff;margin-top: 10px;">该应用已经下架，请看看其他内容吧</div>');
		}

		//2020-04-09新增k页面的聚合关键字调用，无相关影藏
		 var jhlen = $(".txthtml p.g-keyalink a").length;
		// var jhlink = $(".g-key-font p.g-keyalink a").length;
		if (jhlen <= 0) {
			$(".txthtml p.g-keyalink").hide();
		}
		// if (jhlink <= 0) {
		// 	$(".g-key-font p.g-keyalink").hide();
		// }
		// 
		// 
		//addzhushou();////增加首次访问K页面安卓设备下 第一个下载按钮改为下载 手机助手  2021-04-10注释
		

	}

	if(Page==14 || Page==15){
		var conHeight = $(".g-key-font .box").height();
		var i = 0;
		setTimer = setTimeout(function(){
			window.setInterval(function(){
				i++;
				if(i<=conHeight){
					$(".g-key-font .box").animate({top:-i},0)
				}else{
					i=0;
					$(".g-key-font .box").animate({top:-i},0)
				}
			},50)
		},3000)
		$("#g-look-desc").click(function(){
			$("body").append("<div class=\"txthtml\"></div>");	
			var txthtml = $(".g-key-font .box").html();//获取box下第一个p标签的内容
			var jhlink = $(".g-key-font .g-keyalink").html();

			//console.log(jhlink)
			$(".txthtml").prepend('<div class="f-box">'+txthtml+'</div>');
			if (jhlink != undefined) {
				$(".txthtml").append('<div class="f-jhlink">'+jhlink+'</div>');
				if ($(".txthtml .f-jhlink a").length <= 0) {
					$(".txthtml .f-jhlink ").hide();
				}
			}
			
			var dat = $(".f-box #time").prop("outerHTML")
			$(".f-box #time").hide();
			$(".txthtml").append(dat)
			
			$(".txthtml").append("<b id=\"m-close-desc\">关闭</b>");	
			$("body").append("<b id=\"m-alert-bg\"></b>");	
			$("#m-close-desc").click(function(){
				$(".txthtml").remove();
				$("#m-alert-bg").remove();
			})
		})
	}

	//主题分组
	if(Page== 15){		
		keyIntroduce();	
		themeLoading();
		
		if($("#g-other-class ul li").length<=0){
			$("#g-other-class").hide();
		};
	}
	//资讯集合页
	if(Page == 16){

	}
	//个性
	if(Page == 20){
		 window.onload=function(){



			$(".plist").each(function() {
	            //var allHeight = 128;
	            var allHeight = $(this).find("ul li").height();
				$(this).height(150)
				$(this).find("ul,ul li").height(allHeight);
	        });	
        }	
	}
	//个性图片、头像
	if(Page == 21){

		$("#more").click(function(){
			gxImgloading();
		});


		//$(window).scroll(function(){
//	        var winH = $(window).height(),
//	        domH = $(document).height(),
//	        scrollTop = $(document).scrollTop();
//		    if(domH - winH - scrollTop < 1){
//		    	gxImgloading(); return false;
//		    }else{
//		        return false;
//		    }   	
//		});
		
	}
	//个性签名、网名、说说
	if(Page == 22){
		// var randomNumb = Math.floor((Math.random()* 10)); 
		// $(".plist").each(function() {
  //           var allHeight = 128;
		// 	$(this).height(150)
		// 	$(this).find("ul,ul li").height(allHeight);
  //       });
        $("#more").click(function(){
			gxCmsloading();
		});
		

	}
	//个性表情
	if(Page == 23){
		$("#more").click(function(){
			gxBqloading();
		});

		$(window).scroll(function(){
	        var winH = $(window).height(),
	        domH = $(document).height(),
	        scrollTop = $(document).scrollTop();
		    if(domH - winH - scrollTop < 1){
		    	gxBqloading(); return false;
		    }else{
		        return false;
		    }   	
		});
		
	}
	//软件库
	if(Page == 24){
		$(".g-ku-cms").each(function(){
			if($(this).find("li").length <=0){
				$(this).parents(".g-box").hide();
			}
		})
		$(".g-nav-full li").each(function(){
			var navName = $(this).find("a").text().replace(/\s+/g,"");
			if(navName == kuposition){
				$(this).addClass("m-hover").siblings("li").removeClass("m-hover");
			}
			if(navName == "使用教程"){
				$(this).find("a").text("教程")
			}else if(navName == "常见问题"){
				$(this).find("a").text("问题")
			}else if(navName == "软件下载"){
				$(this).find("a").text("下载")
			}
		})
		$(".m-down-ul li a").each(function(){
			var adoo = $(this).attr("href");
			if(adoo == "http://www.qqtn.com" || adoo == "https://www.qqtn.com"){
				$(this).addClass("nodown").attr("href","javascript:;").prepend("暂无")
			}
		})
		generalHideimg();
		$(".g-introd-btn").click(function(){
			var btnState = $(this).attr("data-state");
			if(btnState=="展开"){
				$(this).prev(".g-ku-introd").css("height","auto");
				$(this).attr("data-state","收起");
				$(this).addClass("m-hover");
			}else{
				$(this).prev(".g-ku-introd").css("height","38px");
				$(this).attr("data-state","展开");
				$(this).removeClass("m-hover");
			}

		})
		$(".m-choose").find(".g-like:first").show();
		var boxSize = $(".m-choose").find(".g-like").length;
		$(".g-ku-title em").click(function(){
			var n = $(this).parents(".m-choose").attr("data-num");
			if(n<boxSize-1){
				n++;
				$(".m-choose").find(".g-like").eq(n).show().siblings(".g-like").hide();
				$(this).parents(".m-choose").attr("data-num",n)
			}else{
				n=0;
				$(".m-choose").find(".g-like").eq(n).show().siblings(".g-like").hide();
				$(this).parents(".m-choose").attr("data-num",n)
			}
		})
		var imgHtml = "";
		$("#g-down-previmg ul img").each(function(){
			var imgSrc = $(this).attr("src");
			imgHtml += '<li>'+ '<img src="'+ imgSrc +'" />' +'</li>'
		})
		$("#g-down-previmg ul").empty().append(imgHtml);
		if(typeof(kuObj) != "undefined"){
			//手机游戏库
			if(kuObj.kuClass=="手机游戏库"){
				$(".m-contnot").each(function(){
					if($(this).find("li").length <=0){
						$(this).parents(".g-box").hide();
					}
				})
				$(".g-game-nav li").each(function(){
					var navName = $(this).find("a").text();
					if(navName == "新闻公告"){
						$(this).find("a").text("新闻")
					}else if(navName == "攻略秘籍"){
						$(this).find("a").text("攻略")
					}else if(navName == "游戏问答"){
						$(this).find("a").text("问答")
					}else if(navName == "游戏下载"){
						$(this).find("a").text("下载")
					}else if(navName == "辅助工具"){
						$(this).find("a").text("辅助")
					}
				})
			}
		}
	}
	//个性文章
	if(Page == 25){
		if(_pageinfo.categroyId == 9){
			$(".g-top-full span").append("表情")
		}else if(_pageinfo.categroyId == 18){
			$(".g-top-full span").append("说说")	
		}else if(_pageinfo.categroyId == 20){
			$(".g-top-full span").append("头像")	
		}else if(_pageinfo.categroyId == 23){
			$(".g-top-full span").append("签名")	
		}else if(_pageinfo.categroyId == 28){
			$(".g-top-full span").append("网名")	
		}else if(_pageinfo.categroyId == 72){
			$(".g-top-full span").append("图片")	
		}else if(_pageinfo.categroyId == 74){
			$(".g-top-full span").append("皮肤")	
		}
		$("#dhmore").click(function(){
			$(this).toggleClass("tagShow");
			$(".m-vicenav").slideToggle();
		});
		var cmscontent=$("#content p");
		if (cmscontent.length>2){
			$("#show_c_2").insertAfter(cmscontent.eq(parseInt(cmscontent.length/2)));
		}
		$.ajax({
		   type: "GET",
		   url: "/skin/new2016/js/cmsjson.html",
		   data: "",
		   success: function(msg){						   
				loadCmsrandom( msg );
		   }
		}); 

	}
	if(Page == 26){
		moreimgLoading();
		var linkArry = window.location.href;
		$("#m-cms-nav ul li").each(function(){
			var aLink = $(this).find("a").attr("href");	
			if(aLink==linkArry){
				$(this).addClass("m-hover")
			}
		});
		$(window).scroll(function(){			
			if($(window).scrollTop()>90){
				$(".g-top-full").addClass("m-float-top1");
				$("#m-cms-nav").addClass("m-float-top2");
			}else{
				$(".g-top-full").removeClass("m-float-top1");	
				$("#m-cms-nav").removeClass("m-float-top2");	
			}
		})
	}
	backUp();//返回上一页
	$(".plist").each(function(i){//横向多个滑动
		var idStr = $(this).attr("id");
	 	var parent_class =  $(this).attr("class");
		var child_class =  $("."+parent_class).children(i).children(0).attr("class");
		createIScroll(idStr,"g-ppt-btn");
	});
	if(Page != 10){
		clickNav();	
	}else{
		clickNav10();	
	}
	//clickNav();//点击展开导航
	Tab();//选项卡
	//noGamedown();//没有下载就影藏
	backTop()//返回顶部
	if($(".m-img-hide").length>0){
		$(".m-img-hide").each(function(){
			var n = $(this).find("li").length;
			for(i=0;i<n;i++){
				var imgSrc = $(this).find("li .m-hide img").eq(i).attr("src");	
				if(imgSrc=="http://www.qqtn.com/skin/NoPic.jpg"){	
					 $(this).find("li .m-hide").eq(i).hide();
					 //$(this).find("li a").eq(i).css("padding-bottom","26px")
				}

			}			
			
		})
	}
	
})
//横向滑动
function createIScroll(idStr, tabClassStr){
	var snap = false;
	var classStr =  $("#"+idStr).attr("class");
	var splitClassStr = classStr.split(" ");
	var scrollObj = new IScroll("#"+idStr,{
			snap: snap,
			momentum: !snap,
			resize: true,
			disableMouse: true,
    		disablePointer: true,
			eventPassthrough: true,
			scrollX: true,
			scrollY: false,
			preventDefault: false
	});
	return snap;
}
//判断图片加载完成
function isImgLoad(callback){
	var t_img; // 定时器
	var isLoad = true; // 控制变量
	// 注意我的图片类名都是cover，因为我只需要处理cover。其它图片可以不管。
	// 查找所有封面图，迭代处理
	$(".plist img").each(function(){
		// 找到为0就将isLoad设为false，并退出each
		if(this.height === 0){
			isLoad = false;
			return false;
		}
	});
	// 为true，没有发现为0的。加载完毕
	if(isLoad){
		clearTimeout(t_img); // 清除定时器
		// 回调函数
		callback();
	// 为false，因为找到了没有加载完成的图，将调用定时器递归
	}else{
		isLoad = true;
		t_img = setTimeout(function(){
			isImgLoad(callback); // 递归扫描
		},100); // 我这里设置的是500毫秒就扫描一次，可以自己调整
	}
}
//点击展开导航
function clickNav(){
	$(".m-navshow-btn").click(function(){
		var navText = $(this).text().replace(/\s+/g,"");
		if(navText=="展开"){
			$(this).addClass("m-hover");
			$(".m-navshow-ul,.m-black").stop().fadeIn("fast");
			$(this).text("收起");
			$("header").addClass("m-float");
			$("body").css("padding-top",45)
		}else{
			$(this).removeClass("m-hover");
			$(".m-navshow-ul,.m-black").stop().fadeOut("fast")
			$(this).text("展开");
			$("header").removeClass("m-float");
			$("body").css("padding-top",0)
		}
	})
	$(".m-black").click(function(){
		$(".m-navshow-btn").removeClass("m-hover");
		$(".m-navshow-ul,.m-black").stop().fadeOut("fast")
		$(".m-navshow-btn").text("展开");
		$("header").removeClass("m-float");
		$("body").css("padding-top",0)
	})
}
function clickNav10(){
	$(".m-navshow-btn").click(function(){
		var navText = $(this).text().replace(/\s+/g,"");
		if(navText=="展开"){
			$(this).addClass("m-hover");
			$(".m-navshow-ul,.m-black").stop().fadeIn("fast");
			$(this).text("收起");
		}else{
			$(this).removeClass("m-hover");
			$(".m-navshow-ul,.m-black").stop().fadeOut("fast")
			$(this).text("展开");
		}
	})
	$(".m-black").click(function(){
		$(".m-navshow-btn").removeClass("m-hover");
		$(".m-navshow-ul,.m-black").stop().fadeOut("fast")
		$(".m-navshow-btn").text("展开");
	})
}
//没有下载则影藏
//function noGamedown(){
//	$(".m-nodown-box").each(function() {
//       var softSize = $(this).find(".m-softsize").text().replace(/\s+/g,"");
//		if(softSize=="0KB"){
//			$(this).find(".g-game-btn").addClass("m-nodown-btn").text("暂无下载");
//		}
//   });
//}
//上下结构的选项卡
function Tab(){
	$(".m-tab-box").each(function() {
        $(this).find(".m-tab-cont:gt(0)").hide();
		$(this).find(".m-tab-btn li:first").addClass("m-hover");
    });
	$(".m-tab-btn b").click(function(){
		$(this).addClass("m-hover").siblings().removeClass("m-hover");
		var indexNumb = $(this).index();
		$(this).parents(".m-tab-btn").next(".m-tab-box").find(".m-tab-cont").eq(indexNumb).fadeIn("fast").siblings(".m-tab-cont").hide()
	})
	$(".m-tab-btn li").click(function(){
		$(this).addClass("m-hover").siblings().removeClass("m-hover");
		var indexNumb = $(this).index();
		$(this).parents(".m-tab-box").find(".m-tab-cont").eq(indexNumb).fadeIn("fast").siblings(".m-tab-cont").hide()
	})
}
//K页面
function keyIntroduce(){
	var introduce = $(".g-key-introd .g-key-cont").height();
	$(".g-key-introd .g-key-cont").height(44);
	$(".g-key-introd").click(function(){
		var btnText = $(this).find(".m-key-showcont").text().replace(/\s+/g,"");
		if(btnText=="查看更多"){
			$(this).find(".g-key-cont").animate({height:introduce},200)
			$(this).find(".m-key-showcont").text("收起").append("<b></b>");
		}else{
			$(this).find(".g-key-cont").animate({height:44},200)
			$(this).find(".m-key-showcont").text("查看更多").append("<span></span>");
		}
	});


}
//下载页
function downShowcontent(){
	var contentHeight = $(".g-down-content").height();
	$(".g-down-content").height(110);
	$(".m-show-content p").click(function(){
		var btnText = $(this).text().replace(/\s+/g,"")
		if(btnText=="点击查看更多"){
			$(".g-down-content").animate({height:contentHeight},300);
			$(this).text("点击收起内容").append("<em></em>")
		}else{
			$(".g-down-content").animate({height:110},300);
			$(this).text("点击查看更多").append("<b></b>");
			var offsetTop = $(".g-down-introd").offset().top;
			$("body,html").animate({scrollTop:offsetTop},300)
		}
	})
}
//分类页
function hideIcon(){
	var winWidth = $(window).width();
	if(winWidth<375){
		$(".g-class-game a i").hide();
	}
}
//返回上一页
function backUp(){
	/*var urlhref = [];
	var cookLink = window.document.referrer;
	urlhref = cookLink.split(".");
	var text = "qqtn";
	if($.inArray(text,urlhref) == 1 && $.inArray('baidu',urlhref) == -1){
		$(".g-back-home").attr("href",cookLink);
	}else{
		$(".g-back-home").attr("href","/");
	}*/
	 $(".g-top-full .g-back-home,.g-list-back").click(function(){
	 	history.back(-1);
	 })
}
/*评论*/
function commentSeo(){
	var plHeight = $("#comment_0 dl").height();
	var dtHeight = 0;
	for(i=0;i<5;i++){
		dtHeight += $("#comment_0 dl dt").eq(i).height() + 10;
		dtHeight += $("#comment_0 dl dd").eq(i).height() + 6;
	};
	//alert(dtHeight)
	if(plHeight>=dtHeight){
		$("#comment_0 dl").css("height",dtHeight);
		$(".m-look-ly").show();
	}else{
		$(".m-look-ly").hide();
	}
	$(".m-look-ly").click(function(){
		var btnText = $(".m-look-ly").text()
		if(btnText == '查看更多评论'){
			$("#comment_0 dl").animate({"height":plHeight},200);
			$(this).text("收起评论")
		}else if(btnText == '收起评论'){
			$("#comment_0 dl").animate({"height":dtHeight},200);
			$(this).text("查看更多评论")
		}

	});
}
function addRealCommont(data){
	var comment = '<dt><span><i>最高楼</i><b>您的评论 网友 客人</b> </span><em>发表于: <font color="red"> '+showTime()+' </font>  </em></dt>'
	comment += '<dd>{0}<p id="'+$("#app-id").val()+'"><a href="javascript:">支持<em>(</em><span> 0 </span><em>)</em></a> <a href="javascript:" pid="'+$("#app-id").val()+'">盖楼(回复)</a> </p></dd>';
	comment = comment.replace("{0}",data);
	$("#comment_0 dl").prepend(comment);
}
function commontSubmit(){
	if(CommentTpye==1){
		var id = $("#app-id").val();
		var content = $(".w-text textarea").val();
		if($.trim(content).length <= 2) {
		alert("请填写内容");
		return;
		}
		$.ajax({
		 type: 'POST',
		 url: '/ajax.asp',
		 data:  {
				 content :content,
				  SoftID :id,
			   Action : 2,
			   CommentTpye : 1 	// 此处为服务端接口拼写错误
				},
		 success: function(s){
			   alert("提交成功");
			   $(".w-text textarea").val("");
			   addRealCommont(s)
			 },
		 dataType: ""
		});
	}
	if(CommentTpye==0){
		var id = $("#app-id").val();
		var content = $(".w-text textarea").val();
		if($.trim(content).length <= 2) {
		alert("请填写内容");
		return;
		}
		$.ajax({
		 type: 'POST',
		 url: '/ajax.asp',
		 data:  {
				 content :content,
				  SoftID :id,
			   Action : 2,
			   CommentTpye : 0 	// 此处为服务端接口拼写错误
				},
		 success: function(s){
			   alert("提交成功");
			   $(".w-text textarea").val("");
			   addRealCommont(s)
			 },
		 dataType: ""
		});
	}
}
function showTime(){
var mydate = new Date();
var str = "" + mydate.getFullYear() + "年";
str += (mydate.getMonth()+1) + "月";
str += mydate.getDate() + "日";
return str;
}
//返回顶部
function backTop(){
	$("body").append("<b class=\"m-backTop\"></b>");
	$(window).scroll(function(){
		if($(window).scrollTop()>=300){
			$(".m-backTop").fadeIn("fast");
		}else if($(window).scrollTop()<300){
			$(".m-backTop").fadeOut("fast");
		}
	});
	$(".m-backTop").click(function(){
		$("html,body").animate({scrollTop:0},300)
	})
}

function cmslistImghide(){
	$("#infocon li").each(function() {
		var imgSrc = $(this).find(".g-cd-left img").attr("src");
		if(imgSrc == "https://www.qqtn.com/skin/NoPic.jpg" || imgSrc ==""){
			$(this).find(".g-cd-left").hide();
		}
	});
}

function cmsLoading(){
	var catalogName = $("#m-catalogname").text().replace(/\s+/g,"");
	$(".g-nav-full a").each(function(){
		var listName = "手游" + $(this).text().replace(/\s+/g,"");
		if(listName == catalogName){
			$(this).addClass("m-hover").siblings("a").removeClass("m-hover")
		}
	})
	var p=2,PageCount=0;
	window.page_temp = 0;
	function ViewMore() {
		var webLink = window.location.href
		$("#more").html("内容正在加载中...")
		//console.log(webLink)	
		p++;
		if(webLink.indexOf("rootid") == -1){
			$.ajax({
				type: "Get",
				url: "/sajax.asp",
				data: "action=5&t="+_pageMsg.catalogid+"&s=1&num=10&o=id&p="+p+"&ispre=",
				success: function(msg){
					if(p <= eval( '(' + msg + ')').PageCount){
						listDate(msg);
						cmslistImghide();
					}else{
						$("#more").html("内容已加载完")	;
					}
				 }
			  });
		}else{
			$.ajax({
				type: "Get",
				url: "/sajax.asp",
				data: "action=5&t="+_pageMsg.rootid+"&s=0&num=10&o=id&p="+p+"&ispre=",
				success: function(msg){
					if(p <= eval( '(' + msg + ')').PageCount){
						listDate(msg);
						cmslistImghide();
					}else{
						$("#more").html("内容已加载完")	;
					}
				 }
			  });
		}

	}
	function listDate(msg){
		var objJson =eval( '(' + msg + ')');
		var html = '';
		for(var i=0; i<objJson.Title.length;i++ )
		{
			var moreImg = "";
			var moreArry = objJson.previewimg[i].split(',');
			var moreImgsize = objJson.previewimg[i].split(',').length;
			for(o=0;o<moreImgsize;o++){
				moreImg += '<i><img src='+moreArry[o]+' /></i>';	
			}	
			html += '<li class="g-imgnum-0">';
			html += '<a href="/c/' + objJson.Id[i] + '" class="g-cd-left"><img src="'+ objJson.SmallImg[i] +'" /></a>';
			html += '<a href="/c/' + objJson.Id[i] + '" class="g-cd-right">';
			html += '<strong>'+objJson.Title[i]+'</strong>';
			html += '<b>'+moreImg+'</b>';
			html += '<em><i><span></span>'+objJson.DateAndTime[i].substr(0,objJson.DateAndTime[i].indexOf(' ')).replace(/\//g,"-")+'</i></em>';			
			html += '</a>';
			html += '</li>';
		  
		}
		$('#infocon').append(html);
		$("#more").html("点击查看更多...")
	};
	

	/*$(window).scroll(function(){
        var winH = $(window).height(),
        domH = $(document).height(),
        scrollTop = $(document).scrollTop();
	    if(domH - winH - scrollTop < 1){
	    	ViewMore(); return false;
	    }else{
	        return false;
	    }   	
	});*/
	$("#more").click(function(){
			ViewMore(); return false;
		})
}
var p=2,PageCount=0
	window.page_temp = 0;
function gxImgloading(){
	var tabid = $("#tab-nav li.hover").attr("data-tabid");
	var tabnum = $("#tab-nav li.hover").index();
	if (tabid == undefined) {
		var tabid = 4
	}
	ViewMore();	
	function ViewMore() {		
		$("#more").html("内容正在加载中...")
		p++;		
		$.ajax({
			type: "Get",
			url: "/sajax.asp",
			data: "action=5&t="+gxId+"&s="+tabid+"&num=10&o=0&p="+p,
			success: function(msg){
				if(p <= eval( '(' + msg + ')').PageCount){
					listDate(msg);
				}else{
					$("#more").html("内容已加载完")	;
				}
			}
		});
	}
	function listDate(msg){
		var objJson =eval( '(' + msg + ')');
		var html = '';
		for(var i=0; i<objJson.Title.length;i++ )
		{
		  html += '<li>';
		  html += '<a href="/c/' + objJson.Id[i] + '">';
		  html += '<img src = "'+ objJson.SmallImg[i] +'" />';
		  html += '</a>';
		  html += '<span>'+ objJson.Title[i] +'</span>';
		   var date = objJson.DateAndTime[i].replace(/\//ig,'-').substring(0,objJson.DateAndTime[i].lastIndexOf(' '));
		  html += '<i>'+ date +'</i>';
		  html += '</li>';
		}
		$('#infocon .pcontent,.m-content #infocon').eq(tabnum).append(html);
		$("#more").html("点击查看更多...")
	};
	
	
}
function gxCmsloading(){
	var p=1,PageCount=0
	window.page_temp = 0;
	
	var tabid = $("#tab-nav li.hover").attr("data-tabid");
	var tabnum = $("#tab-nav li.hover").index();
	if (tabid == undefined) {
		var tabid = 4
	}
	ViewMore();	
	function ViewMore() {		
		$("#more").html("内容正在加载中...")
		p++;		
		$.ajax({
			type: "Get",
			url: "/sajax.asp",
			data: "action=5&t="+gxId+"&s="+tabid+"&num=10&o=0&p="+p,
			success: function(msg){
				if(p <= eval( '(' + msg + ')').PageCount){
					listDate(msg);
				}else{
					$("#more").html("内容已加载完")	;
				}
			}
		});
	}
	function listDate(msg){
		var objJson =eval( '(' + msg + ')');
		var html = '';
		for(var i=0; i<objJson.Title.length;i++ )
		{
		  html += '<li>';
		  html += '<h2><a href="/c/' + objJson.Id[i] + '">' + decodeURI(objJson.Title[i]) + '</a></h2>';
		  var data =objJson.DateAndTime[i].replace(/\//ig,'-').substring(0,objJson.DateAndTime[i].lastIndexOf(' '));
		  html += '<div class="listInfo"><p class="cl"><span>'+ data +'</span><span><a href="/c/' + objJson.Id[i] + '">查看全部</a></span></p></div></li>';
		}
		$('.m-content .m-cmstent,.m-content #infocon').eq(tabnum).append(html);
		$("#more").html("上拉或点击查看更多...")
	};
}
function gxBqloading(){
	var p=2,PageCount=0
	window.page_temp = 0;
	ViewMore()
	function ViewMore() {
		$("#more").html("内容正在加载中...")
		p++;
		$.ajax({
			type: "Get",
			url: "/sajax.asp",
			data: "action=5&t="+gxId+"&s=4&num=10&o=id&p="+p,
			success: function(msg){
				if(p <= eval( '(' + msg + ')').PageCount){
					listDate(msg);
				}else{
					$("#more").html("内容已加载完")	;
				}
			}
		});
	}
	function listDate(msg){
		var objJson =eval( '(' + msg + ')');
		var html = '';
		for(var i=0; i<objJson.Title.length;i++ )
		{
		  html += '<li>';
		  html += '<a href="/c/' + objJson.Id[i] + '">';
		  html += '<img src = "'+ objJson.SmallImg[i] +'" />';
		  html += '</a>';
		  html += '<span>'+ objJson.Title[i] +'</span>';
		   var date = objJson.DateAndTime[i].replace(/\//ig,'-').substring(0,objJson.DateAndTime[i].lastIndexOf(' '));
		  html += '<i>'+ date +'</i>';
		  html += '</li>';
		}
		$('#infocon').append(html);
		$("#more").html("上拉或点击查看更多...")
	};
	
}
function generalHideimg(){
	$(".m-hide-img li").each(function(){
		var imgSrc = $(this).find(".m-need-hide img").attr("src");
		if(imgSrc == "" || imgSrc == "http://www.qqtn.com/skin/NoPic.jpg"){
			$(this).find(".m-need-hide").hide();
		}
	})
}

function systemPaix(){
	var u = navigator.userAgent, app = navigator.appVersion;
 	var isIphone= !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)  //ios终端
	var androidSize = 0;
	var iosSize = 0;
	var pcSize = 0;
	var otherSize = 0;
	var androidHtml="";
	var iosHtml="";
	var pcHtml="";
	var otherHtml="";	
	var allsize = $(".g-keyword .g-cont-game").length;
	var keyAd = '';
	$(".g-keyword .g-cont-game").each(function(){
		var gameSystem = $(this).attr("data-system");	
		if(gameSystem.indexOf("Android") != -1){		
			androidSize++;	
			var gameHtml = $(this).html();			
			androidHtml += '<div class="g-cont-game m-nodown-box" data-system="'+gameSystem+'">'+gameHtml+'</div>';		
		}else if(gameSystem.indexOf("IOS") != -1){
			iosSize++;
			var gameHtml = $(this).html();			
			iosHtml += '<div class="g-cont-game m-nodown-box" data-system="'+gameSystem+'">'+gameHtml+'</div>';	
		}else if(gameSystem.indexOf("Win") != -1){
			pcSize++;
			var gameHtml = $(this).html();			
			pcHtml += '<div class="g-cont-game m-nodown-box" data-system="'+gameSystem+'">'+gameHtml+'</div>';	
		}else{
			otherSize++;
			var gameHtml = $(this).html();			
			otherHtml += '<div class="g-cont-game m-nodown-box" data-system="'+gameSystem+'">'+gameHtml+'</div>';	
		}			
	})
	var androidTitle = "<div class=\"m-game-title\"><strong>"+"共有"+"<span>"+androidSize+"</span>"+"款安卓应用"+"</strong></div>";
	var iosTitle = "<div class=\"m-game-title\"><strong>"+"共有"+"<span>"+iosSize+"</span>"+"款ios应用"+"</strong></div>";
	var pcTitle = "<div class=\"m-game-title\"><strong>"+"共有"+"<span>"+pcSize+"</span>"+"款电脑应用"+"</strong></div>";
	var otherTitle = "<div class=\"m-game-title\"><strong>"+"共有"+"<span>"+otherSize+"</span>"+"款其他应用"+"</strong></div>";
	$(".g-keyword").html('');
	if (isIphone&&iosSize>0){
		$(".g-keyword").append("<div class=\"iosbox\">"+iosTitle+"<div class=\"box\">"+iosHtml+"</div><span class=\"onload\">点击查看更多...</span></div>")
		if(androidSize>0){
			$(".g-keyword").append("<div class=\"azbox\">"+androidTitle+"<div class=\"box\">"+androidHtml+"</div><span class=\"onload\">点击查看更多...</span></div>");
			$(".g-keyword").append("<div class=\"azbox\">"+androidTitle+"<div class=\"box\">"+ keyAd +androidHtml+"</div><span class=\"onload\">点击查看更多...</span></div>")
			$(".azbox .box").find(".g-cont-game").eq(0).prepend('<u class="jiao-ico1"></u>');
			$(".azbox .box").find(".g-cont-game").eq(1).prepend('<u class="jiao-ico2"></u>');
			$(".azbox .box").find(".g-cont-game").eq(2).prepend('<u class="jiao-ico3"></u>');
		}
		if(pcSize>0){
			$(".g-keyword").append("<div class=\"pcbox\">"+pcTitle+"<div class=\"box\">"+pcHtml+"</div><span class=\"onload\">点击查看更多...</span></div>")	
		}
		if(otherSize>0){
			$(".g-keyword").append("<div class=\"qtbox\">"+otherTitle+"<div class=\"box\">"+otherHtml+"</div><span class=\"onload\">点击查看更多...</span></div>")	
		}
	}else{
		if(androidSize>0){
			$(".g-keyword").append("<div class=\"azbox\">"+androidTitle+"<div class=\"box\">"+ keyAd +androidHtml+"</div><span class=\"onload\">点击查看更多...</span></div>")
			$(".azbox .box").find(".g-cont-game").eq(0).prepend('<u class="jiao-ico1"></u>');
			$(".azbox .box").find(".g-cont-game").eq(1).prepend('<u class="jiao-ico2"></u>');
			$(".azbox .box").find(".g-cont-game").eq(2).prepend('<u class="jiao-ico3"></u>');
		}
		if(iosSize>0){
			$(".g-keyword").append("<div class=\"iosbox\">"+iosTitle+"<div class=\"box\">"+iosHtml+"</div><span class=\"onload\">点击查看更多...</span></div>")			
		}
		if(pcSize>0){
			$(".g-keyword").append("<div class=\"pcbox\">"+pcTitle+"<div class=\"box\">"+pcHtml+"</div><span class=\"onload\">点击查看更多...</span></div>")	
		}
		if(otherSize>0){
			$(".g-keyword").append("<div class=\"qtbox\">"+otherTitle+"<div class=\"box\">"+otherHtml+"</div><span class=\"onload\">点击查看更多...</span></div>")	
		}	
	}

	var knum = 6;
	$(".iosbox .g-cont-game").each(function(){
		var hlist = $(this).height()+35;
		var clist = $(".iosbox .g-cont-game").length;
		if (clist < knum) {
           $(".iosbox").find(".onload").remove();
        } else {
           $(".iosbox .box").height(hlist * knum);
        }
	})

	$(".azbox .g-cont-game").each(function(){
		var hlist = $(this).height()+35;
		var clist = $(".azbox .g-cont-game").length;
		if (clist < knum) {
            $(".azbox").find(".onload").remove();
        } else {
            $(".azbox .box").height(hlist * knum);
        }
	})
	
	$(".pcbox .g-cont-game").each(function(){
		var hlist = $(this).height()+35;
		var clist = $(".pcbox .g-cont-game").length;
		
		if (clist < knum) {
            $(".pcbox").find(".onload").remove();
        } else {
            $(".pcbox .box").height(hlist * knum);
        }
	})

	$(".qtbox .g-cont-game").each(function(){
		var hlist = $(this).height()+35;
		var clist = $(".qtbox .g-cont-game").length;
		
		if (clist < knum) {
            $(".qtbox").find(".onload").remove();
        } else {
            $(".qtbox .box").height(hlist * knum);
        }
	})
	$(".azbox .onload").click(function () {
		var hlist = 105;
		var clist = $(".azbox .g-cont-game").length;
    	var kdhei = $(".azbox .box").height();
    	if ((kdhei + (hlist*knum)) <=  (hlist*clist)) {
            $(".azbox .box").height(kdhei + (hlist * knum));
        } else {
            $(".azbox .box").height(hlist*clist);
            $(".azbox .onload").text('暂无更多内容');
        }
	})
	$(".iosbox .onload").click(function () {
		var hlist = 105;
		var clist = $(".iosbox .g-cont-game").length;
    	var kdhei = $(".iosbox .box").height();
    	if ((kdhei + (hlist*knum)) <=  (hlist*clist)) {
            $(".iosbox .box").height(kdhei + (hlist * knum));
        } else {
            $(".iosbox .box").height(hlist*clist);
            $(".iosbox .onload").text('暂无更多内容');
        }
	})
	$(".pcbox .onload").click(function () {
		var hlist = 105;
		var clist = $(".pcbox .g-cont-game").length;
    	var kdhei = $(".pcbox .box").height();
    	if ((kdhei + (hlist*knum)) <=  (hlist*clist)) {
            $(".pcbox .box").height(kdhei + (hlist * knum));
        } else {
            $(".pcbox .box").height(hlist*clist);
            $(".pcbox .onload").text('暂无更多内容');
        }
	})
	$(".qtbox .onload").click(function () {
		var hlist = 105;
		var clist = $(".qtbox .g-cont-game").length;
    	var kdhei = $(".qtbox .box").height();
    	if ((kdhei + (hlist*knum)) <=  (hlist*clist)) {
            $(".qtbox .box").height(kdhei + (hlist * knum));
        } else {
            $(".qtbox .box").height(hlist*clist);
            $(".qtbox .onload").text('暂无更多内容');
        }
	})
	

	
}

function themeLoading(){
	 window.page_prev = 1;
	var getTimes = function (times) {
	  if (times >= 10000) {
		  return parseInt(times / 10000) + "万";
	  } else {
		  return times;
	  }
	}
	function ViewMoreCallback(data) {

	  if (data.errorCode == 0) {
		  $("#more").html("点击查看更多...")
		  document.getElementById('infocon').appendChild(frag);
	  }
	}

	var p=2,PageCount=0,loading = false;
	window.page_temp = 0;
	function ViewMore() {
        if(!loading) {
            loading = true;
            $("#more").html("点击查看更多...")
            p=p+1;
    		$.ajax({
                type: "Get",
                url: "/sajax.asp",
                data: "action=4&t="+_themePage.id+"&s=4&num=12&o=resrank desc,updatetime&p="+p,
                success: function(msg){
                    // alert( "Data Saved: " + msg );			
					
					var objJson =eval( '(' + msg + ')');
					if (objJson.PageCount >= p){
						listDate(msg);
						loading = false;
					}
					else{
						$("#more").html("全部加载完毕...")
					}					
                }
            });
            // $("#infocon").append(s)
            //document.body.appendChild(s);
        }
	}
	function listDate(msg){
		var objJson =eval( '(' + msg + ')');
		var html = '';	
		for(var i=0; i<objJson.ResName.length;i++ )
		{
			html += '<div class=\"g-cont-game m-nodown-box\">';
			html += '<a href="/q/' + objJson.softId[i] + '" class=\"g-game-img\">';
			html += '<img src="'+ objJson.SmallImg[i] +'" />';			
			html += '<p>';
			html += '<strong>'+ objJson.ResName[i] + objJson.ResVer[i] +'</strong>';
			html += '<img src="/img/star'+ objJson.ResRank[i] +'.png" />';
			html += '<b>'+objJson.CatalogName[i]+' / <span class="m-softsize">'+objJson.ResSize[i]+'</span> / '+objJson.UpdateTime[i].replace(/\//ig,'-').substring(0,objJson.UpdateTime[i].lastIndexOf(' '))+'</b>';
			html += '</p>';
			html += '</a>';
			html += '<a href="/q/' + objJson.softId[i] + '" class=\"g-game-btn\">';
			html += '<b></b>';
			html += '下载';
			html += '</a>';
			html += '</div>';		  
		 }		 
		$('#infocon').append(html);				
	};

	/*$(window).scroll(function(){
        var winH = $(window).height(),
        domH = $(document).height(),
        scrollTop = $(document).scrollTop();
	    if(domH - winH - scrollTop < 1){
	    	ViewMore(); return false;
	    }else{
	        return false;
	    }   	
	});*/
	$("#more").click(function(){
			ViewMore(); return false;
		});
	
}
function theme(){
	var themeSize = $(".g-keyword-cont").length;
	if(themeSize<=0){
		$("#g-keyword").hide();
		if(Page==5){
			$(".g-down-information").hide();
		}else{
			$("#g-keyword").hide();
			if($(".g-theme-ul li").length<=1){
				$(".g-theme-info,.g-theme-ul").hide();			
				var addHtml =  '<li>'+'<a href="http://m.qqtn.com/q/32370" style="background:#FF5B73; color:#fff; border:1px solid #FF5B73;">'+"手机QQ下载 "+'</a>'+'</li>';
				addHtml += '<li>'+'<a href="http://m.qqtn.com/q/33834">'+"应用宝下载"+'</a>'+'</li>';
				addHtml += '<li>'+'<a href="http://m.qqtn.com/q/109620">'+"装逼神器"+'</a>'+'</li>';
				$(".g-down-information ul li:last").after(addHtml)
			}	
		}
		
	}else{
		var keyName = "";
		var keySize = $(".g-keyword-cont").length;
		for(i=0;i<keySize;i++){
			keyName += '<li>'+'<b>'+$(".g-keyword-cont").eq(i).find("dl dt").text().replace(/\/s+/g,"")+'</b>'+'<i>'+'</i>'+'</li>';
		}
		$(".g-down-information ul li:last").after(keyName);
		$(".g-keyword-btn").append(keyName);
		$(".g-keyword-btn li:last").find("i").hide();
		$(".g-down-information ul li").click(function(){			
			var n = $(this).index();
			if(n>0){
				var themeTop = $("#g-keyword .g-game-recomd").offset().top;
				$("html,body").animate({scrollTop:themeTop},200);
				$("#g-keyword").find(".g-keyword-btn li").eq(n-1).addClass("m-hover").siblings("li").removeClass("m-hover")
				$("#g-keyword").find(".g-keyword-cont").eq(n-1).show().siblings(".g-keyword-cont").hide();	
			}
			
		})
	}

}
function loadCmsrandom(cmsjson)
{
	cmsjson=cmsjson.substr(0,cmsjson.length-1);	
	var cmslist = jQuery.parseJSON("["+cmsjson+"]");
	
	var allSize =  cmslist.length;
	var randomArray = [];	
	var randomHtml = '';
	for(i=0;i<5;i++){
		var getRandom = Math.ceil(Math.random()*allSize);
		getRandom = getRandom-1;
		if($.inArray(getRandom,randomArray) ==-1){			
			randomArray.push(getRandom);
			var imgSize = cmslist[getRandom].imgsize;
			var imgUrl = cmslist[getRandom]['img'].split(",");
			var imgAll = "";			
			for(n=0;n<imgSize;n++){						
				imgAll += '<i><img src="'+ imgUrl[n] +'" /></i>';	
			};
			randomHtml += '<li class="g-imgnum-'+imgSize+'"><a href="'+ cmslist[getRandom]['url'] +'" class="g-cd-right"><strong>'+ cmslist[getRandom]['name'] +'</strong><b>'+ imgAll +'</b></a></li>';
		}else{
			i--;	
		}		
	}
	$(".g-cms-content").after('<div class="g-cms-relatedcms"><dl class="g-title"><dt>精彩推荐</dt><dd></dd></dl><ul class="g-cms-duotu m-img-hide">'+randomHtml+'</ul></div>')

}


function moreimgLoading(){
	
	var p=2,PageCount=0;
	window.page_temp = 0;
	function ViewMore() {
		var webLink = window.location.href
		p++;
		$.ajax({
			type: "Get",
			url: "/sajax.asp",
			data: "action=5&t="+_pageMsg.catalogid+"&s=1&num=10&o=id&p="+p+"&ispre=1",
			success: function(msg){
				if(p <= eval( '(' + msg + ')').PageCount){
					listDate(msg);
					cmslistImghide();
				}else{
					$("#more").html("内容已加载完")	;
				}
			 }
		  });
	}
	function listDate(msg){
		
		var objJson =eval( '(' + msg + ')');
		var html = '';
		for(var i=0; i<objJson.Title.length;i++ )
		{
			var moreImg = "";
			var moreArry = objJson.previewimg[i].split(',');
			var moreImgsize = objJson.previewimg[i].split(',').length;
			for(o=0;o<moreImgsize;o++){
				moreImg += '<i><img src='+moreArry[o]+' /></i>';	
			}	
			html += '<li class="g-imgnum-'+objJson.imgcount[i]+'">';
			html += '<a href="/c/' + objJson.Id[i] + '" class="g-cd-right">';
			html += '<strong>'+objJson.Title[i]+'</strong>';
			html += '<b>'+moreImg+'</b>';
			html += '<em><i><span></span>'+objJson.DateAndTime[i].substr(0,objJson.DateAndTime[i].indexOf(' ')).replace(/\//g,"-")+'</i></em>';			
			html += '</a>';
			html += '</li>';
		  
		}
		$('#infocon').append(html);
		$("#more").html("上拉或点击查看更多...")
	};
	$(function () {
		$(window).scroll(function (e) {
			var bodyh = $("body").height();
			var scrtop = $("body").scrollTop();
			var winh = window.innerHeight;
			if (scrtop >= bodyh - winh) {
				ViewMore(); return false;
			}

		});
	});
}



// function addzhushou(){
//     //定义是否是商务包
//     var isAds=false; //是否为商务包
//     var downHref = window.location.href;//获取当前K页面地址
// 	//var noAd = ["6071.com","hsxyb.com","tj.tcyl77.com","tj.chenjianxiang.com","http://g.","http://tj.","moban.com","down1.qianghongbaoyo.com","yiwan.com","down2.guopan.cn","dl.guopan.cn","guopan.cn","duowan.com","ugame.uc.cn","ugame.9game.cn","360.cn","ewan.cn","anfan.com","duokoo.baidu.com","caohua.com","456.com.cn","miyugame.com","sifuba.net","btsysf.com","pyw.cn","sy217.com","17byh.com","xinkuai.com","s.qq.com","down.nntczn.com","down.bugeyu.com","open.play.cn","hgame.com","yxgames.com","ad677.com","sp.ulxue.com","xzsp.9pj8m.com","ydb.vaatn.com","xzsp3.zhanyu55.com","sp2.vaatn.com","sp2.ftaem.cn","tu.apk17.com","tt.wang6g.com","chenjianxiang.com","cyhy8.com","eoemarket.com","haowanyou.com","112wan.com","paojiao.cn","jiyw.com","66shouyou.com","downfx2.cmge.com","unionsy.com","phzdownload.gllkgame.com","hsxizhi.com","dlsutong.cn","602.com","ind9ed.com","63yx.com","6513.com","yileyoo.com","kingcheergame.com","gzjykj.com","songshugame.cn","myx916.com","ksyun.com","xmwan.com","fire2333.com","aliyuncs.com","youdiancx.com","myqcloud.com","yixin.im","yx.127.net","163.com","uri6.com","nikkigames.cn","papa91.com","84fk.com","dovoscape.com","108jz.com","693975.com","niuboli.com","tanwan.com","twanxi.com","huangxiu1.com","jjyx.com","guaishou66.com","duoyi.com","3737.com","leishengame.com","shangshiwl.com","aoingame.com","faxianapk.com","6xwan.com","7gwan.com","youximao.com","zwyouxi.com","happyelements.cn","qiyutianxia.com","yingxiong.com","play800.cn","tpxl.com","xiaodiyouxi.com","bamenzhushou.com","youximax.com","duomiwan.com","66bay.com","btgame99.com","xxzhushou.cn","dongyouxi666.com","277sy.com","wpscdn.cn","inmome.com","185sy.com","anfeng.com","tuanyx.com","game-center.cn","milu.com","xyzs.com","3733.com","kepan365.com","233xyx.com","xzsp3.nevehicle.cn","xzp10.lzljzky.com","sp16.850671.com","sp4.tools86.com","sp10.down5g.net"];
// 	var noAd = ["tj.chenjianxiang.com","guopan.cn","9game.cn"];

// 	//var Kname = $(".g-key-top h1").text();//获取当前K页面h1的名称
// 	if (downHref.indexOf('https://m.qqtn.com/k/') != -1) { //判断当前页面地址是属于k页面执行
// 		if(typeof(kinfo) != 'undefined'){ //页面存在定义kinfo字段获取值
// 			var kdown = kinfo.downurl; //获取第一个下载地址
// 			//var ksystem = kinfo.system;//获取第一个资源是否什么属性 安卓  苹果  pc  mac
// 			//console.log(kdown)
// 			if (kinfo.rootid == 16) {
// 				for(i=0;i<noAd.length;i++){
// 				  	if(kdown.indexOf(noAd[i]) > -1){			 
// 					  	isAds=true;
// 					}
// 				}
// 			}else{
// 				isAds=false;
// 			}
// 			if(typeof(kinfo.special) != 'undefined'){
// 			  if(kinfo.special == 4){isAds=false;}
// 			  if(kinfo.special == 10){isAds=false;}
// 			  if(kinfo.special == 11){isAds=false;}
// 			  if(kinfo.special == 20){isAds=false;}
// 			}

// 			var openurl = document.referrer.substr(0,20);//获取浏览器来路 
// 			//console.log(openurl)
// 			//console.log(document.referrer)
// 			var cityAr = ["北京"];//地区
// 		    $.ajax({
// 		        async : true,
// 		        url : "//api.map.baidu.com/location/ip?ak=OQW2009LCY9UUV7OMif84Me18OOQHL7x",
// 		        type : "get",
// 		        dataType : "jsonp", 
// 		        jsonp : 'callback', 
// 		        jsonpCallback: 'city', 
// 		        data : {
// 		            q : "javascript", 
// 		            count : 1
// 		         }, 
// 		        success: function(response, status, xhr){
// 		            var province = response.address.split('|')[1]
// 		            var city = response.address.split('|')[2]

// 					$(document).ready(function () {//页面加载完成后获取地址
// 		          		if (openurl.indexOf('qqtn') == -1 && openurl != '' && openurl.indexOf('baidu') == -1 && !isAds && /android/i.test(navigator.userAgent)) {
// 		          			//console.log(!isAds)
// 		           		 //不是本站和百度 并且不是商务包的地址 排除tags关联地址为down.asp
// 		             		if($.inArray(city, cityAr) == -1){//不在区域内
// 					            function setCookie(zhushou){//记录cookie
// 					                var Days = 1;
// 					                var exp = new Date();
// 					                exp.setTime(exp.getTime() + Days*48*60*60*1000);
// 					                document.cookie = zhushou + "="+ "laiso" + ";expires=" + exp.toGMTString();
// 					            }
// 			            		if (Cookie.get("zhushou") == "laiso"){ 
// 			              		}else{
// 			                 		var zhushouurl = 'http://tj.chenjianxiang.com/0006/6874'; //360助手
//                  					var youxiZs = 'http://tj.chenjianxiang.com/0006/6619'; //rootid=16 游戏分类下载 九游
// 			                 		var righturl = $(".box .g-cont-game").eq(0).find(".g-game-btn").attr("href");
// 			                 		//$(".box .g-cont-game").each(function(){
// 			                 			//$(".box .g-cont-game").eq(0).find(".g-game-btn").attr('href',zhushouurl);
// 				                    $(".box .g-cont-game").eq(0).find(".g-game-btn").attr('date-ci','0' );
// 			                 		//})

// 			                 		$(".box .g-cont-game").eq(0).find(".g-game-btn").click(function(){
// 					                    if ($(".box .g-cont-game").eq(0).find(".g-game-btn").attr('date-ci') == '0') {

// 					                    	 //2020-10-21新增 rootid 判断等于 游戏分类 ‘16’ 
// 					                    	if (typeof(kinfo.rootid) !== undefined) {
// 						                    	if (kinfo.rootid == 16) {
// 						                          $(".box .g-cont-game").eq(0).find(".g-game-btn").attr({'href':''+youxiZs+'','date-ci':'1'});
// 						                        }else{
// 						                          $(".box .g-cont-game").eq(0).find(".g-game-btn").attr({'href':''+zhushouurl+'','date-ci':'1'});
// 						                        }
// 					                        }else{
// 					                        	$(".box .g-cont-game").eq(0).find(".g-game-btn").attr({'href':''+zhushouurl+'','date-ci':'1'});
// 					                        }
					                    	
// 					                    }else{
// 					                        $(".box .g-cont-game").eq(0).find(".g-game-btn").attr('href',righturl);//
// 					                    }
// 					                }) 

// 			              		}
// 			              		setCookie("zhushou");
// 		            		}//通过cookie处理结束
// 		            	 }//判断区域结束
// 		        	});//通过来路判断结束
// 		        },error: function() {
// 		        //地区appi获取失败执行
// 		            $(document).ready(function () {//页面加载完成后获取地址
// 						//console.log(downHref.indexOf('https://m.qqtn.com/k/'))
// 		          		if (openurl.indexOf('qqtn') == -1 && openurl != '' && openurl.indexOf('baidu') == -1 && !isAds && /android/i.test(navigator.userAgent)) { 
// 		           		 //不是本站和百度 并且不是商务包的地址 排除tags关联地址为down.asp
// 		             		//if($.inArray(city, cityAr) == -1){//不在区域内
// 					                function setCookie(zhushou){//记录cookie
// 					                var Days = 1;
// 					                var exp = new Date();
// 					                exp.setTime(exp.getTime() + Days*48*60*60*1000);
// 					                document.cookie = zhushou + "="+ "laiso" + ";expires=" + exp.toGMTString();
// 					            }
// 			            		if (Cookie.get("zhushou") == "laiso"){ 
// 			              		}else{
// 			                 		var zhushouurl = 'http://tj.chenjianxiang.com/0006/6874'; //360助手
//                  					var youxiZs = 'http://tj.chenjianxiang.com/0006/6619'; //rootid=16 游戏分类下载 九游
// 			                 		var righturl = $(".box .g-cont-game").eq(0).find(".g-game-btn").attr("href");
// 			                 		//$(".box .g-cont-game").each(function(){
// 			                 			//$(".box .g-cont-game").eq(0).find(".g-game-btn").attr('href',zhushouurl);
// 				                    $(".box .g-cont-game").eq(0).find(".g-game-btn").attr('date-ci','0' );
// 			                 		//})

// 			                 		$(".box .g-cont-game").eq(0).find(".g-game-btn").click(function(){
// 					                	console.log("aaa")
// 					                    if ($(".box .g-cont-game").eq(0).find(".g-game-btn").attr('date-ci') == '0') {
					                    	
// 					                    	if (typeof(kinfo.rootid) !== undefined) {
// 						                    	if (kinfo.rootid == 16) {
// 						                          $(".box .g-cont-game").eq(0).find(".g-game-btn").attr({'href':''+youxiZs+'','date-ci':'1'});
// 						                        }else{
// 						                          $(".box .g-cont-game").eq(0).find(".g-game-btn").attr({'href':''+zhushouurl+'','date-ci':'1'});
// 						                        }
// 					                        }else{
// 					                        	$(".box .g-cont-game").eq(0).find(".g-game-btn").attr({'href':''+zhushouurl+'','date-ci':'1'});
// 					                        }

// 					                    }else{
// 					                        $(".box .g-cont-game").eq(0).find(".g-game-btn").attr('href',righturl);//
// 					                    }
// 					                }) 
			               
// 			              		}
// 			              		setCookie("zhushou");
// 		            		}//通过cookie处理结束
// 		            	 //}//判断区域注释了-------
// 		        	});//通过来路判断结束

// 		        }//地区api接口获取失败end

// 		    });//ajax结束





// 		} 
// 	}
// }