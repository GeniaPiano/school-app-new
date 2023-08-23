import {StudentRecord} from "../records/student.record";
import {TeacherRecord} from "../records/teacher.record";
import {UserWithoutPassword} from "../types/common";
import {StudentEntity, TeacherEntity} from "../types";





export const userWithoutPassword = (userObj: StudentEntity | TeacherEntity) => {
    const {password, ...rest} = userObj
    return {
        ...rest
    }
}



