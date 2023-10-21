import {RateCourseEntity} from "../types/rateCourse/rateCourse";
import {ValidationError} from "../utils/errors";
import {v4 as uuid} from "uuid";
import {pool} from "../utils/db";
import {FieldPacket} from "mysql2";

type RateCoursesRecordResults = [RateCourseRecord[], FieldPacket[]]

export class RateCourseRecord implements RateCourseEntity {
    id?: string;
    course_id: string;
    student_id: string;
    opinion?: string;
    stars: 1 | 2 | 3 | 4 | 5;

    constructor(obj: RateCourseRecord) {
        if (!obj.stars || obj.opinion !== null && obj.opinion.length > 2000) {
            throw new ValidationError('Missing data or data not correct.')
        }

        this.id = obj.id;
        this.course_id = obj.course_id;
        this.student_id = obj.student_id;
        this.opinion = obj.opinion;
        this.stars = obj.stars;
    }

    async insert():Promise<string>  {
        if (!this.id) {
            this.id = uuid();
        }
        if (!this.opinion) {
            this.opinion = null
        }
        await pool.execute("INSERT INTO `course_student_rates`(`id`, `course_id`, `student_id`, `stars`, `opinion`) VALUES(:id, :course_id, :student_id, :stars, :opinion)", {
            id: this.id,
            course_id: this.course_id,
            student_id: this.student_id,
            stars: this.stars,
            opinion: this.opinion,
        });
        return this.id
    }

    async update():Promise<void> {
        await pool.execute("UPDATE `course_student_rates` SET `stars` = :stars, `opinion` = :opinion `id` = :id", {
            id: this.id,
        });
    }

    static async listAll() {
        const [results] = await pool.execute("SELECT * FROM `course_student_rates`") as RateCoursesRecordResults;
        return results.map(obj => new RateCourseRecord(obj));
            }

    static async listAllForOneCourse(courseId: string): Promise<RateCourseRecord[]> {
        const [results] = await pool.execute("SELECT * FROM `course_student_rates`  WHERE `course_id` = :course_id ",{
            course_id: courseId
        }) as RateCoursesRecordResults;

        return results.map((obj) => new RateCourseRecord(obj));
    }








}