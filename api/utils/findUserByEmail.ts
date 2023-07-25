import {pool} from "./db";
import {FieldPacket} from "mysql2";
import {ValidationError} from "./errors";

interface UserReq {
    email:string;
    password: string;
}

type RecordResults = [UserReq[], FieldPacket[]];

export const getUserByEmail = async(email:string): Promise<UserReq>=> {
    const [dataTeachers] = await pool.execute("SELECT  `email`,`password` FROM `teachers` ") as RecordResults
    const [dataStudents] = await pool.execute("SELECT `email`, `password`  FROM `students`") as RecordResults
    const [dataAdmin] = await pool.execute("SELECT `email`, `password`  FROM `admin`") as RecordResults

    const data = [ ...dataTeachers,...dataStudents,...dataAdmin]
    const foundUser = data.filter(user => user.email === email)[0] as UserReq
    if (!foundUser) throw new ValidationError("User no found.")
    return foundUser;
}