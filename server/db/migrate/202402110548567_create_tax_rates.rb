class CreateTaxRates < ActiveRecord::Migration[7.1]
  def change
    create_table :tax_rates, id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade   do |t|
      t.timestamp :application_start_on, null: false
      t.timestamp :application_end_on, null: false
      t.integer :tax_rate_type, null: false, default: 0
      t.decimal :tax_rate, precision: 5, scale: 2, null: false, default: 0
      t.text :remarks

      t.string :created_by, null: false
      t.string :updated_by
      t.timestamps null: false, default: -> { "CURRENT_TIMESTAMP" }

      t.index [:application_start_on, :application_end_on, :tax_rate_type], unique: true, name: "uk1_tax_rates"
    end
  end
end

