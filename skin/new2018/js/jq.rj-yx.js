
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



$("#f-number li").each(function () {
    var lengli = $(this).index()+1;
    $(this).find('i').append(lengli);
});


//精选分类切换
$(".g-links a").eq(0).addClass("m-hover");
$(".g-rank-links a").eq(0).addClass("m-hover");
$(".g-tab-nav a").eq(0).addClass("m-hover");

$(".f-click-bd").eq(0).addClass("block");
$(".f-rank-bd").eq(0).addClass("block"); 
$(".f-sy-bd").eq(0).addClass("block"); 

$(".f-click-a a").click(function() {
    $(this).addClass("m-hover").siblings().removeClass("m-hover");
    var contul = $(".f-click-a a").index(this);
    $(".f-click-bd ,.f-rank-bd ,.f-sy-bd").eq(contul).addClass("block").siblings().removeClass("block")
});



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


