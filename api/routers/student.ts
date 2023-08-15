import {Router} from 'express';
import {
    createStudent,
    deleteStudent,
    getAllStudents,
    getOneStudent, getStudentsByCourseId, updateStudent,
} from "../controllers/student";


export const studentRouter = Router();

studentRouter
    .get('/', getAllStudents)
    .get('/:id', getOneStudent)
    .get('/course/:courseId', getStudentsByCourseId)
    .post('/', createStudent)
    .patch('/:id/update', (req, res) => console.log('ok'))
    .delete('/:id', deleteStudent)
    // .patch('/:id/assign-course', addCourseToStudent) //PRZYPISANIE KURSU DO STUDENTA
    // .delete('/:id/remove-course', removeCourseFromStudent)  //USUWANIE PRZYPISANEGO KURSU


