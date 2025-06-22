class Tag < ApplicationRecord
  has_many :drawing_tags, dependent: :destroy
  has_many :drawings, through: :drawing_tags

  validates :name, presence: true, uniqueness: true
end
