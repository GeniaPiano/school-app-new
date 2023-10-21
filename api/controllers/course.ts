import {CourseRecord} from "../records/course.record";
import {NextFunction, Request, Response} from "express";
import {ValidationError} from "../utils/errors";
import {CreateCourseReq, TeacherEntity} from "../types";
import {TeacherRecord} from "../records/teacher.record";
import {RateCourseRecord} from "../records/rateCourse.record";

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

export const getCoursesWithAllDetails = async (req: Request, res: Response, next: NextFunction) => {
    const courses = await CourseRecord.listAll();
    const coursesWithDetails = await Promise.all(courses.map(async course => {
        const rates = await RateCourseRecord.listAllForOneCourse(course.id)
        const countStudents = await course.countStudents();
        const teacherName = course.teacher_id !== null
            ?`${(await TeacherRecord.getOne(course.teacher_id)).name} ${(await TeacherRecord.getOne(course.teacher_id)).last_name}`
            : null;

        return {
            ...course,
            teacherName,
            countStudents,
            rates,
        }
    }))
    res.json({
        courses: coursesWithDetails,
    })
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
    res.json({
        course,
        countStudents,
        teacher,
    })
}


export const updateCourse = async (req: Request, res: Response, next: NextFunction) => {
        const course = await CourseRecord.getOne(req.params.courseId);
        if (course === null) {
            throw new ValidationError('The course with given ID does not exist.');
        }
        const { name, teacher_id, description, price, photoUrl } = req.body;

        if (name) {
            course.name = name;
        }
        course.teacher_id = teacher_id === null ? null : teacher_id;
        course.description = description === '' ? null : description;
        course.price = price;
        course.photoUrl = photoUrl;

        console.log(req.body)
        await course.update();
        res.json(course);
     }

export const createCourse = async (req: Request, res: Response, next: NextFunction)  => {
        const { name, teacher_id, description, price, photoUrl} = req.body as CreateCourseReq;
        const newCourse = new CourseRecord({
            name,
            price,
            teacher_id: teacher_id  ? null : teacher_id,
            description: description ? null : description,
            photoUrl: photoUrl ? 'https://www.datocms-assets.com/107048/1697483793-dance-studio.png' : photoUrl,
        });

        await newCourse.insert();
        console.log(newCourse)
        if (newCourse.teacher_id !== null) {
            await newCourse._updateRelationCoursesTeachers(newCourse.teacher_id)        }

        res.status(200).json(newCourse);
}

export const deleteCourse = async (req: Request, res: Response, next: NextFunction) => {
    const course = await CourseRecord.getOne(req.params.id);
    if(!course) {
        throw new ValidationError('No such course.');
    }
    //@todo wykasować z bazy danych zależności z courses_teacher

    if(await course.countStudents() > 0 ) {
        throw new ValidationError('Cannot remove course. ')
    }
    await course.delete();
    res.json({message: "ok"})
}

