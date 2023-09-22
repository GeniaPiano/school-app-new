"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.studentRouter = void 0;
const express_1 = require("express");
const student_1 = require("../controllers/student");
exports.studentRouter = (0, express_1.Router)();
exports.studentRouter
    .get('/search/:name?', student_1.getAllStudents)
    .get('/:id', student_1.getOneStudent)
    .get('/course/:courseId', student_1.getStudentsByCourseId)
    .post('/', student_1.createStudent)
    .patch('/:id/update', student_1.updateStudent)
    .patch('/:id/remove-one-course', student_1.removeCourseFromStudent)
    .delete('/:id', student_1.deleteStudent);
//# sourceMappingURL=student.js.map