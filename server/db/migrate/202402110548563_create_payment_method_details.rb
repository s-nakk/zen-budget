class CreatePaymentMethodDetails < ActiveRecord::Migration[7.1]
  def change
    create_table :payment_method_details, id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade   do |t|
      t.references :user, type: :uuid, foreign_key: true, null: false
      t.references :payment_method, type: :uuid, foreign_key: true, null: false
      t.string :card_number, limit: 4
      t.timestamp :closing_date
      t.timestamp :payment_date
      t.integer :payment_date_shift, null: false, default: 0
      t.boolean :is_deleted, null: false, default: false

      t.string :created_by, null: false
      t.string :updated_by
      t.timestamps null: false, default: -> { "CURRENT_TIMESTAMP" }

      t.index [:user_id, :payment_method_id], unique: true, name: "uk1_payment_method_details"
      t.index [:payment_method_id], name: "ik1_payment_method_details"
    end
  end
end

