import axios from "axios";
import {COURSE_URL, STUDENT_URL, TEACHER_ULR} from "../../config/api";
import {useCallback} from "react";
import {GetSingleTeacherRes, TeacherEntity, TeacherBasicData} from "../types/teacher";
import {CourseEntity} from "../types/course";
import {validateUserBasicData} from "../utils/validateBasicData";


interface TeacherRes {
    success: boolean,
    data: GetSingleTeacherRes;
}

export const useTeachers = () => {

    const getAllTeachers = async(phrase: string) =>{
        try {
            const  results = await axios.get(`${TEACHER_ULR}/search/${phrase}`)
            return results.data.teachers
        } catch (err) {
            console.log(err)
        }
    }

    const getSearchTeachers = async(phrase: string) => {
        try {
            const res = await axios.get(`${TEACHER_ULR}/search/${phrase}`)
            return res.data.teachers as TeacherEntity[] | []
        } catch (err) {
            console.log(err)
        }
    }

    const getOneTeacher = useCallback(async(studentId) => {
        try {
            const results = await axios.get(`${TEACHER_ULR}/${studentId}`)
            return results.data as GetSingleTeacherRes
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

    const updateTeacher = async(teacherId: string, teacher: TeacherBasicData, selectedCourses: CourseEntity[] | [])=> {

        validateUserBasicData(teacher)
        try {
            const response = await axios.patch(`${TEACHER_ULR}/${teacherId}`, {
                teacher,
                selectedCourses,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            return  {success: true, data: response.data as GetSingleTeacherRes } as TeacherRes
        } catch (err) {
            if (err.response.status === 400) {
                console.log('Error:', err.response.data.message);
            } else {
                console.log('Unexpected Error:', err.response.data);
            }
            throw err;
        }
    }

    const addNewTeacher = async (teacher: TeacherBasicData, selectedCourses: CourseEntity[] | null)=> {
        validateUserBasicData(teacher)

        try {
            const response = await axios.post(`${TEACHER_ULR}`, {
                teacher,
                selectedCourses,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                }
            })

            return  {success: true, data: response.data as GetSingleTeacherRes} as TeacherRes

        } catch (err) {
            if (err.response.status === 400) {
                console.log('Error:', err.response.data.message);
            } else {
                console.log('Unexpected Error:', err.response.data);
            }
            throw err;
        }
    }


    const deleteTeacher = async (teacherId: string) => {
        try {
            const res = await axios.delete(`${TEACHER_ULR}/${teacherId}`)
            return res.status
        } catch (err)  {
            console.log(err)
        }
    }

    return {
        getAllTeachers,
        getOneTeacher,
        getAvailableCourses,
        addNewTeacher,
        deleteTeacher,
        updateTeacher,
        getSearchTeachers,
    }
}