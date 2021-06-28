
$(function(){
	//返回顶部
  $("body").append('<div class="g-float"><a href="javascript:;" id="m-top-back"></a></div>')
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
});



$(function($) {
  searchOver()
});

function searchOver(){	


	var moren = "软件";
	
	 $("#topForm dl:first").click(function(){	
	 	var liLast = $(this).children("dd").css("display");
	console.log(liLast)
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
	 
	 
	$(".m_xzk p a").click(function(){
		moren = $(this).attr("data-type");	
		$("#topqqsou dl dt").html(moren)
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
					window.location.href="https://so.qqtn.com/search/d/"+keyFont+"_all_rank.html";	
				}else{
					Insearch(0,keyFont,1,1)	
					window.location.href="https://so.qqtn.com/search/w/"+keyFont+".html";	
				}

			
							
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