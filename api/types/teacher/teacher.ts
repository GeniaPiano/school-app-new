import {TeacherEntity} from "./teacher.entity";
import {CourseEntity} from "../course";

type TeacherCleaned = Omit <TeacherEntity, 'password'>

export interface GetSingleTeacherRes {
    teacher: TeacherCleaned;
    selectedCourses: DataCoursesResForSingleTeacher[];
}

export type DataCoursesResForSingleTeacher = Omit <CourseEntity, 'teacher_id'>

export interface TeacherReq {
        name: string;
        last_name: string;
        email: string;
}

export interface TeacherReqSelectedCourses {
    selectedCourses: string[] | []
}

export interface TeacherUpdateReq {
    name?: string;
    last_name?: string;
    email?: string;
}
