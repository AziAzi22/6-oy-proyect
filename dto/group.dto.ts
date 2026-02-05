export interface CreateGroupDto {
  title: string;
  days: string;
  time: string;
  image_url: string;
  added_by: number;
  teacher_id: number;
}

export interface UpdateGroupDto {
  title?: string;
  days?: string;
  time?: string;
  image_url?: string;
  added_by?: number;
  teacher_id?: number;
}
