class AddCommentFieldsToComments < ActiveRecord::Migration[7.0]
  def change
    add_column :comments, :comment, :text
    add_reference :comments, :animal, null: false, foreign_key: true
  end
end
