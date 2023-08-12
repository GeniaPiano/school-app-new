"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCourse = exports.createCourse = exports.updateCourse = exports.getOneCourse = exports.getAllCourses = void 0;
const course_record_1 = require("../records/course.record");
const errors_1 = require("../utils/errors");
const getAllCourses = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const coursesList = yield course_record_1.CourseRecord.listAll();
        res.json({
            coursesList,
        });
    }
    catch (err) {
        next(err);
    }
});
exports.getAllCourses = getAllCourses;
const getOneCourse = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { courseId } = req.params;
    const course = yield course_record_1.CourseRecord.getOne(courseId);
    if (!course)
        throw new errors_1.ValidationError('Course not found.');
    const countStudents = yield course.countStudents();
    const teacherName = !course.teacher_id
        ? null
        : yield course.getTeacherName(course.teacher_id);
    res.json({
        course,
        countStudents,
        teacherName,
    });
});
exports.getOneCourse = getOneCourse;
const updateCourse = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const course = yield course_record_1.CourseRecord.getOne(req.params.courseId);
        if (course === null) {
            throw new errors_1.ValidationError('The course with given ID does not exist.');
        }
        const { name, teacher_id } = req.body;
        if (name) {
            course.name = name;
        }
        if (teacher_id) {
            course.teacher_id = teacher_id;
        }
        else {
            course.teacher_id = null;
        }
        yield course.update();
        res.json(course);
    }
    catch (err) {
        next(err);
    }
});
exports.updateCourse = updateCourse;
const createCourse = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, teacher_id } = req.body;
    const newCourse = new course_record_1.CourseRecord({
        name,
        teacher_id: teacher_id === undefined ? null : teacher_id
    });
    yield newCourse.insert();
    if (newCourse.teacher_id !== null) {
        yield newCourse._updateRelationCoursesTeachers(newCourse.teacher_id);
    }
    res.json(newCourse);
});
exports.createCourse = createCourse;
const deleteCourse = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const course = yield course_record_1.CourseRecord.getOne(req.params.id);
    if (!course) {
        throw new errors_1.ValidationError('No such course.');
    }
    if ((yield course.countStudents()) > 0) {
        throw new errors_1.ValidationError('Cannot remove course. ');
    }
    yield course.delete();
    res.end();
});
exports.deleteCourse = deleteCourse;
//# sourceMappingURL=course.js.map