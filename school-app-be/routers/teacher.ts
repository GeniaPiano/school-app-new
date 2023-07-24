import {Router} from 'express';
import {ValidationError} from "../utils/errors";
import {GetSingleTeacherRes, TeacherUpdateReq} from "../types";
import {TeacherRecord} from "../records/teacher.record";
import {getListOfUsersMails} from "../utils/listOfMails";


export const teacherRouter = Router();

teacherRouter
    .get('/', async (req, res) => {
        const teachers: TeacherRecord[] = await TeacherRecord.listAll();
        res.json( {
            teachers,
        });
    })

    .get('/test', async (req, res) => {

        const listOfMails = await getListOfUsersMails();
        const data = listOfMails.filter((mail) => mail === 'francuski');
        if (data.length !== 0) {
            throw new ValidationError('Email already exists. ')
        }



        res.end();

    })

    .get('/:id', async (req, res) => {
        const teacher = await TeacherRecord.getOne(req.params.id);
        if (!teacher) throw new ValidationError('Teacher not found.');
        const selectedCourses = await TeacherRecord._getCoursesOfThisTeacher(req.params.id)
        res.json({
            teacher,
            selectedCourses,
        } as GetSingleTeacherRes)
    })

    .patch('/:id', async (req, res) => {

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
    })


    .post('/', async (req, res) => {
        const newTeacher = new TeacherRecord(req.body);
        const listOfMails = await getListOfUsersMails();
        const data = listOfMails.filter((mail) => mail === newTeacher.email);
        if (data.length !== 0) {
            throw new ValidationError('Email already exists. ')
        }

        await newTeacher.insert(req.body.email);
        res.json(newTeacher);
    })


    .delete('/:id', async (req, res) => {
        const teacher = await TeacherRecord.getOne(req.params.id);
        if(!teacher) {
            throw new ValidationError('No such course.');
        }
        await teacher.delete();
        res.end();

    })


