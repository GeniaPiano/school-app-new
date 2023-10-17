import {pool} from "../utils/db";
import {ValidationError} from "../utils/errors";
import {v4 as uuid} from "uuid";
import {FieldPacket, RowDataPacket} from "mysql2";
import {CourseEntity} from "../types";

type CourseRecordResults = [CourseRecord[], FieldPacket[]]

export class CourseRecord implements CourseEntity {
    id?: string;
    name: string;
    description: string;
    price?: number;
    teacher_id: string | null;
    photoUrl: string;


    constructor(obj: CourseEntity) {
        if (!obj.name || obj.name.length < 4 || obj.name.length > 40) {
            throw new ValidationError('Courses name should contain from 4 to 40 characters');
        }
        if (obj.description && obj.description.length > 3000) {
            throw new ValidationError('Courses description should contain less than 3000 chars.');
        }
        if (!obj.price || obj.price > 99999 || obj.price === 0 || typeof obj.price === 'string') {
            throw new ValidationError('Price must be a number, must be bigger than 0 and smaller than 99999.')
        }
        this.id = obj.id;
        this.name = obj.name;
        this.price = obj.price;
        this.description = obj.description;
        this.teacher_id = obj.teacher_id;
        this.photoUrl = obj.photoUrl;
    }


    async insert():Promise<string>  {
        if (!this.id) {
            this.id = uuid();
        }
        if (!this.teacher_id) {
            this.teacher_id = null;
        }


        await pool.execute("INSERT INTO `courses`(`id`, `name`, `teacher_id`, `description`,  `price`, `photoUrl`) VALUES(:id, :name, :description, :teacher_id,  :price, :photoUrl)", {
            id: this.id,
            name: this.name,
            teacher_id: this.teacher_id,
            description: this.description,
            price: this.price,
            photo: this.photoUrl,

        });
        return this.id;
    }


    //akutalizacja tabeli relacyjnej
    async _updateRelationCoursesTeachers(teacher_id:string,):Promise<void> {
         await pool.execute("INSERT INTO `courses_teachers`(`id`,`course_id`, `teacher_id`, `description`) VALUES(:id, :course_id, :description, :teacher_id)", {
             id: uuid(),
             course_id: this.id,
             teacher_id: teacher_id,
             description: this.description,
            });
    }

    static async listAll(): Promise <CourseRecord[] | []> {
        const [results] = await pool.execute("SELECT * FROM `courses`") as CourseRecordResults;
        return results.map(obj => new CourseRecord(obj));
    }

    static async listAllCoursesAvailable(): Promise<any> {
        try {
            const [results] = await pool.execute("SELECT * FROM `courses`") as CourseRecordResults;
            const filteredCourses: { course: CourseRecord, count: number }[] = await Promise.all(results.map(async (obj) => {
                const course = await new CourseRecord(obj);
                const count = await course.countStudents();
                if (count < 10) {
                    return {
                        course,
                        count,
                    }
                }
            }));

            console.log(filteredCourses);
            return filteredCourses;
        } catch (error) {
                  console.error(error);
            throw error;
        }
    }

    static async listCoursesWithoutChosenTeacher():Promise <CourseRecord[] | null> {
        const [results] = await pool.execute("SELECT * FROM `courses` ") as CourseRecordResults;
        return results
            .map(obj => new CourseRecord(obj))
            .filter(course => course.teacher_id === null)
    }

    static async getOne(id: string): Promise<CourseRecord | null> {
        const [results] = (await pool.execute("SELECT * FROM `courses` WHERE `id` = :id", {
            id,
        })) as CourseRecordResults ;
        return results.length === 0 ? null : new CourseRecord(results[0]);
    }


    async delete(): Promise<void> {
        if (await this.countStudents() > 0 ) {
            throw new ValidationError('Cannot delete the course. Remove students assigned to this course first.')
        }
        await pool.execute("DELETE FROM `courses` WHERE `id` = :id ", {
            id: this.id,
        })
        //AKTUALIZCJA TABEL RELACYJNYCH
        if (this.teacher_id !== null) {
            await pool.execute("DELETE FROM `courses_teachers` WHERE `course_id` = :id", {
                id: this.id
            })
        }
    }

    async update(): Promise<void> {
        await pool.execute("UPDATE `courses` SET `name` = :name, `teacher_id` = :teacher_id WHERE `id` = :id, `description` = :description, `photoUrl` = :photoUrl", {
            id: this.id,
            name: this.name,
            teacher_id: this.teacher_id,
            description: this.description,
            photoUrl: this.photoUrl,
        });

        await pool.execute("DELETE FROM `courses_teachers` WHERE `course_id` = :course_id", {
            course_id: this.id
        })

        if (this.teacher_id !== null) {
            await pool.execute("UPDATE `courses_teachers` SET  `teacher_id` = :teacher_id WHERE `course_id` = :course_id", {
                course_id: this.id,
                teacher_id: this.teacher_id,
            });
        }

    }




    //POBRANIE LICZBY STUDENTÓW DANEGO KURSU
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

