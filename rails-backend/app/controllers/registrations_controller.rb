class RegistrationsController < ApplicationController
    def new
      @user = User.new
    end
    
    def create
      @user = User.new(user_params)
    
      if @user.save
        sign_in @user
        render json: { user: @user }, status: :created
      else
        render json: { error: @user.errors.full_messages }, status: :unprocessable_entity
      end
    end
  
    private
  
    def user_params
        params.require(:user).permit(:full_name, :email, :password)
      end
  end
  