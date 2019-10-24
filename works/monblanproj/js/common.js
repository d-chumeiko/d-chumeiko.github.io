  $('.openBtnFrom').click(function(){
    var myDatepicker = $('.datepicker-from').data('datepicker');
    myDatepicker.show();
  });
  $('.closeBtnFrom').click(function(){
    var myDatepicker = $('.datepicker-from').data('datepicker');
    myDatepicker.clear();
  });
  $('.openBtnTo').click(function(){
    var myDatepicker = $('.datepicker-to').data('datepicker');
    myDatepicker.show();
  });
  $('.closeBtnTo').click(function(){
    var myDatepicker = $('.datepicker-to').data('datepicker');
    myDatepicker.clear();
  });

  $('.datepicker-from, .datepicker-to').datepicker({
    dateFormat: "d _ m _ yyyy"
  });

  $(function(){
    $("#loadMore").on('click', function (e) {
      e.preventDefault();
      $(".hidden").slice(0, 3).slideDown();
      $("#button-load").fadeOut(800);
      $('html, body').animate({scrollTop:$(document).height()}, 'slow');
      return false;
    });
  })

$('.image-popup-zoom').magnificPopup({
 type: 'image',
 cursor: 'mfp-zoom-out-cur',
 zoom: {
     enabled: true,
     duration: 300 // продолжительность анимации. Не меняйте данный параметр также и в CSS
 }
 });