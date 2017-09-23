class TasksupdateChannel < ApplicationCable::Channel  
  def subscribed
    stream_from 'tasksupdate'
  end
end 