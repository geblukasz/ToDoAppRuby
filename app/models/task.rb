class Task < ApplicationRecord
  belongs_to :project

  def completed?
  	completed_at.present?
  end
end
