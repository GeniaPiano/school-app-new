
import * as bcrypt from 'bcryptjs';
import {NextFunction, raw, Request, Response} from 'express';
import {ValidationError} from "../utils/errors";
import {
    GetSingleStudentRes,
    StudentReq,
} from "../types";
import {StudentRecord} from "../records/student.record";
import {generatePassword} from "../utils/generatePassword";
import {checkMailAvaible} from "../utils/checkMailAvailable";
import {AlreadyExistsRelations} from "../utils/checkAlreadyExistsRelaions";
import {CourseRecord} from "../records/course.record";



export const getAllStudents = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const students: StudentRecord[] = await StudentRecord.listAll();
            res.json( {
            students,
        });
    } catch(err) {
        next(err)
    }
}

export const getOneStudent = async (req: Request, res: Response) => {
        const student = await StudentRecord.getOne(req.params.id);
        if (!student) throw new ValidationError('Student not found.');

        const selectedCourses = await StudentRecord._getSelectedCoursesByStudent(req.params.id)

        res.json({
            student,
            selectedCourses,
        } as  GetSingleStudentRes)
}

    export const createStudent = async (req: Request, res: Response) => {
        const { name, last_name } = req.body as StudentReq;
        const rawPassword = generatePassword(name, last_name);
        const hashedPassword = await bcrypt.hash(rawPassword, 10);

        const studentData = {
            ...req.body,
            password: hashedPassword,
            is_admin: 0,
        } as StudentRecord;

    const student = new StudentRecord(studentData);
    const checkOkMail = checkMailAvaible(student.email) //sprawdzanie dostępności maila
        if (!checkOkMail) {
        throw new ValidationError('Mail already exists.')
    }

    //@todo miejsce na wysłanie hasła na maila użytkownika

    await student.insert();


    res.json({
            password: rawPassword,
            student: student,

        })
}


export const addCourseToStudent = async (req: Request, res: Response ) => {

        const student = await StudentRecord.getOne(req.params.id);
        if (!student) throw new ValidationError('Cannot find student');
        const courseId: string = req.body.courseId
        const courseToAdd = await CourseRecord.getOne(courseId)
        if (!courseToAdd) throw new ValidationError('Course wanted to assign to student not found.')
        const check = await AlreadyExistsRelations(student.id, courseToAdd.id)
        if (check) throw new ValidationError('Cannot assign this course to student. Chosen course is already assigned to this student.')
        await student.insertCourseForStudent(courseToAdd.id);

        res.json({
            message: "ok"
        })

}


export const removeCourseFromStudent =  async (req: Request, res: Response, next: NextFunction) => {

        const student = await StudentRecord.getOne(req.params.id);
        if (!student) {
            throw new ValidationError('Cannot find student.')
        }
        if (req.body.courseId) {
            await student.removeFromSelected(req.body.courseId)
        } else throw new ValidationError("No courses to delete.")
        res.end();

}

export const updateStudent = async (req: Request, res: Response, ) => {

        const student = await StudentRecord.getOne(req.params.id);
        if (student === null) {
            throw new ValidationError('Student with given ID does not exist.');
        }
        const { name, last_name, email} = req.body;
        const fieldsToUpdate: Partial<StudentReq> = { name, last_name, email };
        for (const key in fieldsToUpdate) {
            if (fieldsToUpdate[key as keyof StudentReq]) {
                student[key as keyof StudentReq] = fieldsToUpdate[key as keyof StudentReq]!;
            }
        }
        await student.update();
        res.json(student);

}

export const deleteStudent = async (req: Request, res: Response, next: NextFunction) => {

        const student = await StudentRecord.getOne(req.params.id);
        if (!student) {
            throw new ValidationError('Cannot find student.')
        }
        await student.delete(req.params.id)

        res.end();

}


