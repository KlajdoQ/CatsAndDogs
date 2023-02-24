class CreateAnimals < ActiveRecord::Migration[7.0]
  def change
    create_table :animals do |t|
      t.string :name
      t.string :image
      t.string :breed
      t.string :hobbies
      t.integer :likes

      t.timestamps
    end
  end
end
