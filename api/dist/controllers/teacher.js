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
exports.deleteTeacher = exports.updateTeacher = exports.createTeacher = exports.getOneTeacher = exports.getAllTeachers = void 0;
const bcrypt = require("bcryptjs");
const teacher_record_1 = require("../records/teacher.record");
const checkMailAvailable_1 = require("../utils/checkMailAvailable");
const generatePassword_1 = require("../utils/generatePassword");
const dataWithoutPassword_1 = require("../utils/dataWithoutPassword");
const errors_1 = require("../utils/errors");
// export const getAllTeachers = async (req: Request, res: Response, next: NextFunction) => {
//     const teachers: TeacherEntity[] = await TeacherRecord.listAll();
//     res.json( {teachers: teachers.map(one => userWithoutPassword(one))});
// }
const getAllTeachers = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const searchedTeachers = yield teacher_record_1.TeacherRecord.listAll((_a = req.params.name) !== null && _a !== void 0 ? _a : '');
        res.json({
            teachers: searchedTeachers.map(one => (0, dataWithoutPassword_1.userWithoutPassword)(one))
        });
    }
    catch (err) {
        next(err);
    }
});
exports.getAllTeachers = getAllTeachers;
const getOneTeacher = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const teacher = yield teacher_record_1.TeacherRecord.getOne(req.params.id);
    if (!teacher) {
        throw new errors_1.NotFoundError('Teacher not found');
    }
    const teacherCleaned = (0, dataWithoutPassword_1.userWithoutPassword)(teacher);
    const selectedCourses = yield teacher_record_1.TeacherRecord._getCoursesOfThisTeacher(req.params.id);
    res.json({
        teacher: teacherCleaned,
        selectedCourses: selectedCourses === null ? [] : selectedCourses
    });
});
exports.getOneTeacher = getOneTeacher;
const createTeacher = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, last_name } = req.body.teacher;
    const { selectedCourses } = req.body;
    const rawPassword = (0, generatePassword_1.generatePassword)(name, last_name);
    const hashedPassword = yield bcrypt.hash(rawPassword, 10);
    const teacherData = Object.assign(Object.assign({}, req.body.teacher), { password: hashedPassword });
    const teacher = new teacher_record_1.TeacherRecord(teacherData);
    const checkOkMail = yield (0, checkMailAvailable_1.checkMailAvailable)(teacher.email); //sprawdzanie dostępności maila
    if (!checkOkMail) {
        throw new errors_1.ValidationError("Email already exists.");
    }
    //miejsce na wysłanie hasła na maila użytkownika
    yield teacher.insert();
    if (selectedCourses)
        for (const oneCourse of selectedCourses) {
            const id = oneCourse.id;
            yield teacher.assignCourseToTeacher(id);
        }
    const courses = yield teacher_record_1.TeacherRecord._getCoursesOfThisTeacher(teacher.id);
    res.status(200).json({
        teacher: (0, dataWithoutPassword_1.userWithoutPassword)(teacher),
        selectedCourses: courses,
    });
});
exports.createTeacher = createTeacher;
const updateTeacher = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const teacher = yield teacher_record_1.TeacherRecord.getOne(req.params.id);
    if (teacher === null) {
        throw new errors_1.NotFoundError('Teacher with given ID does not exist.');
    }
    const { name, last_name, email } = req.body.teacher;
    const mailOk = yield (0, checkMailAvailable_1.checkMailAvailableWhenUpdating)(teacher.email, email);
    if (!mailOk) {
        throw new errors_1.ValidationError('Given email, already exists in database, give the correct email.');
    }
    teacher.name = name;
    teacher.last_name = last_name;
    teacher.email = email;
    yield teacher.update();
    yield teacher.removeAllCoursesFromTeacher();
    const { selectedCourses } = req.body;
    if (selectedCourses.length !== 0)
        for (const oneCourse of selectedCourses) {
            const id = oneCourse.id;
            yield teacher.assignCourseToTeacher(id);
        }
    res.json({
        teacher: (0, dataWithoutPassword_1.userWithoutPassword)(teacher),
        selectedCourses: yield teacher_record_1.TeacherRecord._getCoursesOfThisTeacher(teacher.id)
    });
});
exports.updateTeacher = updateTeacher;
const deleteTeacher = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const teacher = yield teacher_record_1.TeacherRecord.getOne(req.params.id);
    if (!teacher) {
        throw new errors_1.NotFoundError('Teacher not found');
    }
    yield teacher.delete();
    res.end();
});
exports.deleteTeacher = deleteTeacher;
//# sourceMappingURL=teacher.js.map