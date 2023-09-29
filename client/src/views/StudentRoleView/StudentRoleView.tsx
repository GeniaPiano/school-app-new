import {MainLayout} from "../../layouts/MainLayout";
import {News} from "../News/News";
import {NotFoundView} from "../NotFoundView";
import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import {sidebarLinksData} from "./sidebarLinksData";

export const StudentRoleView = () => {
    return (


        <Router>
            <MainLayout data={sidebarLinksData}>
                <Routes>
                    <Route exact path='/' element={<Navigate to={'/student/news'} />} />
                    <Route path="/student/news" element={<News />} />
                    <Route path="*" element={<NotFoundView />} />
                </Routes>
            </MainLayout>
        </Router>

    )
}