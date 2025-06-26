class DrawingRevision < ApplicationRecord
  has_many_attached :cad_files
  has_many_attached :pdf_files

  validate :must_have_cad_files
  validate :must_have_pdf_files

  belongs_to :drawing
  belongs_to :previous_revision, class_name: "DrawingRevision", optional: true
  has_one :next_revision, class_name: "DrawingRevision", foreign_key: "previous_revision_id", dependent: :nullify

  def as_json(options = {})
    super(options).merge({
      cad_files: cad_files.map { |f| file_info(f) },
      pdf_files: pdf_files.map { |f| file_info(f) }
    })
  end

  private

  def file_info(file)
    {
      url: Rails.application.routes.url_helpers.rails_blob_url(file),
      name: file.filename.to_s
    }
  end

  def must_have_cad_files
    errors.add(:cad_files, 'を1つ以上添付してください') unless cad_files.attached?
  end

  def must_have_pdf_files
    errors.add(:pdf_files, 'を1つ以上添付してください') unless pdf_files.attached?
  end
end
