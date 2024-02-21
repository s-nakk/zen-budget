Rails.application.config.to_prepare do
  ActiveStorage::Blob.class_eval do
    def key
      # カスタムパスの生成ロジック
      # 例: "users/#{record.user_id}/avatars/#{filename}"
      # `record`はアタッチされたレコード（例: Userモデル）、`filename`はファイル名
      "users/#{record.user_id}/#{record.class.name.underscore}/#{filename}"
    end
  end
end
