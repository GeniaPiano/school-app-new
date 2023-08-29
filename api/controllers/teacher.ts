import * as bcrypt from 'bcryptjs';
import {NextFunction, Request, Response} from "express";
import {TeacherRecord} from "../records/teacher.record";
import {GetSingleTeacherRes, TeacherEntity, TeacherReq, TeacherReqSelectedCourses, TeacherUpdateReq} from "../types";
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
    if (!teacher) {
        res.status(404).json({message: 'Teacher not found.'})
    }
    const teacherCleaned = userWithoutPassword(teacher)
    const selectedCourses = await TeacherRecord._getCoursesOfThisTeacher(req.params.id)
    res.json({
        teacher: teacherCleaned,
        selectedCourses,
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
        return res.status(400).json({
            message : "Email already exists."
        })

    }

    //miejsce na wysłanie hasła na maila użytkownika

    await teacher.insert();

    if (selectedCourses.length > 0)
        for (const id of selectedCourses) {
            await teacher.assignCourseToTeacher(id)
        }
    const courses = await TeacherRecord._getCoursesOfThisTeacher(teacher.id)
    console.log('courses', courses)


    res.json({
        teacher: userWithoutPassword(teacher),
        selectedCourses: courses,
    });

}

export const updateTeacher = async (req: Request, res: Response, next: NextFunction) => {
    const teacher = await TeacherRecord.getOne(req.params.id);
    if (teacher === null) {
        return res.status(404).json({message: 'The teacher with given ID does not exist.'});
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
        return res.status(404).json({message: "Cannot find teacher"})
    }

    const {selectedCourseId} = req.body
    if (selectedCourseId === '' || !selectedCourseId) {
        return res.status(404).json({message: 'No course to assign.' })
    }

    const course = await CourseRecord.getOne(selectedCourseId)
    if (!course) {
       return  res.status(404).json({message: 'Course you want to assign does not exist.'})

    }

    if (course.teacher_id === null) {
        await teacher.assignCourseToTeacher(selectedCourseId)
        } else {
            return  res.status(400).json({message: 'The course has already assigned teacher .'})
          }
        res.end();

}
export const removeCourseFromTeacher = async (req: Request, res: Response, next: NextFunction) => {
      const teacher = await TeacherRecord.getOne(req.params.id)
      if (!teacher) {
          return res.status(404).json({message: 'Teacher not found.'})

      }
    const {selectedCourseId} = req.body
    if (selectedCourseId === '' || !selectedCourseId) {
        return res.status(400).json({message:'No course to remove'})

    }
    const course = await CourseRecord.getOne(selectedCourseId)
    if (!course) {
        return res.status(400).json({message:'Course you want to remove does not exist.'})
    }
    if (course.teacher_id !== null) {
        await teacher.removeCourseFromTeacher(selectedCourseId)
    }
    res.end()

}

export const deleteTeacher = async (req: Request, res: Response, next: NextFunction) => {
    const teacher = await TeacherRecord.getOne(req.params.id);
    if(!teacher) {
        return res.status(404).json({message: 'No such teacher.'});
    }
    await teacher.delete();
    res.end();
}


