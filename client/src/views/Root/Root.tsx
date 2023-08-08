import {BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import {AdminLayout} from "../../layouts/AdminLayout/AdminLayout";
import {Dashboard} from "../Dashboard/Dashboard";
import {NotFoundView} from "../NotFoundView";


export const Root =()=> {

    return (
        <Router>
        <AdminLayout>

                <Routes>
                    <Route path='/' element={<Dashboard/>} />
                    <Route path='*' element={<NotFoundView/>} />
                </Routes>

        </AdminLayout>
        </Router>

    )
}

