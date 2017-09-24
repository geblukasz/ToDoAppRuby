class ProjectChannel < ApplicationCable::Channel  
  def subscribed
    stream_from 'project'
  end
end 