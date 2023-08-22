import {useCallback} from "react";
import axios from "axios";
import {COURSE_URL} from "../utils/url";
import {CourseEntity} from "../types/course";
import {GetSingleCourseRes} from "../types/course"

export const useCourses = () => {

    const getAllCourses = (useCallback( async () => {
        try {
            const results = await axios.get(`${COURSE_URL}`);
            return results.data.coursesList as CourseEntity[]
        } catch (e) {
            console.log(e)
        }
    }, []))

    const getCourseById = (useCallback( async (courseId: string):Promise<GetSingleCourseRes> => {
        try {
            const results = await axios.get(`${COURSE_URL}/${courseId}`);
            return results.data as GetSingleCourseRes;
        } catch (e) {
            console.log(e)
        }
    }, []))


return {
    getAllCourses,
    getCourseById,
}

}