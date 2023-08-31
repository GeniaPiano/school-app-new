import {BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import {AdminLayout} from "../../layouts/AdminLayout";
import {CoursesView} from "../CourseView/CoursesView";
import {NotFoundView} from "../NotFoundView";
import {News} from "../News/News";
import {StudentsView} from "../StudentsView/StudentsView";
import {TeachersView} from "../TeachersView/TeachersView";



export const Root =()=> {
    return (
       <Router>
        <AdminLayout>
               <Routes>
                    <Route exact path='/' element={<Navigate to='/courses' />} />
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

