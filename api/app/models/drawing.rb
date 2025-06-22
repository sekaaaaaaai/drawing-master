class Drawing < ApplicationRecord
  has_one_attached :cad_file
  has_one_attached :pdf_file
  
  has_many :drawing_tags, dependent: :destroy
  has_many :tags, through: :drawing_tags

  validates :number, presence: true, uniqueness: true
end
