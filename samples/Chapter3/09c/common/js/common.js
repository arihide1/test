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
var vd = localStorage.getItem("viewDevice09");

$(function(){

$('#swPC').click(function(){
localStorage.setItem("viewDevice09", "pc");
location.reload();
});
$('#swSP').click(function(){
localStorage.setItem("viewDevice09", "sp");
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


//ドロップダウンメニュー
//--------------------------------------------------------

jQuery(function () {//ページ読み込み時に実行

var menuLink = $("nav > ul > li");
var menuLinkChild = $("nav > ul > li > ul");

//読み込み時、子メニューを隠す
menuLinkChild.css("display","none");

var MenuHoverOrClick = function () {//動作設定
menuLinkChild.css("display","none");

if($(this).hasClass("selected")){//メニューのリンクに「selected」のclassがついていたら
menuLink.removeClass("selected");
}else {//違うとき
menuLink.removeClass("selected");
$(this).children("ul").css("display","block");
$(this).addClass("selected");
}
}
if(touchDevice){
menuLink.click(MenuHoverOrClick);//タッチデバイスの時は動作設定をclickに設定(touchendは敏感すぎてメニューOPEN前のメニューが押された事になるのでだめ)
//menuLink.bind("touchend",MenuHoverOrClick);
}else {
menuLink.hover(MenuHoverOrClick);//タッチデバイスではない時は動作設定をhoverに設定
}

});


//最低高さをブラウザの縦サイズいっぱいに
//--------------------------------------------------------
var resizeTimer = false;//リサイズ用タイマー

function pageMinHeight(){//最低高さをブラウザの縦サイズいっぱいに本体
var windowH = $(window).height();//画面の高さを取得
$('body>header, section').css('min-height',windowH+'px'); 

$('body>header, section').each(function() {

$(this).children("div").css("padding-top", "0px");//CSSを初期化
var pageH = $(this).children("div").innerHeight();//各header, sectionの直下のDivのサイズ

if(windowH > pageH) {//ウインドウの高さ(wH)が各header, section(pH)より大きい場合
var paddingTop = (windowH-pageH)/2;
$(this).children("div").css("padding-top",paddingTop+'px');//縦方向に中央になるようにpaddingを取った
} else {
$(this).children("div").css("padding-top", "10px").css("padding-bottom", "25px");//内容が大きい場合は最低値のpaddingを設定
}// } if(windowH > pageH)
});
}

jQuery(function () {//ページ読み込み時に実行
pageMinHeight();
});

$(window).resize(function() {// ウインドウリサイズ後にも実行
if(deviceW > pcW && ieVer != "ie8"){
if (resizeTimer !== false) {
clearTimeout(resizeTimer);
}
resizeTimer = setTimeout(function() {
// ここからウインドウリサイズ後の処理-----
pageMinHeight();
// ----- ここまでウインドウリサイズ後の処理
}, 200);
}
});


//古い環境のナビ隠し
//--------------------------------------------------------
if(touchDevice){
window.addEventListener("load", function() {
setTimeout(scrollBy, 100, 0, 1);
}, false);
}



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

//stripeクラスのついている子要素をシマシマクラス追加
jQuery(function () {
$(".stripe li:nth-child(odd), .stripe tr:nth-child(odd)").addClass("odd");
});
//指定要素にシマシマクラス追加
jQuery(function () {
$("section:nth-child(odd)").addClass("odd");
});

//各sectionに個別のclass割り振り（idにしたらページ内リンクの挙動がおかしくなる）
//--------------------------------------------------------
jQuery(function (){
var secNo = 0;
$('section').each(function() {
secNo++;
$(this).addClass("secNo"+secNo);
});
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
$('html, body').animate({scrollTop: target.offset().top});
return false;
});
});

