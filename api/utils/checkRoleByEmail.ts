import {TeacherRecord} from "../records/teacher.record";
import {AdminRecord} from "../records/admin.record";
import {StudentRecord} from "../records/student.record";


export type GetUserReturnType = StudentRecord | TeacherRecord | AdminRecord | null;

export const  getUserWithRoleByEmail = async(email: string): Promise<GetUserReturnType> => {
    let user: GetUserReturnType = null;
    user  = await StudentRecord.getByEmail(email);
    if (!user) {
        user = await TeacherRecord.getByEmail(email)
    }
    if (!user) {
        user = await AdminRecord.getByEmail(email);
    }
    return user

}