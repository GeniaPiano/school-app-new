"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.studentRouter = void 0;
const express_1 = require("express");
const student_1 = require("../controllers/student");
exports.studentRouter = (0, express_1.Router)();
exports.studentRouter
    .get('/', student_1.getAllStudents)
    .get('/:id', student_1.getOneStudent)
    .post('/', student_1.createStudent)
    .patch('/:id', student_1.updateStudent)
    .delete('/:id', student_1.deleteStudent)
    .patch('/:id/assign-course', student_1.addCourseToStudent) //PRZYPISANIE KURSU DO STUDENTA
    .delete('/:id/remove-course', student_1.removeCourseFromStudent); //USUWANIE PRZYPISANEGO KURSU
//# sourceMappingURL=student.js.map