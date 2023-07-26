import {Router} from 'express';
import {
    assignCourseToTeacher,
    createTeacher,
    deleteTeacher,
    getAllTeachers,
    getOneTeacher, removeCourseFromTeacher,
    updateTeacher
} from "../controllers/teacher";


export const teacherRouter = Router();

teacherRouter
    .get('/', getAllTeachers)
    .get('/:id', getOneTeacher)
    .patch('/:id', updateTeacher)
    .post('/', createTeacher)
    .delete('/:id', deleteTeacher)
    .patch('/:id/assign-course', assignCourseToTeacher)
    .delete('/:id/remove-course', removeCourseFromTeacher)


