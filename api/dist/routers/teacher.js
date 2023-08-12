"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.teacherRouter = void 0;
const express_1 = require("express");
const teacher_1 = require("../controllers/teacher");
exports.teacherRouter = (0, express_1.Router)();
exports.teacherRouter
    .get('/', teacher_1.getAllTeachers)
    .get('/:id', teacher_1.getOneTeacher)
    .patch('/:id', teacher_1.updateTeacher)
    .post('/', teacher_1.createTeacher)
    .delete('/:id', teacher_1.deleteTeacher)
    .patch('/:id/assign-course', teacher_1.assignCourseToTeacher)
    .delete('/:id/remove-course', teacher_1.removeCourseFromTeacher);
//# sourceMappingURL=teacher.js.map