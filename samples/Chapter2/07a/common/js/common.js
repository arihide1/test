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

//2個おきにclass 追加 topのミニバナー専用
jQuery(function () {
$(".two:nth-child(odd)").addClass("end-line");
});

//画像|テキスト のレイアウトで画像サイズに合わせてテキスト部分の横幅を
//スタイルに書込  695はmargin類を省いたサイトの幅
jQuery(function(){
var pageWidth = 695;

$('article img').each(function(){
var imgWidth = $(this).attr("width");
var textWidth = pageWidth - imgWidth;
$(this).closest("article").children('div.img-wrapper + div').css("width", textWidth);
});

});























