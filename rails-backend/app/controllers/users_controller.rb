class UsersController < ApplicationController
  
  def index
    user = User.new
    render json: user
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
  
  def login
    user = User.find_by(email: params[:email])
    if user&.authenticate(params[:password])
      session[:user_id] = user.id
      render json: user.as_json(only: [:id, :email, :full_name]), status: :ok
    else
      render json: { error: 'Invalid email or password' }, status: :unauthorized
    end
  end
  

  def logout
    session[:user_id] = nil
    head :no_content
  end

  private

  def user_params
    params.require(:user).permit(:full_name, :email, :password)
  end
end
