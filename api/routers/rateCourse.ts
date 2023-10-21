import {Router} from "express";
import {getRatesForCourse} from "../controllers/rateCourse";

export const rateCourseRouter = Router();

rateCourseRouter
    .get('/:id', getRatesForCourse)


