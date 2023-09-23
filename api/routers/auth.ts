import {NextFunction, Request, Response, Router} from "express";

import * as bcrypt from "bcryptjs";
import * as jwt from 'jsonwebtoken';
import {getUserById, getUserWithRoleByEmail} from "../utils/getUser";
// import {TeacherRecord} from "../records/teacher.record";
// import {AdminRecord} from "../records/admin.record";
// import {StudentRecord} from "../records/student.record";
// import {NotFoundError, ValidationError} from "../utils/errors";
import {userWithoutPassword} from "../utils/dataWithoutPassword";
import {JwtPayload} from "jsonwebtoken";
import {checkToken, login, logout, register} from "../controllers/auth";

export const authRouter = Router();


authRouter

    .post('/login', login)
    .get('/me', checkToken)
    .post ('/logout', logout)
    .post ('/register', register)


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



