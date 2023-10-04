import {MainLayout} from "../../layouts/MainLayout";
import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom"
import {CoursesView} from "./CourseView/CoursesView";
import {StudentsView} from "./StudentsView/StudentsView";
import {TeachersView} from "./TeachersView/TeachersView";
import {News} from "../News/News";
import {NotFoundView} from "../NotFoundView/NotFoundView";
import {sidebarLinksData} from "./sidebarLinksData";

export const AdminRoleView = () => {
    return (

        <Router>
         <MainLayout data={sidebarLinksData}>
                <Routes>

                     <Route exact path='/' element={<Navigate to={'/news'} />}  />
                     <Route path='/news' element={<News/>}/>
                     <Route  path='/courses/:courseId?' element={<CoursesView />} />
                     <Route path='/students' element={<StudentsView/>} />
                     <Route path='/teachers' element={<TeachersView/>} />

                    <Route path='*' element={<NotFoundView/>} />
                 </Routes>
         </MainLayout>
         </Router>
    )
}
