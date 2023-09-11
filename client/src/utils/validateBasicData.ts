import {StudentBasicData} from "../types/student";
import {TeacherBasicData} from "../types/teacher";

export const validateUserBasicData = (user: StudentBasicData | TeacherBasicData) => {
    if (user.name === "" || user.name.length <2 || user.name.length > 40
        || user.last_name === "" || user.last_name.length < 2 || user.last_name.length > 40
        || user.email === "" || user.email.length < 4 || user.email.length > 40 || !user.email.includes('@')) {
        return;
    }

}