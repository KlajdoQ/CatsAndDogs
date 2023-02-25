class AnimalsController < ApplicationController
    def index
        animals = Animal.all.includes(:comments)
        render json: animals.as_json(include: { comments: { include: :replies } })
    end


    def show 
      animal = Animal.includes(comments: [:replies]).find_by(id: params[:id])
      render json: animal
    end


    def create_comment
      animal = Animal.find(params[:animal_id])
      comment = animal.comments.create(comment_params)
      render json: comment, include: :comment_likes, status: :created
    end
    

    def create_reply
      comment = Comment.find(params[:comment_id])
      reply = comment.replies.create(reply_params)
      render json: reply
    end

    def update
      animal = Animal.find(params[:id])
      animal.update(animal_params)
      render json: animal
    end

    def update_comment_likes
      comment = Comment.find(params[:comment_id])
      comment_like = comment.comment_likes.create
      render json: comment, include: :comment_likes
    end

    private

  def comment_params
    params.require(:comment).permit(:comment, :likes)
  end

  def reply_params
    params.require(:reply).permit(:reply)
  end

  def animal_params
    params.require(:animal).permit(:name, :species, :breed, :age, :likes, comments_attributes: [:comment, :likes, replies_attributes: [:reply]])
  end
  
end
