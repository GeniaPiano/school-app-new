import axios from "axios";
import {COURSE_URL, TEACHER_ULR} from "../utils/url";
import {useCallback} from "react";
import {GetSingleTeacherRes, TeacherEntity, TeacherReq} from "../types/teacher";
import {CourseEntity} from "../types/course";

interface AddTeacherRes {
    succes: boolean,
    data: GetSingleTeacherRes;
}

export const useTeachers = () => {

    const getAllTeachers =  useCallback(async() =>{
        try {
            const  results = await axios.get(TEACHER_ULR)
            return results.data.teachers as TeacherEntity[]
        } catch (err) {
            console.log(err)
        }
    }, [])

    const getAvailableCourses = async()=> {
        try {
            const results = await axios.get(`${COURSE_URL}/courses-without-teacher`)
            return results.data.courses
        } catch (err) {
            console.log(err)
        }
    }



    const addNewTeacher = async (teacher: TeacherReq, selectedCourses: CourseEntity[] | null)=> {

        if (teacher.name === "" || teacher.name.length <2 || teacher.name.length > 40
            || teacher.last_name === "" || teacher.last_name.length < 2 || teacher.last_name.length > 40
            || teacher.email === "" || teacher.email.length < 4 || teacher.email.length > 40 || !teacher.email.includes('@')) {
            return;
        }
        try {
            const response = await axios.post(`${TEACHER_ULR}`, {
                teacher,
                selectedCourses
            }, {
                headers: {
                    'Content-Type': 'application/json',
                }
            })

            return  {success: true, data: response.data as GetSingleTeacherRes} as AddTeacherRes

        } catch (err) {
            if (err.response.status === 400) {
                console.log('Error:', err.response.data.message);
            } else {
                console.log('Unexpected Error:', err.response.data);
            }
            throw err;
        }
    }

    return {
        getAllTeachers,
        getAvailableCourses,
        addNewTeacher
    }
}