//百度统计(总)
var _hmt = _hmt || [];
var _hmUrl = 'https://hm.baidu.com/hm.js?';
$(function () {//tongji
  (function () {
    var hm = document.createElement("script");
    hm.src = _hmUrl+"3872b1c4874390f5451f343f8eff88ff";
    var s = document.getElementsByTagName("script")[0];
    s.parentNode.insertBefore(hm, s);
  })();
});
//百度统计个人
if (typeof _webInfo != "undefined") {//add tongji for everyBJ
  var bjname = _webInfo.Username;
  var hm = document.createElement("script");
  if (bjname != '') {
    switch (bjname){
        case 'wangkang':
        hm.src = _hmUrl+"c4c347665864a5367de74ea9fbc0b07b";
        break;   
        case 'wangkang123':
        hm.src = _hmUrl+"fea57dec5165af6c0cc2aca35e7c0fcf";
        break;   
        case 'wyz':
        hm.src = _hmUrl+"54f02dd7975912b2928a38f09e21b885";
        break;      
        case 'caozhi':
        hm.src = _hmUrl+"dd722f5ea928e4b4752233db4e1eecb5";
        break;           
        case 'xhl':
        hm.src = _hmUrl+"1a28e4e6b63f59eb54b9db3327e4edc6";
        break;                                      
        case 'wanwenting':
        hm.src = _hmUrl+"3870fdb7630f9a668dc7ea4e4569429d";
        break;      
        case 'wwy':
        hm.src = _hmUrl+"e222a3875acd0bbb11f87f1c1412aebe";
        break;                    
        case 'ywl':
        hm.src = _hmUrl+"4e5f54844a73a9a2d300ac6b6fd8d37d";
        break;          
        case 'zhouyi':
        hm.src = _hmUrl+"83ebd8864c3763aedf20eea9b2f9a1f5";
        break;                   
        case 'hhy':
        hm.src = _hmUrl+"a578adfa43d3c366bc645595e554706f";
        break;     
        case 'zql':
        hm.src = _hmUrl+"517ec2b04d65a40bf2e7af80d372c439";
        break;    
        case 'myl':
        hm.src = _hmUrl+"ac254a8787203555b8acb26db65ca642";
        break;   
        case 'fanting':
        hm.src = _hmUrl+"d491180122cc9cbb0d320d5b38f68e46";
        break;    
        case 'wzk':
        hm.src = _hmUrl+"9d49fa30fe11bb22880144eefd76df99";
        break;          
        case 'empty':
        hm.src = _hmUrl+"b94973eb6004970b3100ab149e8d0f4e";
        break;  
        case 'lqq':
        hm.src = _hmUrl+"61d820162709f3cf2ba30f045739a92a";
        break;  
        case 'tianyue':
        hm.src = _hmUrl+"b9e6c58a7811adf65e7c70b62d9cad16";
        break; 
        case 'dyt':
        hm.src = _hmUrl+"1f5c5d5ba4c4aeb72e10b53819495f09";
        break;  
        case 'xxj':
        hm.src = _hmUrl+"b05f54591c911c642f6ec701adb3525e";
        break;  
        case 'wjt':
        hm.src = _hmUrl+"2290b2848e24dfdd7a7633f5e96a96bd";
        break;  
        case 'xjy':
        hm.src = _hmUrl+"1eff9cf6e81c78c83a9002dea33b8b4e";
        break; 
    }
    if (hm.src != '') {
      var s = document.getElementsByTagName("script")[0];
      s.parentNode.insertBefore(hm, s);
    }
  }
}
