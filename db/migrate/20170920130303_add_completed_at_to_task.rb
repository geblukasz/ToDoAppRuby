class AddCompletedAtToTask < ActiveRecord::Migration[5.1]
  def change
    add_column :tasks, :completed_at, :daytime
  end
end
