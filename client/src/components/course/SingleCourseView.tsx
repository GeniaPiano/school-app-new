import React, {useEffect, useState} from 'react';
import {GetSingleCourseRes} from "types";
import {useParams} from "react-router-dom";
import {Spinner} from "../Common/Spinner/Spinner";

export const SingleCourseView =()=> {

    const [courseData, setCourseData] = useState<GetSingleCourseRes | null>(null);

    const {courseId} = useParams();
    console.log(courseId)
    const fetchSingleCourse = async () => {
        const res = await fetch(`http://localhost:3001/course/${courseId}`);
        const data = await res.json() as GetSingleCourseRes;
        setCourseData(data);

    }

    useEffect(()=> {
        fetchSingleCourse();
    }, [])

    if (!courseData) {
        return <Spinner/>
    }

    return (
        <div>
            <h3>{courseData.course.name}</h3>
            <p>teacher: {courseData.teacherName? courseData.teacherName : "soon you will know the teacher's name"}</p>
            <p>number of students: {courseData.countStudents}</p>


        </div>
    )
}