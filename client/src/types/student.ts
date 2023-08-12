import {CourseEntity} from "./course";

export interface StudentEntity {
    id: string;
    name: string;
    last_name: string;
    email: string;
    password?: string;
    role: 'student';
}

export type DataCoursesResForSingleStudent = Omit <CourseEntity, 'teacher_id'>


export interface SingleStudentRes {
    student: StudentEntity;
    selectedCourses: DataCoursesResForSingleStudent[];
}

export type CleanedStudent = Omit <StudentEntity, 'password' >