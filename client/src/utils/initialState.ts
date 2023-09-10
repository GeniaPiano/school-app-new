import {TeacherBasicData, TeacherEntity} from "../types/teacher";
import {StudentBasicData, StudentEntity} from "../types/student";


export const initialStateTeacher = {
    name: '',
    last_name: "",
    email: "",
}

export const initialStateTouchCount = {
    name: 0,
    last_name: 0,
    email: 0,
}

export const initialStateValues = (obj: TeacherEntity | StudentEntity) => ({
    name: obj.name,
    last_name: obj.last_name,
    email: obj.email
} as TeacherBasicData | StudentBasicData)
