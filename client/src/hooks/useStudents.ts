import axios from 'axios';
import {useCallback} from "react";
import {STUDENT_URL} from "../../config/api";
import {SingleStudentRes, StudentBasicData, StudentEntity} from "../types/student";

import {useCounter} from "../providers/CounterPovider";
import {CourseEntity} from "../types/course";
import {validateUserBasicData} from "../utils/validateBasicData";


//const studentApi = axios.create({})
// studentApi.interceptors.request.use( (config) => {
//     const token = localStorage.getItem('token')
//     if(token) {
//         config.headers.authorization = `Bearer ${token}`
//     }
//     return config;
// }, function (error) {
//     return Promise.reject(error);
// });

export const useStudents = () => {

    const {incrementStudentCounter} = useCounter()

    const getStudentsByGroup = useCallback( async (courseId) => {
        try {
            const results = await axios.get(`${STUDENT_URL}/course/${courseId}`);
            return results.data.students as SingleStudentRes[]

        } catch (e) {
            console.log(e)
        }
    }, [])


    const getStudentById = useCallback( async (id) => {
        try {
            const results = await axios.get(`${STUDENT_URL}/${id}`);
            return results.data as SingleStudentRes

        } catch (e) {
            console.log(e)
        }
    },[])

    const addStudent = async(student: StudentBasicData, selectedCourses: CourseEntity[]) => {
        validateUserBasicData(student)
        try {
            const res = await axios.post(STUDENT_URL, {
                student,
                selectedCourses: selectedCourses.length !== 0 ?  selectedCourses.map(one => one.id) : []
            } ,{
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            return { success: true, data: res.data }

        } catch (err) {
            if (err.response.status === 400) {
                console.log('Error:', err.response.data.message);
            } else {
                console.log('Unexpected Error:', err.response.data);
            }
            throw err;
        }

    }

    const updateStudent = useCallback(async (studentId:string, student: StudentBasicData, selectedCourses: string[]) => {
        validateUserBasicData(student)
        try {
            const res = await axios.patch(`${STUDENT_URL}/${studentId}/update`, {
                student,
                selectedCourses,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });
             incrementStudentCounter();
             return { success: true, data: res.data }

        } catch (error) {
            console.error("Error updating student courses:", error);
            throw error;
        }
    }, []);

    const deleteStudent = async(id:string) => {
        try {
            const res = await axios.delete(`${STUDENT_URL}/${id}`)
            return res.status
        } catch (err) {
            console.log(err)
        }
    }

    const deleteCourseFromStudent = async(student_id: string, course_id) => {
        try {
            const res = await axios.patch(`${STUDENT_URL}/${student_id}/remove-one-course`, {
                course_id,
            })
            return res.status
        } catch (err) {
            console.log(err)
        }
    }

    const getSearchStudents = async (phrase: string) => {
        try {
            const res = await axios.get(`${STUDENT_URL}/search/${phrase}`)
            return res.data.students as StudentEntity[] | []
        } catch (err) {
            console.log(err)
        }
    }
    const getAllStudents = async (phrase: string) => {
        try {
            const res = await axios.get(`${STUDENT_URL}/search/${phrase}`)
            return res.data.students
        } catch (err) {
            console.log(err)
        }
    }


    return {
        getStudentsByGroup,
        getStudentById,
        updateStudentCourses: updateStudent,
        getAllStudents,
        deleteStudent,
        deleteCourseFromStudent,
        addStudent,
        getSearchStudents,

    }

}
