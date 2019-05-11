//このページのはじめに戻る
jQuery(function() {
var pagetop = $('#goto-pagetop');
$(window).scroll(function () {
if ($(this).scrollTop() > 200) {
pagetop.fadeIn();
} else {
pagetop.fadeOut();
}
});
pagetop.click(function () {
$('body, html').animate({ scrollTop: 0 }, 500);
return false;
});
});

//stripeクラスのついている子要素をシマシマクラス追加
jQuery(function () {
$(".stripe li:nth-child(odd), .stripe tr:nth-child(odd)").addClass("odd");
});

//自動的に改行
jQuery(function () {
//figure:nth-child(4n) 1行3項目・4項目目にスタイル
$("figure:nth-child(4n), .imgList article:nth-of-type(4n)").addClass("clear");
$("figure:nth-child(3n), .imgList article:nth-of-type(3n)").addClass("endOfLine");
});

//figureの内容の画像サイズをスタイルに書込
jQuery(function(){
$("figure img").each(function(){
var preImgWidth = $(this).attr("width");
preImgWidth = parseInt(preImgWidth);
if($(this).parents("article")[0]){
var designWidth = 20;
}else {
var designWidth = 0;	
}
var imgWidth = preImgWidth + designWidth;
$(this).parents("figure").css("width", imgWidth );
//$(this).closest("article").css("background", "rgba(255, 0, 0, .1)" );
});
});

//画像サイズを親のarticleのスタイルに書込（画像一覧表用）
jQuery(function(){
$(".imgList article img").each(function(){
var imgWidth = $(this).attr("width");
$(this).parents("article").css("width", imgWidth );
});
});

//画像|テキスト のレイアウトで画像サイズに合わせてテキスト部分の横幅を
//スタイルに書込  875はmargin類を省いたサイトの幅
jQuery(function(){
var pageWidth = 875;

$('article > img, article > figure img').each(function(){
var imgWidth = $(this).attr("width");
var textWidth = pageWidth - imgWidth;
$(this).closest("article").children('div').css("width", textWidth);
$(this).parent().children('div').css("width", textWidth);
});

$('article div img').each(function(){
var imgWidth = $(this).attr("width");
var textWidth = pageWidth - imgWidth;
$(this).closest("div").children("div").css("width", textWidth);
});

});


//01-2専用
//-----------------------------------------------------------
//デザイン用要素追加
jQuery(function(){
$('body > header nav').wrapInner('<div id="navInner"></div>');
$('article img').not('.imgList img, .access img').wrap('<div class="imgFlame"></div>');
});

//#slideがあったら背景用スタイルを追加
jQuery(function(){
if($('#slider')[0]){
var slider = $("#slider");
var sliderOffset = slider.offset();
var sliderPosition = sliderOffset.top;//slideの位置
var sliderHeight = $("#slider > img").height();//slide中の画像の高さ
var sliderBackHeight = 400;//slide背景の高さ
var bodyMargin = 20;//bodyのmargin-top/border-top類の高さ
var slideBackPosition = (sliderHeight - sliderBackHeight)/2 + sliderPosition - bodyMargin;
$('body').prepend('<div id="slideBack" style="top: ' + slideBackPosition + 'px;"></div>');
}
});

//サイトタイトル前にmargin追加
jQuery(function(){
siteTitle();
});

function siteTitle(){
var windowWidth = $(window).width();
var contentsWidth = 1000;
var centerMargin = (windowWidth - contentsWidth)/2;
$('body > header > h1').css("padding-left", centerMargin);
};

//IE調査
//--------------------------------------------------------
var ieVer = $('html').attr('class');

var resizeTimer = false;//ウインドウリサイズ感知用タイマー

$(window).resize(function() {// ウインドウリサイズ後にも実行
//if(ieVer != "ie8"){
if (resizeTimer !== false) {
clearTimeout(resizeTimer);
}
resizeTimer = setTimeout(function() {
// ここからウインドウリサイズ後の処理-----
siteTitle();
// ----- ここまでウインドウリサイズ後の処理
}, 200);
//｝
});


//タッチデバイス判定用
var touchDevice;

if("ontouchend" in window){
touchDevice = true;//タッチデバイス
}else{
touchDevice = false;//PC
}

jQuery(function(){
if( touchDevice ){
$('head').prepend('<meta name="viewport" content="width=1000">');
}
});





