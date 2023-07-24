import {pool} from "../utils/db";
import {ValidationError} from "../utils/errors";
import {v4 as uuid} from "uuid";
import {FieldPacket} from "mysql2";
import {DataCoursesResForSingleTeacher, TeacherEntity} from "../types";
import {CourseRecord} from "./course.record";

type TeacherRecordResults = [TeacherRecord[], FieldPacket[]]
type TeacherSelectedCoursesResults = [CourseRecord[], FieldPacket[]]

export class TeacherRecord implements TeacherEntity {
    id?: string;
    name: string;
    last_name: string;
    email: string;
    password: string;

    constructor(obj: TeacherRecord) {
        if (!obj.name || obj.name.length <= 2 || obj.name.length > 40) {
            throw new ValidationError('Teacher name should contain from 3 to 40 characters');
        }
        if (!obj.last_name || obj.last_name.length <= 2 || obj.last_name.length > 40) {
            throw new ValidationError('Teacher last name should contain from 3 to 40 characters');
        }
            if (!obj.email || obj.email.length < 4 || obj.email.length > 40) {
            throw new ValidationError('Teacher email should contain from 4 to 40 characters');
        }
        if (!obj.password || obj.password.length <= 7 || obj.password.length > 40) {
            throw new ValidationError('Password should contain from 8 to 40 characters');
        }

        this.id = obj.id;
        this.name = obj.name;
        this.last_name = obj.last_name;
        this.email = obj.email;
        this.password = obj.password;
    }

    async insert(mailData: string):Promise<string>  {
        if (!this.id) {
            this.id = uuid();
        }

        await pool.execute("SELECT * FROM `teachers` WHERE `email` = :mailData", {
            mailData,
        })

        await pool.execute("INSERT INTO `teachers` VALUES(:id, :name, :last_name, :email, :password)", {
            id: this.id,
            name: this.name,
            last_name: this.last_name,
            email: this.email,
            password: this.password, //@todo zahashować bcrypt
        });
        return this.id;
    }

    static async listAll(): Promise <TeacherRecord[]> {
        const [results] = await pool.execute("SELECT * FROM `teachers`") as TeacherRecordResults;
        return results.map(obj => new TeacherRecord(obj));
    }

    static async getOne(id: string): Promise<TeacherRecord | null> {
        const [results] = (await pool.execute("SELECT * FROM `teachers` WHERE `id` = :id", {
            id,
        })) as TeacherRecordResults;
        return results.length === 0 ? null : new TeacherRecord(results[0]);
    }


    static async _getCoursesOfThisTeacher(teacher_id:string): Promise <DataCoursesResForSingleTeacher[] | null> {
        const [results] = (await pool.execute("SELECT * FROM `courses` WHERE `teacher_id`= :teacher_id",{
                teacher_id,
        })) as TeacherSelectedCoursesResults;
        const coursesSelected = results.map(one => {
            return {
                id: one.id,
                name: one.name
            } as DataCoursesResForSingleTeacher;
        })
        return results.length === 0 ? null : coursesSelected
    }

    async delete(): Promise<void> {
        await pool.execute("DELETE FROM `teachers` WHERE `id` = :id ", {
            id: this.id,
        })
    }

    async update(): Promise<void> {
        await pool.execute("UPDATE `teachers` SET `name` = :name, `last_name` = :last_name, `email`= :email, `password` = :password WHERE `id` = :id", {
            id: this.id,
            name: this.name,
            last_name: this.last_name,
            email: this.email,
            password: this.password,
        });


    }




}

