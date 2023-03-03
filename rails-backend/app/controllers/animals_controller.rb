class AnimalsController < ApplicationController
 # before_action :authenticate_user!, only: [:create_comment, :create_reply, :update_comment_likes, :destroy_comment]

  attr_reader :current_user


  def index
    animals = Animal.all.includes(:comments)
    render json: animals.as_json(include: { comments: { include: :replies } })
  end
    
  def show
    animal = Animal.includes(comments: [:replies]).find_by(id: params[:id])
    render json: animal
  end

  def create
  animal = Animal.create(animal_params)
  render json: animal, status: :created
  end
  
  def update
    animal = Animal.find(params[:id])
    user_id = params[:user_id]
    likes = animal.likes.where(user_id: user_id)
    if likes.exists?
      likes.destroy_all
    else
      like = Like.new(user_id: user_id)
      animal.likes << like
    end
    animal.save
    render json: animal, include: :user
  end
  
  ####################
  #      COMMENTS    #
  ####################
  def create_comment
    @animal = Animal.find(params[:animal_id])
    @comment = @animal.comments.create(comment_params)
    @comment.save
    render json: @comment
  end
  


  def update_comment_likes
    comment = Comment.find(params[:comment_id])
    comment_like = comment.comment_likes.create
    comment_like.user = current_user
    render json: comment, include: :comment_likes
  end
  
  def destroy_comment
    comment = Comment.find(params[:comment_id])
    comment.user = current_user
    comment.replies.destroy_all
    comment.destroy
    head :no_content
  end
  
  def create_reply
    comment = Comment.find(params[:comment_id])
    reply = comment.replies.create(reply_params)
    reply.user = current_user
    render json: reply
  end
    
    
    private

  def comment_params
      params.require(:comment).permit(:comment, :reply, :user_id)
  end
      
  def reply_params
    params.require(:reply).permit(:reply)
  end
      
  def animal_params
    params.require(:animal).permit(:name, :likes,:breed,:image, :hobbies, :user_id, comments_attributes: [:comment, :comment_likes, replies_attributes: [:reply]])
  end
      
  def authorize_request
    unless current_user
    render json: { error: 'Unauthorized' }, status: :unauthorized
  end
end
end
