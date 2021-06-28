$(function(){
	$(".g-img-dome").slide({titCell:".g-dome-top ul",mainCell:".g-dome-bd ul",autoPage:true,effect:"left",titOnClassName:"m-hover"});//banner
	$(".g-rank").slide({titCell:".g-title-li li",mainCell:".g-rank-bd",titOnClassName:"m-hover"});//排行榜

	if (gexing.pageName !== 'QQ皮肤') {
		$(".g-headimg-dome").slide({mainCell:".g-content ul",autoPage:true,effect:"left",scroll:5,vis:5});
	}else{
		$(".g-headimg-dome").slide({mainCell:".g-content ul",autoPage:true,effect:"left",scroll:6,vis:6});
	}
	$(".g-imgdome-cont").slide({mainCell:".g-img-content ul",autoPage:true,effect:"left",scroll:5,vis:5});
	$(".g-skin-dome").slide({mainCell:".g-skin-cont ul",autoPage:true,effect:"left",scroll:5,vis:5});  
		   
   
	if(gexing.gxPage != "index"){	
		//添加浮动导航代码
		var navHtml = "";
		$(".g-cont-box").each(function(){
			var navName = $(this).find(".g-tit-name em").text();	
			navHtml += '<li>'+navName+'</li>'
		})
		navHtml = '<div class="m-float-nav"><ul>'+ navHtml +'</ul><i class="m-solid"></i></div>';
		$("body").append(navHtml);
		var liHeight = $(".m-float-nav li").outerHeight(true);
		var liSize = $(".m-float-nav li").length;
		var ulHeight = (liHeight*liSize)-14;
		$(".m-float-nav ul").height(ulHeight)
		
		//滚动监听
		var plateSize = $(".g-cont-box").length-1;
		var platethreeTop = $(".g-cont-box").eq(plateSize-1).offset().top+42;
		$(window).scroll(function(){
			for(i=0;i<plateSize;i++){
				var plateTop = $(".g-cont-box").eq(i).offset().top;			
				if($(window).scrollTop()>=plateTop && $(window).scrollTop()<platethreeTop){						
					$(".m-float-nav ul li").eq(i).addClass("m-hover").siblings("li").removeClass("m-hover");	
				}else if($(window).scrollTop()>=platethreeTop){
					$(".m-float-nav ul li:last").addClass("m-hover").siblings("li").removeClass("m-hover");	
				}	
			}
		})
		
		//点击跳转
		$(".m-float-nav ul li").click(function(){
			var n = $(this).index();
			var offsetTop = $(".g-cont-box").eq(n).offset().top;
			$("body,html").animate({scrollTop:offsetTop},200);
		})

	}	   

	//添加数字
	$(".m-cont-right").each(function(){
		var liSize = $(this).find("li").length;
		for(i=0;i<liSize;i++){
			$(this).find("li span").eq(i).append(i+1);
		}			
	});


		   
});



	
