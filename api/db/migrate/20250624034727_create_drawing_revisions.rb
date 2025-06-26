class CreateDrawingRevisions < ActiveRecord::Migration[7.0]
  def change
    create_table :drawing_revisions do |t|
      t.references :drawing, null: false, foreign_key: true
      t.string :symbol
      t.text :remarks
      t.references :previous_revision, foreign_key: { to_table: :drawing_revisions }

      t.timestamps
    end
  end
end
