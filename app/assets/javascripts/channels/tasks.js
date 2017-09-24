App.tasks = App.cable.subscriptions.create('TasksChannel', {  
  received: function(data) {
    $("#tasks").removeClass('hidden');
    $('.no_task_present').addClass('hidden');

	if ($('#tasks').data('project') == data.project_id) {
	  $('#tasks').append(data.task_content);
	  $('#task_content').val('');
	  clearByUserRole(data);
	}
	return true;
  }
});

App.links = App.cable.subscriptions.create('LinksChannel', {  
  received: function(data) {
    var current_user = $('body').data('user');
	console.log('link');
	if (data.message.user == current_user) {
	  var link = $(window.document.createElement('a'))
	  .addClass("notify-link")
	  .attr('href', data.message.url_link)
	  .html("New Link");
	  $.ambiance({message: link,
	  permanent: true});
	  console.log('alert');
	}
  },

  renderMessage: function(data) {
    return "<p>" + data.task + "</p>";
  }
});

App.tasks_delete = App.cable.subscriptions.create('TasksdeleteChannel', {  
  received: function(data) {
    $('#tasks .row[data-task=' + data.task_id + ']').remove();

    // console.log($('#tasks').html());
    if (!($('#tasks').html())) {
      console.log('empty');
      $('.no_task_present').removeClass('hidden');
    }
  }
});

App.tasks_update = App.cable.subscriptions.create('TasksupdateChannel', {  
  received: function(data) {
    var current_user = $('body').data('user');
	$('#tasks .row[data-task=' + data.task_id + ']').html(data.template);
	clearByUserRole(data);
  }
});
function clearByUserRole(data) {
  var current_user = $('body').data('user');
  if (current_user != data.user_id) {
    $('.complete').html('');
	$('.trash').html('');
  }
}