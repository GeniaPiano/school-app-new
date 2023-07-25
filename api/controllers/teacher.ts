import {NextFunction, Request, Response} from "express";
import {TeacherRecord} from "../records/teacher.record";
import {ValidationError} from "../utils/errors";
import {GetSingleTeacherRes, TeacherUpdateReq} from "../types";
import {getListOfUsersMails} from "../utils/listOfMails";

export const getAllTeachers = async (req: Request, res: Response, next: NextFunction) => {
    const teachers: TeacherRecord[] = await TeacherRecord.listAll();
    res.json( {
        teachers,
    });
}

export const getOneTeacher = async (req: Request, res: Response, next: NextFunction) => {
    const teacher = await TeacherRecord.getOne(req.params.id);
    if (!teacher) throw new ValidationError('Teacher not found.');
    const selectedCourses = await TeacherRecord._getCoursesOfThisTeacher(req.params.id)
    // if (teacher.is_admin) {
    //     console.log('true')
    // } else {
    //     console.log('false')}
    res.json({
        teacher,
        selectedCourses,
    } as GetSingleTeacherRes)
}

export const updateTeacher = async (req: Request, res: Response, next: NextFunction) => {

    const teacher = await TeacherRecord.getOne(req.params.id);
    if (teacher === null) {
        throw new ValidationError('The teacher with given ID does not exist.');
    }

    const { name, last_name, email, password} = req.body;
    const fieldsToUpdate: Partial<TeacherUpdateReq> = { name, last_name, email, password };

    for (const key in fieldsToUpdate) {
        if (fieldsToUpdate[key as keyof TeacherUpdateReq]) {
            teacher[key as keyof TeacherUpdateReq] = fieldsToUpdate[key as keyof TeacherUpdateReq]!;
        }
    }
    await teacher.update();
    res.json(teacher);
}

export const createTeacher = async (req: Request, res: Response, next: NextFunction) => {
    const newTeacher = new TeacherRecord({...req.body});
    const listOfMails = await getListOfUsersMails();
    const data = listOfMails.filter((mail) => mail === newTeacher.email);
    if (data.length !== 0) {
        throw new ValidationError('Email already exists. ')
    }
    await newTeacher.insert(req.body.email);
    res.json(newTeacher);
}
export const deleteTeacher = async (req: Request, res: Response, next: NextFunction) => {
    const teacher = await TeacherRecord.getOne(req.params.id);
    if(!teacher) {
        throw new ValidationError('No such course.');
    }
    await teacher.delete();
    res.end();
}


