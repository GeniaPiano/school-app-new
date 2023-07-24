import {Router} from "express";
import {ValidationError} from "../utils/errors";
import {CourseRecord} from "../records/course.record";
import {CreateCourseReq, GetSingleCourseRes, UpdateCourseReq} from "../types";



export const courseRouter = Router();
courseRouter

    .get('/', async (req, res) => {
        const coursesList: CourseRecord[] = await CourseRecord.listAll();
            res.json( {
            coursesList,
        });
    })

    .get('/:courseId', async (req, res) => {
        const {courseId} = req.params
        const course = await CourseRecord.getOne(courseId);
        if (!course) throw new ValidationError('Course no found.')
        const countStudents = await course.countStudents();
        const teacherName = !course.teacher_id
            ? null
            : await course.getTeacherName(course.teacher_id);

        res.json({
            course,
            countStudents,
            teacherName,
        }
    )

    })

    .patch('/:courseId', async (req, res) => {

        const course = await CourseRecord.getOne(req.params.courseId);
        if (course === null) {
            throw new ValidationError('The course with given ID does not exist.');
        }

        const { name, teacher_id } = req.body
        if (name) {
            course.name = name;
        }
        if (teacher_id) {
            course.teacher_id = teacher_id
        } else {course.teacher_id = null}
        await course.update();
        res.json(course);

    })


    .post('/', async (req, res) => {
        const newCourse = new CourseRecord(req.body as CreateCourseReq);
        const course_id = await newCourse.insert();
        const {teacher_id} = req.body

        if (teacher_id !== null) {
            await newCourse._updateRelationCoursesTeachers(teacher_id, course_id)
        }
        res.json(newCourse);
    })


    .delete('/:id', async (req, res) => {
        const course = await CourseRecord.getOne(req.params.id);
        if(!course) {
            throw new ValidationError('No such course.');
        }
        if(await course.countStudents() > 0 ) {
            throw new ValidationError('Cannot remove course. ')
        }

        await course.delete();
        res.end();

    })


