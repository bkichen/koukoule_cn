if (typeof(Page)=="undefined'")
{
	var Page = 0
}

$(function(){
	//展开关闭
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

$(".g-back-home").click(function(){
    history.back(-1);
  })

 $(".g-morebox ul li:nth-child(8n)").after('<b></b>');

//更多添加数字

$(".g-morebox li").each(function(){
	var lengli = $(".g-morebox li").length;
	$(".g-morebox p i").html(lengli);
});
	//二级栏目点击附加class
	var mentext = window.location.href;
	$(".g-nav-list li a").each(function(){
		var menturl =  $(this).attr('href');
		if(mentext.indexOf(menturl) != -1){
			$(this).addClass('hover');
		}			
	})


	//排行添加数字
	$("#f-number").each(function(){
		var liSize = $(this).find("li").length;
		for(i=0;i<liSize;i++){
			$(this).find("li i").eq(i).append(i+1);
		}			
	})



//个性大全切换

$(".g-dome-title li").click(function() {
    $(this).addClass("m-hover").siblings().removeClass("m-hover");
    var contul = $(".g-dome-title li").index(this);
    $(".g-dome-list").eq(contul).addClass("m-hover").siblings().removeClass("m-hover")
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

	//标签获取宽度
	$(".tab-con-bq li a").each(function(){
		var wbox =	$(this).outerWidth();
		$(".tab-con-bq li a em").width(wbox);
	})

	//头像 头像列表页 添加html
	var htmladd="";
	htmladd +='<section class="m-gxapp">';
    htmladd +='<a class="m-apptx" href="http://nz.qqtn.com/zbsq/Apk/gxtx_qqtn.apk"><b>个性头像APP 官方版</b><i>一键更换高清头像，成为QQ头像达人</i><span class="m-apptx_b">立即下载</span></a>';
    htmladd +='</section>';
    $("#f-gxapp").after(htmladd);


//详细页头部加文字
if(Page == 11){

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





// 新留言
comment();
function comment(){//评论
	if($("#comment_0 dl dt").length<=0){
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
		BindDing("#comment_0 > dl > dd > p",_pageinfo.id,"0")

	};
	$(".g-comment-more").click(function(){
		ViewMore();	
	});
	var commentCont = '<div id="m-comment-box" style="display:none"><fieldset class="w-text"><textarea></textarea></fieldset><fieldset class="w-button"><input id="verify" class="button disable" type="button"  value="提交评论" /><b class="m-comment-close">取消</b></fieldset><input type="hidden" id="app-id" value="'+_pageinfo.id+'"/></div>';
	$(".g-commentbox").prepend(commentCont);
	$("#comment_0 dl dt").each(function(){
		$(this).find("b").text("腾牛网友")
	})
	plhuifu()	//回复，支持进行操作
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
			   CommentTpye : 1 	// 此处为服务端接口拼写错误
				},
		 success: function(s){
			   alert("提交成功");
			   $("#comment_list,.g-comment-showbtn").show();
				$("#m-comment-box").hide();				
			    $(".w-text textarea").val("");
			  // addRealCommont(s)
			   console.log("返回信息成功")
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
			   CommentTpye : 0 	// 此处为服务端接口拼写错误
				},
		 success: function(s){
			   alert("提交成功");
			   $("#comment_list,.g-comment-showbtn").show();
				$("#m-comment-box").hide();				
			    $(".w-text textarea").val("");
			  // addRealCommont(s)
			   console.log("返回信息成功")
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
function BindDing(objtext,id,CommentTpye){
	var obj=$(objtext)
	
	if (obj.length==0) return false;
	 for (var i=0 ;i<obj.length;i++)
	 {
	  var sobj = obj.eq(i).find("a:first")
	  var spanobj = obj.eq(i).find("span")

	  sobj.click(function (){ 

						   SendDing($(this).parent().attr("id"));
						   
						   var  spanobj = $(this).parent().find("span")
						   spanobj.html(parseInt(spanobj.html())+1);
						    $(this).unbind();							
						    $(this).attr("title","您已经顶过了");
						   })
	 }
	ReadDing(objtext,id,CommentTpye)
}

function SendDing(id)//发送顶
{
	//alert(id)
   var url="action=19&id="+id
   //var url="action=19"
   $.ajax({
   type: "POST",
   url: "/ajax.asp",
   data: url,
   success: function(msg){
   	console.log("支持数据提交成功")
      //alert(msg)  ;
   }
});
}

//读取评论顶的数据
function ReadDing(objtext,id,CommentTpye)
{
	var obj=$(objtext);
	
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

}




})


//个性签名、网名、说说
if(Page == 1 || Page == 2 || Page == 5){
$(function(){
	$(".tab-con li img").each(function(){
		var noimg = $(this).attr("src");
		if(noimg == 'https://www.qqtn.com/skin/NoPic.jpg' || noimg == ''){
			$(this).hide();
		}
	})
});

var p=1,PageCount=0
window.page_temp = 0;
	$(document).ready(function(){
	    $("#more").click(function(){
			gxCmsloading();

		})
	});
}

function gxCmsloading(){
	var tabid = $("#tab-nav li.m-hover").attr("data-tabid");
	var tabnum = $("#tab-nav li.m-hover").index();

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
		  html += '<a class="tab-con-li" href="/c/' + objJson.Id[i] + '">';

		  if(objJson.SmallImg[i] == ''){
		  	html += '<img style="display:none" src="'+ objJson.SmallImg[i] +'" alt="' + decodeURI(objJson.Title[i]) + '">';
		  }else{
		  	html += '<img src="'+ objJson.SmallImg[i] +'" alt="' + decodeURI(objJson.Title[i]) + '">';
		  }
	
		  var data =objJson.DateAndTime[i].replace(/\//ig,'-').substring(0,objJson.DateAndTime[i].lastIndexOf(' '));
		  html += '<p><strong>' + decodeURI(objJson.Title[i]) + '</strong><span class="u-deta">'+ data +'</span></p></a></li> '

		}
		$('.g-tab-cout .tab-con').eq(tabnum).append(html);
		$("#more").html("点击查看更多...")
	};
}

//个性图片、头像 、皮肤
if(Page == 3 || Page == 4 || Page == 7){
var p=2,PageCount=0
window.page_temp = 0;
	$(document).ready(function(){
		$("#more").click(function(){
			gxImgloading();
		})
	});
}

function gxImgloading(){
	
	var tabid = $("#tab-nav li.m-hover").attr("data-tabid");
	var tabnum = $("#tab-nav li.m-hover").index();
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
		$('.g-tab-cout .tab-con-tx').eq(tabnum).append(html);
		$("#more").html("点击查看更多...")
	};
	
	
}

//个性表情
if(Page == 6){
var p=2,PageCount=0
window.page_temp = 0;
	$(document).ready(function(){
		$("#more").click(function(){
			gxBqloading();
		});
	});
}

function gxBqloading(){
	var tabid = $("#tab-nav li.m-hover").attr("data-tabid");
	var tabnum = $("#tab-nav li.m-hover").index();
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
		$('.g-tab-cout .tab-con-tx').eq(tabnum).append(html);
		$("#more").html("点击查看更多...")
	};

}



 // 个性头像频道 最新发布 列表第一个u3587613
qqtn_a1=function(){
var a1 = '<script type="text/javascript" src="//a1.q6u.com/site/common/production/mkkk.js?lgydihfp=y"></script>';
	document.write(a1)
}

 // 个性头像频道 最新发布 列表第二个u3587626
qqtn_a2=function(){
var a2 = '<script type="text/javascript" src="//a1.q6u.com/production/k1g7j.js?pkch=mljzj"></script>';
	document.write(a2)
}

 // 个性头像频道 最新发布 列表第三个u3851205
qqtn_a6=function(){
var a6 = '<script type="text/javascript" src="//a1.q6u.com/site/uz9o9n.js?cxpzugm=du"></script>';
	document.write(a6)
}



 // 个性文本列表最新发布第一个 u3609495
qqtn_a3=function(){
var a3 = '<script type="text/javascript" src="//a1.q6u.com/source/api/site/e7sohc.js?ojbip=rfrg"></script>';
	document.write(a3)
}

 // 个性文本列表最新发布第二个 u3609499
qqtn_a4=function(){
var a4 = '<script type="text/javascript" src="//a1.q6u.com/source/js/n7u9.js?s=nfmtvjvv"></script>';
	document.write(a4)
}

 // 个性文本列表最新发布第三个 u3851182
qqtn_a5=function(){
var a5 = '<script type="text/javascript" src="//a1.q6u.com/common/sd1nqc.js?g=btdykkdq"></script>';
	document.write(a5)
}

