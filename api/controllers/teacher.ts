import * as bcrypt from 'bcryptjs';
import {NextFunction, Request, Response} from "express";
import {TeacherRecord} from "../records/teacher.record";
import {GetSingleTeacherRes, TeacherEntity, TeacherReq, TeacherReqSelectedCourses, TeacherUpdateReq} from "../types";
import {checkMailAvaible} from "../utils/checkMailAvailable";
import {generatePassword} from "../utils/generatePassword";
import {CourseRecord} from "../records/course.record";
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

    const {name, last_name } = req.body.teacher as TeacherReq
    const {selectedCourses} = req.body as  TeacherReqSelectedCourses
    const rawPassword = generatePassword(name, last_name);
    const hashedPassword = await bcrypt.hash(rawPassword, 10);

    const teacherData= {
        ...req.body.teacher,
        password: hashedPassword
    } as TeacherRecord

    const teacher = new TeacherRecord(teacherData);
    const checkOkMail = await checkMailAvaible(teacher.email); //sprawdzanie dostępności maila
    if (!checkOkMail) {
        throw new ValidationError("Email already exists.")


    }
    //miejsce na wysłanie hasła na maila użytkownika

    await teacher.insert();

    if (selectedCourses)
        for (const id of selectedCourses) {
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
    if (!teacher) {
        throw new NotFoundError('Canot find teacher')

    }

    const {selectedCourseId} = req.body
    if (selectedCourseId === '' || !selectedCourseId) {
        throw new NotFoundError('No course to assign.')
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
        throw new ValidationError('Teacher not found.')

      }
    const {selectedCourseId} = req.body
    if (selectedCourseId === '' || !selectedCourseId) {
       throw new ValidationError('No course to remove')

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
        throw  new NotFoundError('Teacher not found')
          }
    await teacher.delete();
    res.end();
}


