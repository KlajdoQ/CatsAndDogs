class Comment < ApplicationRecord
    belongs_to :animal
    has_many :replies
    has_many :comment_likes, class_name: 'CommentLikes'
  end