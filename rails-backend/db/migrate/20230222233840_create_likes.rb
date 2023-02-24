class CreateLikes < ActiveRecord::Migration[7.0]
  def change
    create_table :likes do |t|
      t.integer :animal_id

      t.timestamps
    end
  end
end
