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
exports.authRouter = void 0;
const express_1 = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const getUser_1 = require("../utils/getUser");
// import {TeacherRecord} from "../records/teacher.record";
// import {AdminRecord} from "../records/admin.record";
// import {StudentRecord} from "../records/student.record";
// import {NotFoundError, ValidationError} from "../utils/errors";
const dataWithoutPassword_1 = require("../utils/dataWithoutPassword");
exports.authRouter = (0, express_1.Router)();
exports.authRouter.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const user = yield (0, getUser_1.getUserWithRoleByEmail)(email);
    if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }
    if (user) {
        const passwordMatch = yield bcrypt.compare(password, user.password);
        if (passwordMatch) {
            const token = jwt.sign({ userId: user.id }, 'easy-secret-key', { expiresIn: '1h' });
            console.log(token);
            res.json({
                user: (0, dataWithoutPassword_1.userWithoutPassword)(user),
                token,
            });
        }
        else {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
    }
}))
    .get('/me', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.header('Authorization');
    if (token) {
        console.log(token);
        try {
            const decoded = jwt.verify(token, 'easy-secret-key');
            if (typeof decoded === 'object' && 'userId' in decoded) {
                const userId = decoded.userId; // Ręczne rzutowanie do JwtPayload
                const user = yield (0, getUser_1.getUserById)(userId);
                if (user) {
                    const clearedUser = (0, dataWithoutPassword_1.userWithoutPassword)(user);
                    return res.status(200).json(clearedUser);
                }
            }
            else {
                console.error('Invalid token format');
            }
        }
        catch (err) {
            console.error('Token verification failed:', err);
        }
    }
    return res.status(401).json({ error: 'Unauthorized' });
}))
    .post('/logout', (req, res) => {
    res.status(200).json({ message: 'Logged out successfully' });
});
// interface User {
//     role: string;
//
// }
// export const authorizeAdmin = () => {
//     return (req: Request, res: Response, next: NextFunction) => {
//         const userRole = req.user.role
//
//         if (userRole !== 'admin') {
//             return res.status(403).json({ message: 'Access forbidden' });
//         }
//         next();
//     };
// };
// export const authorizeStudent = () => {
//     return (req: Request, res: Response, next: NextFunction) => {
//         const userRole = req.user.role;
//
//         if (userRole !== 'student') {
//             return res.status(403).json({ message: 'Access forbidden : student' });
//         }
//         next();
//     };
// };
//
// export const authorizeTeacher = () => {
//     return (req:Request, res: Response, next: NextFunction) => {
//         const userRole = req.user.role;
//
//         if (userRole !== 'teacher') {
//             return res.status(403).json({ message: 'Access forbidden : teacher' });
//         }
//         next();
//     };
// };
//# sourceMappingURL=auth.js.map