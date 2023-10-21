import {TeacherEntity} from "./teacher";
import {RateCourseEntity} from "./rateCourse";


export interface CourseEntity {
    id: string;
    name: string;
    description: string | null;
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

export interface CourseAllDetails extends CourseEntity {
    countStudents: number;
    teacherName: string | null;
    rates: RateCourseEntity[];
}

export type CourseAllDetailsResponse = {
    courses: CourseAllDetails[]
}

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
