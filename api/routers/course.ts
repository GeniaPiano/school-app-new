import {Router} from "express";
import {
    createCourse,
    getAllCourses,
    getOneCourse,
    updateCourse,
    deleteCourse,
    getCoursesWithoutTeachers, getCoursesWithAllDetails, getOneCourseAllDetails
} from "../controllers/course";

import {getCoursesForStudent} from "../controllers/student";

export const courseRouter = Router();
courseRouter
    .get('/', getAllCourses)
    .get('/get-courses-all-details', getCoursesWithAllDetails)
    .get('/courses-without-teacher', getCoursesWithoutTeachers)
    .get('/courses-for-student/:id', getCoursesForStudent)
    .get('/get-one-all-details/:id', getOneCourseAllDetails)
    .get('/:courseId', getOneCourse)
    .patch('/:courseId',  updateCourse)
    .post('/', createCourse)
    .delete('/:id',  deleteCourse)

