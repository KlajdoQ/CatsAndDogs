class ApplicationController < ActionController::API
  #before_action :authorized_user

  # def current_user
  #   user = User.find_by(id:session[:user_id])
  #   user
  # end


  # def authorized_user 
  #   render json: {error: "Not authorized"}, status: :unauthorized
  # end


 
    #before_action :authenticate_user!
  
    private
    def current_user
      @current_user ||= User.find_by(id: session[:user_id]) if session[:user_id]
    end
  
  
    def authenticate_user!
      unless current_user
        render json: { error: 'Unauthorized' }, status: :unauthorized
      end
    end

  private

  def authenticate_user!
    unless current_user
      render json: { error: 'Unauthorized' }, status: :unauthorized
    end
  end

end


