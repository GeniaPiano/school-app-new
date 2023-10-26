import {Router} from "express";
import {getRateById, getRatesForCourse} from "../controllers/rateCourse";

export const rateCourseRouter = Router();

rateCourseRouter
    .get('/:id', getRatesForCourse)
    .get('/get-rate/:id', getRateById);


