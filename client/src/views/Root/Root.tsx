
import {useAuth} from "../../hooks/useAuth";
import {AdminView} from "../AdminView/AdminView";

import {Login} from "../Unauthorized/Login";
import {Register} from "../Unauthorized/Register";
import {useState} from "react";

export const Root = () => {
    const {user} = useAuth();
    const [isRegister, setIsRegister] = useState<boolean>(false)
    const toggleRegister = () => setIsRegister(!isRegister)

    return (
             <>
                 {user ? <AdminView/> : ( isRegister
                     ? <Register  toggleRegister={toggleRegister}  />
                     : <Login toggleRegister={toggleRegister}  />
                 )}
             </>
    )
}

