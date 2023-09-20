import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { useError } from "../providers/ErrorProvider";
import axios, { AxiosRequestConfig } from "axios";
import { TeacherEntity } from "../types/teacher";
import { StudentEntity } from "../types/student";
import { AdminEntity } from "../types/admin";
import {AUTH_URL} from "../utils/url";

type User = null | TeacherEntity | StudentEntity | AdminEntity

const AuthContext = createContext({});

interface Props {
    children: ReactNode;
}

export const AuthProvider = ({ children }: Props) => {
    const [user, setUser] = useState<User>(null);
    const { dispatchError } = useError();
    //
    // useEffect(() => {
    //     const token = localStorage.getItem('token')
    //     if (token) {
    //         (async () => {
    //             try {
    //                 const response = await axios.get(`${AUTH_URL}/me`, {
    //                     headers: {
    //                         Authorization: `Bearer ${token}`
    //                     }
    //                 } as AxiosRequestConfig)
    //                 setUser(response.data);
    //                 console.log(response.data)
    //             } catch (err) {
    //                 console.log('Error:', err);
    //             }
    //         })()
    //     }
    // }, [])

    const signIn = async (email: string, password: string): Promise<object> => {
        try {
            const response = await axios.post(`${AUTH_URL}/login`, {
                email: email,
                password: password,
            });
            setUser(response.data.user);
            localStorage.setItem('token', response.data.token)
            return ({success: true})

        } catch (err) {
            dispatchError('Invalid login data.')
            console.log(err.response.data.message)


        }
    }

    const signOut = async() => {
        try {
            const res = await axios.post(`${AUTH_URL}/logout`)
            if (res.status === 200) {
                setUser(null);
                localStorage.removeItem('token')
            }
        } catch (err) {
            console.log(err)
        }


    }

    return <AuthContext.Provider value={{ user, signIn, signOut }}>
        {children}
    </AuthContext.Provider>
}

export const useAuth = () => {
    const auth = useContext(AuthContext);
    if (!auth) {
        throw Error('useAuth needs to be used inside AuthContext')
    }
    return auth;
}
