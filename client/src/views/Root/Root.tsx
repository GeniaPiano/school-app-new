import {LoginView} from "../Login/Login";
import {useAuth} from "../../hooks/useAuth";
import {AdminView} from "../AdminView/AdminView";

export const Root = () => {
    const {user} = useAuth();


    return (
             <>
                 {user ? <AdminView/> : <LoginView/>}
             </>


    )
}

