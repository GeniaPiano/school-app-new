import {SingleStudentRes} from "../../types/student";
// import {List} from "@chakra-ui/react";
// import {ViewWrapper} from "../common/ViewWrapper";
// import {StudentsListAllItem} from "./StudentsListAllItem";
import {StudentsList} from "../students/StudentsList";



export const ListAllStudents = (props: SingleStudentRes[])=> {
       return    <StudentsList/> }

       // (
        // <List>
        //    <ViewWrapper> {
        //         students !== 0 && (
        //             students.map(student => (
        //                 <StudentsListAllItem key={student.student.id} student={student}/>
        //             ))
        //         )
        //     } </ViewWrapper>
        // </List>
    // )
