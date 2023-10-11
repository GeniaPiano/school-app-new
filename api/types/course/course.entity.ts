export interface CourseEntity {
    id?: string;
    name: string;
    description: string;
    price: number;
    teacher_id?: string | null;
}