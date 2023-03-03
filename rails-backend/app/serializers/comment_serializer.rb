class CommentSerializer < ActiveModel::Serializer
  attributes :id, :comment, :user_id, :author_full_name

  def author_full_name
    object.user&.full_name
  end


end
