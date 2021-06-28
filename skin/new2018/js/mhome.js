
if (typeof(pageAttr) == "undefined") {
  pageClass = "0"  
};

$(function(){
	$(".m-navshow-btn").click(function(){
	var navText = $(this).text().replace(/\s+/g,"");
	if(navText=="展开"){
		$(this).addClass("m-hover");
		$(".m-navshow-ul,.m-black").fadeIn("fast");
		$(this).text("收起");
		$("header").addClass("m-float");
		$("body").css("padding-top",45)
	}else{
		$(this).removeClass("m-hover");
		$(".m-navshow-ul,.m-black").fadeOut("fast")
		$(this).text("展开");
		$("header").removeClass("m-float");
		$("body").css("padding-top",0)
	}
})
$(".m-black").click(function(){
	$(".m-navshow-btn").removeClass("m-hover");
	$(".m-navshow-ul,.m-black").fadeOut("fast")
	$(".m-navshow-btn").text("展开");
	$("header").removeClass("m-float");
	$("body").css("padding-top",0)
})

//返回顶部
$("body").append("<a href=\"javascript:;\" class=\"m-backTop\"></a>");	
$(window).scroll(function(){
	if($(window).scrollTop()>=300){
		$(".m-backTop").show();
	}else if($(window).scrollTop()<300){
		$(".m-backTop").hide()
	}
});
$(".m-backTop").click(function(){$("html,body").animate({scrollTop:$('body').offset().top}, 500);});

$("#f-number li").each(function () {
    var lengli = $(this).index()+1;
    $(this).find('i').append(lengli);
});



if (pageAttr.pagename == "index") {
	//精选分类切换
	$(".f-click-a a").eq(0).addClass("m-hover");
	$(".f-click-bd").eq(0).addClass("block");
	$(".g-rank-links a").eq(0).addClass("m-hover");
	$(".g-rank-bd").eq(0).addClass("block");
	$(".g-cs-top a").eq(0).addClass("m-hover");
	$(".g-cs-bd").eq(0).addClass("block")
	$(".f-click-a a").click(function() {
	    $(this).addClass("m-hover").siblings().removeClass("m-hover");
	    var contul = $(".f-click-a a").index(this);
	    $(".f-click-bd ,.g-rank-bd ,.f-sy-bd").eq(contul).addClass("block").siblings().removeClass("block")
	});
	$(".g-cs-top a").click(function() {
	    $(this).addClass("m-hover").siblings().removeClass("m-hover");
	    var contul = $(".g-cs-top a").index(this);
	    $(".g-cs-bd").eq(contul).addClass("block").siblings().removeClass("block")
	});

	//随机颜色
	var likeSize = $(".g-peo-like ul li").length;
	var likeSizeL = Math.ceil(($(".g-peo-like ul li").length) / 2);
	aArray = []
	for (i = 1; i < likeSizeL; i++) {
		var n = parseInt(Math.random() * likeSize);
		if ($.inArray(n, aArray) == -1) {
			aArray.push(n);
			$(".g-peo-like").each(function() {
				$(this).find("ul li a").eq(n).addClass("m-color" + i);
			})
		} else {
			i--;
			continue;
		}
	}
}

if (pageAttr.pagename == "classlist") {
	//精选分类切换
	$(".f-click-a a").eq(0).addClass("m-hover");
	$(".f-sy-bd").eq(0).addClass("block")
	$(".f-click-a a").click(function() {
	    $(this).addClass("m-hover").siblings().removeClass("m-hover");
	    var contul = $(".f-click-a a").index(this);
	    $(".f-click-bd ,.g-rank-bd ,.f-sy-bd").eq(contul).addClass("block").siblings().removeClass("block")
	});

	//分类展开关闭
	var num = $(".m-sflnav li").length;
     if(num > 6){
       $(".m-sflnav ul").css("height","126px");
       var li = $(".m-sflnav ul li:last");
console.log(li)
       var li_more = $(".more");
       $(".m-sflnav ul li").eq(11).before(li);
       $(".more").bind("click",function(){
       if($(".m-sflnav ul").height() == 126){
	      $(".m-sflnav ul").css("height","auto");
		  li_more.addClass("rotate");
	      li_more.appendTo(".m-sflnav ul");
	   }else{
	      $(".m-sflnav ul").css("height","126px");
		  li_more.removeClass("rotate");
	      $(".m-sflnav ul li").eq(11).before(li); 	
	   }
     });
   }else{
	  $(".m-sflnav .more").hide(); 
   }
}


//腾讯专区js
if (pageAttr.pagename == "qqzq") {
	$(".f-tab-click span").click(function() {
	    $(this).addClass("m-hover").siblings().removeClass("m-hover");
	    var contul = $(".f-tab-click span").index(this);
	    $(".f-tab-ul ,.g-yxzq").eq(contul).addClass("block").siblings().removeClass("block");//最新应用
	});

	if(/iphone|ipad/i.test(navigator.userAgent)){
		$("#f-iosinfo").show();
		$("#f-azinfo").hide();
		
		//最新应用
		$(".f-zxyy .f-tab-click span").eq(0).text("苹果");
		$(".f-zxyy .f-tab-click span").eq(1).text("安卓");
		$(".f-zxyy #azbox").insertAfter($(".f-zxyy #iosbox"));
		$(".f-zxyy #iosbox").addClass("block").siblings().removeClass("block");

		//手游推荐
		$(".f-sytj .f-tab-click span").eq(0).text("苹果");
		$(".f-sytj .f-tab-click span").eq(1).text("安卓");
		$(".f-sytj #azbox").insertAfter($(".f-sytj #iosbox"));
		$(".f-sytj #iosbox").addClass("block").siblings().removeClass("block");

		//腾讯软件推荐
		$(".f-rjtj .f-tab-click span").eq(0).text("苹果");
		$(".f-rjtj .f-tab-click span").eq(1).text("安卓");
		$(".f-rjtj #azbox").insertAfter($(".f-rjtj #iosbox"));
		$(".f-rjtj #iosbox").addClass("block").siblings().removeClass("block");

		//排行榜
		$("#f-ph-az").hide();
	}else{
		$("#f-iosinfo").hide();
		$("#f-azinfo").show();

		//排行榜
		$("#f-ph-ios").hide();
	}
}





})


