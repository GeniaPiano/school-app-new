export interface CourseEntity {
    id: string;
    name: string;
    teacher_id?: string | null;
}

export interface GetSingleCourseRes {
    course: CourseEntity;
    countStudents: number;
    teacherName: string | null;
}