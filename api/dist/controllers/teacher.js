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
exports.deleteTeacher = exports.removeCourseFromTeacher = exports.assignCourseToTeacher = exports.updateTeacher = exports.createTeacher = exports.getOneTeacher = exports.getAllTeachers = void 0;
const bcrypt = require("bcryptjs");
const teacher_record_1 = require("../records/teacher.record");
const errors_1 = require("../utils/errors");
const checkMailAvailable_1 = require("../utils/checkMailAvailable");
const generatePassword_1 = require("../utils/generatePassword");
const course_record_1 = require("../records/course.record");
const getAllTeachers = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const teachers = yield teacher_record_1.TeacherRecord.listAll();
    res.json({
        teachers,
    });
});
exports.getAllTeachers = getAllTeachers;
const getOneTeacher = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const teacher = yield teacher_record_1.TeacherRecord.getOne(req.params.id);
    if (!teacher)
        throw new errors_1.ValidationError('Teacher not found.');
    const selectedCourses = yield teacher_record_1.TeacherRecord._getCoursesOfThisTeacher(req.params.id);
    res.json({
        teacher,
        selectedCourses,
    });
});
exports.getOneTeacher = getOneTeacher;
const createTeacher = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, last_name } = req.body;
    const rawPassword = (0, generatePassword_1.generatePassword)(name, last_name);
    const hashedPassword = yield bcrypt.hash(rawPassword, 10);
    const teacherData = Object.assign(Object.assign({}, req.body), { password: hashedPassword, is_admin: 0 });
    const teacher = new teacher_record_1.TeacherRecord(teacherData);
    const checkOkMail = yield (0, checkMailAvailable_1.checkMailAvaible)(teacher.email); //sprawdzanie dostępności maila
    if (!checkOkMail) {
        throw new errors_1.ValidationError('Email already exists.');
    }
    // miejsce na wysłanie hasła na maila użytkownika
    const hash = yield bcrypt.hash(teacher.password, 10);
    yield teacher.insert();
    res.json(teacher);
});
exports.createTeacher = createTeacher;
const updateTeacher = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const teacher = yield teacher_record_1.TeacherRecord.getOne(req.params.id);
    if (teacher === null) {
        throw new errors_1.ValidationError('The teacher with given ID does not exist.');
    }
    const { name, last_name, email } = req.body;
    const fieldsToUpdate = { name, last_name, email };
    for (const key in fieldsToUpdate) {
        if (fieldsToUpdate[key]) {
            teacher[key] = fieldsToUpdate[key];
        }
    }
    console.log(teacher);
    yield teacher.update();
    res.json(teacher);
});
exports.updateTeacher = updateTeacher;
//PRZENIEŚĆ DO ODDZIELNEJ KLASY APLIKACJI Z METODAMI STATIC
const assignCourseToTeacher = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const teacher = yield teacher_record_1.TeacherRecord.getOne(req.params.id);
    if (!teacher)
        throw new errors_1.ValidationError('Cannot find teacher');
    const { selectedCourseId } = req.body;
    if (selectedCourseId === '' || !selectedCourseId) {
        throw new errors_1.ValidationError('No course to assign.');
    }
    const course = yield course_record_1.CourseRecord.getOne(selectedCourseId);
    if (!course) {
        throw new errors_1.ValidationError('Course you want to assign does not exist.');
    }
    if (course.teacher_id === null) {
        yield teacher.assignCourseToTeacher(selectedCourseId);
    }
    else {
        throw new errors_1.ValidationError('The course has already assigned teacher .');
    }
    res.end();
});
exports.assignCourseToTeacher = assignCourseToTeacher;
const removeCourseFromTeacher = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const teacher = yield teacher_record_1.TeacherRecord.getOne(req.params.id);
    if (!teacher) {
        throw new errors_1.ValidationError("No such teacher.");
    }
    const { selectedCourseId } = req.body;
    if (selectedCourseId === '' || !selectedCourseId) {
        throw new errors_1.ValidationError('No course to remove.');
    }
    const course = yield course_record_1.CourseRecord.getOne(selectedCourseId);
    if (!course) {
        throw new errors_1.ValidationError('Course you want to remove does not exist.');
    }
    if (course.teacher_id !== null) {
        yield teacher.removeCourseFromTeacher(selectedCourseId);
    }
    res.end();
});
exports.removeCourseFromTeacher = removeCourseFromTeacher;
const deleteTeacher = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const teacher = yield teacher_record_1.TeacherRecord.getOne(req.params.id);
    if (!teacher) {
        throw new errors_1.ValidationError('No such teacher.');
    }
    yield teacher.delete();
    res.end();
});
exports.deleteTeacher = deleteTeacher;
//# sourceMappingURL=teacher.js.map