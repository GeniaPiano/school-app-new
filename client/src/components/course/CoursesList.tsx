import React, {useContext} from 'react';
import {DataContext} from "../../providers/DataProvider";
import {Spinner} from "../Common/Spinner/Spinner";
import {Link} from "react-router-dom";


export const CoursesList = () => {

    const {coursesData} = useContext(DataContext);
    if (coursesData === null) {
        return <Spinner/>
    }

    const courses = coursesData.map(course => (
        <li key={course.id}>
            <h3>
                {course.name}
                <Link to={`/course/${course.id}`}> <small> see details </small> </Link>
            </h3>
        </li>
    ))

    return (
        <ul>
            {courses}
        </ul>
    )
}