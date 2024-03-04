Rails.application.routes.draw do
  get 'users/find_by_email', to: 'users#find_by_email'
  get 'users/find_with_avatar/:id', to: 'users#find_with_avatar'
  post 'users/update_password', to: 'users#update_password'
  post 'users/update_user', to: 'users#update_user'

  resources :users
  get 'up' => 'rails/health#show', as: :rails_health_check
end