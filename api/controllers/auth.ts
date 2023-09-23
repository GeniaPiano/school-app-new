import {NextFunction, Request, Response} from "express";
import {getUserById, getUserWithRoleByEmail} from "../utils/getUser";
import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";
import {userWithoutPassword} from "../utils/dataWithoutPassword";
import {JwtPayload} from "jsonwebtoken";
import {StudentRecord} from "../records/student.record";
import {UserEntityLoginData} from "../types";
import {checkMailAvailable} from "../utils/checkMailAvailable";
import {ValidationError} from "../utils/errors";

export const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
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
    } catch(err) {
        next(err)
    }
}

export const checkToken = async(req: Request, res: Response, next: NextFunction) => {
        const token = req.header('Authorization');
        if (token) {
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
}

export const logout = (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json({ message: 'Logged out successfully' })
}

export const register = async (req: Request, res: Response, next: NextFunction) => {
    const {email, password} = req.body as UserEntityLoginData
    const hashedPassword = await bcrypt.hash(password, 10);
    const checkOkMail = await checkMailAvailable(email); //sprawdzanie dostępności maila
    if (!checkOkMail) {
        throw new ValidationError("Email already exists.")
    }

    const userData = {
        ...req.body,
        name: null,
        last_name: null,
        password: hashedPassword,
    } as StudentRecord;
    const user = await new StudentRecord(userData);
    await user.insert();

    res.json({
        student: userWithoutPassword(user)
    })



}