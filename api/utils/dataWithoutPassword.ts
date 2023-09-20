
import {StudentEntity, TeacherEntity, AdminEntity} from "../types";





export const userWithoutPassword = (userObj: StudentEntity | TeacherEntity | AdminEntity) => {
    const {password, ...rest} = userObj
    return {
        ...rest
    }
}






