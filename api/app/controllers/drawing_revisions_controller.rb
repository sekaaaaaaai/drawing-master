class DrawingRevisionsController < ApplicationController
  before_action :set_drawing_revision, only: %i[ show update destroy ]

  # GET /drawing_revisions
  def index
    @drawing_revisions = DrawingRevision.all

    render json: @drawing_revisions
  end

  # GET /drawing_revisions/1
  def show
    render json: @drawing_revision
  end

  # POST /drawing_revisions
  def create
    @drawing_revision = DrawingRevision.new(drawing_revision_params)

    if @drawing_revision.save
      render json: @drawing_revision, status: :created, location: @drawing_revision
    else
      render json: @drawing_revision.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /drawing_revisions/1
  def update
    if @drawing_revision.update(drawing_revision_params)
      render json: @drawing_revision
    else
      render json: @drawing_revision.errors, status: :unprocessable_entity
    end
  end

  # DELETE /drawing_revisions/1
  def destroy
    @drawing_revision.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_drawing_revision
      @drawing_revision = DrawingRevision.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def drawing_revision_params  
      params.require(:drawing_revision).permit(:drawing_id, :symbol, :remarks, :previous_revision_id)
    end
end
