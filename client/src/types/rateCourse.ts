export interface RateCourseEntity  {
    id: string;
    course_id: string;
    student_id:string;
    stars: 1 | 2 | 3 | 4 | 5;
    opinion?: string;
}

export interface RateCourseWithAuthor extends RateCourseEntity {
    authorName: string;
}