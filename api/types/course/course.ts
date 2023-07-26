import {CourseEntity} from "./course.entity";

export interface GetSingleCourseRes {
    course: CourseEntity;
    countStudents: number;
    teacherName: string | null;
}

export interface CourseResponseData {
    coursesList: CourseEntity[] | null
}

export interface UpdateCourseReq {
    name: string;
    teacher_id?: string;
}

export interface CreateCourseReq {
    name: string;
    teacher_id?: string;
}
