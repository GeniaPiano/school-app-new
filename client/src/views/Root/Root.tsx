import {BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import {AdminLayout} from "../../layouts/AdminLayout";
import {CoursesView} from "../CourseView/CoursesView";
import {NotFoundView} from "../NotFoundView";
import {News} from "../News/News";
import {StudentsView} from "../StudentsView/StudentsView";
import {TeachersView} from "../TeachersView/TeachersView";
import {FormField} from "../../components/FormField/FormField";
import {useState} from "react";


const UnauthenticatedApp = () => {

    const [inputValues, setInputValues] = useState ({
        login: '',
        password: ''
    })
    const [touchCount, setTouchCount] = useState({
        login: 0,
        password: 0,
    })

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setInputValues(prev => ({
            ...prev,
            [name]: value,
        }))
        setTouchCount(prev => ({
            ...prev,
            [e.target.name]: prev[name] + 1
        }))

    }


    const isErrorLogin = touchCount.login > 4 && (inputValues.login.length < 4 || inputValues.login.length > 40 || !inputValues.login.includes('@'))
    const isErrorPassword = touchCount.password > 4 && (inputValues.password.length < 4 || inputValues.login.length > 40)




    return (
        <form>
            <FormField name="login"
                       errorMessage='Login is required and must contain from 4 to 40 characters.'
                       label="Login"
                       value={inputValues.login}
                       type='email'
                       onChange={handleInputChange}
                       error={isErrorLogin}
            />
            <FormField name="password"
                       errorMessage='Password is required must contain from 4 to 40 characters.'
                       label="password"
                       type="password"
                       value={inputValues.password}
                       onChange={handleInputChange}
                       error={isErrorPassword}
            />
        </form>
    )
}


export const Root = () => {
    return (
        <UnauthenticatedApp/>

       // <Router>
       //  <AdminLayout>
       //         <Routes>
       //              <Route exact path='/' element={<Navigate to={'/courses'} />} />
       //              <Route exact path='/courses/:courseId?' element={<CoursesView />} />
       //              <Route exact path='/students' element={<StudentsView/>} />
       //              <Route exact path='/teachers' element={<TeachersView/>} />
       //              <Route exact path='/news' element={<News/>} />
       //              <Route path='/logout' />
       //             <Route path='*' element={<NotFoundView/>} />
       //          </Routes>
       //  </AdminLayout>
       //  </Router>

    )
}

