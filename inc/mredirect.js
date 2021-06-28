//==========Mobile redirect Begin ========
var browser = {
            versions: function () {
                var u = navigator.userAgent, app = navigator.appVersion;
                return {//移动终端浏览器版本信息
                    trident: u.indexOf('Trident') > -1, //IE内核
                    presto: u.indexOf('Presto') > -1, //opera内核
                    webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
                    gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
                    mobile: !!u.match(/AppleWebKit.*Mobile/i) || !!u.match(/MIDP|SymbianOS|NOKIA|SAMSUNG|LG|NEC|TCL|Alcatel|BIRD|DBTEL|Dopod|PHILIPS|HAIER|LENOVO|MOT-|Nokia|SonyEricsson|SIE-|Amoi|ZTE/), //是否为移动终端
                    ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
                    android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
                    iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1, //是否为iPhone或者QQHD浏览器
                    iPad: u.indexOf('iPad') > -1, //是否iPad
                    webApp: u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部
                };domain
            } (),
            language: (navigator.browserLanguage || navigator.language).toLowerCase()
    }
	
	// JavaScript Document
 var Cookie={get:function(name){var value='',matchs;if(matchs=document.cookie.match("(?:^| )"+name+"(?:(?:=([^;]*))|;|$)"))value=matchs[1]?unescape(matchs[1]):"";return value},set:function(name,value,expire,domain){expire=expire||30*24*3600*1000;var date=new Date(),cookie="";date.setTime(date.getTime()+expire);cookie=name+"="+escape(value)+";expires="+date.toGMTString()+";path=/;";domain&&(cookie+="domain="+domain+";");document.cookie=cookie},del:function(name,domain){Cookie.set(name,'',-1,domain)}};
 
(function(){  

	var  href = location.href,
	      isFormMoblie = /[\?&]m(&|$)/.test(window.location.search),
		  doNotRedirect =  +Cookie.get('donotredirect'),
		  mUrl="https://m.qqtn.com/",
		  smUrl = 'https://so.qqtn.com/search/md/',
		  isMoblie=browser.versions.mobile;
		  
		  	var Init ={
		      redirect : function(){
				  	if(typeof(_pageinfo) != "undefined"){
					  	if(typeof(_pageinfo.softlicence) != "undefined"){
							if(_pageinfo.softlicence != "下架"){
								var reg = /\/(down|qqfz|gamefz|azgame|azsoft|xcx|iosgame|iossoft|hm)\/(\d+)\.html/ig;
								var m = reg.exec(href);
								if(m){
									window.location.href = mUrl + "q/" +m[2];  
									return;
								}
							}
						}
					}else{
						
						var reg = /\/(down|qqfz|gamefz|azgame|azsoft|xcx|iosgame|iossoft|hm)\/(\d+)\.html/ig;
								var m = reg.exec(href);
								if(m){
									window.location.href = mUrl + "q/" +m[2];  
									return;
								}	
					}
				  reg = /\/article\/article_(\d+)_1\.html/ig;
				  m = reg.exec(href);
				  if(m){
					 window.location.href = mUrl + "c/" +m[1];  
					 return;
				  }

				  reg = /\/wenda\/(\d+)_1\.html/ig;
				  m = reg.exec(href);
				  if(m){
					 window.location.href = mUrl + "c/" +m[1];  
					 return;
				  }
				  
				  reg = /\/(qqkey|game|az|mac|wenjian)\/(\w+)(\/?)/ig;
				  m = reg.exec(href);
				  if(m){
					 window.location.href = mUrl + "k/" +m[2]; 
					 return;
				  }
				  
				  reg = /\/key\/(\w+)(\/?)/ig;
				  m = reg.exec(href);
				  if(m){
					 window.location.href = mUrl + "key/" +m[1]+'/'; 
					 return;
				  }

				  reg = /\/gl\/(\w+)(\/?)/ig;
				  m = reg.exec(href);
				  if(m){
					 window.location.href = mUrl + "gl/" +m[1]+'/'; 
					 return;
				  }


				  reg = /\/jkku\/(\w+)\/(\w+)(\/?)/ig;
				  m = reg.exec(href);
				  if(m){
					 window.location.href = mUrl + "jkku/" +m[1]+'/'+ m[2]+'/'; 
					 return;
				  }

				  reg = /\/jkku\/(\w+)(\/?)/ig;
				  m = reg.exec(href);
				  if(m){
					 window.location.href = mUrl + "jkku/" +m[1]+'/';; 
					 return;
				  }

				  reg = /\/ku\/(\w+)\/(\w+)(\/?)/ig;
				  m = reg.exec(href);
				  if(m){
					 window.location.href = mUrl + "ku/" +m[1]+'/'+ m[2]+'/'; 
					 return;
				  }
				  				  
				  reg = /\/ku\/(\w+)(\/?)/ig;
				  m = reg.exec(href);
				  if(m){
					 window.location.href = mUrl + "ku/" +m[1]+'/'; 
					 return;
				  }
 				  
				  reg = /\/company\/(\d+)\.html/ig;
				  m = reg.exec(href);
				  if(m){
					 window.location.href = mUrl + "company/" + m[1] + '.html'; 
					 return;
				  }
				  
				  reg = /\/sytop\/(\w+)(\/?)/ig;
				  m = reg.exec(href);
				  if(m){
					 window.location.href = mUrl + "sytop/" + m[1] + '.html'; 
					 return;
				  }
				  
				  reg = /\/tx\/(\w+)_(\d+)\.html/ig;
				  m = reg.exec(href);
				  if(m){
				  	window.location.href = mUrl + "tx/" +m[1];  
				  	return;
				  }
				  
				  reg = /\/tx\//ig;
				  m = reg.exec(href);
				  if(m){
					 window.location.href = mUrl + "tx" + '.html';
					 return;
				  }
				  
				  reg = /\/qm\/(\w+)_(\d+)\.html/ig;
				  m = reg.exec(href);
				  if(m){
				  	window.location.href = mUrl + "qm/" +m[1];  
				  	return;
				  }
				  
				  reg = /\/qm\//ig;
				  m = reg.exec(href);
				  if(m){
					 window.location.href = mUrl + "qm" + '.html';
					 return;
				  }
				  
				  reg = /\/wm\/(\w+)_(\d+)\.html/ig;
				  m = reg.exec(href);
				  if(m){
				  	window.location.href = mUrl + "wm/" +m[1];  
				  	return;
				  }
				  
				  reg = /\/wm\//ig;
				  m = reg.exec(href);
				  if(m){
					 window.location.href = mUrl + "wm" + '.html';
					 return;
				  }
				  
				  reg = /\/tp\/(\w+)_(\d+)\.html/ig;
				  m = reg.exec(href);
				  if(m){
				  	window.location.href = mUrl + "tp/" +m[1];  
				  	return;
				  }
				  
				  reg = /\/tp\//ig;
				  m = reg.exec(href);
				  if(m){
					 window.location.href = mUrl + "tp" + '.html';
					 return;
				  }
				  
				  reg = /\/ss\/(\w+)_(\d+)\.html/ig;
				  m = reg.exec(href);
				  if(m){
				  	window.location.href = mUrl + "ss/" +m[1];  
				  	return;
				  }
				  
				  reg = /\/ss\//ig;
				  m = reg.exec(href);
				  if(m){
					 window.location.href = mUrl + "ss" + '.html';
					 return;
				  }
				  
				  reg = /\/bq\/(\w+)_(\d+)\.html/ig;
				  m = reg.exec(href);
				  if(m){
				  	window.location.href = mUrl + "bq/" +m[1];  
				  	return;
				  }
				  
				  reg = /\/bq\//ig;
				  m = reg.exec(href);
				  if(m){
					 window.location.href = mUrl + "bq" + '.html';
					 return;
				  }
				  
				  reg = /\/pf\/(\w+)_(\d+)\.html/ig;
				  m = reg.exec(href);
				  if(m){
				  	window.location.href = mUrl + "pf/" +m[1];  
				  	return;
				  }
				  
				  reg = /\/pf\//ig;
				  m = reg.exec(href);
				  if(m){
					 window.location.href = mUrl + "pf" + '.html';
					 return;
				  }
				  				  
				  reg = /\/gx\.html/ig;
				  m = reg.exec(href);
				  if(m){
					 window.location.href = mUrl + "gx" + '.html';
					 return;
				  }
				  
				  reg = /.+tags_(.+)\.html$/;
				  m = reg.exec(href);
				  if(m){
				  	var tagsname = document.querySelector('meta[name="Keywords"]').getAttribute('content');
				  	if(/iphone|ipad/i.test(navigator.userAgent)){
				  		window.location.href = smUrl + tagsname + '_ios_rank.html';  
				  	}else{
				  		window.location.href = smUrl + tagsname + '_android_rank.html';  
				  	}	
				  	return;
				  }

				  reg = /\.com(\/?)$/ig; 
				  m = reg.exec(href);
				  if(m){
					 window.location.href = mUrl ;  
					 return;
				  }



				  reg = /\/(list)\/s_(\d+)_(\d+)\.html/ig;
				  m = reg.exec(href);
				  if(m){
					 window.location.href = mUrl + "q/CatalogID/" +m[2]+ '/2/0/';  
					 return;
				  }

				  reg = /\/(list)\/s_(\d+)_new_(\d+)\.html/ig;
				  m = reg.exec(href);
				  if(m){
					 window.location.href = mUrl + "q/CatalogID/" +m[2]+ '/1/0/';  
					 return;
				  }

				  reg = /\/(list)\/r_(\d+)_(\d+)\.html/ig;
				  m = reg.exec(href);
				  if(m){
					 window.location.href = mUrl + "q/Rootid/" +m[2]+ '/2/0/';  
					 return;
				  }

				  reg = /\/(gamefz)\/(\d+)_(\d+)\.html/ig;
				  m = reg.exec(href);
				  if(m){
					 window.location.href = mUrl + "q/CatalogID/" +m[2]+ '/2/0/';  
					 return;
				  }

				  reg = /\/(qqfz)\/(\d+)_(\d+)\.html/ig;
				  m = reg.exec(href);
				  if(m){
					 window.location.href = mUrl + "q/CatalogID/" +m[2]+ '/2/0/';  
					 return;
				  }

				  reg = /\/(xcx)\/(\d+)_(\d+)\.html/ig;
				  m = reg.exec(href);
				  if(m){
					 window.location.href = mUrl + "q/CatalogID/" +m[2]+ '/2/0/';  
					 return;
				  }



				  
			  }
	       }
	
		  if(isFormMoblie){
			Cookie.set('donotredirect', 1, 7*24*3600*1000);
			return;
		} else if(isMoblie){
			if(!doNotRedirect)	Init.redirect(); 
		}
})()	


