import {useCallback} from "react";
import axios from "axios";
import {COURSE_URL} from "../utils/url";
import {CourseEntity} from "../types/course";
import {GetSingleCourseRes} from "../types/course"

export const useCourses = () => {

    const getAllCourses = (useCallback( async () => {
        try {
            const results = await axios.get(COURSE_URL);
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

    interface AddCourseRes {
        success: true,
        data: CourseEntity,
    }

    const addCourse = async(name: string, teacher_id: string) => {
        if (name === '' || name.length < 4 || name.length > 40) {
            console.log('Invalid given data. Name should be from 4 to 40 chars.')
            return;
       }
        try {
            const res = await axios.post(COURSE_URL, {
                name,
                teacher_id,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            return { success: true, data: res.data as CourseEntity } as AddCourseRes


        } catch (error) {
            console.error("Error posting new courses:", error);
            throw error;
        }
    }

    const updateCourse = async (courseId: string | null, name: string, teacher_id: string | null) => {
        if (courseId !== null) {
            try {
                const res = await axios.patch(`${COURSE_URL}/${courseId}`, {
                    name,
                    teacher_id,
                }, {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                })
                return {success: true}
            } catch (err) {
                console.log(err)
            }
        }

    }

    const deleteCourse = async (courseId: string) => {
        try {
            const res = await axios.delete(`${COURSE_URL}/${courseId}`)
            return {success: true, data: res.data}
        } catch(err) {
            console.log(err)
        }
    }

return {
    getAllCourses,
    getCourseById,
    addCourse,
    updateCourse,
    deleteCourse,
}

}