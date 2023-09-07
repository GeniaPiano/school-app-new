import * as bcrypt from 'bcryptjs';
import {NextFunction, Request, Response} from 'express';
import {NotFoundError, ValidationError} from "../utils/errors";
import {
    CleanedStudent,
    GetSingleStudentRes,
    StudentReq,
} from "../types";
import {StudentRecord} from "../records/student.record";
import {generatePassword} from "../utils/generatePassword";
import {checkMailAvailable} from "../utils/checkMailAvailable";
import {userWithoutPassword} from "../utils/dataWithoutPassword";


export const getAllStudents = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const students: StudentRecord[] = await StudentRecord.listAll();
        const studentsWithSelectedCourses = await Promise.all(students.map(async (oneStudent) => {
            const selectedCourses = await StudentRecord._getSelectedCoursesByStudent(oneStudent.id);
            return {
                student: userWithoutPassword(oneStudent),
                selectedCourses,
            };
        }));

       res.json({ students: studentsWithSelectedCourses });



    } catch(err) {
        next(err)
    }
}

export const getOneStudent = async (req: Request, res: Response) => {
        const student = await StudentRecord.getOne(req.params.id);
        if (!student) throw new ValidationError('Student not found.');

        const selectedCourses = await StudentRecord._getSelectedCoursesByStudent(req.params.id)

        res.json({
            student: userWithoutPassword(student),
            selectedCourses,
        } as  GetSingleStudentRes)
}

export const getStudentsByCourseId = async(req: Request, res:Response) => {
    const students = await StudentRecord.getAllStudentsByCourseId(req.params.courseId) as CleanedStudent[]
    const studentsWithSelectedCourses = await Promise.all(students.map(async (student) => {
        const selectedCourses = await StudentRecord._getSelectedCoursesByStudent(student.id);
        return {
            student,
            selectedCourses,
        };
    }));
    res.json({ students: studentsWithSelectedCourses });
}

    export const createStudent = async (req: Request, res: Response) => {
        const { name, last_name } = req.body as StudentReq;
        const rawPassword = generatePassword(name, last_name);
        const hashedPassword = await bcrypt.hash(rawPassword, 10);

        const studentData = {
            ...req.body,
            password: hashedPassword,
        } as StudentRecord;

    const student = new StudentRecord(studentData);
    const checkOkMail = checkMailAvailable(student.email) //sprawdzanie dostępności maila
        if (!checkOkMail) {
        throw new ValidationError('Mail already exists.')
    }

    //miejsce na wysłanie hasła na maila użytkownika
    await student.insert();
    res.json({
            password: rawPassword,
            student: userWithoutPassword(student),
        })
}


export const updateStudent = async (req: Request, res: Response, next: NextFunction ) => {

    const student = await StudentRecord.getOne(req.params.id);
       if (student === null) {
        throw new ValidationError('Student with given ID does not exist.');
    }
    //aktualizacja name, lastName, email
    const { name, last_name, email} = req.body.student;
    const fieldsToUpdate: Partial<StudentReq> = { name, last_name, email };
    for (const key in fieldsToUpdate) {
        if (fieldsToUpdate[key as keyof StudentReq]) {
            student[key as keyof StudentReq] = fieldsToUpdate[key as keyof StudentReq]!;
        }
    }

    await student.updateNameAndEmail();

    //aktua lizacja coursesSelected
    await student.removeAllCourses();
    const {selectedCourses} = req.body;

    if (selectedCourses.length === 0) {
        res.json({
           student: userWithoutPassword(student),
           selectedCourses: StudentRecord._getSelectedCoursesByStudent(student.id),
        })
    }

    else if (selectedCourses.length > 0 ) {
        for (const course of selectedCourses) {
            await student.insertCourseForStudent(course)
        }
    }

    const chosenCourses = await StudentRecord._getSelectedCoursesByStudent(student.id)
    res.json({
        student: userWithoutPassword(student),
        selectedCourses: chosenCourses,
    })
  }


export const deleteStudent = async (req: Request, res: Response, next: NextFunction) => {

    const student = await StudentRecord.getOne(req.params.id);
    if (!student) {
        throw new NotFoundError('Cannot find student.')
    }

    await student.delete(req.params.id)
    res.end();
}

export const removeCourseFromStudent = async (req: Request, res: Response, next: NextFunction) => {
    const student = await StudentRecord.getOne(req.params.id);
    if (!student) {
        throw new NotFoundError('Cannot find student.')
    }

    await student.removeOneCourseFromStudent(req.body.course_id)
    res.end();
}












// export const addCourseToStudent = async (req: Request, res: Response ) => {
//         const student = await StudentRecord.getOne(req.params.id);
//         if (!student) throw new ValidationError('Cannot find student');
//         const courseId: string = req.body.courseId
//         const courseToAdd = await CourseRecord.getOne(courseId)
//         if (!courseToAdd) throw new ValidationError('Course wanted to assign to student not found.')
//         const check = await AlreadyExistsRelations(student.id, courseToAdd.id)
//         if (check) throw new ValidationError('Cannot assign this course to student. Chosen course is already assigned to this student.')
//         await student.insertCourseForStudent(courseToAdd.id);
//
//         res.json({
//             message: "ok"
//         })
// }







