

class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  #  devise :database_authenticatable, :registerable,
  #        :recoverable, :rememberable, :validatable
    has_secure_password 

    has_many :animals 
    has_many :likes 
    has_many :comments
    has_many :comment_likes 
    has_many :replies 

    validates :email, presence: true
    validates :password, presence: true
end
