import {createContext, useCallback, useEffect, useState} from 'react';
import {SingleStudentRes, StudentDataNameAndEmail, StudentEntity} from "../types/student";
import {CourseEntity} from "../types/course";
import axios from "axios";
import {STUDENT_URL} from "../utils/url";


const defaultValue = {
    courses: [],
    students: [],
    updateStudent: ()=> {},
    getStudentsByGroup: () => {}


}
export const AppContext = createContext(defaultValue);

export const AppProvider = ({children}) => {
    const [students, setStudents ] = useState<StudentEntity[] | []>([])
    const [courses, setCourses] = useState<CourseEntity[]>([])

    useEffect(()=> {

    })


    const getStudentsByGroup = useCallback( async (courseId) => {
        try {
            const results= await axios.get(`${STUDENT_URL}/course/${courseId}`);
            return results.data.students as SingleStudentRes[]
        } catch (e) {
            console.log(e)
        }
    }, [])

    const updateStudent = useCallback(async (studentId:string, student: StudentDataNameAndEmail, selectedCourses: string[]) => {

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


    // Aktualizacja kontekstu po zmianie students
    useEffect(() => {


    }, []);

    return (
        <AppContext.Provider
            value={{
                students,
                courses,
                getStudentsByGroup,
                updateStudent,
            }}
        >

            {children}
        </AppContext.Provider>

    )
}