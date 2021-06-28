var openUrl = "";	
$("#keyword").keyup(function(){
	 if(event.keyCode == 13){
		keywordCont();
	 }
})
$(".search-button").click(function(){
	keywordCont()
})	

function keywordCont(){
	var keyFont = $("#keyword").val();
	if(keyFont != ""){
		if($("#keyword").val().indexOf('_') == -1){
				if(/android/i.test(navigator.userAgent)){
				openUrl = "https://so.qqtn.com/search/md/"+keyFont+"_android_rank.html";
			}else{
				openUrl = "https://so.qqtn.com/search/md/"+keyFont+"_ios_rank.html";	
			}		
			window.location.href = openUrl;	
		}else{
			alert("不允许有'_'此类非法字符")		
		}
	}else{
		window.location.href="https://so.qqtn.com/mindex.html";
	}
}
