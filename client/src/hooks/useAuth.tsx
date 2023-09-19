import {createContext, ReactNode, useContext, useEffect, useState} from "react";
import {useError} from "../providers/ErrorProvider";
import axios, { AxiosRequestConfig }  from "axios";

const AuthContext = createContext({});

interface Props {
    children: ReactNode;
}
export const AuthProvider = ({children}: Props) => {
    const [user, setUser] = useState(null);
    const { dispatchError } = useError();

    useEffect(() => {
        const token = localStorage.getItem('token')
        if (token) {
            (async ()=> {
                try {
                    const response = await axios.get('/me', {
                        headers: {
                            authorization: `Bearer ${token}`
                        }
                    } as AxiosRequestConfig)
                    setUser(response.data)
                } catch(err) {
                    console.log(err)}
            })()
        }
    }, [])

    const signIn = async({login, password}) => {
        try {
            const response = await axios.post('/login', {
                login,
                password,
            })
            setUser(response.data);
            localStorage.setItem('token', response.data.token)
        } catch(err) {
            dispatchError('Invalid login data.')
        }
    }

    const signOut = () => {
        setUser(null);
        localStorage.removeItem('token')
    }



    return <AuthContext value={{user, signIn, signOut}}>
        {children}
    </AuthContext>
}

export const useAuth = () => {
    const auth = useContext(AuthContext);
    if(!auth) {
        throw Error('useAuth needs to be used inside AuthContext')
    }
    return auth;

}