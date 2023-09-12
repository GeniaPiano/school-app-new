import {StudentEntity} from "./student.entity";
import {CourseEntity} from "../course";

export interface GetSingleStudentRes {
    student: CleanedStudent;
    selectedCourses: DataCoursesResForSingleStudent[];
}

export type DataCoursesResForSingleStudent = Omit <CourseEntity, 'teacher_id'>

export type CleanedStudent = Omit <StudentEntity, 'password' >

export interface StudentBasicData {
    name: string;
    last_name: string;
    email: string;
}

export type StudentReqPost = {
    student: StudentBasicData;
    selectedCourses: string[];
}
