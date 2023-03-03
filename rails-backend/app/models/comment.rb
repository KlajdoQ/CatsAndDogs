class Comment < ApplicationRecord
  belongs_to :user
  belongs_to :animal
  has_many :replies, dependent: :destroy

  attribute :author_name, :string

  validates :comment, presence: true
end
