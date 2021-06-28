var http_request = true;
  function send_request(url,Temp,ref , tb) 
   { //初始化、指定处理函数、发送请求的函数
    http_request = false;
    
    //document.domain = "yxdown.com";
    //开始初始化XMLHttpRequest对象
    if(window.XMLHttpRequest) { //Mozilla 浏览器
      http_request = new XMLHttpRequest();
      if (http_request.overrideMimeType) { //设置MiME类别
        http_request.overrideMimeType('text/xml');
      }
    }
    else if (window.ActiveXObject) { // IE浏览器
      try {
        http_request = new ActiveXObject("Msxml2.XMLHTTP");
      } catch (e) {
        try {
          http_request = new ActiveXObject("Microsoft.XMLHTTP");
        } catch (e) {}
      }
    }
    if (!http_request) { // 异常，创建对象实例失败
      window.alert("不能创建XMLHttpRequest对象实例.");
      return false;
    }
    http_request.onreadystatechange = ref; 
    
    // 确定发送请求的方式和URL以及是否同步执行下段代码
    http_request.open("Post", url, tb);
    http_request.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
    http_request.send(Temp);
  }
  
  // 处理返回信息的函数
    function processRequest() {
        if (http_request.readyState == 4) { // 判断对象状态
            if (http_request.status == 200) { // 信息已经成功返回，开始处理信息
                alert(http_request.responseText);
            } else { //页面不正常
                 // alert("您所请求的页面有异常。");
            }
        }
  }


$(function(){
   comment()
   BindDing("#comment_0 > dl > dd > p",info.id,"5");
});



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
      data: "action=6&t="+info.id+"&s="+CommentTpye+"&num=5&p="+p,
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
    console.log(objJson)
    for(var i=0; i<objJson.softid.length;i++ )
    {     
      html += '<dt>';
      html += '<span><i>第'+objJson.Graded[i]+'楼</i><b>'+objJson.sUserFrom[i]+' '+objJson.user[i]+'</b> </span><em>发表于: '+objJson.DateAndTime[i]+'  </em>';
      html += '</dt>';
      html += '<dd>';
      html += objJson.Excerpt[i];
      html += '</dd>';  
      
      htmlnew += '<dt class="clearfix"><span><b>'+objJson.sUserFrom[i]+' 网友 客人</b><i>第 '+objJson.Graded[i]+' 楼 </i><em>发表于: '+objJson.DateAndTime[i]+'</em></span></dt>';
      if(objJson.bjhf[i]==""){
        htmlnew += '<dd>'+objJson.Excerpt[i]+'<p id="'+objJson.Id[i]+'"><a href="javascript:">支持<em>(</em><span> 0 </span><em>)</em></a> <a href="javascript:" pid="'+objJson.Id[i]+'">盖楼(回复)</a> </p></dd>'; 
      }else{
        htmlnew += '<dd>'+objJson.Excerpt[i]+'<div class="m-huifu"><p class="m-huifu-o">编辑回复：<span>'+objJson.bjhf[i]+'</span></p></div><p id="'+objJson.Id[i]+'"><a href="javascript:">支持<em>(</em><span> 0 </span><em>)</em></a> <a href="javascript:" pid="'+objJson.Id[i]+'">盖楼(回复)</a> </p></dd>'; 
      }
       
     }; 
    $('.g-game-ly div dl').append(html);
    $('.g-game2-ly div dl').append(htmlnew);
    // console.log(info.id)
    BindDing("#comment_0 > dl > dd > p",info.id,"5");

    $("#comment_list div dl dd").each(function(){
      $(this).find("p a:eq(1)").click(function(){
        var pid = $(this).attr("pid");
        $("#m-comment-box").show();
        $(".g-comment-showbtn").hide();
        $("#m-comment-box textarea").text("[quote]"+pid+"[/quote]").focus();
        
        plcole()
      })
    });

  };
  $(".g-comment-more").click(function(){
    ViewMore(); 
  });
  var commentCont = '<div id="m-comment-box"><fieldset class="w-text"><textarea></textarea></fieldset><fieldset class="w-button"><input id="verify" class="button disable" type="button"  value="提交评论" /></fieldset><input type="hidden" id="app-id" value="'+info.id+'"/></div>';
  $(".g-commentbox").prepend(commentCont);
  $("#comment_0 dl dt").each(function(){
    //$(this).find("b").text("腾飞网友")
    var wy = $(this).find("b").text();
    if (wy == '网友') {
      $(this).find("b").text('腾牛网友 客人');
    }
  });  // '+objJson.sUserFrom[i]+'  地区字段
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
     // commontSubmit();
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
  
  if(CommentTpye==5){//下载
    //不经过ajax，直接获取内容
    $.ajax({
     type: 'POST',
     url: '/ajax.asp',
     data:  {
         content :content,
          SoftID :id,
         Action : 2,
         CommentTpye : 5  // 此处为服务端接口拼写错误
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
  });
  function plcole(){
    $(".m-comment-close").click(function(){
      $("#m-comment-box").hide(); 
      $("#comment_list,.g-comment-showbtn").show();
      
    });
  }

};


function commontSubmit(){

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
   // console.log("支持数据提交成功")
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
