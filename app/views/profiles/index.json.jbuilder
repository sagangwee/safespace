json.array!(@profiles) do |profile|
  json.extract! profile, :id, :class_rank, :socioeconomic_status, :living_situation, :sexual_orientation, :comfort_with_sexuality, :age, :is_first_generation_college_student, :is_physically_disabled, :is_parent, :is_single_parent, :is_from_foster_care, :is_intercollegiate_athlete, :is_military, :is_out_of_state_student, :is_international_student, :is_transfer_student, :user_id
  json.url profile_url(profile, format: :json)
end
