class Drawing < ApplicationRecord
  has_many :drawing_tags, dependent: :destroy
  has_many :tags, through: :drawing_tags

  has_many :drawing_revisions, dependent: :destroy

  validates :number, presence: true, uniqueness: true

  def as_json(options = {})
    super(options).merge({
      latest_revision: drawing_revisions.order(created_at: :desc).first&.as_json,
      tags: tags.map{|tag| tag.name}
    })
  end

    # 配列を受け取るカスタムセッター
  def tag_names=(names)
    # 配列、文字列、nilの場合を処理
    normalized_names = case names
    when Array
      names.compact.map(&:strip).reject(&:blank?)
    when String
      names.split(',').map(&:strip).reject(&:blank?)
    else
      []
    end
    
    self.tags = normalized_names.map do |name|
      Tag.find_or_create_by(name: name)
    end
  end
  
  # タグ名の配列を返すカスタムゲッター
  def tag_names
    tags.pluck(:name)
  end
  
  # カンマ区切りの文字列用セッター（後方互換性のため）
  def tag_list=(tag_string)
    self.tag_names = tag_string
  end
  
  # カンマ区切りの文字列を返すゲッター
  def tag_list
    tag_names.join(', ')
  end
end
