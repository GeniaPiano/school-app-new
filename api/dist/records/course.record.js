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
exports.CourseRecord = void 0;
const db_1 = require("../utils/db");
const errors_1 = require("../utils/errors");
const uuid_1 = require("uuid");
class CourseRecord {
    constructor(obj) {
        if (!obj.name || obj.name.length < 4 || obj.name.length > 40) {
            throw new errors_1.ValidationError('Courses name should contain from 4 to 40 characters');
        }
        this.id = obj.id;
        this.name = obj.name;
        this.teacher_id = obj.teacher_id;
    }
    insert() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.id) {
                this.id = (0, uuid_1.v4)();
            }
            if (!this.teacher_id) {
                this.teacher_id = null;
            }
            yield db_1.pool.execute("INSERT INTO `courses`(`id`, `name`, `teacher_id`) VALUES(:id, :name, :teacher_id)", {
                id: this.id,
                name: this.name,
                teacher_id: this.teacher_id,
            });
            return this.id;
        });
    }
    //akutalizacja tabeli relacyjnej
    _updateRelationCoursesTeachers(teacher_id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield db_1.pool.execute("INSERT INTO `courses_teachers`(`id`,`course_id`, `teacher_id`) VALUES(:id, :course_id, :teacher_id)", {
                id: (0, uuid_1.v4)(),
                course_id: this.id,
                teacher_id: teacher_id,
            });
        });
    }
    static listAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const [results] = yield db_1.pool.execute("SELECT * FROM `courses`");
            return results.map(obj => new CourseRecord(obj));
        });
    }
    static getOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const [results] = (yield db_1.pool.execute("SELECT * FROM `courses` WHERE `id` = :id", {
                id,
            }));
            return results.length === 0 ? null : new CourseRecord(results[0]);
        });
    }
    delete() {
        return __awaiter(this, void 0, void 0, function* () {
            yield db_1.pool.execute("DELETE FROM `courses` WHERE `id` = :id ", {
                id: this.id,
            });
            //AKTUALIZCJA TABEL RELACYJNYCH
            if (this.teacher_id !== null) {
                yield db_1.pool.execute("DELETE FROM `courses_teachers` WHERE `course_id` = :id", {
                    id: this.id
                });
            }
        });
    }
    update() {
        return __awaiter(this, void 0, void 0, function* () {
            yield db_1.pool.execute("UPDATE `courses` SET `name` = :name, `teacher_id` = :teacher_id WHERE `id` = :id", {
                id: this.id,
                name: this.name,
                teacher_id: this.teacher_id
            });
            // AKTUALIZACJA tabeli courses_teaches
            yield db_1.pool.execute("UPDATE `courses_teachers` SET  `teacher_id` = :teacher_id WHERE `course_id` = :course_id", {
                course_id: this.id,
                teacher_id: this.teacher_id,
            });
        });
    }
    //POBRANIE LICZBY STUDENTÓW DANEGO KURSU
    countStudents() {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield db_1.pool.execute("SELECT COUNT(*) AS `countStudents` FROM `courses_students` WHERE `course_id` = :id", {
                id: this.id,
            });
            const { countStudents } = data[0][0];
            return countStudents;
        });
    }
    getTeacherName(teacher_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield db_1.pool.execute("SELECT  `name`, `last_name` FROM `teachers` WHERE `id` = :teacher_id", {
                teacher_id,
            });
            const { name, last_name } = data[0][0];
            return String(`${name} ${last_name}`);
        });
    }
}
exports.CourseRecord = CourseRecord;
//# sourceMappingURL=course.record.js.map