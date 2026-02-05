export interface CreateStaffDto {
  full_name: string;
  phone_number: string;
  profession: string;
  image_url: string;
}

export interface UpdateStaffDto {
  full_name?: string;
  phone_number?: string;
  profession?: string;
  image_url?: string;
}
