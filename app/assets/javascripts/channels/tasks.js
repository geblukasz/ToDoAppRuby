App.tasks = App.cable.subscriptions.create('TasksChannel', {  
	received: function(data) {
	  	$("#tasks").removeClass('hidden');

	  	if ($('#tasks').data('project') == data.project_id) {

	  		$('#tasks').append(this.renderMessage(data));
	  		$('#task_content').val('');
	  	}

	  	return true;
	    
	},

	renderMessage: function(data) {
		var template;
		var current_user = $('body').data('user');
		if (data.current_user == current_user) {
			template = '<div class="row clearfix" data-task="' + data.task_id + '">' +
				'<div class="complete">' +
					'<a href="/projects/' + data.project_id + '/tasks/' + data.task_id + '/complete" data-remote="true"> ' +
						'<i class="fa fa-check"></i>' +
					'</a>' +
				'</div>' +
				'<div class="todo_item">' +
					'<p>' + data.task_content + '</p>' +
				'</div>' +
				'<div class="trash">' +
					'<a data-confirm="Are you sure?" data-remote="true" data-method="delete" rel="nofollow" href="/projects/' + data.project_id + '/tasks/' + data.task_id + '">' +
						'<i class="fa fa-trash"></i>' +
					'</a>' +
				'</div>' +
			'</div>';
		} else {
			template = '<div class="row clearfix" data-task="' + data.task_id + '" >' +
				'<div class="complete">' +
				'</div>' +
				'<div class="todo_item">' +
					'<p>' + data.task_content + '</p>' +
				'</div>' +
				'<div class="trash">' +
				'</div>' +
			'</div>';
		}
		return template;
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
	}
});

App.tasks_update = App.cable.subscriptions.create('TasksupdateChannel', {  
	received: function(data) {
		var current_user = $('body').data('user');
		var template;
		if (data.current_user == current_user) {
			if (data.task.completed_at == null) {
				template = '<div class="complete">'+
						'<a data-remote="true" href="/projects/'+ data.task.project_id +'/tasks/'+ data.task.id +'/complete"> '+
							'<i class="fa fa-check"></i>'+
						'</a>'+
					'</div>'+
					'<div class="todo_item">'+
						'<p>'+ data.task.content +'</p>'+
					'</div>'+
					'<div class="trash">'+
						'<a data-confirm="Are you sure?" data-remote="true" rel="nofollow" data-method="delete" href="/projects/'+ data.task.project_id +'/tasks/'+ data.task.id +'">'+
							'<i class="fa fa-trash"></i>'+
						'</a>'+
					'</div>';
			} else {
				template = '<div class="complete">' +
						'<a data-remote="true" href="/projects/'+ data.task.project_id +'/tasks/'+ data.task.id +'/incomplete">' +
							'<i style="opacity:0.4;" class="fa fa-check"></i>' +
						'</a>' +
					'</div>' +
					'<div class="todo_item">' +
						'<p style="opacity: 0.4;"><strike>'+ data.task.content +'</strike></p>' +
					'</div>' +
					'<div class="trash">' +
						'<a data-confirm="Are you sure?" data-remote="true" rel="nofollow" data-method="delete" href="/projects/'+ data.task.project_id +'/tasks/'+ data.task.id +'">' +
							'<i class="fa fa-trash"></i>' +
						'</a>' +
					'</div>';
			}
		} else {
			if (data.task.completed_at == null) {
				template = '<div class="complete">'+
					'</div>'+
					'<div class="todo_item">'+
						'<p>'+ data.task.content +'</p>'+
					'</div>'+
					'<div class="trash">'+
					'</div>';
			} else {
				template = '<div class="complete">' +
					'</div>' +
					'<div class="todo_item">' +
						'<p style="opacity: 0.4;"><strike>'+ data.task.content +'</strike></p>' +
					'</div>' +
					'<div class="trash">' +
					'</div>';
			}
		}

		$('#tasks .row[data-task=' + data.task.id + ']').html(template);

	}
});
