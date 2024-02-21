class AddRemarksToTables < ActiveRecord::Migration[7.1]
  def change
    add_column :income_categories, :remarks, :text
    add_column :clients, :remarks, :text
    add_column :expense_categories, :remarks, :text
    add_column :payees, :remarks, :text
    add_column :payment_methods, :remarks, :text
    add_column :payment_method_details, :remarks, :text
  end
end
