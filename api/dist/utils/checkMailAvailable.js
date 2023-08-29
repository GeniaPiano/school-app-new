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
exports.checkMailAvaible = void 0;
const db_1 = require("./db");
const checkMailAvaible = (mail) => __awaiter(void 0, void 0, void 0, function* () {
    const [dataTeachers] = yield db_1.pool.execute("SELECT  `email` FROM `teachers` ");
    const [dataStudents] = yield db_1.pool.execute("SELECT `email` FROM `students`");
    const [dataAdmin] = yield db_1.pool.execute("SELECT `email` FROM `admin`");
    const dataTeachersStudents = [...dataTeachers, ...dataStudents, ...dataAdmin];
    let mails = [];
    dataTeachersStudents.map(el => {
        mails.push(el.email);
    });
    const check = mails.filter(one => one === mail);
    if (check.length !== 0)
        return false;
    if (check.length === 0)
        return true;
});
exports.checkMailAvaible = checkMailAvaible;
//# sourceMappingURL=checkMailAvailable.js.map