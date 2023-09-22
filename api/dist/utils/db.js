"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pool = void 0;
const promise_1 = require("mysql2/promise");
const config_1 = require("../config/config");
exports.pool = (0, promise_1.createPool)({
    host: config_1.config.dbHost,
    user: config_1.config.dbUser,
    database: config_1.config.dbDatabase,
    password: config_1.config.dbPassword,
    namedPlaceholders: true,
    decimalNumbers: true,
});
//# sourceMappingURL=db.js.map