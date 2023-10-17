import {TeacherEntity} from "./teacher";

export interface CourseEntity {
    id: string;
    name: string;
    description: string;
    teacher_id?: string | null;
    price: number;
    photoUrl: string;
}

export interface GetSingleCourseResponse {
    course: CourseEntity;
    countStudents: number;
    teacher: null | TeacherEntity;
}

export type CourseResponse = {
    coursesList: CourseEntity[] | [];
};

export type CoursesForStudentResponse = {
    coursesAvailable: CourseEntity[] | [],
    chosenCourses: CourseEntity[] | [],
}

export interface CourseWithStartedDate {
    id: string;
    name: string;
    price: number;
    course_id:string;
    student_id: string;
    startedAt: Date;
    photoUtl: string;
}
