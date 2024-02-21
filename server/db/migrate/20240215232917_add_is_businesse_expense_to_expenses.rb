class AddIsBusinesseExpenseToExpenses < ActiveRecord::Migration[7.1]
  def change
    add_column :expenses, :is_businesss_expense, :boolean
    add_index :expenses, [:user_id, :is_businesss_expense], name: "ik6_expenses"
  end
end
