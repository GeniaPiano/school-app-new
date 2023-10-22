import {useParams} from 'react-router-dom'
import {StudentsList} from "../../../components/students/StudentsList";

export const StudentListOneCourse = ({courseName}: string) => {

    const {courseId} = useParams();


    return (
        <>
           <StudentsList courseId={courseId} courseName={courseName} mainList={false}/>
        </>
    )
}