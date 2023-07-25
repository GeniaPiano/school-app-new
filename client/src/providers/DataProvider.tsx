import React, {createContext, ReactNode, useEffect, useState} from 'react';
import {CourseEntity, CourseResponseData} from "types";


interface AppProviderProps {
    children: ReactNode,
}

interface AppContextType {
    coursesList: CourseEntity[] | null
}

export const DataContext = createContext<AppContextType>({
 coursesList: null,
});



export const DataProvider: React.FC<AppProviderProps> = ({children}) => {

    const [coursesData, setCoursesData] = useState<CourseResponseData | null>(null)

    const fetchCourses = async() => {
        const res = await fetch('http://localhost:3001/school-app/course');
        const data = await res.json();
        setCoursesData(data);
    }

    useEffect(()=> {
       fetchCourses();

    }, [])

    const value =  {
        coursesList:  coursesData?.coursesList ?? null,
    }


    return (
                <DataContext.Provider value={value}>
                      {children}
               </DataContext.Provider>
    )
}

