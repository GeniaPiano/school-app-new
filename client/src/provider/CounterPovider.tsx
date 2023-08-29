import { createContext, useContext, useState } from 'react';


interface DefaultValueInterface {
    counterCourse: number;
    counterStudent: number;
    counterTeacher: number;
    incrementCourseCounter: () => void;
    incrementStudentCounter: () => void;
    incrementTeacherCounter: () => void;
}

const defaultValue: DefaultValueInterface = {
    counterCourse: 0,
    counterStudent: 0,
    counterTeacher: 0,
    incrementCourseCounter: () => {},
    incrementTeacherCounter: () => {},
    incrementStudentCounter: () => {},
}
const CounterContext = createContext(defaultValue);

export const CounterProvider = ({ children }) => {
    const [counterCourse, setCounterCourse] = useState<number>(0);
    const [counterStudent, setCounterStudent] = useState<number>(0);
    const [counterTeacher, setCounterTeacher] = useState<number>(0);


    const incrementCourseCounter = () => {
        setCounterCourse((prevCounter) => prevCounter + 1);
    };

    const incrementStudentCounter = () => {
        setCounterStudent((prevCounter) => prevCounter + 1);
    };

    const incrementTeacherCounter = () => {
        setCounterTeacher((prevCounter) => prevCounter + 1);
    };

    const contextValue = {
        counterCourse,
        counterStudent,
        counterTeacher,
        incrementCourseCounter,
        incrementStudentCounter,
        incrementTeacherCounter,
    };

    return (
        <CounterContext.Provider value={contextValue}>
            {children}
        </CounterContext.Provider>
    );
};

export const useCounter = () => useContext(CounterContext);
