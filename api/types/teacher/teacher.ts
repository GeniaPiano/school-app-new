import {TeacherEntity} from "./teacher.entity";
import {CourseEntity} from "../course";

export interface GetSingleTeacherRes {
    teacher: TeacherEntity;
    selectedCourses: DataCoursesResForSingleTeacher[];
}

export type DataCoursesResForSingleTeacher = Omit <CourseEntity, 'teacher_id'>

export interface TeacherReq {
    name: string;
    last_name: string;
    email: string;
}
