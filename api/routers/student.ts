import {Router} from 'express';
import {
    addCourseToStudent,
    createStudent,
    deleteStudent,
    getAllStudents,
    getOneStudent, removeCourseFromStudent,
    updateStudent
} from "../controllers/student";

export const studentRouter = Router();

studentRouter
    .get('/', getAllStudents)
    .get('/:id', getOneStudent)
    .post('/', createStudent)
    .patch('/:id', updateStudent)
    .delete('/:id', deleteStudent)
    .patch('/:id/assign-course', addCourseToStudent) //PRZYPISANIE KURSU DO STUDENTA
    .delete('/:id/remove-course', removeCourseFromStudent)  //USUWANIE PRZYPISANEGO KURSU


