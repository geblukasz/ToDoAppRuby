$(document).ready(function() {
  $(document).on('click', '.btn-make-link', function() {
	console.log('click');
	var current_url = document.URL;
	var user_id = $(this).closest('.url_area').find('.select_user').val();
	$(this).closest('.url_area').find('.url_link').val(current_url + '?user_id=' +user_id);
	$('.btn-make-link').hide();
	$('.btn-send-link').show();
	$('.btn-cancel-link').show();
  });

  $(document).on('click', '.btn-send-link', function() {
	console.log($(this).closest('.url_area').find('.url_link').val());
	// send_request($(this).closest('.url_area').find('.url_link').val());
  })
  $(document).on('click', '.btn-cancel-link', function() {
	$(this).closest('.url_area').find('.url_link').val('');
	$('.btn-make-link').show();
	$('.btn-send-link').hide();
	$('.btn-cancel-link').hide();
	});
});