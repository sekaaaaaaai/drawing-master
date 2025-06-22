class CreateDrawingTags < ActiveRecord::Migration[7.0]
  def change
    create_table :drawing_tags do |t|
      t.references :drawing, null: false, foreign_key: true
      t.references :tag, null: false, foreign_key: true

      t.timestamps
    end
    
    add_index :drawing_tags, [:drawing_id, :tag_id], unique: true
  end
end
