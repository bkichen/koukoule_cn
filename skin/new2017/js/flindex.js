$(function(){
    hovertop();
    tabase();
    gotop();
    tabfenlei()
});

searchOver();


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

function tabfenlei() {
     $('.f-tab-btn').find('li:first').addClass("f-hover");
    $('.f-tab-btn').find('li').hover(
        function(){
            $(this).addClass("f-hover").siblings().removeClass("f-hover");
            var u = $(this).index();
            $(".f-tbox").each(function(){
                $(this).find(".f-atbfl").eq(u).show().siblings(".f-atbfl").hide();  
            });               
        }
    )
}

function hovertop(){//鼠标经过改变样式,
    $('.f-top li').mouseover(function(){
        $(this).siblings().removeClass('f-ix').end().addClass('f-ix');
    });
    $('.f-top3').each(function() {
        $(this).find('li:first').addClass('f-ix').end().find('li:lt(3)').addClass('f-t3');
    
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



function Insearch(sid,keys,typeclass,linum){
    var dataCont="action=31&urlclass=search&locationclass=search&typeclass="+typeclass+"&keyword="+escape(keys)+"&sid="+sid+"&stype=pc&linum="+linum;
    $.ajax({
        type: "Get",
        url: "/ajax.asp",
        data: dataCont,
        success: function(msg){
            console.log("成功");

        },error:function(){
            console.log("失败");
        }
    });
}
function searchOver(){
    var moren = "软件";
    $("#topForm dl:first").click(function(){
        var liLast = $(this).children("dd").css("display");

        if(liLast=="none"){
            $(this).find("dd").show();
        }else{
            $(this).find("dd").hide();
        }
    })
    $("#topForm dl dd").click(function(){
        moren = $(this).attr("data-type");
        $("#topForm dl dt").html(moren+"<i></i>")
    })
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
            if(moren=="软件"){

                Insearch(0,keyFont,0,1)
                window.location.href="http://so.qqtn.com/search/d/"+keyFont+"_all_rank.html";
            }else{
                Insearch(0,keyFont,1,1)
                window.location.href="http://so.qqtn.com/search/w/"+keyFont+".html";
            }



        }else{
            window.location.href="so.qqtn.com";
        }
    }
}
//站内搜索结束
//
//
//禁用右键、文本选择功能、复制按键  
//document.onselectstart = function(){  event.returnValue = false;};document.oncontextmenu = function(){  event.returnValue = false;};document.oncopy = function(){  event.returnValue = false;};
