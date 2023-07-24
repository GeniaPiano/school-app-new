import React from 'react';
import './App.css';

import {Routes, Route} from "react-router-dom";
import {AppHeader} from "./components/AppHeader/AppHeader";
import {NotFoundView} from "./views/NotFoundView";
import {DataProvider} from "./providers/DataProvider";
import {CoursesView} from "./views/CoursesView";
import {StudentList} from "./components/StudentList/StudentList";
import {SingleCourseView} from "./components/course/SingleCourseView";




function App() {
  return (
      <div className='App'>
            <DataProvider>
                <AppHeader/>
                <Routes >
                    <Route path='/course' element={<CoursesView/>}/>
                    <Route path='/course/:courseId' element={<SingleCourseView/>}/>
                    <Route path='/students' element={<StudentList/>}/>
                    <Route path='*' element={<NotFoundView/>}/>
                </Routes>
            </DataProvider>
      </div>

  );
}

export default App;
