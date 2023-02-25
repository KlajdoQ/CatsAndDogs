Rails.application.routes.draw do
  resources :animals do
    post 'comments', to: 'animals#create_comment'
    post 'comments/:comment_id/replies', to: 'animals#create_reply'
    post '/update_comment_likes', to: 'animals#update_comment_likes'
    delete 'comments/:comment_id', to: 'animals#destroy_comment'
  end
end