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

//画像|テキスト のレイアウトで画像サイズに合わせてテキスト部分の横幅を
//スタイルに書込  775はmargin類を省いたサイトの幅
jQuery(function(){
var pageWidth = 765;

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


//タッチデバイス判定用
var touchDevice;

if("ontouchend" in window){
touchDevice = true;//タッチデバイス
}else{
touchDevice = false;//PC
}

jQuery(function(){
if( touchDevice ){
$('head').prepend('<meta name="viewport" content="width=1050">');
}
});




















