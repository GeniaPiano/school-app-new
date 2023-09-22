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
exports.getUserById = exports.getUserWithRoleByEmail = void 0;
const teacher_record_1 = require("../records/teacher.record");
const admin_record_1 = require("../records/admin.record");
const student_record_1 = require("../records/student.record");
const getUserWithRoleByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    let user = null;
    user = yield student_record_1.StudentRecord.getByEmail(email);
    if (!user) {
        user = yield teacher_record_1.TeacherRecord.getByEmail(email);
    }
    if (!user) {
        user = yield admin_record_1.AdminRecord.getByEmail(email);
    }
    return user;
});
exports.getUserWithRoleByEmail = getUserWithRoleByEmail;
const getUserById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    let user = null;
    user = yield student_record_1.StudentRecord.getOne(id);
    if (!user) {
        yield teacher_record_1.TeacherRecord.getOne(id);
    }
    if (!user) {
        yield admin_record_1.AdminRecord.getOne(id);
    }
    return user;
});
exports.getUserById = getUserById;
//# sourceMappingURL=getUser.js.map