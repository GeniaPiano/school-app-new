import axios from "axios";
import {TEACHER_ULR} from "../utils/url";
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

    return {
        getAllTeachers,
    }
}