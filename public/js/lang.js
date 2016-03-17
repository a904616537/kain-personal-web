$(function() {
  $('#language_en').on('click', function() {
    $.cookie('lang', 'en');
    location.reload();
  })
  $('#language_ch').on('click', function() {
    $.cookie('lang', 'zh-CN');
    location.reload();
  })
})
