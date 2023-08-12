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
exports.deleteStudent = exports.updateStudent = exports.removeCourseFromStudent = exports.addCourseToStudent = exports.createStudent = exports.getOneStudent = exports.getAllStudents = void 0;
const bcrypt = require("bcryptjs");
const errors_1 = require("../utils/errors");
const student_record_1 = require("../records/student.record");
const generatePassword_1 = require("../utils/generatePassword");
const checkMailAvailable_1 = require("../utils/checkMailAvailable");
const checkAlreadyExistsRelaions_1 = require("../utils/checkAlreadyExistsRelaions");
const course_record_1 = require("../records/course.record");
const getAllStudents = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const students = yield student_record_1.StudentRecord.listAll();
        res.json({
            students,
        });
    }
    catch (err) {
        next(err);
    }
});
exports.getAllStudents = getAllStudents;
const getOneStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const student = yield student_record_1.StudentRecord.getOne(req.params.id);
    if (!student)
        throw new errors_1.ValidationError('Student not found.');
    const selectedCourses = yield student_record_1.StudentRecord._getSelectedCoursesByStudent(req.params.id);
    res.json({
        student,
        selectedCourses,
    });
});
exports.getOneStudent = getOneStudent;
const createStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, last_name } = req.body;
    const rawPassword = (0, generatePassword_1.generatePassword)(name, last_name);
    const hashedPassword = yield bcrypt.hash(rawPassword, 10);
    const studentData = Object.assign(Object.assign({}, req.body), { password: hashedPassword });
    const student = new student_record_1.StudentRecord(studentData);
    const checkOkMail = (0, checkMailAvailable_1.checkMailAvaible)(student.email); //sprawdzanie dostępności maila
    if (!checkOkMail) {
        throw new errors_1.ValidationError('Mail already exists.');
    }
    //@todo miejsce na wysłanie hasła na maila użytkownika
    yield student.insert();
    res.json({
        password: rawPassword,
        student: student,
    });
});
exports.createStudent = createStudent;
const addCourseToStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const student = yield student_record_1.StudentRecord.getOne(req.params.id);
    if (!student)
        throw new errors_1.ValidationError('Cannot find student');
    const courseId = req.body.courseId;
    const courseToAdd = yield course_record_1.CourseRecord.getOne(courseId);
    if (!courseToAdd)
        throw new errors_1.ValidationError('Course wanted to assign to student not found.');
    const check = yield (0, checkAlreadyExistsRelaions_1.AlreadyExistsRelations)(student.id, courseToAdd.id);
    if (check)
        throw new errors_1.ValidationError('Cannot assign this course to student. Chosen course is already assigned to this student.');
    yield student.insertCourseForStudent(courseToAdd.id);
    res.json({
        message: "ok"
    });
});
exports.addCourseToStudent = addCourseToStudent;
const removeCourseFromStudent = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const student = yield student_record_1.StudentRecord.getOne(req.params.id);
    if (!student) {
        throw new errors_1.ValidationError('Cannot find student.');
    }
    if (req.body.courseId) {
        yield student.removeFromSelected(req.body.courseId);
    }
    else
        throw new errors_1.ValidationError("No courses to delete.");
    res.end();
});
exports.removeCourseFromStudent = removeCourseFromStudent;
const updateStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const student = yield student_record_1.StudentRecord.getOne(req.params.id);
    if (student === null) {
        throw new errors_1.ValidationError('Student with given ID does not exist.');
    }
    const { name, last_name, email } = req.body;
    const fieldsToUpdate = { name, last_name, email };
    for (const key in fieldsToUpdate) {
        if (fieldsToUpdate[key]) {
            student[key] = fieldsToUpdate[key];
        }
    }
    yield student.update();
    res.json(student);
});
exports.updateStudent = updateStudent;
const deleteStudent = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const student = yield student_record_1.StudentRecord.getOne(req.params.id);
    if (!student) {
        throw new errors_1.ValidationError('Cannot find student.');
    }
    yield student.delete(req.params.id);
    res.end();
});
exports.deleteStudent = deleteStudent;
//# sourceMappingURL=student.js.map