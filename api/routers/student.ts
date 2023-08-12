import {Router} from 'express';
import {
    addCourseToStudent,
    createStudent,
    deleteStudent,
    getAllStudents,
    getOneStudent, getStudentsByCourseId, removeCourseFromStudent,
    updateStudent
} from "../controllers/student";

export const studentRouter = Router();

studentRouter
    .get('/', getAllStudents)
    .get('/:id', getOneStudent)
    .get('/course/:courseId', getStudentsByCourseId)
    .post('/', createStudent)
    .patch('/:id', updateStudent)
    .delete('/:id', deleteStudent)
    .patch('/:id/assign-course', addCourseToStudent) //PRZYPISANIE KURSU DO STUDENTA
    .delete('/:id/remove-course', removeCourseFromStudent)  //USUWANIE PRZYPISANEGO KURSU


