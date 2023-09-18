import {createContext, FC, useContext, useState} from "react";

interface SearchContextType {
    searchStudent: string;
    setSearchStudent: (phrase: string)=> void
    searchTeacher: string
    setSearchTeacher: (phrase: string) => void
    searchCourse: string;
    setSearchCourse: (phrase: string) => void
}

const SearchContext = createContext<SearchContextType | undefined>(undefined)

export const SearchProvider: FC = ({children}) => {

    const [searchStudent, setSearchStudent] = useState('');
    const [searchTeacher, setSearchTeacher] = useState('');
    const [searchCourse, setSearchCourse] = useState('');


    return <SearchContext.Provider value={{
        searchStudent,
        setSearchStudent,
        searchTeacher,
        setSearchTeacher,
        searchCourse,
        setSearchCourse
    }}>
        {children}
    </SearchContext.Provider>
}

export const useSearch = () => useContext(SearchContext)