import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { useError } from "../providers/ErrorProvider";
import axios, { AxiosRequestConfig } from "axios";
import { TeacherEntity } from "../types/teacher";
import { StudentEntity } from "../types/student";
import { AdminEntity } from "../types/admin";
import {AUTH_URL, STUDENT_URL} from "../config/api";


type User = TeacherEntity | StudentEntity | AdminEntity

interface AuthContextType {
    user: User | null;
    signIn: (email: string, password: string) => Promise<object>
    signOut: ()=> Promise<void>;
    register:(email: string, password: string, confirmEmail: string)=> Promise<object>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface Props {
    children: ReactNode;
}

export const AuthProvider = ({ children }: Props) => {
    const [user, setUser] = useState<User>(null);
    const { dispatchError } = useError();

    useEffect(() => {


        const token = localStorage.getItem('token')
        if (token) {
            (async () => {
                try {
                    const response = await axios.get(`${AUTH_URL}/me`, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    } as AxiosRequestConfig)
                    setUser(response.data);
                } catch (err) {
                    console.log('Error:', err);
                }
            })()
        }
    }, [])

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
            console.log(err.message)
            if (err.message === 'Request failed with status code 500') {
                dispatchError('Sorry, something went wrong. Try again later.')
            }
            if ( err.message === 'Network Error' ) {
                dispatchError ('Cannot connect to server. Try again later.')
            }
            if (err.message === 'Request failed with status code 401') {
                dispatchError('Invalid email or password')
            }
            else {
                dispatchError('Cannot connect to server. Try again later.')
            }
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


    const register = async (email: string, password: string):Promise<object> => {
        //  try {
        //     const res = await axios.post(`${AUTH_URL}/register`, {
        //         email, password
        //     } ,{
        //         headers: {
        //             'Content-Type': 'application/json',
        //         }
        //     })
        //     console.log('register', res)
        //     return ({success: true})
        // } catch (err) {
        //      if(err.response.status === 400) {
        //          dispatchError(err.response.data.message)
        //      }
        // }
    }

    return <AuthContext.Provider value={{ user, signIn, signOut, register }}>

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


