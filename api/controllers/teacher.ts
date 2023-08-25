import * as bcrypt from 'bcryptjs';
import {NextFunction, Request, Response} from "express";
import {TeacherRecord} from "../records/teacher.record";
import {ValidationError} from "../utils/errors";
import {GetSingleTeacherRes, TeacherEntity, TeacherReq, TeacherUpdateReq} from "../types";
import {checkMailAvaible} from "../utils/checkMailAvailable";
import {generatePassword} from "../utils/generatePassword";
import {CourseRecord} from "../records/course.record";
import {userWithoutPassword} from "../utils/dataWithoutPassword";



export const getAllTeachers = async (req: Request, res: Response, next: NextFunction) => {
    const teachers: TeacherEntity[] = await TeacherRecord.listAll();

    res.json( {
        teachers,
    });
}

export const getOneTeacher = async (req: Request, res: Response, next: NextFunction) => {
    const teacher = await TeacherRecord.getOne(req.params.id) as TeacherEntity;
    if (!teacher) throw new ValidationError('Teacher not found.');
    const teacherCleaned = userWithoutPassword(teacher)
    const selectedCourses = await TeacherRecord._getCoursesOfThisTeacher(req.params.id)
    res.json({
        teacher: teacherCleaned,
        selectedCourses,
    } as GetSingleTeacherRes)
}

export const createTeacher = async (req: Request, res: Response, next: NextFunction) => {

    const {name, last_name} = req.body as TeacherReq;
    const rawPassword = generatePassword(name, last_name);
    const hashedPassword = await bcrypt.hash(rawPassword, 10);


    const teacherData= {
        ...req.body,
        password: hashedPassword,
        is_admin: 0,
    } as TeacherRecord

    const teacher = new TeacherRecord(teacherData);
    const checkOkMail = await checkMailAvaible(teacher.email); //sprawdzanie dostępności maila
    if (!checkOkMail) {
        throw new ValidationError('Email already exists.')
    }

    // miejsce na wysłanie hasła na maila użytkownika
    const hash = await bcrypt.hash(teacher.password, 10)
    await teacher.insert();
    res.json(teacher);

}

export const updateTeacher = async (req: Request, res: Response, next: NextFunction) => {
    const teacher = await TeacherRecord.getOne(req.params.id);
    if (teacher === null) {
        throw new ValidationError('The teacher with given ID does not exist.');
    }
    const { name, last_name, email } = req.body as TeacherUpdateReq;
    const fieldsToUpdate: Partial<TeacherReq> = { name, last_name, email };
    for (const key in fieldsToUpdate) {
        if (fieldsToUpdate[key as keyof TeacherReq]) {
            teacher[key as keyof TeacherReq] = fieldsToUpdate[key as keyof TeacherReq]!;
        }
    }
    console.log(teacher)
    await teacher.update();
    res.json(teacher);
}

//PRZENIEŚĆ DO ODDZIELNEJ KLASY APLIKACJI Z METODAMI STATIC
export const assignCourseToTeacher = async (req: Request, res: Response, next: NextFunction) => {

    const teacher = await TeacherRecord.getOne(req.params.id);
    if (!teacher) throw new ValidationError('Cannot find teacher');
    const {selectedCourseId} = req.body
    if (selectedCourseId === '' || !selectedCourseId) {
        throw new ValidationError('No course to assign.')
    }
    const course = await CourseRecord.getOne(selectedCourseId)
    if (!course) {
        throw new ValidationError('Course you want to assign does not exist.')
    }

    if (course.teacher_id === null) {
        await teacher.assignCourseToTeacher(selectedCourseId)
        } else {
            throw new ValidationError('The course has already assigned teacher .')
        }
        res.end();

}
export const removeCourseFromTeacher = async (req: Request, res: Response, next: NextFunction) => {
      const teacher = await TeacherRecord.getOne(req.params.id)
      if (!teacher) {
          throw new ValidationError("No such teacher.")
      }
    const {selectedCourseId} = req.body
    if (selectedCourseId === '' || !selectedCourseId) {
        throw new ValidationError('No course to remove.')
    }
    const course = await CourseRecord.getOne(selectedCourseId)
    if (!course) {
        throw new ValidationError('Course you want to remove does not exist.')
    }
    if (course.teacher_id !== null) {
        await teacher.removeCourseFromTeacher(selectedCourseId)
    }
    res.end()

}

export const deleteTeacher = async (req: Request, res: Response, next: NextFunction) => {
    const teacher = await TeacherRecord.getOne(req.params.id);
    if(!teacher) {
        throw new ValidationError('No such teacher.');
    }
    await teacher.delete();
    res.end();
}


