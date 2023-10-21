import {NextFunction, Request, Response} from "express";
import {RateCourseRecord} from "../records/rateCourse.record";
import {StudentRecord} from "../records/student.record";

export const getRatesForCourse = async(req: Request, res: Response, next: NextFunction) => {
    const {id} = req.params
    const rates = await RateCourseRecord.listAllForOneCourse(id)
    const ratesWithAuthorNameAndAverage = await Promise.all(
        rates.map(async (rate) => {
            const author = await StudentRecord.getOne(rate.student_id);
            return {
                ...rate,
                authorName: author.name
            };
        })
    );
   res.json({rates: ratesWithAuthorNameAndAverage})
}