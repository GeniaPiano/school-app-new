import {Router} from 'express';
import {ValidationError} from "../utils/errors";
import {DataCoursesResForSingleStudent, GetSingleStudentRes, StudentReq,} from "../types";
import {StudentRecord} from "../records/student.record";
import {getListOfUsersMails} from "../utils/listOfMails";

export const studentRouter = Router();

studentRouter
    .get('/', async (req, res) => {
        const students: StudentRecord[] = await StudentRecord.listAll();
        res.json( {
            students,
        });
    })

    .get('/:id', async (req, res) => {
        const student = await StudentRecord.getOne(req.params.id);
        if (!student) throw new ValidationError('Student not found.');

        const selectedCourses = await StudentRecord._getSelectedCoursesByStudent(req.params.id)

        res.json({
            student,
            selectedCourses,
        } as  GetSingleStudentRes)
     })

    //DODANIE KURSÓW DO STUDENTA
    .post('/:id/add-course', async (req, res) => {
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
    })

    //USUWANIE PRZYPISANEGO KURSU
    .delete('/:id/remove-course', async (req, res) => {
        const student = await StudentRecord.getOne(req.params.id);
        if (!student) {
            throw new ValidationError('Cannot find student.')
        }

        if (req.body.course_id) {
            await student.removeFromSelected(req.body.course_id)
        } else throw new ValidationError("No courses to delete.")


        res.end();
    })



    .patch('/:id', async (req, res) => {

        const student = await StudentRecord.getOne(req.params.id);
        if (student === null) {
            throw new ValidationError('Student with given ID does not exist.');
        }

        const { name, last_name, email, password} = req.body;
        const fieldsToUpdate: Partial<StudentReq> = { name, last_name, email, password };


        for (const key in fieldsToUpdate) {
            if (fieldsToUpdate[key as keyof StudentReq]) {
                student[key as keyof StudentReq] = fieldsToUpdate[key as keyof StudentReq]!;
            }
        }

        await student.update();
        res.json(student);
    })

    .post('/', async (req, res) => {
        const newStudent = new StudentRecord(req.body);
        const listOfMails = await getListOfUsersMails();
        const data = listOfMails.filter((mail) => mail === newStudent.email);
        if (data.length !== 0) {
            throw new ValidationError('Email already exists. ')
        }

        await newStudent.insert();
        const selectedCourses = req.body.selectedCourses as  DataCoursesResForSingleStudent[];


        if(selectedCourses.length !== 0) {
            for (const course of selectedCourses) {
                await newStudent.insertCourseForStudent(String(course))
            }
        }

        res.json (
            {
                student: newStudent,
                selectedCourses,
            }
        )
    })


    .delete('/:id', async (req, res) => {
        const student = await StudentRecord.getOne(req.params.id);
        if(!student) {
            throw new ValidationError('No such course.');
        }
        await student.delete(req.params.id);
              res.end();

    })


