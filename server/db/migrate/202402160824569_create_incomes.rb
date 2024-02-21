class CreateIncomes < ActiveRecord::Migration[7.1]
  def change
    create_table :incomes, id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade   do |t|
      t.references :user, type: :uuid, foreign_key: true, null: false
      t.references :client, type: :uuid, foreign_key: true, null: false
      t.timestamp :invoiced_on
      t.timestamp :payment_on
      t.references :income_category, type: :uuid, foreign_key: true
      t.decimal :amount, precision: 12, scale: 2, null: false, default: 0
      t.decimal :tax_amount, precision: 12, scale: 2, null: false, default: 0
      t.decimal :tax_rate, precision: 5, scale: 2, null: false, default: 0
      t.boolean :is_business_revenue, null: false, default: false
      t.boolean :is_deleted, null: false, default: false
      t.text :description

      t.string :created_by, null: false
      t.string :updated_by
      t.timestamps null: false, default: -> { "CURRENT_TIMESTAMP" }

      t.index [:user_id, :client_id], name: "ik1_incomes"
      t.index [:user_id, :invoiced_on], name: "ik2_incomes"
      t.index [:user_id, :income_category_id], name: "ik3_incomes"
    end
  end
end

