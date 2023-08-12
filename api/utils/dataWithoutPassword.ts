import {StudentRecord} from "../records/student.record";
import {TeacherRecord} from "../records/teacher.record";
import {UserWithoutPassword} from "../types/common";
import {StudentEntity, TeacherEntity} from "../types";
import {AdminRecord} from "../records/admin.record";




// export const userWithoutPassword = (userObj) => {
//     const {password, ...rest} = userObj
//     return {
//         ...rest
//     }
// }



//
// export const dataWithoutPassword = (data: StudentRecord[] | TeacherRecord[]) : UserWithoutPassword[]  => {
//     return data.map(el => {
//         const {password, ...rest} = el;
//         return {...rest}
//     })
// }

// export const dataWithoutPassword = (data: (StudentRecord | TeacherRecord)[]) : UserWithoutPassword[]  => {
//     return data.map(userObj => userWithoutPassword(userObj));
// }