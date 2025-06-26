class DrawingsController < ApplicationController
  before_action :set_drawing, only: %i[ show update destroy ]

  # GET /drawings
  def index
    @drawings = Drawing.limit(20)

    render json: @drawings
  end

  # GET /drawings/1
  def show
    render json: @drawing
  end

  # POST /drawings
  def create
    ActiveRecord::Base.transaction do
      @drawing = Drawing.new(drawing_params)
      @drawing_revision = DrawingRevision.new(drawing_revision_params)
      @drawing_revision.drawing = @drawing  # 関連付け（重要）

      # 両方保存を試みる
      unless @drawing.save && @drawing_revision.save
        # 失敗した場合は例外を発生させてロールバック
        raise ActiveRecord::Rollback
      end
    end

    if @drawing.persisted? && @drawing_revision.persisted?
      render json: @drawing, status: :created
    else
      render json: {
        drawing_errors: @drawing.errors,
        revision_errors: @drawing_revision.errors
      }, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /drawings/1
  def update
    if @drawing.update(drawing_params)
      render json: @drawing
    else
      render json: @drawing.errors, status: :unprocessable_entity
    end
  end

  # DELETE /drawings/1
  def destroy
    @drawing.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_drawing
      @drawing = Drawing.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def drawing_params
      params.require(:drawing).permit(:number, :name, :remarks, :tag_list, tag_names: [])
    end

    def drawing_revision_params
      params.require(:drawing_revision).permit(cad_files: [], pdf_files: [])
    end
end
