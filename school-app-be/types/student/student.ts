import {StudentEntity} from "./student.entity";
import {CourseEntity} from "../course";

export type CreateStudentReq = Omit<StudentEntity, 'id'>

export interface GetSingleStudentRes {
    student: StudentEntity;
    selectedCourses: DataCoursesResForSingleStudent[];
}

export type DataCoursesResForSingleStudent = Omit <CourseEntity, 'teacher_id'>

export interface StudentReq {
    name: string;
    last_name: string;
    email: string;
    password: string;
}