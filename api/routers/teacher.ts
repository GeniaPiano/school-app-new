import {Router} from 'express';
import {
    createTeacher,
    deleteTeacher,
    getAllTeachers,
    getOneTeacher,
    updateTeacher
} from "../controllers/teacher";
import {verifyAdmin, verifyUser} from "../utils/verify";


export const teacherRouter = Router();

teacherRouter

    .get('/search/:name?', getAllTeachers)
    .get('/:id',  getOneTeacher)
    .patch('/:id',  updateTeacher)
    .post('/',  createTeacher)
    .delete('/:id', deleteTeacher)



