Rails.application.routes.draw do
  mount ActionCable.server => '/cable'
  devise_for :users

  post 'projects/send_link_action', to: 'projects#send_link_action'
  resources :projects do
  	resources :tasks do
  		member do
  			get :complete
  			get :incomplete
  		end
  	end
  end

  root "projects#index"

end
