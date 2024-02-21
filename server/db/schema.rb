# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.1].define(version: 202402160824569) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "pgcrypto"
  enable_extension "plpgsql"

  create_table "active_storage_attachments", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.string "name", null: false
    t.string "record_type", null: false
    t.uuid "record_id", null: false
    t.uuid "blob_id", null: false
    t.datetime "created_at", null: false
    t.index ["blob_id"], name: "index_active_storage_attachments_on_blob_id"
    t.index ["record_type", "record_id", "name", "blob_id"], name: "index_active_storage_attachments_uniqueness", unique: true
  end

  create_table "active_storage_blobs", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.string "key", null: false
    t.string "filename", null: false
    t.string "content_type"
    t.text "metadata"
    t.string "service_name", null: false
    t.bigint "byte_size", null: false
    t.string "checksum"
    t.datetime "created_at", null: false
    t.index ["key"], name: "index_active_storage_blobs_on_key", unique: true
  end

  create_table "active_storage_variant_records", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.uuid "blob_id", null: false
    t.string "variation_digest", null: false
    t.index ["blob_id", "variation_digest"], name: "index_active_storage_variant_records_uniqueness", unique: true
  end

  create_table "clients", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.uuid "user_id", null: false
    t.integer "code", null: false
    t.string "name", limit: 40, null: false
    t.string "invoice_number", limit: 16
    t.integer "tax_rate_type", default: 0, null: false
    t.boolean "is_deleted", default: false, null: false
    t.string "created_by", null: false
    t.string "updated_by"
    t.datetime "created_at", default: -> { "CURRENT_TIMESTAMP" }, null: false
    t.datetime "updated_at", default: -> { "CURRENT_TIMESTAMP" }, null: false
    t.text "remarks"
    t.index ["user_id", "code"], name: "uk1_clients", unique: true
    t.index ["user_id"], name: "index_clients_on_user_id"
  end

  create_table "expense_categories", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.uuid "user_id", null: false
    t.integer "code", null: false
    t.string "name", limit: 40, null: false
    t.boolean "is_deleted", default: false, null: false
    t.string "created_by", null: false
    t.string "updated_by"
    t.datetime "created_at", default: -> { "CURRENT_TIMESTAMP" }, null: false
    t.datetime "updated_at", default: -> { "CURRENT_TIMESTAMP" }, null: false
    t.text "remarks"
    t.index ["user_id", "code"], name: "uk1_expense_categories", unique: true
    t.index ["user_id"], name: "index_expense_categories_on_user_id"
  end

  create_table "expenses", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.uuid "user_id", null: false
    t.uuid "payment_method_id", null: false
    t.datetime "paid_on", precision: nil
    t.datetime "recording_on", precision: nil
    t.uuid "payee_id"
    t.uuid "expense_category_id"
    t.decimal "amount", precision: 12, scale: 2, default: "0.0", null: false
    t.decimal "tax_amount", precision: 12, scale: 2, default: "0.0", null: false
    t.decimal "tax_rate", precision: 5, scale: 2, default: "0.0", null: false
    t.boolean "is_deleted", default: false, null: false
    t.text "description"
    t.string "created_by", null: false
    t.string "updated_by"
    t.datetime "created_at", default: -> { "CURRENT_TIMESTAMP" }, null: false
    t.datetime "updated_at", default: -> { "CURRENT_TIMESTAMP" }, null: false
    t.boolean "is_businesss_expense"
    t.index ["expense_category_id"], name: "index_expenses_on_expense_category_id"
    t.index ["payee_id"], name: "index_expenses_on_payee_id"
    t.index ["payment_method_id"], name: "index_expenses_on_payment_method_id"
    t.index ["user_id", "expense_category_id"], name: "ik5_expenses"
    t.index ["user_id", "is_businesss_expense"], name: "ik6_expenses"
    t.index ["user_id", "paid_on"], name: "ik2_expenses"
    t.index ["user_id", "payee_id"], name: "ik4_expenses"
    t.index ["user_id", "payment_method_id"], name: "ik1_expenses"
    t.index ["user_id", "recording_on"], name: "ik3_expenses"
    t.index ["user_id"], name: "index_expenses_on_user_id"
  end

  create_table "income_categories", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.uuid "user_id", null: false
    t.integer "code", null: false
    t.string "name", limit: 40, null: false
    t.boolean "is_deleted", default: false, null: false
    t.string "created_by", null: false
    t.string "updated_by"
    t.datetime "created_at", default: -> { "CURRENT_TIMESTAMP" }, null: false
    t.datetime "updated_at", default: -> { "CURRENT_TIMESTAMP" }, null: false
    t.text "remarks"
    t.index ["user_id", "code"], name: "uk1_income_categories", unique: true
    t.index ["user_id"], name: "index_income_categories_on_user_id"
  end

  create_table "incomes", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.uuid "user_id", null: false
    t.uuid "client_id", null: false
    t.datetime "invoiced_on", precision: nil
    t.datetime "payment_on", precision: nil
    t.uuid "income_category_id"
    t.decimal "amount", precision: 12, scale: 2, default: "0.0", null: false
    t.decimal "tax_amount", precision: 12, scale: 2, default: "0.0", null: false
    t.decimal "tax_rate", precision: 5, scale: 2, default: "0.0", null: false
    t.boolean "is_business_revenue", default: false, null: false
    t.boolean "is_deleted", default: false, null: false
    t.text "description"
    t.string "created_by", null: false
    t.string "updated_by"
    t.datetime "created_at", default: -> { "CURRENT_TIMESTAMP" }, null: false
    t.datetime "updated_at", default: -> { "CURRENT_TIMESTAMP" }, null: false
    t.index ["client_id"], name: "index_incomes_on_client_id"
    t.index ["income_category_id"], name: "index_incomes_on_income_category_id"
    t.index ["user_id", "client_id"], name: "ik1_incomes"
    t.index ["user_id", "income_category_id"], name: "ik3_incomes"
    t.index ["user_id", "invoiced_on"], name: "ik2_incomes"
    t.index ["user_id"], name: "index_incomes_on_user_id"
  end

  create_table "payees", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.uuid "user_id", null: false
    t.integer "code", null: false
    t.string "name", limit: 40, null: false
    t.string "invoice_number", limit: 16
    t.integer "tax_rate_type", default: 0, null: false
    t.boolean "is_deleted", default: false, null: false
    t.string "created_by", null: false
    t.string "updated_by"
    t.datetime "created_at", default: -> { "CURRENT_TIMESTAMP" }, null: false
    t.datetime "updated_at", default: -> { "CURRENT_TIMESTAMP" }, null: false
    t.text "remarks"
    t.index ["user_id", "code"], name: "uk1_payees", unique: true
    t.index ["user_id"], name: "index_payees_on_user_id"
  end

  create_table "payment_method_details", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.uuid "user_id", null: false
    t.uuid "payment_method_id", null: false
    t.string "card_number", limit: 4
    t.datetime "closing_date", precision: nil
    t.datetime "payment_date", precision: nil
    t.integer "payment_date_shift", default: 0, null: false
    t.boolean "is_deleted", default: false, null: false
    t.string "created_by", null: false
    t.string "updated_by"
    t.datetime "created_at", default: -> { "CURRENT_TIMESTAMP" }, null: false
    t.datetime "updated_at", default: -> { "CURRENT_TIMESTAMP" }, null: false
    t.text "remarks"
    t.index ["payment_method_id"], name: "ik1_payment_method_details"
    t.index ["payment_method_id"], name: "index_payment_method_details_on_payment_method_id"
    t.index ["user_id", "payment_method_id"], name: "uk1_payment_method_details", unique: true
    t.index ["user_id"], name: "index_payment_method_details_on_user_id"
  end

  create_table "payment_methods", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.uuid "user_id", null: false
    t.integer "code", null: false
    t.string "name", limit: 40, null: false
    t.integer "settlement_type", null: false
    t.boolean "is_deleted", default: false, null: false
    t.string "created_by", null: false
    t.string "updated_by"
    t.datetime "created_at", default: -> { "CURRENT_TIMESTAMP" }, null: false
    t.datetime "updated_at", default: -> { "CURRENT_TIMESTAMP" }, null: false
    t.text "remarks"
    t.index ["settlement_type"], name: "ik1_payment_methods"
    t.index ["user_id", "code"], name: "uk1_payment_methods", unique: true
    t.index ["user_id"], name: "index_payment_methods_on_user_id"
  end

  create_table "tax_rates", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.datetime "application_start_on", precision: nil, null: false
    t.datetime "application_end_on", precision: nil, null: false
    t.integer "tax_rate_type", default: 0, null: false
    t.decimal "tax_rate", precision: 5, scale: 2, default: "0.0", null: false
    t.text "remarks"
    t.string "created_by", null: false
    t.string "updated_by"
    t.datetime "created_at", default: -> { "CURRENT_TIMESTAMP" }, null: false
    t.datetime "updated_at", default: -> { "CURRENT_TIMESTAMP" }, null: false
    t.index ["application_start_on", "application_end_on", "tax_rate_type"], name: "uk1_tax_rates", unique: true
  end

  create_table "users", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.string "email", limit: 255, null: false
    t.string "name", limit: 40, null: false
    t.text "password", null: false
    t.boolean "is_deleted", default: false, null: false
    t.string "created_by", null: false
    t.string "updated_by"
    t.datetime "created_at", default: -> { "CURRENT_TIMESTAMP" }, null: false
    t.datetime "updated_at", default: -> { "CURRENT_TIMESTAMP" }, null: false
    t.index ["email"], name: "uk1_users", unique: true
    t.index ["name"], name: "ik1_users"
  end

  add_foreign_key "active_storage_attachments", "active_storage_blobs", column: "blob_id"
  add_foreign_key "active_storage_variant_records", "active_storage_blobs", column: "blob_id"
  add_foreign_key "clients", "users"
  add_foreign_key "expense_categories", "users"
  add_foreign_key "expenses", "expense_categories"
  add_foreign_key "expenses", "payees"
  add_foreign_key "expenses", "payment_methods"
  add_foreign_key "expenses", "users"
  add_foreign_key "income_categories", "users"
  add_foreign_key "incomes", "clients"
  add_foreign_key "incomes", "income_categories"
  add_foreign_key "incomes", "users"
  add_foreign_key "payees", "users"
  add_foreign_key "payment_method_details", "payment_methods"
  add_foreign_key "payment_method_details", "users"
  add_foreign_key "payment_methods", "users"
end
