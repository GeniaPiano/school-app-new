import axios from 'axios';
import {useCallback} from "react";
import {STUDENT_URL} from "../utils/url";
import {SingleStudentRes} from "../types/student";


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
            console.log('get student by id',results)
        } catch (e) {
            console.log(e)
        }
    },[])

    return {
        getStudentsByGroup,
        getStudentById
    }

}

