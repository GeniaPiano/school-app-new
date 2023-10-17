
import {StudentEntity, TeacherEntity, AdminEntity} from "../types";
import {StudentRecord} from "../records/student.record";
import {TeacherRecord} from "../records/teacher.record";
import {AdminRecord} from "../records/admin.record";



export const userWithoutPassword = (userObj: StudentEntity | TeacherEntity | AdminEntity | StudentRecord | TeacherRecord | AdminRecord ) => {
    const {password, ...rest} = userObj
    return {
        ...rest
    }
}







