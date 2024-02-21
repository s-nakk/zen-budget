Rails.application.routes.draw do
  resources :users
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  post 'users/find_by_email', to: 'users#find_by_email'
  post 'users/update_password', to: 'users#update_password'
  post 'users/update_user', to: 'users#update_user'
  get 'users/find_with_avatar/:id', to: 'users#find_with_avatar'
  # Defines the root path route ("/")
  # root "posts#index"
end
