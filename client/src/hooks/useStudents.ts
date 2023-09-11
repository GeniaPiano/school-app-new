import axios from 'axios';
import {useCallback} from "react";
import {STUDENT_URL} from "../utils/url";
import {SingleStudentRes, StudentBasicData} from "../types/student";

import {useCounter} from "../provider/CounterPovider";

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

    const getAllStudents = useCallback(async() =>{
        try {
            const results = await axios.get(`${STUDENT_URL}`);
            return results.data.students

            
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

    const addNewStudent = ({student, selectedCourses}) => {
        try {
            const res = axios.post(STUDENT_URL, {
                student,
                selectedCourses,
            })
        } catch (err) {
            console.log(err)
        }

    }

    const updateStudent = useCallback(async (studentId:string, student, selectedCourses: string[]) => {

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


    return {
        getStudentsByGroup,
        getStudentById,
        updateStudentCourses: updateStudent,
        getAllStudents,
        deleteStudent,
        deleteCourseFromStudent,
        addNewStudent,

    }

}
