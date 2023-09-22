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
exports.TeacherRecord = void 0;
const db_1 = require("../utils/db");
const errors_1 = require("../utils/errors");
const uuid_1 = require("uuid");
class TeacherRecord {
    constructor(obj) {
        if (!obj.name || obj.name.length < 2 || obj.name.length > 40 || !obj.last_name || obj.last_name.length < 2
            || obj.last_name.length > 40 || !obj.email || obj.email.length < 4 || obj.email.length > 40) {
            throw new errors_1.ValidationError('Missing data or data not correct.');
        }
        this.id = obj.id;
        this.name = obj.name;
        this.last_name = obj.last_name;
        this.email = obj.email;
        this.password = obj.password;
        this.role = 'teacher';
    }
    insert() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.id) {
                this.id = (0, uuid_1.v4)();
            }
            yield db_1.pool.execute("INSERT INTO `teachers`(`id`, `name`, `last_name`, `email`, `password`, `role`) VALUES(:id, :name, :last_name, :email, :password, :role)", {
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
    // static async listAll(): Promise <TeacherRecord[]> {
    //     const [results] = await pool.execute("SELECT * FROM `teachers`") as TeacherRecordResults;
    //     return results.map(obj => new TeacherRecord(obj));
    // }
    static listAll(name) {
        return __awaiter(this, void 0, void 0, function* () {
            const [results] = yield db_1.pool.execute("SELECT * FROM `teachers` WHERE `name` LIKE :search", {
                search: `%${name}%`,
            });
            return results.map(obj => new TeacherRecord(obj));
        });
    }
    static getOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const [results] = (yield db_1.pool.execute("SELECT * FROM `teachers` WHERE `id` = :id", {
                id,
            }));
            return results.length === 0 ? null : new TeacherRecord(results[0]);
        });
    }
    static getByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const [results] = (yield db_1.pool.execute("SELECT * FROM `teachers` WHERE `email` = :email", {
                email,
            }));
            return results.length === 0 ? null : new TeacherRecord(results[0]);
        });
    }
    assignCourseToTeacher(courseId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield db_1.pool.execute("INSERT INTO `courses_teachers`(`id`,`course_id`, `teacher_id`) VALUES(:id, :course_id, :teacher_id)", {
                id: (0, uuid_1.v4)(),
                course_id: courseId,
                teacher_id: this.id,
            });
            yield db_1.pool.execute("UPDATE `courses` SET `teacher_id`=:teacher_id WHERE `id`= :id", {
                id: courseId,
                teacher_id: this.id
            });
        });
    }
    removeAllCoursesFromTeacher() {
        return __awaiter(this, void 0, void 0, function* () {
            yield db_1.pool.execute("DELETE FROM `courses_teachers` WHERE `teacher_id` =:teacher_id", {
                teacher_id: this.id
            });
            yield db_1.pool.execute("UPDATE `courses` SET `teacher_id` =:noTeacher WHERE `teacher_id` =:teacher_id", {
                noTeacher: null,
                teacher_id: this.id
            });
        });
    }
    // @todo ew stworzyć klasę App i przenieść tam powyższą metodę jako STATIC ?
    static _getCoursesOfThisTeacher(teacher_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const [results] = (yield db_1.pool.execute("SELECT * FROM `courses` WHERE `teacher_id`= :teacher_id", {
                teacher_id,
            }));
            const coursesSelected = results.map(one => {
                return {
                    id: one.id,
                    name: one.name
                };
            });
            return results.length === 0 ? null : coursesSelected;
        });
    }
    delete() {
        return __awaiter(this, void 0, void 0, function* () {
            yield db_1.pool.execute("DELETE FROM `teachers` WHERE `id` = :id ", {
                id: this.id,
            });
            yield db_1.pool.execute("UPDATE `courses` SET `teacher_id` = :noId WHERE `teacher_id` =:teacher_id", {
                noId: null,
                teacher_id: this.id
            });
            yield db_1.pool.execute("DELETE FROM `courses_teachers` WHERE `teacher_id` =:teacher_id", {
                teacher_id: this.id
            });
        });
    }
    update() {
        return __awaiter(this, void 0, void 0, function* () {
            yield db_1.pool.execute("UPDATE `teachers` SET `name` = :name, `last_name` = :last_name, `email`=:email  WHERE `id` =:id ", {
                id: this.id,
                name: this.name,
                last_name: this.last_name,
                email: this.email,
            });
        });
    }
}
exports.TeacherRecord = TeacherRecord;
//# sourceMappingURL=teacher.record.js.map