"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generatePassword = void 0;
const generatePassword = (name, last_name) => {
    const randomNumbers = Math.floor(Math.random() * 100000).toString();
    return `${name.toLowerCase()}${last_name.toLowerCase()}${randomNumbers}`;
};
exports.generatePassword = generatePassword;
//# sourceMappingURL=generatePassword.js.map