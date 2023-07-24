import {TeacherEntity} from "./teacher.entity";
import {CourseEntity} from "../course";

export type CreateTeacherReq = Omit<TeacherEntity, 'id'>

export interface GetSingleTeacherRes {
    teacher: TeacherEntity;
    selectedCourses: DataCoursesResForSingleTeacher[];
}

export type DataCoursesResForSingleTeacher = Omit <CourseEntity, 'teacher_id'>

export interface TeacherUpdateReq {
    name: string;
    last_name: string;
    email: string;
    password: string;
}