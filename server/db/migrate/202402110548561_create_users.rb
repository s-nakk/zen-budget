class CreateUsers < ActiveRecord::Migration[7.1]
  def change
    create_table :users, id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade   do |t|
      t.string :email, limit: 255, null: false
      t.string :name, limit: 40, null: false
      t.text :password, null: false
      t.boolean :is_deleted, null: false, default: false

      t.string :created_by, null: false
      t.string :updated_by
      t.timestamps null: false, default: -> { "CURRENT_TIMESTAMP" }

      t.index [:email], unique: true, name: "uk1_users"
      t.index [:name], name: "ik1_users"
    end
  end
end

