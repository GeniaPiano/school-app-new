import {CourseEntity} from "./course";

export interface StudentEntity {
    id: string;
    name: string;
    last_name: string;
    email: string;
    password?: string;
    role: 'student';
}

export type CleanedStudent = Omit <StudentEntity, 'password' >

export interface CourseEntityWithDate extends CourseEntity {
    startedAt: Date,
}


export interface SingleStudentRes {
    student: CleanedStudent,
    selectedCourses: CourseEntityWithDate[];
}

export interface StudentBasicData {
    name: string;
    last_name: string;
    email: string;
}

export interface StudentBasicData {
    name: string;
    last_name: string;
    email: string;
}