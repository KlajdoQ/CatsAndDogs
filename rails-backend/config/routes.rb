Rails.application.routes.draw do
  
  resources :users, only: [:create, :show, :index, :destroy]
  post '/login', to: 'sessions#create'
  post '/signup', to: 'users#create'
  get '/signup', to: 'users#index'
  delete '/logout', to: 'sessions#destroy'
  #get '/authorized', to: 'users#show'
  
  resources :animals do
    patch '/animals/:id', to: 'animals#update'
    
    post 'comments', to: 'animals#create_comment'
    post 'comments/:comment_id/replies', to: 'animals#create_reply'
    post '/update_comment_likes', to: 'animals#update_comment_likes'
    delete 'comments/:comment_id', to: 'animals#destroy_comment'
  end
end
