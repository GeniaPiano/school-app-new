export interface CourseEntity {

    id?: string;
    name: string;
    description?: string | null;
    price?: number;
    teacher_id?: string | null;
    photoUrl: string;
}