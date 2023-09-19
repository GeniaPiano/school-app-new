import {AdminLayout} from "../../layouts/AdminLayout";
import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom"
import {CoursesView} from "../CourseView/CoursesView";
import {StudentsView} from "../StudentsView/StudentsView";
import {TeachersView} from "../TeachersView/TeachersView";
import {News} from "../News/News";
import {NotFoundView} from "../NotFoundView";

export const AdminView = () => {
    return (

        <Router>
         <AdminLayout>
                <Routes>
                     <Route exact path='/' element={<Navigate to={'/courses'} />} />
                     <Route exact path='/courses/:courseId?' element={<CoursesView />} />
                     <Route exact path='/students' element={<StudentsView/>} />
                     <Route exact path='/teachers' element={<TeachersView/>} />
                     <Route exact path='/news' element={<News/>} />
                     <Route path='/logout' />
                    <Route path='*' element={<NotFoundView/>} />
                 </Routes>
         </AdminLayout>
         </Router>
    )
}
