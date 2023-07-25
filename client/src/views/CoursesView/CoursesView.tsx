import React, {useContext} from 'react';
import {DataContext} from "../../providers/DataProvider";
import {CourseEntity} from "types";


export const CoursesView = () => {

    const {coursesList} = useContext(DataContext);




    return (
        <div>
            <h2>Courses</h2>
            {coursesList !== null ? (
                <ul>
                    {coursesList.map((course: CourseEntity) => (
                        <li key={course.id}>
                            {course.name}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No courses available.</p>
            )}


        </div>
    )
}