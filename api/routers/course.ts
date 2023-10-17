import {Router} from "express";
import {
    createCourse,
    getAllCourses,
    getOneCourse,
    updateCourse,
    deleteCourse,
    getCoursesWithoutTeachers
} from "../controllers/course";

import {getCoursesForStudent} from "../controllers/student";

export const courseRouter = Router();
courseRouter
    .get('/', getAllCourses)
    .get('/courses-without-teacher', getCoursesWithoutTeachers)
    .get('/courses-for-student/:id', getCoursesForStudent)
    .get('/:courseId', getOneCourse)
    .patch('/:courseId',  updateCourse)
    .post('/', createCourse)
    .delete('/:id',  deleteCourse)

