class CreateExpenses < ActiveRecord::Migration[7.1]
  def change
    create_table :expenses, id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade   do |t|
      t.references :user, type: :uuid, foreign_key: true, null: false
      t.references :payment_method, type: :uuid, foreign_key: true, null: false
      t.timestamp :paid_on
      t.timestamp :recording_on
      t.references :payee, type: :uuid, foreign_key: true
      t.references :expense_category, type: :uuid, foreign_key: true
      t.decimal :amount, precision: 12, scale: 2, null: false, default: 0
      t.decimal :tax_amount, precision: 12, scale: 2, null: false, default: 0
      t.decimal :tax_rate, precision: 5, scale: 2, null: false, default: 0
      t.boolean :is_deleted, null: false, default: false
      t.text :description

      t.string :created_by, null: false
      t.string :updated_by
      t.timestamps null: false, default: -> { "CURRENT_TIMESTAMP" }

      t.index [:user_id, :payment_method_id], name: "ik1_expenses"
      t.index [:user_id, :paid_on], name: "ik2_expenses"
      t.index [:user_id, :recording_on], name: "ik3_expenses"
      t.index [:user_id, :payee_id], name: "ik4_expenses"
      t.index [:user_id, :expense_category_id], name: "ik5_expenses"
    end
  end
end

