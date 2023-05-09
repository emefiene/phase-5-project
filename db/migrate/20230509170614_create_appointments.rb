class CreateAppointments < ActiveRecord::Migration[6.1]
  def change
    create_table :appointments do |t|
      t.string :time
      t.belongs_to :patients, null: false, foreign_key: true
      t.belongs_to :physicians, null: false, foreign_key: true
      t.boolean :patient_flowsheet_complete
      t.boolean :appointment_complete

      t.timestamps
    end
  end
end
