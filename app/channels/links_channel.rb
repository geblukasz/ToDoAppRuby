class LinksChannel < ApplicationCable::Channel  
  def subscribed
    stream_from 'links'
  end
end 