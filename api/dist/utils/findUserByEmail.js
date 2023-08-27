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
exports.getUserByEmail = void 0;
const db_1 = require("./db");
const errors_1 = require("./errors");
const getUserByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const [dataTeachers] = yield db_1.pool.execute("SELECT  `email`,`password` FROM `teachers` ");
    const [dataStudents] = yield db_1.pool.execute("SELECT `email`, `password`  FROM `students`");
    const [dataAdmin] = yield db_1.pool.execute("SELECT `email`, `password`  FROM `admin`");
    const data = [...dataTeachers, ...dataStudents, ...dataAdmin];
    const foundUser = data.filter(user => user.email === email)[0];
    if (!foundUser)
        throw new errors_1.ValidationError("User no found.");
    return foundUser;
});
exports.getUserByEmail = getUserByEmail;
//# sourceMappingURL=findUserByEmail.js.map