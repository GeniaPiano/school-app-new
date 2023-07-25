import React from 'react';
import './App.css';
import {AppHeader} from "./components/AppHeader/AppHeader";
import {Route, Routes} from "react-router-dom";
import {CoursesView} from "./views/CoursesView/CoursesView";
import {NotFoundView} from "./views/CoursesView/NotFoundView";
import {DataProvider} from "./providers/DataProvider";




function App() {
  return (
      <div className='App'>
            <DataProvider>
                <AppHeader/>
                <Routes >
                    <Route path='/course' element={<CoursesView/>}/>
            {/*        <Route path='/course/:courseId' element={<SingleCourseView/>}/>*/}
            {/*        <Route path='/students' element={<StudentList/>}/>*/}
                    <Route path='*' element={<NotFoundView/>}/>
                </Routes>
            </DataProvider>
      </div>

  );
}

export default App;
