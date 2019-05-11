//ページ内リンクをスクロール
jQuery(function (){
$('a[href^=#]').click(function() {
var speed = 400; // ミリ秒
var href= $(this).attr("href");
var target = $(href == "#" || href == "" ? 'html' : href);
var position = target.offset().top;
$('body,html').animate({scrollTop:position}, speed, 'swing');
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
var imgWidth = $(this).attr("width");
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

//画像|テキスト のレイアウトで画像サイズに合わせてテキスト部分の横幅をスタイルに書込
//  865(pageWidth)はmargin類を省いたサイトの幅
//  865(frameWidth)はフレーム付き記事用
jQuery(function(){
var pageWidth = 765;
var frameWidth = 8;

// if($('.frame')[0]){
// alert("わくあり");
// }

$('article > img, article > figure img').each(function(){
var imgWidth = $(this).attr("width");
var textWidth = pageWidth - imgWidth;
var frameTextWidth = pageWidth - imgWidth - frameWidth;


if($(this).parents('.frame')[0]){//枠有り
//イメージ直置き
$(this).closest("article").children('div').css('width', frameTextWidth)
	.css('height', $(this).closest('article').height());
} else {//枠無し
//イメージ直置き
$(this).closest("article").children('div').css("width", textWidth);
//figure使用
$(this).parent().children('div').css("width", textWidth);
};
});

$('article div img').each(function(){
var imgWidth = $(this).attr("width");
var textWidth = pageWidth - imgWidth;
$(this).closest("div").children("div").css("width", textWidth)
.css("color", "green");;
});

});

//パララックス背景用 #bg1が奥で#bg3が手前
//--------------------------------------------------------
jQuery(function () {
$('body').wrapInner('<div id="bg1"><div id="bg2"><div id="bg3"><div id="bg4"></div></div></div></div>');

$(window).scroll(function(){
var y = $(this).scrollTop();
$('#bg1').css('background-position', '0 ' + parseInt( -y / 3 ) + 'px');
$('#bg2').css('background-position', '0 ' + parseInt( -y / 2 ) + 'px');
$('#bg3').css('background-position', '0 ' + parseInt( -y / 1 ) + 'px');
});
});


//スクロールするとフィットするメニュー
//--------------------------------------------------------
jQuery(function () {
var nav = $('#navigation');
var navTop = nav.offset().top;
$(window).scroll(function () {
var winTop = $(this).scrollTop();
if (winTop >= navTop) {
nav.addClass('fixed')
} else if (winTop <= navTop) {
nav.removeClass('fixed')
}
});
});
//-----スクロールするとフィットするメニュー


//タッチデバイス判定用
var touchDevice;

if("ontouchend" in window){
touchDevice = true;//タッチデバイス
}else{
touchDevice = false;//PC
}

jQuery(function(){
if( touchDevice ){
$('head').prepend('<meta name="viewport" content="width=1100">');
}
});
















