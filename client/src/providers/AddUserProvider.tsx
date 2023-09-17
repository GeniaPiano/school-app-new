import {createContext, useContext, ReactNode, ChangeEvent, useState} from "react";
import {CourseEntity} from "../types/course";
import {initialStateTouchCount, initialStateUser} from "../utils/initialState";



interface AddUserContextType {
    inputValues,
    handleChangeInputValue: (e:ChangeEvent<HTMLInputElement>) => void;
    handleSelectCourse: (e:ChangeEvent<HTMLInputElement>) => void;
    handleRemoveCourse: (courseId: string) => void;
    availableCourses: CourseEntity[] | [];
    selectedCourses: CourseEntity[] | [];
    setAvailableCourses: (newCourses) => void;
    inputTouchedCount:  {name: number, last_name: number, email: number};
    setTouchedCount: (field, count) =>void;
    resetInputAndTouch: () => void;
    checkInputTouchCount: ()=> void;
}

const AddUserContext = createContext<AddUserContextType  | undefined>(undefined);

interface Props {
    children: ReactNode;
}


export const AddUserProvider= ({ children }: Props) => {


    const [inputValues, setInputValues] = useState(initialStateUser)
    const [inputTouchedCount, setInputTouchedCount] = useState(initialStateTouchCount);
    const [availableCourses, setAvailableCourses] = useState<CourseEntity[] | []>([])
    const [selectedCourses, setSelectedCourses] = useState<CourseEntity[] | []>([])


    const handleChangeInputValue = (e:ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target
        setInputTouchedCount(prev => ({
            ...prev,
            [name]: prev[name] + 1,
        }));
        setInputValues( prev => ({
            ...prev,
            [name] : value
        }))
    };

    const handleSelectCourse = (e: ChangeEvent<HTMLInputElement>) => {
        const courseId: string = e.target.value;
        if (availableCourses.length !== 0) {
            const courseToAdd: CourseEntity = availableCourses.find(course => course.id === courseId)
            setSelectedCourses(prevState => [...prevState, courseToAdd])
            setAvailableCourses(prev => prev.filter(course => course.id !== courseId))
        }
    }

    const handleRemoveCourse = (courseId) => {
        const course = selectedCourses.find(one => one.id === courseId)
        setSelectedCourses(prevSelectedCourses => prevSelectedCourses.filter(course => course.id !== courseId));
        setAvailableCourses(prev => ([...prev, course]))
    };

    const setTouchedCount = (field, count) => {
        setInputTouchedCount(prev => ({
            ...prev,
            [field]: count
        }));
    };

    const resetInputAndTouch = () => {
        setInputValues({name: '', last_name: '', email: ''})
        setInputTouchedCount(initialStateTouchCount)
        setSelectedCourses([])
    }

    const checkInputTouchCount = () =>{
        if (inputValues.name === '') {
            setTouchedCount('name', 3);
        }

        if (inputValues.last_name === '') {
            setTouchedCount('last_name', 3);
        }

        if (inputValues.email === '') {
            setTouchedCount('email', 4);
        }
    }




    return (
        <AddUserContext.Provider
            value={{
                inputValues,
                handleChangeInputValue,
                handleSelectCourse,
                handleRemoveCourse,
                setAvailableCourses,
                inputTouchedCount,
                setTouchedCount,
                resetInputAndTouch,
                availableCourses,
                selectedCourses,
                checkInputTouchCount

            }} >

            {children}
        </AddUserContext.Provider>
    );
};

export const useAddUser = (): AddUserContextType  => {
    const context = useContext(AddUserContext );
    if (context === undefined) {
        throw new Error("useAddUser must be used within an AddUserProvider");
    }
    return context;
};