class UsersController < ApplicationController
  #skip_before_action :authorized_user

  def index
    users = User.all
    render json: users.as_json(only: [:id, :email, :full_name])
  end

  def all_users
    users = User.all
    render json: users.as_json(only: [:id, :email, :full_name])
  end

  def show
    user = User.find(params[:id])
    render json: user.as_json(only: [:id, :email, :full_name])
  end

  def create
    user = User.new(user_params)
    if user.save
      session[:user_id] = user.id
      render json: user.as_json(only: [:id, :email, :full_name]), status: :created
    else
      render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
    end
  end
  
  private

  def user_params
    params.require(:user).permit(:full_name, :email, :password)
  end
end
