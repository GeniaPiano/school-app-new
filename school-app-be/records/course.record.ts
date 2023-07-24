import {pool} from "../utils/db";
import {ValidationError} from "../utils/errors";
import {v4 as uuid} from "uuid";
import {FieldPacket, RowDataPacket} from "mysql2";
import {CourseEntity} from "../types";

type CourseRecordResults = [CourseRecord[], FieldPacket[]]


export class CourseRecord implements CourseEntity {
    id?: string;
    name: string;
    teacher_id: string | null;

    constructor(obj: CourseEntity) {
        if (!obj.name || obj.name.length < 6 || obj.name.length > 40) {
            throw new ValidationError('CoursesView name should contain from 5 to 40 characters');
        }


        this.id = obj.id;
        this.name = obj.name;
        this.teacher_id = obj.teacher_id;
    }



    async insert():Promise<string>  {
        if (!this.id) {
            this.id = uuid();
        }
        if (!this.teacher_id) {
            this.teacher_id = null;
        }

        await pool.execute("INSERT INTO `courses`(`id`, `name`, `teacher_id`) VALUES(:id, :name, :teacher_id)", {
            id: this.id,
            name: this.name,
            teacher_id: this.teacher_id,
        });

        return this.id;
    }


    //akutalizacja tabeli relacyjnej @todo zmienić konfigurację bazy danych - cascade nie działa
    async _updateRelationCoursesTeachers(teacher_id:string, course_id: string):Promise<void> {

         await pool.execute("INSERT INTO `courses_teachers`(`id`,`course_id`, `teacher_id`) VALUES(:id, :course_id, :teacher_id)", {
             id: uuid(),
             course_id: course_id,
             teacher_id: teacher_id,

            });
    }

    static async listAll(): Promise <CourseRecord[]> {
        const [results] = await pool.execute("SELECT * FROM `courses`") as CourseRecordResults;
        return results.map(obj => new CourseRecord(obj));
    }

    static async getOne(id: string): Promise<CourseRecord | null> {
        const [results] = (await pool.execute("SELECT * FROM `courses` WHERE `id` = :id", {
            id,
        })) as CourseRecordResults ;
        return results.length === 0 ? null : new CourseRecord(results[0]);
    }

    async delete(): Promise<void> {
        await pool.execute("DELETE FROM `courses` WHERE `id` = :id ", {
            id: this.id,
        })

        //AKTUALIZACJA tabeli courses_teachers
        if (this.teacher_id !== null) {
            await pool.execute("DELETE FROM `courses_teachers` WHERE `course_id` = :id", {
                id: this.id
            })
        }
    }

    async update(): Promise<void> {
        await pool.execute("UPDATE `courses` SET `name` = :name, `teacher_id` = :teacher_id WHERE `id` = :id", {
            id: this.id,
            name: this.name,
            teacher_id: this.teacher_id
        });

        // AKTUALIZACJA tabeli courses_teaches
        await pool.execute("UPDATE `courses_teachers` SET  `teacher_id` = :teacher_id WHERE `course_id` = :course_id", {
            course_id: this.id,
            teacher_id: this.teacher_id,
        });

    }

    async countStudents(): Promise<number> {
        const data = await pool.execute<RowDataPacket[]>("SELECT COUNT(*) AS `countStudents` FROM `courses_students` WHERE `course_id` = :id", {
            id: this.id,
        });
        const { countStudents } = data[0][0];
        return countStudents as number;
    }

    async getTeacherName(teacher_id: string): Promise<string> {
        const data = await pool.execute<RowDataPacket[]>("SELECT  `name`, `last_name` FROM `teachers` WHERE `id` = :teacher_id", {
            teacher_id,
        });

        const {name, last_name} = data[0][0];
        return String(`${name} ${last_name}`);
    }
}

