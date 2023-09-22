"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.courseRouter = void 0;
const express_1 = require("express");
const course_1 = require("../controllers/course");
exports.courseRouter = (0, express_1.Router)();
exports.courseRouter
    .get('/', course_1.getAllCourses)
    .get('/courses-without-teacher', course_1.getCoursesWithoutTeachers)
    .get('/:courseId', course_1.getOneCourse)
    .patch('/:courseId', course_1.updateCourse)
    .post('/', course_1.createCourse)
    .delete('/:id', course_1.deleteCourse);
//# sourceMappingURL=course.js.map