class CreatePaymentMethods < ActiveRecord::Migration[7.1]
  def change
    create_table :payment_methods, id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade   do |t|
      t.references :user, type: :uuid, foreign_key: true, null: false
      t.integer :code, null: false
      t.string :name, limit: 40, null: false
      t.integer :settlement_type, null: false
      t.boolean :is_deleted, null: false, default: false

      t.string :created_by, null: false
      t.string :updated_by
      t.timestamps null: false, default: -> { "CURRENT_TIMESTAMP" }

      t.index [:user_id, :code], unique: true, name: "uk1_payment_methods"
      t.index [:settlement_type], name: "ik1_payment_methods"
    end
  end
end

