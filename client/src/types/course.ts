import {TeacherEntity} from "./teacher";
import {RateCourseWithAuthor} from "./rateCourse";



export interface CourseEntity {
    id: string;
    name: string;
    description: string | null;
    teacher_id?: string | null;
    price: number;
    photoUrl: string;
}



export interface GetSingleCourseResponse extends CourseEntity {
    countStudents: number;
    teacher: TeacherEntity | null;
    rates: RateCourseWithAuthor[];

}

export type CourseResponse = {
    coursesList: CourseEntity[] | [];
};

export interface CourseAllDetails extends CourseEntity {
    countStudents: number;
    teacherName: string | null;
    rates: RateCourseWithAuthor[];
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
