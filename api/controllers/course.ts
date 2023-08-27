import {CourseRecord} from "../records/course.record";
import {NextFunction, Request, Response} from "express";
import {ValidationError} from "../utils/errors";
import {CreateCourseReq, TeacherEntity} from "../types";
import {TeacherRecord} from "../records/teacher.record";


export const getAllCourses = async (req: Request, res: Response, next: NextFunction) => {
 try {
     const coursesList: CourseRecord[] = await CourseRecord.listAll();
     res.json( {
         coursesList,
     });
   } catch(err) {
     next(err)
 }
}

export const getCoursesWithoutTeachers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const courses: CourseRecord[] = await CourseRecord.listCoursesWithoutChosenTeacher();
        res.json({
            courses,
        })
    } catch (err) {
        next(err)
    }
}

export const getOneCourse = async (req: Request, res: Response, next: NextFunction) => {

    const {courseId} = req.params
    const course = await CourseRecord.getOne(courseId);
    if (!course) throw new ValidationError('Course not found.')
    const countStudents = await course.countStudents();
    const teacher = !course.teacher_id
        ? null
        : await TeacherRecord.getOne(course.teacher_id) as TeacherEntity;
    // const teacherCleaned = userWithoutPassword(teacher)

    res.json({
        course,
        countStudents,
        teacher,
    })
}


export const updateCourse = async (req: Request, res: Response, next: NextFunction) => {

    try {
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
    } catch(err) {
        next(err)
    }

    }

export const createCourse = async (req: Request, res: Response, next: NextFunction)  => {
        const { name, teacher_id} = req.body as CreateCourseReq;
        const newCourse = new CourseRecord({
            name,
            teacher_id: teacher_id === undefined ? null : teacher_id
        });

        await newCourse.insert();

        if (newCourse.teacher_id !== null) {
            await newCourse._updateRelationCoursesTeachers(newCourse.teacher_id)
        }
        res.json(newCourse);
}

export const deleteCourse = async (req: Request, res: Response, next: NextFunction) => {
    const course = await CourseRecord.getOne(req.params.id);
    if(!course) {
        throw new ValidationError('No such course.');
    }
    if(await course.countStudents() > 0 ) {
        throw new ValidationError('Cannot remove course. ')
    }
    await course.delete();
    res.end();
}

