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
exports.StudentRecord = void 0;
const db_1 = require("../utils/db");
const errors_1 = require("../utils/errors");
const uuid_1 = require("uuid");
const course_record_1 = require("./course.record");
class StudentRecord {
    constructor(obj) {
        if (!obj.name || obj.name.length <= 2 || obj.name.length > 40) {
            throw new errors_1.ValidationError('Student name should contain from 3 to 40 characters');
        }
        if (!obj.last_name || obj.last_name.length <= 2 || obj.last_name.length > 40) {
            throw new errors_1.ValidationError('Student last name should contain from 3 to 40 characters');
        }
        if (!obj.email || obj.email.length < 4 || obj.email.length > 40) {
            throw new errors_1.ValidationError('Student email should contain from 4 to 40 characters');
        }
        this.id = obj.id;
        this.name = obj.name;
        this.last_name = obj.last_name;
        this.email = obj.email;
        this.password = obj.password;
        this.role = 'student';
    }
    insert() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.id) {
                this.id = (0, uuid_1.v4)();
            }
            yield db_1.pool.execute("INSERT INTO `students`(`id`, `name`, `last_name`, `email`, `password`, `role`) VALUES(:id, :name, :last_name, :email, :password, :role)", {
                id: this.id,
                name: this.name,
                last_name: this.last_name,
                email: this.email,
                password: this.password,
                role: this.role,
            });
            return this.id;
        });
    }
    static listAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const [results] = yield db_1.pool.execute("SELECT * FROM `students`");
            return results.map(obj => new StudentRecord(obj));
        });
    }
    static getAllStudentsByCourseId(courseId) {
        return __awaiter(this, void 0, void 0, function* () {
            const [results] = yield db_1.pool.execute("SELECT `students`.`id`, `students`.`name`, `students`.`last_name`, `students`.`email` FROM `students` JOIN `courses_students` ON `students`.`id` = `courses_students`.`student_id` JOIN `courses` ON `courses_students`.`course_id` = `courses`.`id` WHERE `courses`.`id` = :courseId", {
                courseId,
            });
            return results.map(obj => new StudentRecord(obj));
        });
    }
    static getByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const [results] = (yield db_1.pool.execute("SELECT * FROM `courses_students` WHERE `email` = :email", {
                email,
            }));
            return results.length === 0 ? null : new StudentRecord(results[0]);
        });
    }
    static getOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const [results] = (yield db_1.pool.execute("SELECT * FROM `students` WHERE `id` = :id", {
                id,
            }));
            return results.length === 0 ? null : new StudentRecord(results[0]);
        });
    }
    insertCourseForStudent(course_id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield db_1.pool.execute("INSERT INTO `courses_students`(`id`, `student_id`, `course_id`) VALUES(:id, :student_id, :course_id)", {
                id: (0, uuid_1.v4)(),
                student_id: this.id,
                course_id,
            });
        });
    }
    removeFromSelected(course_id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield db_1.pool.execute("DELETE FROM `courses_students` WHERE `student_id` = :student_id AND `course_id` = :course_id", {
                student_id: this.id,
                course_id,
            });
        });
    }
    static _getSelectedCoursesByStudent(student_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const [results] = (yield db_1.pool.execute("SELECT * FROM `courses_students` WHERE `student_id`= :student_id", {
                student_id,
            }));
            let selectedCourses = [];
            if (results.length === null) {
                selectedCourses = null;
            }
            else {
                for (const one of results) {
                    const course = yield course_record_1.CourseRecord.getOne(one.course_id);
                    selectedCourses.push(course);
                }
            }
            return selectedCourses;
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const student = yield StudentRecord.getOne(id);
            if (!student) {
                throw new errors_1.ValidationError('Student not found.');
            }
            yield db_1.pool.execute("DELETE FROM `students` WHERE `id` = :id ", {
                id: student.id
            });
            const selectedCourses = yield StudentRecord._getSelectedCoursesByStudent(id);
            if (selectedCourses.length !== 0) {
                db_1.pool.execute("DELETE FROM `courses_students` WHERE `student_id` = :student_id", {
                    student_id: id,
                });
            }
        });
    }
    update() {
        return __awaiter(this, void 0, void 0, function* () {
            yield db_1.pool.execute("UPDATE `students` SET `name` = :name, `last_name` = :last_name, `email`= :email, `password` = :password WHERE `id` = :id", {
                id: this.id,
                name: this.name,
                last_name: this.last_name,
                email: this.email,
                password: this.password, // zahaszować!!!
            });
        });
    }
}
exports.StudentRecord = StudentRecord;
//# sourceMappingURL=student.record.js.map