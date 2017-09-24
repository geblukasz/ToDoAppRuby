
//= require cable
//= require_self
//= require_tree .

this.App = {};

App.cable = ActionCable.createConsumer("/cable");

App.project = App.cable.subscriptions.create('ProjectChannel', {  
	received: function(data) {
		var current_user = $('body').data('user');
		if (data.user_id != current_user) {
			$('.project_detail.' + data.project_id + ' .project_description').html(data.message);
		}
	}
});