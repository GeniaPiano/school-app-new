
import {useCourses} from "./useCourses";
import {useEffect, useState} from "react";
import {CourseEntity, CourseWithStartedDate} from "../types/course";

const initialState = {
    coursesAvailable: [],
    coursesChosen: [],
}

type Courses = {
    coursesAvailable: CourseEntity[];
    coursesChosen: CourseWithStartedDate[];
}

export const useCoursesForOneStudent = (userId) => {
    const { getCoursesForStudent } = useCourses();
    const [courses, setCourses] = useState<Courses>(initialState);

    useEffect(() => {
        (async () => {
            if (userId) {
                const res = await getCoursesForStudent(userId);
                setCourses(res);
                 }
        })();
    }, [getCoursesForStudent, userId]);

    return {
        courses
    };
};
