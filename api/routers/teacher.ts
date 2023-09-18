import {Router} from 'express';
import {
    createTeacher,
    deleteTeacher,
    getAllTeachers,
    getOneTeacher, searchTeachers,
    updateTeacher
} from "../controllers/teacher";


export const teacherRouter = Router();

teacherRouter
    .get('/', getAllTeachers)
    .get('/search/:name?', searchTeachers)
    .get('/:id', getOneTeacher)
    .patch('/:id', updateTeacher)
    .post('/', createTeacher)
    .delete('/:id', deleteTeacher)



