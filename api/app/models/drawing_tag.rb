class DrawingTag < ApplicationRecord
  belongs_to :drawing
  belongs_to :tag
end
