import { createContext, useContext, useState } from 'react';


interface DefaultValueInterface {
    counter: number;
    incrementCounter: () => void;
}

const defaultValue: DefaultValueInterface = {
    counter: 0,
    incrementCounter: () => {},
}
const CounterContext = createContext(defaultValue);

export const CounterProvider = ({ children }) => {
    const [counter, setCounter] = useState<number>(0);

    const incrementCounter = () => {
        setCounter((prevCounter) => prevCounter + 1);
    };

    const contextValue = {
        counter,
        incrementCounter,
    };

    return (
        <CounterContext.Provider value={contextValue}>
            {children}
        </CounterContext.Provider>
    );
};

export const useCounter = () => useContext(CounterContext);
