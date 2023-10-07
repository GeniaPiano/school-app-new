import * as bcrypt from 'bcryptjs';
import {NextFunction, Request, Response} from "express";
import {AdminRecord} from "../records/admin.record";
import {userWithoutPassword} from "../utils/dataWithoutPassword";

interface UpdateAdminRequest {
    id: string;
    email: string;
    password: string;
}

export const updateAdmin = async (req: Request, res: Response, next:NextFunction) => {
    const {id, email, password} = req.body as UpdateAdminRequest;
    const admin = await AdminRecord.getOne(id);
    admin.email = email;


    // //@todo send email with new password to user
    //
    admin.password = await bcrypt.hash(password, 10)

    await admin.updateAdminData();
    res.json({
        user: userWithoutPassword(admin)
    })

}