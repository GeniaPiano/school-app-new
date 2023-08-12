import {StudentRecord} from "../records/student.record";
import {TeacherRecord} from "../records/teacher.record";

export type UserWithoutPassword = Omit<StudentRecord | TeacherRecord, 'password'>