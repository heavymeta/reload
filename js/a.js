$('#input_area').focus(function() {
  $('.text_area > p').html('');
  $('#input_area').focus();

});

$('#input_area').keyup(function() {
  $('.idea').removeClass('idea_full');
  $('.idea').addClass('idea_reduced');

  $('.text_area').removeClass('idea_full');
  $('.text_area').addClass('idea_reduced');

});
