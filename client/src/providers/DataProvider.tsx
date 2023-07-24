import React, {createContext, ReactNode, useEffect, useState} from 'react';
import {CourseEntity, GetSingleCourseRes} from 'types';
import {useParams} from "react-router-dom";

interface AppContextType {
    coursesData: CourseEntity[] | null;
}

export const DataContext = createContext<AppContextType>({
    coursesData: [],

});

interface AppProviderProps {
    children: ReactNode,
}


export const DataProvider: React.FC<AppProviderProps> = ({children}) => {

    const [coursesData, setCoursesData] = useState<CourseEntity[] | null>(null);



    const fetchCoursesList = async () => {
        const res = await fetch('http://localhost:3001/course');
        const data = await res.json();
        setCoursesData(data.coursesList);
       }





    useEffect(()=> {
        fetchCoursesList();
    }, [])


    return (
        <DataContext.Provider value={{
            coursesData,
           }}>
              {children}
       </DataContext.Provider>
)
}
