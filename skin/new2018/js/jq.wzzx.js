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


//个性大全切换
$(".g-dome-title li").eq(0).addClass("m-hover");
$(".g-dome-bd").eq(0).addClass("m-hover");
$(".g-dome-title li").click(function() {
    $(this).addClass("m-hover").siblings().removeClass("m-hover");
    var contul = $(".g-dome-title li").index(this);
    $(".g-dome-bd").eq(contul).addClass("m-hover").siblings().removeClass("m-hover")
});




$(".scroll_wrap li a").each(function () {
	$(this).find("img").eq(0).hide();

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
})


