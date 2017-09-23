class TasksdeleteChannel < ApplicationCable::Channel  
  def subscribed
    stream_from 'tasksdelete'
  end
end 