import axios from "axios";
import {COURSE_URL, TEACHER_ULR} from "../utils/url";
import {useCallback} from "react";
import {TeacherEntity} from "../types/teacher";

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

    const addNewTeacher = async (teacher, selectedCourses)=> {
        try {
            const results = await axios.post(`${TEACHER_ULR}`, {
                teacher,
                selectedCourses
            },{
                    headers: {
                        'Content-Type': 'application/json',
                    }
            })
        } catch (err) {
            console.log(err)
        }
    }

    return {
        getAllTeachers,
        getAvailableCourses,
    }
}