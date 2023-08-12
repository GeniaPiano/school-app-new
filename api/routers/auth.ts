import {NextFunction, Request, Response, Router} from "express";

import * as bcrypt from "bcryptjs";
import * as jwt from 'jsonwebtoken';
import { getUserWithRoleByEmail} from "../utils/checkRoleByEmail";
import {TeacherRecord} from "../records/teacher.record";
import {AdminRecord} from "../records/admin.record";
import {StudentRecord} from "../records/student.record";

export const authRouter = Router();


authRouter.post('/login', async (req, res) => {
    const { email, password} = req.body;
    const user = await getUserWithRoleByEmail(email)
    if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    console.log('Wynik porównania hasła:', passwordMatch);

    if (!passwordMatch) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }


   const cleared = (userObj: TeacherRecord | AdminRecord | StudentRecord) => {
        const {password, ...rest} = userObj
        return {
            ...rest
        }
    }


    const token = jwt.sign({ userId: user.id, role: user.role }, 'your-secret-key', { expiresIn: '1h' });
    res.json({
        user: cleared(user),
        token,
    });
})


    // .post ('/logout', (req, res) => {
    //
    // })


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



