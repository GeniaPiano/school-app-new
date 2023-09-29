import {MainLayout} from "../../layouts/MainLayout";
import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom"
import {CoursesView} from "./CourseView/CoursesView";
import {StudentsView} from "../StudentsView/StudentsView";
import {TeachersView} from "./TeachersView/TeachersView";
import {News} from "../News/News";
import {NotFoundView} from "../NotFoundView";
import {sidebarLinksData} from "./sidebarLinksData";

export const AdminRoleView = () => {
    return (

        <Router>
         <MainLayout data={sidebarLinksData}>
                <Routes>
                     <Route exact path='/' element={<Navigate to={'/courses'} />} />
                     <Route exact path='/courses/:courseId?' element={<CoursesView />} />
                     <Route exact path='/students' element={<StudentsView/>} />
                     <Route exact path='/teachers' element={<TeachersView/>} />
                     <Route exact path='/news' element={<News/>} />s
                    <Route path='*' element={<NotFoundView/>} />
                 </Routes>
         </MainLayout>
         </Router>
    )
}
