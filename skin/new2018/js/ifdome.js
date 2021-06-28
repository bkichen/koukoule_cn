if(typeof(Page) == "undefined" || typeof(Page) == "object"){
  Page = "0"  
}

$(function(){

	systemPaix();
	scroll();
	comment();//评论
	downShowcontent();

});

uniq = function(e) {
   // e.sort();
    for (var n = [e[0]], t = 1; t < e.length; t++) e[t] !== n[n.length - 1] && n.push(e[t]);
    return n
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

	var azAll = "";	var azAllsize = 0;	var azyxAll = "";	var azyxAllsize = 0;  var azrjAll = ""; var azrjAllsize = 0;
  var iosAll = ""; var iosAllsize = 0;  var iosyxAll = ""; var iosyxAllsize = 0;  var iosrjAll = ""; var iosrjAllsize = 0;
  var pcAll = ""; var pcAllsize = 0;  var pcyxAll = ""; var pcyxAllsize = 0;  var pcrjAll = ""; var pcrjAllsize = 0;

	$(".g-keyword .g-cont-game").each(function(){
		var gameSystem = $(this).attr("data-sys");	
		var rootid = $(this).attr("data-rot");	
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
		}

    //安卓全部
		if (rootid == "15" || rootid == "16") {
        azAllsize++;	
        var gameHtml = $(this).html();			
        azAll += '<div class="g-cont-game m-nodown-box" data-system="'+gameSystem+'" data-rot="'+rootid+'">'+gameHtml+'</div>';	
     }
     //安卓软件
     if (rootid == "15") {
        azrjAllsize++;  
        var gameHtml = $(this).html();      
        azrjAll += '<div class="g-cont-game m-nodown-box" data-system="'+gameSystem+'" data-rot="'+rootid+'">'+gameHtml+'</div>'; 
     }
     //安卓游戏
     if (rootid == "16") {
        iosAllsize++;  
        var gameHtml = $(this).html();      
        azyxAll += '<div class="g-cont-game m-nodown-box" data-system="'+gameSystem+'" data-rot="'+rootid+'">'+gameHtml+'</div>'; 
     }


     //ios全部
    if (rootid == "18" || rootid == "19") {
        iosAll++;  
        var gameHtml = $(this).html();      
        iosAll += '<div class="g-cont-game m-nodown-box" data-system="'+gameSystem+'" data-rot="'+rootid+'">'+gameHtml+'</div>'; 
     }
     //ios软件
     if (rootid == "18") {
        iosrjAllsize++;  
        var gameHtml = $(this).html();      
        iosrjAll += '<div class="g-cont-game m-nodown-box" data-system="'+gameSystem+'" data-rot="'+rootid+'">'+gameHtml+'</div>'; 
     }
     //ios游戏
     if (rootid == "19") {
        iosyxAllsize++;  
        var gameHtml = $(this).html();      
        iosyxAll += '<div class="g-cont-game m-nodown-box" data-system="'+gameSystem+'" data-rot="'+rootid+'">'+gameHtml+'</div>'; 
     }

     //pc全部
    if (rootid != "18" && rootid != "19" && rootid != "15" && rootid != "16") {
        pcAllsize++;  
        var gameHtml = $(this).html();      
        pcAll += '<div class="g-cont-game m-nodown-box" data-system="'+gameSystem+'" data-rot="'+rootid+'">'+gameHtml+'</div>'; 
     }
     //ios软件
     if (rootid != "18" && rootid != "19" && rootid != "15" && rootid != "16" && rootid != "8") {
        pcrjAllsize++;  
        var gameHtml = $(this).html();      
        pcrjAll += '<div class="g-cont-game m-nodown-box" data-system="'+gameSystem+'" data-rot="'+rootid+'">'+gameHtml+'</div>'; 
     }
     //ios游戏
     if (rootid == "8") {
        pcyxAllsize++;  
        var gameHtml = $(this).html();      
        pcyxAll += '<div class="g-cont-game m-nodown-box" data-system="'+gameSystem+'" data-rot="'+rootid+'">'+gameHtml+'</div>'; 
     }

	});

  //var qbhtml = "<a class=\"m-game-title m-all\">"+"全部"+"</a>";
	var androidTitle = "<a class=\"m-game-title m-az\">"+"安卓"+"</a>";
	var iosTitle = "<a class=\"m-game-title m-ios\">"+"苹果"+"</a>";
	var pcTitle = "<a class=\"m-game-title m-pc\">"+"电脑"+"</a>";
	var yxrj = '<div class="f-yxrj"><font>全部</font><font>软件</font><font>游戏</font></div>';
	//var otherTitle = "<a class=\"m-game-title m-qt\">"+"其他"+"</a>";
	$(".g-keyword").html('');
	if (isIphone&&iosSize>=0){
		$(".g-keyword").append(''+yxrj+'<div class="f-clickdoem">'+iosTitle+androidTitle+pcTitle+'</div><div class="f-ios-box f-numbox f-all"><ul>'+iosHtml+'</ul><div class="lookmore">更多</div>');
		if(androidSize>=0){
			$(".g-keyword").append('<div class="f-az-box f-numbox f-all"><ul>'+androidHtml+'</ul><div class="lookmore">更多</div></div>')
		}
		if(pcSize>=0){
			$(".g-keyword").append('<div class="f-pc-box f-numbox f-all"><ul>'+pcHtml+'</ul><div class="lookmore">更多</div></div>')	
		}
		//$(".g-keyword").append('<div class="f-all-az f-numbox f-allbox" data-tit="安卓全部"><ul>'+azAll+'</ul><div class="lookmore">更多</div></div>');
    $(".g-keyword").append('<div class="f-az-box f-numbox" data-tit="安卓软件"><ul>'+azrjAll+'</ul><div class="lookmore">更多</div></div>');
    $(".g-keyword").append('<div class="f-az-box f-numbox" data-tit="安卓游戏"><ul>'+azyxAll+'</ul><div class="lookmore">更多</div></div>');

    //$(".g-keyword").append('<div class="f-all-ios f-numbox f-allbox" data-tit="苹果全部"><ul>'+iosAll+'</ul><div class="lookmore">更多</div></div>');
    $(".g-keyword").append('<div class="f-ios-box f-numbox" data-tit="苹果软件"><ul>'+iosrjAll+'</ul><div class="lookmore">更多</div></div>');
    $(".g-keyword").append('<div class="f-ios-box f-numbox" data-tit="苹果游戏"><ul>'+iosyxAll+'</ul><div class="lookmore">更多</div></div>');

    //$(".g-keyword").append('<div class="f-all-pc f-numbox f-allbox" data-tit="PC全部"><ul>'+pcAll+'</ul><div class="lookmore">更多</div></div>');
    $(".g-keyword").append('<div class="f-pc-box f-numbox" data-tit="PC软件"><ul>'+pcrjAll+'</ul><div class="lookmore">更多</div></div>');
    $(".g-keyword").append('<div class="f-pc-box f-numbox" data-tit="PC游戏"><ul>'+pcyxAll+'</ul><div class="lookmore">更多</div></div>');
		  
	}else{
		if(androidSize>=0){
			$(".g-keyword").append(''+yxrj+'<div class="f-clickdoem">'+androidTitle+iosTitle+pcTitle+ keyAd +'</div><div class="f-az-box f-numbox f-all"><ul>'+androidHtml+'</ul><div class="lookmore">更多</div>');
		}
		if(iosSize>=0){
			$(".g-keyword").append('<div class="f-ios-box f-numbox f-all"><ul>'+iosHtml+'</ul><div class="lookmore">更多</div></div>')			
		}
		if(pcSize>=0){
			$(".g-keyword").append('<div class="f-pc-box f-numbox f-all"><ul>'+pcHtml+'</ul><div class="lookmore">更多</div></div>')	
		}
    //$(".g-keyword").append('<div class="f-all-az f-numbox f-allbox" data-tit="安卓全部"><ul>'+azAll+'</ul><div class="lookmore">更多</div></div>');
    $(".g-keyword").append('<div class="f-az-box f-numbox" data-tit="安卓软件"><ul>'+azrjAll+'</ul><div class="lookmore">更多</div></div>');
    $(".g-keyword").append('<div class="f-az-box f-numbox" data-tit="安卓游戏"><ul>'+azyxAll+'</ul><div class="lookmore">更多</div></div>');

    //$(".g-keyword").append('<div class="f-all-ios f-numbox f-allbox" data-tit="苹果全部"><ul>'+iosAll+'</ul><div class="lookmore">更多</div></div>');
    $(".g-keyword").append('<div class="f-ios-box f-numbox" data-tit="苹果软件"><ul>'+iosrjAll+'</ul><div class="lookmore">更多</div></div>');
    $(".g-keyword").append('<div class="f-ios-box f-numbox" data-tit="苹果游戏"><ul>'+iosyxAll+'</ul><div class="lookmore">更多</div></div>');

    //$(".g-keyword").append('<div class="f-all-pc f-numbox f-allbox" data-tit="PC全部"><ul>'+pcAll+'</ul><div class="lookmore">更多</div></div>');
    $(".g-keyword").append('<div class="f-pc-box f-numbox" data-tit="PC软件"><ul>'+pcrjAll+'</ul><div class="lookmore">更多</div></div>');
    $(".g-keyword").append('<div class="f-pc-box f-numbox" data-tit="PC游戏"><ul>'+pcyxAll+'</ul><div class="lookmore">更多</div></div>');

	}

	//读取全部数据大于12个
   $(".g-keyword").length && ($(".g-keyword .f-numbox").each(function() {
        var e = [],
        n = [];
        if ($(this).find(".g-cont-game").each(function() {
            e.push($(this).prop("outerHTML"))
        }), e.length) {
            n = uniq(e);
            for (var t = "",
            c = 0; c < n.length; c++) t += n[c];              
            $(this).find("ul").html(t).show()
        }
        n.length < 10 && $(this).find(".lookmore").remove();
    }), $(".f-numbox ul").each(function() {
        $(this).find(".g-cont-game").slice(0, 10).show();
    }), this.companyRecTabTit())


}

$(function(){
	 $(".f-clickdoem a").eq(0).addClass("m-hover");
   $(".f-yxrj font").eq(0).addClass("m-hover");
	 $(".f-clickdoem").next().addClass("on");
   $(".g-down-box .g-title em font").text($(".g-keyword .on .g-cont-game").length);


   var dqname = $(".f-clickdoem .m-hover").text();
   $(".f-yxrj font").click(function(){
     $(this).addClass("m-hover").siblings().removeClass("m-hover");
     var inx2 = $(".f-yxrj font").index(this);
     if (dqname == "安卓") {
        $(".f-az-box").eq(inx2).addClass("on").siblings().removeClass("on");
        $(".g-down-box .g-title em font").text($(".g-keyword .on .g-cont-game").length);
     }else if (dqname == "苹果") {
        $(".f-ios-box").eq(inx2).addClass("on").siblings().removeClass("on");
        $(".g-down-box .g-title em font").text($(".g-keyword .on .g-cont-game").length);
     }
   });

   $(".f-clickdoem a").click(function(){
      $(".f-yxrj font").eq(0).addClass("m-hover").siblings().removeClass("m-hover");
      $(this).addClass("m-hover").siblings().removeClass("m-hover");
      var contul = $(".f-clickdoem a").index(this);
      $(".f-all").eq(contul).addClass("on").siblings().removeClass("on");
      $(".g-down-box .g-title em font").text($(".g-keyword .on .g-cont-game").length);
      var txt = $(this).text();
      $(".f-yxrj font").click(function(){
          $(this).addClass("m-hover").siblings().removeClass("m-hover");
          var inx = $(".f-yxrj font").index(this);
          if (txt == "安卓") {
              $(".f-az-box").eq(inx).addClass("on").siblings().removeClass("on");
              $(".g-down-box .g-title em font").text($(".g-keyword .on .g-cont-game").length);
          }else if (txt == "苹果") {
              $(".f-ios-box").eq(inx).addClass("on").siblings().removeClass("on");
              $(".g-down-box .g-title em font").text($(".g-keyword .on .g-cont-game").length);
          }else if (txt == "电脑") {
              $(".f-pc-box").eq(inx).addClass("on").siblings().removeClass("on");
              $(".g-down-box .g-title em font").text($(".g-keyword .on .g-cont-game").length);
          }
      });
   });

  // $(".m-all").click(function(){
  //   //$(".f-yxrj font").removeClass("m-hover");
  //   $(this).addClass("m-hover").siblings().removeClass("m-hover");
  //   $(".f-all").addClass("on").siblings().removeClass("on");
  //   $(".g-down-box .g-title em font").text($(".g-keyword .on .g-cont-game").length);
  // })
	// $(".m-az").click(function(){
	// 	$(".f-yxrj font").eq(0).addClass("m-hover").siblings().removeClass("m-hover");
	// 	$(this).addClass("m-hover").siblings().removeClass("m-hover");
	// 	var contul = $(".m-az").index(this);
	// 	$(".f-az-box").eq(contul).addClass("on").siblings().removeClass("on");
 //    $(".g-down-box .g-title em font").text($(".g-keyword .on .g-cont-game").length);
	// })
	// $(".m-ios").click(function(){
	// 	$(".f-yxrj font").eq(0).addClass("m-hover").siblings().removeClass("m-hover");
	// 	$(this).addClass("m-hover").siblings().removeClass("m-hover");
	// 	var contul = $(".m-az").index(this);
	// 	$(".f-ios-box").eq(contul).addClass("on").siblings().removeClass("on");
 //    $(".g-down-box .g-title em font").text($(".g-keyword .on .g-cont-game").length);
	// })
	// $(".m-pc").click(function(){
	// 	$(".f-yxrj font").eq(0).addClass("m-hover").siblings().removeClass("m-hover");
	// 	$(this).addClass("m-hover").siblings().removeClass("m-hover");
	// 	var contul = $(".m-az").index(this);
	// 	$(".f-pc-box").eq(contul).addClass("on").siblings().removeClass("on");
 //    $(".g-down-box .g-title em font").text($(".g-keyword .on .g-cont-game").length);
	// })
	// if($(".f-pc-box").find("div").length==0){
	// 	$(".m-pc").remove();
	// }
	// if($(".f-az-box").find("div").length==0){
	// 	$(".m-az").remove();
	// }
	// if($(".f-ios-box").find("div").length==0){
	// 	$(".m-ios").remove();
	// }
	// if($(".f-ios-box").find("div").length==0 && $(".f-az-box").find("div").length==0){
	// 	$(".f-pc-box").addClass("on");
	// 	$(".f-clickdoem a").addClass("m-hover")
	// }
	// if($(".f-ios-box").find("div").length==0 && $(".f-pc-box").find("div").length==0){
	// 	$(".f-az-box").addClass("on");
	// 	$(".f-clickdoem a").addClass("m-hover")
	// }
	// if($(".f-az-box").find("div").length==0 && $(".f-pc-box").find("div").length==0){
	// 	$(".f-ios-box").addClass("on");
	// 	$(".f-clickdoem a").addClass("m-hover")
	// }
	// if($(".f-ios-box").find("div").length==0){
	// 	$(".m-az").addClass("m-hover")
	// 	$(".f-az-box").addClass("on")
	// }
	// if($(".f-az-box").find("div").length==0){
	// 	$(".m-ios").addClass("m-hover")
	// 	$(".f-ios-box").addClass("on")
	// }

	// var ali = $(".f-clickdoem a").length;
	// if(ali <= 1){
	// 	$(".f-clickdoem").addClass("none")
	// }


//返回上一页
var urlhref = [];
	var cookLink = window.document.referrer;
	urlhref = cookLink.split(".");
	var text = "qqtn";
	if($.inArray(text,urlhref)==-1){
		$(".g-back-home").attr("href","/");
	}else{
		$(".g-back-home").attr("href",cookLink);
	}
	$(".g-top-full .g-back-home,.g-list-back").click(function(){
		history.back(-1);
	})



});


function companyRecTabTit(){
  companyRecMore();
 // companyRecTab();
}
function companyRecMore() {
  $(".f-numbox .lookmore").click(function() {
      var e = $(this).parent().find("ul");
      n = e.find(".g-cont-game:visible").length,
      e.find(".g-cont-game").slice(n, n + 10).show(),
      e.find(".g-cont-game:visible").length >= e.find(".g-cont-game").length && $(this).remove();
  })
}



function downShowcontent(){
   //window.onload=function(){
    // 要获取图片高度，需要等加载完再执行
    var contentHeight = $(".g-comp-cont").height();
    $(".g-comp-cont").height(140);
    $(".g-comp-cont").addClass("on-hover");
    $(".m-show-content p").click(function(){
      var btnText = $(this).text().replace(/\s+/g,"")
      if(btnText=="加载全部内容" || btnText=="点击查看更多"){
        $(".g-comp-cont").animate({height:contentHeight},300);
        $(".g-comp-cont").removeClass("on-hover");
        $(this).text("点击收起内容").append('<b class="u-up"></b>')
      }else{
        $(".g-comp-cont").animate({height:140},300);
        $(this).text("加载全部内容").append('<b></b>');
        $(".g-comp-cont").addClass("on-hover");
        var offsetTop = $(".g-down-introd").offset().top;
        $("body,html").animate({scrollTop:offsetTop},300)
      }
    })
 // }

}


function scroll(){

	var dhtxt = "<div class=\"f-top\"><div class=\"g-dhnav clearfix\"><p class=\"on\">介绍</p>|<p>下载</p>|<p>资讯</p>|<p>评论</p>|<p>其他</p></div></div>";
	$('body').append(dhtxt);

	$(window).scroll(function(){
		if($(window).scrollTop()>=50){
			$(".f-top").show();
		}else{
			$(".f-top").hide();
		}

		if ($(window).scrollTop() >= $('.g-top-full').offset().top) {
			$(".f-top p").eq(0).addClass("on").siblings().removeClass("on");
		}
		if ($(window).scrollTop() >= $('.f-downbox').offset().top-42) {
			$(".f-top p").eq(1).addClass("on").siblings().removeClass("on");
		}
		if ($(window).scrollTop() >= $('.g-cms-box').offset().top-42) {
			$(".f-top p").eq(2).addClass("on").siblings().removeClass("on");
		}
		if ($(window).scrollTop() >= $('.m-comment').offset().top-42) {
			$(".f-top p").eq(3).addClass("on").siblings().removeClass("on");
		}
		if ($(window).scrollTop() >= $('.f-qtcs').offset().top-42) {
			$(".f-top p").eq(4).addClass("on").siblings().removeClass("on");
		}

	});

   $(".g-dhnav p").each(function() {
      $(this).click(function() {
          var num = $(".g-dhnav p").index(this);
          //$(".g-dhnav p").eq(num).addClass("on").siblings().removeClass("on");
          //$(".f-top p").eq(num).addClass("on").siblings().removeClass("on");
          if (num == 0) {
              $('html,body').animate({scrollTop:$('.g-top-full').offset().top}, 800);
          }
          if (num == 1) {
              $('html,body').animate({scrollTop:$('.f-downbox').offset().top-42}, 800);
          }
          if (num == 2) {
              $('html,body').animate({scrollTop:$('.g-cms-box').offset().top-42}, 800);
          }
          if (num == 3) {
              $('html,body').animate({scrollTop:$('.m-comment').offset().top-42}, 800);
          }
          if (num == 4) {
              $('html,body').animate({scrollTop:$('.f-qtcs').offset().top-42}, 800);
          }
      });
   });

   $(".f-top p").each(function() {
      $(this).click(function() {
          var num = $(".f-top p").index(this);
          //$(".f-top p").eq(num).addClass("on").siblings().removeClass("on");
          if (num == 0) {
              $('html,body').animate({scrollTop:$('.g-top-full').offset().top}, 800);
          }
          if (num == 1) {
              $('html,body').animate({scrollTop:$('.f-downbox').offset().top-42}, 800);
          }
          if (num == 2) {
              $('html,body').animate({scrollTop:$('.g-cms-box').offset().top-42}, 800);
          }
          if (num == 3) {
              $('html,body').animate({scrollTop:$('.m-comment').offset().top-42}, 800);
          }
          if (num == 4) {
              $('html,body').animate({scrollTop:$('.f-qtcs').offset().top-42}, 800);
          }
      });
   });
}



// 新留言

function comment(){//评论
  if($("#comment_0 dl dt").length<5){
    $(".g-comment-more").hide();  
  };

  var p=1;
  function ViewMore(){             
    p++;
    $.ajax({
      type: "Get",
      url: "/sajax.asp",
      data: "action=6&t="+_pageinfo.id+"&s="+CommentTpye+"&num=5&p="+p,
      success: function(msg){       
        var objJson =eval( '(' + msg + ')');
        if (objJson.PageCount >= p){
          listDate(msg);
        }else{
          $(".g-comment-more").text("没有更多评论了").css("background","#c3c3c3");
        }
      }
    });       
  }
  function listDate(msg){
    var objJson =eval( '(' + msg + ')');
    var html = '';
    var htmlnew = '';   
    for(var i=0; i<objJson.softid.length;i++ )
    {     
      html += '<dt>';
      html += '<span><i>第'+objJson.Graded[i]+'楼</i><b>'+objJson.sUserFrom[i]+' '+objJson.user[i]+'</b> </span><em>发表于: '+objJson.DateAndTime[i]+'  </em>';
      html += '</dt>';
      html += '<dd>';
      html += objJson.Excerpt[i];
      html += '</dd>';  
      
      htmlnew += '<dt class="clearfix"><i>第 '+objJson.Graded[i]+' 楼 </i><span><b>腾牛网友</b> <em>'+objJson.DateAndTime[i]+'</em></span></dt>';
      if(objJson.bjhf[i]==""){
        htmlnew += '<dd>'+objJson.Excerpt[i]+'<p id="'+objJson.Id[i]+'"><a href="javascript:">支持<em>(</em><span> 0 </span><em>)</em></a> <a href="javascript:" pid="'+objJson.Id[i]+'">盖楼(回复)</a> </p></dd>'; 
      }else{
        htmlnew += '<dd>'+objJson.Excerpt[i]+'<div class="m-huifu"><p class="m-huifu-o">编辑回复：<br><span>'+objJson.bjhf[i]+'</span></p></div><p id="'+objJson.Id[i]+'"><a href="javascript:">支持<em>(</em><span> 0 </span><em>)</em></a> <a href="javascript:" pid="'+objJson.Id[i]+'">盖楼(回复)</a> </p></dd>'; 
      }
       
     }; 
    $('.g-game-ly div dl').append(html);
    $('.g-game2-ly div dl').append(htmlnew);
    //BindDing("#comment_0 > dl > dd > p",_pageinfo.id,"0")

  };
  $(".g-comment-more").click(function(){
    ViewMore(); 
  });
  var commentCont = '<div id="m-comment-box" style="display:none"><fieldset class="w-text"><textarea></textarea></fieldset><fieldset class="w-button"><input id="verify" class="button disable" type="button"  value="提交评论" /><b class="m-comment-close">取消</b></fieldset><input type="hidden" id="app-id" value="'+_pageinfo.id+'"/></div>';
  $(".g-commentbox").prepend(commentCont);
  $("#comment_0 dl dt").each(function(){
    $(this).find("b").text("腾牛网友")
  })
  plhuifu() //回复，支持进行操作
  function plhuifu(){


    $(".g-comment-showbtn").click(function(){ 
      $("#m-comment-box").show(); 
      $(this).hide();
      $("#comment_list").hide();
      
      
      plcole()
    }); 

    $("#comment_list div dl dd").each(function(){
      $(this).find("p a:eq(1)").click(function(){
        var pid = $(this).attr("pid");
        $("#m-comment-box").show();
        $(".g-comment-showbtn").hide();
        $("#m-comment-box textarea").text("[quote]"+pid+"[/quote]").focus();

        
        plcole()
      })
      

    });
  }

  $("#verify").click(function(){
        commontSubmit();
  });
  function plcole(){
    $(".m-comment-close").click(function(){
      $("#m-comment-box").hide(); 
      $("#comment_list,.g-comment-showbtn").show();
      
    });
  }

};



function commontSubmit(){

  function showTime(){
  var mydate = new Date();
  var str = "" + mydate.getFullYear() + "年";
  str += (mydate.getMonth()+1) + "月";
  str += mydate.getDate() + "日";
  return str;
  }
  var id = $("#app-id").val();
    var content = $(".w-text textarea").val();
    if($.trim(content).length <= 2) {
    alert("请填写内容");  
    return;
  }
  if(CommentTpye==1){
    $.ajax({
     type: 'POST',
     url: '/ajax.asp',
     data:  {
         content :content,
          SoftID :id,
         Action : 2,
         CommentTpye : 1  // 此处为服务端接口拼写错误
        },
     success: function(s){
         alert("提交成功");
         $(".w-text textarea").text("");           
         //addRealCommont(s);        
       },
     dataType: ""
    });
  }
  if(CommentTpye==0){//下载
    //不经过ajax，直接获取内容
    
    

    $.ajax({
     type: 'POST',
     url: '/ajax.asp',
     data:  {
         content :content,
          SoftID :id,
         Action : 2,
         CommentTpye : 0  // 此处为服务端接口拼写错误
        },
     success: function(s){
         alert("提交成功");
         $("#comment_list,.g-comment-showbtn").show();
        $("#m-comment-box").hide();       
          $(".w-text textarea").val("");
        // addRealCommont(s)
         //console.log("返回信息成功")
       },
     dataType: ""
    });
    
  }
  var comment = '<dt><span><i>最高楼</i><b>您的评论 网友 客人</b> </span><em>发表于: <font color="red"> '+showTime()+' </font>  </em></dt>'
  comment += '<dd>'+content+'<p id="'+$("#app-id").val()+'"><a href="javascript:">支持<em>(</em><span>0</span><em>)</em></a> <a href="javascript:" pid="'+$("#app-id").val()+'">盖楼(回复)</a> </p></dd>';
  
  var newcomment = '<dt class="clearfix"><i>最高楼</i><span><b>您的评论</b> <em><font color="red"> '+showTime()+' </font></em></span></dt>';
  newcomment += '<dd>'+content+'<p id="'+$("#app-id").val()+'"><a href="javascript:">支持<em>(</em><span>0</span><em>)</em></a> <a href="javascript:" pid="'+$("#app-id").val()+'">盖楼(回复)</a> </p></dd>'; 
  $('.g-game-ly div dl').prepend(comment);
  $('.g-game2-ly div dl').prepend(newcomment);
  

}
//评论页读取顶
var oid = $('#app-id').val();
function BindDing(objtext,id,CommentTpye){
  var obj = $('#comment_list dl dd p');
  if (obj.length === 0) {
      return false;
  }
  for (var i=0 ;i<obj.length;i++)
   {
    var sobj = obj.eq(i).find('a').first();
    var spanobj = obj.eq(i).find("span")
    sobj.click(function (){ 
       SendDing($(this).parent().attr("id"));
       var spanobj = $(this).parent().find("span")
       spanobj.html(parseInt(spanobj.html(),0)+1);
        $(this).unbind();             
        $(this).attr("title","您已经顶过了");
       })
   }
  ReadDing(objtext,id,CommentTpye)
}

function SendDing(id)//发送顶
{
  var id = $("#app-id").val();
   var url="action=19&id="+id
   //var url="action=19"
   $.ajax({
   type: "POST",
   url: "/ajax.asp",
   data: url,
   success: function(msg){
   // console.log("支持数据提交成功")
      //alert(msg)  ;
   }
});
}

//读取评论顶的数据
function ReadDing(objtext,id,CommentTpye)
{
  var obj=$('#comment_list dl dd p');
  
  //return ; //退出
  
  var sendid="";
  for (var i=0 ;i<obj.length;i++)
  {
    sendid+=obj.eq(i).attr("id");
    if (i<(obj.length-1)) sendid+=",";
  }
  
if (sendid!=""){ //是否有评论
 
    var url="action=18&id="+id+"&CommentTpye="+CommentTpye+"&sendid="+escape(sendid)+""
    $.ajax({
     type: "POST",
     url: "/ajax.asp",
     data: url,
     success: function(msg){
      ListDing(objtext,msg)  ;
     }
  }); 
 }
}

function ListDing(objtext,msg) //显示顶的数据
{
  //alert(msg)
  var obj=$(objtext)
  var dataObj=eval("("+msg+")");//转换为json对象
   for (var i=0 ;i<obj.length;i++)
   { 
     var spanobj = obj.eq(i).find("span")
     var sid = obj.eq(i).attr("id");
     for (var y=0;y < dataObj.ID.length;y++)
     {
       if (sid == dataObj.ID[y])
       {
       spanobj.html(dataObj.Ding[y]);
       break;
       }
     }
  } 
}
//新留言结束
