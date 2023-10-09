import {Router} from 'express';
import {
    createStudent,
    deleteStudent,
    getAllStudents,
    getOneStudent, getStudentsByCourseId, removeCourseFromStudent,  updateStudent,
} from "../controllers/student";


export const studentRouter = Router();

studentRouter
    .get('/search/:name?', getAllStudents)
    .get('/:id', getOneStudent)
    .get('/course/:courseId',  getStudentsByCourseId)
    .post('/', createStudent)
    .patch('/:id/update', updateStudent)
    .patch('/:id/remove-one-course', removeCourseFromStudent)
    .delete('/:id', deleteStudent)


