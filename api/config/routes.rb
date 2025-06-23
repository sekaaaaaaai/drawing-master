Rails.application.routes.draw do

  # ActiveStorageのルーティング（ストリーミング配信用）
  # mount Rails.application.routes.default_url_options[:host], at: '/'
  
  resources :drawings
  
  # Defines the root path route ("/")
  # root "articles#index"
end
