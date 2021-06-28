var tabbli = $(".tabnav i");
    tabbli.mouseover(function(){
    $(this).addClass("hover").siblings().removeClass("hover");	
		var index = tabbli.index(this);
		$(".tabcon").eq(index).fadeIn(200).siblings(".tabcon").fadeOut(200);		
});	

var headerHeight = $('header').outerHeight(true);
$(document).scroll(function () {
    var $nav = $('nav');
    if($(document).scrollTop() >= headerHeight) {
        $nav.css({'position': 'fixed'});
        $nav.next().css({'margin-top': $nav.outerHeight(true)});
    } else {
        $nav.css({'position': ''});
        $nav.next().css({'margin-top': ''});
    }
});

 $(".gd").click(function(){
	 $(".softcontent").css("height","auto");
	 $(this).hide();
	 $(".sq").css("display","inline-block");
});
 $(".sq").click(function(){
	 $(".softcontent").css("height","68px");
	 $(this).hide();
	 $(".gd").show();
});