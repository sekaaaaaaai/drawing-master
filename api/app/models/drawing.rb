class Drawing < ApplicationRecord
  has_one_attached :cad_file
  has_one_attached :pdf_file
  
  has_many :drawing_tags, dependent: :destroy
  has_many :tags, through: :drawing_tags

  validates :number, presence: true, uniqueness: true

  def as_json(options = {})
    super(options).merge({
      cad_file_url: cad_file_url,
      pdf_file_url: pdf_file_url
    })
  end

  def cad_file_url
    url_for_attachment(cad_file)
  end

  def pdf_file_url
    url_for_attachment(pdf_file)
  end

  private

  def url_for_attachment(file)
    return nil unless file.attached?
    Rails.application.routes.url_helpers.rails_blob_url(file, host: Rails.application.routes.default_url_options[:host])
  end
end
