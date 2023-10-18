import {useAuth} from "../../hooks/useAuth";
import {useNavigate} from "react-router-dom";

import {AdminOrTeacherInfoHeader} from "./AdminOrTeacherInfoHeader";
import {StudentInfoHeader} from "./StudentInfoHeader";

export const UserInfoHeader = () => {

    const {user, signOut} = useAuth();
    const navigate = useNavigate();
    const handleSignOut = async() => {
        await signOut();
        navigate('/');
    }


    let viewToDisplay;
    switch (user?.role) {
        case "admin":
            viewToDisplay = <AdminOrTeacherInfoHeader handleSignOut={handleSignOut}/>;
            break;
        case "student":
            viewToDisplay = <StudentInfoHeader handleSignOut={handleSignOut}/>;
            break;
        case "teacher":
            viewToDisplay = <AdminOrTeacherInfoHeader handleSignOut={handleSignOut}/>;
            break;
        default:
            viewToDisplay = null;
    }

    return viewToDisplay;

}