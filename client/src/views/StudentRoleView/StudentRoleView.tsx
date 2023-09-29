import {MainLayout} from "../../layouts/MainLayout";
import {News} from "../News/News";
import {NotFoundView} from "../NotFoundView/NotFoundView";
import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import {sidebarLinksData} from "./sidebarLinksData";
import {Home} from "./Home";
import {StudentAccount} from "../../components/StudentAccount/StudentAccount";

export const StudentRoleView = () => {
    return (
        <Router>
            <MainLayout data={sidebarLinksData}>
                <Routes>
                    <Route exact path='/' element={<Navigate to={'/student/news'} />} />
                    <Route path='/student' element={<Home/>}/>
                    <Route path='/student/my-account' element={<StudentAccount/>}/>
                    <Route path="/student/news" element={<News />} />
                    <Route path="*" element={<NotFoundView />} />
                </Routes>
            </MainLayout>
        </Router>

    )
}