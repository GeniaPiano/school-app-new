import {TeacherEntity} from "../teacher";
import {AdminEntity} from "../admin";
import { StudentEntity} from "../student";

export interface UserEntityLoginData {
    id?: string;
    email: string;
    password: string;
}

export interface UserEntityRegisterData extends UserEntityLoginData{
    name: string;
    last_name: string;
}

export type UserEntity = AdminEntity | TeacherEntity | StudentEntity;


export type UserRole = 'teacher' | 'admin' | 'student';