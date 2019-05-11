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

function widthCheck(){
var mainWidth = $('main').width();//ウインドウの幅を取得
var contensWidth = mainWidth - 75;//margin類をマイナス
var minContensWidth = 450;//スタイル切替になる幅
// alert(mainW);

$('figure img').each(function(){
var imgWidth = $(this).attr("width");
var textWidth = contensWidth - imgWidth;

$(this).closest('figure').children('figcaption').css("width", imgWidth);

if( mainWidth > minContensWidth ){
$(this).closest('article').children('div').css("width", textWidth);
} else {//幅が狭くなってカラム落ちしたときのdiv幅
$(this).closest('article').children('div').css("width", "100%");
}
});

$('.img-wrapper img').each(function(){
if( mainWidth > minContensWidth ){
var imgWidth = $(this).attr("width");
var textWidth = contensWidth - imgWidth;
$(this).closest('section').children('table').css("width", textWidth);
} else {//幅が狭くなってカラム落ちしたときのテーブル幅
$(this).closest('section').children('table').css("width", "90%");
}
});

$('.sub').each(function(){
if( mainWidth > minContensWidth ){
var indexWidth = 320;
var textWidth = contensWidth - indexWidth + 40;
$(this).closest('section').children('div[class!="sub"]').css("width", textWidth);
} else {//幅が狭くなってカラム落ちしたときのdiv幅
$(this).closest('section').children('div[class!="sub"]').css("width", "100%");
}
});

//tile.jsを実行
 $("#wrapper > div").tile();
 $(".img-list figure, .img-list div.img-wrapper").tile();

};

//ウインドウ幅検査
//--------------------------------------------------------
$(window).resize(function() {// ウインドウリサイズ後にも実行
// ここからウインドウリサイズ後の処理-----
widthCheck();
// ----- ここまでウインドウリサイズ後の処理
});

//widthCheck 読み込み時に実行
jQuery(function () {
widthCheck();
});














