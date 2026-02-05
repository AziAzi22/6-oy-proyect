export interface CreateStudentDto {
  full_name: string;
  phone_number: string;
  profession: string;
  parent_name: string;
  parent_phone_number: string;
  image_url: string;
  added_by: number;
  group_id: number;
}

export interface UpdateStudentDto {
  full_name?: string;
  phone_number?: string;
  profession?: string;
  parent_name?: string;
  parent_phone_number?: string;
  image_url?: string;
  leftAt?: Date;
  joinedAt?: Date;
  added_by?: number;
  group_id?: number;
}
