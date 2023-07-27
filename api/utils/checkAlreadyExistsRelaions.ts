
import {pool} from "./db";
import {RowDataPacket} from "mysql2";


export const AlreadyExistsRelations = async(studentId:string, courseId:string):Promise<boolean> => {
    const [results] = await pool.execute<RowDataPacket[]>("SELECT * FROM `courses_students` WHERE `course_id` = :course_id AND `student_id` = :student_id ", {
        course_id:courseId,
        student_id: studentId,
    })

    if (results.length === 0) return false;
    if (results.length > 0) return true;

}