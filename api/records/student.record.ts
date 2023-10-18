import {pool} from "../utils/db";
import {ValidationError} from "../utils/errors";
import {v4 as uuid} from "uuid";
import {FieldPacket} from "mysql2";
import {StudentEntity} from "../types";
import {CourseRecord} from "./course.record";


export interface RelatedData {
    id:string;
    course_id: string;
    student_id: string;
    startedAt: Date,
    description: string | null;
    price: number,
    name: string;
    photoUrl: string;
}
type StudentRecordResults = [StudentRecord[], FieldPacket[]]
type StudentCoursesRelatedData = [RelatedData[], FieldPacket[]]

export class StudentRecord implements StudentEntity {
    id?: string;
    name: string;
    last_name: string;
    email: string;
    password: string;
    readonly role: 'student';

    constructor(obj: StudentRecord) {
        if (obj.name !==  null && ( !obj.name || obj.name.length <=2  || obj.name.length > 40 )) {
            throw new ValidationError('Missing data or data not correct.')
        }
        if (obj.last_name !== null && (!obj.last_name || obj.last_name.length <= 2 || obj.last_name.length > 40
            || !obj.email || obj.email.length < 4 || obj.email.length > 40)) {
            throw new ValidationError('Missing data or data not correct.')
        }

        this.id = obj.id;
        this.name = obj.name;
        this.last_name = obj.last_name;
        this.email = obj.email;
        this.password = obj.password;
        this.role = 'student'
    }

    async insert():Promise<string>  {
        if (!this.id) {
            this.id = uuid();
        }

        await pool.execute("INSERT INTO `students`(`id`, `name`, `last_name`, `email`, `password`, `role`) VALUES(:id, :name, :last_name, :email, :password, :role)", {
            id: this.id,
            name: this.name,
            last_name: this.last_name,
            email: this.email,
            password: this.password,
            role: this.role,

        });
        return this.id;
    }

        static async listAll(name: string): Promise <StudentRecord[]> {
            const [results] = await pool.execute("SELECT * FROM `students` WHERE `name` LIKE :search", {
                search: `%${name}%`,
            }) as StudentRecordResults;
            return results.map(obj => new StudentRecord(obj));
    }

    static async search(name: string): Promise <StudentRecord[]> {
        const [results] = await pool.execute("SELECT * FROM `students` WHERE `name` LIKE :search", {
            search: `%${name}%`,
        }) as StudentRecordResults;
        return results.map(obj => new StudentRecord(obj));
    }


    static async getAllStudentsByCourseId(courseId: string): Promise<StudentRecord[]> {
        const [results] = await pool.execute(
            "SELECT `students`.`id`, `students`.`name`, `students`.`last_name`, `students`.`email` FROM `students` JOIN `courses_students` ON `students`.`id` = `courses_students`.`student_id` JOIN `courses` ON `courses_students`.`course_id` = `courses`.`id` WHERE `courses`.`id` = :courseId",
            {
                courseId,
            }
        ) as StudentRecordResults;

        return results.map(obj => new StudentRecord(obj));
    }


    static async getByEmail(email: string) :Promise <StudentRecord> | null {
        const [results] = (await pool.execute("SELECT * FROM `students` WHERE `email` = :email", {
            email,
        })) as StudentRecordResults;
        return results.length === 0 ? null : new StudentRecord(results[0]);
    }


    static async getOne(id: string): Promise<StudentRecord | null> {
        const [results] = (await pool.execute("SELECT * FROM `students` WHERE `id` = :id", {
            id,
        })) as StudentRecordResults;
        return results.length === 0 ? null : new StudentRecord(results[0]);
    }

    async insertCourseForStudent(course_id:string): Promise<void> {
        await pool.execute("INSERT INTO `courses_students`(`id`, `student_id`, `course_id`) VALUES(:id, :student_id, :course_id)", {
            id: uuid(),
            student_id: this.id,
            course_id,
        });
    }

    async removeOneCourseFromStudent(course_id: string): Promise<void> {
        await pool.execute("DELETE FROM `courses_students` WHERE `student_id` = :student_id AND  `course_id` = :course_id", {
            student_id:this.id,
            course_id,
        })
    }

    async removeAllCourses(): Promise<void> {
        await pool.execute("DELETE FROM `courses_students` WHERE `student_id` = :student_id",{
            student_id: this.id,
        })
    }

    static async _getSelectedCoursesByStudent(student_id: string): Promise<RelatedData[] | null> {
        const [results] = (await pool.execute(
            "SELECT `courses_students`.`course_id`, `courses_students`.`student_id`, `courses_students`.`startedAt`, `courses`.`price`, `courses`.`photoUrl`, `courses`.`name` " +
            "FROM `courses_students` " +
            "LEFT JOIN `courses` ON `courses_students`.`course_id` = `courses`.`id` " +
            "WHERE `courses_students`.`student_id` = :student_id",
            {
                student_id,
            }
        )) as StudentCoursesRelatedData;
        let selectedCourses: RelatedData[] | null = [];
        if (results.length === 0) {
            selectedCourses = [];
        } else {
            selectedCourses = results.map((result) => ({
                id: result.course_id,
                course_id: result.course_id,
                description: result.description,
                student_id: result.student_id,
                startedAt: result.startedAt,
                price: result.price,
                name: result.name,
                photoUrl: result.photoUrl,
            }));
        }
        return selectedCourses;
    }

    static async _getCoursesNotSelectedByStudent(student_id: string): Promise<CourseRecord[] | null> {
        const allCourses = await CourseRecord.listAll();
        const selectedCourses = await StudentRecord._getSelectedCoursesByStudent(student_id);
        const coursesNotSelected: CourseRecord[] = [];
        allCourses.forEach(course => {
            if (!selectedCourses.some(selectedCourse => selectedCourse.id === course.id)) {
                coursesNotSelected.push(course);
            }
        });
        return coursesNotSelected;
    }

    async delete(id:string): Promise<void> {
        const student = await StudentRecord.getOne(id);
        if (!student) {
            throw new ValidationError('Student not found.')
        }
        //najpierw usuwamy zależności
        await pool.execute('DELETE FROM `courses_students` WHERE `student_id` = :id', {
            id: student.id
        })
        //usuwamy rekord
        await pool.execute("DELETE FROM `students` WHERE `id` = :id ", {
            id: student.id
        })

        const selectedCourses = await StudentRecord._getSelectedCoursesByStudent(id);
        if (selectedCourses.length !== 0) {
            pool.execute("DELETE FROM `courses_students` WHERE `student_id` = :student_id", {
                student_id: id,
            })
        }
    }

    async updateNameAndEmail(): Promise<void> {
        await pool.execute("UPDATE `students` SET `name` = :name, `last_name` = :last_name, `email`= :email, `password` = :password WHERE `id` = :id", {
            id: this.id,
            name: this.name,
            last_name: this.last_name,
            email: this.email,
            password: this.password, // zahaszować!!!
        });
    }
}

