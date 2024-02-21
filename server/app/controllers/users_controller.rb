# frozen_string_literal: true

class UsersController < ApplicationController
  include Rails.application.routes.url_helpers

  before_action :set_user, only: %i[show find_with_avatar update_password update_user destroy]

  # GET /users
  def index
    @users = User.all

    render json: @users
  end

  # GET /users/1
  def show
    render json: @user
  end

  def find_with_avatar
    avatar_url = if @user.avatar.attached?
                   Rails.application.routes.url_helpers.rails_blob_path(@user.avatar, only_path: true)
                 end
    render json: { user: @user, avatar_url: avatar_url }
  end

  def find_by_email
    @user = User.find_by(email: params[:email])

    if @user
      avatar_url = if @user.avatar.attached?
                     Rails.application.routes.url_helpers.rails_blob_path(@user.avatar, only_path: true)
                   end
      render json: { user: @user, avatar_url: avatar_url }
    else
      render json: { error: 'User not found' }, status: :not_found
    end
  end

  def update_password
    Rails.logger.debug(request)
    if @user.update(update_password_params)
      render json: { message: 'Password updated successfully' }, status: :ok
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  def update_user
    Rails.logger.debug(request.body)
    if params[:avatar].present?
      key = "users/#{params[:id]}/avatar/#{params[:avatar].original_filename}"
      image = params[:avatar]
      blob = ActiveStorage::Blob.new(key:,
                                     filename: image.original_filename, content_type: image.content_type)
      blob.upload image.to_io
      @user.avatar.attach(blob)
    elsif @user.avatar.attached?
      @user.avatar.purge
    end
    if @user.update(update_user_params)
      avatar_url = if @user.avatar.attached?
        Rails.application.routes.url_helpers.rails_blob_path(@user.avatar, only_path: true)
      end
      render json: { user: @user, avatar_url: avatar_url }, status: :ok
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  # DELETE /users/1
  def destroy
    @user.destroy!
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_user
    @user = User.find(params[:id])
  end

  # Only allow a list of trusted parameters through.
  def update_password_params
    params.permit(:password, :updated_by)
  end

  def update_user_params
    params.permit(:name, :email, :updated_by)
  end
end
