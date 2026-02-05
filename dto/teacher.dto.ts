export interface CreateTeacherDto {
  full_name: string;
  phone_number: string;
  profession: string;
  image_url: string;
  added_by: number;
}

export interface UpdateTeacherDto {
  full_name?: string;
  phone_number?: string;
  profession?: string;
  image_url?: string;
  added_by?: number;
}
