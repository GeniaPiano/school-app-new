import * as bcrypt from 'bcryptjs';
import {NextFunction, Request, Response, Router} from 'express';
import {ValidationError} from "../utils/errors";
import {
    DataCoursesResForSingleStudent,
    GetSingleStudentRes,
    StudentReq,
    } from "../types";
import {StudentRecord} from "../records/student.record";
import {getListOfUsersMails} from "../utils/listOfMails";
import {generatePassword} from "../utils/generatePassword";


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

export const getOneStudent = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const student = await StudentRecord.getOne(req.params.id);
        if (!student) throw new ValidationError('Student not found.');

        const selectedCourses = await StudentRecord._getSelectedCoursesByStudent(req.params.id)

        res.json({
            student,
            selectedCourses,
        } as  GetSingleStudentRes)

    } catch (err) {
        next (err)
    }
}

export const createStudent = async (req: Request, res: Response, next: NextFunction) => {
    const {name, last_name } = req.body as StudentReq
    const studentData = {
        ...req.body,
        password: generatePassword(name, last_name),
        is_admin: 0,
    } as StudentRecord

    const student = new StudentRecord(studentData);
    const listOfMails = await getListOfUsersMails();
    const data = listOfMails.filter((mail) => mail === student.email);
    if (data.length !== 0) {
        throw new ValidationError('Email already exists. ')
    }
    //@todo miejsce na wysłanie hasła na maila użytkownika
    const hash = await bcrypt.hash(student.password, 10);
    await student.insert(hash);

    const selectedCourses = req.body.selectedCourses as DataCoursesResForSingleStudent[];

    if (selectedCourses.length !== 0) {
        for (const course of selectedCourses) {
            await student.insertCourseForStudent(String(course))
        }
    }



    res.json(
        {
            student: student,
            selectedCourses,
        }
    )
}


export const addCourseToStudent = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const student = await StudentRecord.getOne(req.params.id);
        if (!student) throw new ValidationError('Cannot find student');
        const coursesToAdd: string[] = req.body.selectedCourses;
        if (coursesToAdd.length !== 0 ){
            for (const courseId of coursesToAdd) {
                await student.insertCourseForStudent(courseId);
            }
        }
        const selectedCourses = await StudentRecord._getSelectedCoursesByStudent(req.params.id)
        res.json({
            selectedCourses,
        })
    } catch (err) {
        next(err)
    }
}


export const removeCourseFromStudent =  async (req: Request, res: Response, next: NextFunction) => {
    try {
        const student = await StudentRecord.getOne(req.params.id);
        if (!student) {
            throw new ValidationError('Cannot find student.')
        }
        if (req.body.course_id) {
            await student.removeFromSelected(req.body.course_id)
        } else throw new ValidationError("No courses to delete.")
        res.end();
    } catch (err) {
        next(err)
    }
}

export const updateStudent = async (req: Request, res: Response, next: NextFunction) => {
    try {
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
    } catch(err) {
        next(err)
    }
}

export const deleteStudent = async (req: Request, res: Response, next: NextFunction) => {

        const student = await StudentRecord.getOne(req.params.id);
        if (!student) {
            throw new ValidationError('Cannot find student.')
        }
        await student.delete(req.params.id)

        res.end();

}


