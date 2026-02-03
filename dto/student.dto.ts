export interface CreateStudentDto {
  full_name: string;
  phone_number: string;
  profession: string;
  parent_name: string;
  parent_phone_number: string;
  image_url: string;
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
}

// export interface DeleteStudentDto {
//   id: number;
// }
