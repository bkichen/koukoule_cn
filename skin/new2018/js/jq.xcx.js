
if (typeof(Page) == "undefined") {
  Page = "0"  
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



$("#g-look-desc").click(function(){
	$("body").append("<div class=\"txthtml\"></div>");	
	var txthtml = $(".g-key-font").html();
	$(".txthtml").prepend(txthtml);
	$(".txthtml").append("<b id=\"m-close-desc\">关闭</b>");	
	$("body").append("<b id=\"m-alert-bg\"></b>");	
	$("#m-close-desc").click(function(){
		$(".txthtml").remove();
		$("#m-alert-bg").remove();
	})
})

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

//导航
var mentext = window.location.href;
	$(".g-nav-box a").each(function(){
		var menturl =  $(this).attr('href');
		if(mentext.indexOf(menturl) != -1){
			$(this).addClass('hover');
		}								
	})
	
//首页切换
$(".g-cate-tiele li:first").addClass('m-hover');
$(".g-cate-list").hide();
$(".g-cate-list").eq(0).show();
$(".g-cate-tiele li:eq(0)").click(function () {
		$(this).addClass("m-hover").siblings().removeClass("m-hover");
		$(".g-cate-list").eq(0).show();$(".g-cate-list").eq(1).hide();$(".g-cate-list").eq(2).hide();
	});

$(".g-cate-tiele li:eq(1)").click(function () {
		$(this).addClass("m-hover").siblings().removeClass("m-hover");
		$(".g-cate-list").eq(1).show();$(".g-cate-list").eq(0).hide();$(".g-cate-list").eq(2).hide();
	});
$(".g-cate-tiele li:eq(2)").click(function () {
		$(this).addClass("m-hover").siblings().removeClass("m-hover");
		$(".g-cate-list").eq(2).show();$(".g-cate-list").eq(0).hide();$(".g-cate-list").eq(1).hide();
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


if(Page==4) //更多页
{
var knum = 6;
    var klihei = $('.f-list li').height()+26;
    $('.f-list .f-list-div').each(function (i) {
        var klinum = $(this).find('ul li').length;
        if (klinum === 0) {
            $(this).remove();
        } else if (klinum < (knum + 1)) {
            $(this).find('.g-scoll-bottom').remove();
        } else {
            $(this).find('.g-newgame-ul').height(klihei * knum);
        }
        $('.g-scoll-bottom').click(function () {
            var kdhei = $(this).prev('.g-newgame-ul').height();
            var kdnum = $(this).prev('.g-newgame-ul').find('li').length;
            if ((kdhei + (knum * klihei)) <= (klihei * kdnum)) {
                $(this).prev('.g-newgame-ul').height(kdhei + (knum * klihei));
            } else {
                $(this).prev('.g-newgame-ul').height(klihei * kdnum);
                $(this).text('暂无更多内容');
            }
        });

    });
}


if(Page==2) //列表页
{
	var introduce = $(".g-key-introd .g-key-cont").height();
	$(".g-key-introd .g-key-cont").height(64);
	$(".g-key-introd").click(function(){
		var btnText = $(this).find(".m-key-showcont").text().replace(/\s+/g,"");
		if(btnText=="查看更多"){
			$(this).find(".g-key-cont").animate({height:introduce},200)
			$(this).find(".m-key-showcont").text("收起").append("<b></b>");
		}else{
			$(this).find(".g-key-cont").animate({height:64},200)
			$(this).find(".m-key-showcont").text("查看更多").append("<span></span>");
		}
	});

	


 //条数
    var knum = 10;
	var gxcx = $(".g-cate-list li").length;
	var hxcx = $(".g-cate-list li").height()+1;
      
      if(gxcx >= knum){
		$(".g-cate-list").after('<p class="more-cont"><a href="javascript:;" id="more" class="more">点击查看更多...</a></p>');
		$(".g-cate-list").height(hxcx*knum);
		}

      $('#more').click(function () {
            var kdhei = $('.g-cate-list').height();
            var kdnum = $('.g-cate-list').find('li').length;
            if ((kdhei + (knum * hxcx)) <= (hxcx * kdnum)) {
                $('.g-cate-list').height(kdhei + (knum * hxcx));
            } else {
                $('.g-cate-list').height(hxcx * kdnum);
                $(this).text('暂无更多内容');
            }
        }); 




}


if(Page==3) //软件页
{
	
	//详细页点击展开关闭
	$(".f-btns").click(function(){
		$(".g-fix-cont").show();
	})
	$(".g-fix-contbg ,.rkclose").click(function(){
		$(".g-fix-cont").hide();
	})

	//点击复制小程序名称
	var c = document.getElementById("g-xcx-name");
    var s=c.innerHTML;
    var clipboard = new Clipboard('.cnameBtn', {
        text: function() {
            return s;
        }
    });
    clipboard.on('success', function(e) {
        $("#errormsg").show().delay (1800).fadeOut ();
    });

    clipboard.on('error', function(e) {
        console.log(e);
    });

	//图片点击放大
	var touimgnum = $("#content img, .g-brief-cont img").length;
	var imgurl = ''
	if(touimgnum>1){
		
			$("#content img, .g-brief-cont img").each(function(i){
			    imgurl = $(this).attr("src")
			    if(imgurl.indexOf('qqtn.com')!= -1){ 
				 //var imguleft = imgurl.split(".")[2].split("_")[0].substr(11,36)
				 var imgurt = imgurl.split("!")[0]
			
				 var imgu =  "https://pic.qqtn.com"+imgurt+"."+imgurl.split(".")[3]

				 //$(this).attr("data-original",imgu);
				//$(this).wrap('<span class="s-img"><a href="'+imgu+'" class="swipebox"></a></span>')
				//if(imgurl.split(".")[3] == "gif"){ 
				 	$(this).attr("data-original",imgurt);
					$(this).wrap('<em class="s-img"><a href="'+imgurt+'" class="swipebox"></a></em>')
				 //}else{
				 	//$(this).attr("data-original",imgu);
					//$(this).wrap('<span class="s-img"><a href="'+imgu+'" class="swipebox"></a></span>')
				 //}	

			 }
			});		
			$('.s-img').swipebox();	//执行放大控件		
			$(".m-she").hide();
			$("#swipebox-download").css("margin-left","-50px")		
	}		
}


})