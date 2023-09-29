
import {useAuth} from "../../hooks/useAuth";
import {AdminRoleView} from "../AdminRoleView/AdminRoleView";

import {Login} from "../Unauthorized/Login";
import {Register} from "../Unauthorized/Register";
import {useState} from "react";
import {StudentRoleView} from "../StudentRoleView/StudentRoleView";
import {TeacherRoleView} from "../AdminRoleView/TecaherRoleView/TeahcerRoleView";

export const Root = () => {
    const {user} = useAuth();
    const [isRegister, setIsRegister] = useState<boolean>(false)
    const toggleRegister = () => setIsRegister(!isRegister)

    let viewToDisplay;

    switch (user?.role) {
        case "admin":
            viewToDisplay = <AdminRoleView />;
            break;
        case "student":
            viewToDisplay = <StudentRoleView />;
            break;
        case "teacher":
            viewToDisplay = <TeacherRoleView />;
            break;
        default:
            viewToDisplay = null;
    }


    return (
             <>
                 {user ? viewToDisplay : ( isRegister
                     ? <Register  toggleRegister={toggleRegister}  />
                     : <Login toggleRegister={toggleRegister}  />
                 )}
             </>
    )
}

