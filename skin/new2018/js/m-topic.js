
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
$(".m-backTop").click(function(){$('body,html').animate({scrollTop:0},1000);return false;});


var urlhref = [];
    /*var cookLink = window.document.referrer;
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

    window.onload = function(){ 
    var knum = 8;
    $('.g-dome-bd .f-list-div').each(function (i) {
        var addheight = parseInt($(this).attr('data-addheight'));
        var klihei = $('.g-dome-bd').find('.on li').height() + addheight;
        console.log(klihei)
        var klinum = $(this).find('ul li').length;
        if (klinum === 0) {
            $(this).remove();
        } else if (klinum < (knum + 1)) {
            $(this).find('.g-scoll-bottom').remove();
        } else {
            $(this).find('.g-newgame-ul').height(klihei * knum);
        }
    });
    $('.g-scoll-bottom').click(function () {
        var addheight = parseInt($(this).parent().attr('data-addheight'));
        var klihei = $(this).prev('.g-newgame-ul').find('li').height() + addheight;
        var kdhei = $(this).prev('.g-newgame-ul').height();
        var kdnum = $(this).prev('.g-newgame-ul').find('li').length;
        if ((kdhei + (knum * klihei)) <= (klihei * kdnum)) {
            $(this).prev('.g-newgame-ul').height(kdhei + (knum * klihei));
        } else {
            $(this).prev('.g-newgame-ul').height(klihei * kdnum);
            $(this).text('暂无更多内容');
        }
    }); 

    var cynum =8;
    $('.hotcomp').each(function () {
        var cyli = $('.hotcomp').find('li').height()+12;
        var cylinum = $(this).find('li').length;
        if (cylinum < (cynum + 1)) {
            $('.g-scoll-bottom').remove();
        } else {
            $(this).height(cyli * cynum);
        }
    }) 
    $('.f-cy-click').click(function () {
        var cyli = $('.hotcomp').find('li').height()+12;
        var cyli2 = cyli/2
        var cyhei = $('.hotcomp').height();
        var cyg = $('.hotcomp').find('li').length;
       
        if ((cyhei + (cynum * cyli2)) <= (cyli2 * cyg)) {
                $('.hotcomp').height(cyhei + (cynum * cyli2));
            } else {
                $('.hotcomp').height(cyli2 * cyg);
                $(this).text('暂无更多内容');
            }

    })

    }



})