//タッチデバイス判定用
var touchDevice;

if("ontouchend" in window){
touchDevice = true;//タッチデバイス
}else{
touchDevice = false;//PC
}

//タッチデバイスの場合bodyにclass「touchDevice」追加
//--------------------------------------------------------
jQuery(function () {
if(touchDevice){//タッチデバイス専用
$("body").addClass("touchDevice");
}
});

//タッチデバイスの場合にページ内リンクがキチンと動くように
//--------------------------------------------------------
var flag;
$('a')
.bind( 'touchstart', function(){
flag = true;
}).bind( 'touchmove', function(){
flag = false;
}).bind( 'touchend', function(e){
linkEvent(this,e);
flag = false;
});

function linkEvent(self,e){
if(flag){
var url = $(self).attr('href'),
$target = $(url);
if ($target.length) {
e.preventDefault();
$(window).scrollTop($target.offset().top);
return false;
}
}
}


//Android調査
//--------------------------------------------------------
var ua = navigator.userAgent;
if( ua.search(/Android 2/) != -1) {
var oldAndroid = true;
} else if( ua.search(/Android 4/) != -1 || ua.search(/Android 5/) != -1 || ua.search(/Android 6/) != -1) {
var newAndroid = true;
}


//IE調査
//--------------------------------------------------------
var ieVer = $('html').attr('class');


//PC・スマホ切り替え
//--------------------------------------------------------
var vd = localStorage.getItem("viewDevice07");

$(function(){

$('#swPC').click(function(){
localStorage.setItem("viewDevice07", "pc");
location.reload();
});
$('#swSP').click(function(){
localStorage.setItem("viewDevice07", "sp");
location.reload();
});
$('#swClear').click(function(){
localStorage.clear();
location.reload();
});

//--
if( vd == "pc" ){
$('head').prepend('<meta name="viewport" content="width=1024">');
} else if( oldAndroid ) {
$('head').prepend('<meta name="viewport" content=”width=device-width,initial-scale=1,user-scalable=no”>');
} else if( vd == "sp" || deviceW < tabletW || windowW < tabletW) {
$('head').prepend('<meta name="viewport" content=”width=device-width,initial-scale=1,minimal-ui”>');
} else {
$('head').prepend('<meta name="viewport" content=”width=device-width,minimal-ui”>');
//Androidでバグるのでinitial-scaleはずした
}
//--
});


//古い環境のナビ隠し
//--------------------------------------------------------
if(touchDevice){
window.addEventListener("load", function() {
setTimeout(scrollBy, 100, 0, 1);
}, false);
}


//ウインドウ幅検査
//--------------------------------------------------------
var resizeTimer = false;//ウインドウリサイズ感知用タイマー
var windowW = $(window).width();//ウインドウの幅を取得
var deviceW = screen.width;//モニターの幅を取得
var tabletW = 768;//タブレット幅
var pcW = 1000;//PC幅

function pageWidthCheck(){//最低高さをブラウザの縦サイズいっぱいに本体
if(deviceW < tabletW || windowW < tabletW){
windowSize = "windowSP";
} else if( windowW >= tabletW && pcW > windowW || deviceW == tabletW) {//タブレットサイズ
windowSize = "windowTablet";
} else if( windowW > pcW) {//PCサイズ
windowSize = "windowPC";
} else {//スマホ
windowSize = "windowSP";
}// } if( windowW > tabletW && pcW > windowW )

}


//--------------------------------------------------------


jQuery(function () {//ページ読み込み時に実行
pageWidthCheck();
Menus();
});

$(window).resize(function() {// ウインドウリサイズ後にも実行
if(deviceW > pcW && ieVer != "ie8"){
if (resizeTimer !== false) {
clearTimeout(resizeTimer);
}
resizeTimer = setTimeout(function() {
// ここからウインドウリサイズ後の処理-----
location.reload();
// ----- ここまでウインドウリサイズ後の処理
}, 200);
}
});


//メインメニュー
//--------------------------------------------------------
function navPC(){
    var menuLinkChild = $("nav > ul > li > ul");
$("nav li:has(ul) > a").addClass("parent").after("<span>▼</span>");//トリガーボタン
var menuLink = $("nav > ul > li > span");

//読み込み時、子メニューを隠す
menuLinkChild.css("display","none");

var menuTablet = function () {//動作設定
menuLinkChild.css("display","none");

if($(this).hasClass("selected")){//メニューのリンクに「selected」のclassがついていたら
menuLink.removeClass("selected");
}else {//違うとき
menuLink.removeClass("selected");
$(this).next("ul").css("display","block");
$(this).addClass("selected");
}
}//-----menuTablet
menuLink.click(menuTablet);

//スクロールするとフィットするメニュー
if(!oldAndroid){
var nav = $('#nav-wrapper');	
var navTop = nav.offset().top;
$(window).scroll(function () {
	var winTop = $(this).scrollTop();
	if (winTop >= navTop) {
		nav.addClass('fixed')
	} else if (winTop <= navTop) {
		nav.removeClass('fixed')
	}
});
}//-----スクロールするとフィットするメニュー
}//-----navPC()

function navSP(){
    var navView = false;

if(touchDevice){
var menuSP = $("nav ul,nav button");
}else {
var menuSP = $("nav ul");
}

$("nav").prepend("<h2></h2>");//トリガーボタン
menuSP.css("display","none");

$("nav h2, nav a").click(function(){
if(!navView){
    menuSP.css("display","block");
    navView = true;
} else {
    menuSP.css("display","none");
    navView = false;
}
});
}//-----navSP()

function Menus(){
if(touchDevice){
    var vd = localStorage.getItem("viewDevice07");
    if(vd == "pc" || windowSize == "windowTablet"){
        navPC();
    }else if(vd == "sp"){
        navSP();
    } else {
        navSP();
    }
} else {
    if( windowSize == "windowSP" ){
        navSP();
        } else {
            navPC();
        }
}
    
}//-----Menus


//パララックス背景用 #bg1が奥で#bg3が手前
//--------------------------------------------------------
jQuery(function () {
$('body').wrapInner('<div id="bg1"><div id="bg2"><div id="bg3"></div></div></div>');

$(window).scroll(function(){
var y = $(this).scrollTop();
$('#bg1').css('background-position', '0 ' + parseInt( -y / 5 ) + 'px');
$('#bg2').css('background-position', '0 ' + parseInt( -y / 2 ) + 'px');
$('#bg3').css('background-position', '0 ' + parseInt( -y / 1 ) + 'px');
});
});

//タッチデバイスの場合、電話リンク
//--------------------------------------------------------
jQuery(function () {
if(touchDevice){
$(".tel").each(function(){
var str = $(this).text();
$(this).html($('<a>').attr('href', 'tel:' + str.replace(/-/g, '')).append(str + '</a>'));
});
}
});

//ページスクロール
//--------------------------------------------------------
jQuery(function(){
$('a[href^=#]').click(function(){
var target;
target = $( $(this).attr('href') );
if (target.length == 0) {
return;
}
if( windowSize == "windowSP" ){//スマホの場合
$('html, body').animate({scrollTop: target.offset().top});
} else {//スマホ以外の場合
$('html, body').animate({scrollTop: target.offset().top-20});
}
return false;
});
});

