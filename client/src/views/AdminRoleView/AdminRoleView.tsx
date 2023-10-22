import {MainLayout} from "../../layouts/MainLayout";
import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom"
import {StudentsView} from "./StudentsView/StudentsView";
import {TeachersView} from "./TeachersView/TeachersView";
import {NotFoundView} from "../NotFoundView/NotFoundView";
import {sidebarLinksData} from "./sidebarLinksData";
import {StudentListOneCourse} from "./StudentListOneCourse/StudentListOneCourse";
import {CoursesView} from "./CourseView/CoursesView";

export const AdminRoleView = () => {
    return (

        <Router>
         <MainLayout data={sidebarLinksData}>
                <Routes>
                     <Route exact path='/' element={<Navigate to={'/courses'} />}  />
                    <Route  path='/courses' element={<CoursesView />} />
                     <Route  path='/courses/:courseId' element={<StudentListOneCourse />} />
                     <Route path='/students' element={<StudentsView/>} />
                     <Route path='/teachers' element={<TeachersView/>} />
                    <Route path='*' element={<NotFoundView/>} />
                 </Routes>
         </MainLayout>
         </Router>
    )
}
