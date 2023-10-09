import {AdminEntity, StudentEntity, TeacherEntity, UserRole} from "../types";
import {StudentRecord} from "./student.record";
import {TeacherRecord} from "./teacher.record";
import {AdminRecord} from "./admin.record";
import {userWithoutPassword} from "../utils/dataWithoutPassword";
import {log} from "util";

type GetUserType = StudentRecord | TeacherRecord | AdminRecord | null;

export class UserRecord {
    id?: string;
    name?: string;
    last_name?: string;
    email: string;
    password: string;
    readonly role: UserRole;

    static async getALLUsers():Promise<GetUserType[]> {
        const students = (await StudentRecord.listAll(''))
        const teachers = (await TeacherRecord.listAll(''))
        const admins = (await AdminRecord.listAll())
        return [...students, ...teachers, ...admins]
    }


    static async getUserByEmail(email: string): Promise<GetUserType> {
        return (await UserRecord.getALLUsers()).find(user => user.email === email)
    }

    static async getUserById(id: string):Promise<GetUserType> {
        return (await UserRecord.getALLUsers()).find(user => user.id === id)
    }






}