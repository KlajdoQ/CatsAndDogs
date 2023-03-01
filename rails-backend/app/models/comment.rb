class Comment < ApplicationRecord
  belongs_to :animal
  belongs_to :user
  has_many :replies, dependent: :destroy
  has_many :comment_likes, class_name: 'CommentLikes'

  after_create do
    self.replies = [] if self.replies.nil?
  end
end