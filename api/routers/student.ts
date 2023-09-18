import {Router} from 'express';
import {
    createStudent,
    deleteStudent,
    getAllStudents,
    getOneStudent, getStudentsByCourseId, removeCourseFromStudent, searchStudents, updateStudent,
} from "../controllers/student";


export const studentRouter = Router();

studentRouter
    .get('/', getAllStudents)
    .get('/:id', getOneStudent)
    .get('/search/:name?',  searchStudents)
    .get('/course/:courseId', getStudentsByCourseId)
    .post('/', createStudent)
    .patch('/:id/update', updateStudent)
    .patch('/:id/remove-one-course', removeCourseFromStudent)
    .delete('/:id', deleteStudent)


