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
exports.AlreadyExistsRelations = void 0;
const db_1 = require("./db");
const AlreadyExistsRelations = (studentId, courseId) => __awaiter(void 0, void 0, void 0, function* () {
    const [results] = yield db_1.pool.execute("SELECT * FROM `courses_students` WHERE `course_id` = :course_id AND `student_id` = :student_id ", {
        course_id: courseId,
        student_id: studentId,
    });
    if (results.length === 0)
        return false;
    if (results.length > 0)
        return true;
});
exports.AlreadyExistsRelations = AlreadyExistsRelations;
//# sourceMappingURL=checkAlreadyExistsRelaions.js.map