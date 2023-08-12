import {BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import {AdminLayout} from "../../layouts/AdminLayout/AdminLayout";
import {Dashboard} from "../Dashboard/Dashboard";
import {NotFoundView} from "../NotFoundView";
import {News} from "../News/News";



export const Root =()=> {

    return (
        <Router>
        <AdminLayout>

                <Routes>
                    <Route exact path='/' element={<Navigate to='/course' />} />
                    <Route exact path='/course/:courseId?' element={<Dashboard/>} />
                    <Route path='/news' element={<News/>} />
                    <Route path='*' element={<NotFoundView/>} />
                </Routes>


        </AdminLayout>
        </Router>

    )
}

