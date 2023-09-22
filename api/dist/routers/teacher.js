"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.teacherRouter = void 0;
const express_1 = require("express");
const teacher_1 = require("../controllers/teacher");
exports.teacherRouter = (0, express_1.Router)();
exports.teacherRouter
    .get('/search/:name?', teacher_1.getAllTeachers)
    .get('/:id', teacher_1.getOneTeacher)
    .patch('/:id', teacher_1.updateTeacher)
    .post('/', teacher_1.createTeacher)
    .delete('/:id', teacher_1.deleteTeacher);
//# sourceMappingURL=teacher.js.map