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

export const authRouter = Router();


authRouter.post('/login', async (req, res) => {
    const { email, password} = req.body;
    const user = await getUserWithRoleByEmail(email)

    if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }

    if (user) {
         const passwordMatch = await bcrypt.compare(password, user.password);
         if (passwordMatch) {
            const token = jwt.sign({ userId: user.id }, 'easy-secret-key', { expiresIn: '1h' });
             console.log(token)
            res.json({
                 user: userWithoutPassword(user),
                 token,
             })
         } else {
             return res.status(401).json({ message: 'Invalid credentials' })
         }
    }
})



 .get('/me', async(req, res) => {

    const token = req.header('Authorization');

        if (token) {
            console.log(token)
            try {

                const decoded = jwt.verify(token, 'easy-secret-key');

                if (typeof decoded === 'object' && 'userId' in decoded) {
                    const userId = (decoded as JwtPayload).userId; // Ręczne rzutowanie do JwtPayload
                    const user = await getUserById(userId)
                    if (user) {
                        const clearedUser = userWithoutPassword(user);
                        return res.status(200).json(clearedUser);
                    }
                } else {
                    console.error('Invalid token format');
                }
            } catch (err) {
                console.error('Token verification failed:', err);
            }
        }


    return res.status(401).json({ error: 'Unauthorized' });
})



    .post ('/logout', (req, res) => {
        res.status(200).json({ message: 'Logged out successfully' })
    })


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



