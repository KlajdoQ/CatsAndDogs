Rails.application.routes.draw do
  resources :users
  post '/login', to: 'sessions#create'
  post '/signup', to: 'users#create'
  get '/signup', to: 'users#index'
  delete '/logout', to: 'sessions#destroy'
  put '/users/:id', to: 'users#update'

  resources :messages, only: [:create, :index]
  get '/messages', to: 'messages#index'

  mount ActionCable.server => '/cable'

  resources :animals do
    patch '/animals/:id', to: 'animals#update'
    post 'comments', to: 'animals#create_comment'
    post 'comments/:comment_id/replies', to: 'animals#create_reply'
    member do
      post 'update_comment_likes', to: 'animals#update_comment_likes'
    end
    delete 'comments/:comment_id', to: 'animals#destroy_comment'
    post ':id/update_likes', to: 'animals#update_likes'

  end
end
