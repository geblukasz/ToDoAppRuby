App.tasks = App.cable.subscriptions.create('TasksChannel', {  
  received: function(data) {
  	console.log(data)
  	$("#tasks").removeClass('hidden')
    return $('#tasks').append(this.renderMessage(data));
  },

  renderMessage: function(data) {
    return "<p>" + data.task + "</p>";
  }
});