import axios from 'axios';
import {useCallback} from "react";
import {STUDENT_URL} from "../utils/url";
import {SingleStudentRes, StudentDataNameAndEmail} from "../types/student";
import {CourseEntity} from "../types/course";
import {InitialStudentState} from "../components/StudentForm/initialState";

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



    const getStudentsByGroup = useCallback( async (courseId) => {
        try {
            const results= await axios.get(`${STUDENT_URL}/course/${courseId}`);
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


    const updateStudentCourses = useCallback(async (studentId:string, student, selectedCourses: string[]) => {

        try {
            const res = await axios.patch(`${STUDENT_URL}/${studentId}/update`, {
                student,
                selectedCourses,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });
             return { success: true, data: res.data }


        } catch (error) {
            console.error("Error updating student courses:", error);
            throw error;
        }
    }, []);


    return {
        getStudentsByGroup,
        getStudentById,
        updateStudentCourses
    }

}
