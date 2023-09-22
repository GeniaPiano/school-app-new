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
exports.getAllStudents = exports.removeCourseFromStudent = exports.deleteStudent = exports.updateStudent = exports.createStudent = exports.getStudentsByCourseId = exports.getOneStudent = void 0;
const bcrypt = require("bcryptjs");
const errors_1 = require("../utils/errors");
const student_record_1 = require("../records/student.record");
const generatePassword_1 = require("../utils/generatePassword");
const checkMailAvailable_1 = require("../utils/checkMailAvailable");
const dataWithoutPassword_1 = require("../utils/dataWithoutPassword");
const getOneStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const student = yield student_record_1.StudentRecord.getOne(req.params.id);
    if (!student)
        throw new errors_1.ValidationError('Student not found.');
    const selectedCourses = yield student_record_1.StudentRecord._getSelectedCoursesByStudent(req.params.id);
    res.json({
        student: (0, dataWithoutPassword_1.userWithoutPassword)(student),
        selectedCourses,
    });
});
exports.getOneStudent = getOneStudent;
const getStudentsByCourseId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const students = yield student_record_1.StudentRecord.getAllStudentsByCourseId(req.params.courseId);
    const studentsWithSelectedCourses = yield Promise.all(students.map((student) => __awaiter(void 0, void 0, void 0, function* () {
        const selectedCourses = yield student_record_1.StudentRecord._getSelectedCoursesByStudent(student.id);
        return {
            student,
            selectedCourses,
        };
    })));
    res.json({ students: studentsWithSelectedCourses });
});
exports.getStudentsByCourseId = getStudentsByCourseId;
const createStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, last_name } = req.body.student;
    const rawPassword = (0, generatePassword_1.generatePassword)(name, last_name);
    const hashedPassword = yield bcrypt.hash(rawPassword, 10);
    const { selectedCourses } = req.body;
    console.log(rawPassword);
    const studentData = Object.assign(Object.assign({}, req.body.student), { password: hashedPassword });
    const student = new student_record_1.StudentRecord(studentData);
    const checkOkMail = yield (0, checkMailAvailable_1.checkMailAvailable)(student.email); //sprawdzanie dostępności maila
    if (!checkOkMail) {
        throw new errors_1.ValidationError("Email already exists.");
    }
    //miejsce na wysłanie hasła na maila użytkownika
    yield student.insert();
    if (selectedCourses.length > 0) {
        for (const id of selectedCourses) {
            yield student.insertCourseForStudent(id);
        }
    }
    res.json({
        student: (0, dataWithoutPassword_1.userWithoutPassword)(student),
        selectedCourses: student_record_1.StudentRecord._getSelectedCoursesByStudent(student.id)
    });
});
exports.createStudent = createStudent;
const updateStudent = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const student = yield student_record_1.StudentRecord.getOne(req.params.id);
    if (student === null) {
        throw new errors_1.ValidationError('Student with given ID does not exist.');
    }
    //aktualizacja name, lastName, email
    const { name, last_name, email } = req.body.student;
    const fieldsToUpdate = { name, last_name, email };
    for (const key in fieldsToUpdate) {
        if (fieldsToUpdate[key]) {
            student[key] = fieldsToUpdate[key];
        }
    }
    yield student.updateNameAndEmail();
    //aktua lizacja coursesSelected
    yield student.removeAllCourses();
    const { selectedCourses } = req.body;
    if (selectedCourses.length === 0) {
        res.json({
            student: (0, dataWithoutPassword_1.userWithoutPassword)(student),
            selectedCourses: student_record_1.StudentRecord._getSelectedCoursesByStudent(student.id),
        });
    }
    else if (selectedCourses.length > 0) {
        for (const course of selectedCourses) {
            yield student.insertCourseForStudent(course);
        }
    }
    const chosenCourses = yield student_record_1.StudentRecord._getSelectedCoursesByStudent(student.id);
    res.json({
        student: (0, dataWithoutPassword_1.userWithoutPassword)(student),
        selectedCourses: chosenCourses,
    });
});
exports.updateStudent = updateStudent;
const deleteStudent = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const student = yield student_record_1.StudentRecord.getOne(req.params.id);
    if (!student) {
        throw new errors_1.NotFoundError('Cannot find student.');
    }
    yield student.delete(req.params.id);
    res.end();
});
exports.deleteStudent = deleteStudent;
const removeCourseFromStudent = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const student = yield student_record_1.StudentRecord.getOne(req.params.id);
    if (!student) {
        throw new errors_1.NotFoundError('Cannot find student.');
    }
    yield student.removeOneCourseFromStudent(req.body.course_id);
    res.end();
});
exports.removeCourseFromStudent = removeCourseFromStudent;
const getAllStudents = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const students = yield student_record_1.StudentRecord.listAll((_a = req.params.name) !== null && _a !== void 0 ? _a : '');
        const studentsWithSelectedCourses = yield Promise.all(students.map((oneStudent) => __awaiter(void 0, void 0, void 0, function* () {
            const selectedCourses = yield student_record_1.StudentRecord._getSelectedCoursesByStudent(oneStudent.id);
            return {
                student: (0, dataWithoutPassword_1.userWithoutPassword)(oneStudent),
                selectedCourses,
            };
        })));
        res.json({ students: studentsWithSelectedCourses });
    }
    catch (err) {
        next(err);
    }
});
exports.getAllStudents = getAllStudents;
//# sourceMappingURL=student.js.map