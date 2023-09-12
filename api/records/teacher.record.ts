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
    password?: string;
    readonly role: 'teacher';

    constructor(obj: TeacherRecord) {
        if (!obj.name || obj.name.length < 2 || obj.name.length > 40 || !obj.last_name || obj.last_name.length < 2 || obj.last_name.length > 40 || !obj.email || obj.email.length < 4 || obj.email.length > 40) {
            throw new ValidationError('Missing data or data not correct.');
        }


        this.id = obj.id;
        this.name = obj.name;
        this.last_name = obj.last_name;
        this.email = obj.email;
        this.password = obj.password;
        this.role = 'teacher';
    }

    async insert():Promise<string>  {
        if (!this.id) {
            this.id = uuid();
        }

        await pool.execute("INSERT INTO `teachers`(`id`, `name`, `last_name`, `email`, `password`, `role`) VALUES(:id, :name, :last_name, :email, :password, :role)", {
            id: this.id,
            name: this.name,
            last_name: this.last_name,
            email: this.email,
            password: this.password,
            role: this.role,
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

    static async getByEmail(email: string): Promise<TeacherRecord | null> {
        const [results] = (await pool.execute("SELECT * FROM `teachers` WHERE `email` = :email", {
            email,
        })) as TeacherRecordResults;
        return results.length === 0 ? null : new TeacherRecord(results[0]);
    }


    async assignCourseToTeacher(courseId: string) : Promise<void>{
        await pool.execute("INSERT INTO `courses_teachers`(`id`,`course_id`, `teacher_id`) VALUES(:id, :course_id, :teacher_id)", {
            id: uuid(),
            course_id: courseId,
            teacher_id: this.id,
        })

        await pool.execute("UPDATE `courses` SET `teacher_id`=:teacher_id WHERE `id`= :id", {
            id: courseId,
            teacher_id: this.id
        })
    }

    async removeAllCoursesFromTeacher() {
          await pool.execute("DELETE FROM `courses_teachers` WHERE `teacher_id` =:teacher_id", {
              teacher_id: this.id
          })
          await pool.execute("UPDATE `courses` SET `teacher_id` =:noTeacher WHERE `teacher_id` =:teacher_id", {
              noTeacher: null,
              teacher_id: this.id
          })
    }


    // @todo ew stworzyć klasę App i przenieść tam powyższą metodę jako STATIC ?

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
        await pool.execute("UPDATE `courses` SET `teacher_id` = :noId WHERE `teacher_id` =:teacher_id", {
            noId: null,
            teacher_id: this.id
        })
        await pool.execute("DELETE FROM `courses_teachers` WHERE `teacher_id` =:teacher_id", {
            teacher_id: this.id
        })
    }

    async update(): Promise<void> {
        await pool.execute("UPDATE `teachers` SET `name` = :name, `last_name` = :last_name, `email`=:email  WHERE `id` =:id ", {
            id: this.id,
            name: this.name,
            last_name: this.last_name,
            email: this.email,
        });
    }

}

