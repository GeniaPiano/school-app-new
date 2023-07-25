import {Router} from "express";
import {createCourse, getAllCourses, getOneCourse, updateCourse, deleteCourse} from "../controllers/course";

export const courseRouter = Router();
courseRouter

    .get('/', getAllCourses)
    .get('/:courseId', getOneCourse)
    .patch('/:courseId', updateCourse)
    .post('/', createCourse)
    .delete('/:id',  deleteCourse)


