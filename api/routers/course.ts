import {Router} from "express";
import {
    createCourse,
    getAllCourses,
    getOneCourse,
    updateCourse,
    deleteCourse,
    getCoursesWithoutTeachers
} from "../controllers/course";

export const courseRouter = Router();
courseRouter

    .get('/', getAllCourses)
    .get('/courses-without-teacher', getCoursesWithoutTeachers)
    .get('/:courseId', getOneCourse)
    .patch('/:courseId', updateCourse)
    .post('/', createCourse)
    .delete('/:id',  deleteCourse)


