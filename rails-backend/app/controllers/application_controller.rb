class ApplicationController < ActionController::API
  #before_action :authorized_user

  # def current_user
  #   user = User.find_by(id:session[:user_id])
  #   user
  # end


  # def authorized_user 
  #   render json: {error: "Not authorized"}, status: :unauthorized
  # end
  private

  def authenticate_user!
    unless current_user
      render json: { error: 'Unauthorized' }, status: :unauthorized
    end
  end

end


