import {MainLayout} from "../../layouts/MainLayout";
import {News} from "../News/News";
import {NotFoundView} from "../NotFoundView/NotFoundView";
import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import {sidebarLinksData} from "./sidebarLinksData";
import {StudentAccountView} from "./StudentAccountView";
import {StudentInfoView} from "./StudentInfoView";
import {StudentCoursesView} from "./StudentCoursesView";


export const StudentRoleView = () => {
    return (
        <Router>
            <MainLayout data={sidebarLinksData}>
                <Routes>
                    <Route exact path='/' element={<Navigate to={'/student/courses'} />} />
                    <Route path='/student/courses' element={<StudentCoursesView/>}/>
                    <Route path='/student/my-account' element={<StudentAccountView/>}/>
                    <Route path="/student/news" element={<News />} />
                    <Route path="/student/info" element={<StudentInfoView />} />
                    <Route path="*" element={<NotFoundView />} />
                </Routes>
            </MainLayout>
        </Router>

    )
}