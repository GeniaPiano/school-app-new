import {NextFunction, Request, Response} from "express";
import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";
import {userWithoutPassword} from "../utils/dataWithoutPassword";
import {JwtPayload} from "jsonwebtoken";
import {StudentRecord} from "../records/student.record";
import {UserEntityRegisterData} from "../types";
import {checkMailAvailable} from "../utils/checkMailAvailable";
import {ValidationError} from "../utils/errors";
import {UserRecord} from "../records/user.record";


export const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password} = req.body;
        const user = await UserRecord.getUserByEmail(email)
                if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        if (user) {
            const passwordMatch = await bcrypt.compare(password, user.password);
            if (passwordMatch) {
                const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT, { expiresIn: '1h' });

                res
                    .cookie("access_token", token, {httpOnly: true})
                    .status(200)
                    .json({
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
        const token = req.header('Authorization')?.slice(7);
        if (token) {
            try {

                const decoded: JwtPayload | string = jwt.verify(token, process.env.JWT) as JwtPayload;
                if (typeof decoded === 'object' && 'id' in decoded && 'role' in decoded) {
                    const id = (decoded as JwtPayload).id
                    const role = (decoded as JwtPayload).role;
                    const user = await UserRecord.getUserById(id);

                    if (user) {
                        const clearedUser = userWithoutPassword(user);
                        return res.status(200).json({id, role, ...clearedUser});
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
    const {email, password} = req.body as UserEntityRegisterData;
    const hashedPassword = await bcrypt.hash(password, 10);
    const checkOkMail = await checkMailAvailable(email); //sprawdzanie dostępności maila
    if (!checkOkMail) {
        throw new ValidationError("Email already exists.")
    }

    //@todo MAIL INFO TO USER
    const userData = {
        ...req.body,
        password: hashedPassword,
    } as StudentRecord;
    const user = await new StudentRecord(userData);
    await user.insert();

    res.status(200).json('User has been created')



}