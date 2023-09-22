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
exports.AdminRecord = void 0;
const db_1 = require("../utils/db");
class AdminRecord {
    constructor(obj) {
        this.id = obj.id;
        this.email = obj.email;
        this.password = obj.password;
        this.role = 'admin';
    }
    static listAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const [results] = yield db_1.pool.execute("SELECT * FROM `admin`");
            return results[0];
        });
    }
    static getByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const [results] = (yield db_1.pool.execute("SELECT * FROM `admin` WHERE `email` = :email", {
                email,
            }));
            return results.length === 0 ? null : new AdminRecord(results[0]);
        });
    }
    static getOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const [results] = (yield db_1.pool.execute("SELECT * FROM `admin` WHERE `id` = :id", {
                id,
            }));
            return results.length === 0 ? null : new AdminRecord(results[0]);
        });
    }
}
exports.AdminRecord = AdminRecord;
//# sourceMappingURL=admin.record.js.map