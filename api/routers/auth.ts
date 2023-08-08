import {NextFunction, Request, Response, Router} from "express";

import * as bcrypt from "bcryptjs";
import * as jwt from 'jsonwebtoken';
import {GetUserReturnType, getUserWithRoleByEmail} from "../utils/checkRoleByEmail";


export const authRouter = Router();


authRouter.post('/login', async (req, res) => {
    const { email, password} = req.body;
    const user = await getUserWithRoleByEmail(email)
    if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    console.log('Wynik porównania hasła:', passwordMatch);


    const userWithoutPassword = (userObj: GetUserReturnType) => {
        const {password, ...rest} = userObj
        return {
            ...rest
        }
    }



    if (!passwordMatch) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user.id, role: user.role }, 'your-secret-key', { expiresIn: '1h' });
    res.json({
        user: userWithoutPassword(user),
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



