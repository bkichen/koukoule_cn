$(function(){
	 //导航点击附加背景
	$(".g-navlist ul li").each(function(){
		var navName = $(this).find("a").text();
		if(gexing.pageName == navName){
			$(this).addClass("hover");	
		}
	});
	
	
	//添加数字
	$(".m-ph-list").each(function(){
		var liSize = $(this).find("li").length;
		for(i=0;i<liSize;i++){
			$(this).find("li em").eq(i).append(i+1);
		}			
		
	});
	


	//列表判断无图片
	$(".g-gxlist-article2020 li").each(function(){
		var lenimg = $(this).find(".m-left-img img").attr("src");
		if (lenimg == 'https://www.qqtn.com/skin/NoPic.jpg') {
			$(this).find("a.m-left-img").hide();
		}
	});
	
	if(typeof(gexing.pagelist) != 'undefined'){
		if (gexing.pagelist == 'list') {
			//滚动悬浮右侧
			var rihtheight = $("#f-hotlist").offset().top;
			$(window).scroll(function() {
				var s = $(window).scrollTop();
				if(s > rihtheight) {
					$("#f-hotlist").addClass('f-fiex');
				} else {
					$("#f-hotlist").removeClass('f-fiex');
				};
			});
		}
	}

	
});