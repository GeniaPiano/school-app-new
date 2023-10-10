import {Router} from "express";
import {
    createCourse,
    getAllCourses,
    getOneCourse,
    updateCourse,
    deleteCourse,
    getCoursesWithoutTeachers
} from "../controllers/course";
import {verifyAdmin} from "../utils/verify";
import {getCoursesForStudent} from "../controllers/student";

export const courseRouter = Router();
courseRouter

    .get('/', getAllCourses)
    .get('/courses-without-teacher', getCoursesWithoutTeachers)
    .get('/courses-for-student/:id', getCoursesForStudent)
    .get('/:courseId', getOneCourse)
    .patch('/:courseId', verifyAdmin, updateCourse)
    .post('/', verifyAdmin, createCourse)
    .delete('/:id', verifyAdmin,  deleteCourse)


