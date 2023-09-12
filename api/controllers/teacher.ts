import * as bcrypt from 'bcryptjs';
import {NextFunction, Request, Response} from "express";
import {TeacherRecord} from "../records/teacher.record";
import {

    GetSingleTeacherRes,
    TeacherEntity,
    TeacherBasicData,
    TeacherReqSelectedCourses,

} from "../types";
import {checkMailAvailable, checkMailAvailableWhenUpdating} from "../utils/checkMailAvailable";
import {generatePassword} from "../utils/generatePassword";
import {userWithoutPassword} from "../utils/dataWithoutPassword";
import {NotFoundError, ValidationError} from "../utils/errors";



export const getAllTeachers = async (req: Request, res: Response, next: NextFunction) => {
    const teachers: TeacherEntity[] = await TeacherRecord.listAll();
    res.json( {
        teachers,
    });
}

export const getOneTeacher = async (req: Request, res: Response, next: NextFunction) => {
    const teacher = await TeacherRecord.getOne(req.params.id) as TeacherEntity;
    if (!teacher) {
        throw new NotFoundError('Teacher not found')
            }
    const teacherCleaned = userWithoutPassword(teacher)
    const selectedCourses = await TeacherRecord._getCoursesOfThisTeacher(req.params.id)

    res.json({
        teacher: teacherCleaned,
        selectedCourses: selectedCourses === null ? [] : selectedCourses
    } as GetSingleTeacherRes)
}

export const createTeacher = async (req: Request, res: Response, next: NextFunction) => {

    const {name, last_name } = req.body.teacher as TeacherBasicData
    const {selectedCourses} = req.body as TeacherReqSelectedCourses
    const rawPassword = generatePassword(name, last_name);
    const hashedPassword = await bcrypt.hash(rawPassword, 10);

    const teacherData= {
        ...req.body.teacher,
        password: hashedPassword
    } as TeacherRecord

    const teacher = new TeacherRecord(teacherData);
    const checkOkMail = await checkMailAvailable(teacher.email); //sprawdzanie dostępności maila
    if (!checkOkMail) {
        throw new ValidationError("Email already exists.")
    }
    //miejsce na wysłanie hasła na maila użytkownika

    await teacher.insert();

    if (selectedCourses)
        for (const oneCourse of selectedCourses) {
            const id = oneCourse.id
            await teacher.assignCourseToTeacher(id)
           }
    const courses = await TeacherRecord._getCoursesOfThisTeacher(teacher.id)

    res.status(200).json({
        teacher: userWithoutPassword(teacher),
        selectedCourses: courses,
    });

}

export const updateTeacher = async (req: Request, res: Response, next: NextFunction) => {
    const teacher = await TeacherRecord.getOne(req.params.id);
    if (teacher === null) {
        throw new NotFoundError( 'Teacher with given ID does not exist.')
    }
    const { name, last_name, email } = req.body.teacher
    const mailOk = await checkMailAvailableWhenUpdating(teacher.email, email);
    if (!mailOk) {
        throw new ValidationError('Given email, already exists in database, give the correct email.')
    }

    teacher.name = name;
    teacher.last_name = last_name;
    teacher.email = email

    await teacher.update();
    await teacher.removeAllCoursesFromTeacher();

    const {selectedCourses} = req.body as TeacherReqSelectedCourses
    if (selectedCourses.length !== 0)
        for (const oneCourse of selectedCourses) {
            const id = oneCourse.id
            await teacher.assignCourseToTeacher(id)
        }

    res.json({
        teacher: userWithoutPassword(teacher),
        selectedCourses: await TeacherRecord._getCoursesOfThisTeacher(teacher.id)
    })
}

export const deleteTeacher = async (req: Request, res: Response, next: NextFunction) => {
    const teacher = await TeacherRecord.getOne(req.params.id);
    if(!teacher) {
        throw  new NotFoundError('Teacher not found')
          }
    await teacher.delete();
    res.end();
}


