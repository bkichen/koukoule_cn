if(typeof(Page) == "undefined" || typeof(Page) == "object"){
  Page = "0"  
}

$(function($) {
  // 公用部分JS
  gotop();
    
    //返回顶部结束
  if(Page != "newsindex" ){
    
    navhover();//当前位置
  }
  // 首页用的
   if(Page == "newsindex" )
      {
        imgup();//图片背景上划
            hovertop();//改变样式  
            flash2()
            tabase();//选项卡 
            table();//左右切换
            hoverp();//鼠标经过

      }
   //列表页
   if(Page == "newslist" ){
      hovertop();//改变样式
      rightt()
      $(".m-newslistul li").each(function(){
        if($(this).find("a:eq(0) img").attr("src")=="https://www.qqtn.com/skin/NoPic.jpg"){
          
          $(this).find("a:eq(0)").hide()
        }
      })
      $('.g-nav').show();
    }
    if(Page == "newsfz" ){
      hovertop();//改变样式

      // 处理排序
      $(".f-fzhot ul li").each(function(i){
        $(this).find("a em").text(i+1)
      })
      
    }
    //内容页
   if(Page == "newsmain" ){
      hovertop();//改变样式
       hoverp();//鼠标经过
       tabase();//选项卡 
       rightt()
       keyName();//提取K页面
       var plnum = $("#comment_1 dl dd").length;
       $(".m-pls a i").text(plnum)
      //专有JS
       $(".m-pls a").click(function(){$("html,body").animate({scrollTop:$('#comment_list').offset().top-80}, 500);});
       //没有专题隐藏
       var keynum = $(".m-xhtab span").length;
       if (keynum<1) {
          $(".m-cnxh").hide()
       }
      
       // 有库的话，处理库图片
       if ($("#OthPro").length>0) {//获取图片
      var jobj =  eval($("#OthPro").val());
      var imgurl = $("#OthPro").val();
      var bigimgtit = $(".g-banner img").attr("alt");
      var kuid = $("#OthPro").attr('data-kuid');
      var gamequn = '<span><a target="_blank" href="//shang.qq.com/wpa/qunwpa?idkey=f699aa816e94f4a4d6988e6ef16fc1fa4fcf60d1554a3fb60446c395d16a8de2" title="加入QQ群">加入QQ群</a></span>';
      var softqun = '<span><a target="_blank" href="//shang.qq.com/wpa/qunwpa?idkey=8d055e307891f3f483399df905845c68efb92c56bdefc583155cbe6c3a079764" title="加入QQ群">加入QQ群</a></span>'
      if (imgurl =="[]" || jobj[0].svalue == "") {
        if (kuid == 1) {//游戏库
          $(".g-banner img").attr("src","/skin/new2018/images/sy.jpg");
          $('.g-box-nav p').append(gamequn);
        }
      }else{
         if (kuid == 2) {//游戏库
          $(".g-banner img").attr("src","/skin/new2018/images/rj.jpg");
          $('.g-box-nav p').append(softqun);
        }else{
          $(".g-banner img").attr("src",decodeURIComponent(jobj[0].svalue))
        }
        
      }

     


    }else{
      $('.g-nav').show();


    }
    $('#m-cancel').click(function(){
      var bdtxt = $("#keyword").val();
      var bd = "http://www.baidu.com/baidu?word=" + bdtxt;
    if (bdtxt != "") {
      $(this).attr("href", bd);
    }
    })

      // 猜你喜欢 样式增加


      //增加分享
      
      //$(".m-infomain").append('<span class="m-nfenx"><i class="">分享到：</i><b class="bdsharebuttonbox"><a href="#" class="bds_tsina" data-cmd="tsina" title="分享到新浪微博"></a><a href="#" class="bds_qzone" data-cmd="qzone" title="分享到QQ空间"></a><a href="#" class="bds_weixin" data-cmd="weixin" title="分享到微信"></a><a href="#" class="bds_douban" data-cmd="douban" title="分享到豆瓣网"></a><a href="#" class="bds_renren" data-cmd="renren" title="分享到人人网"></a><a href="#" class="bds_more" data-cmd="more"></a></b></span>');
      //window._bd_share_config={"common":{"bdSnsKey":{},"bdText":"","bdMini":"2","bdMiniList":false,"bdPic":"","bdStyle":"1","bdSize":"16"},"share":{}};with(document)0[(getElementsByTagName('head')[0]||body).appendChild(createElement('script')).src='//bdimg.share.baidu.com/static/api/js/share.js?v=89860593.js?cdnversion='+~(-new Date()/36e5)];
      //分享结束
      // 属性下方，没有标题隐藏

      if($(".m-tags a").length<1){
        $(".m-tags p ").hide();
      }
      if($(".m-tuwendiv li").length<1){
        // $(".m-tuwendiv").hide();
        // $(".m-tuwendiv").prev().hide();
        $(".m-tuwendiv ul").css("padding-left","30px");
      }
      // 增加下一页
     
    }
    //QQ专区
    if(Page == "qqzq" ){

      tabase()//选项卡
      imgup()//背景滑动
      zyChange()//腾讯专区左右切换轮播
      hoverp()//鼠标浮动显示隐藏

    }
});

function rightt(){//背景滑动JS
//右侧固顶
      var righttop  = $(".m-hot").offset().top;//介绍顶部距离
      $(window).scroll(function(){//滚动监听
        //判断高度
        if($(window).scrollTop() > righttop){
          $(".m-hot").addClass("f-top");
        }else{
            $(".m-hot").removeClass("f-top");
        }
      });
}
function imgup(){//背景滑动JS
  $(".f-thumb li").each(function() {
      var aheight = $(this).find("a").height()
      $(this).find(".thumb-txt").height(aheight).css("top",aheight)

            $(this).hover(function() {
              
                $(this).find(".thumb-txt").stop().animate({
                    top: 0
                },300);                
            },
            function() {
                $(this).find(".thumb-txt").stop().animate({
                    top: aheight
                },300);
            });
        });

}
function hovertop(){//鼠标经过改变样式,第一个单独加样式，前三单独加样式
    $('.f-top li').mouseover(function(){
        $(this).siblings().removeClass('f-ix').end().addClass('f-ix');
    });
    $('.f-top3').each(function() {
        $(this).find('li:first').addClass('f-ix').end()
        .find('li:lt(3)').addClass('f-t3');

    })
}
function hoverp(){//鼠标经增加样式离开去掉用于显示隐藏

  $(".f-tw,.f-hov").mouseover(function(){
  $(this).addClass("f-hover");
  $(this).find(".m-xcx-ys").hide();
  $(this).find(".f-show").show();
    }).mouseout(function(){
    $(this).removeClass("f-hover");
    $(this).find(".m-xcx-ys").show();
   $(this).find(".f-show").hide();
  });
}
function gotop(){//返回顶部
  $("body").append('<div class="g-float"><a href="javascript:;" id="m-top-back"></a></div>')
  // 滚动监听显示隐藏并且返回顶部
  $(window).scroll(function(){
        if($(window).scrollTop()>200){
            $("#m-top-back").animate({height:60},10);            
            }else{
               $("#m-top-back").animate({height:0},10);                    
            }
    })
    $("#m-top-back").click(function(){
        $("body,html").animate({scrollTop:0},300)
    })
}
function navhover(){
  var rootName = $(".g-jknav strong a").eq(1).text().replace(/\s+/g,'');
    $(".g-navlist ul li a").each(function(){
      var navName = $(this).text().replace(/\s+/g,'');
      if(navName==rootName){
        $(".g-navlist ul li ").removeClass("hover");
        $(this).parent("li").addClass("hover");
      }
    })
}
function tabase(){//通用选项卡
    if($(".f-hovertab-box").length >0){

    $(".f-hovertab-box").each(function(){
      $(this).find(".f-hovertab-btn").children().first().addClass("f-hover");
      $(this).find(".f-hovertab-cont:gt(0)").hide();      
      if($(this).find(".f-hovertab-cont").length<=0){
        $(this).hide();
      }
    })
    $(".f-hovertab-btn").children().hover(function(){
      var tabSpeed = $(this).parents(".f-hovertab-box").attr("data-speed");
      var thisObj = $(this);  
      setTimer = setTimeout(function(){       
        thisObj.addClass("f-hover").siblings().removeClass("f-hover");
        var n = thisObj.index();
        thisObj.parents(".f-hovertab-box").find(".f-hovertab-cont").eq(n).show().siblings(".f-hovertab-cont").hide();     
      },tabSpeed) 
    },function(){
      clearTimeout(setTimer);
    })
  }
}

function table(){//左右切换
    var tablisun = $(".g-usgame-content ul li").length;    
    var tabsum = $(".g-usgame-content ul li").width() + 15
    $(".g-usgame-content ul").width(tablisun*tabsum)
    $(".g-usgame-content ul").each(function() {
      //$(this).find("li:first").css("margin-left","0")
    });
     
    var qj = $(".g-usgame-content ul");
    $(".m-next-page").click(function(){
        var diann2 = $(this).attr("date-click");
        if (diann2 == 1){
            if(!qj.is(":animated")){        
            $(this).parents(".m-gximg").find("ul").animate({left:'-2345px'},"slow");
            $(this).parents(".m-gximg").find(".m-prev-page").removeClass("m-hover");$(this).addClass("m-hover2")            
            
            $(".m-next-page").attr("date-click","0");
            $(".m-prev-page").attr("date-click","2");
          }
        }
        if (diann2 == 2){
            if(!qj.is(":animated")){        
            $(this).parents(".m-gximg").find("ul").animate({left:'-1170px'},"slow");
            $(this).parents(".m-gximg").find(".m-prev-page").removeClass("m-hover");            
            
            $(".m-next-page").attr("date-click","1");
            $(".m-prev-page").attr("date-click","1");
          }
        }
        console.log(diann2)
        

      })
    $(".m-prev-page").click(function(){
        var diann1 = $(this).attr("date-click");
        console.log(diann1)  
        if (diann1 == 1){
          if(!qj.is(":animated")){
              $(this).parents(".m-gximg").find("ul").animate({left:'0px'},"slow");
              $(this).parents(".m-gximg").find(".m-prev-page").addClass("m-hover").siblings().removeClass("m-hover2");             
              
            $(".m-next-page").attr("date-click","2");
            $(".m-prev-page").attr("date-click","0");
            }
        }
        if (diann1 == 2){
          if(!qj.is(":animated")){
              $(this).parents(".m-gximg").find("ul").animate({left:'-1170px'},"slow");
              $(this).parents(".m-gximg").find(".m-next-page").removeClass("m-hover2");             
              
            $(".m-next-page").attr("date-click","1");
            $(".m-prev-page").attr("date-click","1");
            }
        }

    })
}
// 
// 
// // 大图切换
function flash2(){
  $(".flashbox li:first").show();
    var curr = 0;
  var cur;
    $(".flashpoint i").each(function(i) {
      $(this).click(function() {
        curr = i;
        $(".flashbox li").eq(i).fadeIn("slow").siblings("li").hide();
    $(this).siblings(".flashpoint i").removeClass("on").end().addClass("on");
        return false;
      });
    }); 
  
    var timer = setInterval(function() {
      todo = curr + 1;
    if(todo > 1){
     todo = 0;
     $(".flashpoint i").eq(todo).click();
     cur = todo;    
    }else{
     $(".flashpoint i").eq(todo).click(); 
     todo++;
     cur = todo;  
    }
    },
    3000);
  
  
    $(".flashbox").hover(function() {
      clearInterval(timer);
    },
    function() {
      timer = setInterval(function() {
         todo = curr + 1;
    if(todo > 1){
     todo = 0;
     $(".flashpoint i").eq(todo).click();
     cur = todo;    
    }else{
     $(".flashpoint i").eq(todo).click(); 
     todo++;
     cur = todo;  
    }
      },
      3000);
    });
  
  
    $(".flashpoint").hover(function() {
      clearInterval(timer);
    },
    function() {
      timer = setInterval(function() {
        todo = curr + 1;
    if(todo > 1){
     todo = 0;
     $(".flashpoint i").eq(todo).click();
     cur = todo;    
    }else{
     $(".flashpoint i").eq(todo).click(); 
     todo++;
     cur = todo;  
    }
      },
      3000);
    });

}

function keyName(){
  //提取K
  var floatCont = "";
  var keyHtml = "";
  var keySize = $(".m-xhtab span").length;
  if(keySize>0){
    $(".m-xhtab span").each(function(){
      var keyText = $(this).text().replace(/\s+/g,'');
      keyHtml += '<b>'+ keyText + '</b>'
    })
    var keyLink = keyHtml;

    $("#taggo").append(keyLink);

    $("#taggoF b").hover(function(){
      $(this).addClass("m-hover").siblings("b").removeClass("m-hover");
    },function(){
      $(this).removeClass("m-hover");
    })

      $("#taggo,#taggoF").find("b").click(function(){
    var winHeight = $(window).height()/5;
    var keyTop = $(".m-cnxh").offset().top;
    $("html,body").animate({scrollTop:keyTop-winHeight-10},300);
    var n = $(this).index();
    $(".m-cnxh").find(".m-xhtab span").eq(n).addClass("m-hover").siblings("li").removeClass("m-hover");
    $(".m-cnxh").find(".tab-cont").eq(n).show().siblings(".tab-cont").hide();
    })
  }
}

function imgup(){//背景滑动JS
  $(".f-thumb li").each(function() {
      var aheight = $(this).find(".m-bana").height()
      var bheight = $(this).find(".m-thumb-top").height()
      $(this).find(".m-thumb-down").height(bheight).css("top",bheight)
      $(this).find(".m-div-txt").height(aheight).css("top",aheight)

            $(this).hover(function() {
              
                $(this).find(".m-div-txt").stop().animate({
                    top: 0
                },300);

                $(this).find(".m-thumb-down").stop().animate({
                    top: 38
                },300); 
                $(this).find(".m-thumb-down strong").removeClass("m-zitis").addClass("news"); 

            },
            function() {
                $(this).find(".m-div-txt").stop().animate({
                    top: aheight
                },300);
                 $(this).find(".m-thumb-down").stop().animate({
                    top: bheight
                },300);
                $(this).find(".m-thumb-down strong").removeClass("news").addClass("m-zitis"); 
            });
        });
}


function zyChange(){
  //左右切换的轮播
  setInterval(atuo,2000);
  var liSize = $(".m-thumb-pic").length/2;  
  var liWidth = $(".m-thumb-pic").outerWidth(true); 
  var ulWidth = liSize*liWidth;
  console.log(ulWidth)
  $(".m-f-thumb").width(ulWidth)
  var n = 0;
  var stop = true;
    function atuo(){
      if(stop!=true){
        return
      }
      n++;
      if(n>liSize-5){
        n=0;
        $(".m-f-thumb").css("left",0)
      }
        $(".m-f-thumb").animate({"left":"-="+liWidth})
      }
      $(".m-f-thumb").mouseover(function(){
        stop=false
      }).mouseout(function(){
        stop=true
      });

 
    //左右按钮切换
  $(".m-chose-left").click(function(){
    console.log(n)
    console.log(liSize)
         stop=false
     $(".m-chose-left").removeAttr('href');
    if(!$(".m-f-thumb").is(":animated")){
      if(n<liSize-4){
        $(".m-f-thumb").animate({left:"-="+liWidth},300);
        n++;  
      }else{
        $(".m-f-thumb").animate({left:0},300);
        n=0 
      }
    }
  }).mouseout(function(){
     stop=true
   });
  $(".m-chose-right").click(function(){
      stop=false
     $(".m-chose-right").removeAttr('href');
    if(!$(".m-f-thumb").is(":animated")){
      if(n<=0){
        $(".m-f-thumb").animate({left:-ulWidth+liWidth*4},300);
        n=liSize-4; 
      }else{
        $(".m-f-thumb").animate({left:"+="+liWidth},300);
        n--;  
      }
    }
  }).mouseout(function(){
     stop=true
   });
}

$(function($) {
  searchcms()
});



function searchcms(){  
  //单文章
  $("#keyword").keyup(function(){
     if(event.keyCode == 13){
      keywordCont();

     }
  })
  $(".schbtn").click(function(){
    keywordCont();  
    
  })  

  function keywordCont(){
    var falseWords = ["_","+","破解","注册机","http:","https:"];
    var keyFont = $("#keyword").val();
    if(keyFont != ""){      
      for(i=0;i<falseWords.length;i++){
        if(keyFont.indexOf(falseWords[i]) != -1){
          alert("不允许有非法字符");
          return false;
        } 
      }   
            
      Insearch(0,keyFont,1,1)
     window.location.href="https://so.qqtn.com/search/w/"+keyFont+".html";  
    }else{
      window.location.href="https://so.qqtn.com"; 
    }   
  }
}

//搜索的keys 
function Insearch(sid,keys,typeclass,linum){

  var dataCont="action=31&urlclass=search&locationclass=search&typeclass="+typeclass+"&keyword="+escape(keys)+"&sid="+sid+"&stype=pc&linum="+linum

  
    $.ajax({
      type: "Get",
      url: "/ajax.asp",
      data: dataCont,
      success: function(msg){
        console.log("成功") 
        //alert(msg)
        

      },error:function(){
        console.log("失败")
      }
    }); 

}


//禁用右键、文本选择功能、复制按键  
//document.onselectstart = function(){  event.returnValue = false;};document.oncontextmenu = function(){  event.returnValue = false;};document.oncopy = function(){  event.returnValue = false;};
