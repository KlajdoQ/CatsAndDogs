class CreateCommentLikes < ActiveRecord::Migration[7.0]
  def change
    create_table :comment_likes do |t|
      t.integer :likes
      t.references :comment, null: false, foreign_key: true

      t.timestamps
    end
  end
end

