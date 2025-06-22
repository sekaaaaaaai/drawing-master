class CreateDrawings < ActiveRecord::Migration[7.0]
  def change
    create_table :drawings do |t|
      t.string :number, null: false
      t.string :name, null: false
      t.text :remarks

      t.timestamps
    end
    add_index :drawings, :number, unique: true
  end
end
