import {MainLayout} from "../../layouts/MainLayout";
import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom"
import {StudentsView} from "./StudentsView/StudentsView";
import {TeachersView} from "./TeachersView/TeachersView";
import {NotFoundView} from "../NotFoundView/NotFoundView";
import {sidebarLinksData} from "./sidebarLinksData";
import {StudentsOneCourseView} from "./StudentsOneCourseView/StudentsOneCourseView";

export const AdminRoleView = () => {
    return (

        <Router>
         <MainLayout data={sidebarLinksData}>
                <Routes>
                     <Route exact path='/' element={<Navigate to={'/courses'} />}  />
                     <Route  path='/courses/:courseId' element={<StudentsOneCourseView />} />
                     <Route path='/students' element={<StudentsView/>} />
                     <Route path='/teachers' element={<TeachersView/>} />
                    <Route path='*' element={<NotFoundView/>} />
                 </Routes>
         </MainLayout>
         </Router>
    )
}
